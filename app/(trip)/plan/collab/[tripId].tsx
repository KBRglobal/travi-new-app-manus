import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const MEMBERS = [
 { name: 'You', avatar: '', online: true },
 { name: 'Dana', avatar: 'person', online: true },
 { name: 'Tom', avatar: 'person', online: true },
 { name: 'Sarah', avatar: 'person‍person', online: false },
];

const ACTIVITIES = [
 { name: 'Dubai Museum', votes: { up: 3, down: 1 }, addedBy: 'Dana', locked: false },
 { name: 'Gold Souk', votes: { up: 4, down: 0 }, addedBy: 'You', locked: false },
 { name: 'Desert Safari', votes: { up: 2, down: 2 }, addedBy: 'Tom', locked: true, lockedBy: 'Dana' },
 { name: 'Burj Khalifa', votes: { up: 4, down: 0 }, addedBy: 'Sarah', locked: false },
];

export default function CollabPlanning() {
 const router = useRouter();
 const { tripId } = useLocalSearchParams();
 const [showChat, setShowChat] = useState(false);

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>Planning Together</Text>
 <TouchableOpacity onPress={() => setShowChat(!showChat)}>
 <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
 </TouchableOpacity>
 </View>

 <View className="px-4 mb-4">
 <View className="flex-row items-center">
 {MEMBERS.filter(m => m.online).map(m => (
 <View key={m.name} className="mr-2 items-center">
 <Text className="text-2xl">{m.avatar}</Text>
 <View className="w-2 h-2 rounded-full bg-green-500 absolute bottom-0 right-0" />
 </View>
 ))}
 <Text className="text-[rgba(255,255,255,0.6)] ml-2">{MEMBERS.filter(m => m.online).length} editing now</Text>
 </View>
 </View>

 <ScrollView className="flex-1 px-4">
 {ACTIVITIES.map((act, i) => (
 <View key={act.name} className="bg-[#120824] rounded-[16px] p-4 mb-3" style={{ opacity: act.locked ? 0.7 : 1 }}>
 <View className="flex-row items-center justify-between">
 <View className="flex-row items-center flex-1">
 <Text className="text-[rgba(255,255,255,0.3)] mr-2">≡</Text>
 <Text className=" font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>{act.name}</Text>
 </View>
 <View className="flex-row items-center">
 <TouchableOpacity onPress={() => {}} className="bg-green-900/30 px-2 py-1 rounded mr-2">
 <Text className="text-green-400">{act.votes.up}</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => {}} className="bg-red-900/30 px-2 py-1 rounded">
 <Text className="text-red-400">{act.votes.down}</Text>
 </TouchableOpacity>
 </View>
 </View>
 <Text className="text-[rgba(255,255,255,0.3)] text-xs mt-1">{act.addedBy} added</Text>
 {act.locked && <Text className="text-yellow-400 text-xs mt-1">{act.lockedBy} is editing this...</Text>}
 </View>
 ))}

 <TouchableOpacity onPress={() => {}} className="bg-[#120824] rounded-[12px] py-3 items-center mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed' }}>
 <Text className="text-[#6443F4] font-semibold">+ Add Activity</Text>
 </TouchableOpacity>

 <TouchableOpacity className="bg-[#120824] rounded-[12px] py-3 items-center mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
 <Text className="text-[#6443F4] font-semibold">Invite More people</Text>
 </TouchableOpacity>

 <TouchableOpacity onPress={() => router.push('/(trip)/plan/cart')} className="bg-[#6443F4] rounded-[12px] py-4 items-center mb-8">
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Finalize & Book</Text>
 </TouchableOpacity>
 </ScrollView>

 {showChat && (
 <View className="absolute bottom-0 left-0 right-0 bg-[#120824] rounded-t-modal p-4" style={{ height: 300 }}>
 <View className="flex-row justify-between mb-3">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Chat</Text>
 <TouchableOpacity onPress={() => setShowChat(false)}><Ionicons name="close" size={24} color="#FFFFFF" /></TouchableOpacity>
 </View>
 <Text className="text-[rgba(255,255,255,0.3)] text-center py-8">Chat messages will appear here</Text>
 </View>
 )}
 </View>
 );
}
