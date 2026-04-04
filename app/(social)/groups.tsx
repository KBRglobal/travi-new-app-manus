import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const GROUPS = [
 { id: '1', name: 'Digital Nomads EU', iconName: 'laptop', members: 234, posts: 45, joined: true },
 { id: '2', name: 'Foodies Worldwide', iconName: 'restaurant', members: 567, posts: 89, joined: true },
 { id: '3', name: 'Adventure Seekers', iconName: 'fitness', members: 189, posts: 34, joined: false },
 { id: '4', name: 'Budget Travelers', iconName: 'cash', members: 890, posts: 156, joined: false },
 { id: '5', name: 'Solo Female Travel', emoji: 'person‍airplane', members: 456, posts: 78, joined: false },
 { id: '6', name: 'Photography Travel', iconName: 'camera', members: 345, posts: 67, joined: true },
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
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center justify-between px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Groups</Text>
 <TouchableOpacity><Text className="text-[#6443F4] text-sm">Create</Text></TouchableOpacity>
 </View>
 <View className="flex-row mx-4 mb-3">
 <TouchableOpacity onPress={() => setTab('my')} className={`flex-1 py-2 rounded-xl mr-1 ${tab === 'my' ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center font-[Satoshi-Bold] ${tab === 'my' ? 'text-white' : 'text-white/60'}`}>My Groups</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setTab('discover')} className={`flex-1 py-2 rounded-xl ml-1 ${tab === 'discover' ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center font-[Satoshi-Bold] ${tab === 'discover' ? 'text-white' : 'text-white/60'}`}>Discover</Text>
 </TouchableOpacity>
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState stateKey="groups" />} data={displayed} keyExtractor={i => i.id} renderItem={({ item }) => (
 <TouchableOpacity onPress={() => {}} className="flex-row items-center mx-4 mb-3 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-3xl mr-3">{item.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.name}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.members} members · {item.posts} posts</Text>
 </View>
 <TouchableOpacity onPress={() => toggleJoin(item.id)} className={`px-4 py-2 rounded-xl ${item.joined ? 'bg-white/[0.05]' : 'bg-[#6443F4]'}`}>
 <Text className={`text-sm font-[Satoshi-Bold] ${item.joined ? 'text-white/60' : 'text-white'}`}>{item.joined ? 'Leave' : 'Join'}</Text>
 </TouchableOpacity>
 </TouchableOpacity>
 )} />
 </View>
 );
}
