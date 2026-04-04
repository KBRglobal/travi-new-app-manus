import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function CountryRules() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Country Rules</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-bg-card rounded-card p-4 mb-4">
          <Text className="text-white font-bold text-lg mb-2">🇦🇪 UAE Tax Rules</Text>
          <Text className="text-text-secondary mb-2">VAT Rate: 5%</Text>
          <Text className="text-text-secondary mb-2">Tax-free shopping: Available for tourists</Text>
          <Text className="text-text-secondary">Minimum purchase: AED 250 per receipt</Text>
        </View>

        <View className="bg-bg-card rounded-card p-4 mb-4">
          <Text className="text-white font-bold text-lg mb-2">Visa Information</Text>
          <Text className="text-text-secondary mb-2">🇮🇱 Israeli passport: Visa-free, 30 days</Text>
          <Text className="text-text-secondary mb-2">Requirements: Valid passport (6+ months)</Text>
        </View>
        <TouchableOpacity onPress={() => router.push(`/(trip)/pre/${tripId}/visa` as any)} className="mb-4">
          <Text className="text-primary font-semibold">Full Visa Center →</Text>
        </TouchableOpacity>

        <View className="bg-bg-card rounded-card p-4 mb-4">
          <Text className="text-white font-bold text-lg mb-2">Customs Allowances</Text>
          <Text className="text-text-secondary mb-2">Alcohol: 2 liters</Text>
          <Text className="text-text-secondary mb-2">Cigarettes: 400</Text>
          <Text className="text-text-secondary">Gifts: up to AED 3,000</Text>
        </View>

        <View className="bg-bg-card rounded-card p-4 mb-8">
          <Text className="text-white font-bold text-lg mb-2">Important Notes</Text>
          <Text className="text-text-secondary">• Dress modestly in public areas</Text>
          <Text className="text-text-secondary">• No public drinking outside licensed venues</Text>
          <Text className="text-text-secondary">• Photography restrictions at government buildings</Text>
        </View>
      </ScrollView>
    </View>
  );
}
