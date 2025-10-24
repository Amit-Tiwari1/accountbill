import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import Accordion from '../../../components/Accordion';
import FloatingButton from '../../../components/FloatingButton';

interface Service {
    id: number;
    name: string;
    code: string;
    price: string;
    details: string;
}

const ServicesScreen = () => {
    const theme = useTheme();
    const [services, setServices] = useState<Service[]>([
        { id: 1, name: 'Web Design', code: 'SR-1001', price: '₹25,000', details: 'Includes UI/UX and responsive design' },
        { id: 2, name: 'SEO Optimization', code: 'SR-1002', price: '₹10,000', details: 'On-page and Off-page SEO' },
        { id: 3, name: 'Social Media Marketing', code: 'SR-1003', price: '₹15,000', details: 'Facebook & Instagram campaigns' },
    ]);

    const addService = () => {
        const newService: Service = {
            id: Date.now(),
            name: `New Service ${services.length + 1}`,
            code: `SR-${1000 + services.length + 1}`,
            price: '₹0',
            details: 'Newly added service',
        };
        setServices([newService, ...services]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>
            <FlatList
                data={services}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Accordion
                        title={item.name}
                        subtitle={item.code}
                        details={item.details}
                        balance={item.price}
                        onExtraPress={() => console.log(`Viewing ${item.name}`)}
                    />
                )}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            />

            <FloatingButton
                onPress={addService}
                backgroundColor={theme.colors.primary}
                color={theme.colors.onPrimary}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default ServicesScreen;
