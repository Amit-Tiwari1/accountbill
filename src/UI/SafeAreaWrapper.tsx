import React from 'react';
import { StatusBar, View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/Colors';

interface SafeAreaWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    backgroundColor?: string;
    edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
    children,
    style,
    backgroundColor = Colors.background,
    edges = ['top', 'bottom'],
}) => {
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={edges}>
            <View style={[styles.container, style]}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
});

export default SafeAreaWrapper;
