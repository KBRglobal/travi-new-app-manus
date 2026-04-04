import { useState, useCallback} from 'react';
import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const CATEGORIES = [
 { id: 'adventure', label: 'Adventure snow' },
 { id: 'culture', label: 'Culture business' },
 { id: 'relaxation', label: 'Relaxation ' },
 { id: 'food', label: 'Food ' },
 { id: 'nature', label: 'Nature ' },
 { id: 'nightlife', label: 'Nightlife ' },
 { id: 'wellness', label: 'Wellness ' },
 { id: 'history', label: 'History document-text' },
 { id: 'shopping', label: 'Shopping bag' },
 { id: 'architecture', label: 'Architecture ' },
 { id: 'sports', label: 'Sports ' },
 { id: 'photography', label: 'Photography camera' },
];

// S7 — DNA Categories
export default function DNACategoriesScreen() {
 const router = useRouter();
 const [selected, setSelected] = useState<string[]>([]);

 const toggle = (id: string) => {
 setSelected((prev) =>
 prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
 );
 };

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 {/* Header */}
 <View className="flex-row items-center px-6 md:px-12 mt-4">
 <Pressable onPress={() => router.back()} className="p-2 -ml-2">
 <Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text>
 </Pressable>
 <View className="flex-1 h-1 bg-white/10 rounded-full ml-4">
 <View className="w-1/4 h-full bg-[#6443F4] rounded-full" />
 </View>
 </View>

 <ScrollView contentContainerClassName="px-6 md:px-12 pb-32">
 <Text className="text-2xl md:text-3xl font-[Satoshi-Bold]  mt-6" style={{ color: colors.text.primary }}>What do you love?</Text>
 <Text className="text-sm md:text-base text-[rgba(255,255,255,0.6)] mt-2">
 Pick everything that speaks to you
 </Text>

 {/* Chips grid */}
 <View className="flex-row flex-wrap gap-3 mt-6">
 {CATEGORIES.map((cat) => (
 <Pressable
 key={cat.id}
 onPress={() => toggle(cat.id)}
 className={`h-11 px-4 rounded-full items-center justify-center border ${
 selected.includes(cat.id)
 ? 'bg-[#6443F4]/25 border-[#6443F4]'
 : 'bg-white/5 border-white/10'
 }`}
 >
 <Text className={`text-sm font-semibold ${selected.includes(cat.id) ? 'text-white' : 'text-[rgba(255,255,255,0.6)]'}`}>
 {cat.label}
 </Text>
 </Pressable>
 ))}
 </View>
 </ScrollView>

 {/* Sticky Continue */}
 <View className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-safe mb-4 bg-bg-[#6443F4] pt-4">
 <Pressable
 onPress={() => router.push('/(auth)/quick-dna/swipe')}
 disabled={selected.length === 0}
 className={`w-full max-w-md mx-auto h-14 rounded-[12px] items-center justify-center ${
 selected.length > 0 ? 'bg-[#6443F4] active:opacity-80' : 'bg-[#6443F4] opacity-40'
 }`}
 >
 <Text className=" text-base md:text-lg font-semibold" style={{ color: colors.text.primary }}>
 {selected.length > 0 ? `Continue (${selected.length} selected)` : 'Continue'}
 </Text>
 </Pressable>
 </View>
 </View>
 );
}
