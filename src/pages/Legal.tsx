import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const Legal = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  useSEO({
    title: isFr ? "Mentions Légales — Eclipse" : "Legal Notice — Eclipse",
    description: isFr ? "Mentions légales et conditions d'utilisation du projet Eclipse." : "Legal notice and terms of use for the Eclipse project.",
    path: "/legal",
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#8B0000]/40 font-inter py-24 px-6 md:px-16 lg:px-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8B0000]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link 
          to="/eclipse" 
          className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 font-cinzel text-xs tracking-widest uppercase mb-16 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {isFr ? "Retour" : "Return"}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white tracking-widest uppercase mb-6 drop-shadow-[0_0_15px_rgba(139,0,0,0.3)]">
            {isFr ? "Mentions Légales" : "Legal Notice"}
          </h1>
          <p className="text-[#8B0000] font-cinzel tracking-widest uppercase text-xs md:text-sm mb-16">
            {isFr ? "Dernière mise à jour : Mai 2026" : "Last updated: May 2026"}
          </p>

          <div className="space-y-12 text-sm md:text-base text-white/70 leading-[1.8]">
            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "1. Éditeur du Site" : "1. Publisher"}
              </h2>
              <p>
                {isFr ? "Le présent site (le \"Site\") est édité par " : "This website (the \"Site\") is published by "}
                <strong className="text-white">Chroma Studio</strong>
                {isFr ? ", entité créatrice du projet Eclipse." : ", the creative entity behind the Eclipse project."}
              </p>
              <p>
                <strong>{isFr ? "Directeur de la publication :" : "Director of Publication:"}</strong> Amir Dekik<br/>
                <strong>{isFr ? "Contact :" : "Contact:"}</strong> gameproject.eclipse@gmail.com
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "2. Hébergement" : "2. Hosting"}
              </h2>
              <p>
                {isFr 
                  ? "Ce site est hébergé par Octenium."
                  : "This website is hosted by Octenium."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "3. Propriété Intellectuelle" : "3. Intellectual Property"}
              </h2>
              <p>
                {isFr 
                  ? "L'intégralité de ce site, incluant mais ne se limitant pas aux textes, logos, éléments graphiques, concepts de jeu, mécaniques, univers (Cosmico-Fantasy, Extraction, Mutation, Résonance), noms, vidéos et illustrations, constitue une œuvre protégée par les lois internationales sur la propriété intellectuelle."
                  : "The entirety of this site, including but not limited to texts, logos, graphics, game concepts, mechanics, universe (Cosmi-Fantasy, Extraction, Mutation, Resonance), names, videos, and illustrations, constitutes a work protected by international intellectual property laws."}
              </p>
              <p>
                {isFr
                  ? "Chroma Studio et l'équipe d'Eclipse sont les détenteurs exclusifs de ces droits. Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est strictement interdite sans l'autorisation écrite préalable de Chroma Studio."
                  : "Chroma Studio and the Eclipse team are the exclusive holders of these rights. Any reproduction, representation, modification, publication, transmission, or distortion, in whole or in part, of the site or its content, by any process whatsoever, and on any medium whatsoever, is strictly prohibited without the prior written consent of Chroma Studio."}
              </p>
              <p className="text-[#8B0000] border-l-2 border-[#8B0000] pl-4 italic">
                {isFr
                  ? "Le vol de propriété intellectuelle (plagiat de concepts de jeu, d'univers ou de game design) entraînera des poursuites judiciaires immédiates devant les juridictions compétentes."
                  : "The theft of intellectual property (plagiarism of game concepts, universe, or game design) will result in immediate legal action before the competent courts."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "4. Limitation de Responsabilité" : "4. Limitation of Liability"}
              </h2>
              <p>
                {isFr
                  ? "Chroma Studio s'efforce de fournir des informations aussi précises que possible sur ce site. Toutefois, le projet Eclipse étant en développement, les informations (textes, images, roadmaps) sont sujettes à modification sans préavis et ne sauraient engager contractuellement le studio."
                  : "Chroma Studio strives to provide information as precisely as possible on this site. However, since the Eclipse project is currently in development, the information (texts, images, roadmaps) is subject to change without notice and cannot contractually bind the studio."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "5. Droit Applicable" : "5. Governing Law"}
              </h2>
              <p>
                {isFr
                  ? "Les présentes mentions légales sont régies par le droit français et les normes internationales. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents seront saisis."
                  : "These legal notices are governed by French law and international standards. In the event of a dispute, and failing an amicable resolution, the competent courts shall be seized."}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;
