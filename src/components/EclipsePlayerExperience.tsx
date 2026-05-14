import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";

const panels = [
  {
    fr: "Exploration Narrative",
    en: "Narrative Exploration",
    descFr: "Un monde interconnecté où chaque ruelle cache un secret ou un raccourci. L'exploration est récompensée par la découverte d'un Lore visuel riche et mystérieux.",
    descEn: "An interconnected world where every alley hides a secret or a shortcut. Exploration is rewarded by discovering a rich and mysterious visual Lore.",
    video: "/assets/eclipse/videos/player-exp-1.mp4",
    tag: { fr: "L'Atmosphère", en: "Atmosphere" },
    videoPosition: "center center",
  },
  {
    fr: "Combat Viscéral & Réactif",
    en: "Visceral & Reactive Combat",
    descFr: "Une action rapide et impitoyable où la survie dépend de l'esquive, du timing et de l'agressivité. Chaque coup porté doit être une décision tactique.",
    descEn: "Fast and ruthless action where survival depends on dodging, timing, and aggression. Every strike must be a tactical decision.",
    video: "/assets/eclipse/videos/player-exp-2.mp4",
    tag: { fr: "L'Action", en: "Action" },
    // Reframe to center on the character — the action happens in the middle-lower portion
    videoPosition: "center 65%",
  },
  {
    fr: "Montée en Puissance",
    en: "Rise in Power",
    descFr: "Un système d'armes transformables qui change le style de jeu à la volée. Le joueur ne change pas d'arme, il apprend à maîtriser un outil complexe.",
    descEn: "A transformable weapon system that changes playstyle on the fly. The player does not change weapons, they learn to master a complex tool.",
    video: "/assets/eclipse/videos/player-exp-3.mp4",
    tag: { fr: "La Progression", en: "Progression" },
    videoPosition: "center center",
  },
  {
    fr: "Confrontations Épiques",
    en: "Epic Confrontations",
    descFr: "Des confrontations colossales, conçues comme des épreuves rudes : la victoire exige l'étude minutieuse de leurs schémas, la persévérance, et l'exploitation de chaque indice récolté au fil de l'expérience.",
    descEn: "Monumental battles, crafted as harsh trials: victory requires patient study of their designs, unyielding persistence, and the cunning to turn every hard-won lesson into a weapon.",
    video: "/assets/eclipse/videos/player-exp-4.mp4",
    tag: { fr: "Le Challenge", en: "Challenge" },
    videoPosition: "center center",
  },
];

// Spring config — heavy, overshoots slightly for organic feel
const imgSpring = { stiffness: 100, damping: 20 } as const;

const VideoPanel = ({ panel, idx, isFr, totalPanels }: { panel: typeof panels[number], idx: number, isFr: boolean, totalPanels: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Track last mouse pos and time for speed calculation
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });

  // Spring for the red light intensity (based on speed)
  const intensitySpring = useSpring(0, imgSpring);

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    videoRef.current?.pause();
    intensitySpring.set(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const dt = now - lastMousePos.current.time;

    if (dt > 0) {
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = distance / dt;
      const normalizedSpeed = Math.min(speed * 2, 1);
      intensitySpring.set(0.2 + normalizedSpeed * 0.8);
    }

    lastMousePos.current = { x, y, time: now };
  };

  // Decay the intensity when the mouse stops moving
  useEffect(() => {
    if (!isHovering) return;
    const interval = setInterval(() => {
      const now = performance.now();
      if (now - lastMousePos.current.time > 50) {
        intensitySpring.set(0.1);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isHovering, intensitySpring]);

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 flex items-end justify-start cursor-crosshair overflow-hidden group vignette-blend"
      style={{ width: "100vw", height: "100%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={panel.video}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 max-md:opacity-80 transition-opacity duration-700 origin-center"
        style={{ objectPosition: panel.videoPosition }}
      />

      {/* Red Lighting Effect based on mouse speed */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
        style={{
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(ellipse at center, rgba(139,0,0,0.4) 0%, rgba(139,0,0,0.05) 40%, transparent 70%)",
          opacity: isHovering ? intensitySpring : 0,
          scale: useTransform(intensitySpring, [0.1, 1], [0.9, 1.2]),
          mixBlendMode: "screen",
        }}
      />

      {/* Overlay */}
      <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black via-black/20 to-transparent pointer-events-none z-10" />

      {/* Horizontal Blends between slides */}
      {idx > 0 && (
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
      )}
      {idx < totalPanels - 1 && (
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
      )}

      {/* Content — pinned bottom-left */}
      <div className="relative z-30 max-w-xl px-8 md:px-16 pb-16 md:pb-20 opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[#8B0000] font-inter text-[10px] md:text-xs tracking-[0.5em] uppercase font-semibold drop-shadow-[0_0_5px_rgba(139,0,0,0.5)]">
            {isFr ? panel.tag.fr : panel.tag.en}
          </span>
        </div>
        <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-white tracking-widest uppercase mb-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          {isFr ? panel.fr : panel.en}
        </h2>
        <p className="font-inter text-sm md:text-base text-white/70 leading-relaxed border-l border-[#8B0000]/60 pl-5 max-w-md drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
          {isFr ? panel.descFr : panel.descEn}
        </p>
      </div>
    </div>
  );
};

export const EclipsePlayerExperience = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Raw scroll-to-position transform — plateau per panel
  const xRaw = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3, 0.5, 0.6, 0.8, 0.9, 1],
    ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw", "-300vw", "-300vw"]
  );

  // Spring-smooth to eliminate stutter/jump when scrolling quickly
  const x = useSpring(xRaw, { stiffness: 200, damping: 40, mass: 1 });

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: "500vh" }}>
      {/* ── Bridge from Gallery section ── */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black via-black/90 to-transparent z-40 pointer-events-none" />
      {/* ── Bridge bottom → next section ── */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent z-40 pointer-events-none" />

      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

        {/* Horizontal sliding rail */}
        <motion.div
          style={{ x, width: "400vw" }}
          className="flex flex-row h-full"
        >
          {panels.map((panel, idx) => (
            <VideoPanel key={idx} panel={panel} idx={idx} isFr={isFr} totalPanels={panels.length} />
          ))}
        </motion.div>

        {/* Scroll hint — first panel only */}
        <motion.div
          initial={{ opacity: 1 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
        >
          <span className="font-inter text-[8px] tracking-[0.4em] uppercase text-white/20">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 z-30">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full bg-[#8B0000]/60"
          />
        </div>
      </div>
    </section>
  );
};
