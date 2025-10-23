import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import AdminTabNavigator from './AdminStackNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonHeader from '../components/CommonHeader';

const { width } = Dimensions.get('window');
const DrawerWidth = width * 0.7;

const DrawerNavigator = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState("Account management");
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

    // Example company details (replace with dynamic data)
    const companyDetails = {
        name: 'ACME Corp.',
        email: 'contact@acme.com',
        logo: 'https://i.ibb.co/7pR9qZc/acme-logo.png',
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background, }}>
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
                <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                        {/* Drawer Header */}
                        <View style={[styles.drawerHeader, { backgroundColor: theme.colors.primary }]}>
                            <View style={styles.companyInfo}>
                                <Image
                                    source={{ uri: companyDetails.logo }}
                                    style={styles.companyLogo}
                                    resizeMode="cover"
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[styles.companyName, { color: theme.colors.surface }]}>
                                        {companyDetails.name}
                                    </Text>
                                    <Text style={[styles.companyEmail, { color: theme.colors.surface }]}>
                                        {companyDetails.email}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={toggleDrawer}
                                style={[styles.closeButton, { backgroundColor: theme.colors.surface }]}
                            >
                                <MaterialIcons name="close" size={28} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>

                        {/* Menu Items */}
                        {[
                            { label: "Account management", icon: "account-balance", module: "account_management" },
                            { label: "Staff and staff attendance management", icon: "people", module: "staff_attendance" },
                            { label: "Payrolls management", icon: "payment", module: "payrolls_management" },
                            { label: "Lead's management", icon: "supervisor-account", module: "lead_management" },
                            { label: "Social media marketing management", icon: "share", module: "social_media_marketing" },
                            { label: "Ad-hoc reports management", icon: "assessment", module: "adhoc_reports" },
                        ].map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => {
                                    setSelectedModule(item.label);
                                    toggleDrawer();
                                }}
                                style={styles.drawerItem}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons
                                        name={item.icon}
                                        size={20}
                                        color={theme.colors.primary}
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text style={{ color: theme.colors.primary, fontSize: 16, fontWeight: "600" }}>
                                        {item.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Bottom Buttons */}
                    <View style={styles.bottomButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.bottomButton,]}
                            onPress={() => console.log('Settings pressed')}
                        >
                            <MaterialIcons name="settings" size={30} color={theme.colors.primary} />

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.bottomButton,]}
                            onPress={() => console.log('Logout pressed')}
                        >
                            <MaterialIcons name="logout" size={30} color={theme.colors.primary} />

                        </TouchableOpacity>
                    </View>
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
                <CommonHeader
                    title="Hi Vvek"
                    showBackButton={false}
                    onRightPress={toggleDrawer}
                    onBack={() => console.log('Back pressed')}
                    rightIcon="account-circle"
                />
                <View style={{ flex: 1, }}>
                    {selectedModule === "Account management" ? (
                        <AdminTabNavigator />
                    ) : (
                        <View style={[styles.comingSoonContainer, {
                            backgroundColor: theme.colors.onPrimary,

                        }]}>
                            <Text style={[styles.comingSoonTitle, {
                                color: theme.colors.primary,

                            }]}>{selectedModule}</Text>
                            <Text style={[styles.comingSoonSubtitle, {
                                color: theme.colors.onSurface,

                            }]}>Coming Soon 🚀</Text>
                        </View>

                    )}

                </View>
            </Animated.View>

            {/* Overlay */}
            {drawerOpen && (
                <Animated.View
                    style={[StyleSheet.absoluteFill, { backgroundColor: '#000', opacity: overlayOpacity }]}
                >
                    <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={toggleDrawer} />
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
        zIndex: 2,
        elevation: 5,
    },
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 20
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    companyLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },

    companyName: {
        fontSize: 20,
        fontWeight: '700',
    },
    companyEmail: {
        fontSize: 14,
        marginTop: 2,
    },
    closeButton: {
        padding: 2,
        borderRadius: 50,
        fontWeight: "800",
        position: "absolute",
        top: 10,
        left: 238,
        overflow: "hidden"
    },
    drawerItem: {
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        paddingHorizontal: 20,
    },
    comingSoonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    comingSoonTitle: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
    },

    comingSoonSubtitle: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    bottomButtonsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
    },

    bottomButtonText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },


});

export default DrawerNavigator;
