import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GroceryHomeScreen } from '../../features/grocery/home';

const Stack = createNativeStackNavigator();

const GroceryNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="GroceryHome"
    >
      <Stack.Screen name="GroceryHome" component={GroceryHomeScreen} />
    </Stack.Navigator>
  );
};

export default GroceryNavigation;

const styles = StyleSheet.create({});
