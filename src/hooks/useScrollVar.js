import { useEffect } from 'react';

const clamp = (n) => Math.min(1, Math.max(0, n));

/**
 * Writes a 0 → 1 scroll progress into a CSS variable on the element (no React re-renders),
 * so CSS can drive transforms / opacity with calc().
 *
 * mode "through": 0 when the element's top is at `start` × viewport height,
 *                 1 when it has reached `end` × viewport height.
 * mode "sticky":  for tall containers with sticky children — 0 at the container's top,
 *                 1 when its bottom reaches the viewport bottom.
 */
export default function useScrollVar(ref, { name = '--p', mode = 'through', start = 0.9, end = 0.2 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const p =
        mode === 'sticky'
          ? clamp(-rect.top / Math.max(1, rect.height - vh))
          : clamp((vh * start - rect.top) / (vh * (start - end)));
      el.style.setProperty(name, p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, name, mode, start, end]);
}
