"""ANSI terminal visualization for generated boards."""

import sys
from dataclasses import dataclass, field
from enum import Enum

RESET = "\033[0m"

# Muted gray for tuple labels (A,B,C,D); distinct from depth palette.
LABEL_COLOR = "\033[38;5;238m"

# Terminal cells: one digit (1-9) + optional label letter + pad.
TERMINAL_CELL_WIDTH = 3

# Distinct foreground colors; reused by depth % len(DEPTH_COLORS).
DEPTH_COLORS = [
    "\033[38;5;39m",   # blue
    "\033[38;5;46m",   # green
    "\033[38;5;208m",  # orange
    "\033[38;5;201m",  # pink
    "\033[38;5;226m",  # yellow
    "\033[38;5;51m",   # cyan
    "\033[38;5;129m",  # purple
    "\033[38;5;196m",  # red
    "\033[38;5;118m",  # lime
    "\033[38;5;99m",   # violet
]

# RGB mirrors DEPTH_COLORS for pygame/web tinting.
DEPTH_RGB = [
    (0, 135, 255),
    (0, 205, 0),
    (255, 135, 0),
    (255, 0, 215),
    (255, 215, 0),
    (0, 215, 255),
    (175, 0, 215),
    (255, 0, 0),
    (135, 255, 0),
    (135, 0, 215),
]


class VizMode(Enum):
    OFF = "off"
    SOLVER_TRACE = "solver_trace"
    GENERATOR_TREE = "generator_tree"


@dataclass
class BoardVizEntry:
    x: int
    y: int
    depth: int
    tuple_id: int
    label: str


@dataclass
class BoardVizMeta:
    mode: VizMode = VizMode.OFF
    entries: list[BoardVizEntry] = field(default_factory=list)

    def lookup(self):
        return {(entry.y, entry.x): entry for entry in self.entries}

    def to_dict(self) -> dict:
        return {
            "mode": self.mode.value,
            "entries": [
                {
                    "x": entry.x,
                    "y": entry.y,
                    "depth": entry.depth,
                    "tuple_id": entry.tuple_id,
                    "label": entry.label,
                }
                for entry in self.entries
            ],
        }

    @classmethod
    def from_dict(cls, data: dict | None) -> "BoardVizMeta":
        if not data:
            return cls()
        entries = [
            BoardVizEntry(
                x=int(item["x"]),
                y=int(item["y"]),
                depth=int(item["depth"]),
                tuple_id=int(item["tuple_id"]),
                label=str(item["label"]),
            )
            for item in data.get("entries", [])
        ]
        return cls(mode=VizMode(data.get("mode", VizMode.OFF.value)), entries=entries)


def color_for_depth(depth: int) -> str:
    return DEPTH_COLORS[depth % len(DEPTH_COLORS)]


def hex_for_depth(depth: int) -> str:
    r, g, b = rgb_for_depth(depth)
    return f"#{r:02x}{g:02x}{b:02x}"


def rgb_for_depth(depth: int) -> tuple[int, int, int]:
    return DEPTH_RGB[depth % len(DEPTH_RGB)]


def legend_depths(meta: BoardVizMeta | None) -> list[int]:
    """Sorted unique stack depths present in an active viz meta."""
    if meta is None or meta.mode == VizMode.OFF or not meta.entries:
        return []
    return sorted({entry.depth for entry in meta.entries})


def format_terminal_depth_legend(meta: BoardVizMeta | None, *, use_color: bool = True) -> str | None:
    """Compact terminal legend, e.g. ``depth ■0 ■1 ■2`` with ANSI colors."""
    depths = legend_depths(meta)
    if not depths:
        return None
    parts = []
    for depth in depths:
        if use_color:
            parts.append(f"{color_for_depth(depth)}■{depth}{RESET}")
        else:
            parts.append(str(depth))
    return "depth " + " ".join(parts)


def blend_rgb(base: tuple[int, int, int], tint: tuple[int, int, int], alpha: float):
    return tuple(
        int(base[i] * (1.0 - alpha) + tint[i] * alpha) for i in range(3)
    )


