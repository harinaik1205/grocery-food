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
import FoodHomeScreen from '../../../features/restaurant/home/FoodHomeScreen';
import DiningTab from '../../../features/restaurant/home/DiningTab';
import EatRightTab from '../../../features/restaurant/home/EatRightTab';
import ReorderTab from '../../../features/restaurant/home/ReorderTab';
import { CustomTabBar } from '../CustomTabBar';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={FoodHomeScreen} />
      <Tab.Screen name="Dining" component={DiningTab} />
      <Tab.Screen name="EatRight" component={EatRightTab} />
      <Tab.Screen name="Reorder" component={ReorderTab} />
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
    borderWidth: 0.5,

    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF80',
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowColor: '#330D05',
    // elevation: 8,
    paddingHorizontal: 5,
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
