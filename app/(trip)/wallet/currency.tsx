import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

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
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Currency Converter</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-bg-card rounded-card p-6 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-2xl mr-2">🇪🇺</Text>
              <Text className="text-white font-bold text-lg">{fromCurrency}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); }}>
              <Text className="text-primary text-2xl">↕</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-white font-bold text-lg">{toCurrency}</Text>
              <Text className="text-2xl ml-2">🇮🇱</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            className="text-white text-4xl font-bold text-center mb-2"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.3)"
          />

          <Text className="text-primary text-3xl font-bold text-center mb-2">₪ {result}</Text>
          <Text className="text-text-secondary text-center">1 {fromCurrency} = {rate} {toCurrency} · Updated 5m ago</Text>
        </View>

        <Text className="text-text-secondary mb-2">Quick amounts</Text>
        <View className="flex-row mb-6">
          {QUICK_AMOUNTS.map(a => (
            <TouchableOpacity key={a} onPress={() => setAmount(String(a))} className="bg-bg-card px-4 py-2 rounded-pill mr-2" style={{ borderWidth: 1, borderColor: amount === String(a) ? '#6443F4' : 'rgba(255,255,255,0.1)' }}>
              <Text className={amount === String(a) ? 'text-primary font-bold' : 'text-text-secondary'}>€{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-white font-bold text-lg mb-3">My Trip Currencies</Text>
        {TRIP_CURRENCIES.map(c => (
          <TouchableOpacity key={c.code} onPress={() => setToCurrency(c.code)} className="bg-bg-card rounded-card p-4 mb-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">{c.flag}</Text>
              <View>
                <Text className="text-white font-bold">{c.code}</Text>
                <Text className="text-text-muted text-sm">{c.name}</Text>
              </View>
            </View>
            <Text className="text-primary">Select</Text>
          </TouchableOpacity>
        ))}

        <View className="bg-bg-card rounded-card items-center justify-center my-4" style={{ height: 150 }}>
          <Text className="text-text-muted">[ 30-day Rate Chart ]</Text>
        </View>

        <TouchableOpacity onPress={() => router.back()} className="bg-primary rounded-button py-4 items-center mb-8">
          <Text className="text-white font-bold text-lg">Add to Expenses</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
