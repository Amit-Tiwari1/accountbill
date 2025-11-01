import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStackNavigator from './AuthStackNavigator';
import CustomDrawerNavigator from './/DrawerNavigator'; // ✅ use this instead of AdminStackNavigator
import { useAppDispatch } from '../hook/hooks';
import { useFCMToken } from '../hook/useFCMToken';
import { setFcmToken } from '../redux/slices/fcmSlice';
import TokenCheckerWrapper from '../components/TokenCheckerWrapper';
import CompleteProfile from '../screens/AdminStack/CompleteProfileScreen';
import Settings from '../screens/AdminStack/SettingsScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthStack: undefined;
  AdminDrawer: undefined;
  CompleteProfile: undefined;
  Settings: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {

  const { token } = useFCMToken();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setFcmToken(token));
    }
  }, [token]);




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
      <RootStack.Screen name="CompleteProfile" component={CompleteProfile} />
      <RootStack.Screen name="Settings" component={Settings} />
    </RootStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TokenCheckerWrapper>
        <RootNavigator />
      </TokenCheckerWrapper>
    </NavigationContainer>
  );
};

export default AppNavigator;
