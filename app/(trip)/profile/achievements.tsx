import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ACHIEVEMENTS = [
  { id: '1', emoji: '🌍', title: 'Globe Trotter', desc: 'Visit 10 countries', progress: 8, total: 10, unlocked: false },
  { id: '2', emoji: '🍜', title: 'Foodie Master', desc: 'Try 50 local restaurants', progress: 50, total: 50, unlocked: true },
  { id: '3', emoji: '🏔️', title: 'Summit Seeker', desc: 'Complete 5 hiking trips', progress: 3, total: 5, unlocked: false },
  { id: '4', emoji: '📸', title: 'Photographer', desc: 'Upload 100 travel photos', progress: 100, total: 100, unlocked: true },
  { id: '5', emoji: '✈️', title: 'Frequent Flyer', desc: 'Take 20 flights', progress: 14, total: 20, unlocked: false },
  { id: '6', emoji: '⭐', title: 'Top Reviewer', desc: 'Write 25 reviews', progress: 25, total: 25, unlocked: true },
  { id: '7', emoji: '🤝', title: 'Social Butterfly', desc: 'Connect with 50 travelers', progress: 32, total: 50, unlocked: false },
  { id: '8', emoji: '💎', title: 'VIP Traveler', desc: 'Reach Platinum tier', progress: 0, total: 1, unlocked: false },
];

export default function AchievementsScreen() {
  const router = useRouter();
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Achievements</Text>
      </View>
      <View className="items-center py-6">
        <Text className="text-primary text-4xl font-bold">{unlocked}/{ACHIEVEMENTS.length}</Text>
        <Text className="text-white/60 text-sm">Achievements Unlocked</Text>
      </View>
      {ACHIEVEMENTS.map(item => (
        <View key={item.id} className={`flex-row items-center mx-4 mb-3 p-4 rounded-2xl border ${item.unlocked ? 'bg-primary/10 border-primary/30' : 'bg-bg-secondary border-white/[0.08]'}`}>
          <Text className={`text-3xl mr-3 ${item.unlocked ? '' : 'opacity-40'}`}>{item.emoji}</Text>
          <View className="flex-1">
            <Text className={`font-bold ${item.unlocked ? 'text-white' : 'text-white/60'}`}>{item.title}</Text>
            <Text className="text-white/40 text-xs mb-2">{item.desc}</Text>
            <View className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <View className={`h-full rounded-full ${item.unlocked ? 'bg-primary' : 'bg-white/20'}`} style={{ width: `${(item.progress / item.total) * 100}%` }} />
            </View>
            <Text className="text-white/30 text-xs mt-1">{item.progress}/{item.total}</Text>
          </View>
          {item.unlocked && <Text className="text-primary text-xl ml-2">✓</Text>}
        </View>
      ))}
    </ScrollView>
  );
}
