import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordForm } from '../../lib/validations';
import { Input } from '../../components/ui';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-6">
        <Ionicons name="mail" size={24} color="#FFFFFF" />
        <Text className=" text-[22px] text-center mb-2" style={{ color: colors.text.primary }}>Check Your Email</Text>
        <Text className="text-[rgba(255,255,255,0.6)] text-[15px] text-center mb-8">We sent a password reset link to your email</Text>
        <TouchableOpacity className="bg-[#6443F4] py-4 px-8 rounded-[12px]" onPress={() => router.replace('/(auth)/login')}>
          <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: colors.bg.primary }} px-6 pt-safe">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
      </TouchableOpacity>
      <Text className=" text-[28px] mb-2" style={{ color: colors.text.primary }}>Reset Password</Text>
      <Text className="text-[rgba(255,255,255,0.6)] text-[15px] mb-8">Enter your email and we'll send you a reset link</Text>
      <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
        <Input label="Email" placeholder="alex@example.com" value={value} onChangeText={onChange} keyboardType="email-address" autoCapitalize="none" error={errors.email?.message} />
      )} />
      <TouchableOpacity className={`bg-[#6443F4] py-4 rounded-[12px] items-center mt-4 ${loading ? 'opacity-50' : ''}`} onPress={handleSubmit(onSubmit)} disabled={loading}>
        <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
