import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function ChangeEmailScreen() {
  const router = useRouter();
  const [currentEmail] = useState('john@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Ionicons name="mail" size={24} color="#FFFFFF" />
      <Text className="text-white text-2xl font-bold mb-2">Verification Sent</Text>
      <Text className="text-white/60 text-center mb-6">We sent a verification link to {newEmail}. Please check your inbox.</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Change Email</Text>
      </View>
      <View className="px-4">
        <View className="mb-4 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-white/40 text-xs">Current Email</Text>
          <Text className="text-white font-bold mt-1">{currentEmail}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">New Email</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={newEmail} onChangeText={setNewEmail} placeholder="Enter new email" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View className="mb-6">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Password</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={password} onChangeText={setPassword} placeholder="Confirm your password" placeholderTextColor="rgba(255,255,255,0.3)" secureTextEntry />
        </View>
        <TouchableOpacity onPress={() => newEmail && password ? setSent(true) : null} className={`py-4 rounded-2xl items-center ${newEmail && password ? 'bg-primary' : 'bg-white/[0.05]'}`}>
          <Text className={`font-bold ${newEmail && password ? 'text-white' : 'text-white/30'}`}>Update Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
