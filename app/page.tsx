import Hero from "./components/sections/Hero";
import Anatomy from "./components/sections/Anatomy";
import Jelajah from "./components/sections/Jelajah";
import Kemampuan from "./components/sections/Kemampuan";
import Fakta from "./components/sections/Fakta";
import SceneCanvas from "./components/SceneCanvas";
import HoneycombBg from "./components/HoneycombBg";

export default function Home() {
  return (
    <main className="relative">
      {/* Honeycomb Hero-only di belakang bee — parallax halus referensi Image 1, tidak ke section bawah */}
      <div className="relative grid">
        <div aria-hidden className="pointer-events-none col-start-1 row-start-1 h-[100dvh] overflow-hidden relative z-0">
          <HoneycombBg />
        </div>
        <div className="col-start-1 row-start-1">
          <SceneCanvas bounded />
        </div>
        <div className="col-start-1 row-start-1 relative z-10">
          <Hero />
          <Anatomy />
        </div>
      </div>
      <div className="relative z-10">
        <Jelajah />
        <Kemampuan />
        <Fakta />
      </div>
    </main>
  );
}
