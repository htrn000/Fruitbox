import pygame
import fruitbox_stats

_TEXT_PRIMARY   = (44,  44,  42)
_TEXT_SECONDARY = (95,  94,  90)
_CELL_BORDER    = (210, 208, 200)
_DIVIDER        = (220, 218, 210)


def _fmt_time(seconds):
    if seconds < 60:
        return f"{seconds}s"
    elif seconds < 3600:
        m, s = divmod(seconds, 60)
        return f"{m}m {s}s"
    else:
        h, rem = divmod(seconds, 3600)
        return f"{h}h {rem // 60}m"


class StatsOverlay:
    def __init__(self):
        self.visible     = False
        self._card_rect  = pygame.Rect(0, 0, 0, 0)
        self.close_rect  = pygame.Rect(0, 0, 0, 0)
        self._font_title = None
        self._font_label = None
        self._font_value = None
        self._font_btn   = None
        self._summary    = None

    def _ensure_fonts(self):
        if self._font_title is None:
            self._font_title = pygame.font.SysFont("Arial", 26, bold=True)
            self._font_label = pygame.font.SysFont("Arial", 12)
            self._font_value = pygame.font.SysFont("Arial", 18, bold=True)
            self._font_btn   = pygame.font.SysFont("Arial", 13, bold=True)

    def toggle(self):
        self.visible = not self.visible
        if self.visible:
            self._summary = fruitbox_stats.get_summary()

    def handle_event(self, event):
        if not self.visible:
            return False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                self.visible = False
            return True
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            if not self._card_rect.collidepoint(event.pos) or self.close_rect.collidepoint(event.pos):
                self.visible = False
            return True
        if event.type in (pygame.MOUSEMOTION, pygame.MOUSEBUTTONUP):
            return True
        return False

    def draw(self, screen):
        if not self.visible or self._summary is None:
            return
        self._ensure_fonts()
        w, h = screen.get_size()
        s = self._summary

        dim = pygame.Surface((w, h), pygame.SRCALPHA)
        dim.fill((44, 44, 42, 160))
        screen.blit(dim, (0, 0))

        card_w, card_h = 440, 340
        cx = (w - card_w) // 2
        cy = (h - card_h) // 2
        self._card_rect = pygame.Rect(cx, cy, card_w, card_h)
        pygame.draw.rect(screen, (255, 255, 255), self._card_rect, border_radius=14)
        pygame.draw.rect(screen, _CELL_BORDER, self._card_rect, width=1, border_radius=14)

        # close button
        x_surf = self._font_btn.render("X", True, _TEXT_SECONDARY)
        x_pad  = 6
        x_w    = x_surf.get_width()  + x_pad * 2
        x_h    = x_surf.get_height() + x_pad * 2
        self.close_rect = pygame.Rect(cx + card_w - x_w - 8, cy + 8, x_w, x_h)
        if self.close_rect.collidepoint(pygame.mouse.get_pos()):
            pygame.draw.rect(screen, (230, 228, 222), self.close_rect, border_radius=5)
        screen.blit(x_surf, (self.close_rect.x + x_pad, self.close_rect.y + x_pad))

        # title
        title = self._font_title.render("Stats", True, _TEXT_PRIMARY)
        screen.blit(title, (cx + (card_w - title.get_width()) // 2, cy + 20))

        pad = 32
        y = cy + 66

        def row(label, value):
            nonlocal y
            screen.blit(self._font_label.render(label, True, _TEXT_SECONDARY), (cx + pad, y))
            screen.blit(self._font_value.render(value, True, _TEXT_PRIMARY),   (cx + pad, y + 14))
            y += 44

        def divider():
            nonlocal y
            pygame.draw.line(screen, _DIVIDER, (cx + pad, y), (cx + card_w - pad, y))
            y += 16

        # totals
        row("GAMES PLAYED", str(s["total_games"]))
        row("TIME PLAYED",  _fmt_time(s["total_time"]))

        divider()

        # vs record
        w_str = f"{s['vs_wins']}W   {s['vs_losses']}L   {s['vs_ties']}T"
        row("VS AI RECORD", w_str)

        divider()

        # highscores
        def hs_row(label, score, seed):
            nonlocal y
            if score is None:
                value, sub = "—", ""
            else:
                value, sub = str(score), f"Seed: {seed}"
            screen.blit(self._font_label.render(label, True, _TEXT_SECONDARY), (cx + pad, y))
            screen.blit(self._font_value.render(value, True, _TEXT_PRIMARY),   (cx + pad, y + 14))
            if sub:
                screen.blit(self._font_label.render(sub, True, _TEXT_SECONDARY),
                            (cx + pad + self._font_value.size(value)[0] + 10, y + 18))
            y += 44

        hs_row("BEST SCORE — RANDOM",   s["random_best"],   s["random_best_seed"])
        hs_row("BEST SCORE — SOLVABLE", s["solvable_best"], s["solvable_best_seed"])
