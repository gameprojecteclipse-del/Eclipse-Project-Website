import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const gameplayPhases = [
  {
    tag: "I.",
    title: "Extraction de l'Essence (Harvest)",
    titleEn: "Essence Extraction (Harvest)",
    text: "Chaque créature vaincue libère une 'Matière Primordiale'. Le joueur doit extraire cette essence avant qu'elle ne s'évapore dans le cosmos.",
    textEn: "Every defeated creature releases a 'Primordial Matter'. The player must extract this essence before it evaporates into the cosmos.",
  },
  {
    tag: "II.",
    title: "La Mutation Transgressive (Alchemy)",
    titleEn: "Transgressive Mutation (Alchemy)",
    text: "Le joueur utilise cette matière pour altérer ses propres statistiques et compétences. Plus vous devenez puissant, plus votre perception du monde change (visions, altérations de l'environnement).",
    textEn: "The player uses this matter to alter their own stats and skills. The more powerful you become, the more your perception of the world changes (visions, environmental alterations).",
  },
  {
    tag: "III.",
    title: "Résonance Archéologique",
    titleEn: "Archaeological Resonance",
    text: "En utilisant des artefacts anciens, le joueur 'résonne' avec le passé pour ouvrir des passages vers des zones interdites, bouclant ainsi le cycle d'exploration et de survie.",
    textEn: "Using ancient artifacts, the player 'resonates' with the past to open paths to forbidden zones, completing the cycle of exploration and survival.",
  },
];

const roadmapSteps = [
  "Creative Foundation", "Team Construction", "Mawahub (Actuel)", "Multidisciplinary Research",
  "Functional Prototype", "Demo Pre-production", "Vertical Slice Demo", "Communication & Community",
  "Funding & Industrial Transition", "Tome 1 Production"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const blockVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const EclipseLore = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blood-red/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blood-red/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- GAMEPLAY LOOP --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="font-inter text-xs tracking-[0.5em] uppercase text-blood-red/70">
            {isFr ? "Gameplay Loop" : "Gameplay Loop"}
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl text-white mt-3 tracking-widest">
            {isFr ? "Piliers de Résonance" : "Pillars of Resonance"}
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-blood-red via-red-600 to-transparent mx-auto mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-16 mb-40"
        >
          {gameplayPhases.map((block, i) => (
            <motion.div
              key={i}
              variants={blockVariants}
              className="grid grid-cols-[auto_1fr] gap-8 items-start"
            >
              <div className="font-cinzel text-5xl text-blood-red/40 font-bold leading-none pt-1 select-none">
                {block.tag}
              </div>
              <div>
                <h3 className="font-cinzel text-2xl text-white mb-5 tracking-wide">
                  {isFr ? block.title : block.titleEn}
                </h3>
                <p className="font-inter text-white/65 leading-[1.9] text-base md:text-lg">
                  {isFr ? block.text : block.textEn}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- TARGET AUDIENCE & MARKET --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-t border-white/5 pt-32"
        >
          <span className="font-inter text-xs tracking-[0.5em] uppercase text-blood-red/70">
            {isFr ? "Cible & Marché" : "Target & Market"}
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl text-white mt-3 tracking-widest mb-10">
            {isFr ? "L'Océan Bleu d'Eclipse" : "The Blue Ocean of Eclipse"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/[0.02] border border-white/5 p-8">
              <h4 className="font-cinzel text-xl text-white mb-4">
                {isFr ? "Le Succès Global" : "Global Success"}
              </h4>
              <p className="font-inter text-white/60 leading-relaxed">
                {isFr 
                  ? "Inspiré par le triomphe de Black Myth: Wukong, Eclipse prouve que le public international est prêt pour des mythologies non-occidentales à très haute fidélité visuelle."
                  : "Inspired by the triumph of Black Myth: Wukong, Eclipse proves the international audience is ready for non-Western mythologies in ultra-high visual fidelity."}
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-8">
              <h4 className="font-cinzel text-xl text-white mb-4">
                {isFr ? "Le Positionnement Unique" : "Unique Positioning"}
              </h4>
              <p className="font-inter text-white/60 leading-relaxed">
                {isFr 
                  ? "Nous occupons seul l'espace de la fantasy Africaine et du croisement culturel Méditerranéen et Ottoman. C'est l'essence de notre Océan Bleu."
                  : "We uniquely occupy the space of African fantasy and Mediterranean/Ottoman cultural crossover. This is the essence of our Blue Ocean."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- ROADMAP --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/5 pt-32"
        >
          <h2 className="font-cinzel text-3xl text-center text-white tracking-widest mb-16">
            {isFr ? "Roadmap de Production" : "Production Roadmap"}
          </h2>
          
          <div className="relative border-l border-blood-red/30 ml-4 md:ml-8 pl-8 space-y-12 py-4">
            {roadmapSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className={`absolute -left-[39px] w-3 h-3 rounded-full border-2 border-zinc-950 ${step.includes('Mawahub') ? 'bg-blood-red shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'bg-white/30'}`} />
                
                <h4 className={`font-cinzel text-lg tracking-wide ${step.includes('Mawahub') ? 'text-blood-red font-bold' : 'text-white/80'}`}>
                  <span className="font-inter text-xs text-white/30 mr-4">Phase {idx + 1}</span>
                  {step}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
