import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/AdminStack/HomeScreen';
import AddTransactionScreen from '../screens/AdminStack/AddTransactionScreen';
import TransactionsScreen from '../screens/AdminStack/TransactionsScreen';
import ReportsScreen from '../screens/AdminStack/ReportsScreen';
import ProfileScreen from '../screens/AdminStack/ProfileScreen';

// Define AdminStack navigation types
export type AdminStackParamList = {
  HomeScreen: undefined;
  AddTransaction: undefined;
  Transactions: undefined;
  Reports: undefined;
  Profile: undefined;
};

// Create AdminStack navigator
const AdminStack = createStackNavigator<AdminStackParamList>();

// Admin Stack Navigator Component
const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f5f5f5' },
      }}
    >
      <AdminStack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <AdminStack.Screen 
        name="AddTransaction" 
        component={AddTransactionScreen}
        options={{
          title: 'Add Transaction',
        }}
      />
      <AdminStack.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{
          title: 'Transactions',
        }}
      />
      <AdminStack.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          title: 'Reports',
        }}
      />
      <AdminStack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </AdminStack.Navigator>
  );
};

export default AdminStackNavigator;
