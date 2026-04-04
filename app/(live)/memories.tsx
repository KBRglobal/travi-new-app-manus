import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const MEMORIES = [
  { id: '1', emoji: '📸', title: 'Sunrise at Mt. Fuji', time: 'Today, 5:30 AM', type: 'photo', likes: 12 },
  { id: '2', emoji: '🎥', title: 'Street Food Tour', time: 'Today, 12:15 PM', type: 'video', likes: 8 },
  { id: '3', emoji: '📝', title: 'Temple Visit Notes', time: 'Yesterday, 3:00 PM', type: 'note', likes: 5 },
  { id: '4', emoji: '📸', title: 'Cherry Blossoms', time: 'Yesterday, 10:00 AM', type: 'photo', likes: 24 },
  { id: '5', emoji: '🎤', title: 'Audio Journal', time: 'Apr 1, 8:00 PM', type: 'audio', likes: 3 },
  { id: '6', emoji: '📸', title: 'Shibuya Crossing', time: 'Apr 1, 2:30 PM', type: 'photo', likes: 18 },
];

export default function MemoriesScreen() {
  const router = useRouter();
  const [view, setView] = useState<'grid' | 'timeline'>('timeline');

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Memories</Text>
        <View className="flex-1" />
        <TouchableOpacity onPress={() => setView(view === 'grid' ? 'timeline' : 'grid')}>
          <Text className="text-primary text-sm">{view === 'grid' ? '📋' : '⊞'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="mx-4 mb-4 p-4 bg-primary/10 rounded-2xl border border-dashed border-primary/30 items-center">
        <Text className="text-2xl mb-1">📷</Text>
        <Text className="text-primary font-bold">Add Memory</Text>
      </TouchableOpacity>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="memories" />} data={MEMORIES} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="mx-4 mb-3 bg-bg-secondary rounded-2xl border border-white/[0.08] overflow-hidden">
          <View className="h-32 bg-white/[0.03] items-center justify-center">
            <Text className="text-5xl">{item.emoji}</Text>
          </View>
          <View className="p-3">
            <Text className="text-white font-bold">{item.title}</Text>
            <View className="flex-row items-center justify-between mt-1">
              <Text className="text-white/40 text-xs">{item.time}</Text>
              <View className="flex-row items-center">
                <Text className="text-white/40 text-xs mr-3">❤️ {item.likes}</Text>
                <TouchableOpacity><Text className="text-primary text-xs">Share</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )} />
    </View>
  );
}
