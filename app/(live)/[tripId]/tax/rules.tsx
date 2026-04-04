import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function CountryRules() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Country Rules</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
          <Text className=" font-[Satoshi-Bold] text-lg mb-2" style={{ color: colors.text.primary }}>🇦🇪 UAE Tax Rules</Text>
          <Text className="text-[rgba(255,255,255,0.6)] mb-2">VAT Rate: 5%</Text>
          <Text className="text-[rgba(255,255,255,0.6)] mb-2">Tax-free shopping: Available for tourists</Text>
          <Text className="text-[rgba(255,255,255,0.6)]">Minimum purchase: AED 250 per receipt</Text>
        </View>

        <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
          <Text className=" font-[Satoshi-Bold] text-lg mb-2" style={{ color: colors.text.primary }}>Visa Information</Text>
          <Text className="text-[rgba(255,255,255,0.6)] mb-2">🇮🇱 Israeli passport: Visa-free, 30 days</Text>
          <Text className="text-[rgba(255,255,255,0.6)] mb-2">Requirements: Valid passport (6+ months)</Text>
        </View>
        <TouchableOpacity onPress={() => router.push(`/(trip)/pre/${tripId}/visa` as any)} className="mb-4">
          <Text className="text-[#6443F4] font-semibold">Full Visa Center →</Text>
        </TouchableOpacity>

        <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
          <Text className=" font-[Satoshi-Bold] text-lg mb-2" style={{ color: colors.text.primary }}>Customs Allowances</Text>
          <Text className="text-[rgba(255,255,255,0.6)] mb-2">Alcohol: 2 liters</Text>
          <Text className="text-[rgba(255,255,255,0.6)] mb-2">Cigarettes: 400</Text>
          <Text className="text-[rgba(255,255,255,0.6)]">Gifts: up to AED 3,000</Text>
        </View>

        <View className="bg-[#120824] rounded-[16px] p-4 mb-8">
          <Text className=" font-[Satoshi-Bold] text-lg mb-2" style={{ color: colors.text.primary }}>Important Notes</Text>
          <Text className="text-[rgba(255,255,255,0.6)]">• Dress modestly in public areas</Text>
          <Text className="text-[rgba(255,255,255,0.6)]">• No public drinking outside licensed venues</Text>
          <Text className="text-[rgba(255,255,255,0.6)]">• Photography restrictions at government buildings</Text>
        </View>
      </ScrollView>
    </View>
  );
}
