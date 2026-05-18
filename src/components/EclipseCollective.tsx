import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, Lock, Unlock } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { SECRET_CODE, FORMSPREE_ID, PRESS_KIT_URL } from "@/lib/constants";

const PROFILES = [
  { name: "Expert 01", roleFr: "DIRECTEUR DU PROJET", roleEn: "PROJECT DIRECTOR", expertise: "Direction Artistique, Vision Produit, Game Design", photo: "/assets/eclipse/team/amir.webp" },
  { name: "Expert 02", roleFr: "LEAD SCÉNARISTE / NARRATIVE DIRECTOR", roleEn: "LEAD WRITER / NARRATIVE DIRECTOR", expertise: "Scénarisation, World Building, Lore Design", photo: "/assets/eclipse/team/alex.webp" },
  { name: "Expert 03", roleFr: "CHARACTER ANIMATOR 3D", roleEn: "3D CHARACTER ANIMATOR", expertise: "Rigging, Keyframe Animation, Motion Capture", photo: "/assets/eclipse/team/salaheddine.webp" },
  { name: "Expert 04", roleFr: "LEAD UNREAL ENGINE DEVELOPER", roleEn: "LEAD UNREAL ENGINE DEVELOPER", expertise: "Architecture C++, Blueprints, UE5 Optimization", photo: "/assets/eclipse/team/walid.webp" },
  { name: "Expert 05", roleFr: "3D ENVIRONMENT ARTIST", roleEn: "3D ENVIRONMENT ARTIST", expertise: "Environment Art, Level Design, Lighting", photo: "/assets/eclipse/team/imad.webp" },
  { name: "Expert 06", roleFr: "SCÉNARISTE / NARRATIVE DESIGNER", roleEn: "WRITER / NARRATIVE DESIGNER", expertise: "Narration Interactive, Dialogues, Quêtes", photo: "/assets/eclipse/team/horia.webp" },
  { name: "Expert 07", roleFr: "LEAD 3D ARTIST", roleEn: "LEAD 3D ARTIST", expertise: "High Poly Modeling, Texturing, PBR Workflow", photo: "/assets/eclipse/team/issam.webp" },
  { name: "Expert 08", roleFr: "WEB DEVELOPER & CREATIVE ASSOCIATE", roleEn: "WEB DEVELOPER & CREATIVE ASSOCIATE", expertise: "Frontend Development, Creative Strategy, UX", photo: "/assets/eclipse/team/anis.webp" },
  { name: "Expert 09", roleFr: "CONCEPT ARTIST", roleEn: "CONCEPT ARTIST", expertise: "Visual Development, Illustration, Character Design", photo: "/assets/eclipse/team/nour.webp" },
  { name: "Expert 10", roleFr: "3D ARTIST", roleEn: "3D ARTIST", expertise: "Modeling, Prop Design, Optimization", photo: "/assets/eclipse/team/sief.webp" },
  { name: "Expert 11", roleFr: "UNREAL ENGINE DEVELOPER & TOOLS DEVELOPER", roleEn: "UNREAL ENGINE DEVELOPER & TOOLS DEVELOPER", expertise: "C++, Pipeline Tools, Shader Development", photo: "/assets/eclipse/team/alili.webp" },
  { name: "Expert 12", roleFr: "3D & TEXTURE ARTIST", roleEn: "3D & TEXTURE ARTIST", expertise: "Substance Painter, Texturing, Assets", photo: "/assets/eclipse/team/abou.webp" },
];

