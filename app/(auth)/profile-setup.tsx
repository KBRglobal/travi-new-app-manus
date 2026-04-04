import { haptic } from '@/lib/haptics';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

// S5 — Profile Setup
export default function ProfileSetupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const isValid = firstName.trim() && lastName.trim();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-bg-primary"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow px-6 md:px-12 pt-safe"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center">
            <Pressable onPress={() => router.back()} className="p-2 -ml-2">
              <Text className="text-white text-2xl">‹</Text>
            </Pressable>
            <Text className="text-white text-xl md:text-2xl font-bold ml-3">Set Up Profile</Text>
          </View>
          <Text className="text-text-secondary text-sm">2/3</Text>
        </View>

        <View className="w-full max-w-md mx-auto mt-8 md:mt-12">
          {/* Avatar */}
          <Pressable onPress={() => {}} className="self-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary/20 border-2 border-primary items-center justify-center mb-8">
            <Ionicons name="person" size={24} color="#FFFFFF" />
            <View className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full items-center justify-center">
              <Ionicons name="camera" size={24} color="#FFFFFF" />
            </View>
          </Pressable>

          {/* Name row */}
          <View className="flex-row gap-3 mb-4">
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              className="flex-1 h-13 px-4 bg-white/5 border border-white/10 rounded-input text-white text-base"
            />
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              className="flex-1 h-13 px-4 bg-white/5 border border-white/10 rounded-input text-white text-base"
            />
          </View>

          {/* DOB */}
          <TextInput
            value={dob}
            onChangeText={setDob}
            placeholder="Date of Birth"
            placeholderTextColor="rgba(255,255,255,0.3)"
            className="w-full h-13 px-4 bg-white/5 border border-white/10 rounded-input text-white text-base mb-4"
          />

          {/* Phone */}
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            placeholderTextColor="rgba(255,255,255,0.3)"
            keyboardType="phone-pad"
            className="w-full h-13 px-4 bg-white/5 border border-white/10 rounded-input text-white text-base mb-4"
          />

          {/* Country */}
          <Pressable
            onPress={() => router.push('/_modals/country-picker')}
            className="w-full h-13 px-4 bg-white/5 border border-white/10 rounded-input flex-row items-center justify-between mb-4"
          >
            <Text className="text-text-muted text-base">Select Country</Text>
            <Text className="text-text-secondary">›</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Sticky Continue */}
      <View className="px-6 md:px-12 pb-safe mb-4">
        <Pressable
          onPress={() => router.push('/(auth)/welcome-travi')}
          disabled={!isValid}
          className={`w-full max-w-md mx-auto h-14 rounded-button items-center justify-center ${isValid ? 'bg-primary active:opacity-80' : 'bg-primary opacity-40'}`}
        >
          <Text className="text-white text-base md:text-lg font-semibold">Continue</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
