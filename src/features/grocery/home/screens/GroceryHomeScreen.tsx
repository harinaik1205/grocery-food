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
import { COLORS } from '../../../../shared/utils/constants';

import Config from 'react-native-config';
import CustomCarousel from '../../../../shared/components/carousel/CustomCarousel';

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
          paddingBottom: 50,
          paddingTop: headerHeight,
          backgroundColor: '#E7DED6',
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <CustomCarousel />

        <Button
          title="Logout"
          onPress={() => {
            mmkvStorage.removeItem('user');
            signOut(auth);
            // resetAndNavigate('login');
          }}
        />
        <Text>
          React Native allows developers who know React to create native apps.
          At the same time, native developers can use React Native to gain
          parity between native platforms by writing common features once. We
          believe that the best way to experience React Native is through a
          Framework, a toolbox with all the necessary APIs to let you build
          production ready apps. You can also use React Native without a
          Framework, however we’ve found that most developers benefit from using
          a React Native Framework like Expo. Expo provides features like
          file-based routing, high-quality universal libraries, and the ability
          to write plugins that modify native code without having to manage
          native files. React Native allows developers who know React to create
          native apps. At the same time, native developers can use React Native
          to gain parity between native platforms by writing common features
          once. We believe that the best way to experience React Native is
          through a Framework, a toolbox with all the necessary APIs to let you
          build production ready apps. You can also use React Native without a
          Framework, however we’ve found that most developers benefit from using
          a React Native Framework like Expo. Expo provides features like
          file-based routing, high-quality universal libraries, and the ability
          to write plugins that modify native code without having to manage
          native files. React Native allows developers who know React to create
          native apps. At the same time, native developers can use React Native
          to gain parity between native platforms by writing common features
          once. We believe that the best way to experience React Native is
          through a Framework, a toolbox with all the necessary APIs to let you
          build production ready apps. You can also use React Native without a
          Framework, however we’ve found that most developers benefit from using
          a React Native Framework like Expo. Expo provides features like
          file-based routing, high-quality universal libraries, and the ability
          to write plugins that modify native code without having to manage
          native files. React Native allows developers who know React to create
          native apps. At the same time, native developers can use React Native
          to gain parity between native platforms by writing common features
          once. We believe that the best way to experience React Native is
          through a Framework, a toolbox with all the necessary APIs to let you
          build production ready apps. You can also use React Native without a
          Framework, however we’ve found that most developers benefit from using
          a React Native Framework like Expo. Expo provides features like
          file-based routing, high-quality universal libraries, and the ability
          to write plugins that modify native code without having to manage
          native files. React Native allows developers who know React to create
          native apps. At the same time, native developers can use React Native
          to gain parity between native platforms by writing common features
          once. We believe that the best way to experience React Native is
          through a Framework, a toolbox with all the necessary APIs to let you
          build production ready apps. You can also use React Native without a
          Framework, however we’ve found that most developers benefit from using
          a React Native Framework like Expo. Expo provides features like
          file-based routing, high-quality universal libraries, and the ability
          to write plugins that modify native code without having to manage
          native files.
        </Text>
      </Animated.ScrollView>
    </View>
  );
};

export default GroceryHomeScreen;

const styles = StyleSheet.create({});
