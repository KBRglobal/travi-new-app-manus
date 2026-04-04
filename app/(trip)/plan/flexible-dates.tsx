import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

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
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Cheapest Days to Fly</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity><Text className="text-[#6443F4] text-lg">← Prev</Text></TouchableOpacity>
          <Text className=" text-lg font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{month}</Text>
          <TouchableOpacity><Text className="text-[#6443F4] text-lg">Next →</Text></TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap mb-4">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <View key={d} style={{ width: '14.28%' }} className="items-center py-1">
              <Text className="text-[rgba(255,255,255,0.3)] text-xs">{d}</Text>
            </View>
          ))}
          {DAYS.slice(0, 28).map((d) => (
            <TouchableOpacity
              key={d.day}
              onPress={() => setSelectedDay(d.day)}
              style={{ width: '14.28%', borderWidth: selectedDay === d.day ? 2 : 0, borderColor: '#6443F4' }}
              className="items-center py-2 rounded-lg"
            >
              <Text className=" text-sm" style={{ color: colors.text.primary }}>{d.day}</Text>
              <Text style={{ color: priceColor(d.price) }} className="text-xs font-[Satoshi-Bold]">€{d.price}</Text>
              {d.price === cheapest && <Text className="text-xs text-green-400">Best</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-[rgba(255,255,255,0.6)] mb-2">Nearby airports</Text>
        <View className="flex-row mb-4">
          {['TLV', 'SDV', 'ETH'].map(a => (
            <TouchableOpacity onPress={() => {}} key={a} className="bg-[#120824] px-4 py-2 rounded-full mr-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <Text className="" style={{ color: colors.text.primary }}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-[rgba(255,255,255,0.6)] mb-2">Trip length</Text>
        <View className="flex-row mb-6">
          {['3-7 nights', '1-2 weeks', '2+ weeks'].map(l => (
            <TouchableOpacity onPress={() => {}} key={l} className="bg-[#120824] px-3 py-2 rounded-full mr-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <Text className="text-[rgba(255,255,255,0.6)] text-sm">{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => { if (selectedDay) router.push('/(trip)/plan/flights'); }}
          className={`rounded-[12px] py-4 items-center mb-8 ${selectedDay ? 'bg-[#6443F4]' : 'bg-[#120824]'}`}
        >
          <Text className={`font-[Satoshi-Bold] text-lg ${selectedDay ? 'text-white' : 'text-[rgba(255,255,255,0.3)]'}`}>
            {selectedDay ? `Search ${month} ${selectedDay}` : 'Select a date'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
