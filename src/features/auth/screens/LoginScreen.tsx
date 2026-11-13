import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../shared/utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import LucideIcon from '@react-native-vector-icons/lucide';
import Chip from '../components/Chip';
import { navigate, replace } from '../../../shared/utils/navigation';
import {
  ConfirmationResult,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import { mmkvStorage } from '../../../shared/utils/storage';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (phoneNumber.length === 10) {
      Keyboard.dismiss();
    }
  }, [phoneNumber]);

  function handleAuthStateChanged(user: any) {
    if (user) {
      mmkvStorage.setItem('user', JSON.stringify(user));
      replace('vertical');
      // Some Android devices auto-retrieve the SMS code and complete sign-in
      // without the user typing it. Hide the code UI and navigate away when
      // this fires; entering the same code again will fail because it was used.
    }
  }

  async function handleSignInWithPhoneNumber() {
    if (!phoneNumber || phoneNumber.length !== 10) return;

    const confirmation = await signInWithPhoneNumber(
      getAuth(),
      `+91${phoneNumber}`,
    );
    setConfirm(confirmation);
    console.log('confirmation', confirmation);
    navigate('otp', { phoneNumber, confirm: confirmation });
  }

  const handleChange = (text: string) => {
    setPhoneNumber(text);
  };

  // const handleContinue = () => {

  // };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.topContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/Logo.png')} />
          </View>
          <Text style={styles.brandName}>Zesta</Text>
          <Text style={styles.tagline}>Food & groceries, one app</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              gap: 5,
            }}
          >
            <Chip
              label="Hot food"
              icon={
                <LucideIcon
                  name="utensils"
                  size={16}
                  color={COLORS.brandDark}
                />
              }
            />
            <Chip
              label="Fresh groceries"
              icon={
                <LucideIcon
                  name="shopping-bag"
                  size={16}
                  color={COLORS.brandDark}
                />
              }
            />
          </View>
          <View style={styles.topShadow} />
          <View style={styles.bottomShadow} />
        </View>

        <View style={styles.bottomContainer}>
          <View style={{ gap: 2, marginTop: 2 }}>
            <Text style={styles.loginText}>Login or Signup</Text>
            <Text style={styles.mobileNumberText}>
              Enter your mobile number to get an OTP
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <View style={styles.divider} />
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              cursorColor={COLORS.brand}
              onChangeText={handleChange}
              placeholderTextColor={COLORS.muted}
            />
          </View>
          <TouchableOpacity
            onPress={handleSignInWithPhoneNumber}
            disabled={isSendingOtp}
            style={[styles.continueButton, styles.button]}
          >
            {isSendingOtp ? (
              <ActivityIndicator size={'small'} color={COLORS.white} />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
          <View style={styles.hrContainer}>
            <View style={styles.hrLine} />
            <Text style={styles.hrText}>or</Text>
            <View style={styles.hrLine} />
          </View>
          <TouchableOpacity style={[styles.button, styles.hollowButton]}>
            <Image source={require('../../../assets/images/google-logo.png')} />
            <Text style={styles.hollowButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.hollowButton]}>
            <Image
              source={require('../../../assets/images/facebook-logo.png')}
            />
            <Text style={styles.hollowButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brandDark,
  },
  topContainer: {
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
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
    top: -100,
    right: -100,
    zIndex: -1,
    opacity: 0.8,
  },
  bottomShadow: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.brand,
    position: 'absolute',
    bottom: -100,
    left: -100,
    zIndex: -1,
    opacity: 0.8,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16,
  },
  loginText: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: COLORS.ink,
  },
  mobileNumberText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    color: COLORS.muted,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 14,
    borderColor: COLORS.brand,
    borderWidth: 1,
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 24,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: COLORS.ink,
  },
  divider: {
    width: 1.5,
    height: '24',
    backgroundColor: '#DDD3CB',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    color: COLORS.ink,
  },
  button: {
    // flex: 1,
    borderRadius: 16,
    height: 56,
  },
  continueButton: {
    backgroundColor: COLORS.brand,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: COLORS.white,
  },
  hollowButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  hollowButtonText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: COLORS.ink,
  },
  hrContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 10,
    marginTop: 16,
  },
  hrLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  hrText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    color: COLORS.muted,
  },
});
