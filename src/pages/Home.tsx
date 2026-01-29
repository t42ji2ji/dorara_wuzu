import ContactForm from '@/components/ContactForm';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { useRive } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Shield, Heart, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AppStoreButton } from 'react-mobile-app-button';
import { Link } from 'react-router-dom';

const WuzuDog = () => {
  const { RiveComponent } = useRive({
    src: '/wuzu.riv',
    autoplay: true,
  });

  return (
    <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto">
      <RiveComponent />
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const titleChars = t('app.title').split('');
  const { theme } = useTheme();

  const featureCards = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      titleKey: 'features.chat.title',
      descKey: 'features.chat.description',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      titleKey: 'features.emotion.title',
      descKey: 'features.emotion.description',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      titleKey: 'features.backup.title',
      descKey: 'features.backup.description',
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="text-center"
        >
          {/* Wuzu Dog Rive Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="mb-6"
          >
            <WuzuDog />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 flex justify-center flex-wrap">
            {titleChars.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="inline-block mx-[1px] text-foreground"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-2">
            {t('app.description')}
          </p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t('app.subdescription')}
          </p>

          {/* App Store Button */}
          <div className="flex justify-center mb-6">
            <AppStoreButton
              theme={theme === 'dark' ? 'dark' : 'light'}
              url="https://apps.apple.com/tw/app/wuzu/id6744425830"
            />
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {t('app.createdBy')}{' '}
            <a
              href="https://www.threads.net/@dorara_hsieh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              dorara_hsieh
            </a>
          </p>
        </motion.div>
      </div>

      {/* Brief Features */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card border"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto py-16 px-4 bg-muted/30">
        <ContactForm />
      </div>

      {/* Contact Links */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <a
                href="mailto:hey@kokoromono.com"
                className="flex items-center gap-2"
                aria-label={t('app.contact.email')}
              >
                <Mail className="h-4 w-4" />
                {t('app.contact.email')}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://x.com/DoraraHsieh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                aria-label={t('app.contact.twitter')}
              >
                <Twitter className="h-4 w-4" />
                {t('app.contact.twitter')}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://www.threads.net/@dorara_hsieh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                aria-label={t('app.contact.threads')}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01c0-3.585.853-6.442 2.538-8.501C5.852 1.205 8.605.024 12.186 0h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.56 22.5 8.414 22.5 11.99c0 3.585-.853 6.442-2.538 8.501C18.348 22.795 15.595 23.976 12.186 24zM12.5 2c-2.757 0-4.67.818-5.854 2.501C5.542 6.15 5 8.6 5 11.99c0 3.4.542 5.85 1.646 7.499C7.83 21.182 9.743 22 12.5 22s4.67-.818 5.854-2.501C19.458 17.85 20 15.4 20 12.01c0-3.4-.542-5.85-1.646-7.499C17.17 2.818 15.257 2 12.5 2z" />
                </svg>
                {t('app.contact.threads')}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">{t('app.copyright')}</p>
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
