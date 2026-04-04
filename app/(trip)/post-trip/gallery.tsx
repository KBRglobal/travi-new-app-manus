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
const PHOTOS = Array.from({ length: 24 }, (_, i) => ({
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  id: String(i + 1),
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  emoji: ['📸', '🏯', '🍣', '⛩️', '🗻', '🌸', '🎌', '🚃'][i % 8],
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  day: `Day ${Math.floor(i / 4) + 1}`,
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
}));
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
export default function GalleryScreen() {
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const router = useRouter();
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const [selected, setSelected] = useState<string[]>([]);
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const isSelecting = selected.length > 0;
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const toggleSelect = (id: string) => {
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  };
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
        <TouchableOpacity onPress={() => isSelecting ? setSelected([]) : router.back()}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Text className="text-white text-lg">{isSelecting ? '✕' : '←'}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        </TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <Text className="text-white text-xl font-bold ml-3">{isSelecting ? `${selected.length} Selected` : 'Trip Gallery'}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View className="flex-1" />
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        {isSelecting && <TouchableOpacity><Text className="text-primary font-bold">Share</Text></TouchableOpacity>}
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
            ListEmptyComponent={() => <EmptyState emoji="📸" title="No photos yet" description="Add memories from your trip." />} data={PHOTOS} numColumns={3} keyExtractor={i => i.id} contentContainerStyle={{ padding: 4 }} renderItem={({ item }) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <TouchableOpacity onPress={() => toggleSelect(item.id)} onLongPress={() => toggleSelect(item.id)} className="flex-1 m-1 aspect-square bg-bg-secondary rounded-xl items-center justify-center border border-white/[0.08]" style={{ maxWidth: '32%' }}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Text className="text-3xl">{item.emoji}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          {selected.includes(item.id) && (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <View className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full items-center justify-center">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <Text className="text-white text-xs">✓</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          )}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        </TouchableOpacity>
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
