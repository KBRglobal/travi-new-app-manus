import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function PaymentFailedScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-5xl mb-4">❌</Text>
      <Text className="text-white text-2xl font-bold mb-2">Payment Failed</Text>
      <Text className="text-white/60 text-center mb-8">Your payment could not be processed. Please try again or use a different payment method.</Text>
      <TouchableOpacity onPress={() => router.replace('/(trip)/plan/payment')} className="bg-primary px-8 py-4 rounded-2xl w-full items-center mb-3">
        <Text className="text-white font-bold text-lg">Try Again</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(trip)/settings/support')} className="px-8 py-3">
        <Text className="text-primary font-bold">Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
}
