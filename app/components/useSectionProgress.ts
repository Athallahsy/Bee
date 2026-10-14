'use client';
import { useEffect, useState } from 'react';

export function useSectionProgress(ref: React.RefObject<HTMLElement | null>, steps = 1) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const h = el.offsetHeight - window.innerHeight;
        const p = h <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / h));
        setProgress(p);
        setActive(Math.min(steps - 1, Math.floor(p * steps + 0.0001)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, steps]);
  return { progress, active };
}
