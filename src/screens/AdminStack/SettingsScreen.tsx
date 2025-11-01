import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../components/CommonHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SettingItem {
    id: number;
    title: string;
    subtitle?: string;
    icon: string;
    onPress?: () => void;
}

const SettingsScreen = () => {
    const theme = useTheme();

    const settings: SettingItem[] = [
        { id: 1, title: 'Profile', subtitle: 'Update your info', icon: 'person', onPress: () => console.log('Profile clicked') },
        { id: 2, title: 'Notifications', subtitle: 'Manage notifications', icon: 'notifications', onPress: () => console.log('Notifications clicked') },
        { id: 3, title: 'Social Media Management', subtitle: 'Manage your social accounts', icon: 'share', onPress: () => console.log('Social Media clicked') },
        { id: 4, title: 'Payroll Management', subtitle: 'Manage employee payroll', icon: 'account-balance', onPress: () => console.log('Payroll clicked') },
        { id: 5, title: 'Security', subtitle: 'Change password & PIN', icon: 'lock', onPress: () => console.log('Security clicked') },
        { id: 6, title: 'About', subtitle: 'App version & info', icon: 'info', onPress: () => console.log('About clicked') },
    ];

    const renderSetting = ({ item }: { item: SettingItem }) => (
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.surface }]} onPress={item.onPress}>
            <MaterialIcons name={item.icon} size={28} color={theme.colors.primary} />
            <View style={{ marginLeft: 12 }}>
                <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>{item.title}</Text>
                {item.subtitle && <Text style={[styles.settingSubtitle, { color: theme.colors.onSurfaceVariant }]}>{item.subtitle}</Text>}
            </View>
            <MaterialIcons name="chevron-right" size={28} color={theme.colors.onSurfaceVariant} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>

            <CommonHeader
                Subtitle="Setting"
                showBackButton={true}
                onRightPress={() => console.log('Back pressed')}

                rightIcon="account-circle"
            />
            {/* User Details */}
            <View style={[styles.userContainer, { backgroundColor: theme.colors.surface }]}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.avatar}
                />
                <View style={{ marginLeft: 12 }}>
                    <Text style={[styles.userName, { color: theme.colors.onSurface }]}>Vivek Mishra</Text>
                    <Text style={[styles.userEmail, { color: theme.colors.onSurfaceVariant }]}>vivek@example.com</Text>
                </View>
            </View>

            {/* Settings List */}
            <FlatList
                data={settings}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSetting}
                contentContainerStyle={{ padding: 16 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        margin: 16,
        marginBottom: 8,
        elevation: 2,
    },
    avatar: { width: 60, height: 60, borderRadius: 30 },
    userName: { fontSize: 18, fontWeight: '600' },
    userEmail: { fontSize: 14, marginTop: 2 },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
    },
    settingTitle: { fontSize: 16, fontWeight: '500' },
    settingSubtitle: { fontSize: 13, marginTop: 2 },
});

export default SettingsScreen;
