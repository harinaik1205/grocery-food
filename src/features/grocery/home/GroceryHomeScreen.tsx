import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mmkvStorage } from '../../../shared/utils/storage';

const GroceryHomeScreen = () => {
  const user = JSON.parse(mmkvStorage.getItem('user')!);
  return (
    <View>
      <SafeAreaView>
        <Text>{user?.phoneNumber}</Text>
      </SafeAreaView>
    </View>
  );
};

export default GroceryHomeScreen;

const styles = StyleSheet.create({});
