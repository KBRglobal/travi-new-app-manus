import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
    'visa-free': 'bg-status-success/20',
    'visa-on-arrival': 'bg-status-warning/20',
    'visa-required': 'bg-status-error/20',
    'e-visa': 'bg-primary/20',
  };
  const statusTextColors: Record<string, string> = {
    'visa-free': 'text-status-success',
    'visa-on-arrival': 'text-status-warning',
    'visa-required': 'text-status-error',
    'e-visa': 'text-primary',
  };

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Visa & Passport</Text>
        <View className="w-12" />
      </View>

      {/* Passport warning */}
      <Animated.View entering={FadeInDown} className="bg-status-warning/20 border border-status-warning rounded-card p-4 mb-6">
        <Text className="text-status-warning text-body font-semibold mb-1">Passport Expiry Warning</Text>
        <Text className="text-white text-body-sm">Your passport expires in 8 months. Some countries require 6+ months validity.</Text>
      </Animated.View>

      {/* Visa requirements */}
      <Text className="text-white text-heading-3 mb-3">Visa Requirements</Text>
      {visaInfo.map((v, i) => (
        <Animated.View key={v.country} entering={FadeInDown.delay(i * 80)}>
          <View className="flex-row bg-bg-card border border-border rounded-card p-4 mb-2 items-center">
            <Text className="text-2xl mr-3">{v.emoji}</Text>
            <View className="flex-1">
              <Text className="text-white text-body font-semibold">{v.country}</Text>
              {v.maxDays > 0 && <Text className="text-text-muted text-caption">Max stay: {v.maxDays} days</Text>}
            </View>
            <View className={`${statusColors[v.status]} px-3 py-1 rounded-full`}>
              <Text className={`${statusTextColors[v.status]} text-caption font-semibold capitalize`}>{v.status.replace('-', ' ')}</Text>
            </View>
          </View>
        </Animated.View>
      ))}

      {/* Checklist */}
      <Text className="text-white text-heading-3 mb-3 mt-6">Travel Checklist</Text>
      {checklistState.map((item, i) => (
        <Animated.View key={item.id} entering={FadeInDown.delay(400 + i * 80)}>
          <TouchableOpacity className="flex-row bg-bg-card border border-border rounded-card p-4 mb-2 items-center" onPress={() => toggleItem(item.id)}>
            <View className={`w-6 h-6 rounded-md mr-3 items-center justify-center ${item.done ? 'bg-status-success' : 'border border-border'}`}>
              {item.done && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
            </View>
            <Text className={`text-body flex-1 ${item.done ? 'text-text-muted line-through' : 'text-white'}`}>{item.task}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* eVisa apply */}
      <TouchableOpacity className="bg-primary py-4 rounded-button items-center mt-6">
        <Text className="text-white text-body font-bold">Apply for eVisa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