const AccessModal = ({ isFr, onClose, onUnlock }: { isFr: boolean; onClose: () => void; onUnlock: () => void }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const [tab, setTab] = useState<"form" | "code">("form");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState(false);

  const t = (() => {
    switch (lang) {
      case "zh":
        return {
          title: "机密档案",
          desc: "申请访问权限或输入解锁代码。",
          tabForm: "申请权限",
          tabCode: "访问代码",
          okTitle: "申请已记录",
          okDesc: "我们将在 48 小时内通过电子邮件向您发送访问代码、项目宣讲书（Pitch Deck）与媒体包（Press Kit）。",
          name: "您的姓名",
          email: "您的邮箱地址",
          reason: "申请理由（选填）",
          send: "提交申请",
          error: "发生错误。请重试。",
          codeHelp: "请输入审核通过后通过电子邮件收到的代码。",
          codeErr: "代码错误。",
          unlock: "解锁档案",
          close: "关闭"
        };
      case "ja":
        return {
          title: "機密デシエ",
          desc: "アクセスを申請するか、ロック解除コードを入力してください。",
          tabForm: "アクセス申請",
          tabCode: "アクセスコード",
          okTitle: "申請を受理しました",
          okDesc: "48時間以内にアクセスコード、ピッチデック、プレスキットをメールにてお送りいたします。",
          name: "お名前",
          email: "メールアドレス",
          reason: "申請理由（任意）",
          send: "申請を送信",
          error: "エラーが発生しました。再試行してください。",
          codeHelp: "承認後にメールで届いたコードを入力してください。",
          codeErr: "コードが正しくありません。",
          unlock: "ロック解除",
          close: "閉じる"
        };
      case "fr":
        return {
          title: "Dossier Confidentiel",
          desc: "Demandez l'accès ou entrez votre code de déverrouillage.",
          tabForm: "Demander l'accès",
          tabCode: "Code d'accès",
          okTitle: "Requête Enregistrée",
          okDesc: "Vous recevrez un email avec votre code d'accès, le Pitch Deck et le Press Kit sous 48h.",
          name: "Votre nom",
          email: "votre@email.com",
          reason: "Motif (optionnel)",
          send: "Envoyer",
          error: "Erreur. Réessayez.",
          codeHelp: "Entrez le code reçu par email après validation.",
          codeErr: "Code incorrect.",
          unlock: "Déverrouiller",
          close: "Fermer"
        };
      default:
        return {
          title: "Confidential Dossier",
          desc: "Request access or enter your unlock code.",
          tabForm: "Request Access",
          tabCode: "Access Code",
          okTitle: "Request Logged",
          okDesc: "You will receive an email with your access code, Pitch Deck and Press Kit within 48h.",
          name: "Your name",
          email: "your@email.com",
          reason: "Reason (optional)",
          send: "Send Request",
          error: "Error. Please retry.",
          codeHelp: "Enter the code received by email after approval.",
          codeErr: "Incorrect code.",
          unlock: "Unlock Profiles",
          close: "Close"
        };
    }
  })();

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
        <button onClick={onClose} aria-label={t.close} title={t.close} className="absolute top-5 right-5 text-white/20 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        <div className="p-10">
          <div className="w-10 h-10 border border-[#8B0000]/40 flex items-center justify-center mb-7"><Lock className="w-4 h-4 text-[#8B0000]/70" /></div>
          <h3 className="font-cinzel text-xl text-white mb-2">{t.title}</h3>
          <p className="font-inter text-sm md:text-base text-white/35 leading-relaxed mb-7">
            {t.desc}
          </p>
          {/* Tabs */}
          <div className="flex mb-7 border-b border-white/[0.05]">
            {(["form", "code"] as const).map(tabName => (
              <button key={tabName} onClick={() => setTab(tabName)}
                className={`flex-1 py-2.5 font-cinzel text-[9px] tracking-[0.2em] uppercase transition-colors ${tab === tabName ? "text-white border-b border-[#8B0000]" : "text-white/25 hover:text-white/50"}`}>
                {tabName === "form" ? t.tabForm : t.tabCode}
              </button>
            ))}
          </div>
          {/* Form tab */}
          {tab === "form" && (status === "ok" ? (
            <div className="text-center py-3">
              <div className="w-6 h-px bg-[#8B0000]/60 mx-auto mb-5" />
              <p className="font-cinzel text-white mb-4">{t.okTitle}</p>
              <p className="font-inter text-sm md:text-base text-white/45 leading-relaxed">
                {t.okDesc}
              </p>
            </div>
          ) : (
            <form onSubmit={submitForm} className="space-y-3">
              <input type="hidden" name="_subject" value="Demande accès Dossier Eclipse" />
              <input type="hidden" name="_to" value="gameproject.eclipse@gmail.com" />
              <input type="text" name="name" required placeholder={t.name}
                className="w-full bg-transparent border border-white/8 px-4 py-3 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#8B0000]/40 transition-colors" />
              <input type="email" name="email" required placeholder={t.email}
                className="w-full bg-transparent border border-white/8 px-4 py-3 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#8B0000]/40 transition-colors" />
              <textarea name="message" rows={2} placeholder={t.reason}
                className="w-full bg-transparent border border-white/8 px-4 py-3 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#8B0000]/40 transition-colors resize-none" />
              <button type="submit" disabled={status === "loading"}
                className="w-full py-3.5 bg-[#8B0000]/20 border border-[#8B0000]/40 font-cinzel text-xs tracking-[0.2em] uppercase text-white hover:bg-[#8B0000] hover:border-[#8B0000] transition-all duration-300 disabled:opacity-50">
                {status === "loading" ? "..." : t.send}
              </button>
              {status === "err" && <p className="font-inter text-xs text-red-400/80 text-center">{t.error}</p>}
            </form>
          ))}
          {/* Code tab */}
          {tab === "code" && (
            <form onSubmit={submitCode} className="space-y-4">
              <p className="font-inter text-sm md:text-base text-white/35 leading-relaxed">
                {t.codeHelp}
              </p>
              <input type="password" value={code} onChange={e => setCode(e.target.value)}
                placeholder="••••••••••"
                className={`w-full bg-transparent border px-4 py-3 font-inter text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors tracking-[0.4em] ${codeErr ? "border-red-500/60" : "border-white/8 focus:border-[#8B0000]/40"}`} />
              {codeErr && <p className="font-inter text-xs text-red-400/80">{t.codeErr}</p>}
              <button type="submit" className="w-full py-3.5 border border-white/10 font-cinzel text-xs tracking-[0.2em] uppercase text-white hover:border-[#8B0000]/50 hover:bg-[#8B0000]/10 transition-all duration-300">
                {t.unlock}
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
  const lang = i18n.language || "en";
  const isFr = lang === "fr";
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const mainText = (() => {
    switch (lang) {
      case "zh":
        return {
          unlocked: "已解锁",
          desc: "共同的愿景将我们连结。群星隐藏其真名，只为让创意的萌芽于无形中孕育。",
          register: "申请访问权限以了解团队详情"
        };
      case "ja":
        return {
          unlocked: "ロック解除済",
          desc: "同じビジョンによって結ばれた絆。創造的な対話を育むため、私たちの正体はまだベールに包まれています。",
          register: "チームの全容を知るために申請する"
        };
      case "fr":
        return {
          unlocked: "Déverrouillé",
          desc: "Unis par la même vision. Les identités demeurent voilées pour préserver la gestation créative.",
          register: "Inscrivez-vous pour découvrir l'équipe en détail"
        };
      default:
        return {
          unlocked: "Unlocked",
          desc: "One vision, many veiled selves. The unknown between us is the womb of making.",
          register: "Register to Discover the Full Team"
        };
    }
  })();

  const translatedProfiles = PROFILES.map((m, i) => {
    let role = m.roleEn;
    let expertise = m.expertise;

    if (lang === "fr") {
      role = m.roleFr;
    } else if (lang === "zh") {
      role = (() => {
        switch (i) {
          case 0: return "项目制作人";
          case 1: return "主编剧 / 叙事总监";
          case 2: return "3D 角色动画师";
          case 3: return "虚幻引擎主程序";
          case 4: return "3D 场景美术师";
          case 5: return "编剧 / 关卡叙事";
          case 6: return "三维美术主管";
          case 7: return "前端开发 / 创意指导";
          case 8: return "角色概念设计";
          case 9: return "三维建模师";
          case 10: return "虚幻引擎工具链开发";
          case 11: return "场景材质美术师";
          default: return m.roleEn;
        }
      })();
      expertise = (() => {
        switch (i) {
          case 0: return "艺术指导, 产品愿景, 游戏设计";
          case 1: return "编剧, 世界观构建, 传说设计";
          case 2: return "骨骼绑定, 关键帧动画, 动作捕捉";
          case 3: return "C++架构, 蓝图, UE5性能优化";
          case 4: return "环境美术, 关卡设计, 光照设计";
          case 5: return "交互式叙事, 对话设计, 任务设计";
          case 6: return "高精度建模, 材质贴图, PBR工作流";
          case 7: return "前端开发, 创意策略, 用户体验";
          case 8: return "视觉开发, 原画插画, 角色设计";
          case 9: return "三维建模, 道具设计, 资产优化";
          case 10: return "C++, 工具链管线开发, 着色器编写";
          case 11: return "Substance Painter, 材质贴图, 场景资产";
          default: return m.expertise;
        }
      })();
    } else if (lang === "ja") {
      role = (() => {
        switch (i) {
          case 0: return "プロジェクトディレクター";
          case 1: return "リードシナリオライター / ナラティブディレクター";
          case 2: return "3Dキャラクターアニメーター";
          case 3: return "リードUnreal Engineデベロッパー";
          case 4: return "3D環境アートデザイナー";
          case 5: return "シナリオライター / ナラティブデザイナー";
          case 6: return "リード3Dアーティスト";
          case 7: return "ウェブ開発者 / クリエイティブアソシエイト";
          case 8: return "コンセプトアーティスト";
          case 9: return "3Dアーティスト";
          case 10: return "UE開発 & ツールデベロッパー";
          case 11: return "3D & テクスチャアーティスト";
          default: return m.roleEn;
        }
      })();
      expertise = (() => {
        switch (i) {
          case 0: return "美術監督, プロダクトビジョン, ゲームデザイン";
          case 1: return "シナリオ, 世界観構築, 設定デザイン";
          case 2: return "リギング, キーフレームアニメーション, モーションキャプチャ";
          case 3: return "C++設計, ブループリント, UE5最適化";
          case 4: return "環境アート, レベルデザイン, ライティング";
          case 5: return "インタラクティブストーリー, 対話, クエスト";
          case 6: return "ハイポリモデリング, テクスチャリング, PBRワークフロー";
          case 7: return "フロントエンド開発, クリエイティブ戦略, UX";
          case 8: return "ビジュアルデベロップメント, イラスト, キャラクターデザイン";
          case 9: return "モデリング, プロップデザイン, 最適化";
          case 10: return "C++, パイプラインツール, シェーダー開発";
          case 11: return "Substance Painter, テクスチャリング, アセット";
          default: return m.expertise;
        }
      })();
    }

    return { ...m, role, expertise };
  });

  return (
    <section className="relative bg-black py-28 border-t border-white/[0.03] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <img src="/assets/eclipse/sections/team.jpg" alt="Team Background" className="w-full h-full object-cover" />
      </div>
      {/* Transition Gradients */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,0,0,0.04),transparent_55%)] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <SectionTitle
            index="08"
            label="Le Collectif"
            labelEn="The Collective"
            isFr={isFr}
            className="mb-6"
          />
          {unlocked && (
            <span className="flex items-center gap-1.5 font-inter text-xs uppercase text-[#8B0000] border border-[#8B0000]/30 px-2 py-1 w-fit">
              <Unlock className="w-2.5 h-2.5" />{mainText.unlocked}
            </span>
          )}
          <p className="font-inter text-base md:text-lg text-white/50 leading-[2] max-w-xl mt-6">
            {mainText.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16">
          {translatedProfiles.map((m, i) => (
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
                    <h4 className="font-cinzel text-sm md:text-base text-white mb-1">{m.name}</h4>
                    <p className="font-inter text-[10px] md:text-xs text-[#8B0000]/80 tracking-wider uppercase mb-2">{m.role}</p>
                    <p className="font-inter text-xs md:text-sm text-white/35 leading-relaxed">{m.expertise}</p>
                  </div>
                </>
              ) : (
                <div className="p-5">
                  <span className="font-inter text-[9px] md:text-[10px] tracking-[0.25em] text-[#8B0000]/50 group-hover:text-[#8B0000]/80 transition-colors block mb-3">OP_{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-cinzel text-sm md:text-base text-white/60 group-hover:text-white/90 transition-colors leading-snug">{m.role}</span>
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
            {mainText.register}
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {open && <AccessModal isFr={isFr} onClose={() => setOpen(false)} onUnlock={() => setUnlocked(true)} />}
      </AnimatePresence>
    </section>
  );
};
