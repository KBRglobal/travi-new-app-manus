import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const WISHLIST = [
  { id: '1', name: 'Santorini, Greece', emoji: '🇬🇷', image: '🏝️', price: '$1,200', added: 'Mar 2026' },
  { id: '2', name: 'Kyoto, Japan', emoji: '🇯🇵', image: '⛩️', price: '$1,800', added: 'Feb 2026' },
  { id: '3', name: 'Machu Picchu, Peru', emoji: '🇵🇪', image: '🏔️', price: '$2,100', added: 'Jan 2026' },
  { id: '4', name: 'Maldives', emoji: '🇲🇻', image: '🏖️', price: '$3,500', added: 'Dec 2025' },
  { id: '5', name: 'Northern Lights, Norway', emoji: '🇳🇴', image: '🌌', price: '$1,600', added: 'Nov 2025' },
];

export default function WishlistScreen() {
  const router = useRouter();
  const [items, setItems] = useState(WISHLIST);

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Wishlist</Text>
        <View className="flex-1" />
        <Text className="text-white/40 text-sm">{items.length} places</Text>
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="wishlist" />} data={items} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="mx-4 mb-3 bg-bg-secondary rounded-2xl border border-white/[0.08] overflow-hidden">
          <View className="h-32 bg-white/[0.03] items-center justify-center">
            <Text className="text-6xl">{item.image}</Text>
          </View>
          <View className="p-4">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-white font-bold text-base">{item.emoji} {item.name}</Text>
              <TouchableOpacity onPress={() => removeItem(item.id)}><Text className="text-red-400 text-sm">✕</Text></TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-white/40 text-xs">Added {item.added}</Text>
              <Text className="text-primary font-bold">from {item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(trip)/dates')} className="mt-3 bg-primary py-3 rounded-xl items-center">
              <Text className="text-white font-bold">Plan Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      )} />
    </View>
  );
}
