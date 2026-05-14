import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const BloodScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth, organic easing
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.001
  });

  const liquidHeight = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 h-[45vh] w-[4px] z-[100] pointer-events-none hidden md:block">
      
      {/* ── Global SVG Filters for Organic Texture ── */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="blood-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0.5  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
            <feBlend mode="multiply" in="texture" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* ── Vein Background ── */}
      <div className="absolute inset-0 bg-[#2a0000]/20 rounded-full" />
      
      {/* ── Active Blood Stream (Surgical & Thin) ── */}
      <motion.div
        className="absolute bottom-0 w-full rounded-full"
        style={{ 
          height: liquidHeight,
          filter: "url(#blood-texture)",
          background: "linear-gradient(to top, #4a0000, #8B0000, #ff0000)"
        }}
      >
        {/* Glow head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-[#ff0000] rounded-full blur-[2px] shadow-[0_0_10px_#ff0000]" />
      </motion.div>

      {/* ── Label ── */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2">
        <span className="font-cinzel text-[8px] tracking-[0.4em] uppercase text-[#8B0000]/60 -rotate-90 whitespace-nowrap block origin-center">
          Blood Flow
        </span>
      </div>
    </div>
  );
};
