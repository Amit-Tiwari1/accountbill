import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeContext';
import Accordion from '../../../components/Accordion';

interface Invoice {
    id: number;
    number: string;
    client: string;
    amount: string;
    details: string;
}

const InvoicesScreen = () => {
    const theme = useTheme();
    const [invoices, setInvoices] = useState<Invoice[]>([
        { id: 1, number: 'INV-1001', client: 'Rahul Sharma', amount: '₹12,000', details: 'Paid via UPI' },
        { id: 2, number: 'INV-1002', client: 'Priya Verma', amount: '₹8,000', details: 'Pending payment' },
        { id: 3, number: 'INV-1003', client: 'Amit Singh', amount: '₹15,000', details: 'Paid via Bank Transfer' },
    ]);

    const addInvoice = () => {
        const newInvoice: Invoice = {
            id: Date.now(),
            number: `INV-${1000 + invoices.length + 1}`,
            client: `New Client ${invoices.length + 1}`,
            amount: '₹0',
            details: 'Newly added invoice',
        };
        setInvoices([newInvoice, ...invoices]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>
            <FlatList
                data={invoices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Accordion
                        title={item.number}
                        subtitle={item.client}
                        details={item.details}
                        balance={item.amount}
                        onExtraPress={() => console.log(`Viewing ${item.number}`)}
                    />
                )}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            />

            =
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default InvoicesScreen;
