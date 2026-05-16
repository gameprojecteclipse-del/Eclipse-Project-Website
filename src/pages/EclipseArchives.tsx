import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isSecretUnlocked } from "@/hooks/useSecretUnlock";
import { useSEO } from "@/hooks/useSEO";

// ─── Typing Effect ──────────────────────────────────────────────────────────
const useTyping = (text: string, delay = 30, startDelay = 0) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, delay);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, delay, startDelay]);

  return { displayed, done };
};

// ─── Scanline overlay ───────────────────────────────────────────────────────
const Scanlines = () => (
  <div
    className="fixed inset-0 pointer-events-none z-10 opacity-[0.04]"
    style={{
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,0,0,0.8) 2px, rgba(139,0,0,0.8) 4px)",
    }}
  />
);

// ─── Flicker Overlay ────────────────────────────────────────────────────────
const FlickerOverlay = () => {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.93) {
        setOpacity(Math.random() * 0.08);
        setTimeout(() => setOpacity(0), 60 + Math.random() * 80);
      }
    }, 300);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 bg-[#8B0000] transition-opacity duration-75"
      style={{ opacity }}
    />
  );
};

// ─── Data Lines ─────────────────────────────────────────────────────────────
const LORE_LINES_FR = [
  "// FICHIER CONFIDENTIEL — NIVEAU 5",
  "// ACCÈS RÉSERVÉ AUX INITIÉS",
  "",
  "ORIGINE DU PROJET : CLASSÉ",
  "NOM DE CODE : ŒEIL DU ABYSSAL",
  "",
  "Note interne — Amir Dekik, Directeur Créatif :",
  "\"Ce projet n'est pas un jeu vidéo. C'est la tentative de capturer",
  "quelque chose d'ancien, quelque chose qui existait avant les mots.",
  "L'Eclipse n'est pas une mécanique. C'est une vérité que nous",
  "n'osons pas nommer directement.\"",
  "",
  "FRAGMENT LORE NON-PUBLIÉ :",
  "\"Le premier souffle du monde n'était pas de l'air.",
  "C'était un cri retenu. Une chose qui faillit naître,",
  "et qui décida de ne pas le faire.",
  "Depuis, tout ce qui vit porte en soi ce silence premier.",
  "La question n'est pas de savoir ce qu'est l'Eclipse.",
  "La question est : pourquoi tu es encore là à lire ceci ?\"",
  "",
  "STATUT BUILD : Q1 2027 — DEMO INTERNE",
  "CANAL INITIÉS : [VOIR CI-DESSOUS]",
];

const LORE_LINES_EN = [
  "// CLASSIFIED FILE — LEVEL 5",
  "// ACCESS RESTRICTED TO INITIATES",
  "",
  "PROJECT ORIGIN : CLASSIFIED",
  "CODENAME : ABYSSAL EYE",
  "",
  "Internal note — Amir Dekik, Creative Director :",
  "\"This is not a video game. It is the attempt to capture",
  "something ancient, something that existed before words.",
  "The Eclipse is not a mechanic. It is a truth we dare",
  "not name directly.\"",
  "",
  "UNPUBLISHED LORE FRAGMENT :",
  "\"The world's first breath was not air.",
  "It was a held scream. A thing that almost came into being,",
  "and decided not to.",
  "Since then, everything alive carries that first silence.",
  "The question is not what the Eclipse is.",
  "The question is : why are you still here reading this ?\"",
  "",
  "BUILD STATUS : Q1 2027 — INTERNAL DEMO",
  "INITIATES CHANNEL : [SEE BELOW]",
];

