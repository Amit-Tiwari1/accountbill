import React, { useState, useEffect } from 'react';
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
import { useSnackbar } from '../../components/GlobalSnackbar';
import Colors from '../../theme/Colors';
import { validatePhoneNumber } from '../../utils/helper';

interface MobileVerificationProps {
  navigation: any;
}

const MobileVerification: React.FC<MobileVerificationProps> = ({ navigation }) => {
  const { showMessage } = useSnackbar();
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);



  const handleGetOTP = () => {
    setError('');
    if (!phone.trim()) return showMessage('Please enter your mobile number', 'error');
    if (!validatePhoneNumber(phone)) return showMessage('Please enter a valid 10-digit mobile number', 'error');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPScreen', { phone: `+91${phone}` });
    }, 1500);
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
            {/* HEADER CARD (top 1/3) */}
            <View style={[styles.mainContent, { backgroundColor: Colors.card }]}>
              <View style={styles.iconContainer}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary }]}>
                  <MaterialIcons name="phone" size={30} color="#fff" />
                </View>
              </View>
              <Text style={[styles.title, { color: theme.colors.onSurface }]}>
                Enter your phone number
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                We'll send you a verification code
              </Text>
            </View>

            {/* BODY CONTENT (below header) */}
            <View style={styles.bodyContent}>
              {/* Phone Input */}
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

              {error ? (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
              ) : null}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleGetOTP}
                disabled={loading}
                style={[styles.submitButton, { backgroundColor: theme.colors.surface }]}
              >
                <Text style={[styles.buttonLabel, { color: theme.colors.primary }]}>
                  {loading ? 'Sending...' : 'Continue'}
                </Text>
              </TouchableOpacity>

              {/* Footer */}
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
    height: '33%', // top third
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
  iconContainer: { marginBottom: 24 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  errorText: {
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default MobileVerification;
