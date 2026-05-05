import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { imageSetWithFallback } from "@/lib/utils";
import { PortalEffects } from "@/components/PortalEffects";

// Spring configs
const sectionSpring = { type: "spring" as const, stiffness: 45, damping: 25, mass: 1.2 };
const bgSpring = { type: "spring" as const, stiffness: 45, damping: 25, mass: 1.2 };

const Crossroads = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [hoveredSide, setHoveredSide] = useState<'eclipse' | 'chroma' | null>(null);
  const [transitioning, setTransitioning] = useState<'eclipse' | 'chroma' | null>(null);

  useSEO({
    title: t('landing.title') + " - Double Door Portal",
    description: "Welcome to Project Eclipse. Choose your path: Enter the dark fantasy universe or discover the Chroma Studios collective.",
    path: "/",
  });

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  // Cinematic click: expand → zoom into image → fade to black → navigate
  const handleEnter = useCallback((side: 'eclipse' | 'chroma') => {
    if (transitioning) return;
    setTransitioning(side);
    // After the animation completes (expand 500ms + zoom 600ms + fade 400ms = ~1.8s total)
    setTimeout(() => {
      navigate(side === 'eclipse' ? '/eclipse' : '/chroma');
    }, 1700);
  }, [transitioning, navigate]);

  const eclipseImage = "/assets/gallery/art-1.webp";
  const chromaImage = imageSetWithFallback('/assets/chroma portal image');

  return (
    <>
      {/* ── Portal atmosphere effects (grain + particle trail + lens) ── */}
      <PortalEffects />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-[100dvh] w-full flex flex-col md:flex-row overflow-hidden bg-black font-inter relative"
      >
        {/* Language Toggle */}
        <motion.div
          className="absolute top-6 right-6 z-50"
          animate={{ opacity: transitioning ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="outline"
            className="bg-black/50 border-white/20 text-white hover:bg-white/10 hover:text-white"
            onClick={toggleLang}
          >
            {t('nav.lang')}
          </Button>
        </motion.div>

        {/* Title */}
        <motion.div
          className="absolute top-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          animate={{ opacity: transitioning ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-white/80 font-cinzel text-xl md:text-3xl tracking-[0.3em] uppercase text-center">
            {t('landing.title')}
          </h1>
        </motion.div>

        {/* ══ ECLIPSE SIDE ══ */}
        <motion.div
          className="relative group cursor-pointer h-full overflow-hidden max-md:!w-full max-md:!h-1/2"
          initial={{ width: "50%" }}
          animate={{
            width: transitioning === 'eclipse'
              ? "100%"
              : transitioning === 'chroma'
              ? "0%"
              : hoveredSide === 'eclipse'
              ? "60%"
              : hoveredSide === 'chroma'
              ? "40%"
              : "50%"
          }}
          transition={sectionSpring}
          onHoverStart={() => !transitioning && setHoveredSide('eclipse')}
          onHoverEnd={() => !transitioning && setHoveredSide(null)}
          onClick={() => handleEnter('eclipse')}
        >
          {/* BG image — zooms in on click */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url("${eclipseImage}")`
            }}
            animate={{
              scale: transitioning === 'eclipse' ? 1.3 : hoveredSide === 'eclipse' ? 1.04 : 1,
              opacity: transitioning === 'eclipse' ? 0.9 : hoveredSide === 'eclipse' ? 0.55 : 0.25,
            }}
            transition={transitioning === 'eclipse'
              ? { duration: 1.4, ease: [0.32, 0, 0.67, 0] }
              : bgSpring}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-blood-red/10 mix-blend-overlay group-hover:bg-blood-red/30 transition-colors duration-700" />

          {/* Edge softening */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none max-md:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none md:hidden" />

          {/* Content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 min-w-[300px] max-md:min-w-0 z-10"
            animate={{ opacity: transitioning ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <motion.h2
              className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-widest text-center mb-6"
              whileHover={{ scale: 1.05 }}
            >
              ECLIPSE
            </motion.h2>
            <p className="text-white/70 font-inter text-sm md:text-base tracking-widest uppercase mb-8 text-center max-w-sm">
              {t('landing.eclipse_desc')}
            </p>
            <Button variant="ghost" className="text-white border border-white/20 hover:bg-white hover:text-black uppercase tracking-widest transition-all duration-300">
              {t('landing.eclipse_btn')}
            </Button>
          </motion.div>
        </motion.div>

        {/* ══ CHROMA SIDE ══ */}
        <motion.div
          className="relative group cursor-pointer h-full overflow-hidden max-md:!w-full max-md:!h-1/2"
          initial={{ width: "50%" }}
          animate={{
            width: transitioning === 'chroma'
              ? "100%"
              : transitioning === 'eclipse'
              ? "0%"
              : hoveredSide === 'chroma'
              ? "60%"
              : hoveredSide === 'eclipse'
              ? "40%"
              : "50%"
          }}
          transition={sectionSpring}
          onHoverStart={() => !transitioning && setHoveredSide('chroma')}
          onHoverEnd={() => !transitioning && setHoveredSide(null)}
          onClick={() => handleEnter('chroma')}
        >
          {/* BG image — zooms in on click */}
          <motion.div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover"
            style={{ 
              backgroundImage: chromaImage, 
              backgroundSize: "65%"
            }}
            animate={{
              scale: transitioning === 'chroma' ? 1.3 : hoveredSide === 'chroma' ? 1.04 : 1,
              opacity: transitioning === 'chroma' ? 0.9 : hoveredSide === 'chroma' ? 0.45 : 0.2,
            }}
            transition={transitioning === 'chroma'
              ? { duration: 1.4, ease: [0.32, 0, 0.67, 0] }
              : bgSpring}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

          {/* Edge softening */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none max-md:hidden" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none md:hidden" />

          {/* Content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 min-w-[300px] max-md:min-w-0 z-10"
            animate={{ opacity: transitioning ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <motion.h2
              className="font-oswald text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-[0.2em] text-center mb-6"
              whileHover={{ scale: 1.05 }}
            >
              CHROMA
            </motion.h2>
            <p className="text-white/70 font-inter text-sm md:text-base tracking-widest uppercase mb-8 text-center max-w-sm">
              {t('landing.chroma_desc')}
            </p>
            <Button variant="ghost" className="text-white border border-white/20 hover:bg-white hover:text-black uppercase tracking-widest transition-all duration-300">
              {t('landing.chroma_btn')}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Cinematic Fade-to-Black Veil — final step before navigate ── */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 bg-black z-[999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Crossroads;
