import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);

  const isValid = current.length >= 6 && newPass.length >= 8 && newPass === confirm;

  if (done) return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="lock-closed" size={24} color="#FFFFFF" />
      <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Password Updated</Text>
      <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>Your password has been changed successfully.</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Change Password</Text>
      </View>
      <View className="px-4">
        <View className="mb-4">
          <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Current Password</Text>
          <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={current} onChangeText={setCurrent} secureTextEntry placeholder="Enter current password" placeholderTextColor="rgba(255,255,255,0.3)" />
        </View>
        <View className="mb-4">
          <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>New Password</Text>
          <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={newPass} onChangeText={setNewPass} secureTextEntry placeholder="Min 8 characters" placeholderTextColor="rgba(255,255,255,0.3)" />
          {newPass.length > 0 && newPass.length < 8 && <Text className="text-red-400 text-xs mt-1 ml-1">Must be at least 8 characters</Text>}
        </View>
        <View className="mb-6">
          <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Confirm New Password</Text>
          <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={confirm} onChangeText={setConfirm} secureTextEntry placeholder="Repeat new password" placeholderTextColor="rgba(255,255,255,0.3)" />
          {confirm.length > 0 && newPass !== confirm && <Text className="text-red-400 text-xs mt-1 ml-1">Passwords don't match</Text>}
        </View>
        <TouchableOpacity onPress={() => isValid ? setDone(true) : null} className={`py-4 rounded-2xl items-center ${isValid ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
          <Text className={`font-[Satoshi-Bold] ${isValid ? 'text-white' : 'text-white/30'}`}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
