import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const visitedCountries = ['Spain', 'France', 'Italy', 'Greece', 'Turkey', 'UAE', 'Thailand', 'Japan'];
const achievements = [
 { id: 'a1', iconName: 'globe', title: 'Globe Trotter', desc: '10 countries visited', unlocked: true },
 { id: 'a2', iconName: 'airplane', title: 'Frequent Flyer', desc: '50,000 km flown', unlocked: true },
 { id: 'a3', iconName: 'restaurant', title: 'Foodie Explorer', desc: '20 local restaurants', unlocked: false },
 { id: 'a4', iconName: 'camera', title: 'Photographer', desc: '100 trip photos', unlocked: true },
 { id: 'a5', iconName: 'snow', title: 'Adventurer', desc: '5 extreme activities', unlocked: false },
];

export default function AdventureLogScreen() {
 const router = useRouter();
 const [tab, setTab] = useState<'map' | 'achievements' | 'timeline'>('map');

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
 <View className="flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Adventure Log</Text>
 <View className="w-12" />
 </View>

 {/* Stats */}
 <View className="flex-row mb-6 gap-2">
 {[{ value: visitedCountries.length, label: 'Countries' }, { value: '52,340', label: 'km Traveled' }, { value: '14', label: 'Trips' }].map((s) => (
 <View key={s.label} className="flex-1 bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] py-3 items-center">
 <Text className=" text-[18px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{s.value}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{s.label}</Text>
 </View>
 ))}
 </View>

 {/* Tabs */}
 <View className="flex-row mb-4">
 {(['map', 'achievements', 'timeline'] as const).map((t) => (
 <TouchableOpacity key={t} className={`flex-1 py-3 items-center border-b-2 ${tab === t ? 'border-[#6443F4]' : 'border-transparent'}`} onPress={() => setTab(t)}>
 <Text className={`text-[13px] ${tab === t ? 'text-[#6443F4] font-semibold' : 'text-[rgba(255,255,255,0.6)]'}`}>{t === 'map' ? 'Map' : t === 'achievements' ? 'Badges' : 'calendar Timeline'}</Text>
 </TouchableOpacity>
 ))}
 </View>

 {tab === 'map' && (
 <View>
 <View className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] h-64 items-center justify-center mb-4">
 <Ionicons name="globe" size={24} color="#FFFFFF" />
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Scratch Map</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px] mt-1">{visitedCountries.length} / 195 countries</Text>
 <Text className="text-[#6443F4] text-[12px] mt-1">Tap countries to mark as visited</Text>
 </View>
 <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>Visited Countries</Text>
 <View className="flex-row flex-wrap gap-2">
 {visitedCountries.map((c) => (
 <View key={c} className="bg-[#6443F4]/20 px-3 py-1.5 rounded-full"><Text className="text-[#6443F4] text-[13px]">{c}</Text></View>
 ))}
 </View>
 </View>
 )}

 {tab === 'achievements' && (
 <View>
 {achievements.map((a, i) => (
 <Animated.View key={a.id} entering={FadeInDown.delay(i * 100)}>
 <View className={`flex-row bg-[#120824] border rounded-[16px] p-4 mb-3 items-center ${a.unlocked ? 'border-[#6443F4]' : 'border-[rgba(255,255,255,0.08)] opacity-50'}`}>
 <Text className="text-3xl mr-4">{a.emoji}</Text>
 <View className="flex-1">
 <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{a.title}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{a.desc}</Text>
 </View>
 {a.unlocked ? <Ionicons name="checkmark" size={24} color="#FFFFFF" /> : <Ionicons name="lock-closed" size={24} color="#FFFFFF" />}
 </View>
 </Animated.View>
 ))}
 </View>
 )}

 {tab === 'timeline' && (
 <View>
 {[{ date: 'Mar 2026', trip: 'Tokyo, Japan', days: 10 }, { date: 'Jan 2026', trip: 'Dubai, UAE', days: 7 }, { date: 'Nov 2025', trip: 'Barcelona, Spain', days: 5 }].map((t, i) => (
 <Animated.View key={i} entering={FadeInDown.delay(i * 100)}>
 <View className="flex-row mb-4">
 <View className="items-center mr-4">
 <View className="w-4 h-4 bg-[#6443F4] rounded-full" />
 {i < 2 && <View className="w-0.5 h-16 bg-border" />}
 </View>
 <TouchableOpacity onPress={() => {}} className="flex-1 bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4">
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{t.date}</Text>
 <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{t.trip}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{t.days} days</Text>
 </TouchableOpacity>
 </View>
 </Animated.View>
 ))}
 </View>
 )}
 </ScrollView>
 );
}
