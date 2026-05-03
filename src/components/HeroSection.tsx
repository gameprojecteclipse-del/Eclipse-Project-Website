import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import downArrow from "@/assets/down-arrow.svg";
import eclipseLogoFull from "@/assets/logo-full.svg";
import ShinyText from "./ShinyText";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  onLearnMore: () => void;
}

export const HeroSection = ({ onLearnMore }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects for different elements
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yButton = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Full Screen Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-60 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <div className="absolute inset-0">
        <motion.img
          src={heroBackground}
          alt="Dark fantasy background"
          className="absolute w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          style={{ y: yBg, scale }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-eclipse-black/60 via-transparent to-eclipse-black/80" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        <motion.h1
          style={{ y: yTitle }}
          className="font-cinzel text-6xl md:text-8xl font-bold text-pure-white mb-6 tracking-wide"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="block text-our-red text-shadow-glow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            ECLIPSE
          </motion.span>
          <motion.span
            className="block text-2xl md:text-3xl font-normal text-muted-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ y: ySubtitle }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Une Expérience Dark Fantasy
          </motion.span>
        </motion.h1>

        <motion.p
          style={{ y: yText }}
          className="text-our-white mt-10 font-oswald text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Explorez un monde où les ombres règnent en maître et où chaque choix
          façonne votre destin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: yButton }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            onClick={onLearnMore}
            className="font-oswald text-lg text-our-red font-semibold mt-10 px-8 py-6 bg-transparent rounded-full border border-our-red hover:bg-our-red hover:text-our-white transition-all duration-300"
          >
            DECOUVREZ PLUS
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ opacity }}
      >
        <motion.img
          src={downArrow}
          alt="Scroll down"
          className="w-15 h-15"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.section>
  );
};
