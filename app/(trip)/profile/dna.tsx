import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const DNA_TRAITS = [
  { trait: 'Adventure', score: 85, iconName: 'fitness', color: 'bg-orange-500' },
  { trait: 'Food & Dining', score: 95, iconName: 'restaurant', color: 'bg-red-500' },
  { trait: 'Culture', score: 72, iconName: 'business', color: 'bg-blue-500' },
  { trait: 'Nature', score: 80, iconName: 'leaf', color: 'bg-green-500' },
  { trait: 'Luxury', score: 45, iconName: 'diamond', color: 'bg-purple-500' },
  { trait: 'Social', score: 65, iconName: 'sparkles', color: 'bg-pink-500' },
  { trait: 'Wellness', score: 50, iconName: 'body', color: 'bg-teal-500' },
  { trait: 'Budget', score: 70, iconName: 'cash', color: 'bg-yellow-500' },
];

export default function DNAProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>My Travel DNA</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/dna-quiz')}><Text className="text-[#6443F4] text-sm">Retake</Text></TouchableOpacity>
      </View>
      <View className="items-center py-8">
        <View className="w-32 h-32 rounded-full bg-[#6443F4]/20 items-center justify-center mb-4">
          <Ionicons name="flask" size={24} color="#FFFFFF" />
        </View>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Adventurous Foodie</Text>
        <Text className="/60 text-sm mt-1" style={{ color: colors.text.primary }}>Your travel personality type</Text>
      </View>
      <View className="mx-4 mb-6">
        <Text className=" font-[Satoshi-Bold] text-lg mb-4" style={{ color: colors.text.primary }}>DNA Breakdown</Text>
        {DNA_TRAITS.map(item => (
          <View key={item.trait} className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Text className="text-xl mr-2">{item.emoji}</Text>
                <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.trait}</Text>
              </View>
              <Text className="text-[#6443F4] font-[Satoshi-Bold]">{item.score}%</Text>
            </View>
            <View className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <View className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
            </View>
          </View>
        ))}
      </View>
      <View className="mx-4 mb-8 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
        <Text className=" font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Top Destinations For You</Text>
        <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Based on your DNA, you'd love: 🇯🇵 Japan, 🇮🇹 Italy, 🇹🇭 Thailand</Text>
      </View>
    </ScrollView>
  );
}
