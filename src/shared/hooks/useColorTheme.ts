import { useAppSelector } from '../../store/hooks';
import { FOOD_COLOR_THEME, GROCERY_COLOR_THEM } from '../utils/theme';

export const useColorTheme = () => {
  const { currentVertical } = useAppSelector(state => state.app);

  return currentVertical === 'grocery' ? GROCERY_COLOR_THEM : FOOD_COLOR_THEME;
};
