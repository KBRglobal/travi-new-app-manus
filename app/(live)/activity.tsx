import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function ActivityDetailScreen() {
  const router = useRouter();
  const [booked, setBooked] = useState(false);

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Activity Details</Text>
        <View className="flex-1" />
        <TouchableOpacity><Text className="text-white/60">♡</Text></TouchableOpacity>
      </View>
      <View className="h-48 bg-white/[0.03] mx-4 rounded-2xl items-center justify-center mb-4">
        <Text className="text-6xl">🏄</Text>
      </View>
      <View className="px-4 mb-4">
        <Text className="text-white text-2xl font-bold mb-1">Surf Lesson at Waikiki</Text>
        <View className="flex-row items-center mb-2">
          <Text className="text-yellow-400 mr-1">⭐</Text>
          <Text className="text-white font-bold mr-2">4.8</Text>
          <Text className="text-white/40">(234 reviews)</Text>
        </View>
        <View className="flex-row items-center mb-4">
          <Text className="text-white/40 text-sm">📍 Waikiki Beach • ⏱️ 2 hours • 👥 Max 6</Text>
        </View>
        <Text className="text-white/80 text-sm mb-4">Learn to surf with professional instructors on the famous Waikiki Beach. All equipment provided. Perfect for beginners and intermediate surfers.</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white font-bold mb-3">What's Included</Text>
        {['Surfboard & wetsuit', 'Professional instructor', 'Beach photos', 'Insurance'].map(item => (
          <View key={item} className="flex-row items-center mb-2">
            <Text className="text-green-400 mr-2">✓</Text>
            <Text className="text-white/80 text-sm">{item}</Text>
          </View>
        ))}
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white font-bold mb-3">Available Times</Text>
        <View className="flex-row flex-wrap">
          {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map(t => (
            <TouchableOpacity key={t} className="px-4 py-2 bg-bg-secondary rounded-xl mr-2 mb-2 border border-white/[0.08]">
              <Text className="text-white text-sm">{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="mx-4 mb-8 flex-row items-center">
        <View className="flex-1">
          <Text className="text-white/40 text-xs">Price per person</Text>
          <Text className="text-white text-2xl font-bold">$75</Text>
        </View>
        <TouchableOpacity onPress={() => setBooked(true)} className={`px-8 py-4 rounded-2xl ${booked ? 'bg-green-500' : 'bg-primary'}`}>
          <Text className="text-white font-bold text-lg">{booked ? '✓ Booked' : 'Book Now'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
