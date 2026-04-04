import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const PHOTOS = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  emoji: ['📸', '🏯', '🍣', '⛩️', '🗻', '🌸', '🎌', '🚃'][i % 8],
  day: `Day ${Math.floor(i / 4) + 1}`,
}));

export default function GalleryScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const isSelecting = selected.length > 0;

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => isSelecting ? setSelected([]) : router.back()}>
          <Text className="text-white text-lg">{isSelecting ? '✕' : '←'}</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">{isSelecting ? `${selected.length} Selected` : 'Trip Gallery'}</Text>
        <View className="flex-1" />
        {isSelecting && <TouchableOpacity><Text className="text-primary font-bold">Share</Text></TouchableOpacity>}
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState emoji="📸" title="No photos yet" description="Add memories from your trip." />} data={PHOTOS} numColumns={3} keyExtractor={i => i.id} contentContainerStyle={{ padding: 4 }} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => toggleSelect(item.id)} onLongPress={() => toggleSelect(item.id)} className="flex-1 m-1 aspect-square bg-bg-secondary rounded-xl items-center justify-center border border-white/[0.08]" style={{ maxWidth: '32%' }}>
          <Text className="text-3xl">{item.emoji}</Text>
          {selected.includes(item.id) && (
            <View className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full items-center justify-center">
              <Text className="text-white text-xs">✓</Text>
            </View>
          )}
        </TouchableOpacity>
      )} />
    </View>
  );
}
