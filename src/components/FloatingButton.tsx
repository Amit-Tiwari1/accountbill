import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface FloatingButtonProps {
    iconName?: string;
    onPress: () => void;
    size?: number;
    color?: string;
    backgroundColor?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
    iconName = 'add',
    onPress,
    size = 28,
    color = 'white',
    backgroundColor = 'blue',
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor, width: size * 2, height: size * 2, borderRadius: size }]}
            onPress={onPress}
        >
            <MaterialIcons name={iconName} size={size} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});

export default FloatingButton;
