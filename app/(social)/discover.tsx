import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const TRAVELERS = [
 { id: '1', name: 'Sarah K.', avatar: 'person', dna: 'Foodie · Culture', match: 92, trips: 8, mutual: 3 },
 { id: '2', name: 'Mike R.', avatar: 'person', dna: 'Adventure · Nature', match: 87, trips: 12, mutual: 1 },
 { id: '3', name: 'Emma L.', avatar: 'person‍', dna: 'Luxury · Wellness', match: 78, trips: 5, mutual: 0 },
 { id: '4', name: 'David W.', avatar: 'person', dna: 'Budget · Adventure', match: 85, trips: 15, mutual: 2 },
 { id: '5', name: 'Lisa M.', avatar: 'person‍person', dna: 'Culture · Food', match: 94, trips: 10, mutual: 4 },
 { id: '6', name: 'Tom H.', avatar: 'person', dna: 'Social · Nightlife', match: 72, trips: 6, mutual: 0 },
];

export default function DiscoverScreen() {
 const router = useRouter();
 const [search, setSearch] = useState('');
 const [filter, setFilter] = useState<'all' | 'nearby' | 'similar'>('all');

 const filtered = TRAVELERS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="px-4 py-3">
 <View className="flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Discover Travelers</Text>
 <TouchableOpacity onPress={() => router.push('/(social)/discover/swipe')}><Text className="text-2xl">🃏</Text></TouchableOpacity>
 </View>
 <TextInput
 className="bg-white/[0.05] rounded-xl px-4 py-3 text-white mb-3 border border-white/[0.08]"
 placeholder="Search travelers..."
 placeholderTextColor="rgba(255,255,255,0.3)"
 value={search}
 onChangeText={setSearch}
 />
 <View className="flex-row mb-2">
 {(['all', 'nearby', 'similar'] as const).map(f => (
 <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`mr-2 px-4 py-2 rounded-full ${filter === f ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-sm ${filter === f ? 'text-white font-[Satoshi-Bold]' : 'text-white/60'}`}>{f === 'all' ? 'All' : f === 'nearby' ? 'Nearby' : 'Similar DNA'}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="globe" title="No travelers nearby" description="Check back later to find travel buddies." />}
 data={filtered}
 keyExtractor={item => item.id}
 renderItem={({ item }) => (
 <TouchableOpacity onPress={() => router.push(`/(social)/profile/${item.id}`)} className="flex-row items-center mx-4 mb-3 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-3xl mr-3">{item.avatar}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold] text-base" style={{ color: colors.text.primary }}>{item.name}</Text>
 <Text className="/60 text-xs" style={{ color: colors.text.primary }}>{item.dna}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.trips} trips · {item.mutual} mutual friends</Text>
 </View>
 <View className="items-center">
 <Text className="text-[#6443F4] font-[Satoshi-Bold] text-lg">{item.match}%</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>match</Text>
 </View>
 </TouchableOpacity>
 )}
 />
 </View>
 );
}
