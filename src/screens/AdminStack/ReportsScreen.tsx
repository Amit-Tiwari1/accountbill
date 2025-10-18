import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
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
            <Text style={styles.headerTitle}>Financial Reports</Text>
            <View style={styles.segmentedButtons}>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedPeriod === 'week' && styles.segmentButtonActive
                ]}
                onPress={() => setSelectedPeriod('week')}
              >
                <Text style={[
                  styles.segmentButtonText,
                  selectedPeriod === 'week' && styles.segmentButtonTextActive
                ]}>
                  Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedPeriod === 'month' && styles.segmentButtonActive
                ]}
                onPress={() => setSelectedPeriod('month')}
              >
                <Text style={[
                  styles.segmentButtonText,
                  selectedPeriod === 'month' && styles.segmentButtonTextActive
                ]}>
                  Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedPeriod === 'year' && styles.segmentButtonActive
                ]}
                onPress={() => setSelectedPeriod('year')}
              >
                <Text style={[
                  styles.segmentButtonText,
                  selectedPeriod === 'year' && styles.segmentButtonTextActive
                ]}>
                  Year
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Summary Cards */}
          <View style={styles.summaryCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Monthly Summary</Text>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Total Income</Text>
                  <Text style={styles.incomeAmount}>
                    ${monthlyData.totalIncome.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Total Expenses</Text>
                  <Text style={styles.expenseAmount}>
                    ${monthlyData.totalExpenses.toLocaleString()}
                  </Text>
                </View>
              </View>
              <View style={styles.netIncomeContainer}>
                <Text style={styles.summaryLabel}>Net Income</Text>
                <Text
                  style={[
                    styles.netAmount,
                    { color: netIncome >= 0 ? '#4CAF50' : '#F44336' }
                  ]}
                >
                  ${netIncome.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          {/* Expense Categories */}
          <View style={styles.categoriesCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Expense Categories</Text>
              {monthlyData.categories.map((category, index) => (
                <View key={index} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryAmount}>
                      ${category.amount}
                    </Text>
                  </View>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${category.percentage}%` }
                        ]}
                      />
                    </View>
                    <Text style={styles.percentage}>
                      {category.percentage.toFixed(1)}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Budget vs Actual */}
          <View style={styles.budgetCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Budget vs Actual</Text>
              <View style={styles.budgetItem}>
                <Text style={styles.budgetLabel}>Monthly Budget</Text>
                <Text style={styles.budgetAmount}>$3,500</Text>
              </View>
              <View style={styles.budgetItem}>
                <Text style={styles.budgetLabel}>Actual Spending</Text>
                <Text style={styles.actualAmount}>$3,200</Text>
              </View>
              <View style={styles.budgetItem}>
                <Text style={styles.budgetLabel}>Remaining</Text>
                <Text style={styles.remainingAmount}>$300</Text>
              </View>
              <View style={styles.budgetProgressBackground}>
                <View
                  style={[
                    styles.budgetProgressFill,
                    { width: `${(monthlyData.totalExpenses / 3500) * 100}%` }
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Trends */}
          <View style={styles.trendsCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Spending Trends</Text>
              <Text style={styles.trendText}>
                Your spending has decreased by 5% compared to last month.
                Great job on managing your expenses!
              </Text>
              <View style={styles.trendStats}>
                <View style={styles.trendItem}>
                  <Text style={styles.trendLabel}>This Month</Text>
                  <Text style={styles.trendValue}>$3,200</Text>
                </View>
                <View style={styles.trendItem}>
                  <Text style={styles.trendLabel}>Last Month</Text>
                  <Text style={styles.trendValue}>$3,370</Text>
                </View>
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
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  segmentedButtons: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
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
  summaryCard: {
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
    fontSize: 16,
  },
  incomeAmount: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 18,
  },
  expenseAmount: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 18,
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
    fontSize: 20,
  },
  categoriesCard: {
    marginBottom: 20,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  categoryItem: {
    marginVertical: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryAmount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6200ee',
  },
  percentage: {
    marginLeft: 10,
    color: '#666',
    minWidth: 40,
    fontSize: 12,
  },
  budgetCard: {
    marginBottom: 20,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  budgetLabel: {
    fontSize: 16,
    color: '#333',
  },
  budgetAmount: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actualAmount: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 16,
  },
  remainingAmount: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  budgetProgressBackground: {
    marginTop: 15,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  budgetProgressFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  trendsCard: {
    marginBottom: 20,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  trendText: {
    marginVertical: 10,
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
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
    fontSize: 16,
  },
  trendValue: {
    fontWeight: 'bold',
    color: '#6200ee',
    fontSize: 18,
  },
});

export default ReportsScreen;
