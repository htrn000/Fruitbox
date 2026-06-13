import pygame

_TEXT_PRIMARY   = (44,  44,  42)
_TEXT_SECONDARY = (95,  94,  90)
_CELL_BORDER    = (210, 208, 200)


class SettingsOverlay:
    def __init__(self):
        self.visible    = False
        self._card_rect = pygame.Rect(0, 0, 0, 0)
        self.close_rect = pygame.Rect(0, 0, 0, 0)
        self._font_title = None
        self._font_btn   = None

    def _ensure_fonts(self):
        if self._font_title is None:
            self._font_title = pygame.font.SysFont("Arial", 26, bold=True)
            self._font_btn   = pygame.font.SysFont("Arial", 13, bold=True)

    def toggle(self):
        self.visible = not self.visible

    def handle_event(self, event):
        """Returns True if the event was consumed."""
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
        if not self.visible:
            return
        self._ensure_fonts()
        w, h = screen.get_size()

        dim = pygame.Surface((w, h), pygame.SRCALPHA)
        dim.fill((44, 44, 42, 160))
        screen.blit(dim, (0, 0))

        card_w, card_h = 340, 200
        cx = (w - card_w) // 2
        cy = (h - card_h) // 2
        self._card_rect = pygame.Rect(cx, cy, card_w, card_h)
        pygame.draw.rect(screen, (255, 255, 255), self._card_rect, border_radius=14)
        pygame.draw.rect(screen, _CELL_BORDER, self._card_rect, width=1, border_radius=14)

        title = self._font_title.render("Settings", True, _TEXT_PRIMARY)
        screen.blit(title, (cx + (card_w - title.get_width()) // 2, cy + 22))

        x_surf = self._font_btn.render("X", True, _TEXT_SECONDARY)
        x_pad  = 6
        x_w    = x_surf.get_width()  + x_pad * 2
        x_h    = x_surf.get_height() + x_pad * 2
        self.close_rect = pygame.Rect(cx + card_w - x_w - 8, cy + 8, x_w, x_h)
        if self.close_rect.collidepoint(pygame.mouse.get_pos()):
            pygame.draw.rect(screen, (230, 228, 222), self.close_rect, border_radius=5)
        screen.blit(x_surf, (self.close_rect.x + x_pad, self.close_rect.y + x_pad))
