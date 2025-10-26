// components/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    backgroundColor?: string;
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    title,
    style,
    textStyle,
    backgroundColor,
    disabled = false, // ✅ Default false
}) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: backgroundColor || theme.colors.primary,
                    opacity: disabled ? 0.6 : 1, // ✅ Visual feedback for disabled state
                },
                style,
                disabled && styles.disabledButton, // ✅ Additional disabled styles
            ]}
            onPress={onPress}
            disabled={disabled} // ✅ Native disabled prop
        >
            <Text style={[
                styles.buttonText,
                textStyle,
                disabled && styles.disabledText // ✅ Optional disabled text styling
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    disabledButton: {
        // Additional disabled styles if needed
        // backgroundColor: '#cccccc', // You can override background color when disabled
    },
    disabledText: {
        // Additional text styles for disabled state
        // color: '#999999',
    },
});

export default CustomButton;