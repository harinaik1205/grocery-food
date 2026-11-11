import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../../shared/utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import LucideIcon from '@react-native-vector-icons/lucide';
import Chip from '../components/Chip';

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');

  const handleMobileNumberChange = (text: string) => {
    setMobileNumber(text);
  };

  const handleContinue = () => {};

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
              value={mobileNumber}
              onChangeText={handleMobileNumberChange}
            />
          </View>
          <TouchableOpacity style={[styles.continueButton, styles.button]}>
            <Text style={styles.continueButtonText}>Continue</Text>
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
