import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);

  const isValid = current.length >= 6 && newPass.length >= 8 && newPass === confirm;

  if (done) return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-5xl mb-4">🔒</Text>
      <Text className="text-white text-2xl font-bold mb-2">Password Updated</Text>
      <Text className="text-white/60 text-center mb-6">Your password has been changed successfully.</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Change Password</Text>
      </View>
      <View className="px-4">
        <View className="mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Current Password</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={current} onChangeText={setCurrent} secureTextEntry placeholder="Enter current password" placeholderTextColor="rgba(255,255,255,0.3)" />
        </View>
        <View className="mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">New Password</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={newPass} onChangeText={setNewPass} secureTextEntry placeholder="Min 8 characters" placeholderTextColor="rgba(255,255,255,0.3)" />
          {newPass.length > 0 && newPass.length < 8 && <Text className="text-red-400 text-xs mt-1 ml-1">Must be at least 8 characters</Text>}
        </View>
        <View className="mb-6">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Confirm New Password</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={confirm} onChangeText={setConfirm} secureTextEntry placeholder="Repeat new password" placeholderTextColor="rgba(255,255,255,0.3)" />
          {confirm.length > 0 && newPass !== confirm && <Text className="text-red-400 text-xs mt-1 ml-1">Passwords don't match</Text>}
        </View>
        <TouchableOpacity onPress={() => isValid ? setDone(true) : null} className={`py-4 rounded-2xl items-center ${isValid ? 'bg-primary' : 'bg-white/[0.05]'}`}>
          <Text className={`font-bold ${isValid ? 'text-white' : 'text-white/30'}`}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
