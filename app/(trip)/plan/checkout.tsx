import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function PlanCheckoutScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Checkout</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-4 pb-32">
        <View className="w-full max-w-md mx-auto">
          <Text className="text-text-secondary text-sm mb-4">Order Summary</Text>
          <View className="bg-bg-card rounded-card p-4 mb-4">
            <Text className="text-white text-base">Barcelona Trip · 7 days</Text>
            <Text className="text-primary text-lg font-bold mt-2">€1,140.00</Text>
          </View>
          <Text className="text-text-secondary text-sm mb-4">Payment Method</Text>
          <Pressable onPress={() => router.push('/_modals/payment-method')} className="bg-bg-card rounded-card p-4 flex-row items-center justify-between mb-4 active:opacity-80">
            <Text className="text-white text-base">💳 Select payment method</Text>
            <Text className="text-text-secondary">›</Text>
          </Pressable>
          <Pressable className="flex-row items-center mb-4">
            <View className="w-5 h-5 rounded border border-white/20 mr-3 items-center justify-center"><Text className="text-white text-xs">✓</Text></View>
            <Text className="text-text-secondary text-sm">Use 2,000 points (€20 discount)</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-primary pt-4">
        <Pressable onPress={() => router.push('/(trip)/plan/payment')} className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80">
          <Text className="text-white text-base font-semibold">Pay €1,120.00</Text>
        </Pressable>
      </View>
    </View>
  );
}
