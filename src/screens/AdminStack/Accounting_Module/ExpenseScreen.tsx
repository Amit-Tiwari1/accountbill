import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import Colors from '../../../theme/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import GlobalModal from '../../../components/GlobalModel';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useSmsLogs } from '../../../hook/useSmsLogs';
import { useCallLogs } from '../../../hook/useCallLogs';
import { exportDatabaseNative } from '../../../hook/useExportDb';

interface Expense {
    id: number;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: string;
}

const ExpenseScreen: React.FC = () => {
    const theme = useTheme();
    const { smsLogs, loading: smsLoading, error: smsError, fetchSms } = useSmsLogs();
    const { callLogs, loading, error, fetchCallLogs } = useCallLogs();

    const [budget, setBudget] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [activeTab, setActiveTab] = useState<'Income' | 'Expense' | 'Budget'>('Budget');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, type: 'expense', category: 'Food', amount: 500, date: '2025-10-18' },
        { id: 2, type: 'income', category: 'Salary', amount: 5000, date: '2025-10-18' },
        { id: 3, type: 'expense', category: 'Transport', amount: 200, date: '2025-10-17' },
        // ... other expenses
    ]);

    useEffect(() => {
        fetchSms()
        fetchCallLogs(200);
    }, [fetchSms, fetchCallLogs])

    console.log("smsLogs", smsLogs);
    console.log("smsLoading", smsLoading);
    console.log("smsLoading", smsError);
    console.log("callLogs", callLogs);

    useEffect(() => {
        if (!smsLoading && smsLogs.length > 0) {
            // Map SMS logs to Expense type
            const smsExpenses: Expense[] = smsLogs.map((sms, index) => ({
                id: 1000 + index, // unique id
                type: sms.type === 'credit' ? 'income' : 'expense',
                category: sms.address, // or parse UPI/bank from sms.address/body
                amount: sms.amount || 0,
                date: new Date(Number(sms.date)).toISOString().split('T')[0], // YYYY-MM-DD
            }));

            // Merge with existing expenses
            setExpenses(prev => [...smsExpenses, ...prev]);
        }
    }, [smsLogs, smsLoading]);


    const totalIncome = expenses
        .filter(e => e.type === 'income')
        .reduce((sum, e) => sum + e.amount, 0);

    const totalExpense = expenses
        .filter(e => e.type === 'expense')
        .reduce((sum, e) => sum + e.amount, 0);

    const percentageSpent = budget ? (totalExpense / Number(budget)) * 100 : 0;

    const handleSave = () => {
        console.log(activeTab, { title, amount, description });

        setModalVisible(false);
        setTitle('');
        setAmount('');
        setDescription('');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>
            {/* <TouchableOpacity
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                onPress={exportDatabaseNative}
            >
                <Text style={styles.addButtonText}>Export DB (Native)</Text>
            </TouchableOpacity> */}

            <View style={styles.bodyContent}>
                <View style={styles.ProgressContainer}>
                    <AnimatedCircularProgress
                        size={120}
                        fill={percentageSpent}
                        width={15}
                        tintColor={theme.colors.primary}
                        backgroundColor={theme.colors.onPrimary}
                    >
                        {() => (
                            <TouchableOpacity
                                style={{ flexDirection: 'column', alignItems: 'center' }}
                                onPress={() => setModalVisible(true)}
                            >
                                <MaterialIcons name="add" size={20} color={theme.colors.onSurfaceVariant} />
                                <Text style={[styles.circleText, { color: theme.colors.onSurface }]}>
                                    ₹{budget ? budget : 0}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </AnimatedCircularProgress>
                    <View style={styles.totalsContainer}>
                        <View style={[styles.totalCard, { backgroundColor: theme.colors.surface }]}>
                            <Text style={[styles.totalLabel, { color: theme.colors.onSurfaceVariant }]}>
                                Total Income
                            </Text>
                            <Text style={[styles.totalAmount, { color: theme.colors.primary }]}>
                                ₹{totalIncome}
                            </Text>
                        </View>
                        <View style={styles.horizontalDivider}></View>
                        <View style={[styles.totalCard, { backgroundColor: theme.colors.surface }]}>
                            <Text style={[styles.totalLabel, { color: theme.colors.onSurfaceVariant }]}>
                                Total Expense
                            </Text>
                            <Text style={[styles.totalAmount, { color: theme.colors.error }]}>
                                ₹{totalExpense}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.transactionsContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                            Transactions
                        </Text>
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: theme.colors.lightBackground, flexDirection: 'row' }]}
                            onPress={() => setModalVisible(true)}
                        >
                            <MaterialIcons name="add" size={20} color="#fff" />
                            <Text style={[styles.addButtonText, { color: theme.colors.surface }]}>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                        {expenses.map(exp => (
                            <View key={exp.id} style={[styles.expenseItem, { backgroundColor: '#F2F2F2' }]}>
                                <Text style={[styles.expenseCategory, { color: theme.colors.onSurface }]}>{exp.category}</Text>
                                <Text style={[styles.expenseAmount, { color: exp.type === 'income' ? theme.colors.primary : theme.colors.error }]}>
                                    {exp.type === 'income' ? '+' : '-'}₹{exp.amount}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Tabbed Global Modal */}
                <GlobalModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    headerText={`Add ${activeTab}`}
                >
                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        {['Income', 'Expense', 'Budget'].map(tab => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.tab,
                                    activeTab === tab && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }
                                ]}
                                onPress={() => setActiveTab(tab as any)}
                            >
                                <Text style={{ color: activeTab === tab ? theme.colors.primary : theme.colors.onSurface }}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Input fields */}
                    <CustomInput
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <CustomInput
                        placeholder="Amount"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"

                    />
                    <CustomInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />

                    {/* Save button */}
                    <CustomButton
                        title="Save"
                        onPress={handleSave}
                        style={{ marginTop: 16 }}
                    />
                </GlobalModal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    bodyContent: { flex: 1, paddingHorizontal: 15, paddingTop: 10 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
    ProgressContainer: { alignItems: 'center', backgroundColor: Colors.card, borderRadius: 20, padding: 10, },
    transactionsContainer: { backgroundColor: Colors.card, borderRadius: 20, padding: 15, marginTop: 10, height: '51%' },
    circleText: { fontSize: 18, fontWeight: '600' },
    totalsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    totalCard: { flex: 0.48, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    horizontalDivider: { marginTop: 5, borderLeftWidth: 1.5, borderColor: Colors.border },
    totalLabel: { fontSize: 14, marginBottom: 4 },
    totalAmount: { fontSize: 18, fontWeight: '700' },
    expenseItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderRadius: 12, marginBottom: 5, elevation: 2 },
    expenseCategory: { fontSize: 16, fontWeight: '500' },
    expenseAmount: { fontSize: 16, fontWeight: '700' },
    addButton: { borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 10, paddingHorizontal: 15, elevation: 2 },
    addButtonText: { fontSize: 16, fontWeight: '600' },
    tabsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
    tab: { paddingVertical: 6, paddingHorizontal: 12 },
});

export default ExpenseScreen;
