import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function DNACelebrationModal() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-6xl mb-4">🧬</Text>
      <Text className="text-white text-3xl font-bold mb-2">Your Travel DNA!</Text>
      <Text className="text-primary text-2xl font-bold mb-4">Adventurous Foodie</Text>
      <Text className="text-white/60 text-center mb-8">You love exploring new cuisines and seeking thrilling experiences. Your perfect trip combines street food tours with outdoor adventures.</Text>
      <View className="w-full mb-4">
        {[
          { trait: 'Adventure', score: 85 },
          { trait: 'Food', score: 95 },
          { trait: 'Culture', score: 72 },
        ].map(t => (
          <View key={t.trait} className="mb-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-white text-sm">{t.trait}</Text>
              <Text className="text-primary text-sm font-bold">{t.score}%</Text>
            </View>
            <View className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <View className="h-full bg-primary rounded-full" style={{ width: `${t.score}%` }} />
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/home')} className="bg-primary w-full py-4 rounded-2xl items-center mb-3">
        <Text className="text-white font-bold text-lg">Start Exploring</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(trip)/profile/dna')}><Text className="text-primary">View Full DNA Profile</Text></TouchableOpacity>
    </View>
  );
}
