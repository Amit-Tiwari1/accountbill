import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // ✅ fixed import
import { useAppSelector } from '../hook/hooks';
import api from '../services/api/axiosInstance';
import { getLogoUrl } from '../utils/helper';
import Colors from '../theme/Colors';
import { useNavigation } from '@react-navigation/native';

interface CommonHeaderProps {
    title?: string;
    Subtitle?: string;

    showBackButton?: boolean;
    showMenuButton?: boolean;
    rightIcon?: string;
    onRightPress?: () => void;
    roundedBottom?: boolean;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
    title,
    Subtitle,

    showBackButton = true,
    showMenuButton = true,
    rightIcon,
    onRightPress,
    roundedBottom = true, // ✅ default true
}) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { currentCompany } = useAppSelector((state: any) => state.company);


    console.log("currentCompany", currentCompany);

    const handleBackPress = () => {
        navigation.goBack();
    };

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

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleBackPress}
                            style={[
                                styles.iconButton,
                                {
                                    backgroundColor: theme.colors.primary,
                                    width: 30,
                                },
                            ]}
                        >
                            <MaterialIcons name="arrow-back" size={28} color={theme.colors.surface} />
                        </TouchableOpacity>
                        <Text
                            style={[styles.title, { color: theme.colors.onSurface }]}
                            numberOfLines={1}
                        >
                            {Subtitle}
                        </Text>
                    </View>
                ) : (

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {
                            showMenuButton &&
                            (
                                <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                                    <MaterialIcons
                                        name="menu"
                                        size={30}
                                        color={theme.colors.primary}
                                    />
                                </TouchableOpacity>
                            )
                        }
                        <Text
                            style={[styles.title, { color: theme.colors.onSurface }]}
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
                                backgroundColor: theme.colors.primary,
                                width: 30,
                                height: 30,
                                borderRadius: 15, // Make it circular
                                overflow: 'hidden', // Clip the image to rounded corners
                            },
                        ]}
                    >
                        {currentCompany?.logo ? (
                            <Image
                                source={{
                                    uri: getLogoUrl(currentCompany.logo) as string
                                }}
                                style={styles.companyLogo}
                                resizeMode="cover"
                                onError={(e) => console.log('Failed to load company logo:', e.nativeEvent.error)}
                            />
                        ) : (
                            <MaterialIcons
                                name={rightIcon as any}
                                size={20} // Slightly smaller to fit better
                                color={theme.colors.surface}
                            />
                        )}
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
    companyLogo: {
        width: 30,
        height: 30,
        borderRadius: 15,

        // White border to separate from shadow
        borderWidth: 1,
        borderColor: Colors.primary,

        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    iconButton: {
        width: 30,
        height: 30,
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
