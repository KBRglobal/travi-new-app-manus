import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { hotels } from '../../lib/mockData';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { CachedImage } from '../../components/ui/CachedImage';

const compareAttributes = ['Price/night', 'Rating', 'Stars', 'WiFi', 'Pool', 'Breakfast', 'Distance', 'Cancellation'];

export default function HotelCompareScreen() {
 const router = useRouter();
 const compareHotels = hotels.slice(0, 3);

 const getAttributeValue = (hotel: typeof hotels[0], attr: string) => {
 switch (attr) {
 case 'Price/night': return `€${hotel.price}`;
 case 'Rating': return `${hotel.rating}/5`;
 case 'Stars': return '⭐'.repeat(hotel.stars);
 case 'WiFi': return hotel.amenities.includes('WiFi') ? 'checkmark-circle' : 'close-circle';
 case 'Pool': return hotel.amenities.includes('Pool') ? 'checkmark-circle' : 'close-circle';
 case 'Breakfast': return hotel.amenities.includes('Breakfast') ? 'checkmark-circle' : 'close-circle';
 case 'Distance': return `${(Math.random() * 5).toFixed(1)} km`;
 case 'Cancellation': return 'Free';
 default: return '-';
 }
 };

 const getBestValue = (attr: string) => {
 if (attr === 'Price/night') return compareHotels.reduce((min, h) => h.price < min.price ? h : min, compareHotels[0]).id;
 if (attr === 'Rating') return compareHotels.reduce((max, h) => h.rating > max.rating ? h : max, compareHotels[0]).id;
 return null;
 };

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24">
 <View className="px-6 flex-row items-center justify-between mb-6">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Compare Hotels</Text>
 <View className="w-12" />
 </View>

 {/* Hotel headers */}
 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-6">
 <View className="w-24" />
 {compareHotels.map((hotel, i) => (
 <Animated.View key={hotel.id} entering={FadeInDown.delay(i * 100)} className="w-32 items-center mx-2">
 <CachedImage source={{ uri: hotel.image }} className="w-24 h-24 rounded-[16px] mb-2" />
 <Text className=" text-[13px] font-semibold text-center" style={{ color: colors.text.primary }} numberOfLines={2}>{hotel.name}</Text>
 </Animated.View>
 ))}
 </ScrollView>

 {/* Comparison table */}
 <View className="mt-6">
 {compareAttributes.map((attr, i) => {
 const bestId = getBestValue(attr);
 return (
 <Animated.View key={attr} entering={FadeInDown.delay(300 + i * 50)}>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-6">
 <View className={`flex-row py-3 ${i % 2 === 0 ? 'bg-[#120824]' : ''}`}>
 <View className="w-24 justify-center"><Text className="text-[rgba(255,255,255,0.3)] text-[13px]">{attr}</Text></View>
 {compareHotels.map((hotel) => (
 <View key={hotel.id} className="w-32 items-center mx-2">
 <Text className={`text-[13px] font-semibold ${bestId === hotel.id ? 'text-[#4ADE80]' : 'text-white'}`}>
 {getAttributeValue(hotel, attr)} {bestId === hotel.id ? '' : ''}
 </Text>
 </View>
 ))}
 </View>
 </ScrollView>
 </Animated.View>
 );
 })}
 </View>

 {/* Select buttons */}
 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-6 mt-6">
 <View className="w-24" />
 {compareHotels.map((hotel) => (
 <View key={hotel.id} className="w-32 mx-2">
 <TouchableOpacity className="bg-[#6443F4] py-3 rounded-[12px] items-center" onPress={() => router.push(`/(trip)/hotel/${hotel.id}`)}>
 <Text className=" text-[13px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Select</Text>
 </TouchableOpacity>
 </View>
 ))}
 </ScrollView>
 </ScrollView>
 );
}
