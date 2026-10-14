'use client';

import { useEffect, useRef, useState } from 'react';

const fieldLogs = [
  {
    id: 'log-01',
    code: 'LOG #01 — 06:12 WIB',
    status: 'VERIFIED OBS',
    title: 'Keberangkatan Pertama & Suhu Ambien',
    body: 'Pukul 06:12 — lebah pekerja pertama keluar sarang. Suhu ambien 18°C, kelembapan 74%. Tarian waggle 3 detik mengarah 40° dari azimuth matahari, mengarahkan regu ke ladang lavender sejauh 600 meter.',
  },
  {
    id: 'log-02',
    code: 'LOG #02 — AERODINAMIKA',
    status: 'HIGH FREQUENCY',
    title: 'Pola Kepakan Pusaran Angka-8',
    body: 'Lebah madu mengepakkan sayapnya dengan trajektori angka-8 kontinu, bukan naik-turun sederhana. Gerakan ini menciptakan pusaran bertekanan rendah di atas sayap yang menghasilkan daya angkat luar biasa bagi tubuhnya yang padat.',
  },
  {
    id: 'log-03',
    code: 'LOG #03 — PRODUKSI MADU',
    status: 'LIFETIME RATIO',
    title: 'Pengorbanan Seekor Pekerja',
    body: 'Sepanjang masa hidupnya yang singkat (sekitar 40 hari), seekor lebah pekerja hanya menghasilkan sekitar 1/12 sendok teh madu. Namun bersama 50.000 saudaranya, koloni mampu memproduksi hingga puluhan kilogram madu per musim.',
  },
];

