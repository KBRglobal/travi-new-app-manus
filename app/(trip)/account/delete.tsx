import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [step, setStep] = useState(1);

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Delete Account</Text>
      </View>
      {step === 1 ? (
        <View className="px-4">
          <View className="items-center py-6">
            <Text className="text-5xl mb-4">⚠️</Text>
            <Text className="text-white text-xl font-bold mb-2">Are you sure?</Text>
            <Text className="text-white/60 text-center text-sm">This action is permanent and cannot be undone. All your data will be deleted.</Text>
          </View>
          <View className="mb-4 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
            <Text className="text-red-400 font-bold mb-2">You will lose:</Text>
            <Text className="text-red-400/80 text-sm">• All trip history and memories</Text>
            <Text className="text-red-400/80 text-sm">• 15,400 TRAVI points</Text>
            <Text className="text-red-400/80 text-sm">• $42.50 wallet balance</Text>
            <Text className="text-red-400/80 text-sm">• All reviews and social connections</Text>
            <Text className="text-red-400/80 text-sm">• Your Travel DNA profile</Text>
          </View>
          <View className="mb-4">
            <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Why are you leaving? (optional)</Text>
            <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08] h-24" value={reason} onChangeText={setReason} multiline textAlignVertical="top" placeholder="Tell us why..." placeholderTextColor="rgba(255,255,255,0.3)" />
          </View>
          <TouchableOpacity onPress={() => setStep(2)} className="bg-red-500/20 py-4 rounded-2xl items-center mb-3">
            <Text className="text-red-400 font-bold">Continue to Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} className="bg-primary py-4 rounded-2xl items-center">
            <Text className="text-white font-bold">Keep My Account</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="px-4">
          <View className="items-center py-6">
            <Text className="text-5xl mb-4">🗑️</Text>
            <Text className="text-white text-xl font-bold mb-2">Final Confirmation</Text>
            <Text className="text-white/60 text-center text-sm">Type "DELETE" to confirm account deletion</Text>
          </View>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-red-500/30 text-center text-lg mb-6" value={confirmText} onChangeText={setConfirmText} placeholder="Type DELETE" placeholderTextColor="rgba(255,255,255,0.3)" autoCapitalize="characters" />
          <TouchableOpacity onPress={() => confirmText === 'DELETE' ? router.replace('/(auth)/welcome') : null} className={`py-4 rounded-2xl items-center mb-3 ${confirmText === 'DELETE' ? 'bg-red-500' : 'bg-white/[0.05]'}`}>
            <Text className={`font-bold ${confirmText === 'DELETE' ? 'text-white' : 'text-white/30'}`}>Delete My Account Forever</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(1)} className="py-4 rounded-2xl items-center">
            <Text className="text-white/60 font-bold">Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
