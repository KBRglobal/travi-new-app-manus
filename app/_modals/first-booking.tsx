import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function FirstBookingModal() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="sparkles" size={24} color="#FFFFFF" />
      <Text className=" text-3xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>First Booking!</Text>
      <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>Congratulations on your first trip with TRAVI! Here's a special welcome bonus.</Text>
      <View className="w-full p-4 bg-[#6443F4]/10 rounded-2xl border border-[#6443F4]/20 items-center mb-6">
        <Text className="text-[#6443F4] text-3xl font-[Satoshi-Bold]">+500</Text>
        <Text className="/60" style={{ color: colors.text.primary }}>Welcome Points</Text>
      </View>
      <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] w-full py-4 rounded-2xl items-center">
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Awesome!</Text>
      </TouchableOpacity>
    </View>
  );
}