def letter_at_index(index: int) -> str:
    """Map 0 -> A, 1 -> B, ... 25 -> Z within a single depth level."""
    if index < 0:
        return ""
    if index >= 26:
        return "?"
    return chr(ord("A") + index)


def labels_for_depth_tuples(depth_tuple_pairs: list[tuple[int, int]]) -> dict[tuple[int, int], str]:
    """Assign A,B,C per depth; empty label when only one tuple at that depth."""
    by_depth: dict[int, list[int]] = {}
    for depth, tuple_id in depth_tuple_pairs:
        ids = by_depth.setdefault(depth, [])
        if tuple_id not in ids:
            ids.append(tuple_id)

    labels: dict[tuple[int, int], str] = {}
    for depth, tuple_ids in by_depth.items():
        tuple_ids.sort()
        if len(tuple_ids) == 1:
            labels[(depth, tuple_ids[0])] = ""
        else:
            for index, tuple_id in enumerate(tuple_ids):
                labels[(depth, tuple_id)] = letter_at_index(index)
    return labels


def build_generator_meta(depth_grid, tuple_id_grid, rows, cols) -> BoardVizMeta:
    cells: list[tuple[int, int, int, int]] = []
    for r in range(rows):
        for c in range(cols):
            depth = int(depth_grid[r, c])
            tuple_id = int(tuple_id_grid[r, c])
            if depth < 0 or tuple_id < 0:
                continue
            cells.append((r, c, depth, tuple_id))

    label_map = labels_for_depth_tuples((depth, tid) for _, _, depth, tid in cells)
    entries = [
        BoardVizEntry(
            x=c,
            y=r,
            depth=depth,
            tuple_id=tuple_id,
            label=label_map[(depth, tuple_id)],
        )
        for r, c, depth, tuple_id in cells
    ]
    return BoardVizMeta(mode=VizMode.GENERATOR_TREE, entries=entries)


def build_solver_trace_meta(cell_depth, cell_tuple) -> BoardVizMeta:
    cells = [(r, c, depth, cell_tuple[(r, c)]) for (r, c), depth in cell_depth.items()]
    label_map = labels_for_depth_tuples((depth, tid) for _, _, depth, tid in cells)
    entries = [
        BoardVizEntry(
            x=c,
            y=r,
            depth=depth,
            tuple_id=tuple_id,
            label=label_map[(depth, tuple_id)],
        )
        for r, c, depth, tuple_id in cells
    ]
    return BoardVizMeta(mode=VizMode.SOLVER_TRACE, entries=entries)


def _terminal_cell_plain(value, label=None) -> str:
    """Fixed-width plain text: right-aligned digit + label or pad space."""
    label_char = label if label else " "
    return f"{int(value):2d}{label_char}"


def _format_cell(value, depth=None, label=None, *, use_color=True):
    plain = _terminal_cell_plain(value, label)
    if not use_color:
        return plain

    if depth is not None and depth >= 0:
        digit = f"{int(value):2d}"
        if label:
            return (
                f"{color_for_depth(depth)}{digit}{RESET}"
                f"{LABEL_COLOR}{label}{RESET}"
            )
        return f"{color_for_depth(depth)}{plain}{RESET}"

    return plain


def print_board(
    grid,
    meta=None,
    *,
    empty_char=".",
    use_color=True,
    file=None,
):
    """Print a board; depth shares an ANSI color, tuple labels stay muted gray."""
    out = file or sys.stdout
    rows, cols = grid.shape
    by_cell = {}
    if meta is not None and meta.entries:
        for entry in meta.entries:
            by_cell[(entry.y, entry.x)] = entry

    for i in range(rows):
        parts = []
        for j in range(cols):
            value = grid[i, j]
            if value == -1:
                parts.append(f" {empty_char} ".ljust(TERMINAL_CELL_WIDTH))
                continue

            entry = by_cell.get((i, j))
            depth = entry.depth if entry is not None else None
            label = entry.label if entry is not None else None
            parts.append(_format_cell(value, depth=depth, label=label, use_color=use_color))
        print("".join(parts), file=out)

    legend = format_terminal_depth_legend(meta, use_color=use_color)
    if legend:
        print(legend, file=out)
