import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function ActivityDetailScreen() {
 const router = useRouter();
 const [booked, setBooked] = useState(false);

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Activity Details" />
 <View className="flex-1" />
 <TouchableOpacity><Ionicons name="heart-outline" size={24} color="#FFFFFF" /></TouchableOpacity>
 </View>
 <View className="h-48 bg-white/[0.03] mx-4 rounded-2xl items-center justify-center mb-4">
 <Ionicons name="fitness" size={24} color="#FFFFFF" />
 </View>
 <View className="px-4 mb-4">
 <Text className=" text-2xl font-[Satoshi-Bold] mb-1" style={{ color: colors.text.primary }}>Surf Lesson at Waikiki</Text>
 <View className="flex-row items-center mb-2">
 <Ionicons name="star" size={24} color="#FFFFFF" />
 <Text className=" font-[Satoshi-Bold] mr-2" style={{ color: colors.text.primary }}>4.8</Text>
 <Text className="/40" style={{ color: colors.text.primary }}>(234 reviews)</Text>
 </View>
 <View className="flex-row items-center mb-4">
 <Text className="/40 text-sm" style={{ color: colors.text.primary }}>Waikiki Beach • ⏱ 2 hours • people Max 6</Text>
 </View>
 <Text className="/80 text-sm mb-4" style={{ color: colors.text.primary }}>Learn to surf with professional instructors on the famous Waikiki Beach. All equipment provided. Perfect for beginners and intermediate surfers.</Text>
 </View>
 <View className="mx-4 mb-4">
 <Text className=" font-[Satoshi-Bold] mb-3" style={{ color: colors.text.primary }}>What's Included</Text>
 {['Surfboard & wetsuit', 'Professional instructor', 'Beach photos', 'Insurance'].map(item => (
 <View key={item} className="flex-row items-center mb-2">
 <Ionicons name="checkmark" size={24} color="#FFFFFF" />
 <Text className="/80 text-sm" style={{ color: colors.text.primary }}>{item}</Text>
 </View>
 ))}
 </View>
 <View className="mx-4 mb-4">
 <Text className=" font-[Satoshi-Bold] mb-3" style={{ color: colors.text.primary }}>Available Times</Text>
 <View className="flex-row flex-wrap">
 {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map(t => (
 <TouchableOpacity onPress={() => {}} key={t} className="px-4 py-2 bg-[#120824] rounded-xl mr-2 mb-2 border border-white/[0.08]">
 <Text className=" text-sm" style={{ color: colors.text.primary }}>{t}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 <View className="mx-4 mb-8 flex-row items-center">
 <View className="flex-1">
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>Price per person</Text>
 <Text className=" text-2xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>$75</Text>
 </View>
 <TouchableOpacity onPress={() => setBooked(true)} className={`px-8 py-4 rounded-2xl ${booked ? 'bg-green-500' : 'bg-[#6443F4]'}`}>
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>{booked ? 'Booked' : 'Book Now'}</Text>
 </TouchableOpacity>
 </View>
 </ScrollView>
 );
}
