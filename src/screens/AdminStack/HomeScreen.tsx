import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  Title, 
  Paragraph,
  Button,
  FAB,
  Avatar
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const handleViewTransactions = () => {
    navigation.navigate('Transactions');
  };

  const handleViewReports = () => {
    navigation.navigate('Reports');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    // Navigate back to auth stack
    navigation.replace('AuthStack');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Avatar.Text size={60} label="AB" />
          <Title style={styles.welcomeText}>Welcome to Account Bill</Title>
          <Paragraph style={styles.subtitle}>
            Manage your finances efficiently
          </Paragraph>
        </View>

        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Quick Actions</Title>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={handleAddTransaction}
                  style={styles.actionButton}
                >
                  Add Transaction
                </Button>
                <Button
                  mode="outlined"
                  onPress={handleViewTransactions}
                  style={styles.actionButton}
                >
                  View Transactions
                </Button>
                <Button
                  mode="outlined"
                  onPress={handleViewReports}
                  style={styles.actionButton}
                >
                  View Reports
                </Button>
                <Button
                  mode="outlined"
                  onPress={handleViewProfile}
                  style={styles.actionButton}
                >
                  Profile
                </Button>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title>Account Summary</Title>
              <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                  <Text variant="bodyLarge" style={styles.summaryLabel}>
                    Total Balance
                  </Text>
                  <Text variant="headlineSmall" style={styles.summaryValue}>
                    $0.00
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text variant="bodyLarge" style={styles.summaryLabel}>
                    This Month
                  </Text>
                  <Text variant="headlineSmall" style={styles.summaryValue}>
                    $0.00
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title>Recent Transactions</Title>
              <Paragraph style={styles.emptyText}>
                No transactions yet. Add your first transaction to get started!
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddTransaction}
        label="Add Transaction"
      />

      <Button
        mode="text"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#6200ee',
  },
  welcomeText: {
    color: 'white',
    marginTop: 15,
  },
  subtitle: {
    color: 'white',
    opacity: 0.8,
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 15,
  },
  actionButton: {
    marginBottom: 10,
  },
  summaryContainer: {
    marginTop: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryLabel: {
    color: '#666',
  },
  summaryValue: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default HomeScreen;
