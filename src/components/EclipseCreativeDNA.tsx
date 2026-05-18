import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";
import { PictureBackground } from "./PictureBackground";

const DNA_PILLARS = [
  {
    id: "01",
    titleFr: "Désolation Esthétique",
    titleEn: "Aesthetic Desolation",
    descFr: "Le monde n'est pas simplement mort, il est pétrifié dans sa propre chute. Chaque environnement est conçu comme un tableau de maître, où la beauté naît de la ruine et de la lumière mourante.",
    descEn: "The world is not merely dead; it is petrified in its own fall. Every environment is designed as a masterpiece, where beauty is born from ruin and dying light."
  },
  {
    id: "02",
    titleFr: "Narration par l'Absence",
    titleEn: "Narrative through Absence",
    descFr: "Le silence est notre outil de narration le plus puissant. Nous ne racontons pas une histoire, nous laissons le joueur l'exhumer des ombres, des débris et des non-dits.",
    descEn: "Silence is our most powerful storytelling tool. We don't tell a story; we let the player exhume it from shadows, debris, and the unspoken."
  },
  {
    id: "03",
    titleFr: "Fatalisme Actif",
    titleEn: "Active Fatalism",
    descFr: "Le destin est une contrainte organique. Le joueur n'échappe pas à l'Éclipse, il apprend à l'habiter. Chaque choix est une lutte contre une fin inévitable.",
    descEn: "Fate is an organic constraint. The player doesn't escape the Eclipse; they learn to inhabit it. Every choice is a struggle against an inevitable end."
  }
];

export const EclipseCreativeDNA = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isFr = lang === "fr";

  const translatedPillars = DNA_PILLARS.map(pillar => {
    switch (lang) {
      case "zh":
        switch (pillar.id) {
          case "01":
            return {
              id: "01",
              title: "残缺美学",
              desc: "世界并非单纯死去，而是凝固在其自身的坠落中。每一处环境都如大师级的画作，美感在残垣与垂死的残阳中悄然绽放。"
            };
          case "02":
            return {
              id: "02",
              title: "空白叙事",
              desc: "留白与静默是我们最强大的叙事武器。我们不灌输故事，而是引导玩家从阴影、遗骸与言外之意中将其发掘。"
            };
          case "03":
            return {
              id: "03",
              title: "主动宿命论",
              desc: "命运是一种有机的束缚。玩家无法逃离日食的笼罩，而是学会栖息其中。每一次选择，都是与注定终焉的殊死抗争。"
            };
          default:
            return { id: pillar.id, title: pillar.titleEn, desc: pillar.descEn };
        }
      case "ja":
        switch (pillar.id) {
          case "01":
            return {
              id: "01",
              title: "荒廃の美学",
              desc: "世界はただ死に絶えたのではなく、その崩壊の瞬間で石化しています。すべての環境は名画のように設計され、廃墟と死にゆく光から美が生まれます。"
            };
          case "02":
            return {
              id: "02",
              title: "空白による語り",
              desc: "沈黙こそが最も強力なストーリーテリングツールです。物語をただ語るのではなく、プレイヤー自らが影や残骸、語られざる真実から発掘するのです。"
            };
          case "03":
            return {
              id: "03",
              title: "能動的宿命論",
              desc: "運命は有機的な制約です。プレイヤーは日食から逃れるのではなく、その中で生きることを学びます。あらゆる選択は、避けられない終焉への抗いです。"
            };
          default:
            return { id: pillar.id, title: pillar.titleEn, desc: pillar.descEn };
        }
      case "fr":
        return { id: pillar.id, title: pillar.titleFr, desc: pillar.descFr };
      default:
        return { id: pillar.id, title: pillar.titleEn, desc: pillar.descEn };
    }
  });

  const sub = (() => {
    switch (lang) {
      case "zh":
        return "在机制之外，Eclipse 建立在一种核心愿景之上。在写下第一行代码之前，我们的基因就已定义了这场体验的灵魂。";
      case "ja":
        return "システムやメカニクスを超え、Eclipseは根源的なビジョンの上に築かれています。私たちのDNAは、最初のコードが書かれるより前に体験の魂を定義します。";
      case "fr":
        return "Au-delà des mécaniques, Eclipse repose sur une vision fondamentale. Notre ADN définit l'âme de l'expérience avant même la première ligne de code.";
      default:
        return "Beyond mechanics, Eclipse rests upon a fundamental vision. Our DNA defines the soul of the experience before the first line of code is even written.";
    }
  })();

  return (
    <section className="relative bg-[#050505] py-16 overflow-hidden border-t border-white/[0.02]">
      {/* Background Image with Deep Overlays */}
      <div className="absolute inset-0">
        <PictureBackground
          src="/assets/eclipse/sections/ADN Créatif"
          alt="Creative DNA Background"
          imgClassName="opacity-[0.15] saturate-[0.2] brightness-[0.6] animate-ken-burns"
        />
        {/* Vignette & Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.95)_100%)]" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
        {/* Deep bottom fade for transition to Mythology */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      </div>

      {/* Organic Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/assets/eclipse/sections/texture-grain.jpg')] bg-repeat mix-blend-overlay" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="max-w-2xl mb-16">
          <SectionTitle
            index="02"
            label="L'ADN Créatif"
            labelEn="Creative DNA"
            isFr={isFr}
            className="mb-6"
          />
          <p className="font-inter text-base md:text-lg text-white/30 leading-relaxed italic border-l border-[#8B0000]/20 pl-6">
            {sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {translatedPillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.3 }}
              className="group relative"
            >
              {/* Pulsating Organic Core Background */}
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-cinzel text-xs text-[#8B0000]/40 group-hover:text-[#8B0000] transition-colors tracking-[0.3em]">
                    {pillar.id}
                  </span>
                  <div className="h-px w-12 bg-gradient-to-r from-[#8B0000]/60 to-transparent" />
                </div>
                
                <h3 className="font-cinzel text-xl md:text-2xl text-white/80 group-hover:text-white mb-4 tracking-[0.2em] uppercase transition-all duration-700">
                  {pillar.title}
                </h3>
                
                <p className="font-inter text-sm md:text-base text-white/25 leading-[1.6] group-hover:text-white/50 transition-colors duration-700">
                  {pillar.desc}
                </p>
                
                {/* Ancient Erased Line */}
                <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
