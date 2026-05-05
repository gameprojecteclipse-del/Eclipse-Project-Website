import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const Privacy = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  useSEO({
    title: isFr ? "Confidentialité — Eclipse" : "Privacy Policy — Eclipse",
    description: isFr ? "Politique de confidentialité et gestion des données personnelles du projet Eclipse." : "Privacy policy and personal data management for the Eclipse project.",
    path: "/privacy",
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
            {isFr ? "Politique de Confidentialité" : "Privacy Policy"}
          </h1>
          <p className="text-[#8B0000] font-cinzel tracking-widest uppercase text-xs md:text-sm mb-16">
            {isFr ? "Dernière mise à jour : Mai 2026" : "Last updated: May 2026"}
          </p>

          <div className="space-y-12 text-sm md:text-base text-white/70 leading-[1.8]">
            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "1. Protection des Données" : "1. Data Protection"}
              </h2>
              <p>
                {isFr 
                  ? "Chroma Studio s'engage fermement à préserver la confidentialité de tous les visiteurs du projet Eclipse. Notre site est conçu avant tout comme une vitrine immersive."
                  : "Chroma Studio is firmly committed to preserving the privacy of all visitors to the Eclipse project. Our site is designed primarily as an immersive showcase."}
              </p>
              <p>
                {isFr
                  ? "Nous garantissons qu'aucune donnée personnelle n'est exploitée à des fins de profilage publicitaire ou revendue à des tiers. Les éventuelles informations de navigation traitées le sont de manière anonyme et ont pour unique but de garantir la compatibilité technique et la fluidité de nos animations visuelles."
                  : "We guarantee that no personal data is exploited for advertising profiling or sold to third parties. Any navigation information processed is done so anonymously and solely to ensure technical compatibility and the fluidity of our visual animations."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "2. Cookies et Technologies Similaires" : "2. Cookies and Similar Technologies"}
              </h2>
              <p>
                {isFr
                  ? "L'utilisation des cookies sur cette plateforme est restreinte au strict minimum technique. Nous privilégions une expérience transparente, sans traceurs intrusifs."
                  : "The use of cookies on this platform is restricted to the strict technical minimum. We prioritize a transparent experience, without intrusive trackers."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "3. Sécurité" : "3. Security"}
              </h2>
              <p>
                {isFr
                  ? "Notre infrastructure repose sur des standards de sécurité de haut niveau pour protéger l'intégrité du site et garantir une navigation sécurisée à tous les utilisateurs explorant l'univers d'Eclipse."
                  : "Our infrastructure relies on high-level security standards to protect the integrity of the site and ensure secure browsing for all users exploring the Eclipse universe."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-cinzel text-2xl text-white tracking-wider border-b border-[#8B0000]/30 pb-3">
                {isFr ? "4. Contact" : "4. Contact"}
              </h2>
              <p>
                {isFr
                  ? "Pour toute question relative à notre politique de confidentialité, vous pouvez joindre l'équipe à l'adresse suivante :"
                  : "For any questions regarding our privacy policy, you can reach the team at the following address:"}
              </p>
              <p className="text-white font-bold">gameproject.eclipse@gmail.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
