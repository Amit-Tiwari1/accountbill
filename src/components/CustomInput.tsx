// components/CustomInput.tsx
import React from 'react';
import {
    TextInput,
    StyleSheet,
    TextInputProps,
    KeyboardTypeOptions
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Colors from '../theme/Colors';

interface CustomInputProps extends Omit<TextInputProps, 'keyboardType'> {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions; // ✅ Correctly typed
}

const CustomInput: React.FC<CustomInputProps> = ({
    value,
    onChangeText,
    placeholder = '',
    keyboardType = 'default', // ✅ Default safely typed
    ...props
}) => {
    const theme = useTheme();

    return (
        <TextInput
            style={[
                styles.input,
                { borderColor: Colors.border, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' },
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            keyboardType={keyboardType} // ✅ No type errors now
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'normal', // ✅ Default to normal
        borderColor: Colors.border,
    },
});

export default CustomInput;
