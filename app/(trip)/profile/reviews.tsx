import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const REVIEWS = [
  { id: '1', place: 'Hotel Barcelona', emoji: '🏨', rating: 4.5, text: 'Amazing rooftop pool with city views. Staff was incredibly helpful.', date: 'Mar 2026', likes: 12 },
  { id: '2', place: 'Sushi Nakazawa, Tokyo', emoji: '🍣', rating: 5, text: 'Best omakase experience of my life. Worth every penny.', date: 'Feb 2026', likes: 28 },
  { id: '3', place: 'Bali Surf School', emoji: '🏄', rating: 4, text: 'Great instructors, beautiful beach. A bit crowded in the morning.', date: 'Jan 2026', likes: 8 },
  { id: '4', place: 'Reykjavik Walking Tour', emoji: '🚶', rating: 4.5, text: 'Fascinating history, guide was knowledgeable and funny.', date: 'Dec 2025', likes: 15 },
];

export default function ReviewsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">My Reviews</Text>
        <View className="flex-1" />
        <Text className="text-white/40 text-sm">{REVIEWS.length} reviews</Text>
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="reviews" />} data={REVIEWS} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="mx-4 mb-3 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <View className="flex-row items-center mb-2">
            <Text className="text-2xl mr-2">{item.emoji}</Text>
            <View className="flex-1">
              <Text className="text-white font-bold">{item.place}</Text>
              <Text className="text-white/40 text-xs">{item.date}</Text>
            </View>
            <View className="flex-row items-center bg-primary/20 px-2 py-1 rounded-lg">
              <Text className="text-yellow-400 text-xs mr-1">⭐</Text>
              <Text className="text-primary text-sm font-bold">{item.rating}</Text>
            </View>
          </View>
          <Text className="text-white/80 text-sm mb-2">{item.text}</Text>
          <View className="flex-row items-center">
            <Text className="text-white/40 text-xs">👍 {item.likes} helpful</Text>
            <View className="flex-1" />
            <TouchableOpacity><Text className="text-primary text-xs">Edit</Text></TouchableOpacity>
          </View>
        </View>
      )} />
    </View>
  );
}
