import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

interface TransactionsScreenProps {
  navigation: any;
}

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // Mock data - replace with actual data from your state management
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 150.00,
      description: 'Grocery Shopping',
      category: 'Food',
      type: 'expense',
      date: '2024-01-15',
    },
    {
      id: '2',
      amount: 2500.00,
      description: 'Salary',
      category: 'Income',
      type: 'income',
      date: '2024-01-14',
    },
    {
      id: '3',
      amount: 45.00,
      description: 'Gas Station',
      category: 'Transportation',
      type: 'expense',
      date: '2024-01-13',
    },
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionContent}>
        <View style={styles.transactionHeader}>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.amount,
                { color: item.type === 'income' ? '#4CAF50' : '#F44336' }
              ]}
            >
              {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
            </Text>
            <View
              style={[
                styles.typeChip,
                { backgroundColor: item.type === 'income' ? '#E8F5E8' : '#FFEBEE' }
              ]}
            >
              <Text style={styles.typeChipText}>{item.type}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TextInput
          placeholder="Search transactions..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filterType === 'all' && styles.filterChipSelected
            ]}
            onPress={() => setFilterType('all')}
          >
            <Text style={[
              styles.filterChipText,
              filterType === 'all' && styles.filterChipTextSelected
            ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filterType === 'income' && styles.filterChipSelected
            ]}
            onPress={() => setFilterType('income')}
          >
            <Text style={[
              styles.filterChipText,
              filterType === 'income' && styles.filterChipTextSelected
            ]}>
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filterType === 'expense' && styles.filterChipSelected
            ]}
            onPress={() => setFilterType('expense')}
          >
            <Text style={[
              styles.filterChipText,
              filterType === 'expense' && styles.filterChipTextSelected
            ]}>
              Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No transactions found
            </Text>
            <Text style={styles.emptySubtext}>
              Add your first transaction to get started
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.fabLabel}>Add Transaction</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchbar: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterChip: {
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipSelected: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  filterChipTextSelected: {
    color: 'white',
  },
  listContainer: {
    padding: 20,
  },
  transactionCard: {
    marginBottom: 10,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  transactionContent: {
    padding: 16,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  category: {
    color: '#666',
    marginTop: 2,
    fontSize: 14,
  },
  date: {
    color: '#999',
    marginTop: 2,
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  typeChip: {
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#666',
    marginBottom: 10,
    fontSize: 16,
  },
  emptySubtext: {
    color: '#999',
    textAlign: 'center',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  fabLabel: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TransactionsScreen;
