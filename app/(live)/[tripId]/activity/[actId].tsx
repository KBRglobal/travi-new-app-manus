import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ActivityDetailScreen() {
  const router = useRouter();
  const { tripId, actId } = useLocalSearchParams();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Activity {actId}</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6">
        <View className="w-full max-w-md mx-auto">
          <View className="w-full h-48 bg-white/5 rounded-card items-center justify-center mb-4"><Text className="text-5xl">🎯</Text></View>
          <Text className="text-white text-2xl font-bold">Activity Details</Text>
          <Text className="text-text-secondary text-sm mt-2">Time: 10:00 AM - 12:00 PM</Text>
          <Text className="text-text-secondary text-sm mt-4 leading-6">Enjoy this amazing activity during your trip. Don't forget to take photos!</Text>
          <Pressable onPress={() => router.push('/_modals/quick-rating')} className="w-full h-12 bg-primary/20 border border-primary rounded-button items-center justify-center mt-6 active:opacity-80">
            <Text className="text-primary text-base font-semibold">Rate Activity</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
