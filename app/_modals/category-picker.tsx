import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const CATEGORIES = [
 { id: '1', iconName: 'sunny', name: 'Beach & Relaxation' },
 { id: '2', iconName: 'snow', name: 'Mountains & Hiking' },
 { id: '3', emoji: 'business', name: 'City & Culture' },
 { id: '4', iconName: 'restaurant', name: 'Food & Culinary' },
 { id: '5', iconName: 'fitness', name: 'Adventure & Sports' },
 { id: '6', iconName: 'body', name: 'Wellness & Spa' },
 { id: '7', iconName: 'business', name: 'History & Heritage' },
 { id: '8', iconName: 'sparkles', name: 'Nightlife & Entertainment' },
 { id: '9', emoji: 'person‍person‍person', name: 'Family Friendly' },
 { id: '10', emoji: '', name: 'Romantic' },
];

export default function CategoryPickerModal() {
 const router = useRouter();
 const [selected, setSelected] = useState<string[]>([]);

 const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center justify-between px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className="/60" style={{ color: colors.text.primary }}>Cancel</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Categories</Text>
 <TouchableOpacity onPress={() => router.back()}><Text className="text-[#6443F4] font-[Satoshi-Bold]">Done ({selected.length})</Text></TouchableOpacity>
 </View>
 <FlatList data={CATEGORIES} keyExtractor={i => i.id} renderItem={({ item }) => (
 <TouchableOpacity onPress={() => toggle(item.id)} className={`flex-row items-center mx-4 mb-2 p-4 rounded-2xl border ${selected.includes(item.id) ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
 <Text className="text-2xl mr-3">{item.emoji}</Text>
 <Text className=" font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>{item.name}</Text>
 {selected.includes(item.id) && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
 </TouchableOpacity>
 )} />
 </View>
 );
}
