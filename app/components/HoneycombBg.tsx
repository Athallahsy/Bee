'use client';
import { useEffect, useRef } from 'react';

export default function HoneycombBg() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      el.style.setProperty('--mx', cx.toFixed(3));
      el.style.setProperty('--my', cy.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);
  const hex = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='64' viewBox='0 0 56 64'%3E%3Cpath d='M28 2 L50 14 L50 38 L28 50 L6 38 L6 14 Z' fill='none' stroke='%23e8c96a' stroke-width='0.95' stroke-linejoin='round' opacity='0.68'/%3E%3C/svg%3E`;
  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={
        {
          ['--mx' as string]: '0',
          ['--my' as string]: '0',
          transform: 'translate(calc(var(--mx) * 8px), calc(var(--my) * 6px)) scale(1.03)',
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#fdfbf1',
          backgroundImage: `url("data:image/svg+xml,${hex}"), url("data:image/svg+xml,${hex}")`,
          backgroundSize: '56px 64px, 56px 64px',
          backgroundPosition: '0 0, 28px 32px',
          opacity: 0.24,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 58% at 50% 42%, rgba(254,243,199,0.72) 0%, transparent 62%), radial-gradient(ellipse 46% 40% at 18% 74%, rgba(254,233,164,0.20) 0%, transparent 62%), radial-gradient(ellipse 44% 40% at 84% 70%, rgba(254,243,199,0.18) 0%, transparent 62%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fdfbf1]/70" />
    </div>
  );
}
