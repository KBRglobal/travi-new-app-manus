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

const CHALLENGES = [
 { id: '1', emoji: '', title: 'Sunrise Seeker', desc: 'Watch 3 sunrises during your trip', reward: 500, progress: 1, total: 3, active: true, expires: '5 days' },
 { id: '2', iconName: 'restaurant', title: 'Local Foodie', desc: 'Try 5 local restaurants', reward: 300, progress: 3, total: 5, active: true, expires: '3 days' },
 { id: '3', iconName: 'camera', title: 'Photo Master', desc: 'Upload 10 trip photos', reward: 200, progress: 10, total: 10, active: false, expires: 'Completed' },
 { id: '4', emoji: '', title: 'City Walker', desc: 'Walk 20km in a city', reward: 400, progress: 0, total: 20, active: true, expires: '7 days' },
 { id: '5', iconName: 'star', title: 'Review Pro', desc: 'Write 3 detailed reviews', reward: 350, progress: 2, total: 3, active: true, expires: '10 days' },
 { id: '6', iconName: 'people', title: 'Social Traveler', desc: 'Connect with 5 travelers', reward: 250, progress: 5, total: 5, active: false, expires: 'Completed' },
];

export default function ChallengesScreen() {
 const router = useRouter();
 const [tab, setTab] = useState<'active' | 'completed'>('active');
 const displayed = tab === 'active' ? CHALLENGES.filter(c => c.active) : CHALLENGES.filter(c => !c.active);

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Challenges" />
 </View>
 <View className="flex-row mx-4 mb-3">
 <TouchableOpacity onPress={() => setTab('active')} className={`flex-1 py-2 rounded-xl mr-1 ${tab === 'active' ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center font-[Satoshi-Bold] ${tab === 'active' ? 'text-white' : 'text-white/60'}`}>Active</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setTab('completed')} className={`flex-1 py-2 rounded-xl ml-1 ${tab === 'completed' ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center font-[Satoshi-Bold] ${tab === 'completed' ? 'text-white' : 'text-white/60'}`}>Completed</Text>
 </TouchableOpacity>
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="No active challenges" description="Check back soon for new challenges!" />} data={displayed} keyExtractor={i => i.id} renderItem={({ item }) => (
 <View className={`mx-4 mb-3 p-4 rounded-2xl border ${item.active ? 'bg-[#120824] border-white/[0.08]' : 'bg-[#6443F4]/5 border-[#6443F4]/20'}`}>
 <View className="flex-row items-start mb-3">
 <Text className="text-3xl mr-3">{item.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.title}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.desc}</Text>
 </View>
 <View className="bg-[#6443F4]/20 px-2 py-1 rounded-lg"><Text className="text-[#6443F4] text-xs font-[Satoshi-Bold]">+{item.reward} pts</Text></View>
 </View>
 <View className="h-2 bg-white/[0.05] rounded-full overflow-hidden mb-2">
 <View className="h-full bg-[#6443F4] rounded-full" style={{ width: `${(item.progress / item.total) * 100}%` }} />
 </View>
 <View className="flex-row justify-between">
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.progress}/{item.total}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.expires}</Text>
 </View>
 </View>
 )} />
 </View>
 );
}
