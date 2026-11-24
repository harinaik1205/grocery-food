import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../shared/utils/constants';
import {
  navigate,
  replace,
  resetAndNavigate,
} from '../../../shared/utils/navigation';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { mmkvStorage } from '../../../shared/utils/storage';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../store/authSlice';

const SplashScreen = () => {
  // let user = mmkvStorage.getItem('user');
  const [userData, setUserData] = useState(() => {
    return mmkvStorage.getItem('user');
  });
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
  //   return subscriber;
  // }, []);

  // function handleAuthStateChanged(user: any) {
  //   if (user) {
  //     mmkvStorage.setItem('user', JSON.stringify(user));
  //     setUserData(user);
  //     // dispatch(setUser(JSON.parse(JSON.stringify(user))));
  //     replace('vertical');
  //     console.log('auth state changed');
  //     // Some Android devices auto-retrieve the SMS code and complete sign-in
  //     // without the user typing it. Hide the code UI and navigate away when
  //     // this fires; entering the same code again will fail because it was used.
  //   } else {
  //     // setUserData(null);
  //     // dispatch(setUser(null));
  //     // resetAndNavigate('login');
  //   }
  // }

  const handleNavigation = () => {
    if (userData) {
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
  }, [userData]);

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
