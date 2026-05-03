/**
 * SectionTitle — Système unifié de titres de section pour le projet Eclipse.
 *
 * Usage :
 * <SectionTitle index="01" label="L'Univers" labelEn="The Universe" isFr={isFr} />
 */

import { motion } from "framer-motion";

interface SectionTitleProps {
  index: string;        // "01", "02", …
  label: string;        // Titre FR
  labelEn: string;      // Titre EN
  isFr: boolean;
  align?: "left" | "center";
  className?: string;
}

export const SectionTitle = ({
  index,
  label,
  labelEn,
  isFr,
  align = "left",
  className = "",
}: SectionTitleProps) => {
  const text = isFr ? label : labelEn;
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
        `}
        style={{
          background: "linear-gradient(170deg, #ffffff 40%, #8B0000 140%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
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
