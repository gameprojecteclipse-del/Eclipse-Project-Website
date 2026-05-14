import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const videoTrailer = "/assets/videos/trailer.mp4";
import imageThumbnail from "/assets/images/ui/concept-art-1.jpg";

interface GameSectionProps {
  onLearnMoreProject: () => void;
}

export const GameSection = ({ onLearnMoreProject }: GameSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll animations setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="game-section"
      className="py-20 bg-background relative"
      style={{ opacity }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-our-white mb-6">
            LA VISION DU PROJET <span className="text-our-red">ECLIPSE</span>
          </h2>
          <p className="font-inter text-lg text-gray-400 max-w-2xl mx-auto">
            Découvrez l'essence de notre projet phare, Eclipse, une aventure de
            dark fantasy conçue pour captiver et immerger les joueurs dans un
            monde riche et évocateur.
          </p>
        </motion.div>
        {/* Video Container */}
        <motion.div
          className="relative max-w-4xl mx-auto mb-12 group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-video bg-transparent rounded-3xl overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={imageThumbnail}
              playsInline
            >
              <source src={videoTrailer} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Overlay */}
            <motion.div
              className={`absolute inset-0 flex items-center rounded-3xl justify-center bg-our-black/60 
                   transition-opacity duration-300 
                   ${isPlaying
                  ? "opacity-0 group-hover:opacity-100"
                  : "opacity-100"
                }`}
              onClick={handlePlayPause}
              initial={{ opacity: 0 }}
              animate={{ opacity: isPlaying ? 0 : 1 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.div
                className="transform transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {!isPlaying ? (
                  <div className="w-20 h-20 bg-our-red/60 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-our-red/80 transition-colors cursor-pointer">
                    <svg
                      className="w-8 h-8 text-our-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-our-red/60 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-our-red/80 transition-colors cursor-pointer">
                    <svg
                      className="w-8 h-8 text-our-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  </div>
                )}
              </motion.div>

              {/* Title overlay - only show when paused */}
              {!isPlaying && (
                <motion.div
                  className="absolute bottom-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-oswald text-pure-white text-xl mb-1">
                    Eclipse Trailer Video
                  </p>
                  <p className="font-inter text-sm text-muted-foreground">
                    Extrait de la bande-annonce
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
        {/* Description */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-oswald text-2xl font-semibold text-pure-white mb-4">
            De la Vision à la Réalité
          </h3>
          <p className="font-inter text-lg text-gray-400 leading-relaxed mb-6">
            Eclipse représente notre engagement à repousser les limites du jeu
            de dark fantasy. Né d'une passion pour la narration immersive et les
            mécaniques de jeu innovantes, ce projet incarne le dévouement de
            notre équipe à créer des expériences inoubliables.
          </p>
        </motion.div>
        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Button
            onClick={onLearnMoreProject}
            className="font-oswald text-lg font-semibold px-8 py-5 bg-transparent rounded-full border border-our-red text-our-red hover:bg-our-red hover:text-our-white transition-all duration-300"
          >
            EXPLORER LE STUDIO
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};