export default function Fakta() {
  const [activeLog, setActiveLog] = useState(0);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); }, []);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section
      id="fakta"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-transparent text-stone-900 flex flex-col justify-between px-6 md:px-8 lg:px-12 py-6"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-200/60 pb-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[11px] tracking-[0.25em] text-stone-500 uppercase whitespace-nowrap">
              05 — OBSERVASI
            </span>
            <span className="hidden sm:inline size-1 bg-stone-300 rounded-full shrink-0" />
            <span className="hidden lg:inline font-mono text-[10px] tracking-[0.25em] text-amber-700 uppercase whitespace-nowrap">
              [ CATATAN LAPANGAN & TELEMETRI KOLONI ]
            </span>
          </div>
        </div>
        <span className="hidden sm:inline-flex font-mono text-[10px] text-stone-500 border border-stone-300/80 bg-white/50 px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
          05 / 05
        </span>
      </div>

      {/* Title */}
      <div className="shrink-0 mt-3">
        <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">
          <span>[ DEMOKRASI TANPA PUSAT KOMANDO ]</span>
        </div>
        <h2 className="font-light text-[clamp(36px,6vw,96px)] leading-[0.9] tracking-tighter text-stone-900">
          Observasi
        </h2>
      </div>

      {/* Main Content Grid — flex-1 */}
      <div className="flex-1 min-h-0 mt-4 grid grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column: Flight Trail + Key Figures */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 h-full">
          <p className="font-sans text-sm md:text-base font-light leading-relaxed tracking-tight text-stone-700">
            Satu koloni lebah menaungi hingga 50.000 individu yang bergerak sinkron tanpa satu pun komando tunggal — orkestrasi alamiah tertua yang telah bertahan puluhan juta tahun.
          </p>

          <div className="rounded-[2rem] bg-black/[0.04] p-1.5 ring-1 ring-black/[0.06]">
            <div className="rounded-[calc(2rem-0.375rem)] border border-white/60 bg-white/80 backdrop-blur-md p-4 relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-2 mb-3">
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">
                [ JALUR TERBANG — TRAIL VECTOR ]
              </span>
              <span className="font-mono text-[10px] text-stone-400">06:12 WIB · 18°C</span>
            </div>
            <svg viewBox="0 0 700 100" className="w-full h-auto select-none" aria-hidden>
              <path d="M 30 75 Q 200 10 380 55 T 670 30" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="5 5" />
              <circle cx="30" cy="75" r="5" fill="#1c1917" />
              <circle cx="380" cy="55" r="5" fill="#d97706" />
              <circle cx="670" cy="30" r="5" fill="#1c1917" />
              <text x="36" y="68" fontSize="9" letterSpacing="1.5" fill="#78716c" fontFamily="var(--font-geist-mono)">SARANG INTI</text>
              <text x="388" y="50" fontSize="9" letterSpacing="1.5" fill="#b45309" fontFamily="var(--font-geist-mono)">LAVENDER (600M)</text>
              <text x="600" y="22" fontSize="9" letterSpacing="1.5" fill="#78716c" fontFamily="var(--font-geist-mono)">SUNSET RETURN</text>
            </svg>
            </div>
          </div>

          {/* Key Colony Figures */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-stone-200/60">
            {[
              { code: '[ POPULASI ]', val: '50.000', label: 'Lebah/Sarang' },
              { code: '[ OUTPUT ]', val: '1/12', label: 'Sdt Madu/Ekor' },
              { code: '[ USIA RATU ]', val: '5 Thn', label: 'Masa Hidup Ratu' },
            ].map((f) => (
              <div key={f.code}>
                <span className="font-mono text-[9px] text-stone-400 uppercase tracking-[0.18em]">{f.code}</span>
                <p className="mt-0.5 text-xl md:text-2xl font-light tracking-tighter text-stone-900">{f.val}</p>
                <p className="font-mono text-[9px] text-stone-500 uppercase tracking-[0.18em]">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 flex flex-col gap-2 h-full overflow-hidden">
          {fieldLogs.map((log, idx) => {
            const isCurrent = activeLog === idx;
            return (
              <div
                key={log.id}
                className={`flex-1 min-h-0 rounded-2xl border p-4 transition-all duration-300 flex flex-col justify-between text-left w-full focus-within:ring-2 focus-within:ring-stone-900 ${
                  isCurrent ? 'border-stone-900 bg-stone-900 text-white shadow-md' : 'border-stone-200/80 bg-white/70 text-stone-900'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveLog(idx)}
                  aria-pressed={isCurrent}
                  aria-label={`Pilih ${log.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveLog((v) => Math.min(fieldLogs.length - 1, v + 1)); }
                    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveLog((v) => Math.max(0, v - 1)); }
                  }}
                  className="text-left w-full focus:outline-none"
                >
                  <span className="flex items-center justify-between pb-2 border-b border-stone-200/30">
                    <span className={`font-mono text-[10px] tracking-wider uppercase ${isCurrent ? 'text-amber-400' : 'text-amber-700'}`}>{log.code}</span>
                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${isCurrent ? 'border-white/20 text-white/80 bg-white/10' : 'border-stone-200 text-stone-500 bg-stone-50'}`}>{log.status}</span>
                  </span>
                  <span className={`mt-2 block text-sm md:text-base font-medium tracking-tight ${isCurrent ? 'text-white' : 'text-stone-900'}`}>{log.title}</span>
                  <span className={`mt-1 block text-xs leading-relaxed font-light ${isCurrent ? 'text-stone-300' : 'text-stone-600'}`}>&ldquo;{log.body}&rdquo;</span>
                </button>
                <span className="mt-2 pt-2 border-t border-stone-200/20 flex items-center justify-between">
                  <button type="button" onClick={() => copyText(log.body)} className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-full border transition-colors ${isCurrent ? 'border-white/30 text-white hover:bg-white/10' : 'border-stone-300 text-stone-600 hover:bg-stone-100'}`}>
                    {copied && isCurrent ? 'TERSALIN!' : 'SALIN TEKS'}
                  </button>
                  <span className={`text-[10px] font-mono tracking-widest ${isCurrent ? 'text-stone-400' : 'text-stone-400'}`}>0{idx + 1} / 03</span>
                </span>
              </div>
            );
          })}
          <span aria-live="polite" className="sr-only">{copied ? 'Teks tersalin' : ''}</span>
        </div>
      </div>

      {/* Bottom Bar — Attribution CC-BY-4.0 */}
      <div className="shrink-0 pt-3 border-t border-stone-200/60 flex items-center justify-between gap-4">
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-stone-500">
          [ APIS MELLIFERA · HYMENOPTERA · BEE STORY PROJECT ]
        </span>
        <span className="font-mono text-[9px] tracking-[0.18em] text-stone-500 text-right leading-relaxed shrink-0">
          Model &ldquo;Bee&rdquo; by{' '}
          <a href="https://sketchfab.com/hellonintendo8" className="underline underline-offset-2 hover:text-stone-700">
            Jakob Henerey
          </a>{' '}
          &mdash;{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/" className="underline underline-offset-2 hover:text-stone-700">
            CC-BY-4.0
          </a>
        </span>
      </div>
    </section>
  );
}
