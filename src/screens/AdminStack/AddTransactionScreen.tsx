import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AddTransactionScreenProps {
  navigation: any;
}

const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveTransaction = async () => {
    if (!amount.trim() || !description.trim() || !category.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Transaction added successfully!');
      navigation.goBack();
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.title}>Add Transaction</Text>
              <Text style={styles.subtitle}>
                Record your income or expense
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Transaction Type</Text>
                <View style={styles.segmentedButtons}>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      type === 'expense' && styles.segmentButtonActive
                    ]}
                    onPress={() => setType('expense')}
                  >
                    <Text style={[
                      styles.segmentButtonText,
                      type === 'expense' && styles.segmentButtonTextActive
                    ]}>
                      Expense
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.segmentButton,
                      type === 'income' && styles.segmentButtonActive
                    ]}
                    onPress={() => setType('income')}
                  >
                    <Text style={[
                      styles.segmentButtonText,
                      type === 'income' && styles.segmentButtonTextActive
                    ]}>
                      Income
                    </Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  placeholder="Amount"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  style={styles.input}
                />

                <TextInput
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                  style={styles.input}
                  multiline
                />

                <TextInput
                  placeholder="Category"
                  value={category}
                  onChangeText={setCategory}
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={handleSaveTransaction}
                  disabled={isLoading}
                  style={[styles.button, styles.containedButton]}
                >
                  <Text style={styles.containedButtonText}>
                    {isLoading ? 'Saving...' : 'Save Transaction'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.cancelButton, styles.outlinedButton]}
                >
                  <Text style={styles.outlinedButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  content: {
    padding: 20,
  },
  card: {
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontWeight: '600',
  },
  segmentedButtons: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentButtonActive: {
    backgroundColor: '#6200ee',
  },
  segmentButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  segmentButtonTextActive: {
    color: 'white',
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
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
  cancelButton: {
    marginTop: 10,
  },
});

export default AddTransactionScreen;
