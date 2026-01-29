import {
  useRive,
  useViewModelInstanceColor,
  useViewModelInstanceTrigger,
  useViewModelInstanceArtboard,
  Layout,
  Fit,
} from '@rive-app/react-webgl2';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Shirt, Crown, Palette } from 'lucide-react';

const OUTFITS = [
  { id: 'none', emoji: '🐕' },
  { id: 'rain_coat', emoji: '🌧️' },
  { id: 'hood', emoji: '🧥' },
  { id: 'witch', emoji: '🧙' },
  { id: 'boy', emoji: '👦' },
];

const HATS = [
  { id: 'none', emoji: '🐕' },
  { id: 'rain_coat', emoji: '🌧️' },
  { id: 'hood', emoji: '🧢' },
  { id: 'witch', emoji: '🎃' },
  { id: 'boy', emoji: '👦' },
];

const COLLAR_COLORS = [
  { id: 'red', color: '#E53935', r: 229, g: 57, b: 53 },
  { id: 'orange', color: '#FB8C00', r: 251, g: 140, b: 0 },
  { id: 'yellow', color: '#FDD835', r: 253, g: 216, b: 53 },
  { id: 'green', color: '#43A047', r: 67, g: 160, b: 71 },
  { id: 'blue', color: '#1E88E5', r: 30, g: 136, b: 229 },
  { id: 'purple', color: '#8E24AA', r: 142, g: 36, b: 170 },
  { id: 'pink', color: '#EC407A', r: 236, g: 64, b: 122 },
];

type TabType = 'outfit' | 'hat' | 'collar';

