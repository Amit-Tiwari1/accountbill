import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // ✅ fixed import

interface CommonHeaderProps {
    title: string;
    onBack?: () => void;
    showBackButton?: boolean;
    rightIcon?: string;
    onRightPress?: () => void;
    roundedBottom?: boolean; // ✅ new prop to toggle border radius
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
    title,
    onBack,
    showBackButton = true,
    rightIcon,
    onRightPress,
    roundedBottom = true, // ✅ default true
}) => {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.surface,
                    borderBottomLeftRadius: roundedBottom ? 24 : 0,
                    borderBottomRightRadius: roundedBottom ? 24 : 0,
                },
            ]}
        >
            {/* Left Section */}
            <View style={styles.leftSection}>
                {showBackButton ? (
                    <TouchableOpacity
                        onPress={onBack}
                        style={[
                            styles.iconButton,
                            {
                                backgroundColor: theme.colors.lightBackground,
                                width: 40,
                            },
                        ]}
                    >
                        <MaterialIcons name="arrow-back" size={28} color={theme.colors.surface} />
                    </TouchableOpacity>
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                            <MaterialIcons
                                name="account-circle"
                                size={30}
                                color={theme.colors.lightBackground}
                            />
                        </TouchableOpacity>
                        <Text
                            style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    </View>
                )}
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
                {rightIcon ? (
                    <TouchableOpacity
                        onPress={onRightPress}
                        style={[
                            styles.iconButton,
                            {
                                backgroundColor: theme.colors.lightBackground,
                                width: 30,
                                height: 30,
                            },
                        ]}
                    >
                        <MaterialIcons
                            name={rightIcon as any}
                            size={25}
                            color={theme.colors.surface}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.placeholder} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        elevation: 0,
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'left',
        flex: 1,
        marginLeft: 8,
    },
});

export default CommonHeader;
