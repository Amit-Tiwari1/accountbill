import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
// import { Feather } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: string; // optional icon
  secure?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
//   icon,
  secure,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrapper, error ? styles.errorBorder : null]}>
        <TextInput
          style={[styles.input, style]}
          secureTextEntry={secure && !showPassword}
          placeholderTextColor={colors.placeholder}
          {...props}
        />
        {secure && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            {/* <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={colors.placeholder}
            /> */}
          </TouchableOpacity>
        )}
        {/* {icon && !secure && (
          <Feather name={icon} size={20} color={colors.placeholder} />
        )} */}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: colors.text,
  },
  icon: {
    marginLeft: 8,
  },
  errorText: {
    color: colors.error,
    marginTop: 4,
    fontSize: 12,
  },
  errorBorder: {
    borderColor: colors.error,
  },
});

export default Input;
