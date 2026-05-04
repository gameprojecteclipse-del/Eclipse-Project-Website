import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSEO } from "@/hooks/useSEO";
import { imageSetWithFallback } from "@/lib/utils";

// ─── Letter reveal ────────────────────────────────────────────────────────
const LetterReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span className="inline-flex flex-wrap justify-center">
    {text.split("").map((ch, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        className={ch === " " ? "w-2" : ""}
      >
        {ch}
      </motion.span>
    ))}
  </span>
);

// ─── Main ─────────────────────────────────────────────────────────────────
const Crossroads = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [hoveredSide, setHoveredSide] = useState<"eclipse" | "chroma" | null>(null);
  const [selectedSide, setSelectedSide] = useState<"eclipse" | "chroma" | null>(null);
  const [ready, setReady] = useState(false);

  useSEO({
    title: t("landing.title") + " — Choose Your Path",
    description: "Two worlds. One choice. Enter Project Eclipse or discover Chroma Studios.",
    path: "/",
  });

  // Entrance delay
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(id);
  }, []);

  const handleSelect = (side: "eclipse" | "chroma") => {
    if (selectedSide) return;
    setSelectedSide(side);
    // Film fade then navigate
    setTimeout(() => navigate(`/${side}`), 1400);
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr");
  };

  // Spring config — heavy, organic, never mechanical
  const spring = { type: "spring", stiffness: 32, damping: 28, mass: 1.8 } as const;
  const springFast = { type: "spring", stiffness: 50, damping: 30, mass: 1 } as const;

  // Width logic: hover = 65/35, neutral = 50/50, selected = takeover
  const getWidth = (side: "eclipse" | "chroma") => {
    if (selectedSide === side) return "100%";
    if (selectedSide && selectedSide !== side) return "0%";
    if (hoveredSide === side) return "65%";
    if (hoveredSide && hoveredSide !== side) return "35%";
    return "50%";
  };

  return (
    <>
      {/* SVG heat warp for title */}
      <svg className="hidden" aria-hidden>
        <defs>
          <filter id="heat" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black relative select-none cursor-crosshair">

        {/* ── Cinematic Film Fade Out ─────────────────────── */}
        <AnimatePresence>
          {selectedSide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black z-[500] pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* ── Lang toggle ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready && !selectedSide ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="absolute top-6 right-6 z-50 pointer-events-auto"
        >
          <button
            onClick={toggleLang}
            className="px-4 py-2 border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-400 font-inter text-[10px] tracking-[0.25em] uppercase bg-black/20 backdrop-blur-sm"
          >
            {t("nav.lang")}
          </button>
        </motion.div>

        {/* ── Centered title — appears last ──────────────── */}
        <div className="absolute inset-x-0 top-10 z-40 pointer-events-none flex justify-center">
          <AnimatePresence>
            {ready && !selectedSide && (
              <h1 className="font-cinzel text-[9px] md:text-[11px] tracking-[0.55em] uppercase text-white/35">
                <LetterReveal text="CHOOSE YOUR DESTINY" delay={1.4} />
              </h1>
            )}
          </AnimatePresence>
        </div>

        {/* ══ ECLIPSE ════════════════════════════════════════════════════════ */}
        <motion.section
          className="relative h-full overflow-hidden flex-shrink-0 max-md:!w-full max-md:!h-1/2"
          initial={{ width: "50%", opacity: 0 }}
          animate={{ width: getWidth("eclipse"), opacity: ready ? 1 : 0 }}
          transition={
            !ready
              ? { duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
              : spring
          }
          onHoverStart={() => !selectedSide && setHoveredSide("eclipse")}
          onHoverEnd={() => !selectedSide && setHoveredSide(null)}
          onClick={() => handleSelect("eclipse")}
          style={{ zIndex: selectedSide === "eclipse" ? 20 : 10, cursor: "pointer" }}
        >
          {/* Background image — fixed center, never shifts */}
          <motion.div
            className="absolute inset-0 bg-[url('/assets/gallery/art-1.webp')] bg-cover bg-center"
            animate={{
              scale: hoveredSide === "eclipse" || selectedSide === "eclipse" ? 1.08 : 1,
              opacity: hoveredSide === "eclipse" || selectedSide === "eclipse" ? 0.65 : 0.28,
            }}
            transition={springFast}
          />

          {/* Blood atmosphere on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: hoveredSide === "eclipse" ? 1 : 0,
            }}
            transition={{ duration: 1.0 }}
            style={{
              background: "radial-gradient(ellipse 70% 70% at 50% 60%, rgba(100,0,0,0.35) 0%, transparent 80%)",
            }}
          />

          {/* Vignette — darker when other side hovered */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: hoveredSide === "chroma" ? 1 : 0.6,
            }}
            transition={{ duration: 1.2 }}
            style={{
              background: "linear-gradient(to right, transparent 0%, black 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

          {/* Content — centered, stays put */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-12"
            animate={{
              opacity: selectedSide ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Title */}
            <motion.h2
              animate={{
                scale: hoveredSide === "eclipse" ? 1.06 : 1,
                color: hoveredSide === "eclipse" ? "#8B0000" : "#ffffff",
                textShadow:
                  hoveredSide === "eclipse"
                    ? "0 0 50px rgba(139,0,0,0.8), 0 0 100px rgba(139,0,0,0.3)"
                    : "none",
              }}
              transition={springFast}
              className="font-cinzel text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] text-center mb-4"
            >
              ECLIPSE
            </motion.h2>

            {/* Separator line */}
            <motion.div
              className="bg-gradient-to-r from-transparent via-[#8B0000] to-transparent h-px mb-6"
              animate={{
                width: hoveredSide === "eclipse" ? "160px" : "80px",
                opacity: hoveredSide === "eclipse" ? 1 : 0.4,
              }}
              transition={springFast}
            />

            {/* Description — only fully visible on hover */}
            <motion.p
              className="text-white/60 font-inter text-xs tracking-[0.2em] uppercase text-center max-w-xs leading-relaxed mb-10"
              animate={{ opacity: hoveredSide === "eclipse" ? 1 : 0.45 }}
              transition={{ duration: 0.7 }}
            >
              {t("landing.eclipse_desc")}
            </motion.p>

            {/* CTA — Eclipse style from EclipseHero */}
            <motion.button
              animate={{ opacity: hoveredSide === "eclipse" ? 1 : 0.5 }}
              transition={{ duration: 0.5 }}
              className="font-cinzel text-[10px] tracking-[0.3em] uppercase px-10 py-4 bg-[#8B0000]/80 border border-[#8B0000] text-white hover:bg-[#8B0000] hover:shadow-[0_0_40px_rgba(139,0,0,0.6)] transition-all duration-500"
            >
              {t("landing.eclipse_btn")}
            </motion.button>
          </motion.div>
        </motion.section>

        {/* ══ CHROMA ═════════════════════════════════════════════════════════ */}
        <motion.section
          className="relative h-full overflow-hidden flex-shrink-0 max-md:!w-full max-md:!h-1/2"
          initial={{ width: "50%", opacity: 0 }}
          animate={{ width: getWidth("chroma"), opacity: ready ? 1 : 0 }}
          transition={
            !ready
              ? { duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
              : spring
          }
          onHoverStart={() => !selectedSide && setHoveredSide("chroma")}
          onHoverEnd={() => !selectedSide && setHoveredSide(null)}
          onClick={() => handleSelect("chroma")}
          style={{ zIndex: selectedSide === "chroma" ? 20 : 10, cursor: "pointer" }}
        >
          {/* Background image — fixed center, never shifts */}
          <motion.div
            className="absolute inset-0 bg-center bg-no-repeat"
            style={{
              backgroundImage: imageSetWithFallback("/assets/chroma portal image"),
              backgroundSize: "60%",
            }}
            animate={{
              scale: hoveredSide === "chroma" || selectedSide === "chroma" ? 1.05 : 1.1,
              opacity: hoveredSide === "chroma" || selectedSide === "chroma" ? 0.7 : 0.22,
              filter:
                hoveredSide === "chroma" || selectedSide === "chroma"
                  ? "grayscale(0%)"
                  : "grayscale(100%)",
            }}
            transition={springFast}
          />

          {/* Tech atmosphere on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hoveredSide === "chroma" ? 1 : 0 }}
            transition={{ duration: 0.9 }}
            style={{
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(180,190,255,0.06) 0%, transparent 80%)",
            }}
          />

          {/* Subtle scan lines on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hoveredSide === "chroma" ? 0.04 : 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, transparent 1px, transparent 5px)",
            }}
          />

          {/* Vignette — darker when other side hovered */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hoveredSide === "eclipse" ? 1 : 0.6 }}
            transition={{ duration: 1.2 }}
            style={{
              background: "linear-gradient(to left, transparent 0%, black 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

          {/* Content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-12"
            animate={{ opacity: selectedSide ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              animate={{
                scale: hoveredSide === "chroma" ? 1.05 : 1,
                letterSpacing: hoveredSide === "chroma" ? "0.35em" : "0.18em",
                textShadow:
                  hoveredSide === "chroma"
                    ? "0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(200,210,255,0.2)"
                    : "none",
              }}
              transition={springFast}
              className="font-oswald text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-4"
            >
              CHROMA
            </motion.h2>

            <motion.div
              className="bg-gradient-to-r from-transparent via-white/50 to-transparent h-px mb-6"
              animate={{
                width: hoveredSide === "chroma" ? "160px" : "80px",
                opacity: hoveredSide === "chroma" ? 1 : 0.3,
              }}
              transition={springFast}
            />

            <motion.p
              className="text-white/60 font-inter text-xs tracking-[0.2em] uppercase text-center max-w-xs leading-relaxed mb-10"
              animate={{ opacity: hoveredSide === "chroma" ? 1 : 0.45 }}
              transition={{ duration: 0.7 }}
            >
              {t("landing.chroma_desc")}
            </motion.p>

            {/* CTA — Chroma minimalist studio style */}
            <motion.button
              animate={{ opacity: hoveredSide === "chroma" ? 1 : 0.5 }}
              transition={{ duration: 0.5 }}
              className="font-oswald text-[11px] tracking-[0.3em] uppercase px-10 py-4 bg-white/5 border border-white/25 text-white hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-500"
            >
              {t("landing.chroma_btn")}
            </motion.button>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default Crossroads;
