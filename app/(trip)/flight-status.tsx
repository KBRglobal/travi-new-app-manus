import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function FlightStatusScreen() {
  const router = useRouter();
  const timeline = [
    { time: '06:00', event: 'Check-in opens', status: 'done' },
    { time: '08:30', event: 'Boarding begins', status: 'done' },
    { time: '09:00', event: 'Departure TLV', status: 'current' },
    { time: '12:30', event: 'Arrival BCN', status: 'upcoming' },
  ];

  return (
    <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Flight Status</Text>
        <TouchableOpacity><Text className="text-primary text-body-sm">Share</Text></TouchableOpacity>
      </View>

      {/* Flight info */}
      <Animated.View entering={FadeInDown} className="bg-bg-card border border-border rounded-card p-6 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-text-muted text-body-sm">EL AL · LY 371</Text>
          <View className="bg-status-success/20 px-3 py-1 rounded-full"><Text className="text-status-success text-caption font-bold">On Time</Text></View>
        </View>
        <View className="flex-row justify-between items-center">
          <View><Text className="text-white text-3xl font-bold">TLV</Text><Text className="text-text-secondary text-body-sm">Tel Aviv</Text><Text className="text-white text-heading-3">09:00</Text></View>
          <View className="flex-1 mx-4 items-center"><Text className="text-text-muted text-body-sm">3h 30m</Text><View className="w-full h-px bg-border mt-1"><View className="w-1/2 h-full bg-primary" /></View><Text className="text-primary text-caption mt-1">In flight</Text></View>
          <View className="items-end"><Text className="text-white text-3xl font-bold">BCN</Text><Text className="text-text-secondary text-body-sm">Barcelona</Text><Text className="text-white text-heading-3">12:30</Text></View>
        </View>
      </Animated.View>

      {/* Map placeholder */}
      <Animated.View entering={FadeInDown.delay(100)} className="bg-bg-card border border-border rounded-card h-48 items-center justify-center mb-6">
        <Ionicons name="map" size={24} color="#FFFFFF" />
        <Text className="text-text-secondary text-body-sm">Live flight tracking map</Text>
        <Text className="text-primary text-caption mt-1">Currently over Mediterranean Sea</Text>
      </Animated.View>

      {/* Timeline */}
      <Text className="text-white text-heading-3 mb-4">Timeline</Text>
      {timeline.map((item, i) => (
        <Animated.View key={i} entering={FadeInDown.delay(200 + i * 80)} className="flex-row mb-4">
          <View className="items-center mr-4">
            <View className={`w-4 h-4 rounded-full ${item.status === 'done' ? 'bg-status-success' : item.status === 'current' ? 'bg-primary' : 'bg-bg-surface'}`} />
            {i < timeline.length - 1 && <View className={`w-0.5 h-12 ${item.status === 'done' ? 'bg-status-success' : 'bg-bg-surface'}`} />}
          </View>
          <View className="flex-1">
            <Text className="text-text-muted text-caption">{item.time}</Text>
            <Text className={`text-body font-semibold ${item.status === 'current' ? 'text-primary' : item.status === 'done' ? 'text-text-secondary' : 'text-white'}`}>{item.event}</Text>
          </View>
        </Animated.View>
      ))}

      {/* Details */}
      <Animated.View entering={FadeInDown.delay(500)} className="bg-bg-card border border-border rounded-card p-4">
        <Text className="text-white text-heading-3 mb-3">Flight Details</Text>
        {[['Aircraft', 'Boeing 737-900'], ['Gate', 'B12'], ['Seat', '14A (Window)'], ['Terminal', 'T3']].map(([label, value]) => (
          <View key={label} className="flex-row justify-between py-2 border-b border-border">
            <Text className="text-text-muted text-body-sm">{label}</Text>
            <Text className="text-white text-body-sm font-semibold">{value}</Text>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}
