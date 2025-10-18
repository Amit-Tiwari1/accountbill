import { StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const SuppliersScreen = () => {
    const theme = useTheme();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default SuppliersScreen