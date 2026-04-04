import { Skeleton } from '@/components/ui/Skeleton';
import { View, Text, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const RESULTS = Array.from({ length: 10 }, (_, i) => ({
 id: `result-${i + 1}`,
 name: `Result ${i + 1}`,
 country: `Country ${i + 1}`,
 match: Math.floor(Math.random() * 30) + 70,
}));

// S59 — Search Results
export default function SearchResultsScreen() {
 const router = useRouter();
 const { q } = useLocalSearchParams<{ q: string }>();

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 {/* Header */}
 <View className="flex-row items-center px-4 md:px-6 mt-4">
 <Pressable onPress={() => router.back()} className="p-2 -ml-2">
 <Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text>
 </Pressable>
 <Text className=" text-lg font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Results for "{q}"</Text>
 </View>

 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="No results found" description="Try adjusting your search." />}
 data={RESULTS}
 keyExtractor={(item) => item.id}
 contentContainerClassName="px-4 md:px-6 py-4 gap-3"
 renderItem={({ item }) => (
 <Pressable
 onPress={() => router.push(`/(tabs)/home/destination/${item.id}`)}
 className="w-full md:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)] bg-[#120824] rounded-[16px] p-4 flex-row items-center active:opacity-80"
 >
 <View className="w-16 h-16 bg-white/5 rounded-[12px] items-center justify-center mr-4">
 <Ionicons name="sunny" size={24} color="#FFFFFF" />
 </View>
 <View className="flex-1">
 <Text className=" text-base font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.name}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-xs">{item.country}</Text>
 </View>
 <Text className="text-[#6443F4] text-sm font-[Satoshi-Bold]">{item.match}%</Text>
 </Pressable>
 )}
 />
 </View>
 );
}
