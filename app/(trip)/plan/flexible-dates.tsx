import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const DAYS = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  price: Math.floor(Math.random() * 200) + 100,
}));
const cheapest = Math.min(...DAYS.map(d => d.price));

function priceColor(price: number) {
  if (price <= cheapest + 30) return '#22C55E';
  if (price <= cheapest + 80) return '#F59E0B';
  return '#EF4444';
}

export default function FlexibleDates() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [month, setMonth] = useState('April 2026');

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Cheapest Days to Fly</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity><Text className="text-primary text-lg">← Prev</Text></TouchableOpacity>
          <Text className="text-white text-lg font-bold">{month}</Text>
          <TouchableOpacity><Text className="text-primary text-lg">Next →</Text></TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap mb-4">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <View key={d} style={{ width: '14.28%' }} className="items-center py-1">
              <Text className="text-text-muted text-xs">{d}</Text>
            </View>
          ))}
          {DAYS.slice(0, 28).map((d) => (
            <TouchableOpacity
              key={d.day}
              onPress={() => setSelectedDay(d.day)}
              style={{ width: '14.28%', borderWidth: selectedDay === d.day ? 2 : 0, borderColor: '#6443F4' }}
              className="items-center py-2 rounded-lg"
            >
              <Text className="text-white text-sm">{d.day}</Text>
              <Text style={{ color: priceColor(d.price) }} className="text-xs font-bold">€{d.price}</Text>
              {d.price === cheapest && <Text className="text-xs text-green-400">Best</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-text-secondary mb-2">Nearby airports</Text>
        <View className="flex-row mb-4">
          {['TLV', 'SDV', 'ETH'].map(a => (
            <TouchableOpacity key={a} className="bg-bg-card px-4 py-2 rounded-pill mr-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <Text className="text-white">{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-text-secondary mb-2">Trip length</Text>
        <View className="flex-row mb-6">
          {['3-7 nights', '1-2 weeks', '2+ weeks'].map(l => (
            <TouchableOpacity key={l} className="bg-bg-card px-3 py-2 rounded-pill mr-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <Text className="text-text-secondary text-sm">{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => { if (selectedDay) router.push('/(trip)/plan/flights'); }}
          className={`rounded-button py-4 items-center mb-8 ${selectedDay ? 'bg-primary' : 'bg-bg-card'}`}
        >
          <Text className={`font-bold text-lg ${selectedDay ? 'text-white' : 'text-text-muted'}`}>
            {selectedDay ? `Search ${month} ${selectedDay}` : 'Select a date'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
