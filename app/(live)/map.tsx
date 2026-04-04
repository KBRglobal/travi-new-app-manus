import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function LiveMapScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'food', 'attractions', 'transport', 'hotels'];

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Live Map</Text>
        <View className="flex-1" />
        <TouchableOpacity onPress={() => router.push('/(live)/emergency')}><Text className="text-red-400 font-bold">SOS</Text></TouchableOpacity>
      </View>
      <View className="flex-1 bg-white/[0.03] mx-4 rounded-2xl items-center justify-center">
        <Text className="text-6xl mb-4">🗺️</Text>
        <Text className="text-white/60 text-sm">Map View</Text>
        <Text className="text-white/30 text-xs mt-1">📍 Shinjuku, Tokyo</Text>
      </View>
      <View className="flex-row mx-4 my-3">
        {filters.map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`px-3 py-1.5 rounded-full mr-2 ${filter === f ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`text-xs capitalize ${filter === f ? 'text-white font-bold' : 'text-white/60'}`}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mx-4 mb-4">
        {[
          { emoji: '🍣', name: 'Sushi Nakazawa', dist: '350m', rating: '4.8' },
          { emoji: '⛩️', name: 'Meiji Shrine', dist: '1.2km', rating: '4.9' },
          { emoji: '🚃', name: 'Shinjuku Station', dist: '200m', rating: '' },
        ].map(item => (
          <TouchableOpacity key={item.name} className="flex-row items-center p-3 mb-2 bg-bg-secondary rounded-xl border border-white/[0.08]">
            <Text className="text-xl mr-2">{item.emoji}</Text>
            <View className="flex-1">
              <Text className="text-white font-bold text-sm">{item.name}</Text>
              <Text className="text-white/40 text-xs">{item.dist}</Text>
            </View>
            {item.rating && <Text className="text-yellow-400 text-xs">⭐ {item.rating}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
