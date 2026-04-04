import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function TripSummary() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Trip Summary</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-[#120824] rounded-[16px] p-6 mb-4 items-center">
          <Text className=" text-2xl font-[Satoshi-Bold] mb-1" style={{ color: colors.text.primary }}>Dubai Adventure</Text>
          <Text className="text-[#6443F4] text-lg">April 10 - 17, 2026</Text>
          <Text className="text-yellow-400 text-lg mt-2">⭐⭐⭐⭐⭐</Text>
        </View>

        <View className="flex-row justify-around bg-[#120824] rounded-[16px] p-4 mb-4">
          {[['7', 'Days'], ['18', 'Activities'], ['€1,247', 'Spent'], ['142', 'Photos']].map(([num, label]) => (
            <View key={label} className="items-center">
              <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>{num}</Text>
              <Text className="text-[rgba(255,255,255,0.3)] text-sm">{label}</Text>
            </View>
          ))}
        </View>

        <View className="bg-[#120824] rounded-[16px] items-center justify-center mb-4" style={{ height: 150 }}>
          <Text className="text-[rgba(255,255,255,0.3)]">[ Countries Map ]</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/(trip)/profile/adventure-log')} className="bg-[#6443F4]/10 rounded-[16px] p-4 mb-4" style={{ borderWidth: 1, borderColor: '#6443F4' }}>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Your Journey So Far</Text>
              <Text className="text-[rgba(255,255,255,0.6)] mt-1">23 countries total · +1 new this trip</Text>
            </View>
            <Text className="text-[#6443F4] font-semibold">Adventure Log →</Text>
          </View>
        </TouchableOpacity>

        <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Highlights</Text>
        <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
          <Text className=" mb-2" style={{ color: colors.text.primary }}>Best moment: Desert Safari sunset</Text>
          <Text className=" mb-2" style={{ color: colors.text.primary }}>Most visited: Dubai Mall (3 times)</Text>
          <Text className="" style={{ color: colors.text.primary }}>Favorite food: Shawarma at Old Souk</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/(trip)/post/[tripId]/share' as any)} className="bg-[#6443F4] rounded-[12px] py-4 items-center mb-8">
          <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Share Trip Story →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
