import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Card, 
  Title, 
  Paragraph 
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MobileVerificationProps {
  navigation: any;
}

const MobileVerification: React.FC<MobileVerificationProps> = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!mobileNumber.trim()) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsCodeSent(true);
      Alert.alert('Success', 'Verification code sent to your mobile number');
    }, 2000);
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Mobile number verified successfully!');
      navigation.replace('AdminStack');
    }, 2000);
  };

  const handleResendCode = () => {
    setIsCodeSent(false);
    setVerificationCode('');
    handleSendCode();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Mobile Verification</Title>
            <Paragraph style={styles.subtitle}>
              {isCodeSent 
                ? 'Enter the verification code sent to your mobile number'
                : 'Enter your mobile number to receive a verification code'
              }
            </Paragraph>

            {!isCodeSent ? (
              <View style={styles.inputContainer}>
                <TextInput
                  label="Mobile Number"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  keyboardType="phone-pad"
                  style={styles.input}
                  mode="outlined"
                />
                <Button
                  mode="contained"
                  onPress={handleSendCode}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.button}
                >
                  Send Code
                </Button>
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <TextInput
                  label="Verification Code"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  style={styles.input}
                  mode="outlined"
                />
                <Button
                  mode="contained"
                  onPress={handleVerifyCode}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.button}
                >
                  Verify Code
                </Button>
                <Button
                  mode="text"
                  onPress={handleResendCode}
                  style={styles.resendButton}
                >
                  Resend Code
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  resendButton: {
    marginTop: 10,
  },
});

export default MobileVerification;