// ─── Lore Terminal ──────────────────────────────────────────────────────────
const LoreTerminal = ({ isFr }: { isFr: boolean }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = isFr ? LORE_LINES_FR : LORE_LINES_EN;

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(id);
    }, 180);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <div className="font-mono text-xs md:text-sm leading-[2] text-left space-y-0">
      {lines.slice(0, visibleLines).map((line, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={
            line.startsWith("//")
              ? "text-[#8B0000]/60"
              : line.startsWith("\"")
              ? "text-white/50 italic pl-4"
              : line === ""
              ? "h-4"
              : line.startsWith("FRAGMENT") || line.startsWith("UNPUBLISHED") || line.startsWith("Internal") || line.startsWith("Note interne")
              ? "text-[#8B0000]/80 font-semibold"
              : "text-white/70"
          }
        >
          {line || "\u00A0"}
        </motion.div>
      ))}
      {visibleLines < lines.length && (
        <span className="inline-block w-2 h-4 bg-[#8B0000] animate-pulse ml-1" />
      )}
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────────────────────────
const EclipseArchives = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showContent, setShowContent] = useState(false);

  useSEO({
    title: "Archives — Eclipse",
    description: "Fichier confidentiel. Accès restreint.",
    path: "/eclipse/archives",
  });

  useEffect(() => {
    // Short boot delay for cinematic effect
    const bootDelay = setTimeout(() => {
      const ok = isSecretUnlocked();
      setAuthorized(ok);
      if (ok) {
        setTimeout(() => setShowContent(true), 800);
      }
    }, 600);
    return () => clearTimeout(bootDelay);
  }, []);

  // Boot screen
  const bootLine1 = useTyping(isFr ? "> CONNEXION AU RÉSEAU PROFOND..." : "> CONNECTING TO DEEP NETWORK...", 35, 200);
  const bootLine2 = useTyping(isFr ? "> VÉRIFICATION DES DROITS D'ACCÈS..." : "> VERIFYING ACCESS CREDENTIALS...", 35, 1200);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-mono">
      <Scanlines />
      <FlickerOverlay />

      {/* Background vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.04)_0%,black_70%)] pointer-events-none z-0" />

      <div className="relative z-30 min-h-screen flex flex-col items-center justify-center px-6 py-16">

        {/* Boot sequence */}
        <AnimatePresence mode="wait">
          {!showContent && authorized === null && (
            <motion.div
              key="boot"
              className="space-y-2 text-xs md:text-sm max-w-xl w-full"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[#8B0000]/70">{bootLine1.displayed}<span className={bootLine1.done ? "hidden" : "animate-pulse"}>█</span></p>
              {bootLine1.done && (
                <p className="text-[#8B0000]/70">{bootLine2.displayed}<span className={bootLine2.done ? "hidden" : "animate-pulse"}>█</span></p>
              )}
            </motion.div>
          )}

          {/* Unauthorized */}
          {authorized === false && (
            <motion.div
              key="denied"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 max-w-md"
            >
              <div className="w-16 h-16 border border-[#8B0000]/40 flex items-center justify-center mx-auto">
                <span className="text-[#8B0000] text-2xl font-cinzel">⊗</span>
              </div>
              <p className="font-cinzel text-xl tracking-widest text-[#8B0000] uppercase">
                {isFr ? "Accès Refusé" : "Access Denied"}
              </p>
              <p className="font-inter text-xs text-white/30 leading-relaxed">
                {isFr
                  ? "Vous n'avez pas encore mérité cet accès. Prenez le temps de lire. L'univers se donne à ceux qui s'y attardent."
                  : "You have not yet earned this access. Take time to read. The universe reveals itself to those who linger."}
              </p>
              <button
                onClick={() => navigate("/eclipse")}
                className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors duration-300 border border-white/10 hover:border-white/30 px-6 py-3"
              >
                {isFr ? "Retourner à l'Univers" : "Return to the Universe"}
              </button>
            </motion.div>
          )}

          {/* Authorized — Full Content */}
          {showContent && authorized && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl w-full space-y-12"
            >
              {/* Header */}
              <div className="border-b border-[#8B0000]/30 pb-6">
                <p className="text-[#8B0000]/60 text-[10px] tracking-[0.5em] uppercase mb-3">
                  {isFr ? "FICHIER CONFIDENTIEL — INITIÉS SEULEMENT" : "CLASSIFIED FILE — INITIATES ONLY"}
                </p>
                <h1 className="font-cinzel text-3xl md:text-4xl text-white tracking-widest uppercase">
                  {isFr ? "Archives Profondes" : "Deep Archives"}
                </h1>
                <p className="text-white/20 text-[10px] tracking-widest mt-2 uppercase">
                  Eclipse / {new Date().toLocaleDateString(isFr ? "fr-FR" : "en-US")}
                </p>
              </div>

              {/* Terminal */}
              <div className="border border-[#8B0000]/15 bg-[#8B0000]/[0.03] p-6 md:p-8">
                <LoreTerminal isFr={isFr} />
              </div>

              {/* Discord CTA — Exclusive Channel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1.5 }}
                className="border border-[#8B0000]/30 p-6 md:p-8 space-y-4"
              >
                <p className="text-[#8B0000]/80 font-cinzel text-[11px] tracking-[0.4em] uppercase">
                  {isFr ? "Canal Initiés" : "Initiates Channel"}
                </p>
                <p className="font-inter text-sm text-white/50 leading-relaxed">
                  {isFr
                    ? "Ce canal n'est pas listé sur le serveur public. Il est réservé aux personnes qui ont pris le temps de vraiment lire. Ce que vous y trouverez : des artworks inédits, des notes de design internes, et un accès anticipé à la démo Q1 2027."
                    : "This channel is not listed on the public server. It is reserved for those who took the time to truly read. What you will find there : unreleased artworks, internal design notes, and early access to the Q1 2027 demo."}
                </p>
                <a
                  href="https://discord.gg/eclipse"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#8B0000] hover:text-white border border-[#8B0000]/30 hover:border-[#8B0000] px-6 py-3 transition-all duration-300 group"
                >
                  <span className="w-2 h-2 rounded-full bg-[#8B0000] group-hover:animate-pulse" />
                  {isFr ? "Rejoindre le Canal Secret" : "Join the Secret Channel"}
                </a>
              </motion.div>

              {/* Back link */}
              <div className="text-center">
                <button
                  onClick={() => navigate("/eclipse")}
                  className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/20 hover:text-white/50 transition-colors duration-300"
                >
                  {isFr ? "← Retourner à l'univers" : "← Return to the universe"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EclipseArchives;
