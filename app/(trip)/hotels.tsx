import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { hotels } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function HotelsScreen() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'stars'>('price');
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.stars - a.stars;
  });

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="px-6 flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white text-xl">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-heading-3">Hotels</Text>
        <TouchableOpacity onPress={() => router.push('/(trip)/alt-stays')}>
          <Text className="text-primary text-body-sm">Airbnb</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row px-6 mb-4">
        {(['price', 'rating', 'stars'] as const).map((s) => (
          <TouchableOpacity key={s} className={`mr-2 px-4 py-2 rounded-full border ${sortBy === s ? 'bg-primary border-primary' : 'border-border'}`} onPress={() => setSortBy(s)}>
            <Text className={`text-body-sm ${sortBy === s ? 'text-white font-semibold' : 'text-text-secondary'}`}>{s === 'price' ? '💰 Price' : s === 'rating' ? '⭐ Rating' : '🌟 Stars'}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity className="ml-auto px-4 py-2 rounded-full border border-pink" onPress={() => router.push('/(trip)/hotel-compare')}>
          <Text className="text-pink text-body-sm font-semibold">📊 Compare</Text>
        </TouchableOpacity>
      </View>

      <FlatList
            ListEmptyComponent={() => <EmptyState emoji="🏨" title="No hotels found" description="Try different dates or adjust filters." />}
        data={sortedHotels}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-6 pb-24"
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 100)}>
            <TouchableOpacity
              className={`bg-bg-card border rounded-card mb-3 overflow-hidden ${selectedHotel === item.id ? 'border-primary' : 'border-border'}`}
              onPress={() => { setSelectedHotel(item.id); router.push(`/(trip)/hotel/${item.id}`); }}
            >
              <Image source={{ uri: item.image }} className="w-full h-40" resizeMode="cover" />
              <View className="p-4">
                <View className="flex-row justify-between items-start mb-1">
                  <View className="flex-1 mr-2">
                    <Text className="text-white text-body font-semibold">{item.name}</Text>
                    <Text className="text-text-secondary text-body-sm">{'⭐'.repeat(item.stars)}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-primary text-heading-3 font-bold">€{item.price}</Text>
                    <Text className="text-text-muted text-caption">/night</Text>
                  </View>
                </View>
                <View className="flex-row items-center mt-2">
                  <View className="bg-primary/20 px-2 py-0.5 rounded-full mr-2">
                    <Text className="text-primary text-caption font-semibold">⭐ {item.rating}</Text>
                  </View>
                  <Text className="text-text-muted text-caption">{item.reviews} reviews</Text>
                </View>
                <View className="flex-row flex-wrap mt-2">
                  {item.amenities.slice(0, 4).map((a) => (
                    <View key={a} className="bg-bg-surface px-2 py-0.5 rounded-full mr-1 mb-1">
                      <Text className="text-text-secondary text-caption">{a}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}
