import { useEffect, useRef } from "react";

// ─── Fluid Particle System ────────────────────────────────────────────────────
// Uses the "metaball" technique: draw all particles blurred on an offscreen
// canvas, then apply a threshold filter so nearby particles merge organically
// into a single liquid blob.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;      // 0→1, starts at 1
  maxLife: number;
  size: number;
}

export const PortalEffects = () => {
  return (
    <>
      {/* ── Film Grain ─────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.12] mix-blend-overlay select-none bg-film-grain" />
    </>
  );
};
