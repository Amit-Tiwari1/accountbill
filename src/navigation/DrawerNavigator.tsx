// src/navigation/CustomDrawerNavigator.tsx
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import AdminTabNavigator from './AdminStackNavigator';
import CommonHeader from '../components/CommonHeader';

const { width } = Dimensions.get('window');
const DrawerWidth = width * 0.7;
const Stack = createStackNavigator();

const DrawerNavigator = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const theme = useTheme();

    const toggleDrawer = () => {
        Animated.timing(animation, {
            toValue: drawerOpen ? 0 : 1,
            duration: 250,
            useNativeDriver: true,
        }).start(() => setDrawerOpen(!drawerOpen));
    };

    const drawerTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-DrawerWidth, 0],
    });

    const contentTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, DrawerWidth],
    });

    const overlayOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.4],
    });

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* Drawer menu */}
            <Animated.View
                style={[
                    styles.drawer,
                    {
                        transform: [{ translateX: drawerTranslate }],
                        backgroundColor: theme.colors.surface,
                    },
                ]}
            >
                <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
                    <Text style={[styles.drawerTitle, { color: theme.colors.surfaceVariant }]}>Menu</Text>

                    {[
                        { label: 'Dashboard', action: toggleDrawer },
                        { label: 'Reports', action: toggleDrawer },
                        { label: 'Settings', action: toggleDrawer },
                    ].map((item, idx) => (
                        <TouchableOpacity key={idx} onPress={item.action} style={styles.drawerItem}>
                            <Text style={{ color: theme.colors.surfaceVariant, fontSize: 16 }}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </SafeAreaView>
            </Animated.View>

            {/* Main content */}
            <Animated.View
                style={{
                    flex: 1,
                    transform: [{ translateX: contentTranslate }],
                    borderRadius: drawerOpen ? 15 : 0,
                    overflow: 'hidden',
                }}
            >
                {/* Common Header with Menu button */}
                <CommonHeader
                    title="Hi Vvek"
                    showBackButton={false}
                    onRightPress={toggleDrawer}
                    onBack={() => console.log('Back pressed')}
                    rightIcon="account-circle"
                />

                {/* Tab Navigator */}
                <View style={{ flex: 1 }}>
                    <AdminTabNavigator />
                </View>
            </Animated.View>

            {/* Overlay when drawer open */}
            {drawerOpen && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: '#000', opacity: overlayOpacity },
                    ]}
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={toggleDrawer}
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: DrawerWidth,
        paddingTop: 50,
        zIndex: 2,
        elevation: 5,
    },
    drawerTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
    },
    drawerItem: {
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    },
});

export default DrawerNavigator;
