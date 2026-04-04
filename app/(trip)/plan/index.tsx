import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function PlanSummaryScreen() {
  const router = useRouter();

  return (
    <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Trip Summary</Text>
      </View>
      <View className="mx-4 mb-4 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
        <Text className="text-white font-bold text-lg mb-1">🇯🇵 Tokyo, Japan</Text>
        <Text className="text-white/60 text-sm">Apr 15 - Apr 22, 2026 • 7 nights</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Bookings</Text>
        {[
          { iconName: 'airplane', title: 'Round-trip Flight', detail: 'NYC → TYO • Economy', price: '$890' },
          { iconName: 'bed', title: 'Hotel Shinjuku', detail: '7 nights • Deluxe Room', price: '$1,260' },
          { iconName: 'flag', title: 'Activities (3)', detail: 'Tea ceremony, Sushi class, Mt. Fuji', price: '$340' },
          { iconName: 'car', title: 'Airport Transfer', detail: 'Round-trip private car', price: '$120' },
        ].map(item => (
          <View key={item.title} className="flex-row items-center p-4 mb-2 bg-bg-secondary rounded-2xl border border-white/[0.08]">
            <Text className="text-2xl mr-3">{item.emoji}</Text>
            <View className="flex-1">
              <Text className="text-white font-bold">{item.title}</Text>
              <Text className="text-white/40 text-xs">{item.detail}</Text>
            </View>
            <Text className="text-white font-bold">{item.price}</Text>
          </View>
        ))}
      </View>
      <View className="mx-4 mb-4 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
        <View className="flex-row justify-between mb-2"><Text className="text-white/60">Subtotal</Text><Text className="text-white">$2,610</Text></View>
        <View className="flex-row justify-between mb-2"><Text className="text-white/60">Taxes & Fees</Text><Text className="text-white">$185</Text></View>
        <View className="flex-row justify-between mb-2"><Text className="text-green-400">Points Discount</Text><Text className="text-green-400">-$50</Text></View>
        <View className="h-px bg-white/[0.08] my-2" />
        <View className="flex-row justify-between"><Text className="text-white font-bold text-lg">Total</Text><Text className="text-white font-bold text-lg">$2,745</Text></View>
      </View>
      <View className="mx-4 mb-2 p-3 bg-primary/10 rounded-xl border border-primary/20">
        <Text className="text-primary text-sm text-center">You'll earn 274 points with this booking!</Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/(trip)/plan/payment')} className="mx-4 mb-8 bg-primary py-4 rounded-2xl items-center">
        <Text className="text-white font-bold text-lg">Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
