'use client';
import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Ctx = createContext<Lenis | null>(null);
export const useLenis = () => useContext(Ctx);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  useEffect(() => {
    try { gsap.registerPlugin(ScrollTrigger); } catch {}
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const l = new Lenis({ duration: reduced ? 0 : 1.1, smoothWheel: !reduced, gestureOrientation: 'vertical' });
    (window as unknown as { __lenis: unknown }).__lenis = l;
    l.on('scroll', ScrollTrigger.update);
    const tickerCb = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);
    queueMicrotask(() => setLenis(l));
    return () => {
      gsap.ticker.remove(tickerCb);
      l.off('scroll', ScrollTrigger.update);
      l.destroy();
      setLenis(null);
    };
  }, []);
  return <Ctx.Provider value={lenis}>{children}</Ctx.Provider>;
}
