import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function StreakModal() {
  const router = useRouter();
  const days = [true, true, true, true, true, false, false];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="flame" size={24} color="#FFFFFF" />
      <Text className=" text-3xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>5 Day Streak!</Text>
      <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>You've checked in 5 days in a row. Keep it up for bonus points!</Text>
      <View className="flex-row mb-6">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <View key={i} className="items-center mx-2">
            <View className={`w-10 h-10 rounded-full items-center justify-center ${days[i] ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
              <Text className={`font-[Satoshi-Bold] ${days[i] ? 'text-white' : 'text-white/30'}`}>{d}</Text>
            </View>
            {days[i] && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
          </View>
        ))}
      </View>
      <View className="w-full p-4 bg-[#6443F4]/10 rounded-2xl border border-[#6443F4]/20 items-center mb-6">
        <Text className="text-[#6443F4] font-[Satoshi-Bold]">+50 Streak Bonus Points!</Text>
        <Text className="/40 text-xs mt-1" style={{ color: colors.text.primary }}>7-day streak = +100 bonus</Text>
      </View>
      <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] w-full py-4 rounded-2xl items-center">
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Keep Going!</Text>
      </TouchableOpacity>
    </View>
  );
}
