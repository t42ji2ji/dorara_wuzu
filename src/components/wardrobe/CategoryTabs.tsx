import { Button } from '@/components/ui/button';
import {
  Dog,
  Shirt,
  Crown,
  Palette,
  Eye,
  Layers,
  Smile,
  Sparkles,
  ImageIcon,
  Frame,
  Heart,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type CategoryId =
  | 'animal'
  | 'mood'
  | 'outfit'
  | 'hat'
  | 'inner'
  | 'facial'
  | 'blush'
  | 'background'
  | 'foreground'
  | 'collar'
  | 'eye';

interface CategoryTabsProps {
  activeCategory: CategoryId;
  onChange: (category: CategoryId) => void;
}

const CATEGORY_CONFIG: { id: CategoryId; icon: React.ReactNode; labelEn: string; labelZh: string }[] = [
  { id: 'animal', icon: <Dog className="h-4 w-4" />, labelEn: 'Character', labelZh: '角色' },
  { id: 'mood', icon: <Heart className="h-4 w-4" />, labelEn: 'Mood', labelZh: '心情' },
  { id: 'outfit', icon: <Shirt className="h-4 w-4" />, labelEn: 'Outfit', labelZh: '服裝' },
  { id: 'hat', icon: <Crown className="h-4 w-4" />, labelEn: 'Hat', labelZh: '帽子' },
  { id: 'inner', icon: <Layers className="h-4 w-4" />, labelEn: 'Inner', labelZh: '內搭' },
  { id: 'facial', icon: <Smile className="h-4 w-4" />, labelEn: 'Facial', labelZh: '臉部' },
  { id: 'blush', icon: <Sparkles className="h-4 w-4" />, labelEn: 'Blush', labelZh: '腮紅' },
  { id: 'background', icon: <ImageIcon className="h-4 w-4" />, labelEn: 'BG', labelZh: '背景' },
  { id: 'foreground', icon: <Frame className="h-4 w-4" />, labelEn: 'FG', labelZh: '前景' },
  { id: 'collar', icon: <Palette className="h-4 w-4" />, labelEn: 'Collar', labelZh: '項圈' },
  { id: 'eye', icon: <Eye className="h-4 w-4" />, labelEn: 'Eye', labelZh: '眼睛' },
];

const CategoryTabs = ({ activeCategory, onChange }: CategoryTabsProps) => {
  const { i18n } = useTranslation();
  const isZh = i18n.language?.startsWith('zh');

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORY_CONFIG.map((cat) => (
        <Button
          key={cat.id}
          variant={activeCategory === cat.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(cat.id)}
          className="flex-shrink-0 gap-1.5 text-xs"
        >
          {cat.icon}
          <span className="hidden sm:inline">{isZh ? cat.labelZh : cat.labelEn}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryTabs;
