import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";
import { PictureBackground } from "./PictureBackground";
import { audioManager } from "@/lib/audio";

const pillars = [
  {
    id: "01",
    title: "Extraction",
    descFr: "Le combat ne se limite pas à la survie, c’est une moisson. Vous arrachez l’Essence directement de l’âme de vos ennemis pour alimenter vos pouvoirs. La brutalité est récompensée.",
    descEn: "The fight is not merely survival — it is a harvest. You tear the essence directly from the souls of your enemies to fuel your powers. Brutality is rewarded.",
    image: "/assets/eclipse/sections/extraction",
  },
  {
    id: "02",
    title: "Mutation",
    descFr: "Cette Essence vous altère autant qu’elle vous renforce. Servez-vous-en pour transformer votre armement en formes aberrantes, changeant en profondeur votre manière de combattre.",
    descEn: "This Essence alters you as much as it empowers you. Use it to twist your weaponry into aberrant forms, profoundly changing the way you fight.",
    image: "/assets/eclipse/sections/mutation",
  },
  {
    id: "03",
    title: "Résonance",
    descFr: "Le monde se régit à votre niveau de corruption. En accumulant l’Essence, des passages s’ouvrent à vous, mais des entités monstrueuses vous traquent sans relâche. La corruption a son prix.",
    descEn: "The world bends to your level of corruption. As you amass Essence, passages open to you but monstrous entities hunt you without rest. Corruption has its price.",
    image: "/assets/eclipse/sections/resonance",
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
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const text = (() => {
    switch (lang) {
      case "zh":
        switch (pillar.id) {
          case "01":
            return {
              title: "萃取",
              desc: "战斗并非单纯的求生，而是一场收割。你将直接从敌人的灵魂深处掠夺『 Essence 』（真髓），以此充盈你的力量。残虐将获得丰厚嘉奖。"
            };
          case "02":
            return {
              title: "蜕变",
              desc: "这股真髓强化你的同时，也在同等地异化你。利用它将你的兵刃扭曲成畸变的形态，从根本上改变你的战斗风格。"
            };
          case "03":
            return {
              title: "共鸣",
              desc: "整个世界将随你的腐败程度而震颤起伏。随着你聚敛真髓，未知的通道将为你敞开，但同样会招致畸变巨兽无休止的追杀。腐朽自有其代价。"
            };
          default:
            return { title: pillar.title, desc: pillar.descEn };
        }
      case "ja":
        switch (pillar.id) {
          case "01":
            return {
              title: "抽出",
              desc: "戦闘は単なる生存競争ではない — それは刈り取りである。敵の魂から直接『 Essence 』（真髄）を奪い去り、己の力へと変換する。残虐なる者には報酬が与えられん。"
            };
          case "02":
            return {
              title: "変異",
              desc: "真髄は力を与える将、同時にあなたを変異させる。それを使い、武器を異形の姿へと歪ませ、戦闘スタイルを根本から作り変えるのだ。"
            };
          case "03":
            return {
              title: "共鳴",
              desc: "世界の法則は、あなたの堕落度に同調して歪み始める。真髄を蓄積することで未知の路が拓かれるが、恐るべき異形の存在たちが地の果てまであなたを追う。堕落には対価が伴う。"
            };
          default:
            return { title: pillar.title, desc: pillar.descEn };
        }
      case "fr":
        return { title: pillar.id === "01" ? "Extraction" : pillar.id === "02" ? "Mutation" : "Résonance", desc: pillar.descFr };
      default:
        return { title: pillar.id === "01" ? "Extraction" : pillar.id === "02" ? "Mutation" : "Resonance", desc: pillar.descEn };
    }
  })();

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
          imgClassName="w-full h-full object-cover object-bottom"
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
      <div className="absolute inset-0 z-[3] pointer-events-none shadow-[inset_0_0_120px_40px_black]" />

      {/* ── Bottom fade inside pillar (Image -> Gradient -> Text) ── */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-black via-black/90 to-transparent z-[4] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-[10] flex flex-col justify-end h-full p-6 md:p-10 min-h-[300px] md:min-h-[400px] lg:min-h-0 pointer-events-none">

        {/* Index */}
        <motion.span
          className="font-cinzel text-2xl md:text-5xl block mb-2 md:mb-3"
          animate={{ color: isActive ? "rgba(139,0,0,0.6)" : "rgba(139,0,0,0.15)" }}
          transition={imgSpring}
        >
          {pillar.id}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-cinzel text-xl md:text-3xl tracking-widest uppercase drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
          animate={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)" }}
          transition={imgSpring}
        >
          {text.title}
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

        {/* Description — robust height reveal */}
        <motion.div
          initial={false}
          animate={{
            height: isActive ? "auto" : 0,
            opacity: isActive ? 1 : 0,
            marginTop: isActive ? 16 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="font-inter text-sm md:text-base text-white/80 leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,1)] pb-2">
            {text.desc}
          </p>
        </motion.div>
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
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-8 lg:px-16 pt-16 md:pt-32 pb-8 md:pb-16">
        <SectionTitle
          index="05"
          label="Piliers du Gameplay"
          labelEn="Gameplay Pillars"
          isFr={isFr}
        />
      </div>

      {/* Pillars */}
      <div
        className="relative flex flex-col md:flex-row min-h-[auto] md:min-h-[90vh]"
      >
        {pillars.map((pillar, idx) => (
          <PillarPanel
            key={pillar.id}
            pillar={pillar}
            idx={idx}
            isFr={isFr}
            isActive={activePillar === idx}
            isAnyActive={activePillar !== null}
            onEnter={() => {
              setActivePillar(idx);
              audioManager.playSound('hover');
            }}
            onLeave={() => setActivePillar(null)}
          />
        ))}
      </div>

    </section>
  );
};
