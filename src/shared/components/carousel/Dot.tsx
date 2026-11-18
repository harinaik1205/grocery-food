import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../utils/constants';
import { FC } from 'react';

interface DotProps {
  index: number;
  paginationIndex: number;
}

const Dot: FC<DotProps> = ({ index, paginationIndex }) => {
  return (
    <View style={paginationIndex === index ? styles.dot : styles.dotOpacity} />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: COLORS.brand,
    height: 3,
    width: 12,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  dotOpacity: {
    backgroundColor: COLORS.white,
    height: 3,
    width: 12,
    marginHorizontal: 2,
    borderRadius: 8,
    opacity: 0.5,
  },
});
