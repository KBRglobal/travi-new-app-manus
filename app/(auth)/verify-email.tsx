import { haptic } from '@/lib/haptics';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) inputs.current[index + 1]?.focus();
    if (newCode.every((c) => c !== '')) handleVerify(newCode.join(''));
  };

  const handleVerify = async (fullCode: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.replace('/(auth)/dna-welcome');
  };

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-6">
      <Ionicons name="mail-open" size={24} color="#FFFFFF" />
      <Text className="text-white text-heading-2 mb-2">Verify Your Email</Text>
      <Text className="text-text-secondary text-body text-center mb-8">Enter the 6-digit code we sent to your email</Text>

      <View className="flex-row gap-3 mb-8">
        {code.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => { inputs.current[i] = ref; }}
            className="w-12 h-14 bg-bg-card border border-border rounded-input text-white text-heading-3 text-center"
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !digit && i > 0) {
                inputs.current[i - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      {loading && <Text className="text-text-secondary text-body">Verifying...</Text>}

      <TouchableOpacity onPress={() => {}} className="mt-4">
        <Text className="text-primary text-body-sm">Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
}
