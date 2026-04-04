import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function DNACelebrationModal() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="flask" size={24} color="#FFFFFF" />
      <Text className=" text-3xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Your Travel DNA!</Text>
      <Text className="text-[#6443F4] text-2xl font-[Satoshi-Bold] mb-4">Adventurous Foodie</Text>
      <Text className="/60 text-center mb-8" style={{ color: colors.text.primary }}>You love exploring new cuisines and seeking thrilling experiences. Your perfect trip combines street food tours with outdoor adventures.</Text>
      <View className="w-full mb-4">
        {[
          { trait: 'Adventure', score: 85 },
          { trait: 'Food', score: 95 },
          { trait: 'Culture', score: 72 },
        ].map(t => (
          <View key={t.trait} className="mb-3">
            <View className="flex-row justify-between mb-1">
              <Text className=" text-sm" style={{ color: colors.text.primary }}>{t.trait}</Text>
              <Text className="text-[#6443F4] text-sm font-[Satoshi-Bold]">{t.score}%</Text>
            </View>
            <View className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <View className="h-full bg-[#6443F4] rounded-full" style={{ width: `${t.score}%` }} />
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/home')} className="bg-[#6443F4] w-full py-4 rounded-2xl items-center mb-3">
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Start Exploring</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(trip)/profile/dna')}><Text className="text-[#6443F4]">View Full DNA Profile</Text></TouchableOpacity>
    </View>
  );
}
