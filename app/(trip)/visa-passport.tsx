import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const visaInfo = [
  { country: 'UAE', status: 'visa-free', maxDays: 90, emoji: '🇦🇪' },
  { country: 'Thailand', status: 'visa-on-arrival', maxDays: 30, emoji: '🇹🇭' },
  { country: 'Japan', status: 'visa-free', maxDays: 90, emoji: '🇯🇵' },
  { country: 'USA', status: 'visa-required', maxDays: 0, emoji: '🇺🇸' },
  { country: 'India', status: 'e-visa', maxDays: 60, emoji: '🇮🇳' },
];

const checklist = [
  { id: 'c1', task: 'Passport valid for 6+ months', done: true },
  { id: 'c2', task: 'Travel insurance purchased', done: true },
  { id: 'c3', task: 'Visa application submitted', done: false },
  { id: 'c4', task: 'Hotel booking confirmation', done: true },
  { id: 'c5', task: 'Return flight booked', done: false },
];

export default function VisaPassportScreen() {
  const router = useRouter();
  const [checklistState, setChecklistState] = useState(checklist);

  const toggleItem = (id: string) => {
    setChecklistState((prev) => prev.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  };

  const statusColors: Record<string, string> = {
    'visa-free': 'bg-[#4ADE80]/20',
    'visa-on-arrival': 'bg-[#FBBF24]/20',
    'visa-required': 'bg-[#F87171]/20',
    'e-visa': 'bg-[#6443F4]/20',
  };
  const statusTextColors: Record<string, string> = {
    'visa-free': 'text-[#4ADE80]',
    'visa-on-arrival': 'text-[#FBBF24]',
    'visa-required': 'text-[#F87171]',
    'e-visa': 'text-[#6443F4]',
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
        <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Visa & Passport</Text>
        <View className="w-12" />
      </View>

      {/* Passport warning */}
      <Animated.View entering={FadeInDown} className="bg-[#FBBF24]/20 border border-status-warning rounded-[16px] p-4 mb-6">
        <Text className="text-[#FBBF24] text-[15px] font-semibold mb-1">Passport Expiry Warning</Text>
        <Text className=" text-[13px]" style={{ color: colors.text.primary }}>Your passport expires in 8 months. Some countries require 6+ months validity.</Text>
      </Animated.View>

      {/* Visa requirements */}
      <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>Visa Requirements</Text>
      {visaInfo.map((v, i) => (
        <Animated.View key={v.country} entering={FadeInDown.delay(i * 80)}>
          <View className="flex-row bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-2 items-center">
            <Text className="text-2xl mr-3">{v.emoji}</Text>
            <View className="flex-1">
              <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{v.country}</Text>
              {v.maxDays > 0 && <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">Max stay: {v.maxDays} days</Text>}
            </View>
            <View className={`${statusColors[v.status]} px-3 py-1 rounded-full`}>
              <Text className={`${statusTextColors[v.status]} text-[12px] font-semibold capitalize`}>{v.status.replace('-', ' ')}</Text>
            </View>
          </View>
        </Animated.View>
      ))}

      {/* Checklist */}
      <Text className=" text-[18px] mb-3 mt-6" style={{ color: colors.text.primary }}>Travel Checklist</Text>
      {checklistState.map((item, i) => (
        <Animated.View key={item.id} entering={FadeInDown.delay(400 + i * 80)}>
          <TouchableOpacity className="flex-row bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-2 items-center" onPress={() => toggleItem(item.id)}>
            <View className={`w-6 h-6 rounded-md mr-3 items-center justify-center ${item.done ? 'bg-[#4ADE80]' : 'border border-[rgba(255,255,255,0.08)]'}`}>
              {item.done && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
            </View>
            <Text className={`text-[15px] flex-1 ${item.done ? 'text-[rgba(255,255,255,0.3)] line-through' : 'text-white'}`}>{item.task}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* eVisa apply */}
      <TouchableOpacity onPress={() => {}} className="bg-[#6443F4] py-4 rounded-[12px] items-center mt-6">
        <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Apply for eVisa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
