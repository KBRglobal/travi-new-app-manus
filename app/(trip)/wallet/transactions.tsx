import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const TRANSACTIONS = [
  { id: '1', type: 'credit', title: 'Cashback - Hotel', amount: 12.50, date: 'Apr 3, 2026', emoji: '🏨', status: 'completed' },
  { id: '2', type: 'debit', title: 'Flight Booking', amount: -89.00, date: 'Apr 2, 2026', emoji: '✈️', status: 'completed' },
  { id: '3', type: 'credit', title: 'Added Funds', amount: 100.00, date: 'Apr 1, 2026', emoji: '💳', status: 'completed' },
  { id: '4', type: 'credit', title: 'Refund - Activity', amount: 35.00, date: 'Mar 28, 2026', emoji: '🔄', status: 'completed' },
  { id: '5', type: 'credit', title: 'Cashback - Flight', amount: 22.30, date: 'Mar 25, 2026', emoji: '✈️', status: 'pending' },
  { id: '6', type: 'debit', title: 'Restaurant Split', amount: -15.00, date: 'Mar 22, 2026', emoji: '🍽️', status: 'completed' },
  { id: '7', type: 'debit', title: 'Activity Booking', amount: -45.00, date: 'Mar 20, 2026', emoji: '🎯', status: 'completed' },
  { id: '8', type: 'credit', title: 'Points Conversion', amount: 25.00, date: 'Mar 15, 2026', emoji: '🏆', status: 'completed' },
];

export default function WalletTransactionsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const filtered = filter === 'all' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === filter);

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Transactions</Text>
      </View>
      <View className="flex-row mx-4 mb-3">
        {(['all', 'credit', 'debit'] as const).map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`flex-1 py-2 mx-1 rounded-xl ${filter === f ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`text-center text-sm font-bold capitalize ${filter === f ? 'text-white' : 'text-white/60'}`}>{f === 'all' ? 'All' : f === 'credit' ? 'Income' : 'Spent'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="transactions" />} data={filtered} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-2xl mr-3">{item.emoji}</Text>
          <View className="flex-1">
            <Text className="text-white font-bold">{item.title}</Text>
            <View className="flex-row items-center">
              <Text className="text-white/40 text-xs">{item.date}</Text>
              {item.status === 'pending' && <View className="ml-2 px-2 py-0.5 bg-yellow-500/20 rounded-full"><Text className="text-yellow-400 text-xs">Pending</Text></View>}
            </View>
          </View>
          <Text className={`font-bold ${item.amount > 0 ? 'text-green-400' : 'text-white'}`}>
            {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
          </Text>
        </View>
      )} />
    </View>
  );
}
