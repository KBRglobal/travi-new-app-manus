import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const EXPENSES = [
  { name: 'Hotel check-in', amount: 445, cat: 'bed', time: 'Today' },
  { name: 'Lunch at Souk', amount: 32, cat: 'restaurant', time: 'Today' },
  { name: 'Taxi to Mall', amount: 15, cat: 'car', time: 'Today' },
  { name: 'Museum tickets', amount: 25, cat: 'flag', time: 'Yesterday' },
];

export default function Expenses() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Expenses</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-[#120824] rounded-[16px] p-4 mb-2">
          <View className="flex-row justify-between mb-2">
            <Text className="text-[rgba(255,255,255,0.6)]">Budget: €1,500</Text>
            <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Spent: €847</Text>
            <Text className="text-[#6443F4] font-[Satoshi-Bold]">Left: €653</Text>
          </View>
          <View className="bg-bg-[#6443F4] rounded-full h-3 overflow-hidden">
            <View className="bg-[#6443F4] h-full rounded-full" style={{ width: '56%' }} />
          </View>
          <Text className="text-[rgba(255,255,255,0.3)] text-xs mt-1">56% used</Text>
        </View>
        <TouchableOpacity onPress={() => router.push(`/(live)/${tripId}/budget` as any)} className="mb-4">
          <Text className="text-[#6443F4] text-sm text-right font-semibold">Full Budget →</Text>
        </TouchableOpacity>

        <View className="bg-[#120824] rounded-[16px] p-4 mb-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-[rgba(255,255,255,0.6)]">1 EUR = 4.025 ILS</Text>
            <Text className="text-[rgba(255,255,255,0.6)]">1 EUR = 3.67 AED</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/(trip)/wallet/currency')} className="mb-4">
          <Text className="text-[#6443F4] text-sm text-right font-semibold">Currency Converter →</Text>
        </TouchableOpacity>

        <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Recent Expenses</Text>
        {EXPENSES.map((exp, i) => (
          <View key={i} className="bg-[#120824] rounded-[16px] p-4 mb-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-xl mr-3">{exp.cat}</Text>
              <View>
                <Text className=" font-semibold" style={{ color: colors.text.primary }}>{exp.name}</Text>
                <Text className="text-[rgba(255,255,255,0.3)] text-sm">{exp.time}</Text>
              </View>
            </View>
            <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>€{exp.amount}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity onPress={() => {}} className="absolute bottom-6 right-6 bg-[#6443F4] w-14 h-14 rounded-full items-center justify-center" style={{ elevation: 8 }}>
        <Text className=" text-2xl" style={{ color: colors.text.primary }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
