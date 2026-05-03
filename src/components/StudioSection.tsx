import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const StudioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const teamStats = [
    { number: "2025", label: "Fondé en" },
    { number: "11", label: "Membres de l'équipe" },
    { number: "1", label: "Projet Actif" },
    { number: "3", label: "Plateformes Ciblées" },
  ];

  const openPositions = [
    {
      title: "Senior Game Designer",
      description:
        "Lead gameplay mechanics and player experience design for Eclipse",
      type: "Full-time",
    },
    {
      title: "3D Environment Artist",
      description:
        "Create stunning dark fantasy environments and atmospheric scenes",
      type: "Full-time",
    },
    {
      title: "Narrative Designer",
      description: "Craft compelling storylines and character development arcs",
      type: "Contract",
    },
    {
      title: "Technical Artist",
      description:
        "Bridge the gap between art and programming for optimal performance",
      type: "Full-time",
    },
  ];

  const handleApply = (position: string) => {
    // Placeholder for Google Form redirect
    console.log(`Applying for: ${position}`);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="studio-section"
      className="py-20 bg-eclipse-dark"
      style={{ opacity }}
    >
      <div className="container mx-auto px-6">
        {/* Studio Introduction */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="font-cinzel text-4xl md:text-5xl font-bold text-pure-white mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-our-red">ECLIPSE</span> STUDIO
          </motion.h2>
          <motion.p
            className="font-inter text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Née d'une passion commune pour la dark fantasy et le gameplay
            innovant, Eclipse Studio représente une nouvelle génération de
            développeurs de jeux déterminés à repousser les limites de la
            créativité tout en maintenant les plus hauts standards de qualité.
          </motion.p>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-background max-w-4xl rounded-3xl border-[0px] mx-auto">
            <CardContent className="p-8">
              <motion.h3
                className="font-oswald text-2xl font-bold text-white mb-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                Notre Philosophie
              </motion.h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-our-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-our-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-oswald text-lg font-semibold text-pure-white mb-2">
                    Innovation
                  </h4>
                  <p className="font-inter text-sm text-gray-400">
                    Repousser les limites du possible dans le jeu vidéo grâce à
                    une prise de risques créative
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-our-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-our-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-oswald text-lg font-semibold text-pure-white mb-2">
                    Collaboration
                  </h4>
                  <p className="font-inter text-sm text-gray-400">
                    Chaque voix compte dans la construction de l’avenir de nos
                    projets et de la culture de notre studio
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-our-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-our-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-oswald text-lg font-semibold text-pure-white mb-2">
                    Excellence
                  </h4>
                  <p className="font-inter text-sm text-gray-400">
                    Un engagement envers la qualité dans chaque aspect du
                    développement et de l’expérience joueur
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-[100px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {teamStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="font-cinzel text-4xl font-bold text-our-red mb-2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <motion.div
                className="font-oswald text-sm text-gray-400 uppercase tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Career Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="font-oswald text-3xl font-bold text-our-white text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Rejoindre Notre Équipe
          </motion.h3>

          {/* Culture */}
          <motion.div
            className="text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="font-inter text-gray-400 leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Nous croyons aux modalités de travail flexibles, à la
              collaboration à distance, à la prise de responsabilité créative et
              à une vision partagée pour l'avenir du jeu vidéo. Notre équipe
              s'épanouit grâce au respect mutuel, à l'apprentissage continu et à
              la recherche de l'excellence créative.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                "Remote-First",
                "Flexible Hours",
                "Creative Freedom",
                "Professional Growth",
                "Team Ownership",
              ].map((value, index) => (
                <motion.span
                  key={value}
                  className="px-4 py-2 bg-our-red/5 border border-our-red text-our-red rounded-full font-oswald text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  {value}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.h4
              className="font-oswald text-xl font-semibold text-our-white text-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Open Positions
            </motion.h4>
            <motion.div className="grid gap-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="bg-background rounded-3xl border-0 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h5 className="font-oswald text-lg font-semibold text-our-white">
                            {position.title}
                          </h5>
                          <span className="font-inter text-sm text-our-red">
                            {position.type}
                          </span>
                        </div>
                        <Button
                          onClick={() => handleApply(position.title)}
                          size="sm"
                          className="font-oswald bg-our-red text-our-white rounded-full hover:bg-our-white hover:text-our-red transition-all duration-300"
                        >
                          Apply Now
                        </Button>
                      </div>
                      <p className="font-inter text-muted-foreground">
                        {position.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
