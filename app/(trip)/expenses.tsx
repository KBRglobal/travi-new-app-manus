import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const expensesData = [
  { id: '1', category: 'Flight', amount: 350.00, date: '2026-03-28', icon: 'flight' },
  { id: '2', category: 'Hotel', amount: 120.00, date: '2026-03-27', icon: 'hotel' },
  { id: '3', category: 'Food', amount: 45.50, date: '2026-03-27', icon: 'restaurant' },
  { id: '4', category: 'Transport', amount: 25.00, date: '2026-03-26', icon: 'directions-car' },
  { id: '5', category: 'Activities', amount: 75.00, date: '2026-03-26', icon: 'local-activity' },
  { id: '6', category: 'Shopping', amount: 90.00, date: '2026-03-25', icon: 'shopping-bag' },
];

const ExpensesScreen = () => {
  return (
    <ScreenWrapper title="Expenses" scrollable={true}>
      <View style={styles.summaryCardContainer}>
        <BlurView intensity={20} tint="dark" style={styles.blurCard}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>Total Spent</Text>
            <Text style={styles.summaryAmount}>$705.50</Text>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>Add New Expense</Text>
            </LinearGradient>
          </View>
        </BlurView>
      </View>

      <View style={styles.expensesList}>
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        {expensesData.map((expense) => (
          <BlurView key={expense.id} intensity={20} tint="dark" style={styles.expenseItemBlur}>
            <View style={styles.expenseItem}>
              <MaterialIcons name={expense.icon as any} size={24} color={DS.purple} />
              <View style={styles.expenseDetails}>
                <Text style={styles.expenseCategory}>{expense.category}</Text>
                <Text style={styles.expenseDate}>{expense.date}</Text>
              </View>
              <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
            </View>
          </BlurView>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  summaryCardContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  blurCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 5,
  },
  summaryAmount: {
    fontFamily: 'Chillax-Bold',
    fontSize: 36,
    color: DS.white,
    marginBottom: 20,
  },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
  expensesList: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  expenseItemBlur: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  expenseDetails: {
    flex: 1,
    marginLeft: 15,
  },
  expenseCategory: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  expenseDate: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: DS.muted,
    marginTop: 2,
  },
  expenseAmount: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default ExpensesScreen;