const WuzuDressUp = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('collar');
  const [selectedOutfit, setSelectedOutfit] = useState('none');
  const [selectedHat, setSelectedHat] = useState('none');
  const [selectedCollar, setSelectedCollar] = useState('orange');

  // Initialize Rive with autoBind
  const { rive, RiveComponent } = useRive({
    src: '/wuzu.riv',
    stateMachines: 'idle',
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Contain }),
  });

  // Access viewModelInstance directly from rive (as per official example)
  const viewModelInstance = rive?.viewModelInstance;

  // Collar color property
  const { setRgb: setCollarRgb } = useViewModelInstanceColor(
    'collar',
    viewModelInstance
  );

  // Triggers
  const { trigger: wagTail } = useViewModelInstanceTrigger(
    'wagging_tail',
    viewModelInstance
  );

  const { trigger: tapTongue } = useViewModelInstanceTrigger(
    'tapping_tongue',
    viewModelInstance
  );

  // Artboard properties for outfits and hats
  const { setValue: setClothesBack } = useViewModelInstanceArtboard(
    'clothes_back',
    viewModelInstance
  );
  const { setValue: setClothesFront } = useViewModelInstanceArtboard(
    'clothes_front',
    viewModelInstance
  );
  const { setValue: setHatFront } = useViewModelInstanceArtboard(
    'hat_front',
    viewModelInstance
  );

  // Set initial collar color when ready
  useEffect(() => {
    if (setCollarRgb) {
      const color = COLLAR_COLORS.find((c) => c.id === selectedCollar);
      if (color) {
        setCollarRgb(color.r, color.g, color.b);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCollarRgb]);

  // Set initial outfit when ready (skip if 'none')
  useEffect(() => {
    if (rive && setClothesBack && setClothesFront && selectedOutfit !== 'none') {
      const backArtboard = rive.getBindableArtboard(`clothes_back_${selectedOutfit}`);
      const frontArtboard = rive.getBindableArtboard(`clothes_front_${selectedOutfit}`);
      if (backArtboard) setClothesBack(backArtboard);
      if (frontArtboard) setClothesFront(frontArtboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rive, setClothesBack, setClothesFront]);

  // Auto wag on load
  useEffect(() => {
    if (wagTail) {
      const timeout = setTimeout(() => wagTail(), 800);
      return () => clearTimeout(timeout);
    }
  }, [wagTail]);

  const triggerAnimation = () => {
    wagTail?.();
    tapTongue?.();
  };

  const handleOutfitChange = (outfitId: string) => {
    setSelectedOutfit(outfitId);

    if (rive) {
      if (outfitId === 'none') {
        // Clear outfit by setting to inner_default
        const defaultArtboard = rive.getBindableArtboard('inner_default');
        if (defaultArtboard) {
          setClothesBack(defaultArtboard);
          setClothesFront(defaultArtboard);
        }
      } else {
        const backName = `clothes_back_${outfitId}`;
        const frontName = `clothes_front_${outfitId}`;
        const backArtboard = rive.getBindableArtboard(backName);
        const frontArtboard = rive.getBindableArtboard(frontName);
        console.log('Outfit change:', { outfitId, backName, frontName, backArtboard, frontArtboard });
        if (backArtboard) setClothesBack(backArtboard);
        if (frontArtboard) setClothesFront(frontArtboard);
      }
    }

    triggerAnimation();
  };

  const handleHatChange = (hatId: string) => {
    setSelectedHat(hatId);

    if (rive) {
      if (hatId === 'none') {
        // Clear hat by setting to inner_default
        const defaultArtboard = rive.getBindableArtboard('inner_default');
        if (defaultArtboard) {
          setHatFront(defaultArtboard);
        }
      } else {
        const hatName = `hat_front_${hatId}`;
        const hatArtboard = rive.getBindableArtboard(hatName);
        console.log('Hat change:', { hatId, hatName, hatArtboard });
        if (hatArtboard) setHatFront(hatArtboard);
      }
    }

    triggerAnimation();
  };

  const handleCollarChange = (collarId: string) => {
    setSelectedCollar(collarId);
    const color = COLLAR_COLORS.find((c) => c.id === collarId);
    if (color && setCollarRgb) {
      setCollarRgb(color.r, color.g, color.b);
    }
    triggerAnimation();
  };

  const tabs = [
    { id: 'collar' as TabType, label: t('home.dressUp.tabs.collar'), icon: <Palette className="h-4 w-4" /> },
    { id: 'outfit' as TabType, label: t('home.dressUp.tabs.outfit'), icon: <Shirt className="h-4 w-4" /> },
    { id: 'hat' as TabType, label: t('home.dressUp.tabs.hat'), icon: <Crown className="h-4 w-4" /> },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {t('home.dressUp.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('home.dressUp.description')}
        </p>
      </motion.div>

      {/* Wuzu Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto w-72 h-72 mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 rounded-3xl" />
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={triggerAnimation}
        >
          <RiveComponent />
        </div>

        {/* Current outfit indicator */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="px-3 py-1 bg-card border border-border rounded-full text-sm shadow-sm">
            🐕
            {selectedOutfit !== 'none' &&
              ` + ${OUTFITS.find((o) => o.id === selectedOutfit)?.emoji}`}
            {selectedHat !== 'none' &&
              ` + ${HATS.find((h) => h.id === selectedHat)?.emoji}`}
          </span>
        </div>
      </motion.div>

      {/* Customization Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 gap-2"
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[100px]">
          {activeTab === 'outfit' && (
            <div className="grid grid-cols-3 gap-3">
              {OUTFITS.map((outfit) => (
                <button
                  key={outfit.id}
                  onClick={() => handleOutfitChange(outfit.id)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedOutfit === outfit.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{outfit.emoji}</div>
                  <div className="text-sm text-foreground">{t(`home.dressUp.outfits.${outfit.id}`)}</div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'hat' && (
            <div className="grid grid-cols-3 gap-3">
              {HATS.map((hat) => (
                <button
                  key={hat.id}
                  onClick={() => handleHatChange(hat.id)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedHat === hat.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{hat.emoji}</div>
                  <div className="text-sm text-foreground">{t(`home.dressUp.hats.${hat.id}`)}</div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'collar' && (
            <div className="flex flex-wrap justify-center gap-3">
              {COLLAR_COLORS.map((collar) => (
                <button
                  key={collar.id}
                  onClick={() => handleCollarChange(collar.id)}
                  className={`w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
                    selectedCollar === collar.id
                      ? 'border-foreground scale-110'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: collar.color }}
                  title={t(`home.dressUp.colors.${collar.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          💡 {t('home.dressUp.tip')}
        </p>
      </motion.div>
    </div>
  );
};

export default WuzuDressUp;
