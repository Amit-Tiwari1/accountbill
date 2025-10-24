import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import Accordion from '../../../components/Accordion';
import FloatingButton from '../../../components/FloatingButton';

interface Item {
    id: number;
    name: string;
    sku: string;
    price: string;
    details: string;
}

const ItemsScreen = () => {
    const theme = useTheme();
    const [items, setItems] = useState<Item[]>([
        { id: 1, name: 'Laptop', sku: 'LT-1001', price: '₹50,000', details: '16GB RAM, 512GB SSD' },
        { id: 2, name: 'Mobile Phone', sku: 'MP-1002', price: '₹15,000', details: 'Android, 6GB RAM' },
        { id: 3, name: 'Wireless Mouse', sku: 'WM-1003', price: '₹1,200', details: 'Bluetooth, Ergonomic' },
    ]);

    const addItem = () => {
        const newItem: Item = {
            id: Date.now(),
            name: `New Item ${items.length + 1}`,
            sku: `IT-${1000 + items.length + 1}`,
            price: '₹0',
            details: 'Newly added item',
        };
        setItems([newItem, ...items]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Accordion
                        title={item.name}
                        subtitle={item.sku}
                        details={item.details}
                        balance={item.price}
                        onExtraPress={() => console.log(`Viewing ${item.name}`)}
                    />
                )}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            />

            <FloatingButton
                onPress={addItem}
                backgroundColor={theme.colors.primary}
                color={theme.colors.onPrimary}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default ItemsScreen;
