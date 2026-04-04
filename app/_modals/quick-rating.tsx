import { haptic } from '@/lib/haptics';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function QuickRatingModal() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} justify-end">
      <View className="bg-[#120824] rounded-t-3xl px-6 md:px-12 pt-6 pb-safe">
        <View className="w-10 h-1 bg-white/20 rounded-full self-center mb-6" />
        <Text className=" text-xl font-[Satoshi-Bold] text-center" style={{ color: colors.text.primary }}>Rate this experience</Text>
        <View className="flex-row justify-center gap-4 mt-6">
          {[1,2,3,4,5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <Text className={`text-3xl ${star <= rating ? 'opacity-100' : 'opacity-30'}`}><Ionicons name="star" size={16} color="#FFFFFF" /></Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={() => router.back()} className="w-full max-w-md mx-auto h-14 bg-[#6443F4] rounded-[12px] items-center justify-center mt-8 active:opacity-80">
          <Text className=" text-base font-semibold" style={{ color: colors.text.primary }}>Submit</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} className="mt-4 py-3 items-center">
          <Text className="text-[rgba(255,255,255,0.6)] text-sm">Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}
