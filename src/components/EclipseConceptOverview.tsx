import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";

const ROWS = [
  { labelFr: "Genre",       labelEn: "Genre",      valFr: "Action Aventure / Souls-like",               valEn: "Action Adventure / Souls-like" },
  { labelFr: "Sous-genre",  labelEn: "Sub-genre",  valFr: "Dark Fantasy Narratif",                      valEn: "Narrative Dark Fantasy" },
  { labelFr: "Plateformes", labelEn: "Platforms",  valFr: "PC → Console (PS / Xbox / Switch)",          valEn: "PC → Console (PS / Xbox / Switch)" },
  { labelFr: "Cible",       labelEn: "Target",     valFr: "Fans de Souls-like & narration multiculturelle", valEn: "Souls-like & multicultural narrative fans" },
  { labelFr: "Démo",        labelEn: "Demo",       valFr: "45–60 min jouable — Q1 2027",                valEn: "45–60 min playable — Q1 2027" },
  { labelFr: "Structure",   labelEn: "Structure",  valFr: "3 Tomes — 10 à 15h d'expérience totale",     valEn: "3 Tomes — 10 to 15h total experience" },
] as const;

export const EclipseConceptOverview = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  return (
    <section id="concept" className="relative bg-black overflow-hidden">
      {/* Full-height background image */}
      <div className="absolute inset-0">
        {/* eclipse_concept_bg.png — replace with final interior shot */}
        <div
          className="absolute inset-0 bg-[url('/assets/eclipse_concept_bg.png')] bg-cover bg-[center_30%]"
          style={{ opacity: 0.28, filter: "saturate(0.2) brightness(0.75)" }}
        />
        {/* Gradient mask — left side blacks out for legibility, right reveals the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/98 via-black/80 to-black/40" />
        {/* Top & bottom fade — seamless connection */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT — Codex data table */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionTitle
              index="01"
              label="Dossier Projet"
              labelEn="Project Dossier"
              isFr={isFr}
              className="mb-10"
            />

            {/* Data grid — magazine / codex alignment */}
            <div className="space-y-0 border-t border-white/[0.06]">
              {ROWS.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="grid grid-cols-[130px_1fr] gap-6 items-baseline py-4 border-b border-white/[0.06] group"
                >
                  <span className="font-inter text-[9px] tracking-[0.35em] uppercase text-white/22">
                    {isFr ? row.labelFr : row.labelEn}
                  </span>
                  <span className="font-inter text-sm text-white/65 group-hover:text-white/90 transition-colors duration-300">
                    {isFr ? row.valFr : row.valEn}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — empty, shows through the background image */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};
