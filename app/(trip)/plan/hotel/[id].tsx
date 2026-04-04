import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function HotelDetailScreen() {
 const router = useRouter();
 const { id } = useLocalSearchParams<{ id: string }>();
 return (
 <View className="flex-1 bg-bg-primary">
 <View className="w-full h-56 md:h-72 bg-white/5 items-center justify-center">
 <Ionicons name="bed" size={24} color="#FFFFFF" />
 <Pressable onPress={() => router.back()} className="absolute top-safe left-4 mt-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center">
 <Text className="text-white text-xl">‹</Text>
 </Pressable>
 </View>
 <ScrollView contentContainerClassName="px-4 md:px-6 pb-32">
 <Text className="text-2xl md:text-3xl font-bold text-white mt-4">Hotel {id}</Text>
 <Text className="text-text-secondary text-sm mt-1">⭐⭐⭐⭐ · 4.5 rating</Text>
 <Text className="text-primary text-lg font-bold mt-2">€120/night</Text>
 <Text className="text-text-secondary text-sm mt-4 leading-6">Beautiful hotel with amazing views, pool, spa, and restaurant. Located in the heart of the city.</Text>
 <View className="flex-row gap-3 mt-4">
 {['Pool', ' Spa', 'Restaurant', ' WiFi'].map((a) => (
 <View key={a} className="bg-white/5 rounded-pill px-3 py-1"><Text className="text-text-secondary text-xs">{a}</Text></View>
 ))}
 </View>
 </ScrollView>
 <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-primary pt-4">
 <Pressable onPress={() => router.push('/(trip)/plan/activities')} className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80">
 <Text className="text-white text-base font-semibold">Select & Continue</Text>
 </Pressable>
 </View>
 </View>
 );
}
