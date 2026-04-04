import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
const DAYS = Array.from({ length: 7 }, (_, i) => ({ day: i+1, items: [`Activity ${i*2+1}`, `Activity ${i*2+2}`] }));

export default function PlanItineraryScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Your Itinerary</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-4 pb-32">
        {DAYS.map((d) => (
          <View key={d.day} className="mb-4">
            <Text className="text-primary text-sm font-bold mb-2">Day {d.day}</Text>
            {d.items.map((item, idx) => (
              <View key={idx} className="bg-bg-card rounded-card p-3 mb-2 flex-row items-center">
                <View className="w-8 h-8 bg-primary/20 rounded-full items-center justify-center mr-3"><Text className="text-primary text-xs font-bold">{idx+1}</Text></View>
                <Text className="text-white text-sm">{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-primary pt-4">
        <Pressable onPress={() => router.push('/(trip)/plan/cart')} className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80">
          <Text className="text-white text-base font-semibold">Review & Book</Text>
        </Pressable>
      </View>
    </View>
  );
}
