import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function PaymentFailedScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-6 md:px-12">
      <View className="w-full max-w-md items-center">
        <View className="w-20 h-20 bg-red-500/20 rounded-full items-center justify-center">
          <Text className="text-4xl">❌</Text>
        </View>
        <Text className="text-2xl md:text-3xl font-bold text-white mt-6 text-center">Payment Failed</Text>
        <Text className="text-text-secondary text-sm md:text-base mt-2 text-center">Something went wrong with your payment</Text>
        <Pressable onPress={() => router.push('/(trip)/plan/payment')} className="w-full h-14 bg-primary rounded-button items-center justify-center mt-8 active:opacity-80">
          <Text className="text-white text-base font-semibold">Try Again</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/(trip)/plan/checkout')} className="mt-4 py-3">
          <Text className="text-text-secondary text-sm">Change Payment Method</Text>
        </Pressable>
      </View>
    </View>
  );
}
