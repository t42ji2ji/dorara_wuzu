import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Zap,
  Feather,
  Shield,
  HelpCircle,
  Brain,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EmotionModel = () => {
  const { t } = useTranslation();

  // Floating wuzus for decoration
  const floatingWuzus = [
    { src: '/wuzu/bear.png', className: 'hidden lg:block absolute -left-16 top-8 w-32', rotate: -10 },
    { src: '/wuzu/bunny.png', className: 'hidden lg:block absolute -right-16 top-1/4 w-28', rotate: 8 },
    { src: '/wuzu/sheep-cape.png', className: 'hidden lg:block absolute -left-20 bottom-8 w-36', rotate: 12 },
  ];

  const examples = [
    {
      emoji: '🎉',
      labelKey: 'emotionModel.examples.excited.label',
      situationKey: 'emotionModel.examples.excited.situation',
      v: 9, a: 8, d: 8,
      bg: 'from-amber-400/20 to-rose-400/20',
    },
    {
      emoji: '☁️',
      labelKey: 'emotionModel.examples.calm.label',
      situationKey: 'emotionModel.examples.calm.situation',
      v: 7, a: 2, d: 7,
      bg: 'from-sky-400/20 to-emerald-400/20',
    },
    {
      emoji: '😰',
      labelKey: 'emotionModel.examples.anxious.label',
      situationKey: 'emotionModel.examples.anxious.situation',
      v: 2, a: 9, d: 2,
      bg: 'from-orange-400/20 to-red-400/20',
    },
    {
      emoji: '😔',
      labelKey: 'emotionModel.examples.sad.label',
      situationKey: 'emotionModel.examples.sad.situation',
      v: 2, a: 2, d: 2,
      bg: 'from-slate-400/20 to-blue-400/20',
    },
    {
      emoji: '😤',
      labelKey: 'emotionModel.examples.angry.label',
      situationKey: 'emotionModel.examples.angry.situation',
      v: 2, a: 9, d: 8,
      bg: 'from-red-400/20 to-orange-400/20',
    },
    {
      emoji: '🙏',
      labelKey: 'emotionModel.examples.grateful.label',
      situationKey: 'emotionModel.examples.grateful.situation',
      v: 8, a: 3, d: 7,
      bg: 'from-emerald-400/20 to-teal-400/20',
    },
  ];

  const ScoreBar = ({ value, color }: { value: number; color: string }) => (
    <div className="flex-1 h-3 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value * 10}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );

  return (
    <div className="bg-gradient-wuzu min-h-screen overflow-x-hidden">
      {/* Header */}
      <nav className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {t('emotionModel.backToHome')}
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-8 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/wuzu/tiger-glasses.png"
              alt=""
              className="w-32 h-32 mx-auto mb-6 object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('emotionModel.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t('emotionModel.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why not just happy/sad - concise intro */}
      <section className="py-16 px-4 bg-white/30 dark:bg-white/5 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t('emotionModel.why.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('emotionModel.why.description')}
            </p>

            {/* Visual: same word different feelings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="glass-container p-5 text-center">
                <div className="text-4xl mb-2">😰</div>
                <p className="font-semibold text-foreground">{t('emotionModel.why.anxious')}</p>
                <p className="text-sm text-muted-foreground">{t('emotionModel.why.anxiousDesc')}</p>
              </div>
              <div className="glass-container p-5 text-center">
                <div className="text-4xl mb-2">😔</div>
                <p className="font-semibold text-foreground">{t('emotionModel.why.sad')}</p>
                <p className="text-sm text-muted-foreground">{t('emotionModel.why.sadDesc')}</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-6 text-sm">
              {t('emotionModel.why.punchline')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Dimensions - visual cards */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          {/* Floating wuzus */}
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
            className="text-3xl font-bold text-center text-foreground mb-4"
          >
            {t('emotionModel.dimensions.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-muted-foreground mb-12"
          >
            {t('emotionModel.dimensions.subtitle')}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Valence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-container p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-emerald-500/20 mb-4">
                <div className="flex gap-1">
                  <TrendingDown className="h-5 w-5 text-rose-500" />
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {t('emotionModel.dimensions.valence.name')}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">Valence</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {t('emotionModel.dimensions.valence.description')}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-500 font-medium">{t('emotionModel.dimensions.valence.negative')}</span>
                <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-rose-400/40 to-emerald-400/40" />
                <span className="text-emerald-500 font-medium">{t('emotionModel.dimensions.valence.positive')}</span>
              </div>
            </motion.div>

            {/* Arousal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-container p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-amber-500/20 mb-4">
                <div className="flex gap-1">
                  <Feather className="h-5 w-5 text-blue-500" />
                  <Zap className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {t('emotionModel.dimensions.arousal.name')}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">Arousal</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {t('emotionModel.dimensions.arousal.description')}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-blue-500 font-medium">{t('emotionModel.dimensions.arousal.low')}</span>
                <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-blue-400/40 to-amber-400/40" />
                <span className="text-amber-500 font-medium">{t('emotionModel.dimensions.arousal.high')}</span>
              </div>
            </motion.div>

            {/* Dominance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-container p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-sky-500/20 mb-4">
                <div className="flex gap-1">
                  <HelpCircle className="h-5 w-5 text-violet-500" />
                  <Shield className="h-5 w-5 text-sky-500" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {t('emotionModel.dimensions.dominance.name')}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">Dominance</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {t('emotionModel.dimensions.dominance.description')}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-violet-500 font-medium">{t('emotionModel.dimensions.dominance.low')}</span>
                <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-violet-400/40 to-sky-400/40" />
                <span className="text-sky-500 font-medium">{t('emotionModel.dimensions.dominance.high')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emotion Examples with score bars */}
      <section className="py-20 px-4 bg-white/30 dark:bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-foreground mb-4"
          >
            {t('emotionModel.examples.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-muted-foreground mb-12"
          >
            {t('emotionModel.examples.subtitle')}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {examples.map((ex, index) => (
              <motion.div
                key={ex.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-container p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{ex.emoji}</span>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{t(ex.labelKey)}</h4>
                    <p className="text-xs text-muted-foreground">{t(ex.situationKey)}</p>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium w-16 text-rose-500 dark:text-rose-400">{t('emotionModel.dimensions.valence.short')}</span>
                    <ScoreBar value={ex.v} color="bg-gradient-to-r from-rose-400 to-emerald-400" />
                    <span className="text-xs font-mono text-muted-foreground w-6 text-right">{ex.v}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium w-16 text-amber-500 dark:text-amber-400">{t('emotionModel.dimensions.arousal.short')}</span>
                    <ScoreBar value={ex.a} color="bg-gradient-to-r from-blue-400 to-amber-400" />
                    <span className="text-xs font-mono text-muted-foreground w-6 text-right">{ex.a}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium w-16 text-sky-500 dark:text-sky-400">{t('emotionModel.dimensions.dominance.short')}</span>
                    <ScoreBar value={ex.d} color="bg-gradient-to-r from-violet-400 to-sky-400" />
                    <span className="text-xs font-mono text-muted-foreground w-6 text-right">{ex.d}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Wuzu uses it - concise bullets */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
              <Brain className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {t('emotionModel.howWuzu.title')}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-container p-5 flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {i}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t(`emotionModel.howWuzu.step${i}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`emotionModel.howWuzu.step${i}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-muted-foreground mt-8 text-sm"
          >
            {t('emotionModel.howWuzu.note')}
          </motion.p>
        </div>
      </section>

      {/* Academic reference - compact */}
      <section className="py-12 px-4 bg-white/30 dark:bg-white/5 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-container p-6"
          >
            <h3 className="font-semibold text-foreground mb-3 text-sm">
              {t('emotionModel.reference.title')}
            </h3>
            <blockquote className="border-l-3 border-primary/30 pl-4 text-sm text-muted-foreground italic">
              {t('emotionModel.reference.citation')}
            </blockquote>
            <p className="text-xs text-muted-foreground mt-3">
              {t('emotionModel.reference.note')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">{t('home.footer.copyright')}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">{t('emotionModel.backToHome')}</Link>
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

export default EmotionModel;
