// components/CustomInput.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Colors from '../theme/Colors';

interface CustomInputProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    value,
    onChangeText,
    placeholder = '',
    ...props
}) => {
    const theme = useTheme();

    return (
        <TextInput
            style={[styles.input, { borderColor: Colors.border, color: theme.colors.onSurface }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: '500',
        marginTop: 12,
        borderColor: Colors.border,
    },
});

export default CustomInput;
