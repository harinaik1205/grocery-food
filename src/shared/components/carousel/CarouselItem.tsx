import {
  Dimensions,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { FC } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CarouselItemProps {
  item: any;
  index: number;
  x: SharedValue<number>;
}

const CarouselItem: FC<CarouselItemProps> = ({ item, index, x }) => {
  const { width } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    const opacityAnim = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-0.3, 1, -0.3],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacityAnim,
    };
  });
  return (
    <View style={{ width }}>
      <Animated.Image source={item} style={[styles.img, animatedStyle]} />
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  img: {
    width: '95%',
    height: 194,
    alignSelf: 'center',
    objectFit: 'cover',
  },
});
