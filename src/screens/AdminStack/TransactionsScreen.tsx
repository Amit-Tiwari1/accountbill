import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph,
  Text,
  FAB,
  Chip,
  Searchbar
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <Card style={styles.transactionCard}>
      <Card.Content>
        <View style={styles.transactionHeader}>
          <View style={styles.transactionInfo}>
            <Text variant="titleMedium">{item.description}</Text>
            <Text variant="bodySmall" style={styles.category}>{item.category}</Text>
            <Text variant="bodySmall" style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text 
              variant="titleLarge" 
              style={[
                styles.amount, 
                { color: item.type === 'income' ? '#4CAF50' : '#F44336' }
              ]}
            >
              {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
            </Text>
            <Chip 
              mode="outlined" 
              compact
              style={[
                styles.typeChip,
                { backgroundColor: item.type === 'income' ? '#E8F5E8' : '#FFEBEE' }
              ]}
            >
              {item.type}
            </Chip>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title>Transactions</Title>
        <Searchbar
          placeholder="Search transactions..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        
        <View style={styles.filterContainer}>
          <Chip
            selected={filterType === 'all'}
            onPress={() => setFilterType('all')}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip
            selected={filterType === 'income'}
            onPress={() => setFilterType('income')}
            style={styles.filterChip}
          >
            Income
          </Chip>
          <Chip
            selected={filterType === 'expense'}
            onPress={() => setFilterType('expense')}
            style={styles.filterChip}
          >
            Expense
          </Chip>
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
            <Text variant="bodyLarge" style={styles.emptyText}>
              No transactions found
            </Text>
            <Paragraph style={styles.emptySubtext}>
              Add your first transaction to get started
            </Paragraph>
          </View>
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction')}
        label="Add Transaction"
      />
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
  searchbar: {
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterChip: {
    marginRight: 10,
  },
  listContainer: {
    padding: 20,
  },
  transactionCard: {
    marginBottom: 10,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  category: {
    color: '#666',
    marginTop: 2,
  },
  date: {
    color: '#999',
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
  },
  typeChip: {
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#999',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TransactionsScreen;
