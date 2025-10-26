import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../theme/Colors';
import { validatePhoneNumber } from '../../utils/helper';
import { showToast } from '../../hook/useToast';
import { useHeaderAnimation } from '../../Animations/useHeaderAnimation';
import { sendOtp } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';

interface MobileVerificationProps {
  navigation: any;
}

const MobileVerification: React.FC<MobileVerificationProps> = ({ navigation }) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

  const { titleAnim, subtitleAnim, iconSize, circleSize, circleRadius } = useHeaderAnimation();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const fcmToken = useAppSelector((state) => state.fcm.token);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGetOTP = async () => {
    setError('');
    if (!phone.trim()) {
      return showToast.error('Please enter your mobile number');
    }
    if (!validatePhoneNumber(phone)) {
      return showToast.error('Please enter a valid 10-digit mobile number');
    }

    try {
      const response = await dispatch(sendOtp({ phone, fcmToken: fcmToken ?? '' })).unwrap();

      if (response.success) {
        navigation.navigate('OTPScreen', { phone: `+91${phone}`, responseData: response.data });
        showToast.success(response?.data?.message);
      } else {
        showToast.error(response?.data?.message);
      }

    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
      showToast.error(err.message || 'Failed to send OTP');
    }
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <View style={[styles.mainContent, { backgroundColor: Colors.card }]}>
              <Animated.View
                style={{
                  width: circleSize,
                  height: circleSize,
                  borderRadius: circleRadius,
                  backgroundColor: theme.colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <AnimatedMaterialIcons name="phone" size={iconSize} color="#fff" />
              </Animated.View>

              <Animated.Text
                style={[styles.title, { color: theme.colors.primary, transform: [{ scale: titleAnim }] }]}
              >
                Enter your phone number
              </Animated.Text>

              <Animated.Text
                style={[styles.subtitle, { color: theme.colors.onSurfaceVariant, opacity: subtitleAnim }]}
              >
                We'll send you a verification code
              </Animated.Text>
            </View>

            <View style={styles.bodyContent}>
              <View style={styles.inputWrapper}>
                <View style={[styles.countryCode, { backgroundColor: theme.colors.surfaceVariant }]}>
                  <Text style={[styles.countryCodeText, { color: theme.colors.onSurfaceVariant }]}>+91</Text>
                </View>
                <TextInput
                  placeholder="Phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  maxLength={10}
                  style={[
                    styles.phoneInput,
                    {
                      borderColor: theme.colors.outline,
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.onSurface,
                    },
                  ]}
                  placeholderTextColor={theme.colors.onSurfaceVariant}
                />
              </View>



              <TouchableOpacity
                onPress={handleGetOTP}
                disabled={isLoading}
                style={[styles.submitButton, { backgroundColor: theme.colors.surface }]}
              >
                <Text style={[styles.buttonLabel, { color: theme.colors.primary }]}>
                  {isLoading ? 'Sending...' : 'Continue'}
                </Text>
              </TouchableOpacity>

              <Text style={[styles.footerText, { color: theme.colors.surface }]}>
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  mainContent: {
    height: '33%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 0,
  },
  bodyContent: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 40,
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  countryCode: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginRight: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.6,
    lineHeight: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.7,
    textAlign: 'center',
  },
  errorText: {
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default MobileVerification;
