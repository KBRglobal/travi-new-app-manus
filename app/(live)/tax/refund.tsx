import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TaxRefundScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Tax Refund</Text>
      </View>
      <View className="mx-4 mb-4 p-5 bg-primary/10 rounded-2xl border border-primary/20 items-center">
        <Text className="text-white/60 text-sm">Eligible Refund</Text>
        <Text className="text-primary text-3xl font-bold mt-1">¥2,300</Text>
        <Text className="text-white/40 text-sm mt-1">≈ $16.30 USD</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white font-bold mb-3">Eligible Purchases</Text>
        {[
          { store: 'Uniqlo Ginza', amount: '¥15,000', refund: '¥1,500' },
          { store: 'Don Quijote', amount: '¥8,000', refund: '¥800' },
        ].map(item => (
          <View key={item.store} className="flex-row items-center p-4 mb-2 bg-bg-secondary rounded-2xl border border-white/[0.08]">
            <View className="flex-1">
              <Text className="text-white font-bold">{item.store}</Text>
              <Text className="text-white/40 text-xs">Purchase: {item.amount}</Text>
            </View>
            <Text className="text-green-400 font-bold">{item.refund}</Text>
          </View>
        ))}
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white font-bold mb-3">How to Claim</Text>
        {[
          { step: '1', text: 'Keep all receipts with tax-free stamps' },
          { step: '2', text: 'Visit the Tax Refund counter at the airport' },
          { step: '3', text: 'Show your passport and receipts' },
          { step: '4', text: 'Receive refund in cash or to your card' },
        ].map(item => (
          <View key={item.step} className="flex-row items-start mb-3">
            <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-3 mt-0.5">
              <Text className="text-white text-xs font-bold">{item.step}</Text>
            </View>
            <Text className="text-white/80 text-sm flex-1">{item.text}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity className="mx-4 mb-8 bg-primary py-4 rounded-2xl items-center">
        <Text className="text-white font-bold">Export Tax Documents</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
