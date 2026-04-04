import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [step, setStep] = useState(1);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Delete Account</Text>
      </View>
      {step === 1 ? (
        <View className="px-4">
          <View className="items-center py-6">
            <Ionicons name="warning" size={24} color="#FFFFFF" />
            <Text className=" text-xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Are you sure?</Text>
            <Text className="/60 text-center text-sm" style={{ color: colors.text.primary }}>This action is permanent and cannot be undone. All your data will be deleted.</Text>
          </View>
          <View className="mb-4 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
            <Text className="text-red-400 font-[Satoshi-Bold] mb-2">You will lose:</Text>
            <Text className="text-red-400/80 text-sm">• All trip history and memories</Text>
            <Text className="text-red-400/80 text-sm">• 15,400 TRAVI points</Text>
            <Text className="text-red-400/80 text-sm">• $42.50 wallet balance</Text>
            <Text className="text-red-400/80 text-sm">• All reviews and social connections</Text>
            <Text className="text-red-400/80 text-sm">• Your Travel DNA profile</Text>
          </View>
          <View className="mb-4">
            <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Why are you leaving? (optional)</Text>
            <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08] h-24" value={reason} onChangeText={setReason} multiline textAlignVertical="top" placeholder="Tell us why..." placeholderTextColor="rgba(255,255,255,0.3)" />
          </View>
          <TouchableOpacity onPress={() => setStep(2)} className="bg-red-500/20 py-4 rounded-2xl items-center mb-3">
            <Text className="text-red-400 font-[Satoshi-Bold]">Continue to Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] py-4 rounded-2xl items-center">
            <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Keep My Account</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="px-4">
          <View className="items-center py-6">
            <Ionicons name="trash" size={24} color="#FFFFFF" />
            <Text className=" text-xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Final Confirmation</Text>
            <Text className="/60 text-center text-sm" style={{ color: colors.text.primary }}>Type "DELETE" to confirm account deletion</Text>
          </View>
          <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-red-500/30 text-center text-lg mb-6" value={confirmText} onChangeText={setConfirmText} placeholder="Type DELETE" placeholderTextColor="rgba(255,255,255,0.3)" autoCapitalize="characters" />
          <TouchableOpacity onPress={() => confirmText === 'DELETE' ? router.replace('/(auth)/welcome') : null} className={`py-4 rounded-2xl items-center mb-3 ${confirmText === 'DELETE' ? 'bg-red-500' : 'bg-white/[0.05]'}`}>
            <Text className={`font-[Satoshi-Bold] ${confirmText === 'DELETE' ? 'text-white' : 'text-white/30'}`}>Delete My Account Forever</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(1)} className="py-4 rounded-2xl items-center">
            <Text className="/60 font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
