import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function LiveMapScreen() {
 const router = useRouter();
 const [filter, setFilter] = useState('all');
 const filters = ['all', 'food', 'attractions', 'transport', 'hotels'];

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Live Map" />
 <View className="flex-1" />
 <TouchableOpacity onPress={() => router.push('/(live)/emergency')}><Text className="text-red-400 font-[Satoshi-Bold]">SOS</Text></TouchableOpacity>
 </View>
 <View className="flex-1 bg-white/[0.03] mx-4 rounded-2xl items-center justify-center">
 <Ionicons name="map" size={24} color="#FFFFFF" />
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Map View</Text>
 <Text className="/30 text-xs mt-1" style={{ color: colors.text.primary }}>Shinjuku, Tokyo</Text>
 </View>
 <View className="flex-row mx-4 my-3">
 {filters.map(f => (
 <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`px-3 py-1.5 rounded-full mr-2 ${filter === f ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-xs capitalize ${filter === f ? 'text-white font-[Satoshi-Bold]' : 'text-white/60'}`}>{f}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <View className="mx-4 mb-4">
 {[
 { emoji: 'restaurant', name: 'Sushi Nakazawa', dist: '350m', rating: '4.8' },
 { iconName: 'business', name: 'Meiji Shrine', dist: '1.2km', rating: '4.9' },
 { emoji: '', name: 'Shinjuku Station', dist: '200m', rating: '' },
 ].map(item => (
 <TouchableOpacity onPress={() => {}} key={item.name} className="flex-row items-center p-3 mb-2 bg-[#120824] rounded-xl border border-white/[0.08]">
 <Text className="text-xl mr-2">{item.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold] text-sm" style={{ color: colors.text.primary }}>{item.name}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.dist}</Text>
 </View>
 {item.rating && <Text className="text-yellow-400 text-xs">{item.rating}</Text>}
 </TouchableOpacity>
 ))}
 </View>
 </View>
 );
}
