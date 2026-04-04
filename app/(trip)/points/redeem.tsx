import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const REWARDS = [
  { id: '1', emoji: '✈️', title: 'Flight Discount $50', cost: 5000, category: 'travel' },
  { id: '2', emoji: '🏨', title: 'Hotel Night Free', cost: 10000, category: 'travel' },
  { id: '3', emoji: '🍽️', title: 'Restaurant Voucher $25', cost: 2500, category: 'food' },
  { id: '4', emoji: '🎧', title: 'Airport Lounge Pass', cost: 3000, category: 'travel' },
  { id: '5', emoji: '💆', title: 'Spa Treatment', cost: 4000, category: 'wellness' },
  { id: '6', emoji: '📸', title: 'Photo Book Credit', cost: 1500, category: 'gift' },
  { id: '7', emoji: '🎁', title: 'Gift Card $10', cost: 1000, category: 'gift' },
  { id: '8', emoji: '🚗', title: 'Car Rental Day', cost: 7500, category: 'travel' },
  { id: '9', emoji: '🎒', title: 'Travel Gear Discount', cost: 2000, category: 'gift' },
];

export default function RedeemScreen() {
  const router = useRouter();
  const balance = 15400;
  const [filter, setFilter] = useState('all');
  const [redeemed, setRedeemed] = useState<string | null>(null);

  const filtered = filter === 'all' ? REWARDS : REWARDS.filter(r => r.category === filter);

  if (redeemed) {
    const item = REWARDS.find(r => r.id === redeemed);
    return (
      <View className="flex-1 bg-bg-primary items-center justify-center px-8">
        <Text className="text-5xl mb-4">🎉</Text>
        <Text className="text-white text-2xl font-bold mb-2">Redeemed!</Text>
        <Text className="text-white/60 text-center mb-6">{item?.title} has been added to your account.</Text>
        <TouchableOpacity onPress={() => { setRedeemed(null); router.back(); }} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Redeem Points</Text>
      </View>
      <View className="items-center py-4 mx-4 mb-3 bg-primary/10 rounded-2xl border border-primary/20">
        <Text className="text-primary text-3xl font-bold">{balance.toLocaleString()}</Text>
        <Text className="text-white/60 text-sm">Points Available</Text>
      </View>
      <View className="flex-row mx-4 mb-3">
        {['all', 'travel', 'food', 'wellness', 'gift'].map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`px-3 py-1.5 rounded-full mr-2 ${filter === f ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`text-xs capitalize ${filter === f ? 'text-white font-bold' : 'text-white/60'}`}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState emoji="🎁" title="Nothing to redeem yet" description="Earn more points to unlock rewards." />} data={filtered} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-2xl mr-3">{item.emoji}</Text>
          <View className="flex-1">
            <Text className="text-white font-bold">{item.title}</Text>
            <Text className="text-primary text-xs">{item.cost.toLocaleString()} pts</Text>
          </View>
          <TouchableOpacity onPress={() => balance >= item.cost ? setRedeemed(item.id) : null} className={`px-4 py-2 rounded-xl ${balance >= item.cost ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`text-sm font-bold ${balance >= item.cost ? 'text-white' : 'text-white/30'}`}>Redeem</Text>
          </TouchableOpacity>
        </View>
      )} />
    </View>
  );
}
