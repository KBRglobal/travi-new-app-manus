import { haptic } from '@/lib/haptics';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

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
      style={{ flex: 1, backgroundColor: colors.bg.primary }}"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow px-6 md:px-12 pt-safe"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center">
            <Pressable onPress={() => router.back()} className="p-2 -ml-2">
              <Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text>
            </Pressable>
            <Text className=" text-xl md:text-2xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Set Up Profile</Text>
          </View>
          <Text className="text-[rgba(255,255,255,0.6)] text-sm">2/3</Text>
        </View>

        <View className="w-full max-w-md mx-auto mt-8 md:mt-12">
          {/* Avatar */}
          <Pressable onPress={() => {}} className="self-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#6443F4]/20 border-2 border-[#6443F4] items-center justify-center mb-8">
            <Ionicons name="person" size={24} color="#FFFFFF" />
            <View className="absolute bottom-0 right-0 w-7 h-7 bg-[#6443F4] rounded-full items-center justify-center">
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
            <Text className="text-[rgba(255,255,255,0.3)] text-base">Select Country</Text>
            <Text className="text-[rgba(255,255,255,0.6)]">›</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Sticky Continue */}
      <View className="px-6 md:px-12 pb-safe mb-4">
        <Pressable
          onPress={() => router.push('/(auth)/welcome-travi')}
          disabled={!isValid}
          className={`w-full max-w-md mx-auto h-14 rounded-[12px] items-center justify-center ${isValid ? 'bg-[#6443F4] active:opacity-80' : 'bg-[#6443F4] opacity-40'}`}
        >
          <Text className=" text-base md:text-lg font-semibold" style={{ color: colors.text.primary }}>Continue</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
