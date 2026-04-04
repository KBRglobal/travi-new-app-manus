import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function PaymentFailedScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="close-circle" size={24} color="#FFFFFF" />
      <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Payment Failed</Text>
      <Text className="/60 text-center mb-8" style={{ color: colors.text.primary }}>Your payment could not be processed. Please try again or use a different payment method.</Text>
      <TouchableOpacity onPress={() => router.replace('/(trip)/plan/payment')} className="bg-[#6443F4] px-8 py-4 rounded-2xl w-full items-center mb-3">
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Try Again</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(trip)/settings/support')} className="px-8 py-3">
        <Text className="text-[#6443F4] font-[Satoshi-Bold]">Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
}
