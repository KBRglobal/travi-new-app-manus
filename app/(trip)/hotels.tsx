import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { hotels } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CachedImage } from '../../components/ui/CachedImage';

export default function HotelsScreen() {
 const router = useRouter();
 const [sortBy, setSortBy] = useState<'price' | 'rating' | 'stars'>('price');
 const [selectedHotel, setSelectedHotel] = useState<string | null>(null);

 const sortedHotels = [...hotels].sort((a, b) => {
 if (sortBy === 'price') return a.price - b.price;
 if (sortBy === 'rating') return b.rating - a.rating;
 return b.stars - a.stars;
 });

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="px-6 flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}>
 <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Hotels</Text>
 <TouchableOpacity onPress={() => router.push('/(trip)/alt-stays')}>
 <Text className="text-[#6443F4] text-[13px]">Airbnb</Text>
 </TouchableOpacity>
 </View>

 <View className="flex-row px-6 mb-4">
 {(['price', 'rating', 'stars'] as const).map((s) => (
 <TouchableOpacity key={s} className={`mr-2 px-4 py-2 rounded-full border ${sortBy === s ? 'bg-[#6443F4] border-[#6443F4]' : 'border-[rgba(255,255,255,0.08)]'}`} onPress={() => setSortBy(s)}>
 <Text className={`text-[13px] ${sortBy === s ? 'text-white font-semibold' : 'text-[rgba(255,255,255,0.6)]'}`}>{s === 'price' ? 'Price' : s === 'rating' ? 'Rating' : 'Stars'}</Text>
 </TouchableOpacity>
 ))}
 <TouchableOpacity className="ml-auto px-4 py-2 rounded-full border border-pink" onPress={() => router.push('/(trip)/hotel-compare')}>
 <Text className="text-pink text-[13px] font-semibold">Compare</Text>
 </TouchableOpacity>
 </View>

 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="No hotels found" description="Try different dates or adjust filters." />}
 data={sortedHotels}
 keyExtractor={(item) => item.id}
 contentContainerClassName="px-6 pb-24"
 renderItem={({ item, index }) => (
 <Animated.View entering={FadeInDown.delay(index * 100)}>
 <TouchableOpacity
 className={`bg-[#120824] border rounded-[16px] mb-3 overflow-hidden ${selectedHotel === item.id ? 'border-[#6443F4]' : 'border-[rgba(255,255,255,0.08)]'}`}
 onPress={() => { setSelectedHotel(item.id); router.push(`/(trip)/hotel/${item.id}`); }}
 >
 <CachedImage source={{ uri: item.image }} className="w-full h-40" resizeMode="cover" />
 <View className="p-4">
 <View className="flex-row justify-between items-start mb-1">
 <View className="flex-1 mr-2">
 <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{item.name}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{'⭐'.repeat(item.stars)}</Text>
 </View>
 <View className="items-end">
 <Text className="text-[#6443F4] text-[18px] font-[Satoshi-Bold]">€{item.price}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">/night</Text>
 </View>
 </View>
 <View className="flex-row items-center mt-2">
 <View className="bg-[#6443F4]/20 px-2 py-0.5 rounded-full mr-2">
 <Text className="text-[#6443F4] text-[12px] font-semibold">{item.rating}</Text>
 </View>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{item.reviews} reviews</Text>
 </View>
 <View className="flex-row flex-wrap mt-2">
 {item.amenities.slice(0, 4).map((a) => (
 <View key={a} className="bg-bg-surface px-2 py-0.5 rounded-full mr-1 mb-1">
 <Text className="text-[rgba(255,255,255,0.6)] text-[12px]">{a}</Text>
 </View>
 ))}
 </View>
 </View>
 </TouchableOpacity>
 </Animated.View>
 )}
 />
 </View>
 );
}
