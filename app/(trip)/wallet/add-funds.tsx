import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const AMOUNTS = [10, 25, 50, 100, 250, 500];

export default function AddFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [method, setMethod] = useState('');
  const [success, setSuccess] = useState(false);

  const methods = [
    { id: 'card', emoji: '💳', name: 'Credit/Debit Card', last4: '4242' },
    { id: 'apple', emoji: '🍎', name: 'Apple Pay', last4: '' },
    { id: 'google', emoji: '🔵', name: 'Google Pay', last4: '' },
    { id: 'paypal', emoji: '🅿️', name: 'PayPal', last4: 'john@...' },
  ];

  if (success) return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-5xl mb-4">✅</Text>
      <Text className="text-white text-2xl font-bold mb-2">Funds Added!</Text>
      <Text className="text-white/60 text-center mb-6">${amount || customAmount} has been added to your wallet.</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Add Funds</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Select Amount</Text>
        <View className="flex-row flex-wrap">
          {AMOUNTS.map(a => (
            <TouchableOpacity key={a} onPress={() => { setAmount(a); setCustomAmount(''); }} className={`w-[31%] py-4 rounded-xl m-[1%] items-center ${amount === a ? 'bg-primary' : 'bg-bg-secondary border border-white/[0.08]'}`}>
              <Text className={`font-bold text-lg ${amount === a ? 'text-white' : 'text-white/60'}`}>${a}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08] mt-3 text-center text-lg" value={customAmount} onChangeText={(t) => { setCustomAmount(t); setAmount(0); }} placeholder="Custom amount" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="numeric" />
      </View>
      <View className="mx-4 mb-6">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Payment Method</Text>
        {methods.map(m => (
          <TouchableOpacity key={m.id} onPress={() => setMethod(m.id)} className={`flex-row items-center p-4 mb-2 rounded-2xl border ${method === m.id ? 'bg-primary/10 border-primary' : 'bg-bg-secondary border-white/[0.08]'}`}>
            <Text className="text-2xl mr-3">{m.emoji}</Text>
            <View className="flex-1">
              <Text className="text-white font-bold">{m.name}</Text>
              {m.last4 ? <Text className="text-white/40 text-xs">{m.last4}</Text> : null}
            </View>
            {method === m.id && <Text className="text-primary">✓</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => (amount > 0 || customAmount) && method ? setSuccess(true) : null} className={`mx-4 mb-8 py-4 rounded-2xl items-center ${(amount > 0 || customAmount) && method ? 'bg-primary' : 'bg-white/[0.05]'}`}>
        <Text className={`font-bold text-lg ${(amount > 0 || customAmount) && method ? 'text-white' : 'text-white/30'}`}>Add ${amount || customAmount || '0'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
