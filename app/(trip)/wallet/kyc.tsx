import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function KYCScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');

  const steps = ['Identity', 'Document', 'Verify'];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <ScreenHeader title="Identity Verification" />
      </View>
      <View className="flex-row mx-4 mb-6">
        {steps.map((s, i) => (
          <View key={s} className="flex-1 items-center">
            <View className={`w-8 h-8 rounded-full items-center justify-center mb-1 ${i + 1 <= step ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
              <Text className={`font-[Satoshi-Bold] ${i + 1 <= step ? 'text-white' : 'text-white/30'}`}>{i + 1}</Text>
            </View>
            <Text className={`text-xs ${i + 1 <= step ? 'text-white' : 'text-white/30'}`}>{s}</Text>
          </View>
        ))}
      </View>
      {step === 1 && (
        <View className="px-4">
          <Text className=" font-[Satoshi-Bold] text-lg mb-4" style={{ color: colors.text.primary }}>Select ID Type</Text>
          {['Passport', 'Driver License', 'National ID'].map(type => (
            <TouchableOpacity key={type} onPress={() => setIdType(type)} className={`flex-row items-center p-4 mb-2 rounded-2xl border ${idType === type ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
              <Text className=" font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>{type}</Text>
              {idType === type && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => idType ? setStep(2) : null} className={`mt-4 py-4 rounded-2xl items-center ${idType ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
            <Text className={`font-[Satoshi-Bold] ${idType ? 'text-white' : 'text-white/30'}`}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 2 && (
        <View className="px-4">
          <Text className=" font-[Satoshi-Bold] text-lg mb-4" style={{ color: colors.text.primary }}>Document Details</Text>
          <View className="mb-4">
            <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>{idType} Number</Text>
            <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={idNumber} onChangeText={setIdNumber} placeholder="Enter ID number" placeholderTextColor="rgba(255,255,255,0.3)" />
          </View>
          <View className="mb-4">
            <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Address</Text>
            <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={address} onChangeText={setAddress} placeholder="Enter your address" placeholderTextColor="rgba(255,255,255,0.3)" />
          </View>
          <TouchableOpacity className="p-8 bg-[#120824] rounded-2xl border border-dashed border-white/[0.15] items-center mb-4">
            <Ionicons name="camera" size={24} color="#FFFFFF" />
            <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Tap to scan your {idType}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => idNumber && address ? setStep(3) : null} className={`py-4 rounded-2xl items-center ${idNumber && address ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
            <Text className={`font-[Satoshi-Bold] ${idNumber && address ? 'text-white' : 'text-white/30'}`}>Submit for Review</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 3 && (
        <View className="px-4 items-center py-12">
          <Ionicons name="search" size={24} color="#FFFFFF" />
          <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Under Review</Text>
          <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>Your identity verification is being processed. This usually takes 1-2 business days.</Text>
          <View className="bg-[#120824] rounded-2xl p-4 w-full border border-white/[0.08]">
            <View className="flex-row justify-between mb-2"><Text className="/40" style={{ color: colors.text.primary }}>ID Type</Text><Text className="" style={{ color: colors.text.primary }}>{idType}</Text></View>
            <View className="flex-row justify-between mb-2"><Text className="/40" style={{ color: colors.text.primary }}>Status</Text><Text className="text-yellow-400">Pending</Text></View>
            <View className="flex-row justify-between"><Text className="/40" style={{ color: colors.text.primary }}>Submitted</Text><Text className="" style={{ color: colors.text.primary }}>Today</Text></View>
          </View>
          <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl mt-6"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
