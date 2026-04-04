import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const STATUS_COLORS: Record<string, string> = {
  'On Time': '#22C55E', 'Delayed': '#F59E0B', 'Boarding': '#3B82F6',
  'Departed': '#8B5CF6', 'Landed': '#22C55E', 'Cancelled': '#EF4444',
};

export default function FlightStatusLive() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const status = 'On Time';

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>Flight Status</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>EK001 · Dubai → London</Text>

        <View className="rounded-[16px] p-4 mb-4 items-center" style={{ backgroundColor: STATUS_COLORS[status] + '20', borderWidth: 1, borderColor: STATUS_COLORS[status] }}>
          <Text style={{ color: STATUS_COLORS[status] }} className="text-xl font-[Satoshi-Bold]">{status}</Text>
        </View>

        <View className="bg-[#120824] rounded-[16px] p-4 mb-4" style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Text className="text-[rgba(255,255,255,0.3)]">[ Live Flight Map ]</Text>
          <Text className="text-[rgba(255,255,255,0.3)] text-xs mt-2">Dark map with route line + plane icon</Text>
        </View>

        <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
          <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Flight Info</Text>
          {[
            ['Gate', 'B14'], ['Terminal', 'T3'], ['Scheduled', '07:30'],
            ['Actual', '07:30'], ['Duration', '8h 15m remaining'],
            ['Altitude', '38,000 ft'], ['Speed', '890 km/h'],
          ].map(([label, value]) => (
            <View key={label} className="flex-row justify-between py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
              <Text className="text-[rgba(255,255,255,0.6)]">{label}</Text>
              <Text className=" font-semibold" style={{ color: colors.text.primary }}>{value}</Text>
            </View>
          ))}
        </View>

        <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
          <Text className=" font-[Satoshi-Bold] mb-3" style={{ color: colors.text.primary }}>Timeline</Text>
          {['Scheduled', 'Boarding', 'Departed', 'Landing'].map((step, i) => (
            <View key={step} className="flex-row items-center mb-3">
              <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: i <= 0 ? '#22C55E' : 'rgba(255,255,255,0.1)' }}>
                <Text className=" text-xs" style={{ color: colors.text.primary }}>{i + 1}</Text>
              </View>
              <Text className={i <= 0 ? 'text-white font-semibold' : 'text-[rgba(255,255,255,0.3)]'}>{step}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row mb-8">
          <TouchableOpacity onPress={() => {}} className="flex-1 bg-[#6443F4] rounded-[12px] py-3 items-center mr-2">
            <Text className=" font-semibold" style={{ color: colors.text.primary }}>Add to Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} className="flex-1 bg-[#120824] rounded-[12px] py-3 items-center ml-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
            <Text className=" font-semibold" style={{ color: colors.text.primary }}>Share Status</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
