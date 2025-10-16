import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Card, 
  Title, 
  Paragraph,
  SegmentedButtons,
  Text
} from 'react-native-paper';
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
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Add Transaction</Title>
              <Paragraph style={styles.subtitle}>
                Record your income or expense
              </Paragraph>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Transaction Type</Text>
                <SegmentedButtons
                  value={type}
                  onValueChange={setType}
                  buttons={[
                    { value: 'expense', label: 'Expense' },
                    { value: 'income', label: 'Income' },
                  ]}
                  style={styles.segmentedButtons}
                />

                <TextInput
                  label="Amount"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  left={<TextInput.Icon icon="currency-usd" />}
                />

                <TextInput
                  label="Description"
                  value={description}
                  onChangeText={setDescription}
                  style={styles.input}
                  mode="outlined"
                  multiline
                />

                <TextInput
                  label="Category"
                  value={category}
                  onChangeText={setCategory}
                  style={styles.input}
                  mode="outlined"
                />
                
                <Button
                  mode="contained"
                  onPress={handleSaveTransaction}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.button}
                >
                  Save Transaction
                </Button>

                <Button
                  mode="outlined"
                  onPress={() => navigation.goBack()}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
              </View>
            </Card.Content>
          </Card>
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
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
});

export default AddTransactionScreen;
