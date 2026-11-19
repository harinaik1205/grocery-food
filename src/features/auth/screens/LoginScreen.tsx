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
import { COLORS, FONTS } from '../../../shared/utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import LucideIcon from '@react-native-vector-icons/lucide';
import Chip from '../components/Chip';
import {
  navigate,
  replace,
  resetAndNavigate,
} from '../../../shared/utils/navigation';
import {
  ConfirmationResult,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithCredential,
  FacebookAuthProvider,
} from '@react-native-firebase/auth';
import { mmkvStorage } from '../../../shared/utils/storage';
import { useAppDispatch } from '../../../store/hooks';
import {
  GoogleOneTapSignIn,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
} from 'react-native-nitro-google-signin';
import Config from 'react-native-config';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

GoogleOneTapSignIn.configure({
  webClientId: Config.WEB_CLIENT_ID!,
});

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading, setIsFacebookAuthLoading] = useState(false);

  useEffect(() => {
    if (phoneNumber.length === 10) {
      Keyboard.dismiss();
    }
  }, [phoneNumber]);

  async function handleSignInWithPhoneNumber() {
    if (!phoneNumber || phoneNumber.length !== 10) return;
    setIsSendingOtp(true);
    try {
      const confirmation = await signInWithPhoneNumber(
        getAuth(),
        `+91${phoneNumber}`,
      );
      // dispatch(setConfirmation(confirmation));
      // setConfirmation(confirmation)
      console.log('confirmation', confirmation);
      navigate('otp', { phoneNumber, confirmation });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSendingOtp(false);
    }
  }

  const handleChange = (text: string) => {
    setPhoneNumber(text);
  };

  async function onGoogleButtonPress() {
    setIsGoogleAuthLoading(true);
    try {
      await GoogleOneTapSignIn.checkPlayServices();
      let response = await GoogleOneTapSignIn.signIn();
      if (isNoSavedCredentialFoundResponse(response)) {
        response = await GoogleOneTapSignIn.createAccount();
      }
      if (isNoSavedCredentialFoundResponse(response)) {
        response = await GoogleOneTapSignIn.presentExplicitSignIn();
      }
      if (!isSuccessResponse(response)) {
        throw new Error('Google Sign-In was cancelled or failed');
      }
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(getAuth(), googleCredential);
    } catch (error) {
      console.log('google signin error', error);
    } finally {
      setIsGoogleAuthLoading(false);
    }
  }

  async function onFacebookButtonPress() {
    setIsFacebookAuthLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken,
      );
      await signInWithCredential(getAuth(), facebookCredential);
      // resetAndNavigate('vertical');
    } catch (error) {
      console.log('facebook signin error', error);
    } finally {
      setIsFacebookAuthLoading(false);
    }
  }

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
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => {
              resetAndNavigate('vertical');
            }}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
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
              // autoFocus
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
          <TouchableOpacity
            onPress={onGoogleButtonPress}
            style={[styles.button, styles.hollowButton]}
          >
            {isGoogleAuthLoading ? (
              <ActivityIndicator size={'small'} color={COLORS.brand} />
            ) : (
              <>
                <Image
                  source={require('../../../assets/images/google-logo.png')}
                />
                <Text style={styles.hollowButtonText}>
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onFacebookButtonPress}
            style={[styles.button, styles.hollowButton]}
          >
            {isFacebookAuthLoading ? (
              <ActivityIndicator size={'small'} color={COLORS.brand} />
            ) : (
              <>
                <Image
                  source={require('../../../assets/images/facebook-logo.png')}
                />
                <Text style={styles.hollowButtonText}>
                  Continue with Facebook
                </Text>
              </>
            )}
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
  skipBtn: {
    position: 'absolute',
    top: 0,
    right: 50,
    zIndex: 10,
  },
  skipText: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
});
