import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const BADGES = [
  { id: '1', emoji: '🌍', name: 'World Explorer', desc: 'Visit 10 countries', tier: 'gold', unlocked: true },
  { id: '2', emoji: '🍜', name: 'Foodie', desc: 'Rate 20 restaurants', tier: 'gold', unlocked: true },
  { id: '3', emoji: '📸', name: 'Photographer', desc: 'Upload 100 photos', tier: 'silver', unlocked: true },
  { id: '4', emoji: '✈️', name: 'Jet Setter', desc: 'Take 15 flights', tier: 'silver', unlocked: false },
  { id: '5', emoji: '🏨', name: 'Hotel Critic', desc: 'Review 10 hotels', tier: 'bronze', unlocked: true },
  { id: '6', emoji: '🧗', name: 'Adventurer', desc: 'Complete 10 activities', tier: 'bronze', unlocked: false },
  { id: '7', emoji: '💎', name: 'VIP', desc: 'Reach Platinum tier', tier: 'platinum', unlocked: false },
  { id: '8', emoji: '🤝', name: 'Connector', desc: 'Make 25 travel buddies', tier: 'silver', unlocked: false },
];

const tierColors: Record<string, string> = { platinum: 'bg-purple-500/20', gold: 'bg-yellow-500/20', silver: 'bg-gray-400/20', bronze: 'bg-orange-600/20' };
const tierText: Record<string, string> = { platinum: 'text-purple-400', gold: 'text-yellow-400', silver: 'text-gray-300', bronze: 'text-orange-400' };

export default function BadgesScreen() {
  const router = useRouter();
  const unlocked = BADGES.filter(b => b.unlocked).length;

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Badges</Text>
        <View className="flex-1" />
        <Text className="text-primary font-bold">{unlocked}/{BADGES.length}</Text>
      </View>
      <FlatList data={BADGES} numColumns={2} keyExtractor={i => i.id} contentContainerStyle={{ padding: 8 }} renderItem={({ item }) => (
        <View className={`flex-1 m-2 p-4 rounded-2xl border items-center ${item.unlocked ? 'bg-bg-secondary border-white/[0.08]' : 'bg-bg-secondary/50 border-white/[0.04]'}`}>
          <Text className={`text-4xl mb-2 ${item.unlocked ? '' : 'opacity-30'}`}>{item.emoji}</Text>
          <Text className={`font-bold text-center text-sm ${item.unlocked ? 'text-white' : 'text-white/30'}`}>{item.name}</Text>
          <Text className="text-white/40 text-xs text-center mt-1">{item.desc}</Text>
          <View className={`mt-2 px-2 py-0.5 rounded-full ${tierColors[item.tier]}`}>
            <Text className={`text-xs capitalize ${tierText[item.tier]}`}>{item.tier}</Text>
          </View>
        </View>
      )} />
    </View>
  );
}
