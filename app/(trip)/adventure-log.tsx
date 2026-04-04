import { Skeleton } from '@/components/ui/Skeleton';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
import { useRouter } from 'expo-router';
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
const visitedCountries = ['Spain', 'France', 'Italy', 'Greece', 'Turkey', 'UAE', 'Thailand', 'Japan'];
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
const achievements = [
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: 'a1', emoji: '🌍', title: 'Globe Trotter', desc: '10 countries visited', unlocked: true },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: 'a2', emoji: '✈️', title: 'Frequent Flyer', desc: '50,000 km flown', unlocked: true },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: 'a3', emoji: '🍽️', title: 'Foodie Explorer', desc: '20 local restaurants', unlocked: false },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: 'a4', emoji: '📸', title: 'Photographer', desc: '100 trip photos', unlocked: true },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  { id: 'a5', emoji: '🏔️', title: 'Adventurer', desc: '5 extreme activities', unlocked: false },
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
];
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
export default function AdventureLogScreen() {
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const router = useRouter();
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  const [tab, setTab] = useState<'map' | 'achievements' | 'timeline'>('map');
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  return (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <View className="flex-row items-center justify-between mb-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <Text className="text-white text-heading-3">Adventure Log</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View className="w-12" />
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      {/* Stats */}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <View className="flex-row mb-6 gap-2">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        {[{ value: visitedCountries.length, label: 'Countries' }, { value: '52,340', label: 'km Traveled' }, { value: '14', label: 'Trips' }].map((s) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <View key={s.label} className="flex-1 bg-bg-card border border-border rounded-card py-3 items-center">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-white text-heading-3 font-bold">{s.value}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-text-muted text-caption">{s.label}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        ))}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      {/* Tabs */}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      <View className="flex-row mb-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        {(['map', 'achievements', 'timeline'] as const).map((t) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <TouchableOpacity key={t} className={`flex-1 py-3 items-center border-b-2 ${tab === t ? 'border-primary' : 'border-transparent'}`} onPress={() => setTab(t)}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className={`text-body-sm ${tab === t ? 'text-primary font-semibold' : 'text-text-secondary'}`}>{t === 'map' ? '🗺️ Map' : t === 'achievements' ? '🏆 Badges' : '📅 Timeline'}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        ))}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      {tab === 'map' && (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <View className="bg-bg-card border border-border rounded-card h-64 items-center justify-center mb-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-6xl mb-2">🌍</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-white text-heading-3">Scratch Map</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-text-secondary text-body-sm mt-1">{visitedCountries.length} / 195 countries</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Text className="text-primary text-caption mt-1">Tap countries to mark as visited</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <Text className="text-white text-heading-3 mb-3">Visited Countries</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          <View className="flex-row flex-wrap gap-2">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            {visitedCountries.map((c) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <View key={c} className="bg-primary/20 px-3 py-1.5 rounded-full"><Text className="text-primary text-body-sm">{c}</Text></View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            ))}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      )}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      {tab === 'achievements' && (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          {achievements.map((a, i) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Animated.View key={a.id} entering={FadeInDown.delay(i * 100)}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <View className={`flex-row bg-bg-card border rounded-card p-4 mb-3 items-center ${a.unlocked ? 'border-primary' : 'border-border opacity-50'}`}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                <Text className="text-3xl mr-4">{a.emoji}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                <View className="flex-1">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <Text className="text-white text-body font-semibold">{a.title}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <Text className="text-text-secondary text-body-sm">{a.desc}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                {a.unlocked ? <Text className="text-status-success text-body">✓</Text> : <Text className="text-text-muted text-body">🔒</Text>}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            </Animated.View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          ))}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      )}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';

mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      {tab === 'timeline' && (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        <View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          {[{ date: 'Mar 2026', trip: 'Tokyo, Japan', days: 10 }, { date: 'Jan 2026', trip: 'Dubai, UAE', days: 7 }, { date: 'Nov 2025', trip: 'Barcelona, Spain', days: 5 }].map((t, i) => (
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            <Animated.View key={i} entering={FadeInDown.delay(i * 100)}>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              <View className="flex-row mb-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                <View className="items-center mr-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <View className="w-4 h-4 bg-primary rounded-full" />
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  {i < 2 && <View className="w-0.5 h-16 bg-border" />}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                <TouchableOpacity className="flex-1 bg-bg-card border border-border rounded-card p-4">
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <Text className="text-text-muted text-caption">{t.date}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <Text className="text-white text-body font-semibold">{t.trip}</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                  <Text className="text-text-secondary text-body-sm">{t.days} days</Text>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
                </TouchableOpacity>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
              </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
            </Animated.View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
          ))}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
        </View>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
      )}
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
    </ScrollView>
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
  );
mport { useLoadingState } from '@/hooks/useLoadingState';
mport { useRefresh } from '@/hooks/useRefresh';
mport { haptic } from '@/lib/haptics';
}
