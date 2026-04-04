import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginForm } from '../../lib/validations';
import { useAuthStore } from '../../stores/authStore';
import { colors, fonts, fontSizes, spacing, typography, gradients } from '@/constants/theme';
import { GradientButton } from '@/components/ui/GradientButton';
import { ThemedInput } from '@/components/ui/ThemedInput';
import { PressableScale } from '@/components/ui/PressableScale';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
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
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%' }}>
        <LinearGradient
          colors={['rgba(100,67,244,0.06)', 'transparent']}
          style={{ flex: 1 }}
        />
      </View>

      <ScreenHeader />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: spacing.screenH, paddingBottom: insets.bottom + 16 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <View style={{ marginBottom: 40, marginTop: 16 }}>
            <Text style={{ ...typography.h1, marginBottom: 8 }}>
              Welcome Back
            </Text>
            <Text style={typography.body}>
              Sign in to continue your journey
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 20, marginBottom: 16 }}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <ThemedInput
                  label="Email"
                  placeholder="alex@example.com"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="email"
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <ThemedInput
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  icon="lock"
                  error={errors.password?.message}
                />
              )}
            />
          </View>

          {/* Forgot password */}
          <PressableScale
            onPress={() => router.push('/(auth)/forgot-password')}
            style={{ alignSelf: 'flex-end', marginBottom: 32 }}
          >
            <Text
              style={{
                fontFamily: fonts.bodyMedium,
                fontSize: fontSizes.bodySm,
                color: colors.pink,
              }}
            >
              Forgot Password?
            </Text>
          </PressableScale>

          {/* Sign In button */}
          <GradientButton
            title={loading ? 'Signing in...' : 'Sign In'}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          />

          {/* Sign up link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
            <Text style={{ ...typography.bodySm, color: colors.text.tertiary }}>
              Don't have an account?{' '}
            </Text>
            <PressableScale onPress={() => router.replace('/(auth)/register')}>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: fontSizes.bodySm,
                  color: colors.primary,
                }}
              >
                Sign Up
              </Text>
            </PressableScale>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
