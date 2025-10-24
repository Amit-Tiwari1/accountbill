import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ItemsScreen from './ItemsScreen';
import ServicesScreen from './ServicesScreen';

const Tab = createMaterialTopTabNavigator();

const ProductsScreen = () => {
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, {
            backgroundColor: theme.colors.onPrimary,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
        }]}>

            <View style={styles.tabContainer}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: theme.colors.primary,
                        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
                        tabBarLabelStyle: { fontWeight: '600' },
                        tabBarStyle: [
                            styles.tabBar,
                            { backgroundColor: theme.colors.surface },
                        ],
                    }}
                >
                    <Tab.Screen name="Items" component={ItemsScreen} />
                    <Tab.Screen name="Servies" component={ServicesScreen} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    card: {
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',

    },
    tabContainer: {
        flex: 1,
    },
    tabBar: {
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
});

export default ProductsScreen;
