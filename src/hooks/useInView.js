import { useEffect, useState } from 'react';

/** Returns true once the referenced element scrolls into view. */
export default function useInView(ref, { once = true, margin = '0px 0px -10% 0px', threshold = 0.1 } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once, margin, threshold]);

  return inView;
}
