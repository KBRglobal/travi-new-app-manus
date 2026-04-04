import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const TRANSACTIONS = [
  { id: '1', type: 'earn', title: 'Flight Booking', points: 350, date: 'Apr 2, 2026', emoji: '✈️' },
  { id: '2', type: 'earn', title: 'Hotel Review', points: 50, date: 'Apr 1, 2026', emoji: '⭐' },
  { id: '3', type: 'redeem', title: 'Restaurant Voucher', points: -2500, date: 'Mar 28, 2026', emoji: '🍽️' },
  { id: '4', type: 'earn', title: 'Daily Check-in', points: 10, date: 'Mar 27, 2026', emoji: '📅' },
  { id: '5', type: 'earn', title: 'Photo Upload (5)', points: 50, date: 'Mar 25, 2026', emoji: '📸' },
  { id: '6', type: 'earn', title: 'Challenge: Foodie', points: 300, date: 'Mar 22, 2026', emoji: '🎯' },
  { id: '7', type: 'earn', title: 'Referral Bonus', points: 500, date: 'Mar 20, 2026', emoji: '🤝' },
  { id: '8', type: 'redeem', title: 'Flight Discount', points: -5000, date: 'Mar 15, 2026', emoji: '✈️' },
  { id: '9', type: 'earn', title: 'Hotel Booking', points: 200, date: 'Mar 10, 2026', emoji: '🏨' },
  { id: '10', type: 'expire', title: 'Points Expired', points: -100, date: 'Mar 1, 2026', emoji: '⏰' },
];

export default function PointsTransactionsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'earn' | 'redeem'>('all');
  const filtered = filter === 'all' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === filter);

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Points History</Text>
      </View>
      <View className="flex-row mx-4 mb-3">
        {(['all', 'earn', 'redeem'] as const).map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`flex-1 py-2 mx-1 rounded-xl ${filter === f ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`text-center text-sm font-bold capitalize ${filter === f ? 'text-white' : 'text-white/60'}`}>{f === 'all' ? 'All' : f === 'earn' ? 'Earned' : 'Redeemed'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="transactions" />} data={filtered} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-2xl mr-3">{item.emoji}</Text>
          <View className="flex-1">
            <Text className="text-white font-bold">{item.title}</Text>
            <Text className="text-white/40 text-xs">{item.date}</Text>
          </View>
          <Text className={`font-bold ${item.points > 0 ? 'text-green-400' : item.type === 'expire' ? 'text-red-400' : 'text-white/60'}`}>
            {item.points > 0 ? '+' : ''}{item.points.toLocaleString()}
          </Text>
        </View>
      )} />
    </View>
  );
}
