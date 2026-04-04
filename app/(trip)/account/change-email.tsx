import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function ChangeEmailScreen() {
  const router = useRouter();
  const [currentEmail] = useState('john@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="mail" size={24} color="#FFFFFF" />
      <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Verification Sent</Text>
      <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>We sent a verification link to {newEmail}. Please check your inbox.</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Change Email</Text>
      </View>
      <View className="px-4">
        <View className="mb-4 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
          <Text className="/40 text-xs" style={{ color: colors.text.primary }}>Current Email</Text>
          <Text className=" font-[Satoshi-Bold] mt-1" style={{ color: colors.text.primary }}>{currentEmail}</Text>
        </View>
        <View className="mb-4">
          <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>New Email</Text>
          <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={newEmail} onChangeText={setNewEmail} placeholder="Enter new email" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View className="mb-6">
          <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Password</Text>
          <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={password} onChangeText={setPassword} placeholder="Confirm your password" placeholderTextColor="rgba(255,255,255,0.3)" secureTextEntry />
        </View>
        <TouchableOpacity onPress={() => newEmail && password ? setSent(true) : null} className={`py-4 rounded-2xl items-center ${newEmail && password ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
          <Text className={`font-[Satoshi-Bold] ${newEmail && password ? 'text-white' : 'text-white/30'}`}>Update Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
