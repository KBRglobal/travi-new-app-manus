import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const DNA_COMPARISON = [
 { dimension: 'Adventure', me: 85, them: 78, iconName: 'fitness' },
 { dimension: 'Culture', me: 72, them: 90, iconName: 'business' },
 { dimension: 'Food', me: 95, them: 88, iconName: 'restaurant' },
 { dimension: 'Luxury', me: 45, them: 30, iconName: 'diamond' },
 { dimension: 'Nature', me: 80, them: 92, iconName: 'leaf' },
 { dimension: 'Social', me: 65, them: 75, iconName: 'sparkles' },
 { dimension: 'Wellness', me: 50, them: 60, iconName: 'body' },
 { dimension: 'Budget', me: 70, them: 85, iconName: 'cash' },
];

export default function CompatibilityScreen() {
 const router = useRouter();
 const { userId } = useLocalSearchParams();
 const overallMatch = 87;

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Travel Compatibility" />
 </View>
 <View className="items-center py-8">
 <View className="flex-row items-center mb-4">
 <Text className="text-5xl">person</Text>
 <View className="mx-4 items-center">
 <Text className="text-[#6443F4] text-4xl font-[Satoshi-Bold]">{overallMatch}%</Text>
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>match</Text>
 </View>
 <Text className="text-5xl">person</Text>
 </View>
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>You & Sarah K.</Text>
 </View>
 <View className="mx-4 mb-6">
 <Text className=" font-[Satoshi-Bold] text-lg mb-4" style={{ color: colors.text.primary }}>DNA Comparison</Text>
 {DNA_COMPARISON.map(item => (
 <View key={item.dimension} className="mb-4">
 <View className="flex-row items-center justify-between mb-2">
 <Text className="/80 text-sm" style={{ color: colors.text.primary }}>{item.emoji} {item.dimension}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.me}% vs {item.them}%</Text>
 </View>
 <View className="flex-row h-2 rounded-full overflow-hidden bg-white/[0.05]">
 <View className="bg-[#6443F4] rounded-full" style={{ width: `${item.me}%` }} />
 </View>
 <View className="flex-row h-2 rounded-full overflow-hidden bg-white/[0.05] mt-1">
 <View className="bg-pink rounded-full" style={{ width: `${item.them}%` }} />
 </View>
 </View>
 ))}
 </View>
 <View className="mx-4 mb-6 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className=" font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Best Together For</Text>
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Food tours & local restaurants</Text>
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Outdoor adventures</Text>
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Nature exploration</Text>
 </View>
 <View className="flex-row mx-4 mb-8">
 <TouchableOpacity onPress={() => router.push(`/(social)/messages/${userId}`)} className="flex-1 mr-2 bg-[#6443F4] py-4 rounded-2xl items-center">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Message</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => {}} className="flex-1 ml-2 bg-white/[0.05] py-4 rounded-2xl items-center border border-white/[0.08]">
 <Text className="/80 font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Plan Trip</Text>
 </TouchableOpacity>
 </View>
 </ScrollView>
 );
}
