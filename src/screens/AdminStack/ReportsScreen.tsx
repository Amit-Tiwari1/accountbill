import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph,
  Text,
  SegmentedButtons,
  ProgressBar
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ReportsScreenProps {
  navigation: any;
}

const ReportsScreen: React.FC<ReportsScreenProps> = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data - replace with actual data from your state management
  const monthlyData = {
    totalIncome: 5000,
    totalExpenses: 3200,
    categories: [
      { name: 'Food', amount: 800, percentage: 25 },
      { name: 'Transportation', amount: 400, percentage: 12.5 },
      { name: 'Entertainment', amount: 300, percentage: 9.4 },
      { name: 'Utilities', amount: 250, percentage: 7.8 },
      { name: 'Shopping', amount: 600, percentage: 18.8 },
      { name: 'Others', amount: 850, percentage: 26.5 },
    ]
  };

  const netIncome = monthlyData.totalIncome - monthlyData.totalExpenses;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Title>Financial Reports</Title>
            <SegmentedButtons
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
              buttons={[
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'year', label: 'Year' },
              ]}
              style={styles.segmentedButtons}
            />
          </View>

          {/* Summary Cards */}
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Title>Monthly Summary</Title>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text variant="bodyLarge" style={styles.summaryLabel}>Total Income</Text>
                  <Text variant="headlineSmall" style={styles.incomeAmount}>
                    ${monthlyData.totalIncome.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text variant="bodyLarge" style={styles.summaryLabel}>Total Expenses</Text>
                  <Text variant="headlineSmall" style={styles.expenseAmount}>
                    ${monthlyData.totalExpenses.toLocaleString()}
                  </Text>
                </View>
              </View>
              <View style={styles.netIncomeContainer}>
                <Text variant="bodyLarge" style={styles.summaryLabel}>Net Income</Text>
                <Text 
                  variant="headlineMedium" 
                  style={[
                    styles.netAmount, 
                    { color: netIncome >= 0 ? '#4CAF50' : '#F44336' }
                  ]}
                >
                  ${netIncome.toLocaleString()}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Expense Categories */}
          <Card style={styles.categoriesCard}>
            <Card.Content>
              <Title>Expense Categories</Title>
              {monthlyData.categories.map((category, index) => (
                <View key={index} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <Text variant="bodyLarge">{category.name}</Text>
                    <Text variant="bodyLarge" style={styles.categoryAmount}>
                      ${category.amount}
                    </Text>
                  </View>
                  <View style={styles.progressContainer}>
                    <ProgressBar 
                      progress={category.percentage / 100} 
                      style={styles.progressBar}
                      color="#6200ee"
                    />
                    <Text variant="bodySmall" style={styles.percentage}>
                      {category.percentage.toFixed(1)}%
                    </Text>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Budget vs Actual */}
          <Card style={styles.budgetCard}>
            <Card.Content>
              <Title>Budget vs Actual</Title>
              <View style={styles.budgetItem}>
                <Text variant="bodyLarge">Monthly Budget</Text>
                <Text variant="bodyLarge" style={styles.budgetAmount}>$3,500</Text>
              </View>
              <View style={styles.budgetItem}>
                <Text variant="bodyLarge">Actual Spending</Text>
                <Text variant="bodyLarge" style={styles.actualAmount}>$3,200</Text>
              </View>
              <View style={styles.budgetItem}>
                <Text variant="bodyLarge">Remaining</Text>
                <Text variant="bodyLarge" style={styles.remainingAmount}>$300</Text>
              </View>
              <ProgressBar 
                progress={monthlyData.totalExpenses / 3500} 
                style={styles.budgetProgress}
                color="#4CAF50"
              />
            </Card.Content>
          </Card>

          {/* Trends */}
          <Card style={styles.trendsCard}>
            <Card.Content>
              <Title>Spending Trends</Title>
              <Paragraph style={styles.trendText}>
                Your spending has decreased by 5% compared to last month. 
                Great job on managing your expenses!
              </Paragraph>
              <View style={styles.trendStats}>
                <View style={styles.trendItem}>
                  <Text variant="bodyLarge" style={styles.trendLabel}>This Month</Text>
                  <Text variant="headlineSmall" style={styles.trendValue}>$3,200</Text>
                </View>
                <View style={styles.trendItem}>
                  <Text variant="bodyLarge" style={styles.trendLabel}>Last Month</Text>
                  <Text variant="headlineSmall" style={styles.trendValue}>$3,370</Text>
                </View>
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
  header: {
    marginBottom: 20,
  },
  segmentedButtons: {
    marginTop: 10,
  },
  summaryCard: {
    marginBottom: 20,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#666',
    marginBottom: 5,
  },
  incomeAmount: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  expenseAmount: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  netIncomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  netAmount: {
    fontWeight: 'bold',
  },
  categoriesCard: {
    marginBottom: 20,
    elevation: 2,
  },
  categoryItem: {
    marginVertical: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  categoryAmount: {
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  percentage: {
    marginLeft: 10,
    color: '#666',
    minWidth: 40,
  },
  budgetCard: {
    marginBottom: 20,
    elevation: 2,
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  budgetAmount: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  actualAmount: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  remainingAmount: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  budgetProgress: {
    marginTop: 15,
    height: 8,
    borderRadius: 4,
  },
  trendsCard: {
    marginBottom: 20,
    elevation: 2,
  },
  trendText: {
    marginVertical: 10,
    color: '#666',
  },
  trendStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  trendItem: {
    alignItems: 'center',
  },
  trendLabel: {
    color: '#666',
    marginBottom: 5,
  },
  trendValue: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
});

export default ReportsScreen;
