import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginForm } from '../../lib/validations';
import { Input } from '../../components/ui';
import { useAuthStore } from '../../stores/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      // TODO: Replace with tRPC auth.login
      await new Promise((r) => setTimeout(r, 1500));
      setAuthenticated(true);
      router.replace('/(tabs)/home');
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

        <Text className="text-white text-heading-1 mb-2">Welcome Back</Text>
        <Text className="text-text-secondary text-body mb-8">Sign in to continue your journey</Text>

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
            <Input label="Password" placeholder="Enter your password" value={value} onChangeText={onChange} secureTextEntry error={errors.password?.message} />
          )}
        />

        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')} className="self-end mb-6">
          <Text className="text-primary text-body-sm">Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-primary py-4 rounded-button items-center ${loading ? 'opacity-50' : ''}`}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text className="text-white text-body font-bold">{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-text-secondary text-body-sm">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
            <Text className="text-primary text-body-sm font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
