import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BuyAgainScreen,
  CategoriesScreen,
  GroceryHomeScreen,
  OffersScreen,
} from '../../../features/grocery/home';

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
      <Tab.Screen name="Home" component={GroceryHomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Buy Again" component={BuyAgainScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
