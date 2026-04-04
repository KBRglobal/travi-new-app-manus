import { haptic } from '@/lib/haptics';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import { currentUser } from '../../lib/mockData';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const dimensions = [
 { key: 'adventure', label: 'Adventure & Sports', iconName: 'snow', value: currentUser.dna.adventure },
 { key: 'culture', label: 'Culture & History', iconName: 'business', value: currentUser.dna.culture },
 { key: 'food', label: 'Food & Gastronomy', iconName: 'restaurant', value: currentUser.dna.food },
 { key: 'nature', label: 'Nature & Wildlife', iconName: 'leaf', value: currentUser.dna.nature },
 { key: 'social', label: 'Social & Nightlife', iconName: 'sparkles', value: currentUser.dna.social },
 { key: 'wellness', label: 'Wellness & Relaxation', iconName: 'body', value: currentUser.dna.wellness },
 { key: 'luxury', label: 'Luxury & Comfort', emoji: '', value: currentUser.dna.luxury },
 { key: 'budget', label: 'Budget Conscious', iconName: 'cash', value: currentUser.dna.budget },
];

function DNABar({ dimension, index }: { dimension: typeof dimensions[0]; index: number }) {
 const barWidth = useSharedValue(0);
 useEffect(() => {
 barWidth.value = withDelay(index * 100, withSpring(dimension.value * 100, { damping: 15 }));
 }, []);
 const barStyle = useAnimatedStyle(() => ({
 width: `${barWidth.value}%`,
 }));
 return (
 <View className="mb-4">
 <View className="flex-row justify-between mb-1">
 <Text className=" text-[13px]" style={{ color: colors.text.primary }}>{dimension.emoji} {dimension.label}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{Math.round(dimension.value * 100)}%</Text>
 </View>
 <View className="h-3 bg-bg-surface rounded-full overflow-hidden">
 <Animated.View style={barStyle} className="h-full bg-[#6443F4] rounded-full" />
 </View>
 </View>
 );
}

export default function DNAResultScreen() {
 const router = useRouter();
 const { setHasCompletedDNA } = useAuthStore();
 const titleOpacity = useSharedValue(0);

 useEffect(() => {
 titleOpacity.value = withTiming(1, { duration: 800 });
 }, []);

 const titleStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value }));
 const topDimensions = [...dimensions].sort((a, b) => b.value - a.value).slice(0, 3);

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} px-6" contentContainerClassName="pt-safe pb-8">
 <Animated.View style={titleStyle} className="items-center mb-8">
 <Ionicons name="flask" size={24} color="#FFFFFF" />
 <Text className=" text-[28px] text-center mb-2" style={{ color: colors.text.primary }}>Your Travel DNA</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[15px] text-center">
 You're a {topDimensions.map((d) => d.label.split(' ')[0]).join(' + ')} traveler
 </Text>
 </Animated.View>

 {dimensions.map((dim, i) => (
 <DNABar key={dim.key} dimension={dim} index={i} />
 ))}

 <View className="bg-[#120824] rounded-[16px] p-4 mt-6 mb-6">
 <Text className=" text-[18px] mb-2" style={{ color: colors.text.primary }}>What this means</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[15px]">
 We'll use your DNA profile to recommend destinations, activities, and experiences that match your personality. The more you travel with TRAVI, the smarter your recommendations get.
 </Text>
 </View>

 <TouchableOpacity
 className="bg-[#6443F4] py-4 rounded-[12px] items-center"
 onPress={() => {
 haptic.success();
 setHasCompletedDNA(true);
 router.replace('/(tabs)/home');
 }}
 >
 <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Start Exploring</Text>
 </TouchableOpacity>
 </ScrollView>
 );
}
