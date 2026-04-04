import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterForm } from '../../lib/validations';
import { Input } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      // TODO: Replace with tRPC auth.register
      await new Promise((r) => setTimeout(r, 1500));
      setAuthenticated(true);
      router.replace('/(auth)/verify-email');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-bg-primary"
    >
      <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled" contentContainerClassName="pt-safe pb-8">
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Text className="text-white text-xl">‹ Back</Text>
        </TouchableOpacity>

        <Text className="text-white text-heading-1 mb-2">Create Account</Text>
        <Text className="text-text-secondary text-body mb-8">Start your personalized travel journey</Text>

        <View className="flex-row gap-3 mb-0">
          <View className="flex-1">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <Input label="First Name" placeholder="Alex" value={value} onChangeText={onChange} error={errors.firstName?.message} />
              )}
            />
          </View>
          <View className="flex-1">
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <Input label="Last Name" placeholder="Cohen" value={value} onChangeText={onChange} error={errors.lastName?.message} />
              )}
            />
          </View>
        </View>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input label="Email" placeholder="alex@example.com" value={value} onChangeText={onChange} keyboardType="email-address" autoCapitalize="none" error={errors.email?.message} />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input label="Password" placeholder="Min 8 chars, 1 uppercase, 1 number" value={value} onChangeText={onChange} secureTextEntry error={errors.password?.message} />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input label="Confirm Password" placeholder="Re-enter password" value={value} onChangeText={onChange} secureTextEntry error={errors.confirmPassword?.message} />
          )}
        />

        <TouchableOpacity
          className={`bg-primary py-4 rounded-button items-center mt-4 ${loading ? 'opacity-50' : ''}`}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text className="text-white text-body font-bold">{loading ? 'Creating...' : 'Create Account'}</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-text-secondary text-body-sm">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
            <Text className="text-primary text-body-sm font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
