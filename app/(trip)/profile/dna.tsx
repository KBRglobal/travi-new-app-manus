import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const DNA_TRAITS = [
  { trait: 'Adventure', score: 85, iconName: 'fitness', color: 'bg-orange-500' },
  { trait: 'Food & Dining', score: 95, iconName: 'restaurant', color: 'bg-red-500' },
  { trait: 'Culture', score: 72, iconName: 'business', color: 'bg-blue-500' },
  { trait: 'Nature', score: 80, iconName: 'leaf', color: 'bg-green-500' },
  { trait: 'Luxury', score: 45, iconName: 'diamond', color: 'bg-purple-500' },
  { trait: 'Social', score: 65, iconName: 'sparkles', color: 'bg-pink-500' },
  { trait: 'Wellness', score: 50, iconName: 'body', color: 'bg-teal-500' },
  { trait: 'Budget', score: 70, iconName: 'cash', color: 'bg-yellow-500' },
];

export default function DNAProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold">My Travel DNA</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/dna-quiz')}><Text className="text-primary text-sm">Retake</Text></TouchableOpacity>
      </View>
      <View className="items-center py-8">
        <View className="w-32 h-32 rounded-full bg-primary/20 items-center justify-center mb-4">
          <Ionicons name="flask" size={24} color="#FFFFFF" />
        </View>
        <Text className="text-white text-xl font-bold">Adventurous Foodie</Text>
        <Text className="text-white/60 text-sm mt-1">Your travel personality type</Text>
      </View>
      <View className="mx-4 mb-6">
        <Text className="text-white font-bold text-lg mb-4">DNA Breakdown</Text>
        {DNA_TRAITS.map(item => (
          <View key={item.trait} className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Text className="text-xl mr-2">{item.emoji}</Text>
                <Text className="text-white font-bold">{item.trait}</Text>
              </View>
              <Text className="text-primary font-bold">{item.score}%</Text>
            </View>
            <View className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <View className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
            </View>
          </View>
        ))}
      </View>
      <View className="mx-4 mb-8 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
        <Text className="text-white font-bold mb-2">Top Destinations For You</Text>
        <Text className="text-white/60 text-sm">Based on your DNA, you'd love: 🇯🇵 Japan, 🇮🇹 Italy, 🇹🇭 Thailand</Text>
      </View>
    </ScrollView>
  );
}
