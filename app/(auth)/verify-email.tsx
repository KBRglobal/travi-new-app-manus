import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// S4 — Verify Email
export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendCount, setResendCount] = useState(0);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-submit on last digit
    if (index === 5 && text) {
      setTimeout(() => {
        router.push('/(auth)/profile-setup');
      }, 300);
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-1 bg-bg-primary px-6 md:px-12 pt-safe">
      {/* Back */}
      <Pressable onPress={() => router.back()} className="mt-4 p-2 -ml-2 self-start">
        <Text className="text-white text-2xl">‹</Text>
      </Pressable>

      <View className="w-full max-w-md mx-auto items-center mt-8 md:mt-16">
        {/* Icon */}
        <Text className="text-5xl md:text-6xl">✉️</Text>

        {/* Title */}
        <Text className="text-2xl md:text-3xl font-bold text-white mt-6">Check your inbox</Text>
        <Text className="text-sm md:text-base text-text-secondary mt-2">{email || 'your@email.com'}</Text>

        {/* OTP Boxes */}
        <View className="flex-row gap-2 md:gap-3 mt-8">
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputs.current[i] = ref; }}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              className="w-12 h-15 md:w-14 md:h-16 bg-white/5 border border-white/10 rounded-input text-white text-2xl text-center font-bold"
            />
          ))}
        </View>

        {/* Resend */}
        <Pressable
          onPress={() => setResendCount(resendCount + 1)}
          disabled={resendCount >= 3}
          className="mt-8"
        >
          <Text className={`text-sm ${resendCount >= 3 ? 'text-text-muted' : 'text-primary'}`}>
            {resendCount >= 3 ? 'Maximum attempts reached. Contact support.' : 'Resend Code'}
          </Text>
        </Pressable>

        {/* Wrong email */}
        <Pressable onPress={() => router.push('/(auth)/signup')} className="mt-4">
          <Text className="text-text-secondary text-sm underline">Wrong email?</Text>
        </Pressable>
      </View>
    </View>
  );
}
