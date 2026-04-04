import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const RECEIPTS = [
  { id: '1', emoji: '🍽️', merchant: 'Ichiran Ramen', amount: '¥1,200', usd: '$8.50', date: 'Today', category: 'Food', taxFree: false },
  { id: '2', emoji: '🛍️', merchant: 'Uniqlo Ginza', amount: '¥15,000', usd: '$106', date: 'Today', category: 'Shopping', taxFree: true },
  { id: '3', emoji: '🏨', merchant: 'Hotel Shinjuku', amount: '¥18,000', usd: '$127', date: 'Yesterday', category: 'Accommodation', taxFree: false },
  { id: '4', emoji: '🚃', merchant: 'JR Pass', amount: '¥2,500', usd: '$17.70', date: 'Yesterday', category: 'Transport', taxFree: false },
  { id: '5', emoji: '🎌', merchant: 'Don Quijote', amount: '¥8,000', usd: '$56.60', date: 'Apr 1', category: 'Shopping', taxFree: true },
];

export default function ReceiptsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Receipts</Text>
        <View className="flex-1" />
        <TouchableOpacity className="bg-primary px-3 py-1.5 rounded-lg"><Text className="text-white text-xs font-bold">+ Scan</Text></TouchableOpacity>
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState emoji="🧾" title="No receipts yet" description="Add receipts to track tax refunds." />} data={RECEIPTS} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-2xl mr-3">{item.emoji}</Text>
          <View className="flex-1">
            <Text className="text-white font-bold">{item.merchant}</Text>
            <View className="flex-row items-center">
              <Text className="text-white/40 text-xs">{item.date} • {item.category}</Text>
              {item.taxFree && <View className="ml-2 px-1.5 py-0.5 bg-green-500/20 rounded"><Text className="text-green-400 text-xs">Tax Free</Text></View>}
            </View>
          </View>
          <View className="items-end">
            <Text className="text-white font-bold">{item.amount}</Text>
            <Text className="text-white/40 text-xs">{item.usd}</Text>
          </View>
        </View>
      )} />
    </View>
  );
}
