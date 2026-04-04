import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function PlanSummaryScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <ScreenHeader title="Trip Summary" />
      </View>
      <View className="mx-4 mb-4 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
        <Text className=" font-[Satoshi-Bold] text-lg mb-1" style={{ color: colors.text.primary }}>🇯🇵 Tokyo, Japan</Text>
        <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Apr 15 - Apr 22, 2026 • 7 nights</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Bookings</Text>
        {[
          { iconName: 'airplane', title: 'Round-trip Flight', detail: 'NYC → TYO • Economy', price: '$890' },
          { iconName: 'bed', title: 'Hotel Shinjuku', detail: '7 nights • Deluxe Room', price: '$1,260' },
          { iconName: 'flag', title: 'Activities (3)', detail: 'Tea ceremony, Sushi class, Mt. Fuji', price: '$340' },
          { iconName: 'car', title: 'Airport Transfer', detail: 'Round-trip private car', price: '$120' },
        ].map(item => (
          <View key={item.title} className="flex-row items-center p-4 mb-2 bg-[#120824] rounded-2xl border border-white/[0.08]">
            <Text className="text-2xl mr-3">{item.emoji}</Text>
            <View className="flex-1">
              <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.title}</Text>
              <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.detail}</Text>
            </View>
            <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.price}</Text>
          </View>
        ))}
      </View>
      <View className="mx-4 mb-4 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
        <View className="flex-row justify-between mb-2"><Text className="/60" style={{ color: colors.text.primary }}>Subtotal</Text><Text className="" style={{ color: colors.text.primary }}>$2,610</Text></View>
        <View className="flex-row justify-between mb-2"><Text className="/60" style={{ color: colors.text.primary }}>Taxes & Fees</Text><Text className="" style={{ color: colors.text.primary }}>$185</Text></View>
        <View className="flex-row justify-between mb-2"><Text className="text-green-400">Points Discount</Text><Text className="text-green-400">-$50</Text></View>
        <View className="h-px bg-white/[0.08] my-2" />
        <View className="flex-row justify-between"><Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Total</Text><Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>$2,745</Text></View>
      </View>
      <View className="mx-4 mb-2 p-3 bg-[#6443F4]/10 rounded-xl border border-[#6443F4]/20">
        <Text className="text-[#6443F4] text-sm text-center">You'll earn 274 points with this booking!</Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/(trip)/plan/payment')} className="mx-4 mb-8 bg-[#6443F4] py-4 rounded-2xl items-center">
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
