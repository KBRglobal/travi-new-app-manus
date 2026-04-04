import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe" contentContainerStyle={{ alignItems: 'center', paddingVertical: 40 }}>
      <Ionicons name="sparkles" size={24} color="#FFFFFF" />
      <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Booking Confirmed!</Text>
      <Text className="/60 text-center mb-8 px-8" style={{ color: colors.text.primary }}>Your trip to Tokyo is booked. Get ready for an amazing adventure!</Text>
      <View className="w-full px-4 mb-6">
        <View className="bg-[#120824] rounded-2xl p-4 border border-white/[0.08]">
          <View className="flex-row justify-between mb-2"><Text className="/40" style={{ color: colors.text.primary }}>Booking ID</Text><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>TRV-2026-0412</Text></View>
          <View className="flex-row justify-between mb-2"><Text className="/40" style={{ color: colors.text.primary }}>Destination</Text><Text className="" style={{ color: colors.text.primary }}>🇯🇵 Tokyo, Japan</Text></View>
          <View className="flex-row justify-between mb-2"><Text className="/40" style={{ color: colors.text.primary }}>Dates</Text><Text className="" style={{ color: colors.text.primary }}>Apr 15 - 22, 2026</Text></View>
          <View className="flex-row justify-between mb-2"><Text className="/40" style={{ color: colors.text.primary }}>Total Paid</Text><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>$2,745</Text></View>
          <View className="flex-row justify-between"><Text className="/40" style={{ color: colors.text.primary }}>Points Earned</Text><Text className="text-[#6443F4] font-[Satoshi-Bold]">+274 pts</Text></View>
        </View>
      </View>
      <View className="w-full px-4 mb-4 p-4 bg-[#6443F4]/10 rounded-2xl mx-4 border border-[#6443F4]/20">
        <Text className="text-[#6443F4] text-center font-[Satoshi-Bold]">Confirmation email sent to john@example.com</Text>
      </View>
      <View className="w-full px-4">
        <TouchableOpacity onPress={() => router.push('/(trip)/pre-trip/checklist')} className="bg-[#6443F4] py-4 rounded-2xl items-center mb-3">
          <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>View Pre-Trip Checklist</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/trips')} className="py-4 rounded-2xl items-center border border-white/[0.08]">
          <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Go to My Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')} className="py-4 items-center">
          <Text className="/60" style={{ color: colors.text.primary }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
