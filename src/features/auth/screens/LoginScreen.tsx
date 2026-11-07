import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoginScreen = () => {
  return (
    <View>
      <Text style={styles.text}>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PlusJakartaSans-Regular',
    // fontWeight: '700',
    fontSize: 20,
  },
});
