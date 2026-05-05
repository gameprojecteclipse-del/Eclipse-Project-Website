import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSEO } from "@/hooks/useSEO";
import { PictureBackground } from "@/components/PictureBackground";

/* ─── DATA ─────────────────────────────────────────── */
const SERVICES = [
  { fr: "Direction Artistique", en: "Art Direction", bg: "/assets/DIRECTION Artistique.webp", bgFallback: "/assets/DIRECTION Artistique.jpg" },
  { fr: "Installations Immersives", en: "Immersive Installations", bg: "/assets/Installations Immersives.webp", bgFallback: "/assets/Installations Immersives.jpg" },
  { fr: "Cinéma & Vidéo", en: "Cinema & Video", bg: "/assets/Cinéma & Vidéo.webp", bgFallback: "/assets/Cinéma & Vidéo.png" },
  { fr: "Design Éditorial", en: "Editorial Design", bg: "/assets/Design Éditorial.webp", bgFallback: "/assets/Design Éditorial.jpg" },
];

const CLIENTS = [
  "MAWAHUB", "UBISOFT", "EPIC GAMES", "SONY INTERACTIVE", "L'ORÉAL", "LVMH", "SQUARE ENIX", "BANDAI NAMCO"
];

/* ─── SLIDE-UP REVEAL ───────────────────────────────── */
const Up = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "105%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  </div>
);

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function Chroma() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  const [navVisible, setNavVisible] = useState(true);

  useSEO({
    title: "Chroma Studio — Architecte de Visions",
    description: "Studio créatif indépendant. Architecture visuelle, expériences immersives, direction artistique.",
    path: "/chroma",
  });

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setNavVisible(latest <= 50);
  });

  return (
    <div id="top" style={{ fontFamily: "'Inter', sans-serif", background: "#f3f3f1", color: "#000000" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-8 lg:px-14 py-6 bg-[#f3f3f1]/80 backdrop-blur-sm"
      >
        <button onClick={() => navigate("/")}
          className="text-[10px] tracking-[0.35em] uppercase text-black/50 hover:text-black transition-colors">
          ← {isFr ? "Retour" : "Back"}
        </button>
        <a href="#top"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300 }}
          className="text-sm tracking-[0.3em] text-black">
          CHROMA
        </a>
        <button onClick={() => i18n.changeLanguage(isFr ? "en" : "fr")}
          className="text-[10px] tracking-[0.35em] uppercase text-black/50 hover:text-black transition-colors">
          {isFr ? "EN" : "FR"}
        </button>
      </motion.nav>

      {/* ── SECTION 1 : HERO ── */}
      <section className="bg-[#f3f3f1] pt-28 pb-16 px-8 lg:px-14">
        <div className="flex flex-col items-center text-center">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(5rem, 18vw, 22rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "#000000",
              }}
            >
              CHROMA
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", color: "#000000" }}
            className="mt-8 text-lg md:text-2xl font-light leading-relaxed max-w-2xl"
          >
            {isFr
              ? "Architecte de visions. Chroma est l'entité créative menant les projets vers l'excellence technique et artistique."
              : "Architect of visions. Chroma is the creative entity driving projects towards technical and artistic excellence."}
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 2 : NOS SERVICES (Titre) ── */}
      <div className="bg-[#f3f3f1] pt-12 pb-12 px-8 lg:px-14 flex items-center justify-center">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(4rem, 12vw, 14rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: "#000000",
            }}
          >
            {isFr ? "NOS SERVICES" : "OUR SERVICES"}
          </motion.h2>
        </div>
      </div>

      {/* ── SERVICES — Sticky push (zéro espace avant) ── */}
      <section data-dark className="relative bg-[#000000]" id="services">
        {SERVICES.map((s, idx) => (
          <div
            key={idx}
            className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden"
            style={{ zIndex: 10 + idx }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `image-set(url("${s.bg}") type("image/webp"), url("${s.bgFallback}") type("image/jpeg"))` }}
            />
            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 text-center px-6 pointer-events-none">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(3rem, 10vw, 11rem)",
                  fontWeight: 300,
                  color: "#ffffff",
                  lineHeight: 0.9,
                  letterSpacing: "0.01em",
                  textShadow: "0 4px 60px rgba(0,0,0,0.5)",
                }}
              >
                {isFr ? s.fr.toUpperCase() : s.en.toUpperCase()}
              </motion.h2>
            </div>
          </div>
        ))}
      </section>

      {/* ── CLIENTS MARQUEE ── */}
      <section className="bg-[#f3f3f1] py-28 overflow-hidden relative z-20" id="clients">
        <div className="px-8 lg:px-14 mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-black/40 text-center"
          >
            {isFr ? "Clients & Partenaires" : "Clients & Partners"}
          </motion.p>
        </div>

        <div className="flex overflow-x-hidden">
          <div className="chroma-marquee flex items-center gap-20 lg:gap-32 whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i}
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: i % 2 === 0 ? "normal" : "italic" }}
                className="text-3xl md:text-5xl font-light text-black/20 hover:text-black transition-colors duration-500 cursor-default select-none"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes chroma-run { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          .chroma-marquee { animation: chroma-run 30s linear infinite; display: flex; width: max-content; }
        `}</style>
      </section>

      {/* ── ECLIPSE BRIDGE ── */}
      <section data-dark className="relative overflow-hidden bg-[#000000] z-20" style={{ minHeight: "100vh" }}>
        <PictureBackground
          src="/assets/boss_00039_"
          alt="Background"
          imgClassName="opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center px-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[10px] tracking-[0.55em] uppercase text-white/30 mb-16"
          >
            {isFr ? "Projet Phare — Notre Première Production Majeure" : "Flagship Project — Our First Major Production"}
          </motion.span>

          <Up className="mb-2">
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(4rem, 13vw, 15rem)", fontWeight: 300, color: "#ffffff", lineHeight: 0.87, letterSpacing: "-0.03em" }}>
              PROJECT
            </h2>
          </Up>
          <Up delay={0.1} className="mb-16">
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "clamp(4rem, 13vw, 15rem)", fontWeight: 300, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.4)", lineHeight: 0.87, letterSpacing: "-0.03em" }}>
              ECLIPSE
            </h2>
          </Up>

          <a
            href="/eclipse"
            className="inline-block text-[11px] tracking-[0.45em] uppercase px-14 py-5 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500"
          >
            {isFr ? "EXPLORER L'UNIVERS →" : "EXPLORE THE UNIVERSE →"}
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer data-dark className="bg-[#000000] text-white px-8 lg:px-14 pt-24 pb-0 overflow-hidden relative z-20">
        <div className="flex flex-col md:flex-row justify-between gap-16 border-b border-white/10 pb-16">
          {/* Email & Socials */}
          <div className="flex flex-col justify-between">
            <div className="mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-5">
                {isFr ? "Nous contacter" : "Contact us"}
              </p>
              <a
                href="mailto:contact@chroma-studio.dz"
                className="block text-2xl md:text-3xl lg:text-4xl font-light text-white/90 hover:text-white transition-colors tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                contact@chroma-studio.dz
              </a>
            </div>

            <div className="flex gap-8">
              <a href="https://www.instagram.com/chroma.studio.interactive" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.35em] uppercase text-white/40 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://www.youtube.com/@ChromaDigital" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.35em] uppercase text-white/40 hover:text-white transition-colors">
                YouTube
              </a>
              <a href="https://www.linkedin.com/company/121184022/" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.35em] uppercase text-white/40 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="https://www.facebook.com/share/18KiGMvTF9/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.35em] uppercase text-white/40 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>

          {/* Menu links */}
          <nav className="flex flex-col gap-4 items-start md:items-end text-left md:text-right">
            <a href="#top" className="text-[10px] tracking-[0.35em] uppercase text-white/50 hover:text-white transition-colors">
              {isFr ? "Le Studio" : "The Studio"}
            </a>
            <a href="#" className="text-[10px] tracking-[0.35em] uppercase text-white/50 hover:text-white transition-colors">
              {isFr ? "Réalisations" : "Works"}
            </a>
            <a href="#services" className="text-[10px] tracking-[0.35em] uppercase text-white/50 hover:text-white transition-colors">
              {isFr ? "Expertises" : "Expertise"}
            </a>
            <a href="/contact" className="text-[10px] tracking-[0.35em] uppercase text-white/50 hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>

        {/* Giant outline wordmark */}
        <div className="overflow-hidden leading-none -mb-[0.2em] pointer-events-none">
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(5rem, 21vw, 28rem)",
              fontWeight: 300,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.15)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              userSelect: "none",
            }}
          >
            CHROMA
          </h2>
        </div>
      </footer>
    </div>
  );
}
