import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';
import ProductCategories from '../../../features/grocery/explore/screens/ProductCategories';
import { GROCERY_ROUTES } from './routes';

const Stack = createNativeStackNavigator();

const GroceryNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="GroceryTabs"
    >
      <Stack.Screen
        name={GROCERY_ROUTES.GROCERY_TABS}
        component={TabNavigation}
      />
      <Stack.Screen
        name={GROCERY_ROUTES.PRODUCT_CATEGORIES_SCREEN}
        component={ProductCategories}
      />
    </Stack.Navigator>
  );
};

export default GroceryNavigation;

const styles = StyleSheet.create({});
