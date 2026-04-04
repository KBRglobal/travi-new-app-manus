import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const QUICK_AMOUNTS = [10, 20, 50, 100, 200];
const TRIP_CURRENCIES = [
  { code: 'AED', flag: '🇦🇪', name: 'UAE Dirham' },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { code: 'JPY', flag: '🇯🇵', name: 'Japanese Yen' },
];

export default function CurrencyConverter() {
  const router = useRouter();
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('ILS');
  const rate = 4.025;
  const result = (parseFloat(amount || '0') * rate).toFixed(2);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Currency Converter</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-[#120824] rounded-[16px] p-6 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-2xl mr-2">🇪🇺</Text>
              <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>{fromCurrency}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); }}>
              <Text className="text-[#6443F4] text-2xl">↕</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} className="flex-row items-center">
              <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>{toCurrency}</Text>
              <Text className="text-2xl ml-2">🇮🇱</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            className=" text-4xl font-[Satoshi-Bold] text-center mb-2" style={{ color: colors.text.primary }}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.3)"
          />

          <Text className="text-[#6443F4] text-3xl font-[Satoshi-Bold] text-center mb-2">₪ {result}</Text>
          <Text className="text-[rgba(255,255,255,0.6)] text-center">1 {fromCurrency} = {rate} {toCurrency} · Updated 5m ago</Text>
        </View>

        <Text className="text-[rgba(255,255,255,0.6)] mb-2">Quick amounts</Text>
        <View className="flex-row mb-6">
          {QUICK_AMOUNTS.map(a => (
            <TouchableOpacity key={a} onPress={() => setAmount(String(a))} className="bg-[#120824] px-4 py-2 rounded-full mr-2" style={{ borderWidth: 1, borderColor: amount === String(a) ? '#6443F4' : 'rgba(255,255,255,0.1)' }}>
              <Text className={amount === String(a) ? 'text-[#6443F4] font-[Satoshi-Bold]' : 'text-[rgba(255,255,255,0.6)]'}>€{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>My Trip Currencies</Text>
        {TRIP_CURRENCIES.map(c => (
          <TouchableOpacity key={c.code} onPress={() => setToCurrency(c.code)} className="bg-[#120824] rounded-[16px] p-4 mb-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">{c.flag}</Text>
              <View>
                <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{c.code}</Text>
                <Text className="text-[rgba(255,255,255,0.3)] text-sm">{c.name}</Text>
              </View>
            </View>
            <Text className="text-[#6443F4]">Select</Text>
          </TouchableOpacity>
        ))}

        <View className="bg-[#120824] rounded-[16px] items-center justify-center my-4" style={{ height: 150 }}>
          <Text className="text-[rgba(255,255,255,0.3)]">[ 30-day Rate Chart ]</Text>
        </View>

        <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] rounded-[12px] py-4 items-center mb-8">
          <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Add to Expenses</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
