import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MobileVerification from '../screens/AuthStack/MobileVerification';
import OTPScreen from '../screens/AuthStack/OTPScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MobileVerification: undefined;
  OTPScreen: undefined
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f5f5f5' },
      }}
      initialRouteName="MobileVerification"
    >

      <AuthStack.Screen
        name="MobileVerification"
        component={MobileVerification}
        options={{
          title: 'Mobile Verification',
        }}
      />
      <AuthStack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          title: 'Mobile Verification',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
