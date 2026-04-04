import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const TRIPS = [
 { year: 2026, name: 'Dubai Adventure', rating: 5 },
 { year: 2025, name: 'Tokyo Explorer', rating: 4 },
 { year: 2024, name: 'Paris Romantic', rating: 5 },
 { year: 2024, name: 'Barcelona Beach', rating: 4 },
 { year: 2023, name: 'New York City', rating: 5 },
];

const ACHIEVEMENTS = [
 { name: 'First Trip', icon: '', unlocked: true },
 { name: '5 Continents', iconName: 'globe', unlocked: true },
 { name: '100 Activities', iconName: 'trophy', unlocked: false, progress: '78/100' },
 { name: 'Night Owl', icon: '', unlocked: true },
 { name: 'Foodie', iconName: 'restaurant', unlocked: false, progress: '12/20' },
];

export default function AdventureLog() {
 const router = useRouter();
 const [scratchMode, setScratchMode] = useState(false);

 return (
 <View className="flex-1 bg-bg-primary">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className="text-white text-lg">‹ Back</Text>
 </TouchableOpacity>
 <Text className="text-white text-xl font-bold flex-1">Adventure Log</Text>
 <TouchableOpacity onPress={() => setScratchMode(!scratchMode)}>
 <Text className="text-primary text-sm">{scratchMode ? 'Normal' : 'Scratch'} Map</Text>
 </TouchableOpacity>
 </View>

 <ScrollView removeClippedSubviews={true} className="flex-1 px-4">
 <View className="bg-bg-card rounded-card items-center justify-center mb-4" style={{ height: 200 }}>
 <Text className="text-text-muted">{scratchMode ? '[ Scratch Map — reveal countries ]' : '[ Interactive World Map ]'}</Text>
 <Text className="text-primary mt-2">23 countries visited</Text>
 </View>

 <View className="flex-row justify-around mb-6">
 {[['globe', '23', 'Countries'], ['business', '67', 'Cities'], ['airplane', '41', 'Flights'], ['camera', '1,204', 'Photos']].map(([icon, num, label]) => (
 <View key={label} className="items-center">
 <Text className="text-2xl mb-1">{icon}</Text>
 <Text className="text-white font-bold">{num}</Text>
 <Text className="text-text-muted text-xs">{label}</Text>
 </View>
 ))}
 </View>

 <Text className="text-white font-bold text-lg mb-3">Achievements</Text>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
 {ACHIEVEMENTS.map(a => (
 <View key={a.name} className={`bg-bg-card rounded-card p-3 mr-3 items-center ${!a.unlocked ? 'opacity-50' : ''}`} style={{ width: 100 }}>
 <Text className="text-3xl mb-1">{a.icon}</Text>
 <Text className="text-white text-xs font-semibold text-center">{a.name}</Text>
 {!a.unlocked && <Text className="text-text-muted text-xs">{a.progress}</Text>}
 </View>
 ))}
 </ScrollView>

 <Text className="text-white font-bold text-lg mb-3">Timeline</Text>
 {TRIPS.map((trip, i) => (
 <TouchableOpacity key={i} className="flex-row items-center mb-4">
 <View className="items-center mr-4" style={{ width: 50 }}>
 <Text className="text-primary font-bold">{trip.year}</Text>
 {i < TRIPS.length - 1 && <View className="w-0.5 h-8 bg-primary/30 mt-1" />}
 </View>
 <View className="flex-1 bg-bg-card rounded-card p-3 flex-row justify-between items-center">
 <Text className="text-white font-semibold">{trip.name}</Text>
 <View className="flex-row items-center">
 <Text className="text-yellow-400 mr-2">{'⭐'.repeat(trip.rating)}</Text>
 <Text className="text-primary text-sm">view →</Text>
 </View>
 </View>
 </TouchableOpacity>
 ))}
 <View className="h-8" />
 </ScrollView>
 </View>
 );
}
