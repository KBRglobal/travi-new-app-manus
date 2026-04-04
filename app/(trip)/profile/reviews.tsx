import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const REVIEWS = [
 { id: '1', place: 'Hotel Barcelona', iconName: 'bed', rating: 4.5, text: 'Amazing rooftop pool with city views. Staff was incredibly helpful.', date: 'Mar 2026', likes: 12 },
 { id: '2', place: 'Sushi Nakazawa, Tokyo', emoji: 'restaurant', rating: 5, text: 'Best omakase experience of my life. Worth every penny.', date: 'Feb 2026', likes: 28 },
 { id: '3', place: 'Bali Surf School', iconName: 'fitness', rating: 4, text: 'Great instructors, beautiful beach. A bit crowded in the morning.', date: 'Jan 2026', likes: 8 },
 { id: '4', place: 'Reykjavik Walking Tour', emoji: '', rating: 4.5, text: 'Fascinating history, guide was knowledgeable and funny.', date: 'Dec 2025', likes: 15 },
];

export default function ReviewsScreen() {
 const router = useRouter();

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="My Reviews" />
 <View className="flex-1" />
 <Text className="/40 text-sm" style={{ color: colors.text.primary }}>{REVIEWS.length} reviews</Text>
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState stateKey="reviews" />} data={REVIEWS} keyExtractor={i => i.id} renderItem={({ item }) => (
 <View className="mx-4 mb-3 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <View className="flex-row items-center mb-2">
 <Text className="text-2xl mr-2">{item.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.place}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.date}</Text>
 </View>
 <View className="flex-row items-center bg-[#6443F4]/20 px-2 py-1 rounded-lg">
 <Ionicons name="star" size={24} color="#FFFFFF" />
 <Text className="text-[#6443F4] text-sm font-[Satoshi-Bold]">{item.rating}</Text>
 </View>
 </View>
 <Text className="/80 text-sm mb-2" style={{ color: colors.text.primary }}>{item.text}</Text>
 <View className="flex-row items-center">
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.likes} helpful</Text>
 <View className="flex-1" />
 <TouchableOpacity><Text className="text-[#6443F4] text-xs">Edit</Text></TouchableOpacity>
 </View>
 </View>
 )} />
 </View>
 );
}
