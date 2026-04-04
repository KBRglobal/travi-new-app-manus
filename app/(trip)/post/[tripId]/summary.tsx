import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TripSummaryScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Trip Summary</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6">
        <View className="w-full max-w-md mx-auto">
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-white/5 rounded-card p-4 items-center"><Text className="text-2xl">📍</Text><Text className="text-white text-lg font-bold mt-1">7</Text><Text className="text-text-muted text-xs">Places</Text></View>
            <View className="flex-1 bg-white/5 rounded-card p-4 items-center"><Text className="text-2xl">📸</Text><Text className="text-white text-lg font-bold mt-1">142</Text><Text className="text-text-muted text-xs">Photos</Text></View>
            <View className="flex-1 bg-white/5 rounded-card p-4 items-center"><Text className="text-2xl">💰</Text><Text className="text-white text-lg font-bold mt-1">€1,140</Text><Text className="text-text-muted text-xs">Spent</Text></View>
          </View>
          <Pressable onPress={() => router.push(`/(trip)/post/${tripId}/review`)} className="w-full bg-bg-card rounded-card p-4 flex-row items-center mb-3 active:opacity-80">
            <Text className="text-xl mr-3">⭐</Text><Text className="text-white text-base flex-1">Write Review</Text><Text className="text-text-secondary">›</Text>
          </Pressable>
          <Pressable onPress={() => router.push(`/(trip)/post/${tripId}/gallery`)} className="w-full bg-bg-card rounded-card p-4 flex-row items-center mb-3 active:opacity-80">
            <Text className="text-xl mr-3">🖼️</Text><Text className="text-white text-base flex-1">Photo Gallery</Text><Text className="text-text-secondary">›</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
