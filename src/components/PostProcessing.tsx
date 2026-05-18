export const PostProcessing = () => {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* ── High-End Film Grain ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.25] mix-blend-overlay pointer-events-none">
        <filter id="ultra-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ultra-grain)" />
      </svg>
      
      {/* ── Subtle Cinematic Vignette ── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_120%_120%_at_50%_50%,_transparent_60%,_rgba(0,0,0,0.8)_100%)]" />
      
      {/* ── Subtle Red Chromatic Aberration (No Blue) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-screen bg-[linear-gradient(90deg,_rgba(139,0,0,0.5)_0%,_transparent_10%,_transparent_90%,_rgba(139,0,0,0.5)_100%)]" />
    </div>
  );
};
