import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// S19 — Plan Start
export default function PlanStartScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-white text-2xl">‹</Text>
        </Pressable>
        <Text className="text-white text-xl md:text-2xl font-bold ml-3">Plan a Trip</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 pb-32 items-center">
        <View className="w-full max-w-md mt-12 items-center">
          <Text className="text-6xl">✈️</Text>
          <Text className="text-2xl md:text-3xl font-bold text-white mt-6 text-center">Where to next?</Text>
          <Text className="text-text-secondary text-sm md:text-base mt-2 text-center">Let's plan your perfect trip step by step</Text>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-primary pt-4">
        <Pressable onPress={() => router.push('/(trip)/plan/destination')} className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80">
          <Text className="text-white text-base md:text-lg font-semibold">Choose Destination</Text>
        </Pressable>
      </View>
    </View>
  );
}
