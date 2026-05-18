/**
 * SectionTitle — Système unifié de titres de section pour le projet Eclipse.
 *
 * Usage :
 * <SectionTitle index="01" label="L'Univers" labelEn="The Universe" isFr={isFr} />
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface SectionTitleProps {
  index: string;        // "01", "02", …
  label: string;        // Titre FR
  labelEn: string;      // Titre EN
  isFr: boolean;
  align?: "left" | "center";
  className?: string;
}

const titles: Record<string, Record<string, string>> = {
  "01": {
    fr: "Fiche Technique",
    en: "Game Specification",
    zh: "技术规格",
    ja: "ゲーム仕様"
  },
  "02": {
    fr: "L'ADN Créatif",
    en: "Creative DNA",
    zh: "创意基因",
    ja: "クリエイティブDNA"
  },
  "03": {
    fr: "L'Univers",
    en: "The Universe",
    zh: "深渊世界",
    ja: "深淵の宇宙"
  },
  "04": {
    fr: "Panorama Conceptuel",
    en: "Conceptual Panorama",
    zh: "概念全景",
    ja: "コンセプトパノラマ"
  },
  "05": {
    fr: "Piliers du Gameplay",
    en: "Gameplay Pillars",
    zh: "核心玩法",
    ja: "ゲームの柱"
  },
  "06": {
    fr: "L'Expérience Joueur",
    en: "The Player Experience",
    zh: "玩家体验",
    ja: "プレイヤー体験"
  },
  "07": {
    fr: "Roadmap & Jalons",
    en: "Roadmap & Milestones",
    zh: "开发路线与里程碑",
    ja: "ロードマップと節目"
  },
  "08": {
    fr: "Le Collectif",
    en: "The Collective",
    zh: "核心集体",
    ja: "クリエイティブ集団"
  },
  "09": {
    fr: "Contact & Transmission",
    en: "Contact & Transmission",
    zh: "联络与合作",
    ja: "コンタクトと送信"
  }
};

export const SectionTitle = ({
  index,
  label,
  labelEn,
  isFr,
  align = "left",
  className = "",
}: SectionTitleProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const text = titles[index]?.[currentLang] || (currentLang === "fr" ? label : labelEn);
  const isCenter = align === "center";
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ y }}
      className={`relative mb-20 ${isCenter ? "text-center" : ""} ${className}`}
    >
      {/* Accent line */}
      <div className={`flex items-center gap-5 mb-4 ${isCenter ? "justify-center" : ""}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-10 bg-gradient-to-r from-[#8B0000]/60 to-transparent origin-left"
        />
      </div>

      {/* Main Title — Gothic impact */}
      <h2
        className={`
          font-cinzel font-bold
          text-3xl md:text-4xl lg:text-5xl
          leading-[1] tracking-[0.06em]
          uppercase
          bg-[linear-gradient(170deg,#ffffff_40%,#8B0000_140%)]
          bg-clip-text text-transparent
        `}
      >
        {text}
      </h2>

      {/* Underline — architectural separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-6 h-px bg-gradient-to-r from-[#8B0000]/50 via-white/10 to-transparent origin-left ${isCenter ? "mx-auto" : ""}`}
        style={{ maxWidth: isCenter ? "80%" : "100%" }}
      />
    </motion.div>
  );
};
