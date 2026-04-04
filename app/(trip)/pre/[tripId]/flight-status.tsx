import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const STATUS_COLORS: Record<string, string> = {
  'On Time': '#22C55E', 'Delayed': '#F59E0B', 'Boarding': '#3B82F6',
  'Departed': '#8B5CF6', 'Landed': '#22C55E', 'Cancelled': '#EF4444',
};

export default function FlightStatusLive() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const status = 'On Time';

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Flight Status</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className="text-white text-2xl font-bold mb-2">EK001 · Dubai → London</Text>

        <View className="rounded-card p-4 mb-4 items-center" style={{ backgroundColor: STATUS_COLORS[status] + '20', borderWidth: 1, borderColor: STATUS_COLORS[status] }}>
          <Text style={{ color: STATUS_COLORS[status] }} className="text-xl font-bold">✈️ {status}</Text>
        </View>

        <View className="bg-bg-card rounded-card p-4 mb-4" style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Text className="text-text-muted">[ Live Flight Map ]</Text>
          <Text className="text-text-muted text-xs mt-2">Dark map with route line + plane icon</Text>
        </View>

        <View className="bg-bg-card rounded-card p-4 mb-4">
          <Text className="text-white font-bold text-lg mb-3">Flight Info</Text>
          {[
            ['Gate', 'B14'], ['Terminal', 'T3'], ['Scheduled', '07:30'],
            ['Actual', '07:30'], ['Duration', '8h 15m remaining'],
            ['Altitude', '38,000 ft'], ['Speed', '890 km/h'],
          ].map(([label, value]) => (
            <View key={label} className="flex-row justify-between py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
              <Text className="text-text-secondary">{label}</Text>
              <Text className="text-white font-semibold">{value}</Text>
            </View>
          ))}
        </View>

        <View className="bg-bg-card rounded-card p-4 mb-4">
          <Text className="text-white font-bold mb-3">Timeline</Text>
          {['Scheduled', 'Boarding', 'Departed', 'Landing'].map((step, i) => (
            <View key={step} className="flex-row items-center mb-3">
              <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: i <= 0 ? '#22C55E' : 'rgba(255,255,255,0.1)' }}>
                <Text className="text-white text-xs">{i + 1}</Text>
              </View>
              <Text className={i <= 0 ? 'text-white font-semibold' : 'text-text-muted'}>{step}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row mb-8">
          <TouchableOpacity className="flex-1 bg-primary rounded-button py-3 items-center mr-2">
            <Text className="text-white font-semibold">Add to Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-bg-card rounded-button py-3 items-center ml-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
            <Text className="text-white font-semibold">Share Status</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
