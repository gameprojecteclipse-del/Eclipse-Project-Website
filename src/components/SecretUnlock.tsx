import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// ─── Glitch Text Component ─────────────────────────────────────────────────
const GLITCH_CHARS = "ÆØłŁ█▓▒░⟁⟴⌬✦✧⊛⟆⦿◈";

const GlitchText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let iteration = 0;
    const totalFrames = text.length * 3;

    const animate = () => {
      setDisplayed(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration / 3) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration < totalFrames) {
        frameRef.current = setTimeout(animate, 40);
      }
    };

    animate();
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text]);

  return <span>{displayed}</span>;
};

// ─── Secret Button Component ───────────────────────────────────────────────
// Exported so EclipseContact can import and render it conditionally.
export const SecretArchivesButton = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [hovered, setHovered] = useState(false);

  const label = isFr ? "DÉCRYPTER LE SIGNAL" : "DECRYPT THE SIGNAL";
  const sublabel = isFr ? "Vous avez été remarqué." : "You have been noticed.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3 mt-8"
    >
      {/* Faint pulsing rune line above */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-px bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"
      />

      <p className="font-inter text-[9px] tracking-[0.4em] uppercase text-white/20">
        {sublabel}
      </p>

      <motion.button
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => navigate("/eclipse/archives")}
        className="relative group px-10 py-4 border border-[#8B0000]/40 bg-black/60 backdrop-blur-sm overflow-hidden cursor-pointer"
        whileHover={{ borderColor: "rgba(139,0,0,0.9)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated blood-red sweep on hover */}
        <motion.div
          className="absolute inset-0 bg-[#8B0000]/10"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Scanline flicker */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0, 0.06, 0, 0.04, 0] }}
            transition={{ duration: 0.15, repeat: Infinity }}
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,0,0,0.15) 2px, rgba(139,0,0,0.15) 4px)",
            }}
          />
        )}

        <span className="relative z-10 font-cinzel text-[10px] tracking-[0.35em] uppercase text-[#8B0000] group-hover:text-white transition-colors duration-300">
          {hovered ? <GlitchText text={label} /> : label}
        </span>
      </motion.button>
    </motion.div>
  );
};

// ─── Unlock Toast Notification ─────────────────────────────────────────────
// Shown briefly when the secret is first unlocked (the 15s moment).
export const SecretUnlockToast = ({ onDone }: { onDone: () => void }) => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  useEffect(() => {
    const t = setTimeout(onDone, 4500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[999] pointer-events-none"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border border-[#8B0000]/50 bg-black/80 backdrop-blur-md px-8 py-4 flex flex-col items-center gap-1">
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-[#8B0000] mb-1"
        />
        <p className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-white/60">
          {isFr ? "Votre présence a été enregistrée." : "Your presence has been recorded."}
        </p>
        <p className="font-inter text-[9px] tracking-[0.2em] uppercase text-[#8B0000]/70">
          {isFr ? "Continuez à descendre." : "Keep descending."}
        </p>
      </div>
    </motion.div>
  );
};
