import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./SectionTitle";

const STEPS = [
  {
    phase: "I",
    titleFr: "Fondation Créative",       titleEn: "Creative Foundation",
    statusFr: "Terminé",                 statusEn: "Completed",
    done: true,
    detailFr: "Dossier de Jeu (JDD) de 80+ pages finalisé. Scénario principal et dialogue du Tome 1 rédigés. Direction artistique complète définie — références visuelles, palette chromatique, architecture de jeu. Prototypes papier validés en équipe.",
    detailEn: "80+ page Game Design Document finalized. Tome 1 main scenario and dialogue written. Complete art direction defined — visual references, color palette, game architecture. Paper prototypes team-validated.",
  },
  {
    phase: "II",
    titleFr: "Incubation Technique",     titleEn: "Technical Incubation",
    statusFr: "Terminé",                 statusEn: "Completed",
    done: true,
    detailFr: "Unreal Engine 5 sélectionné et configuré. Pipeline d'assets (Blender → UE5) établi. Blockout des niveaux initiaux. Système d'animation Metahuman intégré. Pré-production technique achevée à 100%.",
    detailEn: "Unreal Engine 5 selected and configured. Asset pipeline (Blender → UE5) established. Initial level blockout. Metahuman animation system integrated. Technical pre-production 100% complete.",
  },
  {
    phase: "III",
    titleFr: "Intégration Mawahub",      titleEn: "Mawahub Integration",
    statusFr: "En Cours",                statusEn: "In Progress",
    active: true,
    detailFr: "Acceptation officielle dans l'incubateur Mawahub 2026. Équipes spécialisées assemblées (12 membres). Début du développement de la tranche verticale. Accès aux ressources et mentors de l'incubateur.",
    detailEn: "Official acceptance into Mawahub 2026 incubator. Specialized teams assembled (12 members). Vertical slice development initiated. Access to incubator resources and mentors.",
  },
  {
    phase: "IV",
    titleFr: "Tranche Verticale",        titleEn: "Vertical Slice",
    statusFr: "Planifié",                statusEn: "Planned",
    detailFr: "Finalisation d'un biome complet (Cité Abysse) avec combat fonctionnel, IA ennemie de base, systèmes d'Extraction et de Mutation opérationnels. Rendu visuel final de démonstration. Milestone critique pour les investisseurs.",
    detailEn: "Finalization of full biome (Abyss City) with functional combat, core enemy AI, Extraction and Mutation systems operational. Final visual demo render. Critical investor milestone.",
  },
  {
    phase: "V",
    titleFr: "Alpha Jouable",            titleEn: "Playable Alpha",
    statusFr: "Planifié",                statusEn: "Planned",
    detailFr: "Contenu complet du Tome 1 intégré. Début des tests internes et équilibrage des systèmes de corruption et de progression. Optimisation des performances UE5. Préparation du build de démonstration public.",
    detailEn: "Complete Tome 1 content integrated. Internal testing and balancing of corruption and progression systems begins. UE5 performance optimization. Public demo build preparation.",
  },
  {
    phase: "VI",
    titleFr: "Démo Publique — Q1 2027",  titleEn: "Public Demo — Q1 2027",
    statusFr: "Objectif Final",          statusEn: "Final Target",
    detailFr: "Lancement de la démo publique de 45 à 60 minutes sur PC (Steam). Phase de marketing intensif, campagne presse spécialisée, opération de Wishlist Steam. Préparation de la production du Tome 2 en parallèle.",
    detailEn: "Public 45–60 min demo launch on PC (Steam). Intensive marketing phase, specialist press campaign, Steam Wishlist operation. Parallel Tome 2 production preparation.",
  },
];

// Progress fill up to the active step (step 3 / 6 = 50%)
const PROGRESS_PCT = `${(2.5 / (STEPS.length - 1)) * 100}%`;

