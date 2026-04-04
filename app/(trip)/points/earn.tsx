import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const EARN_WAYS = [
  { emoji: '✈️', title: 'Book a Flight', points: '100-500', desc: 'Earn based on trip value', action: 'Book Now' },
  { emoji: '🏨', title: 'Book a Hotel', points: '50-300', desc: 'Earn based on nights stayed', action: 'Browse Hotels' },
  { emoji: '⭐', title: 'Write a Review', points: '25-50', desc: 'Detailed reviews earn more', action: 'Write Review' },
  { emoji: '📸', title: 'Upload Photos', points: '5-10', desc: 'Per photo uploaded', action: 'Upload' },
  { emoji: '🤝', title: 'Refer a Friend', points: '500', desc: 'When they complete first trip', action: 'Invite' },
  { emoji: '🧬', title: 'Complete DNA Quiz', points: '100', desc: 'One-time bonus', action: 'Take Quiz' },
  { emoji: '📅', title: 'Daily Check-in', points: '10', desc: 'Open the app daily', action: 'Claimed ✓' },
  { emoji: '🎯', title: 'Complete Challenges', points: '200-500', desc: 'Varies by challenge', action: 'View' },
  { emoji: '💬', title: 'Social Engagement', points: '5-15', desc: 'Posts, comments, likes', action: 'Go Social' },
  { emoji: '🎂', title: 'Birthday Bonus', points: '200', desc: 'Annual birthday gift', action: 'Auto' },
];

export default function EarnPointsScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Earn Points</Text>
      </View>
      <View className="items-center py-6 mx-4 mb-4 bg-primary/10 rounded-2xl border border-primary/20">
        <Text className="text-primary text-3xl font-bold">15,400</Text>
        <Text className="text-white/60 text-sm">Your current balance</Text>
      </View>
      {EARN_WAYS.map(item => (
        <View key={item.title} className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-2xl mr-3">{item.emoji}</Text>
          <View className="flex-1">
            <Text className="text-white font-bold">{item.title}</Text>
            <Text className="text-white/40 text-xs">{item.desc}</Text>
          </View>
          <View className="items-end">
            <Text className="text-primary font-bold text-sm">+{item.points}</Text>
            <TouchableOpacity className="mt-1"><Text className="text-primary/60 text-xs">{item.action}</Text></TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
