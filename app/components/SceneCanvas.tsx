"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Center, Environment, Html, Preload } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Model } from "./Bee";
import ErrorBoundary from "./ErrorBoundary";
import { CAM_WPS, POS_WPS, ROT_WPS, type Vec3 } from "./waypoints";

export function useGlobalProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const upd = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / h)));
      });
    };
    upd();
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    let off: (() => void) | undefined;
    try {
      const lenis = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } }).__lenis;
      if (lenis) { lenis.on("scroll", upd); off = () => lenis.off("scroll", upd); }
    } catch {}
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
      off?.();
    };
  }, []);
  return p;
}

function useReducedMotion() {
  const [r, setR] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const h = () => setR(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return r;
}

// Layout: Hero(100vh) + Anatomy(400vh) + Jelajah(100vh) + Kemampuan(100vh) + Fakta(100vh) = 800vh total
// Scrollable range: 700vh  →  p = scrollY / 700
// Hero: p = 0 to 0.143 (lebah di tengah)
// Anatomy: p = 0.143 to 0.60 (lebah tetap di kanan x=26 sepanjang 4 fase)
// Transisi Jelajah (p = 0.60 s/d 0.84):
//   - Fase 4 selesai: lebah meluncur menukik ke bawah-kiri melewati area Jelajah
//   - Menghilang di kiri bawah layar (p >= 0.82)



function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpCam(p: number) {
  let i = 0;
  while (i < CAM_WPS.length - 1 && p > CAM_WPS[i + 1].p) i++;
  const a = CAM_WPS[i];
  const b = CAM_WPS[Math.min(CAM_WPS.length - 1, i + 1)];
  const span = b.p - a.p || 1;
  const t = Math.min(1, Math.max(0, (p - a.p) / span));
  const s = t * (2 - t);
  return {
    pos: [
      lerp(a.pos[0], b.pos[0], s),
      lerp(a.pos[1], b.pos[1], s),
      lerp(a.pos[2], b.pos[2], s),
    ] as Vec3,
    target: [
      lerp(a.target[0], b.target[0], s),
      lerp(a.target[1], b.target[1], s),
      lerp(a.target[2], b.target[2], s),
    ] as Vec3,
  };
}

function interpPos(p: number): Vec3 {
  let i = 0;
  while (i < POS_WPS.length - 1 && p > POS_WPS[i + 1].p) i++;
  const a = POS_WPS[i];
  const b = POS_WPS[Math.min(POS_WPS.length - 1, i + 1)];
  const span = b.p - a.p || 1;
  const t = Math.min(1, Math.max(0, (p - a.p) / span));
  const s = t * (2 - t);
  return [
    lerp(a.pos[0], b.pos[0], s),
    lerp(a.pos[1], b.pos[1], s),
    lerp(a.pos[2], b.pos[2], s),
  ];
}

function interpRot(p: number) {
  let i = 0;
  while (i < ROT_WPS.length - 1 && p > ROT_WPS[i + 1].p) i++;
  const a = ROT_WPS[i];
  const b = ROT_WPS[Math.min(ROT_WPS.length - 1, i + 1)];
  const span = b.p - a.p || 1;
  const t = Math.min(1, Math.max(0, (p - a.p) / span));
  const s = t * (2 - t);
  return {
    x: lerp(a.x, b.x, s),
    y: lerp(a.y, b.y, s),
    z: lerp(a.z, b.z, s),
  };
}

const _posVec = new THREE.Vector3();
const _camPosVec = new THREE.Vector3();
const _camTargetVec = new THREE.Vector3();

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-stone-300 bg-white/90 px-3 py-1 font-mono text-[10px] tracking-widest text-stone-600">
        MEMUAT…
      </div>
    </Html>
  );
}

function Rig({ progress, debug }: { progress: number; debug?: boolean }) {
  const g = useRef<THREE.Group>(null);
  const rotY = useRef(0);
  const rotX = useRef(0);
  const rotZ = useRef(0);
  const reduced = useReducedMotion();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const dPos = interpPos(progress);
    const dRot = interpRot(progress);

    const verticalBob = reduced ? 0 : Math.sin(t * 2.4) * 0.22 + Math.sin(t * 5.8) * 0.05 + Math.cos(t * 8.7) * 0.02;
    const lateralSway = reduced ? 0 : Math.cos(t * 1.6) * 0.14;
    const hoverPitchFlutter = reduced ? 0 : Math.sin(t * 2.8) * 0.04;
    const hoverRollFlutter = reduced ? 0 : Math.cos(t * 2.2) * 0.04;
    const hoverYawFlutter = reduced ? 0 : Math.sin(t * 1.3) * 0.02;

    if (g.current) {
      _posVec.set(dPos[0] + lateralSway, dPos[1] + verticalBob, dPos[2]);
      g.current.position.lerp(_posVec, 0.09);
    }

    const targetRotX = dRot.x + hoverPitchFlutter;
    const targetRotY = dRot.y + hoverYawFlutter;
    const targetRotZ = dRot.z + hoverRollFlutter;
    rotX.current = THREE.MathUtils.lerp(rotX.current, targetRotX, 0.09);
    rotY.current = THREE.MathUtils.lerp(rotY.current, targetRotY, 0.09);
    rotZ.current = THREE.MathUtils.lerp(rotZ.current, targetRotZ, 0.09);

    if (g.current) {
      g.current.rotation.x = rotX.current;
      g.current.rotation.y = rotY.current;
      g.current.rotation.z = rotZ.current;
    }

    if (debug && (state as unknown as { controls?: unknown }).controls) return;
    const { pos, target } = interpCam(progress);
    const cam = state.camera as THREE.PerspectiveCamera;
    _camPosVec.set(pos[0], pos[1], pos[2]);
    _camTargetVec.set(target[0], target[1], target[2]);
    cam.position.lerp(_camPosVec, 0.08);
    cam.lookAt(_camTargetVec);
  });
  const trackEnabled = progress < 0.62;
  return (
    <group ref={g}>
      <Center>
        <group rotation={[-0.2, 0, 0]}>
          <Model trackEnabled={trackEnabled} />
        </group>
      </Center>
    </group>
  );
}



export default function SceneCanvas({ debug = false, bounded = false }: { debug?: boolean; bounded?: boolean }) {
  const progress = useGlobalProgress();
  const heroPos = CAM_WPS[0].pos;
  const wrapperClass = bounded
    ? "pointer-events-none sticky top-0 h-[100dvh] w-full z-0"
    : "pointer-events-none fixed inset-0 z-0";

  return (
    <div className={wrapperClass} aria-hidden={debug ? undefined : true}>
      <Canvas camera={{ position: heroPos, fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
        }}
      >
        <hemisphereLight intensity={1.15} groundColor="#f6f3e7" />
        <directionalLight position={[4, 6, 3]} intensity={1.6} />
        <directionalLight position={[-3, 2, -2]} intensity={0.55} />
        <ambientLight intensity={0.42} />
        <Environment preset="forest" environmentIntensity={0.35} />
        <AdaptiveDpr pixelated />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Rig progress={progress} debug={debug} />
            <Preload all />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
      {debug && (
        <div className="pointer-events-auto absolute left-3 top-3 rounded-xl border border-stone-200 bg-white/95 px-3 py-2 text-[10px] leading-none shadow">
          <span className="tracking-[0.15em] uppercase text-stone-500">
            {(progress * 100).toFixed(0)}% — drag canvas cari waypoint, cek
            console untuk camera.position
          </span>
        </div>
      )}
    </div>
  );
}
