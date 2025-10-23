import React, { useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import CustomSearchBar from '../components/CustomSearchBar';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface TabConfig {
    name: string;
    component: React.ComponentType<any>;
    options?: MaterialTopTabNavigationOptions;
}

interface TabbedScreenLayoutProps {
    tabs: TabConfig[];
    placeholder?: string;
    onSearch?: (text: string) => void;
    onAddPress?: () => void;
    onRefreshPress?: () => void;
    backgroundColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

const Tab = createMaterialTopTabNavigator();

const TabbedScreenLayout: React.FC<TabbedScreenLayoutProps> = ({
    tabs,
    placeholder = 'Search...',
    onSearch,
    onAddPress,
    onRefreshPress,
    backgroundColor,
    containerStyle,
}) => {
    const theme = useTheme();
    const [searchText, setSearchText] = useState('');
    const [showSearch, setShowSearch] = useState(false); // Toggle search bar

    const handleSearchChange = (text: string) => {
        setSearchText(text);
        onSearch?.(text);
    };

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                containerStyle,
                {
                    backgroundColor: backgroundColor ?? theme.colors.onPrimary,
                },
            ]}
        >

            {showSearch && (
                <CustomSearchBar
                    placeholder={placeholder}
                    value={searchText}
                    onChangeText={handleSearchChange}
                    onAddPress={onAddPress}
                    onRefreshPress={onRefreshPress}
                    containerStyle={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        paddingHorizontal: 10,
                        backgroundColor: theme.colors.surface,
                    }}
                />
            )}
            {/* Tab Navigator */}
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
                    {tabs.map((tab) => (
                        <Tab.Screen
                            key={tab.name}
                            name={tab.name}
                            component={tab.component}
                            options={tab.options}
                        />
                    ))}
                </Tab.Navigator>

                {/* Three-dot icon to toggle search */}
                <TouchableOpacity
                    style={styles.moreIconWrapper}
                    onPress={() => setShowSearch((prev) => !prev)}
                >
                    <MaterialIcons name="more-vert" size={28} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Floating Search Bar */}

        </SafeAreaView>
    );
};

export default TabbedScreenLayout;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    tabContainer: {
        flex: 1,
    },
    tabBar: {
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    searchBarWrapper: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 20 : 80,
        left: 16,
        right: 16,
    },
    moreIconWrapper: {
        position: 'absolute',
        right: 10,
        top: Platform.OS === 'ios' ? 4 : 10,
        zIndex: 50,
        padding: 4,
    },
});
