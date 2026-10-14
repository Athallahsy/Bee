'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const reveals = el.querySelectorAll('.hero-reveal');
      if (reveals.length) gsap.fromTo(reveals, { y: 24, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.15 });
      const giants = el.querySelectorAll('.hero-giant span');
      if (giants.length) gsap.fromTo(giants, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.25 });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={rootRef} id="hero" className="relative w-full min-h-[100dvh] overflow-hidden bg-transparent text-stone-900 flex flex-col justify-between px-6 md:px-8 lg:px-12 py-6">
      {/* Top Bar: Section Index, Taxonomy & Pill Indicator */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-200/60 pb-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-500 whitespace-nowrap">
              01 — INTRO
            </p>
            <span className="hidden sm:inline size-1 bg-stone-300 rounded-full shrink-0" />
            <span className="hidden lg:inline font-mono text-[10px] tracking-[0.25em] uppercase text-stone-500 whitespace-nowrap">
              [ APIS MELLIFERA · HYMENOPTERA ]
            </span>
          </div>
        </div>
        <span className="hidden sm:inline-flex font-mono text-[10px] text-stone-500 border border-stone-300/80 bg-white/50 px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
          01 / 05
        </span>
      </div>

      {/* Center Stage: Giant Typographic Backdrop with Corner Crosshairs */}
      <div className="pointer-events-none relative flex-1 flex items-center justify-center">
        {/* Technical Crosshairs */}
        <span className="absolute top-2 left-2 text-[11px] font-mono text-stone-300 select-none">+</span>
        <span className="absolute top-2 right-2 text-[11px] font-mono text-stone-300 select-none">+</span>
        <span className="absolute bottom-2 left-2 text-[11px] font-mono text-stone-300 select-none">+</span>
        <span className="absolute bottom-2 right-2 text-[11px] font-mono text-stone-300 select-none">+</span>

        <span
          aria-hidden
          className="hero-giant absolute inset-0 grid place-items-center select-none text-center font-light uppercase leading-[0.85] tracking-tighter"
          style={{
            fontSize: 'clamp(48px, 13vw, 180px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(28,25,23,0.15)',
            paintOrder: 'stroke fill',
          }}
        >
          <span className="block">APIS</span>
          <span className="block">MELLIFERA</span>
        </span>
      </div>

      {/* Bottom Row: Editorial Statement & Scroll Down Indicator */}
      <div className="flex items-end justify-between gap-6 md:gap-12 border-t border-stone-200/60 pt-3 shrink-0">
        <div>
          <h1 className="hero-reveal text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-stone-900 leading-tight">
            Kecil, gigih, tak tergantikan.
          </h1>
          <p className="hero-reveal max-w-[24rem] md:max-w-[28rem] text-sm md:text-base text-stone-600 font-light mt-1.5 leading-relaxed">
            Dengungnya merajut kelangsungan hidup — penyerbuk utama flora berbunga, penjelajah tangguh, dan penjaga ekosistem bumi.
          </p>
        </div>

        {/* Desktop Scroll Down Indicator */}
        <div className="hidden md:flex shrink-0 items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase text-stone-500">
          <span>Scroll Down</span>
          <span className="grid grid-cols-3 gap-[3px]" aria-hidden>
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="h-[3px] w-[3px] rounded-full bg-stone-400"
                style={{ animation: `dot-pulse 1.4s ease-in-out ${i * 0.12}s infinite` }}
              />
            ))}
          </span>
        </div>

        {/* Mobile Scroll Down Indicator */}
        <div className="md:hidden flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-stone-500">
          <span>Scroll</span>
          <span className="grid grid-cols-3 gap-[2px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="h-[2.5px] w-[2.5px] rounded-full bg-stone-400"
                style={{ animation: `dot-pulse 1.4s ease-in-out ${i * 0.12}s infinite` }}
              />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
