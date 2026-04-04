import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const stays = [
  { id: 'as1', name: 'Cozy Studio Old Town', type: 'Entire apartment', price: 85, rating: 4.9, reviews: 128, image: 'https://picsum.photos/400/300?random=70', host: 'Maria', superhost: true },
  { id: 'as2', name: 'Beachfront Villa', type: 'Entire villa', price: 220, rating: 4.8, reviews: 64, image: 'https://picsum.photos/400/300?random=71', host: 'Carlos', superhost: true },
  { id: 'as3', name: 'Modern Loft Downtown', type: 'Entire loft', price: 110, rating: 4.7, reviews: 89, image: 'https://picsum.photos/400/300?random=72', host: 'Ana', superhost: false },
  { id: 'as4', name: 'Private Room with View', type: 'Private room', price: 55, rating: 4.6, reviews: 42, image: 'https://picsum.photos/400/300?random=73', host: 'David', superhost: false },
];

export default function AltStaysScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState<'all' | 'entire' | 'private'>('all');

  const filtered = stays.filter((s) => {
    if (filter === 'entire') return s.type.includes('Entire');
    if (filter === 'private') return s.type.includes('Private');
    return true;
  });

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="px-6 flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Alternative Stays</Text>
        <TouchableOpacity onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
          <Text className="text-primary text-body-sm">{viewMode === 'list' ? '🗺️ Map' : '📋 List'}</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row px-6 mb-4">
        {(['all', 'entire', 'private'] as const).map((f) => (
          <TouchableOpacity key={f} className={`mr-2 px-4 py-2 rounded-full border ${filter === f ? 'bg-pink border-pink' : 'border-border'}`} onPress={() => setFilter(f)}>
            <Text className={`text-body-sm ${filter === f ? 'text-white font-semibold' : 'text-text-secondary'}`}>{f === 'all' ? 'All' : f === 'entire' ? 'Entire Place' : 'Private Room'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {viewMode === 'list' ? (
        <FlatList
            ListEmptyComponent={() => <EmptyState emoji="🏡" title="No alternative stays found" description="Try expanding your search area." />}
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-6 pb-24"
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity className="bg-bg-card border border-border rounded-card mb-3 overflow-hidden" onPress={() => router.push(`/(trip)/hotel/${item.id}`)}>
                <Image source={{ uri: item.image }} className="w-full h-48" resizeMode="cover" />
                {item.superhost && (
                  <View className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full"><Text className="text-bg-primary text-caption font-bold">⭐ Superhost</Text></View>
                )}
                <View className="p-4">
                  <Text className="text-text-muted text-caption">{item.type} · Hosted by {item.host}</Text>
                  <Text className="text-white text-body font-semibold mt-1">{item.name}</Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center">
                      <Text className="text-primary text-body-sm font-semibold">⭐ {item.rating}</Text>
                      <Text className="text-text-muted text-caption ml-1">({item.reviews})</Text>
                    </View>
                    <Text className="text-white text-body font-bold">€{item.price}<Text className="text-text-muted text-caption font-normal">/night</Text></Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      ) : (
        <View className="flex-1 bg-bg-secondary items-center justify-center mx-6 rounded-card">
          <Text className="text-4xl mb-2">🗺️</Text>
          <Text className="text-text-secondary text-body">Map view with stay pins</Text>
        </View>
      )}
    </View>
  );
}
