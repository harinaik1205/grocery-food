import { ProductItemType } from '../types';

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

export const categoriesData = [
  {
    title: 'Grocery & Kitchen',
    data: [
      {
        name: 'Vegetables & Fruits',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_V7_312x360_1776063046796',
      },
      {
        name: 'Atta, Rice & Dal',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_atta,_rice_&_dal_1697023078302',
      },
      {
        name: 'Oil, Ghee & Masala',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Oil,_ghee_&_masala_1697023177309',
      },
      {
        name: 'Dairy & Bread',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Dairy,_bread_&_eggs_1697439479199',
      },
      {
        name: 'Bakery & Biscuits',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Biscuits_&_bakery_1697023878012',
      },
      {
        name: 'Dry Fruits & Cereals',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Dry_Fruits_&_Cereals_(1)_1727547591238',
      },
      {
        name: 'Chicken, Meat & Fish',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_chicken,_meat_&_fish_1697025365538',
      },
      {
        name: 'Kitchenware & Appliances',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Kitchen_Utensils_&_1697802997422',
      },
    ],
  },

  {
    title: 'Snacks & Drinks',
    data: [
      {
        name: 'Chips & Namkeen',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_V1_0_1782816119615',
      },
      {
        name: 'Sweets & Chocolates',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Sweets_&_chocolates_1697025717829',
      },
      {
        name: 'Drinks & Juices',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_V7_312x360_(2)_1774455548692',
      },
      {
        name: 'Tea, Coffee & Milk Drinks',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_L0_v1_0_1746557294148',
      },
      {
        name: 'Instant Food',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Instant_Food_(2)_1766127254031',
      },
      {
        name: 'Sauces & Spreads',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_sauces_&_spreads_1697025783179',
      },
      {
        name: 'Paan Corner',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_312x360_(1)_1750440200815',
      },
      {
        name: 'Ice Creams & More',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_V7_312x360_(1)_1763118369111',
      },
    ],
  },

  {
    title: 'Beauty & Personal Care',
    data: [
      {
        name: 'Bath & Body',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Bath_&_Body_1697028879274',
      },
      {
        name: 'Hair',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Hair_1697025936187',
      },
      {
        name: 'Skin & Face',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Skin_&_face_(1)_1710665369044',
      },
      {
        name: 'Beauty & Cosmetics',
        image:
          'http://cdn.grofers.com/app/images/collections/asset_Beauty_&_Cosmetics_1714732446632',
      },
      {
        name: 'Feminine Hygiene',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Feminine_hygiene_1697028415717',
      },
      {
        name: 'Baby Care',
        image:
          'http://cdn.grofers.com/app/images/collections/asset_V7_312x360_1778246752991',
      },
      {
        name: 'Health & Pharma',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Health_&_pharma_1697028551531',
      },
      {
        name: 'Sexual Wellness',
        image:
          'http://cdn.grofers.com/app/images/collections/asset_Sexual_wellness_1697028588156',
      },
    ],
  },
  {
    title: 'Household Essentials',
    data: [
      {
        name: 'Home & Lifestyle',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_312x360_(2)_1752670450422',
      },
      {
        name: 'Cleaners & Repellents',
        image:
          'https://cdn.grofers.com/app/images/collections/asset_Cleaning_&_repellants-3_1711101791295',
      },
      {
        name: 'Electronics',
        image:
          'http://cdn.grofers.com/app/images/collections/asset_Electronics_1697028762316',
      },
      {
        name: 'Stationery & Games',
        image:
          'http://cdn.grofers.com/app/images/collections/asset_Stationery_&_Games_1698999971211',
      },
    ],
  },
];

export const productsList: ProductItemType[] = [
  {
    id: 1,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',
    price: 34,
    discountPrice: 38,
    quantity: '500 ml',
  },
  {
    id: 2,
    name: 'Gowardhan Panner',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/123007a.jpg?ts=1688973208',
    price: 89,
    discountPrice: 99,
    quantity: '200 gm',
  },
  {
    id: 3,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',
    price: 34,
    discountPrice: 45,
    quantity: '500 ml',
  },
  {
    id: 4,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',
    price: 34,
    discountPrice: 45,
    quantity: '500 ml',
  },
  {
    id: 5,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',
    price: 34,
    discountPrice: 45,
    quantity: '500 ml',
  },
  {
    id: 6,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',

    price: 34,
    discountPrice: 45,
    quantity: '500 ml',
  },
  {
    id: 7,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',
    price: 34,
    discountPrice: 45,
    quantity: '500 ml',
  },
  {
    id: 8,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',
    price: 34,
    discountPrice: 45,
    quantity: '500 ml',
  },
  {
    id: 9,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',
    price: 34,
    discountPrice: 45,
    quantity: '500 ml',
  },
  {
    id: 10,
    name: 'Amul Gold Full Cream Fresh Milk',
    image:
      'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142',
    price: 34,
    discountPrice: 45,
    quantity: '500 ml',
  },
];
