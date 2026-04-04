import { Skeleton } from '@/components/ui/Skeleton';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
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
const MEMORIES = [
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '1', emoji: '📸', title: 'Sunrise at Mt. Fuji', time: 'Today, 5:30 AM', type: 'photo', likes: 12 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '2', emoji: '🎥', title: 'Street Food Tour', time: 'Today, 12:15 PM', type: 'video', likes: 8 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '3', emoji: '📝', title: 'Temple Visit Notes', time: 'Yesterday, 3:00 PM', type: 'note', likes: 5 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '4', emoji: '📸', title: 'Cherry Blossoms', time: 'Yesterday, 10:00 AM', type: 'photo', likes: 24 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '5', emoji: '🎤', title: 'Audio Journal', time: 'Apr 1, 8:00 PM', type: 'audio', likes: 3 },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: '6', emoji: '📸', title: 'Shibuya Crossing', time: 'Apr 1, 2:30 PM', type: 'photo', likes: 18 },
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
export default function MemoriesScreen() {
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const router = useRouter();
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const [view, setView] = useState<'grid' | 'timeline'>('timeline');
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
        <Text className="text-white text-xl font-bold ml-3">Memories</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View className="flex-1" />
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <TouchableOpacity onPress={() => setView(view === 'grid' ? 'timeline' : 'grid')}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Text className="text-primary text-sm">{view === 'grid' ? '📋' : '⊞'}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        </TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <TouchableOpacity className="mx-4 mb-4 p-4 bg-primary/10 rounded-2xl border border-dashed border-primary/30 items-center">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <Text className="text-2xl mb-1">📷</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <Text className="text-primary font-bold">Add Memory</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      </TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <FlatList
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            ListEmptyComponent={() => <EmptyState stateKey="memories" />} data={MEMORIES} keyExtractor={i => i.id} renderItem={({ item }) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View className="mx-4 mb-3 bg-bg-secondary rounded-2xl border border-white/[0.08] overflow-hidden">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <View className="h-32 bg-white/[0.03] items-center justify-center">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-5xl">{item.emoji}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <View className="p-3">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-white font-bold">{item.title}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <View className="flex-row items-center justify-between mt-1">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <Text className="text-white/40 text-xs">{item.time}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <View className="flex-row items-center">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                <Text className="text-white/40 text-xs mr-3">❤️ {item.likes}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                <TouchableOpacity><Text className="text-primary text-xs">Share</Text></TouchableOpacity>
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
