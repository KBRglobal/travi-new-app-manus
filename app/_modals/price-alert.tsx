import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function PriceAlertModal() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="trending-down" size={24} color="#FFFFFF" />
      <Text className=" text-3xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Price Drop!</Text>
      <View className="w-full p-4 bg-[#120824] rounded-2xl border border-white/[0.08] mb-6">
        <Text className=" font-[Satoshi-Bold] text-lg mb-1" style={{ color: colors.text.primary }}>NYC → Tokyo</Text>
        <View className="flex-row items-center mb-2">
          <Text className="/40 line-through mr-2" style={{ color: colors.text.primary }}>$1,200</Text>
          <Text className="text-green-400 text-2xl font-[Satoshi-Bold]">$890</Text>
        </View>
        <Text className="text-green-400 text-sm">Save $310 (26% off)</Text>
        <Text className="/40 text-xs mt-2" style={{ color: colors.text.primary }}>Apr 15 • Economy • Direct</Text>
      </View>
      <TouchableOpacity onPress={() => { router.back(); router.push('/(trip)/flights'); }} className="bg-[#6443F4] w-full py-4 rounded-2xl items-center mb-3">
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Book Now</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}><Text className="/60" style={{ color: colors.text.primary }}>Remind Me Later</Text></TouchableOpacity>
    </View>
  );
}
