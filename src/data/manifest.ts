// Avatar manifest data derived from Wuzu app's manifest.json
// Categories and items for the wardrobe system

export interface ManifestItem {
  id: string;
  i18n: { en: string; zh: string };
}

export interface ManifestCategory {
  key: string;
  labelEn: string;
  labelZh: string;
  items: ManifestItem[];
}

export const ANIMALS: ManifestItem[] = [
  { id: 'dog', i18n: { en: 'Dog', zh: '狗狗' } },
  { id: 'cat', i18n: { en: 'Cat', zh: '小貓' } },
  { id: 'bear', i18n: { en: 'Bear', zh: '小熊' } },
  { id: 'maltese', i18n: { en: 'Maltese', zh: '瑪爾濟斯' } },
  { id: 'fox', i18n: { en: 'Fox', zh: '小狐狸' } },
  { id: 'gsd', i18n: { en: 'German Shepherd', zh: '德國牧羊犬' } },
  { id: 'wolf', i18n: { en: 'Wolf', zh: '狼' } },
  { id: 'calico', i18n: { en: 'Calico Cat', zh: '三花貓' } },
  { id: 'tiger', i18n: { en: 'Tiger', zh: '老虎' } },
  { id: 'rabbit', i18n: { en: 'Rabbit', zh: '兔子' } },
  { id: 'groundhog', i18n: { en: 'Groundhog', zh: '土撥鼠' } },
  { id: 'mouse', i18n: { en: 'Mouse', zh: '老鼠' } },
  { id: 'octopus', i18n: { en: 'Octopus', zh: '章魚' } },
  { id: 'seal', i18n: { en: 'Seal', zh: '海豹' } },
  { id: 'duck', i18n: { en: 'Duck', zh: '鴨子' } },
  { id: 'himalayan', i18n: { en: 'Himalayan', zh: '喜馬拉雅貓' } },
  { id: 'raccoon', i18n: { en: 'Raccoon', zh: '浣熊' } },
  { id: 'mallard', i18n: { en: 'Mallard', zh: '綠頭鴨' } },
];

