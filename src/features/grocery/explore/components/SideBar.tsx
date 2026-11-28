import {
  ScrollView,
  ScrollViewInstance,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { GROCERY_COLOR_THEM } from '../../../../shared/utils/theme';
import { FONTS } from '../../../../shared/utils/constants';

interface SidebarProps {
  categories: any;
  selectedCategory: any;
  onCategoryPress: (category: any) => void;
}

const Sidebar: FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollViewInstance>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories?.map(() => useSharedValue(0));

  useEffect(() => {
    let targetIndex = -1;

    categories?.forEach((category: any, index: number) => {
      const isSelected = selectedCategory?._id === category?._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
        duration: 500,
      });
      if (isSelected) targetIndex = index;
    });

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 119, {
        duration: 500,
      });
      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: targetIndex * 119,
          animated: true,
        });
      });
    }
  }, [selectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
  }));

  // console.log('selectedCategory', selectedCategory);

  return (
    <View style={styles.sidebar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.indicator, indicatorStyle]} />

        <View style={{ gap: 20 }}>
          {categories?.map((category: any, index: number) => {
            const animatedStyle = useAnimatedStyle(() => ({
              bottom: animatedValues[index].value,
            }));

            const isActive = selectedCategory?._id === category?._id;
            console.log(isActive, selectedCategory?.name);

            return (
              <TouchableOpacity
                key={index}
                // activeOpacity={1}
                style={styles.categoryBtn}
                onPress={() => {
                  console.log('category pressed', category);
                  onCategoryPress(category);
                }}
              >
                <View
                  style={[
                    styles.imageContainer,
                    isActive && styles.selectedImageContainer,
                  ]}
                >
                  <Animated.Image
                    source={{ uri: category?.image }}
                    style={[styles.image, animatedStyle]}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryName,
                    isActive && {
                      fontFamily: FONTS.extraBold,
                    },
                  ]}
                >
                  {category?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sidebar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    top: 0,
    alignSelf: 'center',
    backgroundColor: GROCERY_COLOR_THEM.leaf,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  categoryBtn: {
    padding: 10,
    height: 100,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  imageContainer: {
    borderRadius: 100,
    height: '65%',
    marginBottom: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f7',
    overflow: 'hidden',
  },
  selectedImageContainer: {
    backgroundColor: '#E3F4EA',
  },
  categoryName: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: GROCERY_COLOR_THEM.ink,
    textAlign: 'center',
    // paddingBottom: 50,
  },
});
