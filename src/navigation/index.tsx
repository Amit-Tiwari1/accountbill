// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStackNavigator from './AuthStackNavigator';
import CustomDrawerNavigator from './/DrawerNavigator'; // ✅ use this instead of AdminStackNavigator

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthStack: undefined;
  AdminDrawer: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f5f5f5' },
      }}
    >
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      {/* After login → Drawer + Tabs */}
      <RootStack.Screen name="AdminDrawer" component={CustomDrawerNavigator} />
    </RootStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
