import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const DNA_COMPARISON = [
  { dimension: 'Adventure', me: 85, them: 78, emoji: '🧗' },
  { dimension: 'Culture', me: 72, them: 90, emoji: '🏛️' },
  { dimension: 'Food', me: 95, them: 88, emoji: '🍜' },
  { dimension: 'Luxury', me: 45, them: 30, emoji: '💎' },
  { dimension: 'Nature', me: 80, them: 92, emoji: '🌿' },
  { dimension: 'Social', me: 65, them: 75, emoji: '🎉' },
  { dimension: 'Wellness', me: 50, them: 60, emoji: '🧘' },
  { dimension: 'Budget', me: 70, them: 85, emoji: '💰' },
];

export default function CompatibilityScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const overallMatch = 87;

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Travel Compatibility</Text>
      </View>
      <View className="items-center py-8">
        <View className="flex-row items-center mb-4">
          <Text className="text-5xl">🧑</Text>
          <View className="mx-4 items-center">
            <Text className="text-primary text-4xl font-bold">{overallMatch}%</Text>
            <Text className="text-white/60 text-sm">match</Text>
          </View>
          <Text className="text-5xl">👩</Text>
        </View>
        <Text className="text-white/60 text-sm">You & Sarah K.</Text>
      </View>
      <View className="mx-4 mb-6">
        <Text className="text-white font-bold text-lg mb-4">DNA Comparison</Text>
        {DNA_COMPARISON.map(item => (
          <View key={item.dimension} className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-white/80 text-sm">{item.emoji} {item.dimension}</Text>
              <Text className="text-white/40 text-xs">{item.me}% vs {item.them}%</Text>
            </View>
            <View className="flex-row h-2 rounded-full overflow-hidden bg-white/[0.05]">
              <View className="bg-primary rounded-full" style={{ width: `${item.me}%` }} />
            </View>
            <View className="flex-row h-2 rounded-full overflow-hidden bg-white/[0.05] mt-1">
              <View className="bg-pink rounded-full" style={{ width: `${item.them}%` }} />
            </View>
          </View>
        ))}
      </View>
      <View className="mx-4 mb-6 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
        <Text className="text-white font-bold mb-2">Best Together For</Text>
        <Text className="text-white/60 text-sm">🍜 Food tours & local restaurants</Text>
        <Text className="text-white/60 text-sm">🧗 Outdoor adventures</Text>
        <Text className="text-white/60 text-sm">🌿 Nature exploration</Text>
      </View>
      <View className="flex-row mx-4 mb-8">
        <TouchableOpacity onPress={() => router.push(`/(social)/messages/${userId}`)} className="flex-1 mr-2 bg-primary py-4 rounded-2xl items-center">
          <Text className="text-white font-bold">Message</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 ml-2 bg-white/[0.05] py-4 rounded-2xl items-center border border-white/[0.08]">
          <Text className="text-white/80 font-bold">Plan Trip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
