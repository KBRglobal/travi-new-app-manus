import { Skeleton } from '@/components/ui/Skeleton';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import { useRouter } from 'expo-router';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import { hotels } from '../../lib/mockData';
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
export default function HotelsScreen() {
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const router = useRouter();
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'stars'>('price');
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const sortedHotels = [...hotels].sort((a, b) => {
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
    if (sortBy === 'price') return a.price - b.price;
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
    if (sortBy === 'rating') return b.rating - a.rating;
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
    return b.stars - a.stars;
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  });
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
      <View className="px-6 flex-row items-center justify-between mb-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <TouchableOpacity onPress={() => router.back()}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Text className="text-white text-xl">‹ Back</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        </TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <Text className="text-white text-heading-3">Hotels</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <TouchableOpacity onPress={() => router.push('/(trip)/alt-stays')}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Text className="text-primary text-body-sm">Airbnb</Text>
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

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <View className="flex-row px-6 mb-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        {(['price', 'rating', 'stars'] as const).map((s) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <TouchableOpacity key={s} className={`mr-2 px-4 py-2 rounded-full border ${sortBy === s ? 'bg-primary border-primary' : 'border-border'}`} onPress={() => setSortBy(s)}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className={`text-body-sm ${sortBy === s ? 'text-white font-semibold' : 'text-text-secondary'}`}>{s === 'price' ? '💰 Price' : s === 'rating' ? '⭐ Rating' : '🌟 Stars'}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        ))}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <TouchableOpacity className="ml-auto px-4 py-2 rounded-full border border-pink" onPress={() => router.push('/(trip)/hotel-compare')}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Text className="text-pink text-body-sm font-semibold">📊 Compare</Text>
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

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <FlatList
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            ListEmptyComponent={() => <EmptyState emoji="🏨" title="No hotels found" description="Try different dates or adjust filters." />}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        data={sortedHotels}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        keyExtractor={(item) => item.id}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        contentContainerClassName="px-6 pb-24"
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        renderItem={({ item, index }) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Animated.View entering={FadeInDown.delay(index * 100)}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <TouchableOpacity
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              className={`bg-bg-card border rounded-card mb-3 overflow-hidden ${selectedHotel === item.id ? 'border-primary' : 'border-border'}`}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              onPress={() => { setSelectedHotel(item.id); router.push(`/(trip)/hotel/${item.id}`); }}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            >
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <Image source={{ uri: item.image }} className="w-full h-40" resizeMode="cover" />
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <View className="p-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                <View className="flex-row justify-between items-start mb-1">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <View className="flex-1 mr-2">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                    <Text className="text-white text-body font-semibold">{item.name}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                    <Text className="text-text-secondary text-body-sm">{'⭐'.repeat(item.stars)}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <View className="items-end">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                    <Text className="text-primary text-heading-3 font-bold">€{item.price}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                    <Text className="text-text-muted text-caption">/night</Text>
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
                <View className="flex-row items-center mt-2">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <View className="bg-primary/20 px-2 py-0.5 rounded-full mr-2">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                    <Text className="text-primary text-caption font-semibold">⭐ {item.rating}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <Text className="text-text-muted text-caption">{item.reviews} reviews</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                <View className="flex-row flex-wrap mt-2">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  {item.amenities.slice(0, 4).map((a) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                    <View key={a} className="bg-bg-surface px-2 py-0.5 rounded-full mr-1 mb-1">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                      <Text className="text-text-secondary text-caption">{a}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                    </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  ))}
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
            </TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </Animated.View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        )}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      />
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
