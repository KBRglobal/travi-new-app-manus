import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function StreakModal() {
  const router = useRouter();
  const days = [true, true, true, true, true, false, false];

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Ionicons name="flame" size={24} color="#FFFFFF" />
      <Text className="text-white text-3xl font-bold mb-2">5 Day Streak!</Text>
      <Text className="text-white/60 text-center mb-6">You've checked in 5 days in a row. Keep it up for bonus points!</Text>
      <View className="flex-row mb-6">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <View key={i} className="items-center mx-2">
            <View className={`w-10 h-10 rounded-full items-center justify-center ${days[i] ? 'bg-primary' : 'bg-white/[0.05]'}`}>
              <Text className={`font-bold ${days[i] ? 'text-white' : 'text-white/30'}`}>{d}</Text>
            </View>
            {days[i] && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
          </View>
        ))}
      </View>
      <View className="w-full p-4 bg-primary/10 rounded-2xl border border-primary/20 items-center mb-6">
        <Text className="text-primary font-bold">+50 Streak Bonus Points!</Text>
        <Text className="text-white/40 text-xs mt-1">7-day streak = +100 bonus</Text>
      </View>
      <TouchableOpacity onPress={() => router.back()} className="bg-primary w-full py-4 rounded-2xl items-center">
        <Text className="text-white font-bold text-lg">Keep Going!</Text>
      </TouchableOpacity>
    </View>
  );
}
