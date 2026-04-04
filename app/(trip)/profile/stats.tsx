import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
 const router = useRouter();

 const stats = [
 { label: 'Countries Visited', value: '12', iconName: 'globe' },
 { label: 'Cities Explored', value: '28', emoji: 'business' },
 { label: 'Total Trips', value: '8', iconName: 'airplane' },
 { label: 'Days Traveling', value: '67', emoji: 'calendar' },
 { label: 'Flights Taken', value: '14', iconName: 'airplane' },
 { label: 'Hotels Stayed', value: '11', iconName: 'bed' },
 { label: 'Reviews Written', value: '23', iconName: 'star' },
 { label: 'Photos Uploaded', value: '342', iconName: 'camera' },
 { label: 'Distance Traveled', value: '48,200 km', emoji: '' },
 { label: 'Money Saved', value: '$1,240', iconName: 'cash' },
 { label: 'Points Earned', value: '15,400', iconName: 'trophy' },
 { label: 'Travel Buddies', value: '5', iconName: 'people' },
 ];

 const topDestinations = [
 { name: 'Japan', visits: 3, emoji: '🇯🇵' },
 { name: 'Spain', visits: 2, emoji: '🇪🇸' },
 { name: 'Thailand', visits: 2, emoji: '🇹🇭' },
 ];

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Travel Stats" />
 </View>
 <View className="flex-row flex-wrap mx-2 mb-6">
 {stats.map(s => (
 <View key={s.label} className="w-1/3 p-2">
 <View className="bg-[#120824] rounded-2xl p-4 items-center border border-white/[0.08]">
 <Text className="text-2xl mb-2">{s.emoji}</Text>
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>{s.value}</Text>
 <Text className="/40 text-xs text-center" style={{ color: colors.text.primary }}>{s.label}</Text>
 </View>
 </View>
 ))}
 </View>
 <View className="mx-4 mb-8">
 <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Top Destinations</Text>
 {topDestinations.map((d, i) => (
 <View key={d.name} className="flex-row items-center mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="/40 font-[Satoshi-Bold] text-lg mr-3" style={{ color: colors.text.primary }}>#{i + 1}</Text>
 <Text className="text-2xl mr-3">{d.emoji}</Text>
 <Text className=" font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>{d.name}</Text>
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>{d.visits} visits</Text>
 </View>
 ))}
 </View>
 </ScrollView>
 );
}
