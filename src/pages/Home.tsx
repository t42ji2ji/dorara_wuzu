import { Button } from '@/components/ui/button';
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
} from '@rive-app/react-canvas';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Heart,
  Users,
  BarChart3,
  Sparkles,
  Lock,
  Send,
  Mail,
  Twitter,
  Download,
  Smartphone,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const AndroidIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.341a.96.96 0 0 0 .96-.96v-4.8a.96.96 0 0 0-1.92 0v4.8a.96.96 0 0 0 .96.96zm-11.046 0a.96.96 0 0 0 .96-.96v-4.8a.96.96 0 0 0-1.92 0v4.8a.96.96 0 0 0 .96.96zm11.666-8.082a.39.39 0 0 0 .536-.133l.756-1.267a.39.39 0 1 0-.67-.399l-.765 1.283a5.07 5.07 0 0 0-2.205-.98 5.07 5.07 0 0 0-2.593 0 5.07 5.07 0 0 0-2.205.98l-.765-1.283a.39.39 0 1 0-.67.4l.756 1.266a4.94 4.94 0 0 0-2.596 4.316h12.017a4.94 4.94 0 0 0-2.596-4.183zM9.87 9.541a.54.54 0 1 1 .001-1.081.54.54 0 0 1-.001 1.081zm4.26 0a.54.54 0 1 1 .001-1.081.54.54 0 0 1-.001 1.081zM7.32 16.541a1.44 1.44 0 0 0 1.44 1.44h.96v2.4a.96.96 0 0 0 1.92 0v-2.4h.72v2.4a.96.96 0 0 0 1.92 0v-2.4h.96a1.44 1.44 0 0 0 1.44-1.44v-5.52H7.32v5.52z" />
  </svg>
);

import WuzuDressUp from '@/components/WuzuDressUp';

