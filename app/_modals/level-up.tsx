import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function LevelUpModal() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="trophy" size={24} color="#FFFFFF" />
      <Text className=" text-3xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Level Up!</Text>
      <Text className="text-[#6443F4] text-2xl font-[Satoshi-Bold] mb-4">Gold Member</Text>
      <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>You've reached Gold tier! Enjoy exclusive perks and higher rewards.</Text>
      <View className="w-full mb-6">
        {['Free room upgrades', 'Airport lounge access (2x/month)', '2x points multiplier', 'Priority support'].map(perk => (
          <View key={perk} className="flex-row items-center mb-2">
            <Ionicons name="star" size={24} color="#FFFFFF" />
            <Text className=" text-sm" style={{ color: colors.text.primary }}>{perk}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => router.push('/(trip)/points/perks')} className="bg-[#6443F4] w-full py-4 rounded-2xl items-center mb-3">
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>View My Perks</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}><Text className="/60" style={{ color: colors.text.primary }}>Dismiss</Text></TouchableOpacity>
    </View>
  );
}
