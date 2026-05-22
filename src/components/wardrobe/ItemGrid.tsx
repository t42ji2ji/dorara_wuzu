import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { CategoryId } from './CategoryTabs';
import {
  ANIMALS,
  EQUIPMENT_CATEGORIES,
  COLLAR_COLORS,
  EYE_COLORS,
} from '@/data/manifest';
import type { EquipmentState, Mood } from './useWuzuAvatar';

const MOODS: { id: Mood; emoji: string; labelEn: string; labelZh: string }[] = [
  { id: 'idle', emoji: '😊', labelEn: 'Idle', labelZh: '日常' },
  { id: 'happy', emoji: '😄', labelEn: 'Happy', labelZh: '開心' },
  { id: 'sad', emoji: '😢', labelEn: 'Sad', labelZh: '難過' },
  { id: 'angry', emoji: '😠', labelEn: 'Angry', labelZh: '生氣' },
];

interface ItemGridProps {
  category: CategoryId;
  animal: string;
  mood: Mood;
  equipment: EquipmentState;
  onAnimalChange: (animalId: string) => void;
  onMoodChange: (mood: Mood) => void;
  onEquipmentChange: (category: string, itemId: string) => void;
  onCollarColorChange: (colorId: string) => void;
  onEyeColorChange: (colorId: string) => void;
}

const ItemGrid = ({
  category,
  animal,
  mood,
  equipment,
  onAnimalChange,
  onMoodChange,
  onEquipmentChange,
  onCollarColorChange,
  onEyeColorChange,
}: ItemGridProps) => {
  const { i18n } = useTranslation();
  const isZh = i18n.language?.startsWith('zh');

  // Mood grid
  if (category === 'mood') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MOODS.map((m, idx) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            onClick={() => onMoodChange(m.id)}
            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 text-center ${
              mood === m.id
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="text-2xl mb-1">{m.emoji}</div>
            <div className="text-sm font-medium text-foreground">
              {isZh ? m.labelZh : m.labelEn}
            </div>
          </motion.button>
        ))}
      </div>
    );
  }

  // Collar color grid
  if (category === 'collar') {
    return (
      <div className="flex flex-wrap justify-center gap-3 py-4">
        {COLLAR_COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => onCollarColorChange(color.id)}
            className={`w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
              equipment.collarColorId === color.id
                ? 'border-foreground scale-110 shadow-lg'
                : 'border-transparent hover:border-muted-foreground/30'
            }`}
            style={{ backgroundColor: color.color }}
          />
        ))}
      </div>
    );
  }

  // Eye color grid
  if (category === 'eye') {
    return (
      <div className="flex flex-wrap justify-center gap-3 py-4">
        {EYE_COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => onEyeColorChange(color.id)}
            className={`w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
              equipment.eyeColorId === color.id
                ? 'border-foreground scale-110 shadow-lg'
                : 'border-transparent hover:border-muted-foreground/30'
            }`}
            style={{ backgroundColor: color.color }}
          />
        ))}
      </div>
    );
  }

  // Animal grid
  if (category === 'animal') {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {ANIMALS.map((a, idx) => (
          <motion.button
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.02 }}
            onClick={() => onAnimalChange(a.id)}
            className={`p-3 rounded-xl border-2 transition-all hover:scale-105 text-center ${
              animal === a.id
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="text-sm font-medium text-foreground truncate">
              {isZh ? a.i18n.zh : a.i18n.en}
            </div>
          </motion.button>
        ))}
      </div>
    );
  }

  // Equipment category grid
  const categoryData = EQUIPMENT_CATEGORIES.find((c) => c.key === category);
  if (!categoryData) return null;

  const selectedItemId = equipment[category as keyof EquipmentState] as string;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
      {categoryData.items.map((item, idx) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: idx * 0.02 }}
          onClick={() => onEquipmentChange(category, item.id)}
          className={`p-3 rounded-xl border-2 transition-all hover:scale-105 text-center ${
            selectedItemId === item.id
              ? 'border-primary bg-primary/10 shadow-md'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="text-sm font-medium text-foreground truncate">
            {isZh ? item.i18n.zh : item.i18n.en}
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ItemGrid;
