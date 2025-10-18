import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStackNavigator from './AuthStackNavigator';
import AdminStackNavigator from './AdminStackNavigator';
// Removed AdminDrawerNavigator to avoid Reanimated dependency

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthStack: undefined;
  AdminStack: undefined;
};
export type { AuthStackParamList } from './AuthStackNavigator';
export type { AdminStackParamList } from './AdminStackNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f5f5f5' },
      }}
    >
      <RootStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          title: 'Splash',
        }}
      />
      <RootStack.Screen
        name="AuthStack"
        component={AuthStackNavigator}
        options={{
          title: 'Authentication',
        }}
      />
      <RootStack.Screen
        name="AdminStack"
        component={AdminStackNavigator}
        options={{
          title: 'Admin',
        }}
      />

    </RootStack.Navigator>
  );
};

// Main Navigation Container
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
