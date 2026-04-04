import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const TIMELINE = [
  { time: '8:00 AM', emoji: '☀️', title: 'Wake up', desc: 'Hotel Shinjuku', status: 'done' },
  { time: '9:00 AM', emoji: '🍳', title: 'Breakfast', desc: 'Hotel restaurant', status: 'done' },
  { time: '10:00 AM', emoji: '⛩️', title: 'Meiji Shrine', desc: 'Guided tour • 1.5 hrs', status: 'done' },
  { time: '12:00 PM', emoji: '🍜', title: 'Lunch at Ichiran', desc: 'Ramen • Harajuku', status: 'current' },
  { time: '2:00 PM', emoji: '🛍️', title: 'Shopping', desc: 'Takeshita Street', status: 'upcoming' },
  { time: '4:00 PM', emoji: '🏙️', title: 'Shibuya Crossing', desc: 'Photo opportunity', status: 'upcoming' },
  { time: '6:00 PM', emoji: '🍣', title: 'Dinner', desc: 'Sushi Nakazawa • Reserved', status: 'upcoming' },
  { time: '8:30 PM', emoji: '🌃', title: 'Tokyo Tower', desc: 'Night view', status: 'upcoming' },
];

export default function TimelineScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Today's Timeline</Text>
        <View className="flex-1" />
        <Text className="text-white/40 text-sm">Day 3 of 7</Text>
      </View>
      <View className="mx-4">
        {TIMELINE.map((item, i) => (
          <View key={item.time} className="flex-row mb-0">
            <View className="items-center mr-4 w-12">
              <Text className={`text-xs ${item.status === 'current' ? 'text-primary font-bold' : 'text-white/40'}`}>{item.time}</Text>
              <View className={`w-3 h-3 rounded-full mt-2 ${item.status === 'done' ? 'bg-green-400' : item.status === 'current' ? 'bg-primary' : 'bg-white/20'}`} />
              {i < TIMELINE.length - 1 && <View className={`w-0.5 h-16 ${item.status === 'done' ? 'bg-green-400/30' : 'bg-white/[0.08]'}`} />}
            </View>
            <View className={`flex-1 p-4 mb-3 rounded-2xl border ${item.status === 'current' ? 'bg-primary/10 border-primary/30' : item.status === 'done' ? 'bg-bg-secondary border-white/[0.08] opacity-60' : 'bg-bg-secondary border-white/[0.08]'}`}>
              <View className="flex-row items-center">
                <Text className="text-xl mr-2">{item.emoji}</Text>
                <View className="flex-1">
                  <Text className={`font-bold ${item.status === 'done' ? 'text-white/60 line-through' : 'text-white'}`}>{item.title}</Text>
                  <Text className="text-white/40 text-xs">{item.desc}</Text>
                </View>
                {item.status === 'done' && <Text className="text-green-400">✓</Text>}
                {item.status === 'current' && <Text className="text-primary text-xs font-bold">NOW</Text>}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
