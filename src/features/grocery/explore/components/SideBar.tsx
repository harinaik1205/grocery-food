import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { categories, FONTS } from '../../../../shared/utils/constants';
import { GROCERY_COLOR_THEM } from '../../../../shared/utils/theme';

// Blinkit-style active state colors (swap with your theme values if you have them)
const ACTIVE_COLORS = {
  accent: '#0C831F', // green bar on the right edge
  itemBgInactive: 'rgba(232, 245, 233, 0)',
  itemBgActive: 'rgba(232, 245, 233, 1)',
  circleBgInactive: '#F6F1EC', // your original circle color
  circleBgActive: '#D7EDDB',
};

type CategoryItemProps = {
  name: string;
  image: ImageSourcePropType;
  isActive: boolean;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

const CategoryItem = ({
  name,
  image,
  isActive,
  onPress,
  onLayout,
}: CategoryItemProps) => {
  // 0 = inactive, 1 = active
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }, [isActive, progress]);

  const itemBgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [ACTIVE_COLORS.itemBgInactive, ACTIVE_COLORS.itemBgActive],
    ),
  }));

  const barStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scaleY: progress.value }],
  }));

  const circleStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [ACTIVE_COLORS.circleBgInactive, ACTIVE_COLORS.circleBgActive],
    ),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.06]) }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.65, 1]),
  }));

  return (
    <Pressable
      style={styles.categoryContianer}
      onLayout={onLayout}
      onPress={onPress}
    >
      {/* Active background (sits behind the content, doesn't affect layout) */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill]} />
      {/* Active accent bar on the right edge */}
      <Animated.View
        pointerEvents="none"
        style={[styles.activeBar, barStyle]}
      />

      <Animated.View style={[styles.categoryImgContainer, circleStyle]}>
        <Image source={image} style={[styles.categoryImg]} />
      </Animated.View>
      <Animated.Text
        style={[styles.categoryName, { fontFamily: FONTS.bold }, labelStyle]}
      >
        {name}
      </Animated.Text>
    </Pressable>
  );
};

const SideBar = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef); // always knows the current scroll position
  const targetY = useSharedValue(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  // y-position of each category, measured via onLayout
  const itemPositions = useRef<number[]>([]);
  const contentHeight = useRef(0);
  const viewHeight = useRef(0);

  // Every time targetY changes (animated), scroll the ScrollView to that offset
  useDerivedValue(() => {
    scrollTo(scrollRef, 0, targetY.value, false);
  });

  const handleCategoryPress = (index: number) => {
    setSelectedIndex(index);

    const maxScroll = Math.max(contentHeight.current - viewHeight.current, 0);
    const y = Math.min(
      Math.max(itemPositions.current[index] ?? 0, 0),
      maxScroll,
    );

    // start the animation from where the user currently is (in case they scrolled manually)
    targetY.value = scrollOffset.value;
    targetY.value = withTiming(y, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  };

  return (
    <View style={styles.aside}>
      <Animated.ScrollView
        ref={scrollRef}
        onLayout={(e: LayoutChangeEvent) => {
          viewHeight.current = e.nativeEvent.layout.height;
        }}
        onContentSizeChange={(_, h) => {
          contentHeight.current = h;
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View>
          {categories.map((category, index) => {
            return (
              <CategoryItem
                key={index}
                name={category.name}
                image={category.image}
                isActive={index === selectedIndex}
                onLayout={(e: LayoutChangeEvent) => {
                  itemPositions.current[index] = e.nativeEvent.layout.y;
                }}
                onPress={() => handleCategoryPress(index)}
              />
            );
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  categoryContianer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  categoryImgContainer: {
    borderRadius: 100,
    height: 80,
    // marginBottom: 10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F1EC',
  },
  categoryImg: {
    width: 50,
    height: 50,
    // resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: GROCERY_COLOR_THEM.ink,
    textAlign: 'center',
  },
  activeBar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: ACTIVE_COLORS.accent,
  },
  aside: {
    width: '24%',
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowColor: GROCERY_COLOR_THEM.ink,
    elevation: 2,
    paddingBottom: 50,
  },
});
