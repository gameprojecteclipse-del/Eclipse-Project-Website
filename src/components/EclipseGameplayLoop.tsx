import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
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

const PillarPanel = ({ pillar, idx, isFr }: { pillar: any, idx: number, isFr: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });

  const intensitySpring = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    intensitySpring.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Parallax logic (small movement based on mouse)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set((x - centerX) / 12);
    mouseY.set((y - centerY) / 12);

    const now = performance.now();
    const dt = now - lastMousePos.current.time;
    if (dt > 0) {
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = distance / dt;
      const normalizedSpeed = Math.min(speed * 2, 1);
      intensitySpring.set(0.3 + normalizedSpeed * 0.7);
    }
    lastMousePos.current = { x, y, time: now };
  };

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
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative flex-1 group cursor-crosshair overflow-hidden border-t md:border-t-0 md:border-l border-white/[0.02] first:border-l-0"
      style={{ flexBasis: "33.33%" }}
    >
      {/* Background image with Parallax effect and WebP/PNG fallback */}
      <motion.div
        className="absolute -inset-10 z-0"
        style={{ x: mouseX, y: mouseY, scale: 1.05 }}
      >
        <PictureBackground
          src={pillar.image.replace('.png', '')}
          alt={pillar.title}
          imgClassName="opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
        />
      </motion.div>

      {/* Base overlay for readability, fades on hover */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10" />

      {/* Red Lighting Effect based on mouse speed - Centered, over gradients */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
        style={{
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(180,0,0,0.5) 0%, rgba(139,0,0,0.1) 30%, transparent 60%)",
          opacity: isHovering ? intensitySpring : 0,
          scale: useTransform(intensitySpring, [0.1, 1], [0.9, 1.4]),
          mixBlendMode: "screen",
        }}
      />

      {/* Blends to hide demarcations between pillars and top/bottom - placed UNDER text */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10" />
      {idx > 0 && <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/70 to-transparent pointer-events-none z-10" />}
      {idx < 2 && <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/70 to-transparent pointer-events-none z-10" />}

      {/* Content - Text is completely unblocked by z-30 */}
      <div className="relative z-30 flex flex-col justify-end h-full p-8 md:p-10 min-h-[400px] md:min-h-0 pointer-events-none">
        <span className="font-cinzel text-3xl md:text-5xl text-[#8B0000]/30 group-hover:text-[#8B0000]/70 transition-colors duration-500 block mb-3">
          {pillar.id}
        </span>
        <h3 className="font-cinzel text-2xl md:text-3xl text-white/70 group-hover:text-white tracking-widest uppercase mb-0 group-hover:mb-4 transition-all duration-500 drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
          {pillar.title}
        </h3>

        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="overflow-hidden">
            <p className="font-inter text-xs md:text-sm text-white/90 leading-relaxed pt-3 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
              {isFr ? pillar.descFr : pillar.descEn}
            </p>
            <div className="h-px w-10 bg-[#8B0000]/70" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const EclipseGameplayLoop = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  return (
    <section className="relative w-full bg-black overflow-hidden" id="gameplay">
      {/* Top blend */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Section Title — above pillars */}
      <div className="relative z-30 max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-12">
        <SectionTitle
          index="04"
          label="Pilliers du Gameplay"
          labelEn="Gameplay Pillars"
          isFr={isFr}
        />
      </div>

      <div className="relative flex flex-col md:flex-row z-20" style={{ minHeight: "85vh" }}>
        {pillars.map((pillar, idx) => (
          <PillarPanel key={pillar.id} pillar={pillar} idx={idx} isFr={isFr} />
        ))}
      </div>
    </section>
  );
};
