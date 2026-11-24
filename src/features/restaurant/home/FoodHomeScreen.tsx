import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../../../shared/components/AnimatedHeader';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const FoodHomeScreen = () => {
  const scrollY = useSharedValue(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
    console.log(e.contentOffset.y);
  });
  return (
    <View style={{ flex: 1 }}>
      <Header onHeightChange={setHeaderHeight} scrollY={scrollY} />
      <Text>FoodHomeScreen</Text>
    </View>
  );
};

export default FoodHomeScreen;

const styles = StyleSheet.create({});
