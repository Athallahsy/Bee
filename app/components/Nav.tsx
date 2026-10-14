"use client";

import { useEffect, useState } from "react";
import { useGlobalProgress } from "./SceneCanvas";

const SECTIONS = [
  { id: "hero", num: "01", name: "INTRO" },
  { id: "anatomy", num: "02", name: "ANATOMI" },
  { id: "section-jelajah", num: "03", name: "JELAJAH" },
  { id: "kemampuan", num: "04", name: "KEMAMPUAN" },
  { id: "fakta", num: "05", name: "OBSERVASI" },
];

export default function Nav() {
  const progress = useGlobalProgress();
  const [time, setTime] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const updSection = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.45;
        let found = 0;
        for (let i = 0; i < SECTIONS.length; i++) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              found = i;
            }
          }
        }
        setActiveIdx(found);
      });
    };
    updSection();
    window.addEventListener("scroll", updSection, { passive: true });
    window.addEventListener("resize", updSection);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updSection);
      window.removeEventListener("resize", updSection);
    };
  }, []);

  return (
    <header aria-label="Navigasi utama" className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-background/85 backdrop-blur-md transition-all">
      <div className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left bg-stone-900" style={{ transform: `scaleX(${progress})` }} aria-hidden />
      <div className="grid grid-cols-12 items-center px-6 py-3 md:px-8 lg:px-12 text-stone-900">
        {/* Left Column: Brand & Taxonomy */}
        <div className="col-span-8 sm:col-span-6 lg:col-span-5 flex items-center gap-3">
          <a href="#hero" aria-label="Ke bagian hero" className="group flex items-center gap-2.5">
            <div className="flex size-6 items-center justify-center rounded-md border border-stone-300 bg-stone-100/80 group-hover:border-stone-500 transition-colors">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-stone-800"
              >
                <path d="M12 2l7 4v8l-7 4-7-4V6z" />
                <path d="M12 22v-6" />
                <path d="M12 8l4 2" />
                <path d="M12 8L8 10" />
              </svg>
            </div>
            <span className="font-sans text-sm font-semibold tracking-tight text-stone-900">
              apis mellifera
            </span>
          </a>

          <div className="hidden sm:block size-1 bg-stone-400/60 rounded-full" />
          <p className="hidden sm:block font-mono text-[11px] tracking-wider text-stone-500 uppercase">
            [ HYMENOPTERA · APIDAE ]
          </p>
        </div>

        {/* Center Column: Telemetry / Coordinates */}
        <div className="hidden lg:flex lg:col-span-4 items-center justify-center gap-4 text-stone-500 font-mono text-[11px] tracking-widest">
          <span>LAT: -6.2088° S</span>
          <span className="text-stone-300">/</span>
          <span>LONG: 106.8451° E</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-700 font-medium">
            <span className="size-1 rounded-full bg-emerald-600 animate-pulse" />
            COLONY: ACTIVE
          </span>
        </div>

        {/* Right Column: Clock & Section Pill */}
        <div className="col-span-4 sm:col-span-6 lg:col-span-3 flex items-center justify-end gap-3 sm:gap-5">
          <span suppressHydrationWarning className="hidden sm:inline font-mono text-xs tabular-nums tracking-widest text-stone-500">
            {time ?? "--:--:--"}
          </span>
          <a
            href={`#${SECTIONS[activeIdx].id}`}
            aria-label={`Bagian ${SECTIONS[activeIdx].num}: ${SECTIONS[activeIdx].name}`}
            className="flex items-center gap-1.5 rounded-full border border-stone-300/90 bg-white/70 hover:bg-white px-3 py-1 text-[11px] font-mono tracking-wider text-stone-700 shadow-2xs transition-all"
          >
            <span className="text-stone-400">[</span>
            <span className="font-semibold text-stone-900">{SECTIONS[activeIdx].num}</span>
            <span className="text-stone-400">/</span>
            <span>05</span>
            <span className="hidden xl:inline text-stone-300">·</span>
            <span className="hidden xl:inline text-[10px] text-amber-700 font-medium tracking-widest">
              {SECTIONS[activeIdx].name}
            </span>
            <span className="text-stone-400">]</span>
          </a>
        </div>
      </div>
    </header>
  );
}
