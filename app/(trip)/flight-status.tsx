import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function FlightStatusScreen() {
  const router = useRouter();
  const timeline = [
    { time: '06:00', event: 'Check-in opens', status: 'done' },
    { time: '08:30', event: 'Boarding begins', status: 'done' },
    { time: '09:00', event: 'Departure TLV', status: 'current' },
    { time: '12:30', event: 'Arrival BCN', status: 'upcoming' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
        <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Flight Status</Text>
        <TouchableOpacity><Text className="text-[#6443F4] text-[13px]">Share</Text></TouchableOpacity>
      </View>

      {/* Flight info */}
      <Animated.View entering={FadeInDown} className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[rgba(255,255,255,0.3)] text-[13px]">EL AL · LY 371</Text>
          <View className="bg-[#4ADE80]/20 px-3 py-1 rounded-full"><Text className="text-[#4ADE80] text-[12px] font-[Satoshi-Bold]">On Time</Text></View>
        </View>
        <View className="flex-row justify-between items-center">
          <View><Text className=" text-3xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>TLV</Text><Text className="text-[rgba(255,255,255,0.6)] text-[13px]">Tel Aviv</Text><Text className=" text-[18px]" style={{ color: colors.text.primary }}>09:00</Text></View>
          <View className="flex-1 mx-4 items-center"><Text className="text-[rgba(255,255,255,0.3)] text-[13px]">3h 30m</Text><View className="w-full h-px bg-border mt-1"><View className="w-1/2 h-full bg-[#6443F4]" /></View><Text className="text-[#6443F4] text-[12px] mt-1">In flight</Text></View>
          <View className="items-end"><Text className=" text-3xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>BCN</Text><Text className="text-[rgba(255,255,255,0.6)] text-[13px]">Barcelona</Text><Text className=" text-[18px]" style={{ color: colors.text.primary }}>12:30</Text></View>
        </View>
      </Animated.View>

      {/* Map placeholder */}
      <Animated.View entering={FadeInDown.delay(100)} className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] h-48 items-center justify-center mb-6">
        <Ionicons name="map" size={24} color="#FFFFFF" />
        <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">Live flight tracking map</Text>
        <Text className="text-[#6443F4] text-[12px] mt-1">Currently over Mediterranean Sea</Text>
      </Animated.View>

      {/* Timeline */}
      <Text className=" text-[18px] mb-4" style={{ color: colors.text.primary }}>Timeline</Text>
      {timeline.map((item, i) => (
        <Animated.View key={i} entering={FadeInDown.delay(200 + i * 80)} className="flex-row mb-4">
          <View className="items-center mr-4">
            <View className={`w-4 h-4 rounded-full ${item.status === 'done' ? 'bg-[#4ADE80]' : item.status === 'current' ? 'bg-[#6443F4]' : 'bg-bg-surface'}`} />
            {i < timeline.length - 1 && <View className={`w-0.5 h-12 ${item.status === 'done' ? 'bg-[#4ADE80]' : 'bg-bg-surface'}`} />}
          </View>
          <View className="flex-1">
            <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{item.time}</Text>
            <Text className={`text-[15px] font-semibold ${item.status === 'current' ? 'text-[#6443F4]' : item.status === 'done' ? 'text-[rgba(255,255,255,0.6)]' : 'text-white'}`}>{item.event}</Text>
          </View>
        </Animated.View>
      ))}

      {/* Details */}
      <Animated.View entering={FadeInDown.delay(500)} className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4">
        <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>Flight Details</Text>
        {[['Aircraft', 'Boeing 737-900'], ['Gate', 'B12'], ['Seat', '14A (Window)'], ['Terminal', 'T3']].map(([label, value]) => (
          <View key={label} className="flex-row justify-between py-2 border-b border-[rgba(255,255,255,0.08)]">
            <Text className="text-[rgba(255,255,255,0.3)] text-[13px]">{label}</Text>
            <Text className=" text-[13px] font-semibold" style={{ color: colors.text.primary }}>{value}</Text>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}
