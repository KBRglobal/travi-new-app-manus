import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function ConnectFlowModal() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Hey! Want to travel together?');

  return (
    <View className="flex-1 bg-bg-primary pt-safe px-4">
      <View className="flex-row items-center justify-between py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white/60">Cancel</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold">Connect</Text>
        <View className="w-12" />
      </View>
      {step === 1 ? (
        <View className="items-center py-8">
          <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-4"><Text className="text-4xl">🤝</Text></View>
          <Text className="text-white text-xl font-bold mb-2">Connect with Sarah</Text>
          <Text className="text-white/60 text-center mb-6">85% travel compatibility match!</Text>
          <TextInput className="w-full bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08] mb-4" value={message} onChangeText={setMessage} multiline />
          <TouchableOpacity onPress={() => setStep(2)} className="bg-primary w-full py-4 rounded-2xl items-center">
            <Text className="text-white font-bold">Send Connection Request</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center py-12">
          <Text className="text-5xl mb-4">✅</Text>
          <Text className="text-white text-xl font-bold mb-2">Request Sent!</Text>
          <Text className="text-white/60 text-center mb-6">Sarah will be notified. You'll get a notification when she responds.</Text>
          <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
}
