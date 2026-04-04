import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const categories = [
  { name: 'Flights', spent: 480, budget: 500, iconName: 'airplane', color: 'bg-[#6443F4]' },
  { name: 'Hotels', spent: 620, budget: 700, iconName: 'bed', color: 'bg-pink' },
  { name: 'Food', spent: 180, budget: 300, iconName: 'restaurant', color: 'bg-[#4ADE80]' },
  { name: 'Activities', spent: 150, budget: 200, iconName: 'flag', color: 'bg-[#FBBF24]' },
  { name: 'Transport', spent: 85, budget: 100, iconName: 'car', color: 'bg-trip-adventure' },
  { name: 'Shopping', spent: 120, budget: 150, iconName: 'bag', color: 'bg-trip-culture' },
];

const dailySpending = [
  { day: 'Mon', amount: 120 }, { day: 'Tue', amount: 85 }, { day: 'Wed', amount: 200 },
  { day: 'Thu', amount: 65 }, { day: 'Fri', amount: 150 }, { day: 'Sat', amount: 95 }, { day: 'Sun', amount: 0 },
];

export default function BudgetManagerScreen() {
  const router = useRouter();
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0);
  const totalBudget = categories.reduce((s, c) => s + c.budget, 0);
  const maxDaily = Math.max(...dailySpending.map((d) => d.amount));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
        <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Budget</Text>
        <View className="w-12" />
      </View>

      {/* Total overview */}
      <Animated.View entering={FadeInDown} className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 mb-6 items-center">
        <Text className="text-[rgba(255,255,255,0.3)] text-[13px]">Total Spent</Text>
        <Text className=" text-4xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>€{totalSpent}</Text>
        <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">of €{totalBudget} budget</Text>
        <View className="w-full h-3 bg-bg-surface rounded-full mt-4">
          <View className="h-full bg-[#6443F4] rounded-full" style={{ width: `${(totalSpent / totalBudget) * 100}%` }} />
        </View>
        <Text className="text-[#4ADE80] text-[13px] mt-2">€{totalBudget - totalSpent} remaining</Text>
      </Animated.View>

      {/* Daily chart */}
      <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>Daily Spending</Text>
      <View className="flex-row items-end h-32 bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-6">
        {dailySpending.map((d) => (
          <View key={d.day} className="flex-1 items-center">
            <View className="bg-[#6443F4] rounded-t-sm w-6" style={{ height: `${(d.amount / maxDaily) * 100}%` }} />
            <Text className="text-[rgba(255,255,255,0.3)] text-[12px] mt-1">{d.day}</Text>
          </View>
        ))}
      </View>

      {/* Category breakdown */}
      <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>By Category</Text>
      {categories.map((cat, i) => (
        <Animated.View key={cat.name} entering={FadeInDown.delay(i * 80)}>
          <View className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-2">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Text className="text-xl mr-2">{cat.emoji}</Text>
                <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{cat.name}</Text>
              </View>
              <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>€{cat.spent} <Text className="text-[rgba(255,255,255,0.3)] font-normal">/ €{cat.budget}</Text></Text>
            </View>
            <View className="h-2 bg-bg-surface rounded-full">
              <View className={`h-full ${cat.color} rounded-full`} style={{ width: `${Math.min((cat.spent / cat.budget) * 100, 100)}%` }} />
            </View>
          </View>
        </Animated.View>
      ))}

      {/* Split summary */}
      <TouchableOpacity className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mt-4" onPress={() => router.push('/(trip)/split-pay')}>
        <Text className=" text-[18px] mb-2" style={{ color: colors.text.primary }}>Split Summary</Text>
        <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">You owe: €45 · Others owe you: €120</Text>
        <Text className="text-[#6443F4] text-[13px] font-semibold mt-1">View details →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
