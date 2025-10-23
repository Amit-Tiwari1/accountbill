import React from 'react';
import InvoicesScreen from './InvoicesScreen';
import QuatationScreen from './QuatationScreen';
import TabbedScreenLayout from '../../../UI/TabLayout';


const BillsScreen = () => {


    return (

        <TabbedScreenLayout
            tabs={[
                { name: 'Invoices', component: InvoicesScreen },
                { name: 'Quatations', component: QuatationScreen },
            ]}
            placeholder="Search products..."
            onSearch={(text) => console.log('Search:', text)}
            onAddPress={() => console.log('Add Pressed')}
            onRefreshPress={() => console.log('Refresh Pressed')}
        />

    );
};



export default BillsScreen;