export const EQUIPMENT_CATEGORIES: ManifestCategory[] = [
  {
    key: 'outfit',
    labelEn: 'Outfit',
    labelZh: '服裝',
    items: [
      { id: 'default', i18n: { en: 'Default', zh: '預設' } },
      { id: 'rain_coat', i18n: { en: 'Rain Coat', zh: '雨衣' } },
      { id: 'hood', i18n: { en: 'Hood', zh: '連帽衫' } },
      { id: 'witch', i18n: { en: 'Witch', zh: '女巫裝' } },
      { id: 'boy', i18n: { en: 'Boy', zh: '男孩裝' } },
      { id: 'detective', i18n: { en: 'Detective', zh: '偵探裝' } },
      { id: 'cowboy', i18n: { en: 'Cowboy', zh: '牛仔裝' } },
      { id: 'unicorn', i18n: { en: 'Unicorn', zh: '獨角獸裝' } },
      { id: 'pinky', i18n: { en: 'Pinky', zh: '粉紅泡泡裝' } },
      { id: 'winter', i18n: { en: 'Winter', zh: '冬裝' } },
      { id: 'newyear', i18n: { en: 'New Year', zh: '新年裝' } },
      { id: 'painter', i18n: { en: 'Painter', zh: '畫家裝' } },
      { id: 'demon', i18n: { en: 'Demon', zh: '惡魔裝' } },
      { id: 'boy2', i18n: { en: 'Boy 2', zh: '男孩裝2' } },
      { id: 'student', i18n: { en: 'Student', zh: '學生裝' } },
      { id: 'student2', i18n: { en: 'Student 2', zh: '學生裝2' } },
      { id: 'bee', i18n: { en: 'Bee', zh: '蜜蜂裝' } },
      { id: 'summer', i18n: { en: 'Summer', zh: '夏日裝' } },
      { id: 'frog', i18n: { en: 'Frog', zh: '青蛙裝' } },
      { id: 'alfred', i18n: { en: 'Alfred', zh: '乾淨裝' } },
      { id: 'student3', i18n: { en: 'Student 3', zh: '學生裝3' } },
      { id: 'cyberpunk', i18n: { en: 'Cyberpunk', zh: '賽博龐克裝' } },
      { id: 'angel', i18n: { en: 'Angel', zh: '天使裝' } },
      { id: 'plant', i18n: { en: 'Plant', zh: '植物裝' } },
    ],
  },
  {
    key: 'hat',
    labelEn: 'Hat',
    labelZh: '帽子',
    items: [
      { id: 'default', i18n: { en: 'Default', zh: '預設' } },
      { id: 'rain_coat', i18n: { en: 'Rain Hat', zh: '雨帽' } },
      { id: 'hood', i18n: { en: 'Hood', zh: '兜帽' } },
      { id: 'witch', i18n: { en: 'Witch Hat', zh: '女巫帽' } },
      { id: 'boy', i18n: { en: 'Cap', zh: '鴨舌帽' } },
      { id: 'detective', i18n: { en: 'Detective Hat', zh: '偵探帽' } },
      { id: 'cowboy', i18n: { en: 'Cowboy Hat', zh: '牛仔帽' } },
      { id: 'pinky', i18n: { en: 'Pinky Hat', zh: '粉紅泡泡帽' } },
      { id: 'newyear', i18n: { en: 'New Year Hat', zh: '新年帽' } },
      { id: 'painter', i18n: { en: 'Painter Beret', zh: '畫家貝雷帽' } },
      { id: 'orange', i18n: { en: 'Orange Hat', zh: '柳橙帽' } },
      { id: 'demon', i18n: { en: 'Demon Horns', zh: '惡魔角' } },
      { id: 'boy2', i18n: { en: 'Boy Cap 2', zh: '鴨舌帽2' } },
      { id: 'student', i18n: { en: 'Student Hat', zh: '學生帽' } },
      { id: 'student2', i18n: { en: 'Student Hat 2', zh: '學生帽2' } },
      { id: 'bee', i18n: { en: 'Bee Antenna', zh: '蜜蜂觸角' } },
      { id: 'summer', i18n: { en: 'Summer Hat', zh: '夏日帽' } },
      { id: 'frog', i18n: { en: 'Frog Hat', zh: '青蛙帽' } },
      { id: 'student3', i18n: { en: 'Student Hat 3', zh: '學生帽3' } },
      { id: 'angel', i18n: { en: 'Angel Halo', zh: '天使光環' } },
      { id: 'plant', i18n: { en: 'Plant Hat', zh: '植物帽' } },
      { id: 'plant2', i18n: { en: 'Plant Hat 2', zh: '植物帽2' } },
    ],
  },
  {
    key: 'inner',
    labelEn: 'Inner',
    labelZh: '內搭',
    items: [
      { id: 'default', i18n: { en: 'Default', zh: '預設' } },
      { id: 'boy', i18n: { en: 'Boy', zh: '男孩' } },
      { id: 'detective', i18n: { en: 'Detective', zh: '偵探' } },
      { id: 'cowboy', i18n: { en: 'Cowboy', zh: '牛仔' } },
      { id: 'unicorn', i18n: { en: 'Unicorn', zh: '獨角獸' } },
      { id: 'winter', i18n: { en: 'Winter', zh: '冬天' } },
      { id: 'newyear', i18n: { en: 'New Year', zh: '新年' } },
      { id: 'painter', i18n: { en: 'Painter', zh: '畫家' } },
      { id: 'bee', i18n: { en: 'Bee', zh: '蜜蜂' } },
      { id: 'cyberpunk', i18n: { en: 'Cyberpunk', zh: '賽博龐克' } },
    ],
  },
  {
    key: 'facial',
    labelEn: 'Facial',
    labelZh: '臉部',
    items: [
      { id: 'default', i18n: { en: 'Default', zh: '預設' } },
      { id: 'boy', i18n: { en: 'Boy', zh: '男孩' } },
      { id: 'detective', i18n: { en: 'Detective', zh: '偵探' } },
      { id: 'cowboy', i18n: { en: 'Cowboy', zh: '牛仔' } },
      { id: 'unicorn', i18n: { en: 'Unicorn', zh: '獨角獸' } },
      { id: 'boy2', i18n: { en: 'Boy 2', zh: '男孩2' } },
      { id: 'student', i18n: { en: 'Student', zh: '學生' } },
      { id: 'clown', i18n: { en: 'Clown', zh: '小丑' } },
      { id: 'alfred', i18n: { en: 'Alfred', zh: '乾淨' } },
      { id: 'cyberpunk', i18n: { en: 'Cyberpunk', zh: '賽博龐克' } },
      { id: 'angel', i18n: { en: 'Angel', zh: '天使' } },
    ],
  },
  {
    key: 'blush',
    labelEn: 'Blush',
    labelZh: '腮紅',
    items: [
      { id: 'default', i18n: { en: 'Default', zh: '預設' } },
      { id: 'rain_coat', i18n: { en: 'Rain', zh: '雨天' } },
      { id: 'hood', i18n: { en: 'Hood', zh: '連帽' } },
      { id: 'witch', i18n: { en: 'Witch', zh: '女巫' } },
      { id: 'boy', i18n: { en: 'Boy', zh: '男孩' } },
      { id: 'cowboy', i18n: { en: 'Cowboy', zh: '牛仔' } },
      { id: 'pinky', i18n: { en: 'Pinky', zh: '粉紅泡泡' } },
      { id: 'painter', i18n: { en: 'Painter', zh: '畫家' } },
    ],
  },
  {
    key: 'background',
    labelEn: 'Background',
    labelZh: '背景',
    items: [
      { id: 'default', i18n: { en: 'Default', zh: '預設' } },
      { id: 'rain_coat', i18n: { en: 'Rain', zh: '雨天' } },
      { id: 'hood', i18n: { en: 'Hood', zh: '連帽' } },
      { id: 'witch', i18n: { en: 'Witch', zh: '女巫' } },
    ],
  },
  {
    key: 'foreground',
    labelEn: 'Foreground',
    labelZh: '前景',
    items: [
      { id: 'default', i18n: { en: 'Default', zh: '預設' } },
      { id: 'rain_coat', i18n: { en: 'Rain', zh: '雨天' } },
      { id: 'witch', i18n: { en: 'Witch', zh: '女巫' } },
      { id: 'boy', i18n: { en: 'Boy', zh: '男孩' } },
      { id: 'detective', i18n: { en: 'Detective', zh: '偵探' } },
    ],
  },
];

