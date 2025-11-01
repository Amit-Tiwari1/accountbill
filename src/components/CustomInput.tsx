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
    keyboardType?: KeyboardTypeOptions;
}

const CustomInput: React.FC<CustomInputProps> = ({
    value,
    onChangeText,
    placeholder = '',
    keyboardType = 'default',
    editable = true,
    style,
    ...props
}) => {
    const theme = useTheme();

    return (
        <TextInput
            style={[
                styles.input,
                {
                    borderColor: Colors.border,
                    color: theme.colors.onSurface,
                    backgroundColor: editable ? '#f7f6f6ff' : '#f9fafb'
                },
                !editable && styles.disabledInput,
                style,
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            keyboardType={keyboardType}
            editable={editable}
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
        fontWeight: 'normal',
    },
    disabledInput: {
        opacity: 0.7,
    },
});

export default CustomInput;