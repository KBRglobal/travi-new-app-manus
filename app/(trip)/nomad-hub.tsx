import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

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
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
        <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Nomad Hub</Text>
        <View className="w-12" />
      </View>

      {/* Tabs */}
      <View className="flex-row mb-6">
        {(['cities', 'coworking', 'communities'] as const).map((t) => (
          <TouchableOpacity key={t} className={`flex-1 py-3 items-center border-b-2 ${tab === t ? 'border-[#6443F4]' : 'border-transparent'}`} onPress={() => setTab(t)}>
            <Text className={`text-[13px] ${tab === t ? 'text-[#6443F4] font-semibold' : 'text-[rgba(255,255,255,0.6)]'}`}>{t === 'cities' ? 'Cities' : t === 'coworking' ? 'Cowork' : 'Community'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'cities' && cities.map((city, i) => (
        <Animated.View key={city.id} entering={FadeInDown.delay(i * 100)}>
          <TouchableOpacity className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-3" onPress={() => router.push(`/(trip)/destination/${city.id}`)}>
            <View className="flex-row justify-between items-center mb-3">
              <View>
                <Text className=" text-[18px] font-semibold" style={{ color: colors.text.primary }}>{city.name}</Text>
                <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{city.country}</Text>
              </View>
              <View className="bg-[#6443F4] w-14 h-14 rounded-full items-center justify-center">
                <Text className=" text-[18px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{city.score}</Text>
              </View>
            </View>
            <View className="flex-row">
              {[{ label: 'Internet', value: city.internet }, { label: 'Cost', value: city.cost }, { label: 'Spaces', value: city.coworking.toString() }].map((s) => (
                <View key={s.label} className="flex-1">
                  <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{s.label}</Text>
                  <Text className=" text-[13px] font-semibold" style={{ color: colors.text.primary }}>{s.value}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {tab === 'coworking' && (
        <View className="items-center py-12">
          <Ionicons name="laptop" size={24} color="#FFFFFF" />
          <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Coworking Spaces</Text>
          <Text className="text-[rgba(255,255,255,0.6)] text-[13px] mt-2">150+ spaces in your destination</Text>
        </View>
      )}

      {tab === 'communities' && (
        <View className="items-center py-12">
          <Ionicons name="people" size={24} color="#FFFFFF" />
          <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Nomad Communities</Text>
          <Text className="text-[rgba(255,255,255,0.6)] text-[13px] mt-2">Connect with fellow nomads</Text>
        </View>
      )}
    </ScrollView>
  );
}
