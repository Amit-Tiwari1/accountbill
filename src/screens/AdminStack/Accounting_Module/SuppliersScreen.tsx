import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeContext';
import Accordion from '../../../components/Accordion';
import FloatingButton from '../../../components/FloatingButton';

interface Supplier {
    id: number;
    name: string;
    phone: string;
    balance: string;
    details: string;
}

const SuppliersScreen = () => {
    const theme = useTheme();
    const [suppliers, setSuppliers] = useState<Supplier[]>([
        { id: 1, name: 'ABC Traders', phone: '9876543210', balance: '₹1,500', details: 'Monthly supply' },
        { id: 2, name: 'XYZ Suppliers', phone: '9123456789', balance: '₹800', details: 'Weekly supply' },
    ]);

    const addSupplier = () => {
        const newSupplier: Supplier = {
            id: Date.now(),
            name: `New Supplier ${suppliers.length + 1}`,
            phone: '9000000000',
            balance: '₹0',
            details: 'Newly added supplier',
        };
        setSuppliers([newSupplier, ...suppliers]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>
            <FlatList
                data={suppliers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Accordion
                        title={item.name}
                        subtitle={item.phone}
                        details={item.details}
                        balance={item.balance}
                        onExtraPress={() => console.log(`Viewing ${item.name}`)}
                    />
                )}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            />

            <FloatingButton onPress={addSupplier} backgroundColor={theme.colors.primary} color={theme.colors.onPrimary} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default SuppliersScreen;
