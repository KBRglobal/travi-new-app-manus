import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { exchangeRates } from '../../lib/mockData';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const quickAmounts = [10, 50, 100, 500];

export default function CurrencyScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('AED');

  const rate = exchangeRates[`${fromCurrency}_${toCurrency}`] || 4.05;
  const converted = (parseFloat(amount || '0') * rate).toFixed(2);

  const currencies = ['EUR', 'USD', 'GBP', 'ILS', 'AED', 'THB', 'JPY'];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
        <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Currency</Text>
        <View className="w-12" />
      </View>

      {/* From */}
      <Animated.View entering={FadeInDown} className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-2">
        <Text className="text-[rgba(255,255,255,0.3)] text-[12px] mb-2">From</Text>
        <View className="flex-row items-center">
          <TextInput className="flex-1  text-3xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }} keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
          <TouchableOpacity onPress={() => {}} className="bg-bg-surface px-4 py-2 rounded-full">
            <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{fromCurrency}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Swap button */}
      <View className="items-center -my-3 z-10">
        <TouchableOpacity className="bg-[#6443F4] w-12 h-12 rounded-full items-center justify-center" onPress={() => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); }}>
          <Text className=" text-xl" style={{ color: colors.text.primary }}>⇅</Text>
        </TouchableOpacity>
      </View>

      {/* To */}
      <Animated.View entering={FadeInDown.delay(100)} className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-6">
        <Text className="text-[rgba(255,255,255,0.3)] text-[12px] mb-2">To</Text>
        <View className="flex-row items-center">
          <Text className="flex-1 text-[#6443F4] text-3xl font-[Satoshi-Bold]">{converted}</Text>
          <TouchableOpacity onPress={() => {}} className="bg-bg-surface px-4 py-2 rounded-full">
            <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{toCurrency}</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-[rgba(255,255,255,0.3)] text-[12px] mt-2">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</Text>
      </Animated.View>

      {/* Quick amounts */}
      <View className="flex-row gap-2 mb-6">
        {quickAmounts.map((a) => (
          <TouchableOpacity key={a} className="flex-1 bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[12px] py-3 items-center" onPress={() => setAmount(a.toString())}>
            <Text className=" text-[13px]" style={{ color: colors.text.primary }}>{a}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trip currencies */}
      <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>Trip Currencies</Text>
      {currencies.map((c, i) => (
        <Animated.View key={c} entering={FadeInDown.delay(200 + i * 50)}>
          <TouchableOpacity className="flex-row bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-3 mb-2 items-center" onPress={() => setToCurrency(c)}>
            <Text className=" text-[15px] font-semibold flex-1" style={{ color: colors.text.primary }}>{c}</Text>
            <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{(parseFloat(amount || '0') * (exchangeRates[`${fromCurrency}_${c}`] || 1)).toFixed(2)}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
