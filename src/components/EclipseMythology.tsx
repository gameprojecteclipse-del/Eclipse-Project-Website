import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";
import { PictureBackground } from "./PictureBackground";

export const EclipseMythology = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isFr = lang === "fr";
  const propType = useMemo(() => Math.random() > 0.5 ? 1 : 2, []);

  const quote = (() => {
    switch (lang) {
      case "zh":
        return propType === 1
          ? "在文明消逝的废墟之上，神话再度苏醒 — 已然面目全非 — 在日食的凝视下，命运化为枷锁。"
          : "层层叠加直至抹杀的古老文明深处，异变的神话正从被埋葬的尘埃中爬回 — 命运化为一道缓慢的、仿佛拥有呼吸的绞索。";
      case "ja":
        return propType === 1
          ? "文明が潰え去った地で、神話は変貌を遂げて再び這い上がる。日食の監視下において、運命は枷へと変わるのだ。"
          : "忘却の彼方に重なり合った文明の深層から、変容した神話が蘇る。運命は緩やかに呼吸する鎖となり、我々を縛り付ける。";
      case "fr":
        return propType === 1
          ? "Là où les civilisations se sont effacées, les mythes remontent — altérés — et, sous l’éclipse, le destin devient contrainte."
          : "Là où des civilisations se sont superposées jusqu’à s’effacer, les mythes remontent des couches mortes — altérés — et le destin devient une contrainte lente, presque organique.";
      default:
        return propType === 1
          ? "Where civilizations have faded, myths resurface — altered — and under the eclipse’s gaze, fate turns into shackles."
          : "Where civilizations have piled atop each other into erasure, myths crawl back from the buried layers — altered — and fate turns into a slow, almost breathing leash.";
    }
  })();

  const editorial = (() => {
    switch (lang) {
      case "zh":
        return "九霄之下，某种本不该成形的存在正蛰伏沉睡。山峦如森森肋骨，河流如脉搏般搏动。凡人盲目于习俗，向月祈祷，却不知月之回应 — 支离破碎，沦为梦魇。那股寂静的狂热在深夜驱使他们，掘入本不该触碰的深渊。在星辰都为之犹疑的无垠黑暗之外，一个无面之物正静静窥伺。祂有恐惧，历经千纪。当光芒渐逝、深渊之眼偏离，那具庞然的躯壳便试图蠕动。一具肉身，一座牢笼，一个错误。这些从未足够。但这一次，在那尘封的渊底与死寂中，心跳渐缓。终焉将至。而这一次，撞击牢笼的不再是神明。是一道阴影。一个虚无。一个自苍穹坠落的婴孩。";
      case "ja":
        return "天の下、決して形を成すべきではなかった何かが微睡んでいる。山々は肋骨の如くそびえ、川は脈拍のように脈打つ。習慣に目を眩まされた人間は月に祈るが、それが応えていることを知らない — 断片的に、悪夢の中で、彼らを夜な夜な深く掘り下げさせる静かな熱病として。星々さえ躊躇う暗黒の彼方で、名もなき存在が監視している。それは顔を持たず、ただ一つの恐怖を抱く。光が衰え、深淵の瞳が背けられる時、巨大な何かが動こうとする。肉体。檻。過ち。それだけでは決して足りなかった。だが今回、深層の静寂の下で、鼓動は遅れ始める。何かが終わろうとしている。そして初めて、檻を叩くのは神ではない。それは影。無に等しい何か。空から堕ちてくる子供だ。";
      case "fr":
        return "Sous les cieux, quelque chose dort qui n'aurait jamais dû prendre forme. Les montagnes ont la forme des côtes. Les rivières y battent comme un pouls, et les hommes, aveuglés par l'habitude, prient la lune sans savoir qu'elle leur répond — par bribes, par cauchemars, par cette fièvre silencieuse qui les pousse, la nuit, à creuser plus profond qu'ils ne devraient. Dehors, par-delà l'étendue noire où les astres eux-mêmes hésitent, une présence veille. Elle n'a pas de visage. Elle a une peur. Et tous les âges, quand la lumière faiblit et que l'œil du large se détourne, quelque chose d'immense tente de bouger. Un corps. Une cage. Une erreur. Ça n'a jamais suffi. Mais cette fois, tout au fond, sous les strates et les silences, un battement ralentit. Quelque chose s'achève. Et pour la première fois, ce n'est pas un dieu qui frappe les barreaux. C'est une ombre. Un presque-rien. Un enfant qui tombe du ciel.";
      default:
        return "Under the heavens, something slumbers that should never have taken shape. The mountains are shaped like ribs. The rivers beat like a pulse, and men, blinded by habit, pray to the moon without knowing that it answers them — in fragments, in nightmares, in that silent fever that drives them, at night, to dig deeper than they should. Outside, beyond the black expanse where the stars themselves hesitate, a presence watches. It has no face. It has a fear. And in every age, when the light fades and the eye of the deep turns away, something immense tries to move. A body. A cage. A mistake. It was never enough. But this time, deep down, beneath the strata and the silences, a heartbeat slows. Something is ending. And for the first time, it is not a god striking the bars. It is a shadow. A near-nothing. A child falling from the sky.";
    }
  })();

  return (
    <section id="mythology" className="relative bg-black overflow-hidden">
      {/* Full-height bg image */}
      <div className="absolute inset-0">
        <PictureBackground
          src="/assets/eclipse/backgrounds/eclipse-mythology-bg"
          alt="Eclipse mythology background"
          imgClassName="opacity-[0.18] saturate-[0.15] brightness-[0.7] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent" />
        {/* Deep bottom fade — invisible seam into Gallery */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B0000]/5 rounded-full blur-[200px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-16 py-12 md:py-24">
        {/* Micro label */}
        <SectionTitle
          index="03"
          label="L'Univers"
          labelEn="The Universe"
          isFr={isFr}
          align="center"
          className="mb-8 md:mb-14"
        />

        {/* Hero Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-xl md:text-4xl lg:text-5xl text-white font-light leading-[1.6] md:leading-[1.55] text-center mb-8 md:mb-12"
        >
          {quote}
        </motion.blockquote>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
          className="h-px w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-[#8B0000]/70 to-transparent mb-10 md:mb-20 origin-center"
        />

        {/* Editorial description */}
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-inter text-sm md:text-lg text-white/80 md:text-white/55 leading-[1.8] md:leading-[2.2] text-center"
          >
            {editorial}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
