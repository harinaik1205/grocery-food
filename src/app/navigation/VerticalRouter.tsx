import { useAppSelector } from '../../store/hooks';
import { verticalRegistry } from '../verticals/verticalRegistry';

const VerticalRouter = () => {
  const vertical = useAppSelector(state => state.app.currentVertical);
  const VerticalNavigation = verticalRegistry[vertical].navigation;
  return <VerticalNavigation />;
};

export default VerticalRouter;
