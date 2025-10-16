import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import SplashScreen from '../screens/SplashScreen';

// Import stack navigators
import AuthStackNavigator from './AuthStackNavigator';
import AdminStackNavigator from './AdminStackNavigator';

// Define navigation types
export type RootStackParamList = {
  SplashScreen: undefined;
  AuthStack: undefined;
  AdminStack: undefined;
};

// Re-export types from individual stack navigators
export type { AuthStackParamList } from './AuthStackNavigator';
export type { AdminStackParamList } from './AdminStackNavigator';

// Create root stack navigator
const RootStack = createStackNavigator<RootStackParamList>();

// Root Navigator
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
