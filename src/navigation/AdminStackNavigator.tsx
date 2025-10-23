// src/navigation/AdminTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Correct import for RN CLI
import { useTheme } from '../theme/ThemeContext';

// Import screens
import ExpenseScreen from '../screens/AdminStack/Accounting_Module/ExpenseScreen';
import BillsScreen from '../screens/AdminStack/Accounting_Module/BillsScreen';
import PartiesScreen from '../screens/AdminStack/Accounting_Module/PartiesScreen';
import ProductsScreen from '../screens/AdminStack/Accounting_Module/ProductsScreen';

export type AdminStackParamList = {
  Bills: undefined;
  Parties: undefined;
  Products: undefined;
  Settings: undefined;
  Expense: undefined;
};

const Tab = createBottomTabNavigator<AdminStackParamList>();

const screens = [
  { name: 'Expense', component: ExpenseScreen, label: 'Home', icon: 'home', rounded: false },
  { name: 'Parties', component: PartiesScreen, label: 'Parties', icon: 'people', rounded: false },
  { name: 'Bills', component: BillsScreen, label: 'Bills', icon: 'description', rounded: true },
  { name: 'Products', component: ProductsScreen, label: 'Products', icon: 'inventory', rounded: false },
  // { name: 'Settings', component: SettingsScreen, label: 'More', icon: 'more-horiz', rounded: false },
];

const AdminTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.background,
          height: 60,
          paddingBottom: 5,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name as keyof AdminStackParamList}
          component={screen.component}
          options={{
            tabBarLabel: screen.label,
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* Active line on top */}
                {focused && (
                  <View
                    style={{
                      width: 24,
                      height: 3,
                      backgroundColor: theme.colors.primary,
                      borderRadius: 2,
                      marginBottom: 4,
                    }}
                  />
                )}

                {/* Optional rounded background */}
                {screen.rounded ? (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: theme.colors.surface,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialIcons name={screen.icon} size={24} color={color} />
                  </View>
                ) : (
                  <MaterialIcons name={screen.icon} size={24} color={color} />
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;