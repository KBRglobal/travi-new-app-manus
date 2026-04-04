import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function PaymentScreen() {
  const router = useRouter();
  const [method, setMethod] = useState('card');
  const [useWallet, setUseWallet] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) router.replace('/(trip)/plan/confirmation');
      else router.replace('/(trip)/plan/payment-failed');
    }, 2000);
  };

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Payment</Text>
      </View>
      <View className="mx-4 mb-4 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
        <View className="flex-row justify-between"><Text className="text-white/60">Total</Text><Text className="text-white font-bold text-xl">$2,745</Text></View>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Payment Method</Text>
        {[
          { id: 'card', emoji: '💳', name: 'Credit Card', sub: '•••• 4242' },
          { id: 'apple', emoji: '🍎', name: 'Apple Pay', sub: '' },
          { id: 'google', emoji: '🔵', name: 'Google Pay', sub: '' },
        ].map(m => (
          <TouchableOpacity key={m.id} onPress={() => setMethod(m.id)} className={`flex-row items-center p-4 mb-2 rounded-2xl border ${method === m.id ? 'bg-primary/10 border-primary' : 'bg-bg-secondary border-white/[0.08]'}`}>
            <Text className="text-2xl mr-3">{m.emoji}</Text>
            <View className="flex-1"><Text className="text-white font-bold">{m.name}</Text>{m.sub ? <Text className="text-white/40 text-xs">{m.sub}</Text> : null}</View>
            {method === m.id && <Text className="text-primary">✓</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => setUseWallet(!useWallet)} className={`flex-row items-center mx-4 mb-6 p-4 rounded-2xl border ${useWallet ? 'bg-primary/10 border-primary' : 'bg-bg-secondary border-white/[0.08]'}`}>
        <Text className="text-2xl mr-3">👛</Text>
        <View className="flex-1"><Text className="text-white font-bold">Use Wallet Balance</Text><Text className="text-white/40 text-xs">Available: $142.50</Text></View>
        <Text className={useWallet ? 'text-primary' : 'text-white/20'}>{useWallet ? '✓' : '○'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePay} disabled={processing} className="mx-4 mb-8 bg-primary py-4 rounded-2xl items-center flex-row justify-center">
        {processing ? <ActivityIndicator color="white" className="mr-2" /> : null}
        <Text className="text-white font-bold text-lg">{processing ? 'Processing...' : 'Pay $2,745'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
