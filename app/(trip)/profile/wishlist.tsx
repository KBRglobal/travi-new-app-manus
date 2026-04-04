import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const WISHLIST = [
 { id: '1', name: 'Santorini, Greece', emoji: '🇬🇷', image: 'sunny', price: '$1,200', added: 'Mar 2026' },
 { id: '2', name: 'Kyoto, Japan', emoji: '🇯🇵', image: '', price: '$1,800', added: 'Feb 2026' },
 { id: '3', name: 'Machu Picchu, Peru', emoji: '🇵🇪', image: 'snow', price: '$2,100', added: 'Jan 2026' },
 { id: '4', name: 'Maldives', emoji: '🇲🇻', image: 'sunny', price: '$3,500', added: 'Dec 2025' },
 { id: '5', name: 'Northern Lights, Norway', emoji: '🇳🇴', image: '', price: '$1,600', added: 'Nov 2025' },
];

export default function WishlistScreen() {
 const router = useRouter();
 const [items, setItems] = useState(WISHLIST);

 const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Wishlist" />
 <View className="flex-1" />
 <Text className="/40 text-sm" style={{ color: colors.text.primary }}>{items.length} places</Text>
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState stateKey="wishlist" />} data={items} keyExtractor={i => i.id} renderItem={({ item }) => (
 <View className="mx-4 mb-3 bg-[#120824] rounded-2xl border border-white/[0.08] overflow-hidden">
 <View className="h-32 bg-white/[0.03] items-center justify-center">
 <Text className="text-6xl">{item.image}</Text>
 </View>
 <View className="p-4">
 <View className="flex-row items-center justify-between mb-1">
 <Text className=" font-[Satoshi-Bold] text-base" style={{ color: colors.text.primary }}>{item.emoji} {item.name}</Text>
 <TouchableOpacity onPress={() => removeItem(item.id)}><Ionicons name="close" size={24} color="#FFFFFF" /></TouchableOpacity>
 </View>
 <View className="flex-row items-center justify-between">
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>Added {item.added}</Text>
 <Text className="text-[#6443F4] font-[Satoshi-Bold]">from {item.price}</Text>
 </View>
 <TouchableOpacity onPress={() => router.push('/(trip)/dates')} className="mt-3 bg-[#6443F4] py-3 rounded-xl items-center">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Plan Trip</Text>
 </TouchableOpacity>
 </View>
 </View>
 )} />
 </View>
 );
}
