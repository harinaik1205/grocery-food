import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mmkvStorage } from '../../../../shared/utils/storage';
import Header from '../../../../shared/components/Header';

const GroceryHomeScreen = () => {
  const user = JSON.parse(mmkvStorage.getItem('user')!);
  return (
    <View style={{ flex: 1 }}>
      <Header />
    </View>
  );
};

export default GroceryHomeScreen;

const styles = StyleSheet.create({});
