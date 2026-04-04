import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const STOPS = [
  { num: 1, name: 'Tel Aviv', cat: 'Start', dist: '—', time: '—', rating: null, icon: '📍' },
  { num: 2, name: 'Roadside Grill', cat: 'Restaurant', dist: '42km', time: '~35min', rating: 4.7, icon: '🍔' },
  { num: 3, name: 'Masada Fortress', cat: 'Historic', dist: '65km', time: '~50min', rating: 4.9, icon: '🏛️', audioStory: true },
  { num: 4, name: 'Dead Sea Beach', cat: 'Nature', dist: '28km', time: '~25min', rating: 4.8, icon: '🏖️' },
  { num: 5, name: 'Eilat', cat: 'Destination', dist: '180km', time: '~2h', rating: null, icon: '🏁' },
];

export default function RoadTrip() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Road Trip Mode</Text>
        <TouchableOpacity><Text className="text-primary">🎙️ Audio On</Text></TouchableOpacity>
      </View>

      <View className="bg-bg-card mx-4 rounded-card items-center justify-center mb-4" style={{ height: 200 }}>
        <Text className="text-text-muted">[ Dark Map with Route Line ]</Text>
        <Text className="text-text-muted text-xs mt-1">Numbered stop markers</Text>
      </View>

      <View className="px-4 flex-row justify-between mb-4">
        <Text className="text-text-secondary">Total: 315km</Text>
        <Text className="text-text-secondary">Est. drive: 4h 20min</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {STOPS.map((stop, i) => (
          <View key={stop.num}>
            <TouchableOpacity className="bg-bg-card rounded-card p-4 mb-1">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">{stop.icon}</Text>
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <View className="bg-primary w-6 h-6 rounded-full items-center justify-center mr-2">
                      <Text className="text-white text-xs font-bold">{stop.num}</Text>
                    </View>
                    <Text className="text-white font-bold">{stop.name}</Text>
                  </View>
                  {stop.dist !== '—' && (
                    <Text className="text-text-muted text-sm mt-1">{stop.dist} from last stop · {stop.time} drive</Text>
                  )}
                  {stop.rating && <Text className="text-yellow-400 text-sm">Rating: {stop.rating} ⭐</Text>}
                </View>
                {stop.audioStory && (
                  <TouchableOpacity className="bg-primary/20 px-2 py-1 rounded">
                    <Text className="text-primary text-xs">🎙️ Story</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
            {i < STOPS.length - 1 && (
              <TouchableOpacity className="items-center py-1">
                <Text className="text-primary text-xs">+ Add Stop</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={() => router.push('/(live)/tripId')} className="bg-primary rounded-button py-4 items-center mt-4 mb-8">
          <Text className="text-white font-bold text-lg">Start Road Trip 🚗</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
