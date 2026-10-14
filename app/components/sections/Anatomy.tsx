"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSectionProgress } from "../useSectionProgress";
import { useLenis } from "../LenisProvider";

interface BeatImg {
  src: string | null; // null = belum ada gambar, tampilkan SVG fallback
  label: string;
}

interface Beat {
  k: string;
  v: string;
  label: string;
  desc: string;
  imgs: [BeatImg, BeatImg];
}

const beats: Beat[] = [
  {
    k: "Mata Majemuk",
    v: "5",
    label: "Jumlah mata",
    desc: "Dua mata majemuk + tiga oceli. Melihat ultraviolet untuk menemukan pola nektar yang tak kasatmata bagi manusia. Medan 360°.",
    imgs: [
      { src: "/images/anatomy/anatomy_mata_01.jpg", label: "Close-up mata majemuk" },
      { src: "/images/anatomy/anatomy_mata_02.jpg", label: "Pola UV bunga" },
    ],
  },
  {
    k: "Sayap",
    v: "230×",
    label: "Kepak / detik",
    desc: "Gerak angka-8, bukan naik-turun. Sayap tipis berdenyut >200×/detik — sumber dengung khas lebah.",
    imgs: [
      { src: "/images/anatomy/anatomy_sayap_01.jpg", label: "Urat sayap tipis" },
      { src: "/images/anatomy/anatomy_sayap_02.jpg", label: "Gerak angka-8" },
    ],
  },
  {
    k: "Kaki Berbulu",
    v: "6",
    label: "Kaki pengangkut",
    desc: "Scopa & corbicula: bulu elektrostatik yang mengunci serbuk, mengangkut hingga ~50% bobot tubuh.",
    imgs: [
      { src: "/images/anatomy/anatomy_kaki_01.jpg", label: "Bulu penangkap serbuk" },
      { src: "/images/anatomy/anatomy_kaki_02.jpg", label: "Transfer serbuk ke sarang" },
    ],
  },
  {
    k: "Exoskeleton",
    v: "Chitin",
    label: "Rangka luar",
    desc: "Kitin ringan & kuat melindungi organ vital. Belang kuning-hitam adalah sinyal aposematik bagi predator.",
    imgs: [
      { src: null, label: "Segmen chitin" },
      { src: null, label: "Warna aposematik" },
    ],
  },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-stone-200/60 pt-3">
      <p className="text-3xl md:text-4xl font-light tracking-tighter leading-none text-stone-900">
        {value}
      </p>
      <p className="mt-1 text-[9px] tracking-[0.18em] uppercase text-stone-500 font-mono">
        {label}
      </p>
    </div>
  );
}

