import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function PlanPaymentScreen() {
  const router = useRouter();
  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) router.replace('/(trip)/plan/confirmation');
      else router.replace('/(trip)/plan/payment-failed');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <Text className="text-5xl">💳</Text>
      <Text className="text-white text-xl font-bold mt-6">Processing Payment...</Text>
      <Text className="text-text-secondary text-sm mt-2">Please wait</Text>
      <View className="flex-row gap-2 mt-8">
        <View className="w-2 h-2 rounded-full bg-primary" />
        <View className="w-2 h-2 rounded-full bg-primary opacity-60" />
        <View className="w-2 h-2 rounded-full bg-primary opacity-30" />
      </View>
    </View>
  );
}
