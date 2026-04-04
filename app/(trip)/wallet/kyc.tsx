import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function KYCScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');

  const steps = ['Identity', 'Document', 'Verify'];

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Identity Verification</Text>
      </View>
      <View className="flex-row mx-4 mb-6">
        {steps.map((s, i) => (
          <View key={s} className="flex-1 items-center">
            <View className={`w-8 h-8 rounded-full items-center justify-center mb-1 ${i + 1 <= step ? 'bg-primary' : 'bg-white/[0.05]'}`}>
              <Text className={`font-bold ${i + 1 <= step ? 'text-white' : 'text-white/30'}`}>{i + 1}</Text>
            </View>
            <Text className={`text-xs ${i + 1 <= step ? 'text-white' : 'text-white/30'}`}>{s}</Text>
          </View>
        ))}
      </View>
      {step === 1 && (
        <View className="px-4">
          <Text className="text-white font-bold text-lg mb-4">Select ID Type</Text>
          {['Passport', 'Driver License', 'National ID'].map(type => (
            <TouchableOpacity key={type} onPress={() => setIdType(type)} className={`flex-row items-center p-4 mb-2 rounded-2xl border ${idType === type ? 'bg-primary/10 border-primary' : 'bg-bg-secondary border-white/[0.08]'}`}>
              <Text className="text-white font-bold flex-1">{type}</Text>
              {idType === type && <Text className="text-primary">✓</Text>}
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => idType ? setStep(2) : null} className={`mt-4 py-4 rounded-2xl items-center ${idType ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`font-bold ${idType ? 'text-white' : 'text-white/30'}`}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 2 && (
        <View className="px-4">
          <Text className="text-white font-bold text-lg mb-4">Document Details</Text>
          <View className="mb-4">
            <Text className="text-white/60 text-xs uppercase mb-2 ml-1">{idType} Number</Text>
            <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={idNumber} onChangeText={setIdNumber} placeholder="Enter ID number" placeholderTextColor="rgba(255,255,255,0.3)" />
          </View>
          <View className="mb-4">
            <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Address</Text>
            <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={address} onChangeText={setAddress} placeholder="Enter your address" placeholderTextColor="rgba(255,255,255,0.3)" />
          </View>
          <TouchableOpacity className="p-8 bg-bg-secondary rounded-2xl border border-dashed border-white/[0.15] items-center mb-4">
            <Text className="text-3xl mb-2">📷</Text>
            <Text className="text-white/60 text-sm">Tap to scan your {idType}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => idNumber && address ? setStep(3) : null} className={`py-4 rounded-2xl items-center ${idNumber && address ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`font-bold ${idNumber && address ? 'text-white' : 'text-white/30'}`}>Submit for Review</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 3 && (
        <View className="px-4 items-center py-12">
          <Text className="text-5xl mb-4">🔍</Text>
          <Text className="text-white text-2xl font-bold mb-2">Under Review</Text>
          <Text className="text-white/60 text-center mb-6">Your identity verification is being processed. This usually takes 1-2 business days.</Text>
          <View className="bg-bg-secondary rounded-2xl p-4 w-full border border-white/[0.08]">
            <View className="flex-row justify-between mb-2"><Text className="text-white/40">ID Type</Text><Text className="text-white">{idType}</Text></View>
            <View className="flex-row justify-between mb-2"><Text className="text-white/40">Status</Text><Text className="text-yellow-400">Pending</Text></View>
            <View className="flex-row justify-between"><Text className="text-white/40">Submitted</Text><Text className="text-white">Today</Text></View>
          </View>
          <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl mt-6"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
