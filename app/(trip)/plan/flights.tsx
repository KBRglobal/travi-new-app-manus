import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const FLIGHTS = [
  { airline: 'Emirates', code: 'EK001', dep: '07:30', arr: '15:45', duration: '8h 15m', stops: 'Direct', price: 289, dna: 92 },
  { airline: 'Turkish', code: 'TK788', dep: '10:00', arr: '20:30', duration: '10h 30m', stops: '1 stop', price: 189, dna: 78 },
  { airline: 'Lufthansa', code: 'LH680', dep: '14:15', arr: '23:00', duration: '8h 45m', stops: 'Direct', price: 345, dna: 85 },
];

const SORT_TABS = ['Best', 'Cheapest', 'Fastest', 'Flexible Dates'];

export default function FlightSelect() {
  const router = useRouter();
  const [activeSort, setActiveSort] = useState('Best');
  const [aiMode, setAiMode] = useState(false);

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-2">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Select Flight</Text>
        <TouchableOpacity onPress={() => setAiMode(!aiMode)} className={`px-3 py-1 rounded-pill ${aiMode ? 'bg-primary' : 'bg-bg-card'}`} style={{ borderWidth: 1, borderColor: aiMode ? '#6443F4' : 'rgba(255,255,255,0.1)' }}>
          <Text className={aiMode ? 'text-white font-semibold' : 'text-text-secondary'}>🤖 AI</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-3" style={{ maxHeight: 40 }}>
        {SORT_TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              if (tab === 'Flexible Dates') { router.push('/(trip)/plan/flexible-dates'); return; }
              setActiveSort(tab);
            }}
            className={`px-4 py-2 rounded-pill mr-2 ${activeSort === tab ? 'bg-primary' : 'bg-bg-card'}`}
          >
            <Text className={activeSort === tab ? 'text-white font-semibold' : 'text-text-secondary'}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {aiMode && (
        <View className="mx-4 mb-3 bg-primary/10 rounded-card p-3" style={{ borderWidth: 1, borderColor: '#6443F4' }}>
          <Text className="text-primary font-bold">🤖 AI Mode Active</Text>
          <Text className="text-text-secondary text-sm">Searching 400+ airlines for your DNA match...</Text>
          <View className="bg-bg-primary rounded-full h-2 mt-2 overflow-hidden">
            <View className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
          </View>
        </View>
      )}

      <ScrollView className="flex-1 px-4">
        {FLIGHTS.map(flight => (
          <TouchableOpacity key={flight.code} onPress={() => router.push('/(trip)/plan/hotels')} className="bg-bg-card rounded-card p-4 mb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white font-bold">{flight.airline}</Text>
              <Text className="text-primary font-bold">✦ {flight.dna}%</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white text-lg font-bold">{flight.dep}</Text>
                <Text className="text-text-muted text-xs">{flight.code}</Text>
              </View>
              <View className="items-center flex-1 mx-4">
                <Text className="text-text-muted text-xs">{flight.duration}</Text>
                <View className="h-0.5 bg-text-muted/30 w-full my-1" />
                <Text className="text-text-muted text-xs">{flight.stops}</Text>
              </View>
              <Text className="text-white text-lg font-bold">{flight.arr}</Text>
            </View>
            <Text className="text-white text-xl font-bold">€{flight.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="px-4 pb-6">
        <TouchableOpacity onPress={() => router.push('/(trip)/plan/flight-alerts')} className="bg-bg-card rounded-button py-3 items-center mb-2" style={{ borderWidth: 1, borderColor: colors.pink }}>
          <Text className="text-pink font-semibold">🔔 Set Price Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(trip)/plan/hotels')} className="py-2 items-center">
          <Text className="text-text-secondary">Skip Flights →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
