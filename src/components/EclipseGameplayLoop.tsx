import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";
import { PictureBackground } from "./PictureBackground";

const pillars = [
  {
    id: "01",
    title: "Extraction",
    descFr: "Le combat n'est pas qu'une question de survie — c'est une moisson. Vous arrachez la matière cosmique directement de l'âme de vos ennemis pour recharger vos capacités. La brutalité est récompensée.",
    descEn: "Combat is not just survival — it is a harvest. You rip cosmic matter directly from the souls of your enemies to recharge your abilities. Brutality is rewarded.",
    image: "/assets/Extraction.png",
  },
  {
    id: "02",
    title: "Mutation",
    descFr: "L'Essence récoltée vous corrompt autant qu'elle vous renforce. Utilisez cette matière pour muter votre armement ottoman en monstruosités eldritches, modifiant radicalement votre moveset.",
    descEn: "Harvested Essence corrupts as much as it empowers. Use this matter to mutate your Ottoman weaponry into eldritch monstrosities, radically altering your moveset.",
    image: "/assets/Mutation.png",
  },
  {
    id: "03",
    title: "Résonance",
    descFr: "Le monde réagit à votre niveau de corruption. En accumulant de l'Essence, des passages secrets s'ouvrent, mais des entités invisibles commencent à vous traquer impitoyablement.",
    descEn: "The world reacts to your corruption level. Accumulating Essence opens secret paths — but unseen entities begin to hunt you relentlessly.",
    image: "/assets/Résonance.png",
  },
];

// Spring config — heavy, overshoots slightly for organic feel
const imgSpring = { type: "spring", stiffness: 55, damping: 18, mass: 1.2 } as const;
const glowSpring = { type: "spring", stiffness: 40, damping: 22, mass: 1.5 } as const;

const PillarPanel = ({
  pillar,
  idx,
  isFr,
  isActive,
  isAnyActive,
  onEnter,
  onLeave,
}: {
  pillar: typeof pillars[number];
  idx: number;
  isFr: boolean;
  isActive: boolean;
  isAnyActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.0, delay: idx * 0.15 }}
      className="relative flex-1 cursor-crosshair overflow-hidden"
      style={{ flexBasis: "33.33%" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ── Background image — spring-driven, no pump ── */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          opacity: isActive ? 1 : isAnyActive ? 0.08 : 0.22,
        }}
        transition={imgSpring}
      >
        <PictureBackground
          src={pillar.image.replace(".png", "")}
          alt={pillar.title}
          imgClassName="w-full h-full object-cover"
        />
      </motion.div>

      {/* ── Vignette mask — always present, fades out on active ── */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 25%, black 100%)",
        }}
        animate={{ opacity: isActive ? 0.35 : 0.85 }}
        transition={glowSpring}
      />

      {/* ── Blood red atmosphere — spring pulse on activate ── */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(100,0,0,0.5) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85 }}
        transition={glowSpring}
      />

      {/* ── Edge dissolve — seamless into surrounding black ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          boxShadow: "inset 0 0 120px 40px black",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-[10] flex flex-col justify-end h-full p-8 md:p-10 min-h-[400px] md:min-h-0 pointer-events-none">

        {/* Index */}
        <motion.span
          className="font-cinzel text-3xl md:text-5xl block mb-3"
          animate={{ color: isActive ? "rgba(139,0,0,0.6)" : "rgba(139,0,0,0.15)" }}
          transition={imgSpring}
        >
          {pillar.id}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-cinzel text-2xl md:text-3xl tracking-widest uppercase drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
          animate={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)" }}
          transition={imgSpring}
        >
          {pillar.title}
        </motion.h3>

        {/* Separator — draws from left on activate */}
        <div className="mt-3 h-px overflow-hidden origin-left">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B0000]/80 via-[#8B0000]/40 to-transparent"
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            style={{ originX: 0 }}
          />
        </div>

        {/* Description — smooth spring height reveal */}
        <div className="overflow-hidden">
          <motion.p
            className="font-inter text-xs md:text-sm text-white/80 leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 10,
              height: isActive ? "auto" : 0,
              marginTop: isActive ? "16px" : "0px",
            }}
            transition={glowSpring}
          >
            {isFr ? pillar.descFr : pillar.descEn}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export const EclipseGameplayLoop = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [activePillar, setActivePillar] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-black overflow-hidden" id="gameplay">

      {/* Section title */}
      <div className="relative z-30 max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-12">
        <SectionTitle
          index="04"
          label="Pilliers du Gameplay"
          labelEn="Gameplay Pillars"
          isFr={isFr}
        />
      </div>

      {/* Pillars */}
      <div
        className="relative flex flex-col md:flex-row z-10"
        style={{ minHeight: "85vh" }}
      >
        {pillars.map((pillar, idx) => (
          <PillarPanel
            key={pillar.id}
            pillar={pillar}
            idx={idx}
            isFr={isFr}
            isActive={activePillar === idx}
            isAnyActive={activePillar !== null}
            onEnter={() => setActivePillar(idx)}
            onLeave={() => setActivePillar(null)}
          />
        ))}
      </div>

      {/* ── Section bridge bottom → Gallery ── */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-black via-black/90 to-transparent z-20 pointer-events-none" />
    </section>
  );
};
