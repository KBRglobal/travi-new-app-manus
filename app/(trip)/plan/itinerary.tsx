import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const DAYS = [
  { day: 1, title: 'Cultural Immersion', activities: ['Dubai Museum', 'Gold Souk', 'Spice Market'] },
  { day: 2, title: 'Adventure Day', activities: ['Desert Safari', 'Dune Bashing', 'BBQ Dinner'] },
  { day: 3, title: 'Modern Dubai', activities: ['Burj Khalifa', 'Dubai Mall', 'Fountain Show'] },
];

export default function ItineraryBuilder() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Itinerary</Text>
        <TouchableOpacity onPress={() => router.push('/(trip)/plan/packing-list')} className="mr-2">
          <MaterialIcons name="luggage" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(trip)/plan/trip-companions')} className="mr-2">
          <MaterialIcons name="group" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(trip)/plan/ai-itinerary')} className="mr-2">
          <Ionicons name="hardware-chip" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(trip)/plan/collab/tripId')}>
          <Ionicons name="people" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView removeClippedSubviews={true} className="flex-1 px-4">
        {DAYS.map(day => (
          <View key={day.day} className="mb-4">
            <Text className="text-white font-bold text-lg mb-2">Day {day.day} — {day.title}</Text>
            {day.activities.map((act, i) => (
              <View key={act} className="bg-bg-card rounded-card p-4 mb-2 flex-row items-center">
                <Text className="text-text-muted mr-3">≡</Text>
                <View className="bg-primary w-6 h-6 rounded-full items-center justify-center mr-3">
                  <Text className="text-white text-xs">{i + 1}</Text>
                </View>
                <Text className="text-white font-semibold flex-1">{act}</Text>
                <Text className="text-text-muted">›</Text>
              </View>
            ))}
            <TouchableOpacity className="items-center py-2">
              <Text className="text-primary text-sm">+ Add Activity</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View className="px-4 pb-6">
        <TouchableOpacity onPress={() => router.push('/(trip)/plan/road-trip')} className="bg-bg-card rounded-button py-3 items-center mb-2" style={{ borderWidth: 1, borderColor: colors.pink }}>
          <Text className="text-pink font-semibold">Road Trip Mode NEW</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(trip)/plan/cart')} className="bg-primary rounded-button py-4 items-center">
          <Text className="text-white font-bold text-lg">Review Cart →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
