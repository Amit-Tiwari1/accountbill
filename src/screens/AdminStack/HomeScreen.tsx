import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

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
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AB</Text>
          </View>
          <Text style={styles.welcomeText}>Welcome to Account Bill</Text>
          <Text style={styles.subtitle}>
            Manage your finances efficiently
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Quick Actions</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleAddTransaction}
                  style={[styles.actionButton, styles.containedButton]}
                >
                  <Text style={styles.containedButtonText}>Add Transaction</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleViewTransactions}
                  style={[styles.actionButton, styles.outlinedButton]}
                >
                  <Text style={styles.outlinedButtonText}>View Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleViewReports}
                  style={[styles.actionButton, styles.outlinedButton]}
                >
                  <Text style={styles.outlinedButtonText}>View Reports</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleViewProfile}
                  style={[styles.actionButton, styles.outlinedButton]}
                >
                  <Text style={styles.outlinedButtonText}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Account Summary</Text>
              <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>
                    Total Balance
                  </Text>
                  <Text style={styles.summaryValue}>
                    $0.00
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>
                    This Month
                  </Text>
                  <Text style={styles.summaryValue}>
                    $0.00
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Recent Transactions</Text>
              <Text style={styles.emptyText}>
                No transactions yet. Add your first transaction to get started!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddTransaction}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.fabLabel}>Add Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  welcomeText: {
    color: 'white',
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    opacity: 0.8,
    fontSize: 16,
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 15,
  },
  actionButton: {
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  containedButton: {
    backgroundColor: '#6200ee',
  },
  containedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  outlinedButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 16,
  },
  summaryValue: {
    fontWeight: 'bold',
    color: '#6200ee',
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
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
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  logoutButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
