import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const DESTINATIONS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Destination ${i + 1}`,
  country: `Country ${i + 1}`,
}));

// S8 — DNA Swipe
export default function DNASwipeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAction = (action: 'like' | 'reject') => {
    if (currentIndex >= DESTINATIONS.length - 1) {
      router.push('/(auth)/quick-dna/schedule');
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const current = DESTINATIONS[currentIndex];

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      {/* Header */}
      <View className="flex-row items-center px-6 md:px-12 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-white text-2xl">‹</Text>
        </Pressable>
        <View className="flex-1 h-1 bg-white/10 rounded-full ml-4">
          <View className="w-1/2 h-full bg-primary rounded-full" />
        </View>
        <Text className="text-text-secondary text-sm ml-4">{currentIndex + 1}/30</Text>
      </View>

      {/* Card stack */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-sm aspect-[3/4] bg-bg-card rounded-card items-center justify-center border border-white/10">
          <Text className="text-5xl mb-4">🏝️</Text>
          <Text className="text-2xl md:text-3xl font-bold text-white">{current?.name}</Text>
          <Text className="text-sm text-text-secondary mt-2">{current?.country}</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row items-center justify-center gap-8 pb-safe mb-6">
        <Pressable
          onPress={() => handleAction('reject')}
          className="w-16 h-16 rounded-full bg-white/10 border border-white/20 items-center justify-center active:scale-95"
        >
          <Text className="text-white text-2xl">✕</Text>
        </Pressable>
        <Pressable
          onPress={() => handleAction('like')}
          className="w-18 h-18 rounded-full bg-pink-500 items-center justify-center active:scale-95"
        >
          <Text className="text-white text-3xl">♥</Text>
        </Pressable>
      </View>
    </View>
  );
}
