import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object as provided in the prompt

// Dummy transaction data
const transactions = [
  { id: '1', name: 'Flight to Paris', date: '2024-03-28', amount: -1200, type: 'expense', icon: 'flight' },
  { id: '2', name: 'Hotel Booking', date: '2024-03-27', amount: -350, type: 'expense', icon: 'hotel' },
  { id: '3', name: 'Points Earned', date: '2024-03-26', amount: 50, type: 'income', icon: 'star' },
  { id: '4', name: 'Restaurant Dinner', date: '2024-03-25', amount: -80, type: 'expense', icon: 'restaurant' },
  { id: '5', name: 'Train Ticket', date: '2024-03-24', amount: -60, type: 'expense', icon: 'train' },
  { id: '6', name: 'Points Redeemed', date: '2024-03-23', amount: -20, type: 'expense', icon: 'redeem' },
  { id: '7', name: 'Shopping', date: '2024-03-22', amount: -150, type: 'expense', icon: 'shopping-cart' },
  { id: '8', name: 'Taxi Ride', date: '2024-03-21', amount: -25, type: 'expense', icon: 'local-taxi' },
  { id: '9', name: 'Points Earned', date: '2024-03-20', amount: 10, type: 'income', icon: 'star' },
  { id: '10', name: 'Museum Entry', date: '2024-03-19', amount: -40, type: 'expense', icon: 'museum' },
];

const TransactionsScreen = () => {
  return (
    <ScreenWrapper title="Transactions" scrollable={true}>
      <View style={styles.container}>
        {transactions.map((transaction) => (
          <BlurView key={transaction.id} intensity={20} tint="dark" style={styles.transactionCard}>
            <View style={styles.transactionContent}>
              <MaterialIcons name={transaction.icon as any} size={24} color={DS.white} style={styles.icon} />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[styles.transactionAmount, {
                color: transaction.type === 'income' ? DS.success : DS.white
              }]}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          </BlurView>
        ))}

        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>View All Statements</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  transactionCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 15,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontFamily: 'Chillax-Bold', // Assuming Chillax-Bold is loaded
    fontSize: 16,
    color: DS.white,
    marginBottom: 2,
  },
  transactionDate: {
    fontFamily: 'Satoshi-Regular', // Assuming Satoshi-Regular is loaded
    fontSize: 12,
    color: DS.muted,
  },
  transactionAmount: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 16,
    color: DS.white,
    marginRight: 10,
  },
});

export default TransactionsScreen;
