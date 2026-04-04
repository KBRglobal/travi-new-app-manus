import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
const ACTIVITIES = Array.from({ length: 10 }, (_, i) => ({ id: `a-${i+1}`, name: `Activity ${i+1}`, price: `€${20 + i * 10}`, category: ['Adventure', 'Culture', 'Food', 'Nature'][i % 4] }));

export default function PlanActivitiesScreen() {
 const router = useRouter();
 const [selected, setSelected] = useState<string[]>([]);
 const toggle = (id: string) => setSelected((p) => p.includes(id) ? p.filter((s) => s !== id) : [...p, id]);
 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center px-4 md:px-6 mt-4">
 <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text></Pressable>
 <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Activities</Text>
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="No activities found" description="Try different categories or locations." />} data={ACTIVITIES} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-3 pb-32"
 renderItem={({ item }) => (
 <Pressable onPress={() => toggle(item.id)} className={`w-full md:w-[calc(50%-6px)] rounded-[16px] p-4 flex-row items-center border ${selected.includes(item.id) ? 'bg-[#6443F4]/20 border-[#6443F4]' : 'bg-[#120824] border-white/8'}`}>
 <View className="w-12 h-12 bg-white/5 rounded-[12px] items-center justify-center mr-3"><Ionicons name="flag" size={24} color="#FFFFFF" /></View>
 <View className="flex-1"><Text className=" text-base font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.name}</Text><Text className="text-[rgba(255,255,255,0.6)] text-xs">{item.category} · {item.price}</Text></View>
 {selected.includes(item.id) && <View className="w-6 h-6 bg-[#6443F4] rounded-full items-center justify-center"><Ionicons name="checkmark" size={24} color="#FFFFFF" /></View>}
 </Pressable>
 )}
 />
 <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-[#6443F4] pt-4">
 <Pressable onPress={() => router.push('/(trip)/plan/itinerary')} className="w-full max-w-md mx-auto h-14 bg-[#6443F4] rounded-[12px] items-center justify-center active:opacity-80">
 <Text className=" text-base font-semibold" style={{ color: colors.text.primary }}>Continue ({selected.length} selected)</Text>
 </Pressable>
 </View>
 </View>
 );
}
