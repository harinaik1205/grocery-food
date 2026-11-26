import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

const RestaurantNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="FoodTabs"
    >
      <Stack.Screen name="FoodTabs" component={TabNavigation} />
      {/* <Stack.Screen name="GroceryHome" component={GroceryHomeScreen} /> */}
    </Stack.Navigator>
  );
};

export default RestaurantNavigation;

const styles = StyleSheet.create({});
