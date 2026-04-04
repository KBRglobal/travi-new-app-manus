import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

// S14 — Destination Detail (Explore)
export default function ExploreDestinationDetailScreen() {
 const router = useRouter();
 const { id } = useLocalSearchParams<{ id: string }>();

 return (
 <View className="flex-1 bg-bg-primary">
 <View className="w-full h-64 md:h-80 bg-white/5 items-center justify-center">
 <Ionicons name="sunny" size={24} color="#FFFFFF" />
 <Pressable
 onPress={() => router.back()}
 className="absolute top-safe left-4 mt-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center"
 >
 <Text className="text-white text-xl">‹</Text>
 </Pressable>
 <Pressable className="absolute top-safe right-4 mt-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center">
 <Text className="text-xl">heart-outline</Text>
 </Pressable>
 </View>

 <ScrollView contentContainerClassName="px-4 md:px-6 pb-32">
 <Text className="text-2xl md:text-3xl font-bold text-white mt-4">Destination {id}</Text>
 <Text className="text-text-secondary text-sm mt-1">Country Name</Text>
 <Text className="text-text-secondary text-sm md:text-base mt-4 leading-6">
 Explore this amazing destination and discover what makes it unique.
 </Text>
 </ScrollView>

 <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-primary pt-4">
 <Pressable
 onPress={() => router.push({ pathname: '/(trip)/plan/destination', params: { id } })}
 className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80"
 >
 <Text className="text-white text-base font-semibold">Plan Trip Here</Text>
 </Pressable>
 </View>
 </View>
 );
}
