import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const visitedCountries = ['Spain', 'France', 'Italy', 'Greece', 'Turkey', 'UAE', 'Thailand', 'Japan'];
const achievements = [
  { id: 'a1', emoji: '🌍', title: 'Globe Trotter', desc: '10 countries visited', unlocked: true },
  { id: 'a2', emoji: '✈️', title: 'Frequent Flyer', desc: '50,000 km flown', unlocked: true },
  { id: 'a3', emoji: '🍽️', title: 'Foodie Explorer', desc: '20 local restaurants', unlocked: false },
  { id: 'a4', emoji: '📸', title: 'Photographer', desc: '100 trip photos', unlocked: true },
  { id: 'a5', emoji: '🏔️', title: 'Adventurer', desc: '5 extreme activities', unlocked: false },
];

export default function AdventureLogScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'map' | 'achievements' | 'timeline'>('map');

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Adventure Log</Text>
        <View className="w-12" />
      </View>

      {/* Stats */}
      <View className="flex-row mb-6 gap-2">
        {[{ value: visitedCountries.length, label: 'Countries' }, { value: '52,340', label: 'km Traveled' }, { value: '14', label: 'Trips' }].map((s) => (
          <View key={s.label} className="flex-1 bg-bg-card border border-border rounded-card py-3 items-center">
            <Text className="text-white text-heading-3 font-bold">{s.value}</Text>
            <Text className="text-text-muted text-caption">{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View className="flex-row mb-4">
        {(['map', 'achievements', 'timeline'] as const).map((t) => (
          <TouchableOpacity key={t} className={`flex-1 py-3 items-center border-b-2 ${tab === t ? 'border-primary' : 'border-transparent'}`} onPress={() => setTab(t)}>
            <Text className={`text-body-sm ${tab === t ? 'text-primary font-semibold' : 'text-text-secondary'}`}>{t === 'map' ? '🗺️ Map' : t === 'achievements' ? '🏆 Badges' : '📅 Timeline'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'map' && (
        <View>
          <View className="bg-bg-card border border-border rounded-card h-64 items-center justify-center mb-4">
            <Text className="text-6xl mb-2">🌍</Text>
            <Text className="text-white text-heading-3">Scratch Map</Text>
            <Text className="text-text-secondary text-body-sm mt-1">{visitedCountries.length} / 195 countries</Text>
            <Text className="text-primary text-caption mt-1">Tap countries to mark as visited</Text>
          </View>
          <Text className="text-white text-heading-3 mb-3">Visited Countries</Text>
          <View className="flex-row flex-wrap gap-2">
            {visitedCountries.map((c) => (
              <View key={c} className="bg-primary/20 px-3 py-1.5 rounded-full"><Text className="text-primary text-body-sm">{c}</Text></View>
            ))}
          </View>
        </View>
      )}

      {tab === 'achievements' && (
        <View>
          {achievements.map((a, i) => (
            <Animated.View key={a.id} entering={FadeInDown.delay(i * 100)}>
              <View className={`flex-row bg-bg-card border rounded-card p-4 mb-3 items-center ${a.unlocked ? 'border-primary' : 'border-border opacity-50'}`}>
                <Text className="text-3xl mr-4">{a.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-white text-body font-semibold">{a.title}</Text>
                  <Text className="text-text-secondary text-body-sm">{a.desc}</Text>
                </View>
                {a.unlocked ? <Text className="text-status-success text-body">✓</Text> : <Text className="text-text-muted text-body">🔒</Text>}
              </View>
            </Animated.View>
          ))}
        </View>
      )}

      {tab === 'timeline' && (
        <View>
          {[{ date: 'Mar 2026', trip: 'Tokyo, Japan', days: 10 }, { date: 'Jan 2026', trip: 'Dubai, UAE', days: 7 }, { date: 'Nov 2025', trip: 'Barcelona, Spain', days: 5 }].map((t, i) => (
            <Animated.View key={i} entering={FadeInDown.delay(i * 100)}>
              <View className="flex-row mb-4">
                <View className="items-center mr-4">
                  <View className="w-4 h-4 bg-primary rounded-full" />
                  {i < 2 && <View className="w-0.5 h-16 bg-border" />}
                </View>
                <TouchableOpacity className="flex-1 bg-bg-card border border-border rounded-card p-4">
                  <Text className="text-text-muted text-caption">{t.date}</Text>
                  <Text className="text-white text-body font-semibold">{t.trip}</Text>
                  <Text className="text-text-secondary text-body-sm">{t.days} days</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
