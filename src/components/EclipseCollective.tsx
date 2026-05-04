import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, Lock, Unlock } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { SECRET_CODE, FORMSPREE_ID, PRESS_KIT_URL } from "@/lib/constants";

const PROFILES = [
  { name: "Amir Dekik",    roleFr: "Directeur Créatif & Produit",   roleEn: "Creative & Product Director",    expertise: "Unreal Engine 5, Game Design, Product Strategy",   photo: "/assets/team/amir.jpg" },
  { name: "Alex",          roleFr: "Producteur & Lead Dev UE5",      roleEn: "Producer & Lead UE5 Developer",  expertise: "Unreal Engine 5, C++, Production Pipeline",         photo: "/assets/team/alex.jpg" },
  { name: "Walid",         roleFr: "Développeur UE5 / IA",           roleEn: "UE5 Developer / AI Specialist",  expertise: "Behavior Trees, AI Systems, UE5",                   photo: "/assets/team/walid.jpg" },
  { name: "Imad",          roleFr: "Développeur UE5 & Backend",      roleEn: "UE5 & Backend Developer",        expertise: "UE5 Blueprints, C++, Backend",                      photo: "/assets/team/imad.jpg" },
  { name: "Issam",         roleFr: "Développeur Outils & Gameplay",  roleEn: "Tools & Gameplay Developer",     expertise: "Python, UE5 Plugins, Gameplay Systems",             photo: "/assets/team/issam.jpg" },
  { name: "Anis",          roleFr: "Animateur Technique 3D",         roleEn: "3D Technical Animator",          expertise: "Rigging, Motion Capture, UE5 Mannequin",            photo: "/assets/team/anis.jpg" },
  { name: "Horia",         roleFr: "Directeur Artistique 3D",        roleEn: "3D Art Director",                expertise: "Substance Painter, ZBrush, Environment Art",        photo: "/assets/team/horia.jpg" },
  { name: "Nour",          roleFr: "Animateur 3D Personnages",       roleEn: "3D Character Animator",          expertise: "Blender, Character Animation, Keyframing",          photo: "/assets/team/nour.jpg" },
  { name: "Sief Eddine",   roleFr: "Directeur Artistique UI/UX",     roleEn: "UI/UX Art Director",             expertise: "Figma, React, Game HUD Design",                    photo: "/assets/team/sief.jpg" },
  { name: "Alili",         roleFr: "Concepteur Sonore",              roleEn: "Sound Designer",                 expertise: "Wwise, FMOD, Procedural Audio",                    photo: "/assets/team/alili.jpg" },
  { name: "Abou",          roleFr: "Artiste Conceptuel",             roleEn: "Concept Artist",                 expertise: "Procreate, Photoshop, World-Building",              photo: "/assets/team/abou.jpg" },
  { name: "Salah Eddine",  roleFr: "Designer Narratif",              roleEn: "Narrative Designer",             expertise: "Narrative Design, Twine, Scenario Writing",         photo: "/assets/team/salaheddine.jpg" },
];

