import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function PlanConfirmationScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-6 md:px-12">
      <View className="w-full max-w-md items-center">
        <View className="w-20 h-20 bg-green-500/20 rounded-full items-center justify-center">
          <Text className="text-4xl">✅</Text>
        </View>
        <Text className="text-2xl md:text-3xl font-bold text-white mt-6 text-center">Booking Confirmed!</Text>
        <Text className="text-text-secondary text-sm md:text-base mt-2 text-center">Your Barcelona trip is all set</Text>
        <Text className="text-primary text-lg font-bold mt-4">€1,120.00</Text>
        <Pressable onPress={() => router.replace('/(trip)/pre/trip-1')} className="w-full h-14 bg-primary rounded-button items-center justify-center mt-8 active:opacity-80">
          <Text className="text-white text-base font-semibold">View Trip</Text>
        </Pressable>
        <Pressable onPress={() => router.replace('/(tabs)/home')} className="mt-4 py-3">
          <Text className="text-text-secondary text-sm">Go Home</Text>
        </Pressable>
      </View>
    </View>
  );
}
