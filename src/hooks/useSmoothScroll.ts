import { useEffect } from "react";

/**
 * useSmoothScroll — "Heavy / Viscous" scroll effect
 * Lerps the actual scroll position toward the target at a given ease factor.
 * No external dependencies. Works by overriding window scroll with RAF.
 */
export const useSmoothScroll = (ease = 0.08) => {
  useEffect(() => {
    let target = window.scrollY;
    let current = window.scrollY;
    let ticking = false;
    let raf: number;

    const onScroll = () => {
      target = window.scrollY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const diff = Math.abs(target - current);
      if (diff > 0.5) {
        current = lerp(current, target, ease);
        // We don't actually override scroll position — instead we
        // apply a CSS translate to the root wrapper so native scroll
        // anchors / a11y stay intact, and we get smooth visual lag.
        const root = document.getElementById("smooth-root");
        if (root) {
          root.style.transform = `translateY(${-(current - target)}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ease]);
};