const AccessModal = ({ isFr, onClose, onUnlock }: { isFr: boolean; onClose: () => void; onUnlock: () => void }) => {
  const [tab, setTab] = useState<"form" | "code">("form");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setStatus("loading");
    try {
      const r = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method: "POST", body: new FormData(e.currentTarget), headers: { Accept: "application/json" } });
      setStatus(r.ok ? "ok" : "err");
    } catch { setStatus("err"); }
  };

  const submitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === SECRET_CODE) { onUnlock(); onClose(); }
    else { setCodeErr(true); setTimeout(() => setCodeErr(false), 1400); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(14px)" }}
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }} onClick={e => e.stopPropagation()}
        className="w-full max-w-lg border border-white/[0.06] bg-[#080808] relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-white/20 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        <div className="p-10">
          <div className="w-10 h-10 border border-[#8B0000]/40 flex items-center justify-center mb-7"><Lock className="w-4 h-4 text-[#8B0000]/70" /></div>
          <h3 className="font-cinzel text-xl text-white mb-2">{isFr ? "Dossier Confidentiel" : "Confidential Dossier"}</h3>
          <p className="font-inter text-xs text-white/35 leading-relaxed mb-7">
            {isFr ? "Demandez l'accès ou entrez votre code de déverrouillage." : "Request access or enter your unlock code."}
          </p>
          {/* Tabs */}
          <div className="flex mb-7 border-b border-white/[0.05]">
            {(["form", "code"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 font-cinzel text-[9px] tracking-[0.2em] uppercase transition-colors ${tab === t ? "text-white border-b border-[#8B0000]" : "text-white/25 hover:text-white/50"}`}>
                {t === "form" ? (isFr ? "Demander l'accès" : "Request Access") : (isFr ? "Code d'accès" : "Access Code")}
              </button>
            ))}
          </div>
          {/* Form tab */}
          {tab === "form" && (status === "ok" ? (
            <div className="text-center py-3">
              <div className="w-6 h-px bg-[#8B0000]/60 mx-auto mb-5" />
              <p className="font-cinzel text-white mb-4">{isFr ? "Requête Enregistrée" : "Request Logged"}</p>
              <p className="font-inter text-xs text-white/45 leading-relaxed">
                {isFr
                  ? "Vous recevrez un email avec votre code d'accès, le Pitch Deck et le Press Kit sous 48h."
                  : "You will receive an email with your access code, Pitch Deck and Press Kit within 48h."}
              </p>
            </div>
          ) : (
            <form onSubmit={submitForm} className="space-y-3">
              <input type="hidden" name="_subject" value="Demande accès Dossier Eclipse" />
              <input type="hidden" name="_to" value="gameproject.eclipse@gmail.com" />
              <input type="text" name="name" required placeholder={isFr ? "Votre nom" : "Your name"}
                className="w-full bg-transparent border border-white/8 px-4 py-3 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#8B0000]/40 transition-colors" />
              <input type="email" name="email" required placeholder={isFr ? "votre@email.com" : "your@email.com"}
                className="w-full bg-transparent border border-white/8 px-4 py-3 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#8B0000]/40 transition-colors" />
              <textarea name="message" rows={2} placeholder={isFr ? "Motif (optionnel)" : "Reason (optional)"}
                className="w-full bg-transparent border border-white/8 px-4 py-3 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#8B0000]/40 transition-colors resize-none" />
              <button type="submit" disabled={status === "loading"}
                className="w-full py-3.5 bg-[#8B0000]/20 border border-[#8B0000]/40 font-cinzel text-xs tracking-[0.2em] uppercase text-white hover:bg-[#8B0000] hover:border-[#8B0000] transition-all duration-300 disabled:opacity-50">
                {status === "loading" ? "..." : (isFr ? "Envoyer" : "Send Request")}
              </button>
              {status === "err" && <p className="font-inter text-xs text-red-400/80 text-center">{isFr ? "Erreur. Réessayez." : "Error. Please retry."}</p>}
            </form>
          ))}
          {/* Code tab */}
          {tab === "code" && (
            <form onSubmit={submitCode} className="space-y-4">
              <p className="font-inter text-xs text-white/35 leading-relaxed">
                {isFr ? "Entrez le code reçu par email après validation." : "Enter the code received by email after approval."}
              </p>
              <input type="password" value={code} onChange={e => setCode(e.target.value)}
                placeholder="••••••••••"
                className={`w-full bg-transparent border px-4 py-3 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors tracking-[0.4em] ${codeErr ? "border-red-500/60" : "border-white/8 focus:border-[#8B0000]/40"}`} />
              {codeErr && <p className="font-inter text-xs text-red-400/80">{isFr ? "Code incorrect." : "Incorrect code."}</p>}
              <button type="submit" className="w-full py-3.5 border border-white/10 font-cinzel text-xs tracking-[0.2em] uppercase text-white hover:border-[#8B0000]/50 hover:bg-[#8B0000]/10 transition-all duration-300">
                {isFr ? "Déverrouiller" : "Unlock Profiles"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const EclipseCollective = () => {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className="relative bg-[#050505] py-28 border-t border-white/[0.03] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,0,0,0.04),transparent_55%)] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <SectionTitle
            index="06"
            label="Le Collectif"
            labelEn="The Collective"
            isFr={isFr}
            className="mb-6"
          />
          {unlocked && (
            <span className="flex items-center gap-1.5 font-inter text-[8px] uppercase text-[#8B0000] border border-[#8B0000]/30 px-2 py-1 w-fit">
              <Unlock className="w-2.5 h-2.5" />{isFr ? "Déverrouillé" : "Unlocked"}
            </span>
          )}
          <p className="font-inter text-sm text-white/50 leading-[2] max-w-xl mt-6">
            {isFr ? "Unis par une vision radicale. Les identités restent sous embargo pour protéger la gestation créative." : "United by a radical vision. Identities remain under embargo to protect the creative process."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16">
          {PROFILES.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group border border-white/[0.04] bg-black/40 hover:border-white/10 transition-all duration-400 overflow-hidden">
              {unlocked ? (
                <>
                  <div className="aspect-square bg-[#0f0f0f] relative overflow-hidden">
                    <img src={m.photo} alt={m.name} loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-cinzel text-sm text-white mb-1">{m.name}</h4>
                    <p className="font-inter text-[8px] text-[#8B0000]/80 tracking-wider uppercase mb-2">{isFr ? m.roleFr : m.roleEn}</p>
                    <p className="font-inter text-[9px] text-white/35 leading-relaxed">{m.expertise}</p>
                  </div>
                </>
              ) : (
                <div className="p-5">
                  <span className="font-inter text-[7px] tracking-[0.25em] text-[#8B0000]/50 group-hover:text-[#8B0000]/80 transition-colors block mb-3">OP_{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-cinzel text-xs md:text-sm text-white/60 group-hover:text-white/90 transition-colors leading-snug">{isFr ? m.roleFr : m.roleEn}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {!unlocked && (
          <motion.button initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onClick={() => setOpen(true)}
            className="group font-cinzel text-[11px] tracking-[0.25em] uppercase px-10 py-5 border border-white/10 text-white/60 hover:border-[#8B0000]/60 hover:text-white hover:bg-[#8B0000]/8 transition-all duration-400 flex items-center gap-4">
            <Lock className="w-3.5 h-3.5 text-white/30 group-hover:text-[#8B0000]/70 transition-colors" />
            {isFr ? "Inscrivez-vous pour découvrir l'équipe en détail" : "Register to Discover the Full Team"}
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {open && <AccessModal isFr={isFr} onClose={() => setOpen(false)} onUnlock={() => setUnlocked(true)} />}
      </AnimatePresence>
    </section>
  );
};
