import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";
import { PictureBackground } from "./PictureBackground";

const ROWS = [
  { labelFr: "Genre",       labelEn: "Genre",      valFr: "Action Aventure / Souls-like",               valEn: "Action Adventure / Souls-like" },
  { labelFr: "Sous-genre",  labelEn: "Sub-genre",  valFr: "Dark Fantasy Narratif",                      valEn: "Narrative Dark Fantasy" },
  { labelFr: "Plateformes", labelEn: "Platforms",  valFr: "PC → Console (PS / Xbox / Switch)",          valEn: "PC → Console (PS / Xbox / Switch)" },
  { labelFr: "Cible",       labelEn: "Audience",   valFr: "Fans de Souls-like & narration multiculturelle", valEn: "Souls-like & multicultural narrative fans" },
  { labelFr: "Démo",        labelEn: "Demo",       valFr: "15–30 min jouable — Q1 2027",                valEn: "15–30 min playable — Q1 2027" },
  { labelFr: "Structure",   labelEn: "Structure",  valFr: "3 Tomes — 10 à 15h d'expérience totale",     valEn: "3 Tomes — 10 to 15h total experience" },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -16, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const EclipseConceptOverview = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  return (
    <section id="concept" className="relative bg-black overflow-hidden">
      <div className="absolute inset-0">
        <PictureBackground
          src="/assets/eclipse/backgrounds/eclipse-concept-bg"
          alt="Eclipse concept background"
          imgClassName="opacity-[0.28] saturate-[0.2] brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/98 via-black/80 to-black/40" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
      </div>

      <div className="relative z-10 min-h-[60vh] md:min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-12 md:py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionTitle
              index="01"
              label="Fiche Technique"
              labelEn="Game Specification"
              isFr={isFr}
              className="mb-8 md:mb-10"
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="border-t border-white/[0.06]"
            >
              {ROWS.map((row, i) => (
                <motion.div
                  key={i}
                  variants={rowVariants}
                  className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-4 md:gap-6 items-baseline py-4 md:py-5 border-b border-white/[0.05] group cursor-default"
                >
                  {/* Label — blood red */}
                  <span className="font-inter text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.35em] uppercase text-[#8B0000]">
                    {isFr ? row.labelFr : row.labelEn}
                  </span>

                  {/* Value — brightens on hover */}
                  <span className="font-inter text-sm md:text-base text-white/85 md:text-white/60 group-hover:text-white/95 transition-colors duration-400 leading-snug">
                    {isFr ? row.valFr : row.valEn}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Blood red closing line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="mt-1 h-px bg-gradient-to-r from-[#8B0000]/50 via-[#8B0000]/20 to-transparent origin-left"
            />
          </motion.div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};
