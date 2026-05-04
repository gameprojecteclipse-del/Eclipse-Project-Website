import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { imageSetWithFallback } from "@/lib/utils";

const Crossroads = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [hoveredSide, setHoveredSide] = useState<'eclipse' | 'chroma' | null>(null);

  useSEO({
    title: t('landing.title') + " - Double Door Portal",
    description: "Welcome to Project Eclipse. Choose your path: Enter the dark fantasy universe or discover the Chroma Studios collective.",
    path: "/",
  });

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black font-inter relative"
    >
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <Button 
          variant="outline" 
          className="bg-black/50 border-white/20 text-white hover:bg-white/10 hover:text-white"
          onClick={toggleLang}
        >
          {t('nav.lang')}
        </Button>
      </div>

      {/* Title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <h1 className="text-white/80 font-cinzel text-xl md:text-3xl tracking-[0.3em] uppercase text-center">
          {t('landing.title')}
        </h1>
      </div>

      {/* ECLIPSE SIDE */}
      <motion.div 
        className="relative group cursor-pointer border-b md:border-b-0 md:border-r border-white/10 h-full overflow-hidden max-md:!w-full max-md:!h-1/2"
        initial={{ width: "50%" }}
        animate={{ 
          width: hoveredSide === 'eclipse' ? "60%" : hoveredSide === 'chroma' ? "40%" : "50%" 
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHoveredSide('eclipse')}
        onHoverEnd={() => setHoveredSide(null)}
        onClick={() => navigate('/eclipse')}
      >
        <div className="absolute inset-0 bg-[url('/assets/gallery/art-1.webp')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-blood-red/10 mix-blend-overlay group-hover:bg-blood-red/30 transition-colors duration-700" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 min-w-[300px] max-md:min-w-0">
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
        </div>
      </motion.div>

      {/* CHROMA SIDE */}
      <motion.div 
        className="relative group cursor-pointer h-full overflow-hidden max-md:!w-full max-md:!h-1/2"
        initial={{ width: "50%" }}
        animate={{ 
          width: hoveredSide === 'chroma' ? "60%" : hoveredSide === 'eclipse' ? "40%" : "50%" 
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setHoveredSide('chroma')}
        onHoverEnd={() => setHoveredSide(null)}
        onClick={() => navigate('/chroma')}
      >
        <div
          className="absolute inset-0 bg-center opacity-20 group-hover:opacity-40 transition-all duration-700 bg-no-repeat"
          style={{
            backgroundImage: imageSetWithFallback('/assets/chroma portal image'),
            backgroundSize: "65%"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 min-w-[300px] max-md:min-w-0">
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Crossroads;
