import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const LEADERBOARD = [
  { rank: 1, name: 'Lisa M.', avatar: '👩‍🦰', points: 45200, tier: 'Platinum' },
  { rank: 2, name: 'David W.', avatar: '🧔', points: 38900, tier: 'Platinum' },
  { rank: 3, name: 'Sarah K.', avatar: '👩', points: 32100, tier: 'Gold' },
  { rank: 4, name: 'Mike R.', avatar: '👨', points: 28500, tier: 'Gold' },
  { rank: 5, name: 'Emma L.', avatar: '👱‍♀️', points: 22300, tier: 'Gold' },
  { rank: 6, name: 'You', avatar: '🧑', points: 15400, tier: 'Silver', isMe: true },
  { rank: 7, name: 'Tom H.', avatar: '👦', points: 12800, tier: 'Silver' },
  { rank: 8, name: 'Anna P.', avatar: '👧', points: 9600, tier: 'Bronze' },
  { rank: 9, name: 'James K.', avatar: '👴', points: 7200, tier: 'Bronze' },
  { rank: 10, name: 'Maria S.', avatar: '👩‍🦱', points: 5100, tier: 'Bronze' },
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('month');

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Leaderboard</Text>
      </View>
      <View className="flex-row mx-4 mb-4">
        {(['week', 'month', 'all'] as const).map(p => (
          <TouchableOpacity key={p} onPress={() => setPeriod(p)} className={`flex-1 py-2 mx-1 rounded-xl ${period === p ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`text-center text-sm font-bold capitalize ${period === p ? 'text-white' : 'text-white/60'}`}>{p === 'all' ? 'All Time' : `This ${p}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row justify-center items-end mx-4 mb-6 h-40">
        {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((item, i) => (
          <View key={item.rank} className={`items-center mx-2 ${i === 1 ? 'mb-0' : 'mb-4'}`}>
            <Text className="text-3xl mb-1">{item.avatar}</Text>
            <Text className="text-white text-xs font-bold">{item.name}</Text>
            <Text className="text-primary text-xs">{(item.points / 1000).toFixed(1)}k</Text>
            <View className={`mt-2 rounded-t-xl items-center justify-end ${i === 1 ? 'bg-primary w-20 h-24' : i === 0 ? 'bg-primary/60 w-16 h-16' : 'bg-primary/40 w-16 h-12'}`}>
              <Text className="text-white font-bold text-lg mb-1">{item.rank}</Text>
            </View>
          </View>
        ))}
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="leaderboard" />} data={LEADERBOARD.slice(3)} keyExtractor={i => i.rank.toString()} renderItem={({ item }) => (
        <View className={`flex-row items-center mx-4 mb-2 p-4 rounded-2xl border ${(item as any).isMe ? 'bg-primary/10 border-primary/30' : 'bg-bg-secondary border-white/[0.08]'}`}>
          <Text className="text-white/40 font-bold w-8">{item.rank}</Text>
          <Text className="text-2xl mr-3">{item.avatar}</Text>
          <View className="flex-1">
            <Text className={`font-bold ${(item as any).isMe ? 'text-primary' : 'text-white'}`}>{item.name}</Text>
            <Text className="text-white/40 text-xs">{item.tier}</Text>
          </View>
          <Text className="text-primary font-bold">{item.points.toLocaleString()}</Text>
        </View>
      )} />
    </View>
  );
}
