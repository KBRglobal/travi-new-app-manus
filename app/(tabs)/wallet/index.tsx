import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const TRANSACTIONS = [
  { name: 'Hotel Luxe', amount: -445, date: 'Apr 12', icon: '🏨' },
  { name: 'Points Cashback', amount: 25, date: 'Apr 11', icon: '⭐' },
  { name: 'Restaurant', amount: -32, date: 'Apr 11', icon: '🍜' },
];

export default function WalletScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary">
      <ScrollView className="flex-1 px-4 pt-12">
        <Text className="text-white text-2xl font-bold mb-6">Wallet</Text>

        <View className="bg-primary rounded-card p-6 mb-6">
          <Text className="text-white/80 mb-1">Total Balance</Text>
          <Text className="text-white text-4xl font-bold mb-4">€2,450.00</Text>
          <View className="flex-row">
            <TouchableOpacity className="bg-white/20 rounded-button px-4 py-2 mr-3">
              <Text className="text-white font-semibold">Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/20 rounded-button px-4 py-2">
              <Text className="text-white font-semibold">Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-white font-bold text-lg mb-3">Quick Actions</Text>
        <View className="flex-row mb-6">
          <TouchableOpacity onPress={() => router.push('/(trip)/wallet/split')} className="flex-1 bg-bg-card rounded-card p-3 items-center mr-2">
            <Text className="text-xl mb-1">💳</Text>
            <Text className="text-white text-sm font-semibold">Split Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/wallet/transactions' as any)} className="flex-1 bg-bg-card rounded-card p-3 items-center mr-2">
            <Text className="text-xl mb-1">📊</Text>
            <Text className="text-white text-sm font-semibold">Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(trip)/wallet/currency')} className="flex-1 bg-bg-card rounded-card p-3 items-center" style={{ borderWidth: 1, borderColor: '#F94498' }}>
            <Text className="text-xl mb-1">💱</Text>
            <Text className="text-pink text-sm font-semibold">Currency</Text>
            <Text className="text-pink text-xs">NEW</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white font-bold text-lg mb-3">Recent Transactions</Text>
        {TRANSACTIONS.map((tx, i) => (
          <View key={i} className="bg-bg-card rounded-card p-4 mb-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-xl mr-3">{tx.icon}</Text>
              <View>
                <Text className="text-white font-semibold">{tx.name}</Text>
                <Text className="text-text-muted text-sm">{tx.date}</Text>
              </View>
            </View>
            <Text className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
              {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount)}
            </Text>
          </View>
        ))}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
