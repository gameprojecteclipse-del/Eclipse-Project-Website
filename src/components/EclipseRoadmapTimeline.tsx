import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";

const STEPS = [
  {
    phase: "I",
    titleFr: "Fondation Créative",       titleEn: "Creative Foundation",
    statusFr: "Terminé",                 statusEn: "Completed",
    done: true,
    detailFr: "Dossier de Jeu (JDD) de 80+ pages finalisé. Scénario principal et dialogue du Tome 1 rédigés. Direction artistique complète définie — références visuelles, palette chromatique, architecture de jeu. Prototypes papier validés en équipe.",
    detailEn: "80+ page Game Design Document finalized. Tome 1 main scenario and dialogue written. Complete art direction defined — visual references, color palette, game architecture. Paper prototypes team-validated.",
  },
  {
    phase: "II",
    titleFr: "Incubation Technique",     titleEn: "Technical Incubation",
    statusFr: "Terminé",                 statusEn: "Completed",
    done: true,
    detailFr: "Unreal Engine 5 sélectionné et configuré. Pipeline d'assets (Blender → UE5) établi. Blockout des niveaux initiaux. Système d'animation Metahuman intégré. Pré-production technique achevée à 100%.",
    detailEn: "Unreal Engine 5 selected and configured. Asset pipeline (Blender → UE5) established. Initial level blockout. Metahuman animation system integrated. Technical pre-production 100% complete.",
  },
  {
    phase: "III",
    titleFr: "Intégration Mawahub",      titleEn: "Mawahub Integration",
    statusFr: "En Cours",                statusEn: "In Progress",
    active: true,
    detailFr: "Acceptation officielle dans l'incubateur Mawahub 2026. Équipes spécialisées assemblées (12 membres). Début du développement de la tranche verticale. Accès aux ressources et mentors de l'incubateur.",
    detailEn: "Official acceptance into Mawahub 2026 incubator. Specialized teams assembled (12 members). Vertical slice development initiated. Access to incubator resources and mentors.",
  },
  {
    phase: "IV",
    titleFr: "Tranche Verticale",        titleEn: "Vertical Slice",
    statusFr: "Planifié",                statusEn: "Planned",
    detailFr: "Finalisation d'un biome complet (Cité Abysse) avec combat fonctionnel, IA ennemie de base, systèmes d'Extraction et de Mutation opérationnels. Rendu visuel final de démonstration. Milestone critique pour les investisseurs.",
    detailEn: "Finalization of full biome (Abyss City) with functional combat, core enemy AI, Extraction and Mutation systems operational. Final visual demo render. Critical investor milestone.",
  },
  {
    phase: "V",
    titleFr: "Alpha Jouable",            titleEn: "Playable Alpha",
    statusFr: "Planifié",                statusEn: "Planned",
    detailFr: "Contenu complet du Tome 1 intégré. Début des tests internes et équilibrage des systèmes de corruption et de progression. Optimisation des performances UE5. Préparation du build de démonstration public.",
    detailEn: "Complete Tome 1 content integrated. Internal testing and balancing of corruption and progression systems begins. UE5 performance optimization. Public demo build preparation.",
  },
  {
    phase: "VI",
    titleFr: "Démo Publique — Q1 2027",  titleEn: "Public Demo — Q1 2027",
    statusFr: "Objectif Final",          statusEn: "Final Target",
    detailFr: "Lancement de la démo publique de 45 à 60 minutes sur PC (Steam). Phase de marketing intensif, campagne presse spécialisée, opération de Wishlist Steam. Préparation de la production du Tome 2 en parallèle.",
    detailEn: "Public 45–60 min demo launch on PC (Steam). Intensive marketing phase, specialist press campaign, Steam Wishlist operation. Parallel Tome 2 production preparation.",
  },
];

// Progress fill up to the active step (step 3 / 6 = 50%)
const PROGRESS_PCT = `${(2.5 / (STEPS.length - 1)) * 100}%`;

export const EclipseRoadmapTimeline = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Progress line drawn based on scroll in the center of the screen
  const { scrollYProgress: lineProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"],
  });

  const lineWidth = useTransform(lineProgress, [0, 1], ["0%", PROGRESS_PCT]);

  return (
    <section ref={sectionRef} className="relative bg-black py-40 border-t border-white/[0.03] overflow-hidden">
      {/* Background Image without parallax or zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none"
        style={{ 
          backgroundImage: "url('/assets/boss_00039_.png')"
        }}
      />

      {/* Heavy Top & Bottom Gradients to blend with other sections */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0" />

      {/* Red ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.06),transparent_65%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <SectionTitle
          index="05"
          label="Feuille de Route"
          labelEn="Roadmap"
          isFr={isFr}
          className="mb-20"
        />

        {/* Rail + Steps */}
        <div className="relative mt-20">
          {/* Background rail */}
          <div className="absolute top-[28px] md:top-[32px] left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#8B0000]/40 to-transparent z-0" />
          
          {/* Animated progress fill */}
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-[28px] md:top-[32px] left-8 h-[1px] bg-gradient-to-r from-[#8B0000] via-[#8B0000] to-transparent origin-left z-0"
          />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 relative z-10">
            {STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className={`group relative flex flex-col items-center text-center cursor-default`}
              >
                {/* Node - Diamond Shape */}
                <div 
                  className={`w-[56px] h-[56px] md:w-[64px] md:h-[64px] border-[1.5px] bg-[#0A0503] flex flex-col items-center justify-center transition-all duration-500 mb-6
                  ${step.active
                    ? "border-[#C41E1E] bg-[#8B0000]/20 shadow-[0_0_30px_rgba(139,0,0,0.6)]"
                    : step.done
                      ? "border-[#8B0000] group-hover:border-[#C41E1E] group-hover:shadow-[0_0_20px_rgba(139,0,0,0.4)]"
                      : "border-[#8B0000]/40 group-hover:border-[#8B0000] group-hover:shadow-[0_0_15px_rgba(139,0,0,0.2)]"
                  }`}
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                >
                  <span className={`font-cinzel text-[8px] tracking-[0.2em] leading-none mb-1
                    ${step.active ? "text-[#C9A84C]" : "text-[#8B0000]"}`}>
                    PHASE
                  </span>
                  <span className={`font-cinzel text-sm md:text-base leading-none
                    ${step.active ? "text-white" : "text-[#C9A84C]"}`}>
                    {step.phase}
                  </span>
                </div>

                {/* Title */}
                <h4 className={`font-cinzel text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-2 px-1 transition-colors duration-300
                  ${step.active 
                    ? "text-white" 
                    : step.done 
                      ? "text-white/80 group-hover:text-white" 
                      : "text-white/40 group-hover:text-white/70"}`}>
                  {isFr ? step.titleFr : step.titleEn}
                </h4>

                {/* Status / Subtitle (italic) */}
                <span className={`font-inter text-[10px] italic mb-3 transition-colors duration-300
                  ${step.active
                    ? "text-[#C41E1E]"
                    : step.done
                      ? "text-[#C9A84C]/80"
                      : "text-white/30"
                  }`}>
                  {isFr ? step.statusFr : step.statusEn}
                </span>

                {/* Full detail — hover reveal, absolute so it doesn't shift layout */}
                <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-[220px] mt-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
                  <p className="font-inter text-[10px] text-white/60 leading-relaxed px-3 pt-3 pb-4 border-t border-[#8B0000]/30 bg-black/60 backdrop-blur-sm rounded-b-md">
                    {isFr ? step.detailFr : step.detailEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
