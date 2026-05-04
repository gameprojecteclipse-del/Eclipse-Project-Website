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
      <div
        className="fixed inset-0 pointer-events-none z-[5] opacity-[0.12] mix-blend-overlay select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </>
  );
};
