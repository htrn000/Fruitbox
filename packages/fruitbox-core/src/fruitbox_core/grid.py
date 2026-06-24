import os

import numpy as np

from .board_viz import build_generator_meta, print_board


WEIGHTS = [0.60, 0.3, 0.1, 0, 0, 0, 0, 0, 0]  # weights for 2-10


class FruitBoxGrid:
    def __init__(self, rows=10, columns=17, rng=None, debug_print=None):
        self.rows = rows
        self.columns = columns
        self.grid = None
        self.depth_grid = None
        self.tuple_id_grid = None
        self.empty_count = rows * columns
        self.rng = rng or np.random.default_rng()
        if debug_print is None:
            debug_print = os.environ.get("FRUITBOX_DEBUG_GRID", "").lower() in {
                "1",
                "true",
                "yes",
            }
        self.debug_print = debug_print

    def weighted_random(self):
        return self.rng.choice(np.arange(2, 11), p=WEIGHTS)

    def generate(self, type):
        if type == "random":
            self.grid = self.rng.integers(1, 10, size=(self.rows, self.columns))
            self.depth_grid = None
            self.tuple_id_grid = None
            return self.grid

        if type == "solvable":
            self.grid = np.full((self.rows, self.columns), -1)
            self.depth_grid = np.full((self.rows, self.columns), -1)
            self.tuple_id_grid = np.full((self.rows, self.columns), -1, dtype=np.int32)
            self.empty_count = self.rows * self.columns
            region_stack_depth = 0
            next_tuple_id = 0
            empty_components = self._count_empty_components()
            while not self.isGridDone():
                if self.empty_count == 1:
                    break
                tuple_size = self.weighted_random()
                while tuple_size > self.empty_count or self.empty_count - tuple_size == 1:
                    tuple_size = self.weighted_random()

                rect = self.random_rect(tuple_size)
                if rect is None:
                    continue

                r1, c1, r2, c2 = rect
                placement_depth = region_stack_depth
                placement_tuple_id = next_tuple_id
                next_tuple_id += 1
                numbers = self._numbers_summing_to_10(tuple_size)
                idx = 0
                for i in range(r1, r2 + 1):
                    for j in range(c1, c2 + 1):
                        if self.grid[i][j] == -1:
                            self.grid[i][j] = numbers[idx]
                            self.depth_grid[i][j] = placement_depth
                            self.tuple_id_grid[i][j] = placement_tuple_id
                            idx += 1
                self.empty_count -= tuple_size

                new_components = self._count_empty_components()
                if new_components > empty_components:
                    region_stack_depth += 1
                    empty_components = new_components

                if self.debug_print:
                    print(
                        f"placed {tuple_size} cells at ({r1},{c1})->({r2},{c2}), "
                        f"depth={placement_depth}, empty_count={self.empty_count}, "
                        f"empty_components={new_components}"
                    )
                    print_board(
                        self.grid,
                        build_generator_meta(
                            self.depth_grid,
                            self.tuple_id_grid,
                            self.rows,
                            self.columns,
                        ),
                    )

            return self.grid

    def generator_viz_meta(self):
        if self.depth_grid is None or self.tuple_id_grid is None:
            return None
        return build_generator_meta(
            self.depth_grid,
            self.tuple_id_grid,
            self.rows,
            self.columns,
        )

    def _count_empty_components(self):
        seen = np.zeros((self.rows, self.columns), dtype=bool)
        components = 0
        for r in range(self.rows):
            for c in range(self.columns):
                if self.grid[r, c] != -1 or seen[r, c]:
                    continue
                components += 1
                stack = [(r, c)]
                seen[r, c] = True
                while stack:
                    cr, cc = stack.pop()
                    for nr, nc in ((cr - 1, cc), (cr + 1, cc), (cr, cc - 1), (cr, cc + 1)):
                        if (
                            0 <= nr < self.rows
                            and 0 <= nc < self.columns
                            and not seen[nr, nc]
                            and self.grid[nr, nc] == -1
                        ):
                            seen[nr, nc] = True
                            stack.append((nr, nc))
        return components

    def _numbers_summing_to_10(self, count):
        while True:
            cuts = sorted(self.rng.integers(1, 10, size=count - 1).tolist())
            if len(set(cuts)) < len(cuts):
                continue
            parts = [cuts[0]] + [cuts[i] - cuts[i-1] for i in range(1, len(cuts))] + [10 - cuts[-1]]
            ALLOWED_WITH_ONE = {(1,2,2,5), (1,2,3,4), (1,3,3,3)}
            s = tuple(sorted(parts))
            if count == 4 and 1 in parts and s not in ALLOWED_WITH_ONE:
                continue
            if all(1 <= p <= 9 for p in parts) and sorted(parts) != [1, 1, 8]:
                return parts

    def random_rect(self, tuple_size, max_attempts=1000):
        if tuple_size > self.empty_count:
            return None

        for _ in range(max_attempts):
            ra, rb = int(self.rng.integers(0, self.rows)),   int(self.rng.integers(0, self.rows))
            ca, cb = int(self.rng.integers(0, self.columns)), int(self.rng.integers(0, self.columns))
            r1, r2 = min(ra, rb), max(ra, rb)
            c1, c2 = min(ca, cb), max(ca, cb)
            if self.checkEmptySlots(r1, c1, r2, c2, tuple_size):
                return r1, c1, r2, c2
        return None

    def checkEmptySlots(self, r1, c1, r2, c2, empty):
        count_empty = 0
        for i in range(r1, r2 + 1):
            for j in range(c1, c2 + 1):
                if self.grid[i][j] == -1:
                    count_empty += 1
        return count_empty == empty
    
    def isGridDone(self):
        for i in range(self.rows):
            for j in range(self.columns):
                if self.grid[i][j] == -1:
                    return False
        return True


def main():
    import argparse

    from .solver import solve

    parser = argparse.ArgumentParser(description="Generate and print a solvable Fruit Box board.")
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--rows", type=int, default=10)
    parser.add_argument("--cols", type=int, default=17)
    parser.add_argument(
        "--steps",
        action="store_true",
        help="print the board after each tuple placement",
    )
    parser.add_argument(
        "--verify",
        action="store_true",
        help="run the full solver after generation",
    )
    args = parser.parse_args()

    rng = np.random.default_rng(args.seed)
    grid_gen = FruitBoxGrid(args.rows, args.cols, rng=rng, debug_print=args.steps)
    grid = grid_gen.generate("solvable")

    print(f"seed={args.seed} rows={args.rows} cols={args.cols}")
    print_board(grid, grid_gen.generator_viz_meta())

    if args.verify:
        sol, elapsed = solve(grid.tolist())
        print(f"solver score={sol['score']} time={elapsed:.3f}s")


if __name__ == "__main__":
    main()