const WuzuDog = () => {
  const { rive, RiveComponent } = useRive({
    src: '/wuzu.riv',
    stateMachines: 'idle',
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain }),
  });

  // Get trigger inputs for animations
  const waggingTailInput = useStateMachineInput(rive, 'idle', 'wagging_tail');
  const tappingTongueInput = useStateMachineInput(
    rive,
    'idle',
    'tapping_tongue'
  );

  // Auto wag tail periodically
  useEffect(() => {
    if (!waggingTailInput) return;

    const interval = setInterval(() => {
      waggingTailInput.fire();
    }, 5000);

    // Initial wag after load
    const timeout = setTimeout(() => {
      waggingTailInput.fire();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [waggingTailInput]);

  // Handle click to trigger tongue animation
  const handleClick = useCallback(() => {
    if (tappingTongueInput) {
      tappingTongueInput.fire();
    }
    if (waggingTailInput) {
      waggingTailInput.fire();
    }
  }, [tappingTongueInput, waggingTailInput]);

  return (
    <div
      className="w-56 h-56 sm:w-64 sm:h-64 mx-auto cursor-pointer hover:scale-105 transition-transform"
      onClick={handleClick}
    >
      <RiveComponent />
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();

  const wuzuImages = [
    '/wuzu/wolf.png',
    '/wuzu/mouse.png',
    '/wuzu/tiger-glasses.png',
    '/wuzu/bunny.png',
    '/wuzu/bear.png',
    '/wuzu/sheep-cape.png',
  ];

  // Decorative floating wuzus around the features section
  const floatingWuzus = [
    { src: '/wuzu/hamster-witch.png', className: 'hidden lg:block absolute -left-20 top-24 w-36', rotate: -12 },
    { src: '/wuzu/tiger-backpack.png', className: 'hidden lg:block absolute -right-20 top-1/3 w-32', rotate: 8 },
    { src: '/wuzu/mouse-hat.png', className: 'hidden lg:block absolute -left-16 bottom-16 w-32', rotate: 10 },
    { src: '/wuzu/sheep-bow.png', className: 'hidden lg:block absolute -right-20 bottom-24 w-36', rotate: -8 },
  ];

  const features = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      titleKey: 'home.features.chat.title',
      descriptionKey: 'home.features.chat.description',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      titleKey: 'home.features.emotion.title',
      descriptionKey: 'home.features.emotion.description',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      titleKey: 'home.features.gratitude.title',
      descriptionKey: 'home.features.gratitude.description',
    },
    {
      icon: <Lock className="h-6 w-6" />,
      titleKey: 'home.features.encryption.title',
      descriptionKey: 'home.features.encryption.description',
    },
    {
      icon: <Users className="h-6 w-6" />,
      titleKey: 'home.features.anonymous.title',
      descriptionKey: 'home.features.anonymous.description',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      titleKey: 'home.features.review.title',
      descriptionKey: 'home.features.review.description',
    },
  ];

  return (
    <div className="bg-gradient-wuzu min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Wuzu Dog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <WuzuDog />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            {t('home.hero.title')}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl sm:text-2xl text-primary font-medium mb-4"
          >
            {t('home.hero.tagline')}
          </motion.p>

          {/* Core Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-muted-foreground mb-8 space-y-3"
          >
            <p className="text-lg">{t('home.hero.philosophy1')}</p>
            <p>
              {t('home.hero.philosophy2')}
              <br className="hidden sm:block" />
              {t('home.hero.philosophy3')}
            </p>
          </motion.div>

          {/* Download & Community Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <a
              href="https://apps.apple.com/tw/app/wuzu/id6757849464?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-container flex items-center gap-3 h-14 px-8 text-base font-medium text-foreground hover:bg-white/80 dark:hover:bg-white/15 transition-colors min-w-[200px] justify-center"
            >
              <AppleIcon className="h-5 w-5" />
              App Store
            </a>
            <a
              href="https://dorara.notion.site/30495e80ca378099810ce1f39fcba95a"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-container flex items-center gap-3 h-14 px-8 text-base font-medium text-foreground hover:bg-white/80 dark:hover:bg-white/15 transition-colors min-w-[200px] justify-center"
            >
              <AndroidIcon className="h-5 w-5" />
              {t('home.cta.androidBeta')}
            </a>
            <a
              href="https://line.me/ti/g2/Kv6bk2444cTtzrojfHZM-HCnRhOy0G669NyO-Q?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-container flex items-center gap-3 h-14 px-8 text-base font-medium text-foreground hover:bg-white/80 dark:hover:bg-white/15 transition-colors min-w-[200px] justify-center"
            >
              <img src="/line-icon.png" alt="LINE" className="h-5 w-5 rounded-sm" />
              {t('home.cta.joinLine')}
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-muted-foreground/50"
            >
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wuzu Companion Section */}
      <section className="py-20 px-4 bg-white/30 dark:bg-white/5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t('home.companion.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.companion.description1')}
                <br />
                {t('home.companion.description2')}
                <br />
                {t('home.companion.description3')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src="/screenshots/aichat.png"
                alt="Wuzu AI Chat"
                className="w-64 rounded-[2rem] shadow-2xl border border-white/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          {/* Floating wuzus around the section */}
          {floatingWuzus.map((wuzu, i) => (
            <motion.img
              key={wuzu.src}
              src={wuzu.src}
              alt=""
              className={`${wuzu.className} wuzu-float`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              style={{
                '--float-rotate': `${wuzu.rotate}deg`,
                '--float-duration': `${3 + i * 0.5}s`,
                '--float-delay': `${i * 0.7}s`,
              } as React.CSSProperties}
            />
          ))}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-foreground mb-12"
          >
            {t('home.features.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-container p-6 hover:border-primary/30 transition-colors relative overflow-visible"
              >
                {/* Wuzu peeking from top-right */}
                <motion.img
                  src={wuzuImages[index]}
                  alt=""
                  className="absolute -top-14 -right-6 w-28 h-28 object-contain pointer-events-none z-10 wuzu-wiggle"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  style={{
                    '--wiggle-duration': `${2.5 + index * 0.3}s`,
                    '--wiggle-delay': `${index * 0.4}s`,
                  } as React.CSSProperties}
                />
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Anonymous Connection Section */}
      <section className="py-20 px-4 bg-white/30 dark:bg-white/5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center gap-4"
            >
              <img
                src="/screenshots/anonymous-diary.png"
                alt="Anonymous Diary"
                className="w-36 sm:w-48 md:w-56 rounded-[2rem] shadow-2xl border border-white/20"
              />
              <img
                src="/screenshots/exchange-diary.png"
                alt="Exchange Diary"
                className="w-36 sm:w-48 md:w-56 rounded-[2rem] shadow-2xl border border-white/20 mt-12"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                <Send className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t('home.connection.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {t('home.connection.description1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('home.connection.description2')}
                <br />
                {t('home.connection.description3')}
                <br />
                <span className="text-foreground font-medium">
                  {t('home.connection.description4')}
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Dress Up Section */}
      <section className="py-20 px-4 bg-white/30 dark:bg-white/5 backdrop-blur-sm">
        <WuzuDressUp />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white/20 dark:bg-white/5 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('home.cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="outline" size="lg" asChild className="glass-container min-w-[180px]">
                <a
                  href="https://apps.apple.com/tw/app/wuzu/id6757849464?l=en-GB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  App Store
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="glass-container min-w-[180px]">
                <a
                  href="https://dorara.notion.site/30495e80ca378099810ce1f39fcba95a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Smartphone className="h-4 w-4" />
                  {t('home.cta.androidBeta')}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="glass-container min-w-[180px]">
                <a
                  href="https://line.me/ti/g2/Kv6bk2444cTtzrojfHZM-HCnRhOy0G669NyO-Q?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <img src="/line-icon.png" alt="LINE" className="h-4 w-4 rounded-sm" />
                  {t('home.cta.joinLine')}
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('home.cta.madeBy')}{' '}
              <a
                href="https://www.threads.net/@dorara_hsieh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                dorara_hsieh
              </a>{' '}
              {t('home.cta.withLove')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-white/20 dark:bg-white/5 backdrop-blur-sm">
        <ContactForm />
      </section>

      {/* Contact Links */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <a
                href="mailto:hey@kokoromono.com"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                {t('home.contact.contactUs')}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://x.com/DoraraHsieh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://apps.apple.com/tw/app/wuzu/id6757849464?l=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                App Store
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://line.me/ti/g2/Kv6bk2444cTtzrojfHZM-HCnRhOy0G669NyO-Q?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                LINE {t('home.contact.community')}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">{t('home.footer.copyright')}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/emotion-model">{t('emotionModel.title')}</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/privacy">{t('privacy.title')}</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
