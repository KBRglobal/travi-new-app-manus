import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TravelerProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-4 items-center">
        <View className="w-full max-w-md items-center">
          <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center"><Text className="text-4xl">👤</Text></View>
          <Text className="text-white text-2xl font-bold mt-4">Traveler {userId}</Text>
          <Text className="text-text-secondary text-sm mt-1">Explorer · 8 trips</Text>
          <View className="flex-row gap-3 mt-6 w-full">
            <Pressable onPress={() => router.push(`/(social)/chat/${userId}`)} className="flex-1 h-12 bg-primary rounded-button items-center justify-center active:opacity-80">
              <Text className="text-white text-sm font-semibold">Message</Text>
            </Pressable>
            <Pressable className="flex-1 h-12 bg-white/10 rounded-button items-center justify-center active:opacity-80">
              <Text className="text-white text-sm font-semibold">Add Buddy</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
