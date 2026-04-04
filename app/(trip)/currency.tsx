import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { exchangeRates } from '../../lib/mockData';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Currency</Text>
        <View className="w-12" />
      </View>

      {/* From */}
      <Animated.View entering={FadeInDown} className="bg-bg-card border border-border rounded-card p-4 mb-2">
        <Text className="text-text-muted text-caption mb-2">From</Text>
        <View className="flex-row items-center">
          <TextInput className="flex-1 text-white text-3xl font-bold" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
          <TouchableOpacity onPress={() => {}} className="bg-bg-surface px-4 py-2 rounded-full">
            <Text className="text-white text-body font-semibold">{fromCurrency}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Swap button */}
      <View className="items-center -my-3 z-10">
        <TouchableOpacity className="bg-primary w-12 h-12 rounded-full items-center justify-center" onPress={() => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); }}>
          <Text className="text-white text-xl">⇅</Text>
        </TouchableOpacity>
      </View>

      {/* To */}
      <Animated.View entering={FadeInDown.delay(100)} className="bg-bg-card border border-border rounded-card p-4 mb-6">
        <Text className="text-text-muted text-caption mb-2">To</Text>
        <View className="flex-row items-center">
          <Text className="flex-1 text-primary text-3xl font-bold">{converted}</Text>
          <TouchableOpacity onPress={() => {}} className="bg-bg-surface px-4 py-2 rounded-full">
            <Text className="text-white text-body font-semibold">{toCurrency}</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-text-muted text-caption mt-2">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</Text>
      </Animated.View>

      {/* Quick amounts */}
      <View className="flex-row gap-2 mb-6">
        {quickAmounts.map((a) => (
          <TouchableOpacity key={a} className="flex-1 bg-bg-card border border-border rounded-button py-3 items-center" onPress={() => setAmount(a.toString())}>
            <Text className="text-white text-body-sm">{a}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trip currencies */}
      <Text className="text-white text-heading-3 mb-3">Trip Currencies</Text>
      {currencies.map((c, i) => (
        <Animated.View key={c} entering={FadeInDown.delay(200 + i * 50)}>
          <TouchableOpacity className="flex-row bg-bg-card border border-border rounded-card p-3 mb-2 items-center" onPress={() => setToCurrency(c)}>
            <Text className="text-white text-body font-semibold flex-1">{c}</Text>
            <Text className="text-text-secondary text-body-sm">{(parseFloat(amount || '0') * (exchangeRates[`${fromCurrency}_${c}`] || 1)).toFixed(2)}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
