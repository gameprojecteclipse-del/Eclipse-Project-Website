import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";
import { PictureBackground } from "./PictureBackground";

export const EclipseMythology = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  const propType = useMemo(() => Math.random() > 0.5 ? 1 : 2, []);

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

      <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-16 py-20 md:py-24">
        {/* Micro label */}
        <SectionTitle
          index="03"
          label="L'Univers"
          labelEn="The Universe"
          isFr={isFr}
          align="center"
          className="mb-14"
        />

        {/* Hero Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-2xl md:text-4xl lg:text-5xl text-white font-light leading-[1.55] text-center mb-12"
        >
          {isFr
            ? propType === 1
              ? "Là où les civilisations se sont effacées, les mythes remontent — altérés — et, sous l’éclipse, le destin devient contrainte."
              : "Là où des civilisations se sont superposées jusqu’à s’effacer, les mythes remontent des couches mortes — altérés — et le destin devient une contrainte lente, presque organique."
            : propType === 1
              ? "Where civilizations have faded, myths resurface — altered — and under the eclipse’s gaze, fate turns into shackles."
              : "Where civilizations have piled atop each other into erasure, myths crawl back from the buried layers — altered — and fate turns into a slow, almost breathing leash."}
        </motion.blockquote>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
          className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#8B0000]/70 to-transparent mb-20 origin-center"
        />

        {/* Editorial description */}
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-inter text-base md:text-lg text-white/55 leading-[2.2] text-center"
          >
            {isFr
              ? "Sous les cieux, quelque chose dort qui n'aurait jamais dû prendre forme. Les montagnes ont la forme des côtes. Les rivières y battent comme un pouls, et les hommes, aveuglés par l'habitude, prient la lune sans savoir qu'elle leur répond — par bribes, par cauchemars, par cette fièvre silencieuse qui les pousse, la nuit, à creuser plus profond qu'ils ne devraient. Dehors, par-delà l'étendue noire où les astres eux-mêmes hésitent, une présence veille. Elle n'a pas de visage. Elle a une peur. Et tous les âges, quand la lumière faiblit et que l'œil du large se détourne, quelque chose d'immense tente de bouger. Un corps. Une cage. Une erreur. Ça n'a jamais suffi. Mais cette fois, tout au fond, sous les strates et les silences, un battement ralentit. Quelque chose s'achève. Et pour la première fois, ce n'est pas un dieu qui frappe les barreaux. C'est une ombre. Un presque-rien. Un enfant qui tombe du ciel."
              : "Under the heavens, something slumbers that should never have taken shape. The mountains are shaped like ribs. The rivers beat like a pulse, and men, blinded by habit, pray to the moon without knowing that it answers them — in fragments, in nightmares, in that silent fever that drives them, at night, to dig deeper than they should. Outside, beyond the black expanse where the stars themselves hesitate, a presence watches. It has no face. It has a fear. And in every age, when the light fades and the eye of the deep turns away, something immense tries to move. A body. A cage. A mistake. It was never enough. But this time, deep down, beneath the strata and the silences, a heartbeat slows. Something is ending. And for the first time, it is not a god striking the bars. It is a shadow. A near-nothing. A child falling from the sky."}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
