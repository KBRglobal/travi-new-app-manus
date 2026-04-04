import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

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
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>Alternative Stays</Text>
 <TouchableOpacity onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
 <Text className="text-[#6443F4]">{viewMode === 'list' ? 'Map' : 'List'}</Text>
 </TouchableOpacity>
 </View>

 <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-3" style={{ maxHeight: 40 }}>
 {FILTERS.map(f => (
 <TouchableOpacity key={f} onPress={() => setActiveFilter(f)} className={`px-4 py-2 rounded-full mr-2 ${activeFilter === f ? 'bg-[#6443F4]' : 'bg-[#120824]'}`}>
 <Text className={activeFilter === f ? 'text-white font-semibold' : 'text-[rgba(255,255,255,0.6)]'}>{f}</Text>
 </TouchableOpacity>
 ))}
 </ScrollView>

 <ScrollView className="flex-1 px-4">
 {viewMode === 'map' ? (
 <View className="bg-[#120824] rounded-[16px] items-center justify-center mb-4" style={{ height: 400 }}>
 <Text className="text-[rgba(255,255,255,0.3)]">[ Map View with Pins ]</Text>
 </View>
 ) : (
 STAYS.map(stay => (
 <TouchableOpacity onPress={() => {}} key={stay.id} className="bg-[#120824] rounded-[16px] mb-3 overflow-hidden">
 <View className="bg-bg-[#6443F4]/50 h-40 items-center justify-center">
 <Text className="text-[rgba(255,255,255,0.3)]">[ Swipeable Gallery ]</Text>
 </View>
 <View className="p-4">
 <View className="flex-row justify-between mb-1">
 <Text className="text-[rgba(255,255,255,0.6)] text-sm">{stay.type} · {stay.area}</Text>
 <TouchableOpacity><Ionicons name="heart-outline" size={24} color="#FFFFFF" /></TouchableOpacity>
 </View>
 <Text className=" font-[Satoshi-Bold] text-lg mb-1" style={{ color: colors.text.primary }}>{stay.name}</Text>
 <View className="flex-row items-center mb-1">
 <Text className="text-yellow-400 mr-1">{stay.rating}</Text>
 <Text className="text-[rgba(255,255,255,0.3)]">({stay.reviews} reviews)</Text>
 <Text className="text-[#6443F4] ml-2">sparkles {stay.dna}% Match</Text>
 </View>
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>€{stay.price}/night · €{stay.total} total</Text>
 <View className="flex-row mt-2">
 {stay.amenities.map(a => (
 <View key={a} className="bg-bg-[#6443F4] px-2 py-1 rounded mr-1">
 <Text className="text-[rgba(255,255,255,0.3)] text-xs">{a}</Text>
 </View>
 ))}
 </View>
 <TouchableOpacity onPress={() => router.push('/(trip)/plan/activities')} className="bg-[#6443F4] rounded-[12px] py-2 items-center mt-3">
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>Select</Text>
 </TouchableOpacity>
 </View>
 </TouchableOpacity>
 ))
 )}

 <TouchableOpacity onPress={() => router.push('/(trip)/plan/hotels')} className="py-3 items-center mb-8">
 <Text className="text-[#6443F4] font-semibold">Skip to Hotels →</Text>
 </TouchableOpacity>
 </ScrollView>
 </View>
 );
}
