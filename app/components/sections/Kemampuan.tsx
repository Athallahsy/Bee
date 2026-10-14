'use client';

import { useState } from 'react';

const capabilities = [
  {
    id: 'waggle',
    title: 'Waggle Dance',
    tag: 'KOMUNIKASI SUDUT AZIMUTH',
    stat: '6',
    unit: 'km',
    statLabel: 'Jangkauan Pesan Koordinat',
    efficiency: '98.4%',
    desc: 'Tarian angka-8 di kegelapan dinding sarang mengkode jarak (durasi getar) dan sudut azimuth terhadap matahari. Ribuan pekerja koloni menyerap frekuensi tarian ini dan terbang serentak menuju koordinat bunga.',
    metrics: [
      { l: 'Akurasi Arah', v: '±5° Azimuth' },
      { l: 'Frekuensi Dengung', v: '260–300 Hz' },
    ],
  },
  {
    id: 'antenna',
    title: 'Reseptor Antena',
    tag: 'CHEMORESEPTOR OLFATORI',
    stat: '170',
    unit: 'sensor',
    statLabel: 'Reseptor Bau Sensitif',
    efficiency: '99.1%',
    desc: 'Antena lebah dilengkapi lebih dari 170 reseptor kimiawi canggih. Mampu membedakan ratusan variasi aroma bunga, mendeteksi feromon ratu, dan menangkap sinyal alarm bahaya dari jarak ratusan meter.',
    metrics: [
      { l: 'Sensitivitas Feromon', v: 'Ppm Trace' },
      { l: 'Jarak Deteksi Bau', v: '>800 meter' },
    ],
  },
  {
    id: 'uv-polar',
    title: 'Polarisasi UV',
    tag: 'KOMPAS CAHAYA SKY-LIGHT',
    stat: '300°',
    unit: 'arc',
    statLabel: 'Medan Deteksi Polarisasi',
    efficiency: '96.8%',
    desc: 'Saat langit tertutup mendung tebal, lebah memanfaatkan pola polarisasi sinar ultraviolet di atmosfer sebagai kompas navigasi absolut. Kelopak bunga memancarkan target UV yang memandu pendaratan nektar.',
    metrics: [
      { l: 'Spektrum Terbaca', v: '300–650 nm' },
      { l: 'Mata Majemuk', v: '6.900 Ommatidia' },
    ],
  },
  {
    id: 'thermo',
    title: 'Termoregulasi',
    tag: 'IKLIM MIKRO KOLONI',
    stat: '35°C',
    unit: 'stabil',
    statLabel: 'Suhu Inkubasi Sarang',
    efficiency: '99.6%',
    desc: 'Koloni mempertahankan suhu internal sarang secara presisi di 34.5°C – 35.5°C. Ribuan lebah mengepakkan sayap bersamaan untuk ventilasi pendingin, atau menggetarkan otot toraks untuk memanaskan sel larva.',
    metrics: [
      { l: 'Toleransi Suhu', v: '±0.5°C Akurasi' },
      { l: 'Metode Ventilasi', v: 'Kepakan Bersama' },
    ],
  },
];

export default function Kemampuan() {
  const [activeTab, setActiveTab] = useState(0);
  const cur = capabilities[activeTab];

  return (
    <section
      id="kemampuan"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-transparent text-stone-900 flex flex-col justify-between px-6 md:px-8 lg:px-12 py-6"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-200/60 pb-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[11px] tracking-[0.25em] text-stone-500 uppercase whitespace-nowrap">
              04 — KEMAMPUAN
            </span>
            <span className="hidden sm:inline size-1 bg-stone-300 rounded-full shrink-0" />
            <span className="hidden lg:inline font-mono text-[10px] tracking-[0.25em] text-amber-700 uppercase whitespace-nowrap">
              [ {cur.tag} ]
            </span>
          </div>
        </div>
        <span className="hidden sm:inline-flex font-mono text-[10px] text-stone-500 border border-stone-300/80 bg-white/50 px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
          04 / 05
        </span>
      </div>

      {/* Title + Horizontal Tab Navigation */}
      <div className="shrink-0 mt-3">
        <h2 className="font-light text-[clamp(36px,6vw,96px)] leading-[0.9] tracking-tighter text-stone-900">
          Kemampuan
        </h2>
        <nav aria-label="Kemampuan lebah" className="mt-3 border-b border-stone-200/80 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div role="tablist" className="flex w-max items-center gap-5 sm:gap-8 pb-3">
            {capabilities.map((cap, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={cap.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`kemampuan-panel-${cap.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTab(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') { e.preventDefault(); setActiveTab((v) => (v + 1) % capabilities.length); }
                    if (e.key === 'ArrowLeft') { e.preventDefault(); setActiveTab((v) => (v - 1 + capabilities.length) % capabilities.length); }
                  }}
                  className={`relative shrink-0 cursor-pointer whitespace-nowrap font-light text-lg md:text-xl lg:text-2xl tracking-tight transition-colors ${
                    isSelected ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <span>{cap.title}</span>
                  {isSelected && (
                    <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-stone-900" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <div id={`kemampuan-panel-${cur.id}`} role="tabpanel" aria-live="polite" className="flex-1 min-h-0 mt-4 grid grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column: Narrative + Metrics */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2">
              <span>[ FUNGSI ADAPTIF 0{activeTab + 1} / 04 ]</span>
            </div>
            <p className="font-sans text-lg md:text-xl lg:text-2xl font-light leading-snug tracking-tight text-stone-900">
              {cur.desc}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-200/60 grid grid-cols-2 gap-4">
            {cur.metrics.map((m) => (
              <div key={m.l} className="space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-stone-400">
                  {m.l}
                </p>
                <p className="font-sans text-base md:text-lg font-medium text-stone-800 tracking-tight">
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-[2rem] bg-black/[0.04] p-1.5 ring-1 ring-black/[0.06]">
            <div className="rounded-[calc(2rem-0.375rem)] border border-white/60 bg-white/80 backdrop-blur-md p-5 md:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-stone-500">
                [ TELEMETRY SPESIFIKASI ]
              </span>
              <span className="font-mono text-[10px] text-amber-700 font-medium">
                0{activeTab + 1}
              </span>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-light tracking-tighter text-stone-900 leading-none">
                  {cur.stat}
                </span>
                <span className="font-mono text-sm text-stone-500 uppercase">
                  {cur.unit}
                </span>
              </div>
              <p className="mt-1.5 text-xs md:text-sm font-medium text-stone-700 tracking-tight">
                {cur.statLabel}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200/60 space-y-2">
              <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.18em] text-stone-500">
                <span>EFISIENSI BIOLOGIS</span>
                <span className="text-stone-900 font-medium">{cur.efficiency}</span>
              </div>
              <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-900 transition-all duration-700 rounded-full"
                  style={{ width: cur.efficiency }}
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Attribution Strip */}
      <div className="shrink-0 pt-3 border-t border-stone-200/60 flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-stone-400">
          [ KEMAMPUAN ADAPTIF LEBAH MADU ]
        </span>
        <span className="font-mono text-[9px] tracking-[0.18em] text-stone-400">
          {String(activeTab + 1).padStart(2, '0')} / 04
        </span>
      </div>
    </section>
  );
}
