import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

interface Artwork {
  src: string;
  srcFallback: string;
  title: string;
  titleFr: string;
  caption: string;
  captionFr: string;
  objectPosition?: string;
}

const artworks: Artwork[] = [
  {
    src: "/assets/eclipse/gallery/art-4.webp",
    srcFallback: "/assets/eclipse/gallery/art-4.jpg",
    title: "The Medracen Sepulcher", 
    titleFr: "Le Sépulcre Medracen",
    caption: "Sanctuary of the devoted — where once blood rivers ran, now the clenched throats of the earth find no relief. The eclipse's promise gathers the living.",
    captionFr: "Lieu de recueillement des fidèles — les rivières de sang n'épanchent plus les gorges nouées, la promesse de l'éclipse rassemble les vivants.",
  },
  {
    src: "/assets/eclipse/gallery/art-6.webp",
    srcFallback: "/assets/eclipse/gallery/art-6.jpg",
    title: "The Omen", 
    titleFr: "Le Présage",
    caption: "The ritual is all that remains of sacrifice. The air itself tells you so — the final age's halo slowly congeals.",
    captionFr: "Le sacrifice n’est plus qu’un rituel. On le sent dans l’atmosphère, le halo du dernier âge prend forme.",
  },
  {
    src: "/assets/eclipse/gallery/art-1.webp",
    srcFallback: "/assets/eclipse/gallery/art-1.jpg",
    title: "The River", 
    titleFr: "Le Fleuve",
    caption: "Deep in the guts of the primal site — the forgotten verses and the membranes of the founder.",
    captionFr: "Aux entrailles du premier lieu — les versets oubliés et les membranes du fondateur.",
    objectPosition: "center 85%",
  },
  {
    src: "/assets/eclipse/gallery/art-3.webp",
    srcFallback: "/assets/eclipse/gallery/art-3.jpg",
    title: "The City of the Gaetulians", 
    titleFr: "La Cité des Gétules",
    caption: "Raised on ancient trails, bearing witness to a mighty dynasty — tiered architecture, a centralized socio-political order.",
    captionFr: "Bâti sur des sentiers, témoin d'une dynastie majeure — architecture hiérarchique, organisation socio-politique centralisée.",
  },
  {
    src: "/assets/eclipse/gallery/art-5.webp",
    srcFallback: "/assets/eclipse/gallery/art-5.jpg",
    title: "The Dawn of the Promise", 
    titleFr: "L'Aube de la Promesse",
    caption: "Cathedrals thrust skyward, wrought from select matter — almost sacred. Their walls carry the heft of unseen layers.",
    captionFr: "Les cathédrales se dressent, faites de matières choisies, presque sacrées — les murs portent le poids des strates invisibles.",
  },
  {
    src: "/assets/eclipse/gallery/art-2.png",
    srcFallback: "/assets/eclipse/gallery/art-2.webp",
    title: "The Fracture", 
    titleFr: "La Fracture",
    caption: "First biome — the city of Gueldaman, devoured by the matter of the void.",
    captionFr: "Premier biome — cité gueldamane consumée par la matière du néant.",
  },
];

export const EclipseGallery = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [current, setCurrent] = useState(0);

  // Manual navigation only — no autoplay
  const next = () => setCurrent((c) => (c + 1) % artworks.length);
  const prev = () => setCurrent((c) => (c - 1 + artworks.length) % artworks.length);

  return (
    <section id="gallery" className="relative bg-black pt-0 pb-32">
      {/* ── Bridge from Gameplay section ── */}
      <div className="absolute top-0 inset-x-0 h-56 bg-gradient-to-b from-black via-black/90 to-transparent z-20 pointer-events-none" />
      {/* Label */}
      <div className="relative z-30 max-w-[1920px] mx-auto px-8 lg:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionTitle
          index="04"
          label="Panorama Conceptuel"
          labelEn="Conceptual Panorama"
          isFr={isFr}
          className="mb-0"
        />
        <span className="font-inter text-[10px] text-white/20 tracking-[0.2em] uppercase shrink-0 mb-0">
          {String(current + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Cinematic 16/9 Viewer ── */}
      <div className="relative w-full max-w-[1920px] mx-auto h-[60vh] md:h-[85vh] bg-black overflow-hidden group vignette-blend">
        
        {/* Crossfading Images — no Ken Burns zoom */}
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={artworks[current].src}
              alt={artworks[current].title}
              className="w-full h-full object-cover animate-ken-burns origin-center"
              style={{ objectPosition: artworks[current].objectPosition || "center" }}
              loading="lazy"
              onError={e => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== window.location.origin + artworks[current].srcFallback) {
                  target.src = artworks[current].srcFallback;
                } else {
                  target.style.opacity = "0";
                }
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Black Bars / Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

        {/* Content Overlays */}
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end z-20 pointer-events-none">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pointer-events-auto">
            
            {/* Titles & Descriptions */}
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${current}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-inter text-[10px] text-[#8B0000] tracking-[0.4em] uppercase block mb-4 drop-shadow-md">
                    VISION // {String(current + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-cinzel text-3xl md:text-5xl lg:text-6xl text-white tracking-widest uppercase mb-4 shadow-black drop-shadow-2xl">
                    {isFr ? artworks[current].titleFr : artworks[current].title}
                  </h3>
                  <p className="font-inter text-base md:text-lg text-white/70 leading-[1.8] max-w-xl shadow-black drop-shadow-lg">
                    {isFr ? artworks[current].captionFr : artworks[current].caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation — arrows only, no miniatures */}
            <div className="flex items-center gap-2">
              <button 
                onClick={prev} 
                className="p-4 border border-white/5 bg-black/20 hover:bg-black/80 text-white/50 hover:text-white transition-all backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={next} 
                className="p-4 border border-white/5 bg-black/20 hover:bg-black/80 text-white/50 hover:text-white transition-all backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
