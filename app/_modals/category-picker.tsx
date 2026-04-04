import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const CATEGORIES = [
  { id: '1', emoji: '🏖️', name: 'Beach & Relaxation' },
  { id: '2', emoji: '🏔️', name: 'Mountains & Hiking' },
  { id: '3', emoji: '🏙️', name: 'City & Culture' },
  { id: '4', emoji: '🍜', name: 'Food & Culinary' },
  { id: '5', emoji: '🧗', name: 'Adventure & Sports' },
  { id: '6', emoji: '🧘', name: 'Wellness & Spa' },
  { id: '7', emoji: '🏛️', name: 'History & Heritage' },
  { id: '8', emoji: '🎉', name: 'Nightlife & Entertainment' },
  { id: '9', emoji: '👨‍👩‍👧', name: 'Family Friendly' },
  { id: '10', emoji: '💑', name: 'Romantic' },
];

export default function CategoryPickerModal() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white/60">Cancel</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold">Categories</Text>
        <TouchableOpacity onPress={() => router.back()}><Text className="text-primary font-bold">Done ({selected.length})</Text></TouchableOpacity>
      </View>
      <FlatList data={CATEGORIES} keyExtractor={i => i.id} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => toggle(item.id)} className={`flex-row items-center mx-4 mb-2 p-4 rounded-2xl border ${selected.includes(item.id) ? 'bg-primary/10 border-primary' : 'bg-bg-secondary border-white/[0.08]'}`}>
          <Text className="text-2xl mr-3">{item.emoji}</Text>
          <Text className="text-white font-bold flex-1">{item.name}</Text>
          {selected.includes(item.id) && <Text className="text-primary">✓</Text>}
        </TouchableOpacity>
      )} />
    </View>
  );
}
