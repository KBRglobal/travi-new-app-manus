import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const cities = [
  { id: 'n1', name: 'Lisbon', country: 'Portugal', score: 92, internet: '95 Mbps', cost: '€1,800/mo', coworking: 45, community: 'Large' },
  { id: 'n2', name: 'Bali', country: 'Indonesia', score: 88, internet: '50 Mbps', cost: '€1,200/mo', coworking: 38, community: 'Large' },
  { id: 'n3', name: 'Bangkok', country: 'Thailand', score: 85, internet: '70 Mbps', cost: '€1,000/mo', coworking: 52, community: 'Huge' },
  { id: 'n4', name: 'Tbilisi', country: 'Georgia', score: 82, internet: '60 Mbps', cost: '€800/mo', coworking: 15, community: 'Growing' },
];

export default function NomadHubScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'cities' | 'coworking' | 'communities'>('cities');

  return (
    <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Nomad Hub</Text>
        <View className="w-12" />
      </View>

      {/* Tabs */}
      <View className="flex-row mb-6">
        {(['cities', 'coworking', 'communities'] as const).map((t) => (
          <TouchableOpacity key={t} className={`flex-1 py-3 items-center border-b-2 ${tab === t ? 'border-primary' : 'border-transparent'}`} onPress={() => setTab(t)}>
            <Text className={`text-body-sm ${tab === t ? 'text-primary font-semibold' : 'text-text-secondary'}`}>{t === 'cities' ? 'Cities' : t === 'coworking' ? 'Cowork' : 'Community'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'cities' && cities.map((city, i) => (
        <Animated.View key={city.id} entering={FadeInDown.delay(i * 100)}>
          <TouchableOpacity className="bg-bg-card border border-border rounded-card p-4 mb-3" onPress={() => router.push(`/(trip)/destination/${city.id}`)}>
            <View className="flex-row justify-between items-center mb-3">
              <View>
                <Text className="text-white text-heading-3 font-semibold">{city.name}</Text>
                <Text className="text-text-secondary text-body-sm">{city.country}</Text>
              </View>
              <View className="bg-primary w-14 h-14 rounded-full items-center justify-center">
                <Text className="text-white text-heading-3 font-bold">{city.score}</Text>
              </View>
            </View>
            <View className="flex-row">
              {[{ label: 'Internet', value: city.internet }, { label: 'Cost', value: city.cost }, { label: 'Spaces', value: city.coworking.toString() }].map((s) => (
                <View key={s.label} className="flex-1">
                  <Text className="text-text-muted text-caption">{s.label}</Text>
                  <Text className="text-white text-body-sm font-semibold">{s.value}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {tab === 'coworking' && (
        <View className="items-center py-12">
          <Ionicons name="laptop" size={24} color="#FFFFFF" />
          <Text className="text-white text-heading-3">Coworking Spaces</Text>
          <Text className="text-text-secondary text-body-sm mt-2">150+ spaces in your destination</Text>
        </View>
      )}

      {tab === 'communities' && (
        <View className="items-center py-12">
          <Ionicons name="people" size={24} color="#FFFFFF" />
          <Text className="text-white text-heading-3">Nomad Communities</Text>
          <Text className="text-text-secondary text-body-sm mt-2">Connect with fellow nomads</Text>
        </View>
      )}
    </ScrollView>
  );
}
