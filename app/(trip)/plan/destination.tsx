import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const SUGGESTIONS = [
  { name: 'Dubai', flag: '🇦🇪', match: 92 },
  { name: 'Tokyo', flag: '🇯🇵', match: 85 },
  { name: 'Barcelona', flag: '🇪🇸', match: 88 },
  { name: 'Bali', flag: '🇮🇩', match: 81 },
];

export default function DestinationSelect() {
  const router = useRouter();
  const [mode, setMode] = useState<'city' | 'road'>('city');

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Where to?</Text>
      </View>

      <View className="flex-row mx-4 mb-4 bg-bg-card rounded-pill p-1">
        <TouchableOpacity onPress={() => setMode('city')} className={`flex-1 py-2 rounded-pill items-center ${mode === 'city' ? 'bg-primary' : ''}`}>
          <Text className={mode === 'city' ? 'text-white font-semibold' : 'text-text-secondary'}>✈️ City Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setMode('road'); router.push('/(trip)/plan/road-trip'); }} className={`flex-1 py-2 rounded-pill items-center ${mode === 'road' ? 'bg-primary' : ''}`} style={{ borderWidth: mode !== 'road' ? 1 : 0, borderColor: colors.pink }}>
          <Text className={mode === 'road' ? 'text-white font-semibold' : 'text-pink font-semibold'}>🚗 Road Trip {mode !== 'road' ? 'NEW' : ''}</Text>
        </TouchableOpacity>
      </View>

      <View className="px-4">
        <TextInput className="bg-bg-card rounded-input p-3 text-white mb-4" placeholder="Search destinations..." placeholderTextColor="rgba(255,255,255,0.3)" />
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className="text-white font-bold text-lg mb-3">AI Suggestions for You</Text>
        {SUGGESTIONS.map(dest => (
          <TouchableOpacity key={dest.name} onPress={() => router.push('/(trip)/plan/dates')} className="bg-bg-card rounded-card p-4 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">{dest.flag}</Text>
              <Text className="text-white font-bold text-lg">{dest.name}</Text>
            </View>
            <View className="items-end">
              <Text className="text-primary font-bold">✦ {dest.match}%</Text>
              <Text className="text-text-muted text-xs">DNA Match</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
