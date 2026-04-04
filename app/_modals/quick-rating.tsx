import { haptic } from '@/lib/haptics';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function QuickRatingModal() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  return (
    <View className="flex-1 bg-bg-primary justify-end">
      <View className="bg-bg-card rounded-t-3xl px-6 md:px-12 pt-6 pb-safe">
        <View className="w-10 h-1 bg-white/20 rounded-full self-center mb-6" />
        <Text className="text-white text-xl font-bold text-center">Rate this experience</Text>
        <View className="flex-row justify-center gap-4 mt-6">
          {[1,2,3,4,5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <Text className={`text-3xl ${star <= rating ? 'opacity-100' : 'opacity-30'}`}>⭐</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={() => router.back()} className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center mt-8 active:opacity-80">
          <Text className="text-white text-base font-semibold">Submit</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} className="mt-4 py-3 items-center">
          <Text className="text-text-secondary text-sm">Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}
