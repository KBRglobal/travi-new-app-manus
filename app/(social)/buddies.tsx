import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const BUDDIES = [
 { id: '1', name: 'Sarah K.', avatar: 'person', status: 'online', lastTrip: 'Barcelona', sharedTrips: 3 },
 { id: '2', name: 'Mike R.', avatar: 'person', status: 'offline', lastTrip: 'Tokyo', sharedTrips: 1 },
 { id: '3', name: 'Emma L.', avatar: 'person‍', status: 'online', lastTrip: 'Bali', sharedTrips: 2 },
 { id: '4', name: 'David W.', avatar: 'person', status: 'traveling', lastTrip: 'Iceland', sharedTrips: 0 },
 { id: '5', name: 'Lisa M.', avatar: 'person‍person', status: 'online', lastTrip: 'Paris', sharedTrips: 5 },
];

const REQUESTS = [
 { id: 'r1', name: 'Tom H.', avatar: 'person', match: 85, mutual: 2 },
 { id: 'r2', name: 'Anna P.', avatar: 'person', match: 78, mutual: 1 },
];

export default function BuddiesScreen() {
 const router = useRouter();
 const [search, setSearch] = useState('');
 const [tab, setTab] = useState<'friends' | 'requests'>('friends');

 const statusColor = (s: string) => s === 'online' ? 'bg-green-400' : s === 'traveling' ? 'bg-[#6443F4]' : 'bg-white/20';

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="px-4 py-3">
 <View className="flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Travel Buddies</Text>
 <TouchableOpacity onPress={() => router.push('/(social)/discover')}><Text className="text-[#6443F4] text-sm">Find</Text></TouchableOpacity>
 </View>
 <TextInput className="bg-white/[0.05] rounded-xl px-4 py-3 text-white mb-3 border border-white/[0.08]" placeholder="Search buddies..." placeholderTextColor="rgba(255,255,255,0.3)" value={search} onChangeText={setSearch} />
 <View className="flex-row mb-2">
 <TouchableOpacity onPress={() => setTab('friends')} className={`flex-1 py-2 rounded-xl mr-1 ${tab === 'friends' ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center font-[Satoshi-Bold] ${tab === 'friends' ? 'text-white' : 'text-white/60'}`}>Friends ({BUDDIES.length})</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setTab('requests')} className={`flex-1 py-2 rounded-xl ml-1 ${tab === 'requests' ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center font-[Satoshi-Bold] ${tab === 'requests' ? 'text-white' : 'text-white/60'}`}>Requests ({REQUESTS.length})</Text>
 </TouchableOpacity>
 </View>
 </View>
 {tab === 'friends' ? (
 <FlatList
 ListEmptyComponent={() => <EmptyState stateKey="buddies" />} data={BUDDIES.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))} keyExtractor={i => i.id} renderItem={({ item }) => (
 <TouchableOpacity onPress={() => router.push(`/(social)/profile/${item.id}`)} className="flex-row items-center mx-4 mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <View className="relative mr-3">
 <Text className="text-3xl">{item.avatar}</Text>
 <View className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusColor(item.status)} border-2 border-bg-secondary`} />
 </View>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.name}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.status === 'traveling' ? 'Currently traveling' : `Last trip: ${item.lastTrip}`}</Text>
 </View>
 <TouchableOpacity onPress={() => router.push(`/(social)/messages/${item.id}`)} className="bg-white/[0.05] px-3 py-2 rounded-xl">
 <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
 </TouchableOpacity>
 </TouchableOpacity>
 )} />
 ) : (
 <FlatList data={REQUESTS} keyExtractor={i => i.id} renderItem={({ item }) => (
 <View className="flex-row items-center mx-4 mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-3xl mr-3">{item.avatar}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.name}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.match}% match · {item.mutual} mutual</Text>
 </View>
 <TouchableOpacity onPress={() => {}} className="bg-[#6443F4] px-3 py-2 rounded-xl mr-2"><Text className=" text-sm font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Accept</Text></TouchableOpacity>
 <TouchableOpacity onPress={() => {}} className="bg-white/[0.05] px-3 py-2 rounded-xl"><Ionicons name="close" size={24} color="#FFFFFF" /></TouchableOpacity>
 </View>
 )} />
 )}
 </View>
 );
}
