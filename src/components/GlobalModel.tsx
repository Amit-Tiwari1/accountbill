import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

interface GlobalModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    headerText?: string;
    children: React.ReactNode;
}

const screenHeight = Dimensions.get('window').height;

const GlobalModal: React.FC<GlobalModalProps> = ({
    modalVisible,
    setModalVisible,
    headerText = '',
    children,
}) => {
    const theme = useTheme();

    return (
        <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPressOut={() => setModalVisible(false)}
            >
                <View style={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}>
                    {/* Header with close button */}
                    <View style={styles.headerContainer}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>{headerText}</Text>
                        <TouchableOpacity style={{ backgroundColor: theme.colors.error, borderRadius: 20, padding: 2 }} onPress={() => setModalVisible(false)}>
                            <MaterialIcons name="close" size={20} color={theme.colors.surface} />
                        </TouchableOpacity>
                    </View>
                    {/* Divider */}
                    <View style={styles.divider} />
                    {/* Children */}
                    <View style={{ marginTop: 12 }}>{children}</View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end', // bottom alignment
    },
    modalContainer: {
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        maxHeight: '70%',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginTop: 8,
    },
});

export default GlobalModal;
