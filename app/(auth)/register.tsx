import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterForm } from '../../lib/validations';
import { useAuthStore } from '../../stores/authStore';
import { colors, fonts, fontSizes, spacing, typography } from '@/constants/theme';
import { GradientButton } from '@/components/ui/GradientButton';
import { ThemedInput } from '@/components/ui/ThemedInput';
import { PressableScale } from '@/components/ui/PressableScale';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setAuthenticated(true);
      router.replace('/(auth)/profile-setup' as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%' }}>
        <LinearGradient
          colors={['rgba(249,68,152,0.06)', 'transparent']}
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
          <View style={{ marginBottom: 32, marginTop: 8 }}>
            <Text style={{ ...typography.h1, marginBottom: 8 }}>
              Create Account
            </Text>
            <Text style={typography.body}>
              Start your personalized travel journey
            </Text>
          </View>

          {/* Name row */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <ThemedInput
                    label="First Name"
                    placeholder="Alex"
                    value={value}
                    onChangeText={onChange}
                    icon="person"
                    error={errors.firstName?.message}
                  />
                )}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <ThemedInput
                    label="Last Name"
                    placeholder="Cohen"
                    value={value}
                    onChangeText={onChange}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Email */}
          <View style={{ marginBottom: 20 }}>
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
          </View>

          {/* Password */}
          <View style={{ marginBottom: 20 }}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <ThemedInput
                  label="Password"
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  icon="lock"
                  error={errors.password?.message}
                />
              )}
            />
          </View>

          {/* Confirm Password */}
          <View style={{ marginBottom: 32 }}>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <ThemedInput
                  label="Confirm Password"
                  placeholder="Re-enter password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  icon="lock-outline"
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </View>

          {/* Create Account button */}
          <GradientButton
            title={loading ? 'Creating...' : 'Create Account'}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          />

          {/* Sign in link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
            <Text style={{ ...typography.bodySm, color: colors.text.tertiary }}>
              Already have an account?{' '}
            </Text>
            <PressableScale onPress={() => router.replace('/(auth)/login')}>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: fontSizes.bodySm,
                  color: colors.primary,
                }}
              >
                Sign In
              </Text>
            </PressableScale>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
