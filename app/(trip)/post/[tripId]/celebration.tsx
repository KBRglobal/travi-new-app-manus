import { View, Text, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function CelebrationScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-6">
      <Ionicons name="sparkles" size={24} color="#FFFFFF" />
      <Text className="text-3xl md:text-4xl font-bold text-white mt-6 text-center">Trip Complete!</Text>
      <Text className="text-text-secondary text-sm md:text-base mt-2 text-center">What an amazing adventure</Text>
      <Pressable onPress={() => router.replace(`/(trip)/post/${tripId}/summary`)} className="w-full max-w-md h-14 bg-primary rounded-button items-center justify-center mt-8 active:opacity-80">
        <Text className="text-white text-base font-semibold">See Summary</Text>
      </Pressable>
    </View>
  );
}
