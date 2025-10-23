import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/ThemeContext';

interface CustomSearchBarProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    onClosePress?: () => void;
    onRefreshPress?: () => void;
    containerStyle?: object;
    inputStyle?: object;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
    placeholder = 'Search...',
    value,
    onChangeText,
    onClosePress,
    onRefreshPress,
    containerStyle,
    inputStyle,
}) => {
    const theme = useTheme();

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.searchSection, { borderColor: theme.colors.onPrimary }]}>
                <MaterialIcons name="search" size={22} color="#555" />
                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onClosePress} style={[styles.iconButton, { backgroundColor: theme.colors.primary }]}>
                    <MaterialIcons name="close" size={24} color={theme.colors.surface} />
                </TouchableOpacity>


            </View>
        </View>
    );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 3,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 50,
        paddingHorizontal: 8,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 8,
        color: '#333',
    },
    iconContainer: {
        flexDirection: 'row',
        marginLeft: 6,
    },
    iconButton: {
        marginHorizontal: 4,
        padding: 4,
        borderRadius: 50,
    },
});
