import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function PlanDatesScreen() {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Select Dates</Text>
      </View>
      <View className="flex-1 items-center justify-center px-4 md:px-6">
        <View className="w-full max-w-md">
          <Text className="text-text-secondary text-sm mb-2">Calendar placeholder</Text>
          <View className="w-full h-64 bg-white/5 rounded-card items-center justify-center border border-white/10">
            <Text className="text-4xl">📅</Text>
            <Text className="text-text-secondary text-sm mt-2">Select your travel dates</Text>
          </View>
          <View className="flex-row gap-3 mt-4">
            <Pressable onPress={() => setStartDate('Apr 10')} className="flex-1 h-13 bg-white/5 border border-white/10 rounded-input items-center justify-center">
              <Text className="text-white text-sm">{startDate || 'Start Date'}</Text>
            </Pressable>
            <Pressable onPress={() => setEndDate('Apr 17')} className="flex-1 h-13 bg-white/5 border border-white/10 rounded-input items-center justify-center">
              <Text className="text-white text-sm">{endDate || 'End Date'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View className="px-4 md:px-6 pb-safe mb-4">
        <Pressable onPress={() => router.push('/(trip)/plan/flights')} className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80">
          <Text className="text-white text-base font-semibold">Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}
