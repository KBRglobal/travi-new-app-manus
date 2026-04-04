import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function ConnectFlowModal() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Hey! Want to travel together?');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe px-4">
      <View className="flex-row items-center justify-between py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="/60" style={{ color: colors.text.primary }}>Cancel</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Connect</Text>
        <View className="w-12" />
      </View>
      {step === 1 ? (
        <View className="items-center py-8">
          <View className="w-20 h-20 rounded-full bg-[#6443F4]/20 items-center justify-center mb-4"><Ionicons name="people" size={24} color="#FFFFFF" /></View>
          <Text className=" text-xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Connect with Sarah</Text>
          <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>85% travel compatibility match!</Text>
          <TextInput className="w-full bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08] mb-4" value={message} onChangeText={setMessage} multiline />
          <TouchableOpacity onPress={() => setStep(2)} className="bg-[#6443F4] w-full py-4 rounded-2xl items-center">
            <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Send Connection Request</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center py-12">
          <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
          <Text className=" text-xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Request Sent!</Text>
          <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>Sarah will be notified. You'll get a notification when she responds.</Text>
          <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
}
