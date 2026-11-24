export const FOOD_COLOR_THEME = {
  brand: '#0F5257', // deep teal: header, active Food tab, links
  brandDark: '#0A3B3F', // status strip
  brandTint: 'rgba(15, 82, 87, 0.04)',
  brandLight: '#E3F1EF',
  leaf: '#1E9E5A', // logo leaf (unchanged)
  ink: '#14292A',
  muted: '#5B6B6A',
  placeholder: '#757575',
  white: '#FFFFFF',
  border: '#E9E0D3',
  divider: '#DCE5E3',
  overlay: 'rgba(255, 255, 255, 0.08)',

  // added keys
  background: '#FFF8EE', // page background (cream)
  surface: '#FFFFFF', // cards, tab bar
  surfaceAlt: '#F6ECDD', // warm neutral panels
  tint: '#E3F1EF', // cuisine circles, image areas, active tab highlight
  tintAlt: '#CFE6E3', // alternate light teal
  accent: '#FF6F59', // coral: cart pill, key offer, badges (the 10%)
  accentDark: '#E5503C', // hearts and small icons on white
  onAccent: '#14292A', // dark text on coral (white fails contrast)
  success: '#15803D', // ratings, veg mark, free delivery
  successTint: '#E3F4EA',
} as const;

export const GROCERY_COLOR_THEM = {
  brand: '#D93417',
  brandDark: '#A82A12',
  brandLight: '#FFE4DC',
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
