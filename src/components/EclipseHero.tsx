import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logoSvg from "../assets/logo.svg";
import { LINKS } from "@/lib/constants";

export const EclipseHero = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  const scrollToMythology = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("mythology")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center vignette-blend">

      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.42 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[url('/assets/gallery/art-3.webp')] bg-cover bg-center animate-ken-burns origin-center" />
      </motion.div>
      <div className="absolute inset-0 bg-[#8B0000]/12 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/75" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">

        {/* Studio label */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-inter text-[9px] tracking-[0.55em] uppercase text-white/20 mb-4 block"
        >
          {isFr ? "Chroma Studios Présente" : "Chroma Studios Presents"}
        </motion.span>

        {/* Logo */}
        <motion.img 
          src={logoSvg} 
          alt="Eclipse Logo" 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="h-10 md:h-16 w-auto mb-4 opacity-90 drop-shadow-[0_0_15px_rgba(139,0,0,0.3)]"
        />

        {/* ECLIPSE — clip reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "102%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-cinzel text-[16vw] sm:text-[11vw] md:text-[9vw] lg:text-[8vw] text-white font-bold tracking-[0.06em] leading-none"
          >
            ECLIPSE
          </motion.h1>
        </div>

        {/* Separator — blood red */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="h-px w-1/2 md:w-1/3 mx-auto bg-gradient-to-r from-transparent via-[#8B0000] to-transparent my-7 origin-center"
        />

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.4 }}
          className="font-cinzel text-sm md:text-xl lg:text-2xl text-white/65 tracking-[0.2em] uppercase mb-4"
        >
          {isFr ? "INCARNEZ LE CYCLE — BRISEZ LE SILENCE" : "EMBODY THE CYCLE — BREAK THE SILENCE"}
        </motion.h2>

        {/* 3 pillars */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 1.9 }}
          className="text-[#8B0000] font-inter text-[8px] tracking-[0.55em] uppercase mb-12 drop-shadow-[0_0_10px_rgba(139,0,0,0.4)]"
        >
          Extraction&nbsp;&nbsp;·&nbsp;&nbsp;Mutation&nbsp;&nbsp;·&nbsp;&nbsp;Résonance
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#mythology"
            onClick={scrollToMythology}
            className="font-cinzel text-[10px] tracking-[0.3em] uppercase px-10 py-4 bg-[#8B0000]/80 border border-[#8B0000] text-white hover:bg-[#8B0000] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)] transition-all duration-500"
          >
            {isFr ? "Découvrir l'Univers" : "Explore the World"}
          </a>
          <a
            href={LINKS.eclipseDiscord}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cinzel text-[10px] tracking-[0.3em] uppercase px-10 py-4 border border-white/12 text-white/50 hover:border-[#5865F2] hover:text-[#5865F2] transition-all duration-500"
          >
            {isFr ? "Rejoindre le Discord" : "Join Discord"}
          </a>
        </motion.div>
      </div>

      {/* Bottom blend into Concept Overview */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
    </section>
  );
};
