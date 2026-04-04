import { Skeleton } from '@/components/ui/Skeleton';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import React from 'react';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import { useRouter } from 'expo-router';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import { EmptyState } from '@/components/ui/EmptyState';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
const REVIEWS = [
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '1', place: 'Hotel Barcelona', emoji: '🏨', rating: 4.5, text: 'Amazing rooftop pool with city views. Staff was incredibly helpful.', date: 'Mar 2026', likes: 12 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '2', place: 'Sushi Nakazawa, Tokyo', emoji: '🍣', rating: 5, text: 'Best omakase experience of my life. Worth every penny.', date: 'Feb 2026', likes: 28 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '3', place: 'Bali Surf School', emoji: '🏄', rating: 4, text: 'Great instructors, beautiful beach. A bit crowded in the morning.', date: 'Jan 2026', likes: 8 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '4', place: 'Reykjavik Walking Tour', emoji: '🚶', rating: 4.5, text: 'Fascinating history, guide was knowledgeable and funny.', date: 'Dec 2025', likes: 15 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
];
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
export default function ReviewsScreen() {
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const router = useRouter();
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  return (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
    <View className="flex-1 bg-bg-primary pt-safe">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <View className="flex-row items-center px-4 py-3">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <Text className="text-white text-xl font-bold ml-3">My Reviews</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View className="flex-1" />
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <Text className="text-white/40 text-sm">{REVIEWS.length} reviews</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <FlatList
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            ListEmptyComponent={() => <EmptyState stateKey="reviews" />} data={REVIEWS} keyExtractor={i => i.id} renderItem={({ item }) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View className="mx-4 mb-3 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <View className="flex-row items-center mb-2">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-2xl mr-2">{item.emoji}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <View className="flex-1">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <Text className="text-white font-bold">{item.place}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <Text className="text-white/40 text-xs">{item.date}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <View className="flex-row items-center bg-primary/20 px-2 py-1 rounded-lg">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <Text className="text-yellow-400 text-xs mr-1">⭐</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <Text className="text-primary text-sm font-bold">{item.rating}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Text className="text-white/80 text-sm mb-2">{item.text}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <View className="flex-row items-center">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-white/40 text-xs">👍 {item.likes} helpful</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <View className="flex-1" />
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <TouchableOpacity><Text className="text-primary text-xs">Edit</Text></TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      )} />
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
    </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  );
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
}
