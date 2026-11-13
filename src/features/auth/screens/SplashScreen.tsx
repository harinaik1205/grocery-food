import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../shared/utils/constants';
import { navigate, replace } from '../../../shared/utils/navigation';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { mmkvStorage } from '../../../shared/utils/storage';

const SplashScreen = () => {
  let user = mmkvStorage.getItem('user');
  const handleNavigation = () => {
    if (user) {
      replace('vertical');
    } else {
      navigate('login');
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleNavigation();
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/images/Logo.png')} />
      </View>
      <Text style={styles.brandName}>Zesta</Text>
      <Text style={styles.tagline}>Food & groceries, one app</Text>
      <View style={styles.topShadow} />
      <View style={styles.bottomShadow} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.brandDark,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  brandName: {
    fontSize: 42,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: COLORS.white,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: COLORS.white,
    textAlign: 'center',
  },
  topShadow: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.brand,
    position: 'absolute',
    top: -40,
    right: -100,
    // zIndex: -1,
    opacity: 0.8,
  },
  bottomShadow: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.brand,
    position: 'absolute',
    bottom: -40,
    left: -100,
    // zIndex: -1,
    opacity: 0.8,
  },
});
