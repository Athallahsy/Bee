# 🐝 Bee — 3D Scroll-Driven Storytelling

A scroll-driven interactive 3D website about bees, built with Next.js, React Three Fiber, and GSAP. Inspired by the layout structure of [drone.riotters.com](https://drone.riotters.com) with a natural/botanical palette.

---

## ✨ Features

- **3D bee model** rendered with React Three Fiber (WebGL)
- **Scroll-driven animation** — camera and bee react to scroll position
- **5 thematic sections**: Hero, Anatomy, Ecosystem, Abilities, Fun Facts
- **Smooth scrolling** powered by Lenis
- **Animated honeycombs** as background elements
- Responsive typography with big stat callouts and floating annotation cards

---

## 🛠️ Tech Stack

| Technology | Version |
|---|---|
| Next.js (App Router) | 16.3.4 |
| React | 19.2.8 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Three.js | ^0.185.1 |
| @react-three/fiber | ^9.7.0 |
| @react-three/drei | ^10.7.8 |
| GSAP + ScrollTrigger | ^3.15.0 |
| Lenis | latest |

---

## 📁 Project Structure

```
app/
  components/
    Bee.tsx               # 3D bee model (React Three Fiber)
    SceneCanvas.tsx       # WebGL canvas wrapper
    HoneycombBg.tsx       # Animated honeycomb background
    Nav.tsx               # Navigation
    LenisProvider.tsx     # Smooth scroll provider
    sections/
      Hero.tsx            # Section 1 — bee idle animation
      Anatomy.tsx         # Section 2 — anatomy stat callouts
      Jelajah.tsx         # Section 3 — ecosystem role
      Kemampuan.tsx       # Section 4 — bee abilities
      Fakta.tsx           # Section 5 — floating annotation cards
public/
  models/
    bee-transformed.glb   # Draco-compressed 3D model (in use)
    bee.glb               # Original model (reference)
    textures/
      bee-diffuse.png     # Base color texture
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Athallahsy/Bee.git
cd Bee

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Attribution

3D Model: **"Bee"** by [Jakob Henerey](https://sketchfab.com/hellonintendo8) — licensed under [Creative Commons Attribution (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/).