export default function Anatomy() {
  const ref = useRef<HTMLElement>(null);
  const { active: scrollActive } = useSectionProgress(
    ref as React.RefObject<HTMLElement>,
    beats.length,
  );
  const lenis = useLenis();

  const scrollToPhase = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return;

      const sectionTop = el.offsetTop;
      const sectionHeight = el.offsetHeight;
      const scrollableRange = sectionHeight - window.innerHeight;
      const targetY =
        sectionTop + (index / (beats.length - 1)) * scrollableRange;

      if (lenis) {
        lenis.scrollTo(targetY);
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [lenis],
  );

  const active = scrollActive;

  return (
    <section
      ref={ref}
      id="anatomy"
      className="relative bg-transparent text-stone-900"
      style={{ height: `${beats.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col px-6 md:px-8 lg:px-12 py-6">
        <div className="flex items-center justify-between gap-3 border-b border-stone-200/60 pb-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
            <div className="flex items-center gap-2 min-w-0">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-500 whitespace-nowrap">
                02 — ANATOMI
              </p>
              <span className="hidden sm:inline size-1 bg-stone-300 rounded-full shrink-0" />
              <span className="hidden lg:inline font-mono text-[10px] tracking-[0.25em] uppercase text-stone-500 whitespace-nowrap">
                [ PRESISI MINIATUR ]
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.18em] uppercase text-emerald-700">
              <span className="size-1 rounded-full bg-emerald-500 animate-pulse" /> TELEMETRY LIVE
            </span>
            <span className="hidden sm:inline-flex font-mono text-[10px] text-stone-500 border border-stone-300/80 bg-white/50 px-2.5 py-0.5 rounded-full whitespace-nowrap">
              02 / 05
            </span>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-[auto_1fr_auto] gap-x-8 gap-y-4 items-stretch min-h-0 pt-6">
          <div className="lg:col-start-1 lg:row-start-1 min-w-0 max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-light leading-[0.9] tracking-tighter uppercase text-stone-900">
              Anatomi<br />
              <span className="text-stone-300">Presisi</span>
            </h2>
          </div>

          <div className="lg:col-start-1 lg:row-start-2 relative min-h-[110px] max-w-2xl">
            {beats.map((b, i) => {
              const isActive = active === i;
              return (
                <div
                  key={b.k}
                  aria-hidden={!isActive}
                  className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(${isActive ? 0 : 12}px)`,
                    filter: isActive ? "blur(0px)" : "blur(4px)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-amber-700 font-medium">
                      [ FASE 0{i + 1} · {b.k} ]
                    </p>
                  </div>
                  <p className="mt-2.5 text-sm md:text-base leading-relaxed text-stone-600 max-w-xl font-light">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="lg:col-start-1 lg:row-start-3 self-end max-w-2xl">
            <div className="relative min-h-[76px] max-w-sm">
              {beats.map((b, i) => {
                const isActive = active === i;
                return (
                  <div
                    key={b.k}
                    aria-hidden={!isActive}
                    className="absolute inset-0 grid grid-cols-2 gap-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translateY(${isActive ? 0 : 8}px)`,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <Stat value={b.v} label={b.label} />
                    <Stat value={`0${i + 1} / 04`} label="Fase Terpilih" />
                  </div>
                );
              })}
            </div>

            {/* Enhanced Interactive Phase Strip */}
            <div className="mt-4 flex items-center gap-2">
              {beats.map((b, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    onClick={() => scrollToPhase(i)}
                    aria-label={`Ke fase ${i + 1}: ${b.k}`}
                    className={`group relative flex items-center gap-1.5 min-h-11 rounded-full px-4 transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "bg-stone-900 text-white shadow-2xs"
                        : "bg-stone-200/70 text-stone-600 hover:bg-stone-300"
                    }`}
                  >
                    <span className="font-mono text-[10px] tracking-wider">
                      0{i + 1}
                    </span>
                    {isActive && (
                      <span className="hidden sm:inline font-sans text-[10px] tracking-wider uppercase font-medium">
                        {b.k.split(" ")[0]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-start-2 lg:row-start-3 self-end min-w-0 lg:-ml-16 lg:mr-2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 invisible pointer-events-none">
                <div className="aspect-[16/10] rounded-xl" />
                <div className="aspect-[16/10] rounded-xl" />
              </div>
              {beats.map((b, i) => {
                const isActive = active === i;
                return (
                  <div
                    key={b.k}
                    aria-hidden={!isActive}
                    className="absolute inset-0 grid grid-cols-2 gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `scale(${isActive ? 1 : 0.96})`,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {b.imgs.map((img, imgIdx) => (
                      <div key={img.label} className="aspect-[16/10] rounded-[2rem] bg-black/[0.04] p-1.5 ring-1 ring-black/[0.06]">
                        <div className="relative w-full h-full rounded-[calc(2rem-0.375rem)] border border-white/60 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] bg-stone-900 flex flex-col justify-between">
                          {/* Header bar — selalu di atas gambar */}
                          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between font-mono text-[9px] text-stone-100 tracking-[0.18em] uppercase px-3.5 py-2.5 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none">
                            <span>[ FIG. 0{i + 1}.{imgIdx + 1} ]</span>
                            <span className="text-amber-400 font-semibold">● LIVE</span>
                          </div>

                          {img.src ? (
                            /* Gambar makro asli — unoptimized langsung ambil dari /public tanpa delay resize server */
                            <Image
                              src={img.src}
                              alt={img.label}
                              fill
                              unoptimized
                              sizes="(max-width: 768px) 45vw, 22vw"
                              className="object-cover"
                              priority
                            />
                          ) : (
                            /* SVG fallback untuk fase yang belum punya gambar */
                            <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center opacity-60">
                              {i === 3 && (
                                <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="text-stone-700">
                                  <line x1="6" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="1.5" />
                                  <line x1="6" y1="12" x2="34" y2="12" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
                                  <line x1="6" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="1" strokeDasharray="1 2" />
                                  <line x1="6" y1="24" x2="34" y2="24" stroke="#d97706" strokeWidth="1.5" />
                                </svg>
                              )}
                            </div>
                          )}

                          {/* Footer label — di atas gambar, bagian bawah */}
                          <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none">
                            <span className="text-[10px] font-medium tracking-tight text-white uppercase line-clamp-1 drop-shadow-md">
                              {img.label}
                            </span>
                            <span className="text-white/70 font-mono text-[9px]">→</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 mt-2 border-t border-stone-200/60 shrink-0">
          <span className="hidden md:block font-mono text-[9px] tracking-[0.18em] uppercase text-stone-400">
            [ SCROLL KE BAWAH UNTUK TRANSISI ]
          </span>
          <span className="hidden md:block font-mono text-[9px] tracking-[0.18em] uppercase text-stone-400">
            {String(active + 1).padStart(2, "0")} / 04
          </span>
        </div>
      </div>
    </section>
  );
}