// Macaron-style collar colors (from Flutter CollarColorSelector)
export const COLLAR_COLORS = [
  { id: 'blue', color: '#5EAAE8', r: 94, g: 170, b: 232 },
  { id: 'pink', color: '#F8B4C4', r: 248, g: 180, b: 196 },
  { id: 'mint', color: '#B4E4C9', r: 180, g: 228, b: 201 },
  { id: 'cream', color: '#F9E4B4', r: 249, g: 228, b: 180 },
  { id: 'lavender', color: '#D4B4E8', r: 212, g: 180, b: 232 },
  { id: 'peach', color: '#F8C4A4', r: 248, g: 196, b: 164 },
];

// Eye colors (from Flutter EyeColorSelector)
export const EYE_COLORS = [
  { id: 'green', color: '#94B566', r: 148, g: 181, b: 102 },
  { id: 'blue', color: '#577BE7', r: 87, g: 123, b: 231 },
  { id: 'sky', color: '#85BFEB', r: 133, g: 191, b: 235 },
  { id: 'pink', color: '#F0A3C0', r: 240, g: 163, b: 192 },
  { id: 'gray', color: '#A8A593', r: 168, g: 165, b: 147 },
  { id: 'brown', color: '#302727', r: 48, g: 39, b: 39 },
  { id: 'gold', color: '#FFB530', r: 255, g: 181, b: 48 },
];

// Artboard name mappings for Rive data binding
// Each equipment category maps to specific artboard property names
export const ARTBOARD_BINDINGS: Record<string, string[]> = {
  outfit: ['clothes_back', 'clothes_front'],
  hat: ['hat_front', 'hat_back'],
  inner: ['inner'],
  facial: ['facial'],
  blush: ['blush'],
  background: ['background'],
  foreground: ['foreground'],
};

export const RIVE_CDN_URL = 'https://r2wuzu.dorara.app/rive/wuzu_v1.riv';
