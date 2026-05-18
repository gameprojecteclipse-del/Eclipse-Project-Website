import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const PressSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const [formData, setFormData] = useState({
    name: '',
    media: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const t = (() => {
    switch (lang) {
      case "zh":
        return {
          title: "媒体与新闻",
          subtitle: "获取关于 Eclipse 的最新动态，并与我们的媒体团队取得联系以获取采访、素材资产及独家内容访问权。",
          aboutTitle: "关于 Eclipse",
          studioTitle: "工作室",
          studioDesc: "Eclipse Studio 于 2025 年在阿尔及利亚创立，代表了专注于沉浸式黑暗幻想游戏体验的新一代独立开发力量。",
          teamTitle: "团队",
          teamDesc: "我们由12名开发者、美术师和设计师组成的充满热情的团队，融合了游戏制作、叙事艺术与先进技术的多元背景。",
          projectTitle: "项目",
          projectDesc: "《Eclipse》是一款雄心勃勃的黑暗幻想动作角色扮演游戏（Action-RPG），它将创新的阴影战斗机制、深刻的叙事抉择与令人惊叹的哥特风视觉效果完美融合。",
          platformsTitle: "平台",
          btnDownload: "下载媒体包",
          inquiriesTitle: "媒体咨询",
          nameLabel: "姓名 *",
          namePlaceholder: "您的真实姓名",
          mediaLabel: "媒体机构名称 *",
          mediaPlaceholder: "出版物、网站或公司机构",
          emailLabel: "邮箱 *",
          emailPlaceholder: "your.email@media.com",
          messageLabel: "信息内容 *",
          messagePlaceholder: "请告诉我们您的咨询意图、截止日期以及任何具体的需求...",
          btnSend: "发送信息",
          directEmail: "如需进行媒体咨询，请直接联系",
          toastSentTitle: "发送成功！",
          toastSentDesc: "感谢您的关注。我们会尽快回复您。",
          toastDownTitle: "下载媒体包",
          toastDownDesc: "媒体包下载功能即将上线。"
        };
      case "ja":
        return {
          title: "プレス ＆ メディア",
          subtitle: "Eclipseの最新情報を入手し、インタビュー、素材アセット、独占コンテンツへのアクセスのためにメディアチームと繋がります。",
          aboutTitle: "Eclipseについて",
          studioTitle: "スタジオ",
          studioDesc: "2025年にアルジェリアで設立されたEclipse Studioは、没入型のダークファンタジー体験に焦点を当てた、インディーゲーム開発の新たな潮流を代表しています。",
          teamTitle: "チーム",
          teamDesc: "開発者、アーティスト、デザイナーからなる12名の情熱的なチームは、ゲーム開発、シナリオ制作、テクノロジーにおける多様なバックグラウンドを結集しています。",
          projectTitle: "プロジェクト",
          projectDesc: "『Eclipse』は、革新的な影ベースの戦闘システム、深遠なナラティブの選択肢、そして見事なゴシック風ビジュアルを融合させた、野心的なダークファンタジーアクションRPGです。",
          platformsTitle: "プラットフォーム",
          btnDownload: "プレスキットをダウンロード",
          inquiriesTitle: "プレス向けお問い合わせ",
          nameLabel: "お名前 *",
          namePlaceholder: "お名前（フルネーム）",
          mediaLabel: "所属メディア / 組織名 *",
          mediaPlaceholder: "メディア名、ウェブサイト、または組織",
          emailLabel: "メールアドレス *",
          emailPlaceholder: "your.email@media.com",
          messageLabel: "メッセージ内容 *",
          messagePlaceholder: "お問い合わせの趣旨、締切、および具体的なご要望についてお聞かせください...",
          btnSend: "メッセージを送信",
          directEmail: "プレスに関するお問い合わせは、以下まで直接ご連絡ください",
          toastSentTitle: "メッセージを送信しました！",
          toastSentDesc: "ご関心をお寄せいただきありがとうございます。追ってご連絡いたします。",
          toastDownTitle: "プレスキットのダウンロード",
          toastDownDesc: "プレスキットのダウンロードは間もなく利用可能になります。"
        };
      case "fr":
        return {
          title: "Presse & Médias",
          subtitle: "Obtenez les dernières informations sur Eclipse et contactez notre équipe média pour des interviews, des ressources et un accès à du contenu exclusif.",
          aboutTitle: "À propos d'Eclipse",
          studioTitle: "Le Studio",
          studioDesc: "Eclipse Studio, fondé en 2025 en Algérie, incarne une nouvelle vague de développement de jeux indépendants axée sur des expériences de dark fantasy immersives.",
          teamTitle: "L'Équipe",
          teamDesc: "Notre équipe passionnée de 12 développeurs, artistes et designers réunit des profils variés dans le jeu vidéo, la narration et la technologie.",
          projectTitle: "Le Projet",
          projectDesc: "Eclipse est un action-RPG ambitieux de dark fantasy, alliant des mécaniques de combat innovantes basées sur les ombres à des choix narratifs profonds et à des graphismes gothiques saisissants.",
          platformsTitle: "Plateformes",
          btnDownload: "TÉLÉCHARGER LE KIT PRESSE",
          inquiriesTitle: "Demandes de Presse",
          nameLabel: "Nom *",
          namePlaceholder: "Votre nom complet",
          mediaLabel: "Média / Organisation *",
          mediaPlaceholder: "Publication, site web ou organisation",
          emailLabel: "Email *",
          emailPlaceholder: "votre.email@media.com",
          messageLabel: "Message *",
          messagePlaceholder: "Parlez-nous de votre demande, des délais et de toute exigence spécifique...",
          btnSend: "ENVOYER LE MESSAGE",
          directEmail: "Pour les demandes de presse, contactez-nous directement sur",
          toastSentTitle: "Message envoyé !",
          toastSentDesc: "Merci de votre intérêt. Nous vous recontacterons bientôt.",
          toastDownTitle: "Téléchargement du Kit Presse",
          toastDownDesc: "Le téléchargement du kit presse sera bientôt disponible."
        };
      default:
        return {
          title: "Press & Media",
          subtitle: "Get the latest information about Eclipse and connect with our media team for interviews, assets, and exclusive content access.",
          aboutTitle: "About Eclipse",
          studioTitle: "Studio",
          studioDesc: "Eclipse Studio, founded in 2025 in Algeria, represents a new wave of independent game development focused on immersive dark fantasy experiences.",
          teamTitle: "Team",
          teamDesc: "Our passionate team of 12 developers, artists, and designers brings together diverse backgrounds in gaming, storytelling, and technology.",
          projectTitle: "Project",
          projectDesc: "Eclipse is an ambitious dark fantasy action-RPG that combines innovative shadow-based combat mechanics with deep narrative choices and stunning gothic-inspired visuals.",
          platformsTitle: "Platforms",
          btnDownload: "DOWNLOAD PRESS KIT",
          inquiriesTitle: "Press Inquiries",
          nameLabel: "Name *",
          namePlaceholder: "Your full name",
          mediaLabel: "Media Organization *",
          mediaPlaceholder: "Publication, website, or organization",
          emailLabel: "Email *",
          emailPlaceholder: "your.email@media.com",
          messageLabel: "Message *",
          messagePlaceholder: "Tell us about your inquiry, deadline, and any specific requirements...",
          btnSend: "SEND MESSAGE",
          directEmail: "For press inquiries, contact us directly at",
          toastSentTitle: "Message sent!",
          toastSentDesc: "Thank you for your interest. We'll get back to you soon.",
          toastDownTitle: "Press Kit Download",
          toastDownDesc: "Press kit download will be available soon."
        };
    }
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.toastSentTitle,
      description: t.toastSentDesc,
    });
    setFormData({ name: '', media: '', email: '', message: '' });
  };

  const handlePressKitDownload = () => {
    toast({
      title: t.toastDownTitle,
      description: t.toastDownDesc,
    });
  };

  return (
    <section id="press-section" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-pure-white mb-6">
            {t.title}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Press Information */}
          <div>
            <Card className="bg-eclipse-dark border-blood-red/20 mb-8">
              <CardContent className="p-8">
                <h3 className="font-oswald text-2xl font-bold text-pure-white mb-6">
                  {t.aboutTitle}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2">{t.studioTitle}</h4>
                    <p className="font-inter text-muted-foreground">
                      {t.studioDesc}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2">{t.teamTitle}</h4>
                    <p className="font-inter text-muted-foreground">
                      {t.teamDesc}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2">{t.projectTitle}</h4>
                    <p className="font-inter text-muted-foreground">
                      {t.projectDesc}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2">{t.platformsTitle}</h4>
                    <div className="flex space-x-4">
                      <span className="px-3 py-1 bg-blood-red/20 text-blood-red rounded font-oswald text-sm">PC</span>
                      <span className="px-3 py-1 bg-blood-red/20 text-blood-red rounded font-oswald text-sm">PlayStation</span>
                      <span className="px-3 py-1 bg-blood-red/20 text-blood-red rounded font-oswald text-sm">Xbox</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Press Kit Download */}
            <div className="text-center">
              <Button
                onClick={handlePressKitDownload}
                className="font-oswald text-lg font-semibold px-8 py-3 bg-gradient-blood hover:shadow-glow transition-all duration-300 blood-liquid w-full sm:w-auto"
              >
                {t.btnDownload}
              </Button>
            </div>
          </div>

          {/* Press Contact Form */}
          <div>
            <Card className="bg-eclipse-dark border-blood-red/20">
              <CardContent className="p-8">
                <h3 className="font-oswald text-2xl font-bold text-pure-white mb-6">
                  {t.inquiriesTitle}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      {t.nameLabel}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-eclipse-darker border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder={t.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      {t.mediaLabel}
                    </label>
                    <Input
                      name="media"
                      value={formData.media}
                      onChange={handleInputChange}
                      required
                      className="bg-eclipse-darker border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder={t.mediaPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      {t.emailLabel}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-eclipse-darker border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      {t.messageLabel}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="bg-eclipse-darker border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder={t.messagePlaceholder}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="font-oswald font-medium px-6 py-2 bg-transparent border-2 border-blood-red text-blood-red hover:bg-blood-red hover:text-pure-white transition-all duration-300 blood-liquid w-full"
                  >
                    {t.btnSend}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-blood-red/20">
                  <p className="font-inter text-sm text-muted-foreground text-center">
                    {t.directEmail}<br />
                    <a href="mailto:press.eclipse.project@gmail.com" className="text-blood-red hover:underline">
                      press.eclipse.project@gmail.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};