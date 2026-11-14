import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BuyAgainScreen,
  CategoriesScreen,
  GroceryHomeScreen,
  OffersScreen,
} from '../../../features/grocery/home';
import { COLORS, FONTS } from '../../../shared/utils/constants';
import Feather from '@react-native-vector-icons/feather';

const ICONS_NAME: {
  Home: 'home';
  Categories: 'grid';
  'Buy Again': 'refresh-cw';
  Offers: 'tag';
} = {
  Home: 'home',
  Categories: 'grid',
  'Buy Again': 'refresh-cw',
  Offers: 'tag',
};

const Tab = createBottomTabNavigator();

const CustomTabBar = (props: BottomTabBarProps) => {
  const { state, navigation } = props;

  const handlePress = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.customTabBar}>
        <View style={styles.tabContainer}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            return (
              <Pressable
                onPress={() => handlePress(route.name)}
                style={[
                  styles.tabItem,
                  isFocused && {
                    backgroundColor: '#FFE4DC',
                  },
                ]}
              >
                <Feather
                  name={ICONS_NAME[route.name as keyof typeof ICONS_NAME]}
                  size={22}
                  color={isFocused ? COLORS.brandDark : COLORS.muted}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isFocused && { color: COLORS.brandDark },
                  ]}
                >
                  {route.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={GroceryHomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Buy Again" component={BuyAgainScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  customTabBar: {
    width: '95%',
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: '#330D05',
    elevation: 8,
    paddingHorizontal: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  tabItem: {
    height: 56,
    width: '22%',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: FONTS.bold,
    color: COLORS.muted,
  },
});
