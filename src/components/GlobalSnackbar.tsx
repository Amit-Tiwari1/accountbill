// src/components/GlobalSnackbar.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
// import { useTheme } from '../theme/Theme';

type SnackbarType = 'success' | 'error' | 'warning';

interface SnackbarContextProps {
    showMessage: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
    showMessage: () => { },
});

export const useSnackbar = () => useContext(SnackbarContext);

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<SnackbarType>('success');
    const [slideAnim] = useState(new Animated.Value(0));

    const showMessage = (msg: string, msgType: SnackbarType = 'success') => {
        setMessage(msg);
        setType(msgType);
        setVisible(true);

        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Auto hide after 3 seconds
        setTimeout(() => {
            hideSnackbar();
        }, 3000);
    };

    const hideSnackbar = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
        });
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return '#4caf50';
            case 'error':
                return '#f44336';
            case 'warning':
                return '#ff9800';
            default:
                return '#333';
        }
    };

    const getTextColor = () => {
        return '#fff';
    };

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}
            {visible && (
                <Animated.View
                    style={[
                        styles.snackbar,
                        {
                            backgroundColor: getBackgroundColor(),
                            transform: [
                                {
                                    translateY: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [100, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={[styles.snackbarText, { color: getTextColor() }]}>
                        {message}
                    </Text>
                    <TouchableOpacity onPress={hideSnackbar} style={styles.dismissButton}>
                        <Text style={[styles.dismissText, { color: getTextColor() }]}>✕</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </SnackbarContext.Provider>
    );
};

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    snackbarText: {
        flex: 1,
        fontSize: 14,
    },
    dismissButton: {
        marginLeft: 8,
        padding: 4,
    },
    dismissText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
