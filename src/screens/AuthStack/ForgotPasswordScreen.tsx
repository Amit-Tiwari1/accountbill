import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Card, 
  Title, 
  Paragraph,
  Text
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      Alert.alert('Success', 'Password reset email sent!');
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Reset Password</Title>
            <Paragraph style={styles.subtitle}>
              {isEmailSent 
                ? 'Check your email for password reset instructions'
                : 'Enter your email address to receive password reset instructions'
              }
            </Paragraph>

            {!isEmailSent ? (
              <View style={styles.inputContainer}>
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  style={styles.input}
                  mode="outlined"
                  autoCapitalize="none"
                />
                
                <Button
                  mode="contained"
                  onPress={handleSendResetEmail}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.button}
                >
                  Send Reset Email
                </Button>
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <Button
                  mode="contained"
                  onPress={handleBackToLogin}
                  style={styles.button}
                >
                  Back to Login
                </Button>
              </View>
            )}

            <Button
              mode="text"
              onPress={handleBackToLogin}
              style={styles.linkButton}
            >
              Remember your password? Sign In
            </Button>
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
    marginBottom: 20,
  },
  linkButton: {
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
