import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AvatarPreview from '@/components/wardrobe/AvatarPreview';
import CategoryTabs, { type CategoryId } from '@/components/wardrobe/CategoryTabs';
import ItemGrid from '@/components/wardrobe/ItemGrid';
import { useWuzuAvatar, DEFAULT_EQUIPMENT, type EquipmentState, type Mood } from '@/components/wardrobe/useWuzuAvatar';
import { ANIMALS } from '@/data/manifest';

/** Only the Rive avatar lives here — keyed by animal+mood so only this remounts */
const AvatarSection = ({
  animal,
  mood,
  equipment,
}: {
  animal: string;
  mood: Mood;
  equipment: EquipmentState;
}) => {
  const { i18n } = useTranslation();
  const isZh = i18n.language?.startsWith('zh');

  const {
    loading,
    RiveComponent,
    triggerAnimation,
  } = useWuzuAvatar(animal, mood, equipment);

  const currentAnimal = ANIMALS.find((a) => a.id === animal);
  const animalLabel = currentAnimal
    ? isZh ? currentAnimal.i18n.zh : currentAnimal.i18n.en
    : animal;

  return (
    <>
      <AvatarPreview
        RiveComponent={RiveComponent}
        loading={loading}
        error={null}
        onTap={triggerAnimation}
        animal={animal}
      />
      <div className="text-center mt-3">
        <span className="px-4 py-1.5 bg-card border border-border rounded-full text-sm font-medium shadow-sm">
          {animalLabel}
        </span>
      </div>
    </>
  );
};

const Wardrobe = () => {
  const { t } = useTranslation();
  const [animal, setAnimal] = useState('dog');
  const [mood, setMood] = useState<Mood>('idle');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('animal');
  const [equipment, setEquipment] = useState<EquipmentState>(DEFAULT_EQUIPMENT);

  // These handlers also apply equipment visually via the hook inside AvatarSection.
  // But since AvatarSection remounts on animal/mood change, the hook's useEffect
  // re-applies all equipment from the lifted state automatically.
  const handleEquipmentChange = useCallback((category: string, itemId: string) => {
    setEquipment(prev => ({ ...prev, [category]: itemId }));
  }, []);

  const handleCollarColorChange = useCallback((colorId: string) => {
    setEquipment(prev => ({ ...prev, collarColorId: colorId }));
  }, []);

  const handleEyeColorChange = useCallback((colorId: string) => {
    setEquipment(prev => ({ ...prev, eyeColorId: colorId }));
  }, []);

  return (
    <div className="bg-gradient-wuzu min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('wardrobe.backToHome')}
            </Link>
          </Button>
          <h1 className="text-lg font-bold text-foreground">{t('wardrobe.title')}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category tabs — never remounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="bg-card border border-border rounded-2xl p-3 sm:p-4">
            <CategoryTabs
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar — only this remounts on animal/mood switch */}
          <div className="lg:w-[400px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-20" key={`${animal}-${mood}`}>
              <AvatarSection
                animal={animal}
                mood={mood}
                equipment={equipment}
              />
            </div>
          </div>

          {/* Item grid — never remounts */}
          <div className="flex-1 min-w-0">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="min-h-[200px]">
                <ItemGrid
                  category={activeCategory}
                  animal={animal}
                  mood={mood}
                  equipment={equipment}
                  onAnimalChange={setAnimal}
                  onMoodChange={setMood}
                  onEquipmentChange={handleEquipmentChange}
                  onCollarColorChange={handleCollarColorChange}
                  onEyeColorChange={handleEyeColorChange}
                />
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {t('wardrobe.tip')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
