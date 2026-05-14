import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, ArrowRight } from "lucide-react";
import { LINKS } from "@/lib/constants";

const DiscordIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.086.12 18.113.14 18.13a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

export const EclipseContact = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";

  return (
    <footer className="relative bg-black pt-32 pb-12 overflow-hidden border-t border-[#8B0000]/20">
      {/* Intense Red Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] max-w-5xl h-px bg-gradient-to-r from-transparent via-[#8B0000]/80 to-transparent shadow-[0_0_20px_rgba(139,0,0,0.8)]" />
      {/* Background red radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,0,0,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Wishlist CTA — massive ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }} className="text-center mb-32 relative py-20 overflow-hidden border border-[#8B0000]/10 bg-black/40">
          
          {/* Background Image for this specific CTA */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
            <img src="/assets/eclipse/sections/Rejoignez le Cycle.jpg" alt="Join the Cycle Background" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8B0000]/15 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-px h-20 bg-gradient-to-b from-[#8B0000] to-transparent mx-auto mb-10" />
            <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-white tracking-widest uppercase mb-12 drop-shadow-[0_0_15px_rgba(139,0,0,0.3)] px-4">
              {isFr ? "Rejoignez le Cycle" : "Join the Cycle"}
            </h2>
            {/* Main Community CTA */}
            <a
              href={LINKS.eclipseDiscord}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex px-14 py-5 bg-white text-black font-cinzel text-sm tracking-[0.2em] uppercase overflow-hidden mt-4"
            >
              <span className="absolute inset-0 bg-[#8B0000] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-200">
                <DiscordIcon />
                {isFr ? "Rejoindre le Discord" : "Join Discord"}
              </span>
            </a>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 pb-16 border-b border-[#8B0000]/20">

          {/* Chroma Bridge */}
          <div className="md:pr-12 md:border-r border-[#8B0000]/20 flex flex-col items-start bg-[#8B0000]/[0.02] p-8 md:p-0 md:bg-transparent border border-[#8B0000]/10 md:border-transparent">
            <h3 className="font-cinzel text-xl text-white mb-2">Chroma Studio</h3>
            <div className="w-8 h-px bg-[#8B0000] mb-6" />
            <p className="font-inter text-xs md:text-sm text-white/50 leading-[2] mb-8">
              {isFr ? "Pour toute demande de presse ou opportunité d'investissement, veuillez télécharger notre kit officiel et nous contacter directement." : "For press inquiries or investment opportunities, please download our official kit and reach out to us directly."}
            </p>
            <a href={LINKS.chromaPage}
              className="inline-flex items-center gap-3 text-[#8B0000] hover:text-white transition-colors duration-300 group mt-auto">
              <span className="w-6 h-px bg-[#8B0000] group-hover:bg-white transition-colors" />
              <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase font-bold">
                {isFr ? "Découvrir Chroma" : "Discover Chroma"}
              </span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Contact Lead */}
          <div className="md:px-12 md:border-r border-[#8B0000]/20 flex flex-col items-start bg-[#8B0000]/[0.02] p-8 md:p-0 md:bg-transparent border border-[#8B0000]/10 md:border-transparent">
            <h4 className="font-cinzel text-xl text-white mb-2">Amir Dekik</h4>
            <p className="font-inter text-[10px] md:text-xs text-white/30 uppercase tracking-[0.2em] mb-4">
              {isFr ? "DIRECTEUR DU PROJET" : "PROJECT DIRECTOR"}
            </p>
            <a href="mailto:gameproject.eclipse@gmail.com"
              className="font-inter text-sm md:text-base text-white/50 hover:text-white transition-colors block mb-8 underline underline-offset-4 decoration-[#8B0000]/30 hover:decoration-[#8B0000]">
              gameproject.eclipse@gmail.com
            </a>
            <div className="mt-auto w-full">
              <div className="inline-flex w-full items-center justify-between px-5 py-3 border border-[#8B0000]/30 text-[#8B0000] font-cinzel text-[10px] tracking-[0.1em] uppercase cursor-not-allowed bg-black/60 shadow-[inset_0_0_20px_rgba(139,0,0,0.1)]">
                <span className="flex items-center gap-3 font-bold">
                  {isFr ? "Wishlist Steam" : "Steam Wishlist"}
                </span>
                <span className="font-inter text-[8px] bg-[#8B0000]/20 px-2 py-1 text-white tracking-widest border border-[#8B0000]/30">
                  {isFr ? "Bientôt Disponible" : "Coming Soon"}
                </span>
              </div>
            </div>
          </div>

          {/* Eclipse-only socials */}
          <div className="md:pl-12 flex flex-col items-start bg-[#8B0000]/[0.02] p-8 md:p-0 md:bg-transparent border border-[#8B0000]/10 md:border-transparent">
            <h4 className="font-inter text-[9px] tracking-[0.35em] uppercase text-[#8B0000] mb-6">
              {isFr ? "Réseaux Eclipse" : "Eclipse Networks"}
            </h4>
            <div className="space-y-6 w-full">
              <a href={LINKS.eclipseInstagram} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 font-inter text-sm text-white/50 hover:text-white transition-colors group p-3 bg-white/[0.02] hover:bg-[#8B0000]/10 border border-white/5 hover:border-[#8B0000]/30 rounded-sm">
                <Instagram className="w-4 h-4 group-hover:text-white transition-colors text-[#8B0000]" />
                @eclipse.game.project
              </a>
              <a href={LINKS.eclipseLinkedIn} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 font-inter text-sm text-white/50 hover:text-white transition-colors group p-3 bg-white/[0.02] hover:bg-[#8B0000]/10 border border-white/5 hover:border-[#8B0000]/30 rounded-sm">
                <Linkedin className="w-4 h-4 group-hover:text-white transition-colors text-[#8B0000]" />
                Eclipse — Showcase
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img src="/assets/eclipse/logos/logo.svg" alt="Eclipse Logo" className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity" />
            <p className="font-inter text-[10px] text-white/18 tracking-widest">
              © {new Date().getFullYear()} Chroma Studio · All rights reserved
            </p>
          </div>
          <div className="flex gap-6">
            <Link to="/legal" className="font-inter text-[10px] text-white/18 hover:text-white/50 transition-colors uppercase tracking-wider">
              {isFr ? "Mentions Légales" : "Legal"}
            </Link>
            <Link to="/privacy" className="font-inter text-[10px] text-white/18 hover:text-white/50 transition-colors uppercase tracking-wider">
              {isFr ? "Confidentialité" : "Privacy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
