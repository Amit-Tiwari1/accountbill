import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import Accordion from '../../components/Accordion';
import FloatingButton from '../../components/FloatingButton';

interface Customer {
    id: number;
    name: string;
    phone: string;
    balance: string;
    details: string;
}

const CustomersScreen = () => {
    const theme = useTheme();
    const [customers, setCustomers] = useState<Customer[]>([
        { id: 1, name: 'Rahul Sharma', phone: '9876543210', balance: '₹1,200', details: 'Regular customer since 2023' },
        { id: 2, name: 'Priya Verma', phone: '9123456789', balance: '₹800', details: 'Pays monthly via UPI' },
        { id: 3, name: 'Amit Singh', phone: '9988776655', balance: '₹0', details: 'No pending balance' },
    ]);

    const addCustomer = () => {
        const newCustomer: Customer = {
            id: Date.now(),
            name: `New Customer ${customers.length + 1}`,
            phone: '9000000000',
            balance: '₹0',
            details: 'Newly added customer',
        };
        setCustomers([newCustomer, ...customers]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>
            <FlatList
                data={customers}
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

            <FloatingButton onPress={addCustomer} backgroundColor={theme.colors.primary} color={theme.colors.onPrimary} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default CustomersScreen;
