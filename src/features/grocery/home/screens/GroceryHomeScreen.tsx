import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mmkvStorage } from '../../../../shared/utils/storage';
import Header from '../../../../shared/components/Header';
import { getAuth, signOut } from '@react-native-firebase/auth';

import {
  navigate,
  replace,
  resetAndNavigate,
} from '../../../../shared/utils/navigation';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import AnimatedHeader from '../../../../shared/components/AnimatedHeader';
import {
  categories,
  COLORS,
  FONTS,
  productsList,
} from '../../../../shared/utils/constants';

import Config from 'react-native-config';
import CustomCarousel from '../../../../shared/components/carousel/CustomCarousel';
import CategoriesList from '../components/categories/CategoriesList';
import ProductsList from '../components/prodcuts/ProductsList';

const GroceryHomeScreen = () => {
  const scrollY = useSharedValue(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
    console.log(e.contentOffset.y);
  });

  const user = mmkvStorage.getItem('user')!;
  const auth = getAuth();
  return (
    <View style={{ flex: 1 }}>
      {/* <Header /> */}
      <AnimatedHeader scrollY={scrollY} onHeightChange={setHeaderHeight} />
      <Animated.ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: headerHeight,

          // backgroundColor: '#E7DED6',
          backgroundColor: '#EDE3DB',
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <CustomCarousel />
        <View style={{ paddingHorizontal: 16 }}>
          {/* <View>
            <Text style={styles.popularNearYouText}>Popular near you</Text>
            <ProductsList products={productsList} />
          </View> */}
          <CategoriesList categories={categories} label="Grocery & Kitchen" />
          {/* <CategoriesList categories={categories} label="Snacks & Drinks" />
          <CategoriesList
            categories={categories}
            label="Beauty & Personal Care"
          /> */}
        </View>

        <View
          style={{
            backgroundColor: '#EDE3DB',
            paddingVertical: 20,
          }}
        >
          <Text style={styles.appName}>Zesta</Text>
          <Text style={styles.tagLine}>Food & groceries, one app</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default GroceryHomeScreen;

const styles = StyleSheet.create({
  appName: {
    fontSize: 56,
    fontFamily: FONTS.extraBold,
    color: '#9C928B',
    textAlign: 'center',
  },
  tagLine: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: '#9C928B',
    textAlign: 'center',
  },
  popularNearYouText: {
    color: COLORS.ink,
    fontSize: 18,
    fontFamily: FONTS.extraBold,
    paddingBottom: 10,
  },
});
