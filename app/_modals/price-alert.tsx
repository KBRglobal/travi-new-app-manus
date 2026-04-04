import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PriceAlertModal() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-6xl mb-4">📉</Text>
      <Text className="text-white text-3xl font-bold mb-2">Price Drop!</Text>
      <View className="w-full p-4 bg-bg-secondary rounded-2xl border border-white/[0.08] mb-6">
        <Text className="text-white font-bold text-lg mb-1">✈️ NYC → Tokyo</Text>
        <View className="flex-row items-center mb-2">
          <Text className="text-white/40 line-through mr-2">$1,200</Text>
          <Text className="text-green-400 text-2xl font-bold">$890</Text>
        </View>
        <Text className="text-green-400 text-sm">Save $310 (26% off)</Text>
        <Text className="text-white/40 text-xs mt-2">Apr 15 • Economy • Direct</Text>
      </View>
      <TouchableOpacity onPress={() => { router.back(); router.push('/(trip)/flights'); }} className="bg-primary w-full py-4 rounded-2xl items-center mb-3">
        <Text className="text-white font-bold text-lg">Book Now</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}><Text className="text-white/60">Remind Me Later</Text></TouchableOpacity>
    </View>
  );
}
