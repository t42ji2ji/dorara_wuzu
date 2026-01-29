import { useTheme } from '@/components/ThemeProvider';
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
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AppStoreButton } from 'react-mobile-app-button';
import { Link } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';
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
  const { theme } = useTheme();

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
    <div className="bg-background min-h-screen">
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

          {/* App Store Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mb-6"
          >
            <AppStoreButton
              theme={theme === 'dark' ? 'dark' : 'light'}
              url="https://apps.apple.com/tw/app/wuzu/id6744425830"
            />
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
      <section className="py-20 px-4 bg-accent/30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-foreground mb-12"
          >
            {t('home.features.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
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
      <section className="py-20 px-4 bg-accent/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
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
      </section>

      {/* Gamification Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t('home.gamification.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('home.gamification.description1')}
              <br />
              {t('home.gamification.description2')}
              <br />
              {t('home.gamification.description3')}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {['day3', 'day7', 'day30', 'day100', 'day365'].map((key, i) => (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {t(`home.gamification.milestones.${key}`)}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dress Up Section */}
      <section className="py-20 px-4 bg-accent/30">
        <WuzuDressUp />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
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
            <div className="flex justify-center mb-8">
              <AppStoreButton
                theme={theme === 'dark' ? 'dark' : 'light'}
                url="https://apps.apple.com/tw/app/wuzu/id6744425830"
              />
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
      <section className="py-16 px-4 bg-muted/30">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">{t('home.footer.copyright')}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
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
