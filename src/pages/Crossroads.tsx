import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { PortalEffects } from "@/components/PortalEffects";
import { audioManager } from "@/lib/audio";

import posthog from "posthog-js";

const spring = { type: "spring" as const, stiffness: 45, damping: 25, mass: 1.2 };

const Crossroads = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [hoveredSide, setHoveredSide] = useState<'eclipse' | 'chroma' | null>(null);
  const [transitioning, setTransitioning] = useState<'eclipse' | 'chroma' | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useSEO({
    title: t('landing.title') + " - Double Door Portal",
    description: "Welcome to Project Eclipse. Choose your path: Enter the dark fantasy universe or discover the Chroma Studios collective.",
    path: "/",
  });

  const handleEnter = useCallback((side: 'eclipse' | 'chroma') => {
    if (transitioning) return;
    
    // Explicitly track the entry action
    posthog.capture('portal_entry', { 
      side,
      language: i18n.language 
    });

    setTransitioning(side);
    setTimeout(() => navigate(side === 'eclipse' ? '/eclipse' : '/chroma'), 1700);
  }, [transitioning, navigate, i18n.language]);

  const eclipseImage = "/assets/eclipse/backgrounds/rgthree.compare._temp_ddgda_00029_.png";
  const chromaImage = "/assets/portal/backgrounds/chroma-portal-image.webp";

  // Width values for desktop split
  const eclipseW = transitioning === 'eclipse' ? "100%" : transitioning === 'chroma' ? "0%" : hoveredSide === 'eclipse' ? "62%" : hoveredSide === 'chroma' ? "38%" : "50%";
  const chromaW  = transitioning === 'chroma'  ? "100%" : transitioning === 'eclipse' ? "0%" : hoveredSide === 'chroma'  ? "62%" : hoveredSide === 'eclipse'  ? "38%" : "50%";

  // Height values for mobile stack
  const eclipseH = transitioning === 'eclipse' ? "100%" : transitioning === 'chroma' ? "0%" : "50%";
  const chromaH  = transitioning === 'chroma'  ? "100%" : transitioning === 'eclipse' ? "0%" : "50%";

  return (
    <>
      <PortalEffects />

      {/* Language Toggle */}
      <motion.div
        className="fixed top-6 right-6 z-[60]"
        animate={{ opacity: transitioning ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          size="sm"
          className="bg-black/60 border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm text-[10px] tracking-widest uppercase"
          onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')}
        >
          {t('nav.lang')}
        </Button>
      </motion.div>

      {/* Title */}
      <motion.div
        className="fixed z-[60] pointer-events-none top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:top-8 md:-translate-y-0"
        animate={{ opacity: transitioning ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white/50 font-cinzel text-[9px] md:text-[11px] tracking-[0.5em] uppercase text-center bg-black/40 px-4 py-2 md:bg-transparent rounded-full md:rounded-none backdrop-blur-md md:backdrop-blur-none whitespace-nowrap">
          {t('landing.title')}
        </p>
      </motion.div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-[100dvh] w-full overflow-hidden bg-black font-inter relative flex flex-col md:flex-row"
      >
        {/* ════ ECLIPSE SIDE ════ */}
        <motion.div
          className="relative cursor-pointer overflow-hidden w-full h-1/2 md:w-1/2 md:h-full shrink-0"
          animate={isMobile
            ? { width: "100%", height: eclipseH }
            : { width: eclipseW, height: "100%" }
          }
          transition={spring}
          onHoverStart={() => !transitioning && !isMobile && setHoveredSide('eclipse')}
          onHoverEnd={() => !transitioning && setHoveredSide(null)}
          onClick={() => handleEnter('eclipse')}
        >
          {/* Background image — always bg-cover bg-center so zoom stays centered */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url("${eclipseImage}")` }}
            animate={{
              scale: transitioning === 'eclipse' ? 1.18 : hoveredSide === 'eclipse' ? 1.06 : 1,
              opacity: transitioning === 'eclipse' ? 1 : hoveredSide === 'eclipse' ? 0.65 : 0.3,
            }}
            transition={transitioning === 'eclipse' ? { duration: 1.4, ease: [0.32, 0, 0.67, 0] } : spring}
          />

          {/* Base gradient — keeps text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 pointer-events-none" />
          {/* Hover red tint */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(139,0,0,0.2)", mixBlendMode: "overlay" }}
            animate={{ opacity: hoveredSide === 'eclipse' && !transitioning ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          {/* Desktop: right edge fade */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none hidden md:block" />
          {/* Mobile: bottom edge fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none md:hidden" />

          {/* Text content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 select-none"
            animate={{ opacity: transitioning ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.h2
              className="font-cinzel text-[2.75rem] sm:text-5xl md:text-6xl text-white font-bold tracking-widest text-center drop-shadow-lg leading-none"
              style={{ paddingLeft: '0.1em' }} /* Compense le letter-spacing pour un centrage parfait */
              animate={{ scale: hoveredSide === 'eclipse' && !transitioning ? 1.04 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              ECLIPSE
            </motion.h2>
            <motion.div
              className="mt-6"
              animate={{
                opacity: hoveredSide === 'eclipse' && !transitioning ? 1 : 0,
                y: hoveredSide === 'eclipse' && !transitioning ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              <span 
                className="font-cinzel text-[10px] tracking-[0.3em] uppercase px-8 py-3 md:px-10 md:py-4 bg-[#8B0000]/80 border border-[#8B0000] text-white hover:bg-[#8B0000] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)] transition-all duration-500 cursor-pointer inline-block whitespace-nowrap"
                onMouseEnter={() => audioManager.playSound('hover')}
                onClick={(e) => {
                  e.stopPropagation();
                  audioManager.playSound('click');
                  audioManager.startAmbience();
                  handleEnter('eclipse');
                }}
              >
                {t('landing.eclipse_btn')}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ════ CHROMA SIDE ════ */}
        <motion.div
          className="relative cursor-pointer overflow-hidden w-full h-1/2 md:w-1/2 md:h-full shrink-0"
          animate={isMobile
            ? { width: "100%", height: chromaH }
            : { width: chromaW, height: "100%" }
          }
          transition={spring}
          onHoverStart={() => !transitioning && !isMobile && setHoveredSide('chroma')}
          onHoverEnd={() => !transitioning && setHoveredSide(null)}
          onClick={() => handleEnter('chroma')}
        >
          {/* Background image — bg-cover bg-center so zoom stays centered */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url("${chromaImage}")` }}
            animate={{
              scale: transitioning === 'chroma' ? 1.18 : hoveredSide === 'chroma' ? 1.06 : 1,
              opacity: transitioning === 'chroma' ? 1 : hoveredSide === 'chroma' ? 0.55 : 0.22,
            }}
            transition={transitioning === 'chroma' ? { duration: 1.4, ease: [0.32, 0, 0.67, 0] } : spring}
          />

          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 pointer-events-none" />
          {/* Desktop: left edge fade */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none hidden md:block" />
          {/* Mobile: top edge fade */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none md:hidden" />

          {/* Text content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 select-none"
            animate={{ opacity: transitioning ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.h2
              className="font-oswald text-[3.25rem] sm:text-6xl md:text-7xl text-white font-bold tracking-[0.2em] text-center drop-shadow-lg leading-none"
              style={{ paddingLeft: '0.2em' }} /* Compense le letter-spacing pour un centrage parfait */
              animate={{ scale: hoveredSide === 'chroma' && !transitioning ? 1.04 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              CHROMA
            </motion.h2>
            <motion.div
              className="mt-6"
              animate={{
                opacity: hoveredSide === 'chroma' && !transitioning ? 1 : 0,
                y: hoveredSide === 'chroma' && !transitioning ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              <span 
                className="inline-block text-[10px] md:text-[11px] tracking-[0.45em] uppercase px-8 py-3 md:px-10 md:py-4 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 cursor-pointer whitespace-nowrap"
                onMouseEnter={() => audioManager.playSound('hover')}
                onClick={() => audioManager.playSound('click')}
              >
                {t('landing.chroma_btn')}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Vertical divider line — desktop only */}
        <motion.div
          className="absolute inset-y-0 left-1/2 w-px bg-white/10 hidden md:block z-20 pointer-events-none"
          animate={{ opacity: hoveredSide || transitioning ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Fade-to-black veil */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 bg-black z-[999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Crossroads;
