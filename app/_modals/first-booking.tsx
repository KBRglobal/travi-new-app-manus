import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function FirstBookingModal() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-6xl mb-4">🎉</Text>
      <Text className="text-white text-3xl font-bold mb-2">First Booking!</Text>
      <Text className="text-white/60 text-center mb-6">Congratulations on your first trip with TRAVI! Here's a special welcome bonus.</Text>
      <View className="w-full p-4 bg-primary/10 rounded-2xl border border-primary/20 items-center mb-6">
        <Text className="text-primary text-3xl font-bold">+500</Text>
        <Text className="text-white/60">Welcome Points</Text>
      </View>
      <TouchableOpacity onPress={() => router.back()} className="bg-primary w-full py-4 rounded-2xl items-center">
        <Text className="text-white font-bold text-lg">Awesome!</Text>
      </TouchableOpacity>
    </View>
  );
}
