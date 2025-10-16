import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MobileVerification from '../screens/AuthStack/MobileVerification';
import LoginScreen from '../screens/AuthStack/LoginScreen';
import RegisterScreen from '../screens/AuthStack/RegisterScreen';
import ForgotPasswordScreen from '../screens/AuthStack/ForgotPasswordScreen';

// Define AuthStack navigation types
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MobileVerification: undefined;
};

// Create AuthStack navigator
const AuthStack = createStackNavigator<AuthStackParamList>();

// Auth Stack Navigator Component
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f5f5f5' },
      }}
      initialRouteName="Login"
    >
      <AuthStack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <AuthStack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          title: 'Register',
        }}
      />
      <AuthStack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          title: 'Forgot Password',
        }}
      />
      <AuthStack.Screen 
        name="MobileVerification" 
        component={MobileVerification}
        options={{
          title: 'Mobile Verification',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
