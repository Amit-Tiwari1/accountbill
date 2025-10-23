import React from 'react';
import TabLayout from '../../../UI/TabLayout';
import ItemsScreen from './ItemsScreen';
import ServicesScreen from './ServicesScreen';

const ProductsScreen = () => {
    return (
        <TabLayout
            tabs={[
                { name: 'Items', component: ItemsScreen },
                { name: 'Services', component: ServicesScreen },
            ]}
            placeholder="Search products..."
            onSearch={(text) => console.log('Search:', text)}
            onAddPress={() => console.log('Add Pressed')}
            onRefreshPress={() => console.log('Refresh Pressed')}
        />
    );
};

export default ProductsScreen;
