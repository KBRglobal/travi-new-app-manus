import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const LEADERBOARD = [
 { rank: 1, name: 'Lisa M.', avatar: 'person‍person', points: 45200, tier: 'Platinum' },
 { rank: 2, name: 'David W.', avatar: 'person', points: 38900, tier: 'Platinum' },
 { rank: 3, name: 'Sarah K.', avatar: 'person', points: 32100, tier: 'Gold' },
 { rank: 4, name: 'Mike R.', avatar: 'person', points: 28500, tier: 'Gold' },
 { rank: 5, name: 'Emma L.', avatar: 'person‍', points: 22300, tier: 'Gold' },
 { rank: 6, name: 'You', avatar: 'person', points: 15400, tier: 'Silver', isMe: true },
 { rank: 7, name: 'Tom H.', avatar: 'person', points: 12800, tier: 'Silver' },
 { rank: 8, name: 'Anna P.', avatar: 'person', points: 9600, tier: 'Bronze' },
 { rank: 9, name: 'James K.', avatar: '', points: 7200, tier: 'Bronze' },
 { rank: 10, name: 'Maria S.', avatar: 'person‍', points: 5100, tier: 'Bronze' },
];

export default function LeaderboardScreen() {
 const router = useRouter();
 const [period, setPeriod] = useState<'week' | 'month' | 'all'>('month');

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Leaderboard" />
 </View>
 <View className="flex-row mx-4 mb-4">
 {(['week', 'month', 'all'] as const).map(p => (
 <TouchableOpacity key={p} onPress={() => setPeriod(p)} className={`flex-1 py-2 mx-1 rounded-xl ${period === p ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center text-sm font-[Satoshi-Bold] capitalize ${period === p ? 'text-white' : 'text-white/60'}`}>{p === 'all' ? 'All Time' : `This ${p}`}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <View className="flex-row justify-center items-end mx-4 mb-6 h-40">
 {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((item, i) => (
 <View key={item.rank} className={`items-center mx-2 ${i === 1 ? 'mb-0' : 'mb-4'}`}>
 <Text className="text-3xl mb-1">{item.avatar}</Text>
 <Text className=" text-xs font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.name}</Text>
 <Text className="text-[#6443F4] text-xs">{(item.points / 1000).toFixed(1)}k</Text>
 <View className={`mt-2 rounded-t-xl items-center justify-end ${i === 1 ? 'bg-[#6443F4] w-20 h-24' : i === 0 ? 'bg-[#6443F4]/60 w-16 h-16' : 'bg-[#6443F4]/40 w-16 h-12'}`}>
 <Text className=" font-[Satoshi-Bold] text-lg mb-1" style={{ color: colors.text.primary }}>{item.rank}</Text>
 </View>
 </View>
 ))}
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState stateKey="leaderboard" />} data={LEADERBOARD.slice(3)} keyExtractor={i => i.rank.toString()} renderItem={({ item }) => (
 <View className={`flex-row items-center mx-4 mb-2 p-4 rounded-2xl border ${(item as any).isMe ? 'bg-[#6443F4]/10 border-[#6443F4]/30' : 'bg-[#120824] border-white/[0.08]'}`}>
 <Text className="/40 font-[Satoshi-Bold] w-8" style={{ color: colors.text.primary }}>{item.rank}</Text>
 <Text className="text-2xl mr-3">{item.avatar}</Text>
 <View className="flex-1">
 <Text className={`font-[Satoshi-Bold] ${(item as any).isMe ? 'text-[#6443F4]' : 'text-white'}`}>{item.name}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.tier}</Text>
 </View>
 <Text className="text-[#6443F4] font-[Satoshi-Bold]">{item.points.toLocaleString()}</Text>
 </View>
 )} />
 </View>
 );
}
