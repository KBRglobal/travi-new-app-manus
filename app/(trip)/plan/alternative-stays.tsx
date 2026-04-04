import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const STAYS = [
 { id: '1', type: 'Entire apartment', name: 'Marina Loft', area: 'Marina District', rating: 4.92, reviews: 128, dna: 91, price: 85, total: 595, amenities: ['WiFi','Kitchen','Pool','Parking'] },
 { id: '2', type: 'Private room', name: 'Old Town Room', area: 'Historic Center', rating: 4.7, reviews: 89, dna: 78, price: 45, total: 315, amenities: ['WiFi','Kitchen'] },
 { id: '3', type: 'Entire villa', name: 'Palm Villa', area: 'Palm Jumeirah', rating: 4.95, reviews: 56, dna: 95, price: 220, total: 1540, amenities: ['WiFi','Kitchen','Pool','Parking','Gym'] },
];

const FILTERS = ['All', 'Apartment', 'Villa', 'Unique', 'Hostel'];

export default function AlternativeStays() {
 const router = useRouter();
 const [activeFilter, setActiveFilter] = useState('All');
 const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

 return (
 <View className="flex-1 bg-bg-primary">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className="text-white text-lg">‹ Back</Text>
 </TouchableOpacity>
 <Text className="text-white text-xl font-bold flex-1">Alternative Stays</Text>
 <TouchableOpacity onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
 <Text className="text-primary">{viewMode === 'list' ? 'Map' : 'List'}</Text>
 </TouchableOpacity>
 </View>

 <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-3" style={{ maxHeight: 40 }}>
 {FILTERS.map(f => (
 <TouchableOpacity key={f} onPress={() => setActiveFilter(f)} className={`px-4 py-2 rounded-pill mr-2 ${activeFilter === f ? 'bg-primary' : 'bg-bg-card'}`}>
 <Text className={activeFilter === f ? 'text-white font-semibold' : 'text-text-secondary'}>{f}</Text>
 </TouchableOpacity>
 ))}
 </ScrollView>

 <ScrollView className="flex-1 px-4">
 {viewMode === 'map' ? (
 <View className="bg-bg-card rounded-card items-center justify-center mb-4" style={{ height: 400 }}>
 <Text className="text-text-muted">[ Map View with Pins ]</Text>
 </View>
 ) : (
 STAYS.map(stay => (
 <TouchableOpacity key={stay.id} className="bg-bg-card rounded-card mb-3 overflow-hidden">
 <View className="bg-bg-primary/50 h-40 items-center justify-center">
 <Text className="text-text-muted">[ Swipeable Gallery ]</Text>
 </View>
 <View className="p-4">
 <View className="flex-row justify-between mb-1">
 <Text className="text-text-secondary text-sm">{stay.type} · {stay.area}</Text>
 <TouchableOpacity><Ionicons name="heart-outline" size={24} color="#FFFFFF" /></TouchableOpacity>
 </View>
 <Text className="text-white font-bold text-lg mb-1">{stay.name}</Text>
 <View className="flex-row items-center mb-1">
 <Text className="text-yellow-400 mr-1">{stay.rating}</Text>
 <Text className="text-text-muted">({stay.reviews} reviews)</Text>
 <Text className="text-primary ml-2">sparkles {stay.dna}% Match</Text>
 </View>
 <Text className="text-white font-bold">€{stay.price}/night · €{stay.total} total</Text>
 <View className="flex-row mt-2">
 {stay.amenities.map(a => (
 <View key={a} className="bg-bg-primary px-2 py-1 rounded mr-1">
 <Text className="text-text-muted text-xs">{a}</Text>
 </View>
 ))}
 </View>
 <TouchableOpacity onPress={() => router.push('/(trip)/plan/activities')} className="bg-primary rounded-button py-2 items-center mt-3">
 <Text className="text-white font-semibold">Select</Text>
 </TouchableOpacity>
 </View>
 </TouchableOpacity>
 ))
 )}

 <TouchableOpacity onPress={() => router.push('/(trip)/plan/hotels')} className="py-3 items-center mb-8">
 <Text className="text-primary font-semibold">Skip to Hotels →</Text>
 </TouchableOpacity>
 </ScrollView>
 </View>
 );
}
