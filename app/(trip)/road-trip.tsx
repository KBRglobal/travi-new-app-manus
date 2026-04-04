import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const stops = [
  { id: 'rt1', name: 'Barcelona', type: 'Start', km: 0, audioStory: true },
  { id: 'rt2', name: 'Montserrat Monastery', type: 'Scenic', km: 60, audioStory: true },
  { id: 'rt3', name: 'Tarragona', type: 'Historic', km: 100, audioStory: false },
  { id: 'rt4', name: 'Peñíscola Castle', type: 'Castle', km: 230, audioStory: true },
  { id: 'rt5', name: 'Valencia', type: 'City', km: 350, audioStory: false },
];

export default function RoadTripScreen() {
  const router = useRouter();
  const [currentStop, setCurrentStop] = useState(1);
  const [audioPlaying, setAudioPlaying] = useState(false);

  return (
    <View className="flex-1 bg-bg-primary">
      {/* Map area */}
      <View className="h-[40%] bg-bg-secondary items-center justify-center">
        <Text className="text-6xl mb-2">🛣️</Text>
        <Text className="text-white text-heading-3">Road Trip Route</Text>
        <Text className="text-text-secondary text-body-sm mt-1">Barcelona → Valencia · 350 km</Text>
        <View className="absolute bottom-4 left-6 right-6 flex-row justify-between">
          {stops.map((s, i) => (
            <View key={s.id} className={`w-8 h-8 rounded-full items-center justify-center ${i <= currentStop ? 'bg-primary' : 'bg-bg-surface'}`}>
              <Text className="text-white text-caption font-bold">{i + 1}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity className="absolute top-14 left-6 bg-bg-overlay w-10 h-10 rounded-full items-center justify-center" onPress={() => router.back()}>
        <Text className="text-white text-lg">‹</Text>
      </TouchableOpacity>

      {/* Stops list */}
      <ScrollView className="flex-1" contentContainerClassName="px-6 py-4 pb-24">
        <Text className="text-white text-heading-3 mb-4">Stops</Text>
        {stops.map((stop, i) => (
          <Animated.View key={stop.id} entering={FadeInDown.delay(i * 100)}>
            <View className={`flex-row bg-bg-card border rounded-card p-4 mb-3 ${i === currentStop ? 'border-primary' : i < currentStop ? 'border-status-success' : 'border-border'}`}>
              <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${i <= currentStop ? 'bg-primary' : 'bg-bg-surface'}`}>
                <Text className="text-white text-body font-bold">{i + 1}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-body font-semibold">{stop.name}</Text>
                <Text className="text-text-secondary text-body-sm">{stop.type} · {stop.km} km</Text>
              </View>
              <View className="justify-center items-end">
                {i < currentStop && <Text className="text-status-success text-body-sm">✓ Visited</Text>}
                {i === currentStop && <Text className="text-primary text-body-sm font-bold">→ Next</Text>}
                {stop.audioStory && (
                  <TouchableOpacity className="mt-1" onPress={() => setAudioPlaying(!audioPlaying)}>
                    <Text className="text-pink text-caption">{audioPlaying && i === currentStop ? '⏸️ Playing' : '🎧 Story'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Audio player bar */}
      {audioPlaying && (
        <View className="absolute bottom-0 left-0 right-0 bg-bg-card border-t border-border p-4 pb-safe flex-row items-center">
          <TouchableOpacity onPress={() => setAudioPlaying(false)}><Text className="text-2xl mr-3">⏸️</Text></TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white text-body-sm font-semibold">The History of Montserrat</Text>
            <View className="h-1 bg-bg-surface rounded-full mt-1"><View className="w-1/3 h-full bg-primary rounded-full" /></View>
          </View>
          <Text className="text-text-muted text-caption ml-3">2:45 / 8:30</Text>
        </View>
      )}
    </View>
  );
}
