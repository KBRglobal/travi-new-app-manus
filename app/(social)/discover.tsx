import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const TRAVELERS = [
  { id: '1', name: 'Sarah K.', avatar: '👩', dna: 'Foodie · Culture', match: 92, trips: 8, mutual: 3 },
  { id: '2', name: 'Mike R.', avatar: '👨', dna: 'Adventure · Nature', match: 87, trips: 12, mutual: 1 },
  { id: '3', name: 'Emma L.', avatar: '👱‍♀️', dna: 'Luxury · Wellness', match: 78, trips: 5, mutual: 0 },
  { id: '4', name: 'David W.', avatar: '🧔', dna: 'Budget · Adventure', match: 85, trips: 15, mutual: 2 },
  { id: '5', name: 'Lisa M.', avatar: '👩‍🦰', dna: 'Culture · Food', match: 94, trips: 10, mutual: 4 },
  { id: '6', name: 'Tom H.', avatar: '👦', dna: 'Social · Nightlife', match: 72, trips: 6, mutual: 0 },
];

export default function DiscoverScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'nearby' | 'similar'>('all');

  const filtered = TRAVELERS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="px-4 py-3">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
          <Text className="text-white text-xl font-bold">Discover Travelers</Text>
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
            <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`mr-2 px-4 py-2 rounded-full ${filter === f ? 'bg-primary' : 'bg-white/[0.05]'}`}>
              <Text className={`text-sm ${filter === f ? 'text-white font-bold' : 'text-white/60'}`}>{f === 'all' ? 'All' : f === 'nearby' ? 'Nearby' : 'Similar DNA'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState emoji="🌍" title="No travelers nearby" description="Check back later to find travel buddies." />}
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/(social)/profile/${item.id}`)} className="flex-row items-center mx-4 mb-3 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
            <Text className="text-3xl mr-3">{item.avatar}</Text>
            <View className="flex-1">
              <Text className="text-white font-bold text-base">{item.name}</Text>
              <Text className="text-white/60 text-xs">{item.dna}</Text>
              <Text className="text-white/40 text-xs">{item.trips} trips · {item.mutual} mutual friends</Text>
            </View>
            <View className="items-center">
              <Text className="text-primary font-bold text-lg">{item.match}%</Text>
              <Text className="text-white/40 text-xs">match</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
