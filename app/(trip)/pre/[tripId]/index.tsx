import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PreTripHubScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Trip Preparation</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6">
        {/* Countdown */}
        <View className="w-full max-w-md mx-auto bg-primary/10 border border-primary/30 rounded-card p-6 items-center mb-4">
          <Text className="text-text-secondary text-sm">Days until departure</Text>
          <Text className="text-white text-4xl font-bold mt-1">14</Text>
        </View>
        {/* Actions */}
        <Pressable onPress={() => router.push(`/(trip)/pre/${tripId}/checklist`)} className="w-full max-w-md mx-auto bg-bg-card rounded-card p-4 flex-row items-center mb-3 active:opacity-80">
          <Text className="text-xl mr-3">✅</Text><View className="flex-1"><Text className="text-white text-base font-bold">Checklist</Text><Text className="text-text-secondary text-xs">3/8 completed</Text></View><Text className="text-text-secondary">›</Text>
        </Pressable>
        <Pressable onPress={() => router.push(`/(trip)/pre/${tripId}/documents`)} className="w-full max-w-md mx-auto bg-bg-card rounded-card p-4 flex-row items-center mb-3 active:opacity-80">
          <Text className="text-xl mr-3">📄</Text><View className="flex-1"><Text className="text-white text-base font-bold">Documents</Text><Text className="text-text-secondary text-xs">Passport, visa, insurance</Text></View><Text className="text-text-secondary">›</Text>
        </Pressable>
        {/* Start Trip */}
        <Pressable onPress={() => router.replace(`/(live)/${tripId}`)} className="w-full max-w-md mx-auto h-14 bg-green-600 rounded-button items-center justify-center mt-6 active:opacity-80">
          <Text className="text-white text-base font-semibold">🚀 Start Trip</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
