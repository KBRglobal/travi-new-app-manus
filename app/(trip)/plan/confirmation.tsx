import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe" contentContainerStyle={{ alignItems: 'center', paddingVertical: 40 }}>
      <Ionicons name="sparkles" size={24} color="#FFFFFF" />
      <Text className="text-white text-2xl font-bold mb-2">Booking Confirmed!</Text>
      <Text className="text-white/60 text-center mb-8 px-8">Your trip to Tokyo is booked. Get ready for an amazing adventure!</Text>
      <View className="w-full px-4 mb-6">
        <View className="bg-bg-secondary rounded-2xl p-4 border border-white/[0.08]">
          <View className="flex-row justify-between mb-2"><Text className="text-white/40">Booking ID</Text><Text className="text-white font-bold">TRV-2026-0412</Text></View>
          <View className="flex-row justify-between mb-2"><Text className="text-white/40">Destination</Text><Text className="text-white">🇯🇵 Tokyo, Japan</Text></View>
          <View className="flex-row justify-between mb-2"><Text className="text-white/40">Dates</Text><Text className="text-white">Apr 15 - 22, 2026</Text></View>
          <View className="flex-row justify-between mb-2"><Text className="text-white/40">Total Paid</Text><Text className="text-white font-bold">$2,745</Text></View>
          <View className="flex-row justify-between"><Text className="text-white/40">Points Earned</Text><Text className="text-primary font-bold">+274 pts</Text></View>
        </View>
      </View>
      <View className="w-full px-4 mb-4 p-4 bg-primary/10 rounded-2xl mx-4 border border-primary/20">
        <Text className="text-primary text-center font-bold">Confirmation email sent to john@example.com</Text>
      </View>
      <View className="w-full px-4">
        <TouchableOpacity onPress={() => router.push('/(trip)/pre-trip/checklist')} className="bg-primary py-4 rounded-2xl items-center mb-3">
          <Text className="text-white font-bold text-lg">View Pre-Trip Checklist</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/trips')} className="py-4 rounded-2xl items-center border border-white/[0.08]">
          <Text className="text-white font-bold">Go to My Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')} className="py-4 items-center">
          <Text className="text-white/60">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
