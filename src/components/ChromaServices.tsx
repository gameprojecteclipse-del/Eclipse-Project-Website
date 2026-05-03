import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Paintbrush, Code2, MonitorSmartphone, Target } from "lucide-react";

const SERVICES = [
  {
    icon: Paintbrush,
    key_title: "chroma.services_1_title",
    key_desc: "chroma.services_1_desc",
    index: "01",
  },
  {
    icon: Code2,
    key_title: "chroma.services_2_title",
    key_desc: "chroma.services_2_desc",
    index: "02",
  },
  {
    icon: MonitorSmartphone,
    key_title: "chroma.services_3_title",
    key_desc: "chroma.services_3_desc",
    index: "03",
  },
  {
    icon: Target,
    key_title: "chroma.services_4_title",
    key_desc: "chroma.services_4_desc",
    index: "04",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const ChromaServices = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#f8f8f8] text-[#1a1a1a] py-28 md:py-40 relative selection:bg-[#1a1a1a] selection:text-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-4 mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#1a1a1a]/40">
            {t("chroma.services_title")}
          </span>
          <span className="text-xs text-[#1a1a1a]/25 tracking-widest">4 POLES</span>
        </motion.div>

        {/* 2x2 Grid for services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[#1a1a1a]/10"
        >
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            const isTopRow = idx < 2;
            const isLeftCol = idx % 2 === 0;

            return (
              <motion.div
                key={s.index}
                variants={itemVariants}
                whileHover="hover"
                className={`relative group flex flex-col justify-between pt-12 pb-20 px-8 md:px-12 transition-all duration-700 overflow-hidden cursor-default
                  ${!isTopRow ? "border-t border-[#1a1a1a]/10" : ""}
                  ${!isLeftCol ? "md:border-l md:border-[#1a1a1a]/10" : ""}
                `}
              >
                {/* Organic Hover Background Expansion */}
                <motion.div
                  variants={{
                    hover: { scale: 1, opacity: 1, borderRadius: "0%" },
                  }}
                  initial={{ scale: 0.8, opacity: 0, borderRadius: "50%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-[#f0f0f0] origin-center z-0"
                />

                <div className="relative z-10 flex items-start justify-between mb-24 overflow-hidden">
                  <motion.span 
                    variants={{ hover: { y: -5, opacity: 0.6 } }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-xs text-[#1a1a1a]/25 font-medium tracking-widest"
                  >
                    {s.index}
                  </motion.span>
                  <motion.div
                    variants={{
                      hover: { rotate: 15, scale: 1.1, color: "#1a1a1a" }
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-[#1a1a1a]/20"
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </motion.div>
                </div>

                <div className="relative z-10">
                  <motion.h3 
                    variants={{
                      hover: { x: 10 }
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-5xl font-medium tracking-tight leading-tight text-[#1a1a1a] mb-4"
                  >
                    {t(s.key_title)}
                  </motion.h3>
                  <motion.p 
                    variants={{
                      hover: { x: 10, color: "rgba(26,26,26,0.7)" }
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    className="text-lg md:text-xl font-light tracking-tight leading-relaxed text-[#1a1a1a]/40"
                  >
                    {t(s.key_desc)}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
