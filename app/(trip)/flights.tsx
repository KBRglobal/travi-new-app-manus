import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { flights } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const TIMER_MINUTES = 15;

export default function FlightsScreen() {
 const router = useRouter();
 const [loading, setLoading] = useState(true);
 const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
 const [filter, setFilter] = useState<'all' | 'direct' | 'cheapest'>('all');
 const [timeLeft, setTimeLeft] = useState(TIMER_MINUTES * 60);

 useEffect(() => {
 const timer = setTimeout(() => setLoading(false), 2000);
 return () => clearTimeout(timer);
 }, []);

 useEffect(() => {
 const interval = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
 return () => clearInterval(interval);
 }, []);

 const filteredFlights = flights.filter((f) => {
 if (filter === 'direct') return f.stops === 0;
 return true;
 }).sort((a, b) => filter === 'cheapest' ? a.price - b.price : 0);

 const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

 if (loading) {
 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center">
 <ActivityIndicator size="large" color="#6443F4" />
 <Text className="text-[rgba(255,255,255,0.6)] text-[15px] mt-4">Searching best flights...</Text>
 {[1, 2, 3].map((i) => (
 <View key={i} className="mx-6 mt-4 w-full px-6">
 <View className="bg-[#120824] rounded-[16px] h-24 animate-pulse" />
 </View>
 ))}
 </View>
 );
 }

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="px-6 flex-row items-center justify-between mb-2">
 <TouchableOpacity onPress={() => router.back()}>
 <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Flights</Text>
 <View className="bg-[#FBBF24]/20 px-2 py-1 rounded-full">
 <Text className="text-[#FBBF24] text-[12px] font-semibold">{formatTime(timeLeft)}</Text>
 </View>
 </View>

 <View className="flex-row px-6 mb-4">
 {(['all', 'direct', 'cheapest'] as const).map((f) => (
 <TouchableOpacity key={f} className={`mr-2 px-4 py-2 rounded-full border ${filter === f ? 'bg-[#6443F4] border-[#6443F4]' : 'border-[rgba(255,255,255,0.08)]'}`} onPress={() => setFilter(f)}>
 <Text className={`text-[13px] ${filter === f ? 'text-white font-semibold' : 'text-[rgba(255,255,255,0.6)]'}`}>{f === 'all' ? 'All' : f === 'direct' ? 'Direct' : 'Cheapest'}</Text>
 </TouchableOpacity>
 ))}
 </View>

 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="airplane" title="No flights found" description="Try different dates or destinations." />}
 data={filteredFlights}
 keyExtractor={(item) => item.id}
 contentContainerClassName="px-6 pb-24"
 renderItem={({ item, index }) => (
 <Animated.View entering={FadeInDown.delay(index * 100)}>
 <TouchableOpacity
 className={`bg-[#120824] border rounded-[16px] p-4 mb-3 ${selectedFlight === item.id ? 'border-[#6443F4]' : 'border-[rgba(255,255,255,0.08)]'}`}
 onPress={() => setSelectedFlight(item.id)}
 >
 <View className="flex-row justify-between items-center mb-2">
 <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{item.airline}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{item.flightNo}</Text>
 </View>
 <View className="flex-row justify-between items-center mb-2">
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>{item.departure}</Text>
 <View className="flex-1 mx-4 items-center">
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{item.duration}</Text>
 <View className="w-full h-px bg-border mt-1" />
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px] mt-1">{item.stops === 0 ? 'Direct' : `${item.stops} stop`}</Text>
 </View>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>{item.arrival}</Text>
 </View>
 <View className="flex-row justify-between items-center">
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{item.class}</Text>
 <Text className="text-[#6443F4] text-[18px] font-[Satoshi-Bold]">€{item.price}</Text>
 </View>
 </TouchableOpacity>
 </Animated.View>
 )}
 />

 {selectedFlight && (
 <View className="absolute bottom-0 left-0 right-0 p-6 bg-bg-[#6443F4] border-t border-[rgba(255,255,255,0.08)]">
 <TouchableOpacity className="bg-[#6443F4] py-4 rounded-[12px] items-center" onPress={() => router.push('/(trip)/hotels')}>
 <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Select & Continue</Text>
 </TouchableOpacity>
 </View>
 )}
 </View>
 );
}
