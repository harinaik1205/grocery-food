import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mmkvStorage } from '../../../../shared/utils/storage';
import Header from '../../../../shared/components/Header';
import { getAuth, signOut } from '@react-native-firebase/auth';
import {
  navigate,
  replace,
  resetAndNavigate,
} from '../../../../shared/utils/navigation';

const GroceryHomeScreen = () => {
  const user = mmkvStorage.getItem('user')!;
  const auth = getAuth();
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text>{user}</Text>
      <Button
        title="Logout"
        onPress={() => {
          mmkvStorage.removeItem('user');
          signOut(auth);
          // resetAndNavigate('login');
        }}
      />
    </View>
  );
};

export default GroceryHomeScreen;

const styles = StyleSheet.create({});
