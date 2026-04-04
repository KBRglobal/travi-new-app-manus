import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const categories = [
  { name: 'Flights', spent: 480, budget: 500, emoji: '✈️', color: 'bg-primary' },
  { name: 'Hotels', spent: 620, budget: 700, emoji: '🏨', color: 'bg-pink' },
  { name: 'Food', spent: 180, budget: 300, emoji: '🍽️', color: 'bg-status-success' },
  { name: 'Activities', spent: 150, budget: 200, emoji: '🎯', color: 'bg-status-warning' },
  { name: 'Transport', spent: 85, budget: 100, emoji: '🚕', color: 'bg-trip-adventure' },
  { name: 'Shopping', spent: 120, budget: 150, emoji: '🛍️', color: 'bg-trip-culture' },
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
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Budget</Text>
        <View className="w-12" />
      </View>

      {/* Total overview */}
      <Animated.View entering={FadeInDown} className="bg-bg-card border border-border rounded-card p-6 mb-6 items-center">
        <Text className="text-text-muted text-body-sm">Total Spent</Text>
        <Text className="text-white text-4xl font-bold">€{totalSpent}</Text>
        <Text className="text-text-secondary text-body-sm">of €{totalBudget} budget</Text>
        <View className="w-full h-3 bg-bg-surface rounded-full mt-4">
          <View className="h-full bg-primary rounded-full" style={{ width: `${(totalSpent / totalBudget) * 100}%` }} />
        </View>
        <Text className="text-status-success text-body-sm mt-2">€{totalBudget - totalSpent} remaining</Text>
      </Animated.View>

      {/* Daily chart */}
      <Text className="text-white text-heading-3 mb-3">Daily Spending</Text>
      <View className="flex-row items-end h-32 bg-bg-card border border-border rounded-card p-4 mb-6">
        {dailySpending.map((d) => (
          <View key={d.day} className="flex-1 items-center">
            <View className="bg-primary rounded-t-sm w-6" style={{ height: `${(d.amount / maxDaily) * 100}%` }} />
            <Text className="text-text-muted text-caption mt-1">{d.day}</Text>
          </View>
        ))}
      </View>

      {/* Category breakdown */}
      <Text className="text-white text-heading-3 mb-3">By Category</Text>
      {categories.map((cat, i) => (
        <Animated.View key={cat.name} entering={FadeInDown.delay(i * 80)}>
          <View className="bg-bg-card border border-border rounded-card p-4 mb-2">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Text className="text-xl mr-2">{cat.emoji}</Text>
                <Text className="text-white text-body font-semibold">{cat.name}</Text>
              </View>
              <Text className="text-white text-body font-bold">€{cat.spent} <Text className="text-text-muted font-normal">/ €{cat.budget}</Text></Text>
            </View>
            <View className="h-2 bg-bg-surface rounded-full">
              <View className={`h-full ${cat.color} rounded-full`} style={{ width: `${Math.min((cat.spent / cat.budget) * 100, 100)}%` }} />
            </View>
          </View>
        </Animated.View>
      ))}

      {/* Split summary */}
      <TouchableOpacity className="bg-bg-card border border-border rounded-card p-4 mt-4" onPress={() => router.push('/(trip)/split-pay')}>
        <Text className="text-white text-heading-3 mb-2">Split Summary</Text>
        <Text className="text-text-secondary text-body-sm">You owe: €45 · Others owe you: €120</Text>
        <Text className="text-primary text-body-sm font-semibold mt-1">View details →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
