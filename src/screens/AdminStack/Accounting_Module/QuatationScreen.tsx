import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeContext';
import Accordion from '../../../components/Accordion';

interface Quotation {
    id: number;
    number: string;
    client: string;
    amount: string;
    details: string;
}

const QuotationScreen = () => {
    const theme = useTheme();
    const [quotations, setQuotations] = useState<Quotation[]>([
        { id: 1, number: 'QT-1001', client: 'Rahul Sharma', amount: '₹12,000', details: 'Valid for 30 days' },
        { id: 2, number: 'QT-1002', client: 'Priya Verma', amount: '₹8,000', details: 'Includes taxes' },
        { id: 3, number: 'QT-1003', client: 'Amit Singh', amount: '₹15,000', details: 'Pending approval' },
    ]);

    const addQuotation = () => {
        const newQuotation: Quotation = {
            id: Date.now(),
            number: `QT-${1000 + quotations.length + 1}`,
            client: `New Client ${quotations.length + 1}`,
            amount: '₹0',
            details: 'Newly added quotation',
        };
        setQuotations([newQuotation, ...quotations]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>
            <FlatList
                data={quotations}
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


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default QuotationScreen;
