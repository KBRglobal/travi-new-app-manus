import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

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
 <ScrollView className="flex-1 bg-bg-primary pt-safe">
 <View className="flex-row items-center px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
 <Text className="text-white text-xl font-bold ml-3">Travel Stats</Text>
 </View>
 <View className="flex-row flex-wrap mx-2 mb-6">
 {stats.map(s => (
 <View key={s.label} className="w-1/3 p-2">
 <View className="bg-bg-secondary rounded-2xl p-4 items-center border border-white/[0.08]">
 <Text className="text-2xl mb-2">{s.emoji}</Text>
 <Text className="text-white font-bold text-lg">{s.value}</Text>
 <Text className="text-white/40 text-xs text-center">{s.label}</Text>
 </View>
 </View>
 ))}
 </View>
 <View className="mx-4 mb-8">
 <Text className="text-white font-bold text-lg mb-3">Top Destinations</Text>
 {topDestinations.map((d, i) => (
 <View key={d.name} className="flex-row items-center mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
 <Text className="text-white/40 font-bold text-lg mr-3">#{i + 1}</Text>
 <Text className="text-2xl mr-3">{d.emoji}</Text>
 <Text className="text-white font-bold flex-1">{d.name}</Text>
 <Text className="text-white/60 text-sm">{d.visits} visits</Text>
 </View>
 ))}
 </View>
 </ScrollView>
 );
}