export const EclipseRoadmapTimeline = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isFr = lang === "fr";
  const sectionRef = useRef<HTMLDivElement>(null);

  const translatedSteps = STEPS.map((step, idx) => {
    switch (lang) {
      case "zh":
        switch (idx) {
          case 0:
            return {
              ...step,
              title: "创意基石",
              status: "已完成",
              detail: "80多页的游戏设计文档（GDD）正式定稿。第一卷的主线剧情与对话撰写完毕。美术方向全面确立 — 视觉参考、色彩基调与游戏架构。纸质原型通过团队验证。"
            };
          case 1:
            return {
              ...step,
              title: "技术孵化",
              status: "已完成",
              detail: "虚幻引擎5（UE5）完成选型与配置。确立了 Blender → UE5 的资产管线。初始关卡的基础白模搭建。集成 Metahuman 动画系统。技术预产阶段100%达成。"
            };
          case 2:
            return {
              ...step,
              title: "Mawahub 扶持",
              status: "进行中",
              detail: "正式获准加入 2026 Mawahub 孵化计划。组建了包含12名成员的专项团队。正式开启垂直切片开发。对接孵化器的各项资源与导师指导。"
            };
          case 3:
            return {
              ...step,
              title: "垂直切片",
              status: "计划中",
              detail: "完成单一完整生态（深渊之城）的打磨，包含核心战斗机制、基础敌方AI、萃取与蜕变系统的平稳运行。渲染最终的视觉展示版。为投资者会晤准备的关键里程碑。"
            };
          case 4:
            return {
              ...step,
              title: "可玩 Alpha",
              status: "计划中",
              detail: "第一卷的完整内容导入完毕。开启内部测试，并针对腐败与成长系统进行平衡度调优。深度优化 UE5 运行表现。推进公开试玩版构建 of 准备。"
            };
          case 5:
            return {
              ...step,
              title: "公开试玩 — 2027 Q1",
              status: "终极目标",
              detail: "在 Steam 平台发布 45 至 60 分钟的 PC 公开试玩版。启动大规模宣发、主流媒体评测与 Steam 愿望单吸量活动。同步启动第二卷的创意策划。"
            };
          default:
            return { ...step, title: step.titleEn, status: step.statusEn, detail: step.detailEn };
        }
      case "ja":
        switch (idx) {
          case 0:
            return {
              ...step,
              title: "クリエイティブの創造",
              status: "完了",
              detail: "80ページ超のゲームデザイン設計書（GDD）が完成。第1巻のメインシナリオと台詞を執筆。美術方向性の全確立 — 視覚的リファレンス、色彩設計、構成定義。ペーパープロトタイプの検証が完了。"
            };
          case 1:
            return {
              ...step,
              title: "技術インキュベーション",
              status: "完了",
              detail: "Unreal Engine 5の選定と構築。BlenderからUE5へのアセットパイプライン確立。初期ステージ of ブロックアウト。Metahumanアニメーション統合。技術的プリプロダクションが100%完了。"
            };
          case 2:
            return {
              ...step,
              title: "Mawahub インテグレーション",
              status: "進行中",
              detail: "Mawahub 2026 インキュベーターに正式採択。12名の精鋭メンバーからなる開発チーム結成。バーティカルスライスの開発開始。リソースと専門メンターへのアクセス確保。"
            };
          case 3:
            return {
              ...step,
              title: "バーティカルスライス",
              status: "計画中",
              detail: "単一の完全なバイオーム（奈落の都）を完成。戦闘システム、初期エネミーAI、抽出・変異システムの実装。最終デモ映像のレンダリング。投資家に向けた極めて重要なマイルストーン。"
            };
          case 4:
            return {
              ...step,
              title: "プレイアブルAlpha",
              status: "計画中",
              detail: "第1巻のコンテンツ全統合。内部テストの実施、および堕落・成長システムのバランス調整。UE5のパフォーマンス最適化。一般向けデモビルドの準備開始。"
            };
          case 5:
            return {
              ...step,
              title: "体験版公開 — 2027 Q1",
              status: "最終目標",
              detail: "Steamにて45〜60分の一般向け体験版を配信。集中的なプロモーション、ゲームメディアへのアプローチ、Steamウィッシュリスト獲得キャンペーンの実施。並行して第2巻の開発準備。"
            };
          default:
            return { ...step, title: step.titleEn, status: step.statusEn, detail: step.detailEn };
        }
      case "fr":
        return { ...step, title: step.titleFr, status: step.statusFr, detail: step.detailFr };
      default:
        return { ...step, title: step.titleEn, status: step.statusEn, detail: step.detailEn };
    }
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Progress line drawn based on scroll in the center of the screen
  const { scrollYProgress: lineProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"],
  });

  const lineWidth = useTransform(lineProgress, [0, 1], ["0%", PROGRESS_PCT]);

  return (
    <section ref={sectionRef} className="relative bg-black pt-24 pb-32 border-t border-white/[0.03] overflow-hidden">
      {/* Background Image without parallax or zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none bg-[url('/assets/eclipse/sections/tmeline-bg.jpg')]"
      />

      {/* Heavy Top & Bottom Gradients to blend with other sections */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0" />

      {/* Red ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.06),transparent_65%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <SectionTitle
          index="07"
          label="Feuille de Route"
          labelEn="Roadmap"
          isFr={isFr}
          className="mb-20"
        />

        {/* Rail + Steps */}
        <div className="relative mt-20">
          {/* Background rail */}
          <div className="absolute top-[28px] md:top-[32px] left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#8B0000]/40 to-transparent z-0" />
          
          {/* Animated progress fill */}
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-[28px] md:top-[32px] left-8 h-[1px] bg-gradient-to-r from-[#8B0000] via-[#8B0000] to-transparent origin-left z-0"
          />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 relative z-10">
            {translatedSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className={`group relative flex flex-col items-center text-center cursor-default`}
              >
                {/* Node - Diamond Shape */}
                <div 
                  className={`w-[56px] h-[56px] md:w-[64px] md:h-[64px] border-[1.5px] bg-[#0A0503] flex flex-col items-center justify-center transition-all duration-500 mb-6 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]
                  ${step.active
                    ? "border-[#C41E1E] bg-[#8B0000]/20 shadow-[0_0_30px_rgba(139,0,0,0.6)]"
                    : step.done
                      ? "border-[#8B0000] group-hover:border-[#C41E1E] group-hover:shadow-[0_0_20px_rgba(139,0,0,0.4)]"
                      : "border-[#8B0000]/40 group-hover:border-[#8B0000] group-hover:shadow-[0_0_15px_rgba(139,0,0,0.2)]"
                  }`}
                >
                  <span className={`font-cinzel text-[8px] tracking-[0.2em] leading-none mb-1
                    ${step.active ? "text-[#C9A84C]" : "text-[#8B0000]"}`}>
                    PHASE
                  </span>
                  <span className={`font-cinzel text-sm md:text-base leading-none
                    ${step.active ? "text-white" : "text-[#C9A84C]"}`}>
                    {step.phase}
                  </span>
                </div>

                {/* Title */}
                <h4 className={`font-cinzel text-xs md:text-sm tracking-widest uppercase mb-1 md:mb-2 px-1 transition-colors duration-300
                  ${step.active 
                    ? "text-white" 
                    : step.done 
                      ? "text-white/80 group-hover:text-white" 
                      : "text-white/40 group-hover:text-white/70"}`}>
                  {step.title}
                </h4>

                {/* Status / Subtitle (italic) */}
                <span className={`font-inter text-xs md:text-sm italic mb-3 transition-colors duration-300
                  ${step.active
                    ? "text-[#C41E1E]"
                    : step.done
                      ? "text-[#C9A84C]/80"
                      : "text-white/30"
                  }`}>
                  {step.status}
                </span>

                {/* Full detail — hover reveal, absolute so it doesn't shift layout */}
                <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-[280px] mt-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
                  <p className="font-inter text-xs md:text-sm text-white/60 leading-relaxed px-4 pt-4 pb-5 border-t border-[#8B0000]/30 bg-black/60 backdrop-blur-sm rounded-b-md">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
