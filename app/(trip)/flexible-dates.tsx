import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const priceData = months.map((m, i) => ({ month: m, price: Math.floor(80 + Math.random() * 200), cheapest: i === 1 || i === 10 }));

export default function FlexibleDatesScreen() {
  const router = useRouter();
  const [nearbyAirports, setNearbyAirports] = useState(false);
  const [tripLength, setTripLength] = useState<3 | 5 | 7>(7);
  const cheapest = Math.min(...priceData.map((d) => d.price));
  const expensive = Math.max(...priceData.map((d) => d.price));

  const getColor = (price: number) => {
    const ratio = (price - cheapest) / (expensive - cheapest);
    if (ratio < 0.3) return 'bg-[#4ADE80]';
    if (ratio < 0.6) return 'bg-[#FBBF24]';
    return 'bg-[#F87171]';
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
        <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Flexible Dates</Text>
        <View className="w-12" />
      </View>

      {/* Trip length selector */}
      <View className="flex-row mb-4">
        {([3, 5, 7] as const).map((d) => (
          <TouchableOpacity key={d} className={`flex-1 py-3 rounded-[12px] mr-2 items-center ${tripLength === d ? 'bg-[#6443F4]' : 'bg-[#120824] border border-[rgba(255,255,255,0.08)]'}`} onPress={() => setTripLength(d)}>
            <Text className={`text-[13px] font-semibold ${tripLength === d ? 'text-white' : 'text-[rgba(255,255,255,0.6)]'}`}>{d} nights</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nearby airports toggle */}
      <View className="flex-row items-center justify-between bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-6">
        <Text className=" text-[15px]" style={{ color: colors.text.primary }}>Include nearby airports</Text>
        <Switch value={nearbyAirports} onValueChange={setNearbyAirports} trackColor={{ true: '#6443F4' }} />
      </View>

      {/* Legend */}
      <View className="flex-row items-center mb-4">
        <View className="flex-row items-center mr-4"><View className="w-3 h-3 bg-[#4ADE80] rounded-sm mr-1" /><Text className="text-[rgba(255,255,255,0.3)] text-[12px]">Cheap</Text></View>
        <View className="flex-row items-center mr-4"><View className="w-3 h-3 bg-[#FBBF24] rounded-sm mr-1" /><Text className="text-[rgba(255,255,255,0.3)] text-[12px]">Average</Text></View>
        <View className="flex-row items-center"><View className="w-3 h-3 bg-[#F87171] rounded-sm mr-1" /><Text className="text-[rgba(255,255,255,0.3)] text-[12px]">Expensive</Text></View>
      </View>

      {/* Price grid */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {priceData.map((d, i) => (
          <Animated.View key={d.month} entering={FadeInDown.delay(i * 50)}>
            <TouchableOpacity className={`w-[30%] ${getColor(d.price)} rounded-[16px] p-4 items-center`} onPress={() => router.push('/(trip)/dates')}>
              <Text className=" text-[13px] font-semibold" style={{ color: colors.text.primary }}>{d.month}</Text>
              <Text className=" text-[18px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>€{d.price}</Text>
              {d.cheapest && <Text className=" text-[12px] mt-1" style={{ color: colors.text.primary }}>Best</Text>}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Best deal */}
      <TouchableOpacity className="bg-[#4ADE80]/20 border border-status-success rounded-[16px] p-4" onPress={() => router.push('/(trip)/flights')}>
        <Text className="text-[#4ADE80] text-[15px] font-[Satoshi-Bold] mb-1">Best Deal Found!</Text>
        <Text className=" text-[15px]" style={{ color: colors.text.primary }}>Feb 15-22 · €{cheapest} round trip</Text>
        <Text className="text-[rgba(255,255,255,0.6)] text-[13px] mt-1">Save €{expensive - cheapest} compared to peak season</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
