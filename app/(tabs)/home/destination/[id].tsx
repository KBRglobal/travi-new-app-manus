import { View, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { CachedImage } from '../../../../components/ui/CachedImage';

// S14 — Destination Detail
export default function DestinationDetailScreen() {
 const router = useRouter();
 const { id } = useLocalSearchParams<{ id: string }>();

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 {/* Hero Image */}
 <View className="w-full h-64 md:h-80 lg:h-96 bg-white/5 items-center justify-center">
 <Ionicons name="sunny" size={24} color="#FFFFFF" />
 {/* Back button overlay */}
 <Pressable
 onPress={() => router.back()}
 className="absolute top-safe left-4 mt-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center"
 >
 <Text className=" text-xl" style={{ color: colors.text.primary }}>‹</Text>
 </Pressable>
 {/* Wishlist */}
 <Pressable onPress={() => {}} className="absolute top-safe right-4 mt-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center">
 <Text className="text-xl">heart-outline</Text>
 </Pressable>
 </View>

 <ScrollView contentContainerClassName="px-4 md:px-6 lg:px-12 pb-32">
 <Text className="text-2xl md:text-3xl font-[Satoshi-Bold]  mt-4" style={{ color: colors.text.primary }}>Destination {id}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-sm mt-1">Country Name</Text>

 {/* Match badge */}
 <View className="flex-row mt-3">
 <View className="bg-pink-500/20 border border-pink-500/40 rounded-full px-3 py-1">
 <Text className="text-pink-400 text-xs font-[Satoshi-Bold]">sparkles 92% Match</Text>
 </View>
 </View>

 {/* Description */}
 <Text className="text-[rgba(255,255,255,0.6)] text-sm md:text-base mt-4 leading-6">
 A beautiful destination with amazing culture, food, and experiences waiting for you.
 Explore the local markets, historical sites, and stunning natural landscapes.
 </Text>

 {/* Quick Info */}
 <View className="flex-row gap-4 mt-6">
 <View className="flex-1 bg-white/5 rounded-[16px] p-3 items-center">
 <Ionicons name="thermometer" size={24} color="#FFFFFF" />
 <Text className=" text-sm font-[Satoshi-Bold] mt-1" style={{ color: colors.text.primary }}>25°C</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-xs">Weather</Text>
 </View>
 <View className="flex-1 bg-white/5 rounded-[16px] p-3 items-center">
 <Ionicons name="cash" size={24} color="#FFFFFF" />
 <Text className=" text-sm font-[Satoshi-Bold] mt-1" style={{ color: colors.text.primary }}>$$</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-xs">Budget</Text>
 </View>
 <View className="flex-1 bg-white/5 rounded-[16px] p-3 items-center">
 <Ionicons name="airplane" size={24} color="#FFFFFF" />
 <Text className=" text-sm font-[Satoshi-Bold] mt-1" style={{ color: colors.text.primary }}>3h</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-xs">Flight</Text>
 </View>
 </View>
 </ScrollView>

 {/* Sticky CTA */}
 <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-[#6443F4] pt-4 border-t border-white/5">
 <Pressable
 onPress={() => router.push({ pathname: '/(trip)/plan/destination', params: { id } })}
 className="w-full max-w-md mx-auto h-14 bg-[#6443F4] rounded-[12px] items-center justify-center active:opacity-80"
 >
 <Text className=" text-base md:text-lg font-semibold" style={{ color: colors.text.primary }}>Plan Trip Here</Text>
 </Pressable>
 </View>
 </View>
 );
}
