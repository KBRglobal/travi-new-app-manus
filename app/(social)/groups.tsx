import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const GROUPS = [
  { id: '1', name: 'Digital Nomads EU', emoji: '💻', members: 234, posts: 45, joined: true },
  { id: '2', name: 'Foodies Worldwide', emoji: '🍜', members: 567, posts: 89, joined: true },
  { id: '3', name: 'Adventure Seekers', emoji: '🧗', members: 189, posts: 34, joined: false },
  { id: '4', name: 'Budget Travelers', emoji: '💰', members: 890, posts: 156, joined: false },
  { id: '5', name: 'Solo Female Travel', emoji: '👩‍✈️', members: 456, posts: 78, joined: false },
  { id: '6', name: 'Photography Travel', emoji: '📸', members: 345, posts: 67, joined: true },
];

export default function GroupsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState(GROUPS);
  const [tab, setTab] = useState<'my' | 'discover'>('my');

  const toggleJoin = (id: string) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, joined: !g.joined, members: g.joined ? g.members - 1 : g.members + 1 } : g));
  };

  const displayed = tab === 'my' ? groups.filter(g => g.joined) : groups.filter(g => !g.joined);

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold">Groups</Text>
        <TouchableOpacity><Text className="text-primary text-sm">Create</Text></TouchableOpacity>
      </View>
      <View className="flex-row mx-4 mb-3">
        <TouchableOpacity onPress={() => setTab('my')} className={`flex-1 py-2 rounded-xl mr-1 ${tab === 'my' ? 'bg-primary' : 'bg-white/[0.05]'}`}>
          <Text className={`text-center font-bold ${tab === 'my' ? 'text-white' : 'text-white/60'}`}>My Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('discover')} className={`flex-1 py-2 rounded-xl ml-1 ${tab === 'discover' ? 'bg-primary' : 'bg-white/[0.05]'}`}>
          <Text className={`text-center font-bold ${tab === 'discover' ? 'text-white' : 'text-white/60'}`}>Discover</Text>
        </TouchableOpacity>
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="groups" />} data={displayed} keyExtractor={i => i.id} renderItem={({ item }) => (
        <TouchableOpacity className="flex-row items-center mx-4 mb-3 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-3xl mr-3">{item.emoji}</Text>
          <View className="flex-1">
            <Text className="text-white font-bold">{item.name}</Text>
            <Text className="text-white/40 text-xs">{item.members} members · {item.posts} posts</Text>
          </View>
          <TouchableOpacity onPress={() => toggleJoin(item.id)} className={`px-4 py-2 rounded-xl ${item.joined ? 'bg-white/[0.05]' : 'bg-primary'}`}>
            <Text className={`text-sm font-bold ${item.joined ? 'text-white/60' : 'text-white'}`}>{item.joined ? 'Leave' : 'Join'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )} />
    </View>
  );
}
