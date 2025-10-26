// src/components/SessionExpiredModal.tsx
import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

type Props = {
    visible: boolean;
    onDismiss: () => void;
};

const SessionExpiredModal: React.FC<Props> = ({ visible, onDismiss }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 3000); // 3 seconds

            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Session Expired</Text>
                    <Text style={styles.message}>
                        Your session has expired. Redirecting to login...
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SessionExpiredModal;
