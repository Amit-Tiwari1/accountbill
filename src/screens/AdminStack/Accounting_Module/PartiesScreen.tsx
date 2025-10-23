import { StyleSheet } from 'react-native';
import React from 'react';
import CustomersScreen from './CustomersScreen';
import SuppliersScreen from './SuppliersScreen';
import TabLayout from '../../../UI/TabLayout';


const PartiesScreen = () => {


  return (


    <TabLayout
      tabs={[
        { name: 'Customers', component: CustomersScreen },
        { name: 'Suppliers', component: SuppliersScreen },
      ]}
      placeholder="Search products..."
      onSearch={(text) => console.log('Search:', text)}
      onAddPress={() => console.log('Add Pressed')}
      onRefreshPress={() => console.log('Refresh Pressed')}
    />

  );
};



export default PartiesScreen;
