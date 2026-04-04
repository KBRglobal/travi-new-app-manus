import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { CachedImage } from '../../components/ui/CachedImage';

const stays = [
 { id: 'as1', name: 'Cozy Studio Old Town', type: 'Entire apartment', price: 85, rating: 4.9, reviews: 128, image: 'https://picsum.photos/400/300?random=70', host: 'Maria', superhost: true },
 { id: 'as2', name: 'Beachfront Villa', type: 'Entire villa', price: 220, rating: 4.8, reviews: 64, image: 'https://picsum.photos/400/300?random=71', host: 'Carlos', superhost: true },
 { id: 'as3', name: 'Modern Loft Downtown', type: 'Entire loft', price: 110, rating: 4.7, reviews: 89, image: 'https://picsum.photos/400/300?random=72', host: 'Ana', superhost: false },
 { id: 'as4', name: 'Private Room with View', type: 'Private room', price: 55, rating: 4.6, reviews: 42, image: 'https://picsum.photos/400/300?random=73', host: 'David', superhost: false },
];

export default function AltStaysScreen() {
 const router = useRouter();
 const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
 const [filter, setFilter] = useState<'all' | 'entire' | 'private'>('all');

 const filtered = stays.filter((s) => {
 if (filter === 'entire') return s.type.includes('Entire');
 if (filter === 'private') return s.type.includes('Private');
 return true;
 });

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="px-6 flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Alternative Stays</Text>
 <TouchableOpacity onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
 <Text className="text-[#6443F4] text-[13px]">{viewMode === 'list' ? 'Map' : 'List'}</Text>
 </TouchableOpacity>
 </View>

 <View className="flex-row px-6 mb-4">
 {(['all', 'entire', 'private'] as const).map((f) => (
 <TouchableOpacity key={f} className={`mr-2 px-4 py-2 rounded-full border ${filter === f ? 'bg-pink border-pink' : 'border-[rgba(255,255,255,0.08)]'}`} onPress={() => setFilter(f)}>
 <Text className={`text-[13px] ${filter === f ? 'text-white font-semibold' : 'text-[rgba(255,255,255,0.6)]'}`}>{f === 'all' ? 'All' : f === 'entire' ? 'Entire Place' : 'Private Room'}</Text>
 </TouchableOpacity>
 ))}
 </View>

 {viewMode === 'list' ? (
 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="No alternative stays found" description="Try expanding your search area." />}
 data={filtered}
 keyExtractor={(item) => item.id}
 contentContainerClassName="px-6 pb-24"
 renderItem={({ item, index }) => (
 <Animated.View entering={FadeInDown.delay(index * 100)}>
 <TouchableOpacity className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] mb-3 overflow-hidden" onPress={() => router.push(`/(trip)/hotel/${item.id}`)}>
 <CachedImage source={{ uri: item.image }} className="w-full h-48" resizeMode="cover" />
 {item.superhost && (
 <View className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full"><Text className="text-bg-[#6443F4] text-[12px] font-[Satoshi-Bold]">Superhost</Text></View>
 )}
 <View className="p-4">
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{item.type} · Hosted by {item.host}</Text>
 <Text className=" text-[15px] font-semibold mt-1" style={{ color: colors.text.primary }}>{item.name}</Text>
 <View className="flex-row items-center justify-between mt-2">
 <View className="flex-row items-center">
 <Text className="text-[#6443F4] text-[13px] font-semibold">{item.rating}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px] ml-1">({item.reviews})</Text>
 </View>
 <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>€{item.price}<Text className="text-[rgba(255,255,255,0.3)] text-[12px] font-normal">/night</Text></Text>
 </View>
 </View>
 </TouchableOpacity>
 </Animated.View>
 )}
 />
 ) : (
 <View className="flex-1 bg-[#120824] items-center justify-center mx-6 rounded-[16px]">
 <Ionicons name="map" size={24} color="#FFFFFF" />
 <Text className="text-[rgba(255,255,255,0.6)] text-[15px]">Map view with stay pins</Text>
 </View>
 )}
 </View>
 );
}
