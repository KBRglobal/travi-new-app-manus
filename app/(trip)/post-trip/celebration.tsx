import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function CelebrationScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerStyle={{ alignItems: 'center', paddingVertical: 60 }}>
      <Text className="text-6xl mb-4">🎊</Text>
      <Text className="text-white text-3xl font-bold mb-2">Trip Complete!</Text>
      <Text className="text-white/60 text-center px-8 mb-8">What an amazing journey to Tokyo! Here are your trip highlights.</Text>
      <View className="flex-row mx-4 mb-6">
        {[
          { emoji: '📅', value: '7', label: 'Days' },
          { emoji: '📸', value: '142', label: 'Photos' },
          { emoji: '🏆', value: '1,240', label: 'Points' },
          { emoji: '🌍', value: '3', label: 'Cities' },
        ].map(s => (
          <View key={s.label} className="flex-1 items-center mx-1 p-3 bg-bg-secondary rounded-2xl border border-white/[0.08]">
            <Text className="text-xl mb-1">{s.emoji}</Text>
            <Text className="text-white font-bold text-lg">{s.value}</Text>
            <Text className="text-white/40 text-xs">{s.label}</Text>
          </View>
        ))}
      </View>
      <View className="w-full px-4 mb-4 p-4 bg-primary/10 rounded-2xl border border-primary/20">
        <Text className="text-primary text-center font-bold">💰 You saved $180 with TRAVI!</Text>
      </View>
      <View className="w-full px-4">
        <TouchableOpacity onPress={() => router.push('/(trip)/post-trip/review')} className="bg-primary py-4 rounded-2xl items-center mb-3">
          <Text className="text-white font-bold text-lg">Write a Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(trip)/post-trip/gallery')} className="py-4 rounded-2xl items-center border border-white/[0.08] mb-3">
          <Text className="text-white font-bold">View Photo Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')} className="py-4 items-center">
          <Text className="text-white/60">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
