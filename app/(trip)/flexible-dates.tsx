import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, FlatList} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

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
    if (ratio < 0.3) return 'bg-status-success';
    if (ratio < 0.6) return 'bg-status-warning';
    return 'bg-status-error';
  };

  return (
    <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Flexible Dates</Text>
        <View className="w-12" />
      </View>

      {/* Trip length selector */}
      <View className="flex-row mb-4">
        {([3, 5, 7] as const).map((d) => (
          <TouchableOpacity key={d} className={`flex-1 py-3 rounded-button mr-2 items-center ${tripLength === d ? 'bg-primary' : 'bg-bg-card border border-border'}`} onPress={() => setTripLength(d)}>
            <Text className={`text-body-sm font-semibold ${tripLength === d ? 'text-white' : 'text-text-secondary'}`}>{d} nights</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nearby airports toggle */}
      <View className="flex-row items-center justify-between bg-bg-card border border-border rounded-card p-4 mb-6">
        <Text className="text-white text-body">Include nearby airports</Text>
        <Switch value={nearbyAirports} onValueChange={setNearbyAirports} trackColor={{ true: '#6443F4' }} />
      </View>

      {/* Legend */}
      <View className="flex-row items-center mb-4">
        <View className="flex-row items-center mr-4"><View className="w-3 h-3 bg-status-success rounded-sm mr-1" /><Text className="text-text-muted text-caption">Cheap</Text></View>
        <View className="flex-row items-center mr-4"><View className="w-3 h-3 bg-status-warning rounded-sm mr-1" /><Text className="text-text-muted text-caption">Average</Text></View>
        <View className="flex-row items-center"><View className="w-3 h-3 bg-status-error rounded-sm mr-1" /><Text className="text-text-muted text-caption">Expensive</Text></View>
      </View>

      {/* Price grid */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {priceData.map((d, i) => (
          <Animated.View key={d.month} entering={FadeInDown.delay(i * 50)}>
            <TouchableOpacity className={`w-[30%] ${getColor(d.price)} rounded-card p-4 items-center`} onPress={() => router.push('/(trip)/dates')}>
              <Text className="text-white text-body-sm font-semibold">{d.month}</Text>
              <Text className="text-white text-heading-3 font-bold">€{d.price}</Text>
              {d.cheapest && <Text className="text-white text-caption mt-1">Best</Text>}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Best deal */}
      <TouchableOpacity className="bg-status-success/20 border border-status-success rounded-card p-4" onPress={() => router.push('/(trip)/flights')}>
        <Text className="text-status-success text-body font-bold mb-1">Best Deal Found!</Text>
        <Text className="text-white text-body">Feb 15-22 · €{cheapest} round trip</Text>
        <Text className="text-text-secondary text-body-sm mt-1">Save €{expensive - cheapest} compared to peak season</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
