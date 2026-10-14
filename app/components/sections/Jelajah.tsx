"use client";

import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Model } from "../Bee";
import ErrorBoundary from "../ErrorBoundary";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function SarangOrbit({ onStart }: { onStart?: () => void }) {
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableRotate
      makeDefault
      target={[0, 0, 0]}
      onStart={onStart}
    />
  );
}

function SarangBee({
  onFirstDrag,
  active = true,
}: {
  onFirstDrag?: () => void;
  active?: boolean;
}) {
  return (
    <div className="h-[200px] w-[300px] sm:h-[230px] sm:w-[350px] md:h-[260px] md:w-[400px] bg-transparent">
      <Canvas
        camera={{ position: [-26, 16, 22], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        style={{ background: "transparent" }}
      >
        <hemisphereLight intensity={1.2} groundColor="#f6f3e7" />
        <directionalLight position={[4, 5, 3]} intensity={1.5} />
        <ambientLight intensity={0.6} />
        <ErrorBoundary>
          <Suspense
            fallback={
              <Html center>
                <div className="rounded-full border border-stone-300 bg-white/90 px-3 py-1 font-mono text-[10px] tracking-widest text-stone-600">
                  MEMUAT…
                </div>
              </Html>
            }
          >
            <group rotation={[-0.15, 0.35, 0]} scale={0.62}>
              <group position={[0, -11.0, -0.5]}>
                <Model clip="_bee_hover" speed={1.3} trackEnabled={false} />
              </group>
            </group>
          </Suspense>
        </ErrorBoundary>
        <SarangOrbit onStart={onFirstDrag} />
      </Canvas>
    </div>
  );
}

export default function Jelajah() {
  const p0 = useRef<SVGPathElement>(null);
  const p1 = useRef<SVGPathElement>(null);
  const p2 = useRef<SVGPathElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("jelajah-interacted")) {
        queueMicrotask(() => setHasInteracted(true));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try { gsap.registerPlugin(ScrollTrigger); } catch {}
    const el = sectionRef.current;
    if (!el) return;
    const paths = [p0.current, p1.current, p2.current].filter(Boolean) as SVGPathElement[];
    const ctx = gsap.context(() => {
      paths.forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          delay: i * 0.18,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
      const cards = el.querySelectorAll(".jelajah-card");
      if (cards.length) gsap.from(cards, { y: 18, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 70%" } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef as unknown as React.RefObject<HTMLElement>}
      id="section-jelajah"
      className="relative w-full min-h-[100dvh] text-stone-900 flex flex-col justify-between px-6 md:px-8 lg:px-12 py-6 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(28, 25, 23, 0.045) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(28, 25, 23, 0.045) 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-stone-200/60 pb-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-stone-500 whitespace-nowrap">
            03 — JELAJAH
          </p>
        </div>
        <span className="hidden sm:inline-flex font-mono text-[10px] text-stone-500 border border-stone-300/80 bg-white/50 px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
          03 / 05
        </span>
      </div>

      {/* Title & Description */}
      <div className="shrink-0 mt-4 md:mt-6">
        <div className="flex flex-wrap items-baseline gap-x-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tighter uppercase text-stone-900 leading-none">
            JELAJAH
          </h2>
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tighter uppercase text-stone-400 leading-none">
            MENCARI NEKTAR
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-stone-600 font-normal">
          Kalkulasi vektor navigasi di luar sarang. Setiap koloni memetakan radius hingga 8 kilometer dengan efisiensi energetik tinggi, merekam rute lewat polarisasi sinar dan orientasi medan magnet bumi.
        </p>
      </div>

      <div id="target-sarang" className="flex-1 min-h-[380px] md:min-h-[440px] mt-4 md:mt-6 rounded-[2rem] bg-black/[0.04] p-1.5 ring-1 ring-black/[0.06]">
        <div className="h-full rounded-[calc(2rem-0.375rem)] border border-white/60 bg-white/80 backdrop-blur-md px-4 sm:px-6 md:px-8 py-4 md:py-5 relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-200/60 pb-2 mb-2 font-mono text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest shrink-0">
          <span>RADAR TELEMETRI PENERBANGAN · KONTUR RADIUS</span>
          <span>KOORDINAT PUSAT: SARANG [0,0]</span>
        </div>

        {/* Radar Visual Arena */}
        <div className="relative flex-1 flex items-center justify-center min-h-0 w-full select-none">
          {/* 3D Bee Model & Waypoint Overlay */}
          <div
            className="pointer-events-auto absolute left-1/2 z-20 -translate-x-1/2 flex flex-col items-center bg-transparent"
            style={{ top: "2%" }}
          >
            {/* Interactive Model Badge / Callout */}
            <div className="mb-0.5 rounded-full border border-amber-300/80 bg-amber-50/90 px-3 py-1 font-mono text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.16em] text-amber-800 shadow-2xs flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>[ 3D BEE MODEL — INTERAKTIF · ROTASI 360° ]</span>
            </div>

            {visible ? (
              <SarangBee
                active={isInView}
                onFirstDrag={() => {
                  if (!hasInteracted) {
                    setHasInteracted(true);
                    try {
                      sessionStorage.setItem("jelajah-interacted", "1");
                    } catch {}
                  }
                }}
              />
            ) : (
              <div className="h-[200px] w-[300px] sm:h-[230px] sm:w-[350px] md:h-[260px] md:w-[400px] animate-pulse rounded-2xl bg-stone-100" aria-hidden />
            )}

            {/* Drag Hint */}
            <div
              className={`-mt-2 flex items-center gap-1.5 rounded-full border border-stone-300/80 bg-white/90 px-3 py-0.5 text-[9px] font-mono tracking-[0.18em] uppercase text-stone-600 shadow-2xs transition-opacity duration-700 ${
                hasInteracted ? "opacity-0 pointer-events-none" : "opacity-90"
              }`}
              aria-hidden={hasInteracted}
            >
              <span className="inline-flex text-amber-600" style={{ animation: "drag-hint 1.8s ease-in-out infinite" }}>
                ↔
              </span>
              <span>GESER UNTUK MEMUTAR LEBAH</span>
            </div>
          </div>

          {/* SVG Radar Arcs & Grid */}
          <svg
            viewBox="0 0 800 420"
            className="w-full h-full max-h-[420px] pointer-events-none select-none"
            aria-hidden="true"
          >
            {/* Radial Dotted Direction Lines */}
            <line x1="50" y1="360" x2="750" y2="360" stroke="#1c1917" strokeOpacity="0.12" strokeDasharray="3 3" />
            <line x1="400" y1="360" x2="149" y2="215" stroke="#1c1917" strokeOpacity="0.1" strokeDasharray="2 3" />
            <line x1="400" y1="360" x2="255" y2="109" stroke="#1c1917" strokeOpacity="0.1" strokeDasharray="2 3" />
            <line x1="400" y1="360" x2="400" y2="16" stroke="#1c1917" strokeOpacity="0.12" strokeDasharray="2 3" />
            <line x1="400" y1="360" x2="545" y2="109" stroke="#1c1917" strokeOpacity="0.1" strokeDasharray="2 3" />
            <line x1="400" y1="360" x2="651" y2="215" stroke="#1c1917" strokeOpacity="0.1" strokeDasharray="2 3" />

            {/* Concentric Arcs */}
            {/* Outer Arc (8 KM) */}
            <path
              ref={p0}
              d="M 120 360 A 280 280 0 0 1 680 360"
              fill="none"
              stroke="#a8a29e"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Middle Arc (5 KM) */}
            <path
              ref={p1}
              d="M 210 360 A 190 190 0 0 1 590 360"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />
            {/* Inner Arc (2.5 KM) */}
            <path
              ref={p2}
              d="M 305 360 A 95 95 0 0 1 495 360"
              fill="none"
              stroke="#e7e5e4"
              strokeWidth="1.8"
            />

            {/* Waypoint Indicator on 8 KM axis (behind bee) */}
            <circle cx="400" cy="115" r="14" fill="none" stroke="#f59e0b" strokeOpacity="0.3" strokeDasharray="2 2" />
            <circle cx="400" cy="115" r="9" fill="none" stroke="#f59e0b" strokeOpacity="0.6" strokeWidth="1.5" />
            <circle cx="400" cy="115" r="4" fill="#f59e0b" />

            {/* Labels */}
            {/* 8 KM Label */}
            <text
              x="400"
              y="26"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              letterSpacing="1.8"
              fill="#57534e"
              fontFamily="var(--font-geist-mono)"
            >
              8 KM — JELAJAH MAKS (BATAS ENERGETIK)
            </text>

            {/* 5 KM Label */}
            <text
              x="400"
              y="198"
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              letterSpacing="1.6"
              fill="#d97706"
              fontFamily="var(--font-geist-mono)"
            >
              5 KM — RUTIN HARIAN (KORIDOR OPTIMAL)
            </text>

            {/* 2.5 KM Label */}
            <text
              x="400"
              y="288"
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              letterSpacing="1.5"
              fill="#a8a29e"
              fontFamily="var(--font-geist-mono)"
            >
              2.5 KM — RADIUS SARANG INTI
            </text>

            {/* Origin (Sarang) Pin */}
            <circle cx="400" cy="360" r="7" fill="#1c1917" />
            <circle cx="400" cy="360" r="2.5" fill="#fdfbf1" />
            <text
              x="400"
              y="386"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              letterSpacing="2.5"
              fill="#1c1917"
              fontFamily="var(--font-geist-mono)"
            >
              SARANG (ORIGIN 0,0)
            </text>
          </svg>
        </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-5 shrink-0 jelajah-cards">
        <div className="jelajah-card rounded-[2rem] bg-black/[0.04] p-1.5 ring-1 ring-black/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015] active:scale-[0.985]">
          <div className="h-full rounded-[calc(2rem-0.375rem)] border border-white/60 bg-white/80 backdrop-blur-md p-5 md:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between">
          <div>
            <p className="text-4xl md:text-5xl font-light tracking-tighter text-stone-900 leading-none">
              8 KM
            </p>
            <p className="mt-2.5 font-mono text-[11px] font-medium tracking-wider uppercase text-stone-900">
              JELAJAH MAKSIMUM
            </p>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-stone-500 leading-relaxed font-normal">
            Radius terjauh lebah pekerja sebelum konsumsi madu melebihi hasil angkut.
          </p>
          </div>
        </div>
        <div className="jelajah-card rounded-[2rem] bg-black/[0.04] p-1.5 ring-1 ring-black/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015] active:scale-[0.985]">
          <div className="h-full rounded-[calc(2rem-0.375rem)] border border-white/60 bg-white/80 backdrop-blur-md p-5 md:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between">
          <div>
            <p className="text-4xl md:text-5xl font-light tracking-tighter text-stone-900 leading-none">
              15 KM/J
            </p>
            <p className="mt-2.5 font-mono text-[11px] font-medium tracking-wider uppercase text-stone-900">
              KECEPATAN JELAJAH
            </p>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-stone-500 leading-relaxed font-normal">
            Kecepatan jelajah rata-rata dengan frekuensi kepakan sayap 230 getaran/detik.
          </p>
          </div>
        </div>
        <div className="jelajah-card rounded-[2rem] bg-black/[0.04] p-1.5 ring-1 ring-black/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015] active:scale-[0.985]">
          <div className="h-full rounded-[calc(2rem-0.375rem)] border border-white/60 bg-white/80 backdrop-blur-md p-5 md:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between">
          <div>
            <p className="text-4xl md:text-5xl font-light tracking-tighter text-amber-500 leading-none">
              50%
            </p>
            <p className="mt-2.5 font-mono text-[11px] font-medium tracking-wider uppercase text-stone-900">
              BEBAN SERBUK / BOBOT
            </p>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-stone-500 leading-relaxed font-normal">
            Kemampuan mengangkut nektar dan polen seberat setengah bobot tubuhnya.
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
