import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EXPENSES = [
  { name: 'Hotel check-in', amount: 445, cat: '🏨', time: 'Today' },
  { name: 'Lunch at Souk', amount: 32, cat: '🍜', time: 'Today' },
  { name: 'Taxi to Mall', amount: 15, cat: '🚗', time: 'Today' },
  { name: 'Museum tickets', amount: 25, cat: '🎯', time: 'Yesterday' },
];

export default function Expenses() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Expenses</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-bg-card rounded-card p-4 mb-2">
          <View className="flex-row justify-between mb-2">
            <Text className="text-text-secondary">Budget: €1,500</Text>
            <Text className="text-white font-bold">Spent: €847</Text>
            <Text className="text-primary font-bold">Left: €653</Text>
          </View>
          <View className="bg-bg-primary rounded-full h-3 overflow-hidden">
            <View className="bg-primary h-full rounded-full" style={{ width: '56%' }} />
          </View>
          <Text className="text-text-muted text-xs mt-1">56% used</Text>
        </View>
        <TouchableOpacity onPress={() => router.push(`/(live)/${tripId}/budget` as any)} className="mb-4">
          <Text className="text-primary text-sm text-right font-semibold">Full Budget →</Text>
        </TouchableOpacity>

        <View className="bg-bg-card rounded-card p-4 mb-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-text-secondary">1 EUR = 4.025 ILS</Text>
            <Text className="text-text-secondary">1 EUR = 3.67 AED</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/(trip)/wallet/currency')} className="mb-4">
          <Text className="text-primary text-sm text-right font-semibold">Currency Converter →</Text>
        </TouchableOpacity>

        <Text className="text-white font-bold text-lg mb-3">Recent Expenses</Text>
        {EXPENSES.map((exp, i) => (
          <View key={i} className="bg-bg-card rounded-card p-4 mb-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-xl mr-3">{exp.cat}</Text>
              <View>
                <Text className="text-white font-semibold">{exp.name}</Text>
                <Text className="text-text-muted text-sm">{exp.time}</Text>
              </View>
            </View>
            <Text className="text-white font-bold">€{exp.amount}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center" style={{ elevation: 8 }}>
        <Text className="text-white text-2xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}
