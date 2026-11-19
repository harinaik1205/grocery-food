export const COLORS = {
  brand: '#D93417',
  brandDark: '#C42E12',
  brandTint: 'rgba(217, 52, 23, 0.04)',
  leaf: '#1E9E5A',
  ink: '#1F1A17',
  muted: '#6B625C',
  placeholder: '#757575',
  white: '#FFFFFF',
  border: '#D9CEC5',
  divider: '#E7DED6',
  overlay: 'rgba(255, 255, 255, 0.08)',
} as const;

export const FONTS = {
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
  extraLight: 'PlusJakartaSans-ExtraLight',
  light: 'PlusJakartaSans-Light',
  medium: 'PlusJakartaSans-Medium',
  regular: 'PlusJakartaSans-Regular',
  semiBold: 'PlusJakartaSans-SemiBold',
};

export const banners = [
  require('../../assets/images/Banner 1 — Fresh produce.png'),
  require('../../assets/images/Banner 2 — Breakfast.png'),
  require('../../assets/images/Banner 3 — First order coupon.png'),
  require('../../assets/images/Banner 4 — Snacks & drinks.png'),
  require('../../assets/images/Banner 5 — Food cross-sell.png'),
  require('../../assets/images/Banner 6 — Pantry staples.png'),
];

export const categories = [
  {
    id: 1,
    name: 'Milk, Curd & Paneer',
    image: require('../../assets/category/1.png'),
    // products: productsList
  },
  {
    id: 2,
    name: 'Pharma & Wellness',
    image: require('../../assets/category/2.png'),
  },
  {
    id: 3,
    name: 'Vegetables & Fruits',
    image: require('../../assets/category/3.png'),
  },
  {
    id: 4,
    name: 'Munchies',
    image: require('../../assets/category/4.png'),
  },
  {
    id: 5,
    name: 'Home & Office',
    image: require('../../assets/category/5.png'),
  },
  {
    id: 6,
    name: 'Baby Care',
    image: require('../../assets/category/6.png'),
  },
  {
    id: 7,
    name: 'Ata, Rice & Dal',
    image: require('../../assets/category/7.png'),
  },
  {
    id: 8,
    name: 'Cleaning Essentials',
    image: require('../../assets/category/8.png'),
  },
];
