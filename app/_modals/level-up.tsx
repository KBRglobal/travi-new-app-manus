import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LevelUpModal() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-6xl mb-4">🏆</Text>
      <Text className="text-white text-3xl font-bold mb-2">Level Up!</Text>
      <Text className="text-primary text-2xl font-bold mb-4">Gold Member</Text>
      <Text className="text-white/60 text-center mb-6">You've reached Gold tier! Enjoy exclusive perks and higher rewards.</Text>
      <View className="w-full mb-6">
        {['Free room upgrades', 'Airport lounge access (2x/month)', '2x points multiplier', 'Priority support'].map(perk => (
          <View key={perk} className="flex-row items-center mb-2">
            <Text className="text-yellow-400 mr-2">⭐</Text>
            <Text className="text-white text-sm">{perk}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => router.push('/(trip)/points/perks')} className="bg-primary w-full py-4 rounded-2xl items-center mb-3">
        <Text className="text-white font-bold text-lg">View My Perks</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}><Text className="text-white/60">Dismiss</Text></TouchableOpacity>
    </View>
  );
}
