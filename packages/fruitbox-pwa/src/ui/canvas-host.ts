/** Fit a fixed-size game canvas to the viewport while keeping bitmap coordinates stable. */
export function mountCanvas(
  canvas: HTMLCanvasElement,
  naturalW: number,
  naturalH: number,
  options?: { scrollable?: boolean },
): { wrapper: HTMLElement; cleanup: () => void } {
  const wrapper = document.createElement("div");
  wrapper.className = options?.scrollable ? "canvas-scroll" : "canvas-fit";
  wrapper.appendChild(canvas);

  canvas.style.touchAction = "none";

  const applyFit = (): void => {
    const viewportW = window.innerWidth - 32;
    const viewportH = window.innerHeight * 0.72;
    const scale = Math.min(1, viewportW / naturalW, viewportH / naturalH);
    canvas.style.width = `${Math.round(naturalW * scale)}px`;
    canvas.style.height = `${Math.round(naturalH * scale)}px`;
  };

  applyFit();
  window.addEventListener("resize", applyFit);
  window.addEventListener("orientationchange", applyFit);

  return {
    wrapper,
    cleanup: () => {
      window.removeEventListener("resize", applyFit);
      window.removeEventListener("orientationchange", applyFit);
    },
  };
}
