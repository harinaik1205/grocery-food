import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentRef,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from '@react-native-vector-icons/feather';
import { COLORS } from '../../../shared/utils/constants';
import { goBack } from '../../../shared/utils/navigation';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { ConfirmationResult } from '@react-native-firebase/auth';

type TextInputType = ComponentRef<typeof TextInput>;

const OtpScreen = () => {
  const route = useRoute();
  const confirm = route?.params?.confirm as ConfirmationResult;

  const [otp, setOtp] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const otpRefs = useRef<(TextInputType | null)[]>([]);

  useEffect(() => {
    otpRefs.current[0]?.focus();
  }, []);
  const handleChange = (text: string, index: number) => {
    if (isNaN(Number(text))) return;
    const newOtp = [...otp];
    newOtp[index] = text[text.length - 1];
    setOtp(newOtp);
    if (text && !otp[index + 1] && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
    const newOtp = [...otp];
    if (e.nativeEvent.key === 'Backspace') {
      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0) {
        otpRefs?.current[index - 1]?.focus();
      }
    }
  };

  async function handleVerifyOtp() {
    setIsVerifying(true);
    try {
      await confirm.confirm(otp.join(''));
    } catch (error: any) {
      console.log('Invalid code.', error);
      Alert.alert(JSON.stringify(error));
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}
            style={styles.backButtonContainer}
          >
            <FeatherIcon name="chevron-left" size={20} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/logo-2.png')} />
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 48 }}>
          <View style={styles.chatIcon}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={32}
              color={COLORS.brand}
            />
          </View>
          <Text style={styles.title}>Verify your number</Text>
          <Text style={styles.subtitle}>We’ve sent a 6-digit code to</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text style={styles.phoneNumber}>
              +91{route.params?.phoneNumber}
            </Text>
            <Pressable>
              <Text style={styles.editButton}>Edit</Text>
            </Pressable>
          </View>

          <View style={styles.otpInputContainer}>
            {[1, 2, 3, 4, 5, 6].map((_, index) => {
              return (
                // <View style={[styles.otpInput]} key={index}>
                <TextInput
                  key={index}
                  ref={ref => {
                    otpRefs.current[index] = ref;
                  }}
                  value={otp[index]}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="phone-pad"
                  style={[
                    styles.input,
                    styles.otpInput,
                    otp[index] && styles.activeOtpInput,
                  ]}
                  cursorColor={COLORS.brand}
                  caretHidden={false}
                  selectionColor={COLORS.brand}
                />
                // </View>
              );
            })}
          </View>
          <Text style={styles.resendCodeText}>
            Didn’t get the code? Resend in
            <Text style={styles.resendCode}> 00:24</Text>
          </Text>

          <TouchableOpacity
            onPress={handleVerifyOtp}
            disabled={isVerifying}
            style={[styles.continueButton, styles.button]}
          >
            {isVerifying ? (
              <ActivityIndicator size={'small'} color={COLORS.white} />
            ) : (
              <Text style={styles.continueButtonText}>Verify & continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFC4BB',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.overlay,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 3,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFE4DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: COLORS.ink,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: COLORS.muted,
    marginTop: 8,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Bold',
    color: COLORS.brand,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  otpInput: {
    width: 48.5,
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 24,
    color: COLORS.ink,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  activeOtpInput: {
    borderWidth: 2,
    borderColor: COLORS.brand,
  },
  resendCodeText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#6B625C',
    textAlign: 'center',
    marginTop: 16,
  },
  resendCode: {
    fontFamily: 'PlusJakartaSans-Bold',
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
});
