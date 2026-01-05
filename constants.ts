
import { DrinkVariant, BrandConfig } from './types';

export const BRAND_CONFIG: BrandConfig = {
  companyName: 'Cove Soda',
  companyDescription: 'The world’s first plastic-neutral, functional soda made with organic ingredients and zero sugar.',
  theme: 'Dark Mode Only',
  primaryColor: '#FFFFFF',
};

export const DRINK_VARIANTS: DrinkVariant[] = [
  {
    id: 'grape',
    name: 'COVE SODA GRAPE',
    subtitle: 'BOLD & REFRESHING',
    description: 'A nostalgic burst of grape flavor powered by organic ingredients and zero sugar. The ultimate functional refreshment.',
    themeColor: '#8B5CF6',
    accentColor: '#C4B5FD',
    frameCount: 60,
    sequencePath: '/images/cove-grape-splash.png',
    heroImage: '/images/cove-grape-splash.png',
  },
  {
    id: 'cherry',
    name: 'OLIPOP CHERRY COLA',
    subtitle: 'A New Kind of Soda',
    description: 'Classic cherry cola flavor reimagined with prebiotics, plant fiber, and botanicals. Digestive health meets nostalgic taste.',
    themeColor: '#EF4444',
    accentColor: '#FCA5A5',
    frameCount: 60,
    sequencePath: '/images/olipop-cherry.png',
    heroImage: '/images/olipop-cherry.png',
  },
  {
    id: 'orange',
    name: 'CULTURE POP ORANGE MANGO',
    subtitle: 'Fizzy Probiotic Delight',
    description: 'Bright citrus fusion with live probiotics and real fruit extracts. Sunshine in a can with gut-friendly benefits.',
    themeColor: '#F97316',
    accentColor: '#FDBA74',
    frameCount: 60,
    sequencePath: '/images/culture-pop-orange.png',
    heroImage: '/images/culture-pop-orange.png',
  },
];

export const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Creative', href: '#creative' },
  { label: 'Nutrition', href: '#nutrition' },
];
