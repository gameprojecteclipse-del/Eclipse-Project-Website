import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { EclipseHero } from "../components/EclipseHero";
import { EclipseConceptOverview } from "../components/EclipseConceptOverview";
import { EclipseMythology } from "../components/EclipseMythology";
import { EclipseGallery } from "../components/EclipseGallery";
import { EclipseGameplayLoop } from "../components/EclipseGameplayLoop";
import { EclipsePlayerExperience } from "../components/EclipsePlayerExperience";
import { EclipseRoadmapTimeline } from "../components/EclipseRoadmapTimeline";
import { EclipseCollective } from "../components/EclipseCollective";
import { EclipseContact } from "../components/EclipseContact";
import { useSEO } from "@/hooks/useSEO";

const Eclipse = () => {
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();

  useSEO({
    title: "Eclipse — Dark Fantasy Action Adventure",
    description: "Eclipse is a dark fantasy souls-like set in a civilizational crossroads. Extraction, Mutation, Resonance — discover the pillars of gameplay.",
    path: "/eclipse",
  });
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Only show header at the very top of the page (Hero section)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
  });

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    // Native smooth scroll — zero glitch, zero library
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-inter selection:bg-[#8B0000]/40 relative">
      <AnimatePresence>
        {isHeaderVisible && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6 md:p-8 pointer-events-auto"
          >
            {/* Left: Hub Bridge */}
            <div className="flex items-center">
              <Link to="/">
                <Button variant="ghost" className="h-6 px-3 text-white/50 hover:text-white uppercase tracking-[0.2em] text-[9px] transition-all duration-300">
                  {i18n.language === 'fr' ? "← Portail" : "← Portal"}
                </Button>
              </Link>
            </div>

            {/* Right: Chroma & Lang Toggle */}
            <div className="flex gap-4 items-center">
              <Link to="/chroma">
                <Button variant="ghost" className="h-6 px-3 text-white/50 hover:text-white uppercase tracking-[0.2em] text-[9px] transition-all duration-300">
                  Chroma Studio
                </Button>
              </Link>
              <div className="w-px h-3 bg-white/20" />
              <Button 
                variant="outline" 
                className="h-6 px-2 min-w-[32px] bg-black/50 border-white/10 text-white/70 hover:bg-white/10 hover:text-white uppercase tracking-widest text-[9px]"
                onClick={toggleLang}
              >
                {t('nav.lang')}
              </Button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      <EclipseHero />
      <EclipseConceptOverview />
      <EclipseMythology />
      <EclipseGallery />
      <EclipseGameplayLoop />
      <EclipsePlayerExperience />
      <EclipseRoadmapTimeline />
      <EclipseCollective />
      <EclipseContact />
    </div>
  );
};

export default Eclipse;
