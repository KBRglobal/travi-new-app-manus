import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function PlanCartScreen() {
  const router = useRouter();
  const items = [{ label: 'Flight TLV → BCN', price: '€180' }, { label: 'Hotel Barcelona (7 nights)', price: '€840' }, { label: '3 Activities', price: '€120' }];
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Your Cart</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-4 pb-32">
        <View className="w-full max-w-md mx-auto">
          {items.map((item, i) => (
            <View key={i} className="flex-row justify-between py-4 border-b border-white/5">
              <Text className="text-white text-base">{item.label}</Text>
              <Text className="text-white text-base font-bold">{item.price}</Text>
            </View>
          ))}
          <View className="flex-row justify-between py-4 mt-2">
            <Text className="text-white text-lg font-bold">Total</Text>
            <Text className="text-primary text-lg font-bold">€1,140</Text>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-primary pt-4">
        <Pressable onPress={() => router.push('/(trip)/plan/checkout')} className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80">
          <Text className="text-white text-base font-semibold">Proceed to Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}
