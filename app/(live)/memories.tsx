import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const MEMORIES = [
 { id: '1', iconName: 'camera', title: 'Sunrise at Mt. Fuji', time: 'Today, 5:30 AM', type: 'photo', likes: 12 },
 { id: '2', emoji: '', title: 'Street Food Tour', time: 'Today, 12:15 PM', type: 'video', likes: 8 },
 { id: '3', iconName: 'create', title: 'Temple Visit Notes', time: 'Yesterday, 3:00 PM', type: 'note', likes: 5 },
 { id: '4', iconName: 'camera', title: 'Cherry Blossoms', time: 'Yesterday, 10:00 AM', type: 'photo', likes: 24 },
 { id: '5', iconName: 'mic', title: 'Audio Journal', time: 'Apr 1, 8:00 PM', type: 'audio', likes: 3 },
 { id: '6', iconName: 'camera', title: 'Shibuya Crossing', time: 'Apr 1, 2:30 PM', type: 'photo', likes: 18 },
];

export default function MemoriesScreen() {
 const router = useRouter();
 const [view, setView] = useState<'grid' | 'timeline'>('timeline');

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Memories" />
 <View className="flex-1" />
 <TouchableOpacity onPress={() => setView(view === 'grid' ? 'timeline' : 'grid')}>
 <Text className="text-[#6443F4] text-sm">{view === 'grid' ? '' : '⊞'}</Text>
 </TouchableOpacity>
 </View>
 <TouchableOpacity onPress={() => {}} className="mx-4 mb-4 p-4 bg-[#6443F4]/10 rounded-2xl border border-dashed border-[#6443F4]/30 items-center">
 <Ionicons name="camera" size={24} color="#FFFFFF" />
 <Text className="text-[#6443F4] font-[Satoshi-Bold]">Add Memory</Text>
 </TouchableOpacity>
 <FlatList
 ListEmptyComponent={() => <EmptyState stateKey="memories" />} data={MEMORIES} keyExtractor={i => i.id} renderItem={({ item }) => (
 <View className="mx-4 mb-3 bg-[#120824] rounded-2xl border border-white/[0.08] overflow-hidden">
 <View className="h-32 bg-white/[0.03] items-center justify-center">
 <Text className="text-5xl">{item.emoji}</Text>
 </View>
 <View className="p-3">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.title}</Text>
 <View className="flex-row items-center justify-between mt-1">
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.time}</Text>
 <View className="flex-row items-center">
 <Text className="/40 text-xs mr-3" style={{ color: colors.text.primary }}>{item.likes}</Text>
 <TouchableOpacity><Text className="text-[#6443F4] text-xs">Share</Text></TouchableOpacity>
 </View>
 </View>
 </View>
 </View>
 )} />
 </View>
 );
}
