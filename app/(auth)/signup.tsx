import { haptic } from '@/lib/haptics';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

// S3 — Sign Up / Login
export default function SignupScreen() {
 const router = useRouter();
 const { mode: initialMode } = useLocalSearchParams<{ mode: string }>();
 const [mode, setMode] = useState<'create' | 'login'>(initialMode === 'login' ? 'login' : 'create');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [agreed, setAgreed] = useState(false);

 const isCreateValid = email && password && confirmPassword && password === confirmPassword && agreed;
 const isLoginValid = email && password;
 const isValid = mode === 'create' ? isCreateValid : isLoginValid;

 const handleSubmit = () => {
 if (mode === 'create') {
 router.push({ pathname: '/(auth)/verify-email', params: { email } });
 } else {
 router.replace('/(tabs)/home');
 }
 };

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
 <View className="flex-row items-center mt-4">
 <Pressable onPress={() => router.back()} className="p-2 -ml-2">
 <Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text>
 </Pressable>
 <Text className=" text-xl md:text-2xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>
 {mode === 'create' ? 'Create Account' : 'Sign In'}
 </Text>
 </View>

 {/* Form */}
 <View className="w-full max-w-md mx-auto mt-8 md:mt-12">
 {/* Email */}
 <TextInput
 value={email}
 onChangeText={setEmail}
 placeholder="Email"
 placeholderTextColor="rgba(255,255,255,0.3)"
 keyboardType="email-address"
 autoCapitalize="none"
 className="w-full h-13 px-4 bg-white/5 border border-white/10 rounded-input text-white text-base mb-4"
 />

 {/* Password */}
 <View className="relative mb-4">
 <TextInput
 value={password}
 onChangeText={setPassword}
 placeholder="Password"
 placeholderTextColor="rgba(255,255,255,0.3)"
 secureTextEntry={!showPassword}
 className="w-full h-13 px-4 pr-12 bg-white/5 border border-white/10 rounded-input text-white text-base"
 />
 <Pressable
 onPress={() => setShowPassword(!showPassword)}
 className="absolute right-4 top-3.5"
 >
 <Text className="text-[rgba(255,255,255,0.6)]">{showPassword ? '' : ''}</Text>
 </Pressable>
 </View>

 {/* Confirm Password (create mode only) */}
 {mode === 'create' && (
 <TextInput
 value={confirmPassword}
 onChangeText={setConfirmPassword}
 placeholder="Confirm Password"
 placeholderTextColor="rgba(255,255,255,0.3)"
 secureTextEntry={!showPassword}
 className="w-full h-13 px-4 bg-white/5 border border-white/10 rounded-input text-white text-base mb-4"
 />
 )}

 {/* Terms (create mode) */}
 {mode === 'create' && (
 <Pressable onPress={() => setAgreed(!agreed)} className="flex-row items-center mb-6">
 <View className={`w-5 h-5 rounded border mr-3 items-center justify-center ${agreed ? 'bg-[#6443F4] border-[#6443F4]' : 'border-white/20'}`}>
 {agreed && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] text-sm flex-1">
 I agree to the Terms of Service and Privacy Policy
 </Text>
 </Pressable>
 )}

 {/* Forgot Password (login mode) */}
 {mode === 'login' && (
 <Pressable onPress={() => {}} className="mb-6">
 <Text className="text-[#6443F4] text-sm">Forgot Password?</Text>
 </Pressable>
 )}

 {/* Submit */}
 <Pressable
 onPress={handleSubmit}
 disabled={!isValid}
 className={`w-full md:w-auto md:px-8 h-14 rounded-[12px] items-center justify-center ${isValid ? 'bg-[#6443F4] active:opacity-80' : 'bg-[#6443F4] opacity-40'}`}
 >
 <Text className=" text-base md:text-lg font-semibold" style={{ color: colors.text.primary }}>
 {mode === 'create' ? 'Create Account' : 'Sign In'}
 </Text>
 </Pressable>

 {/* Divider */}
 <View className="flex-row items-center my-6">
 <View className="flex-1 h-px bg-white/10" />
 <Text className="text-[rgba(255,255,255,0.3)] text-sm mx-4">or</Text>
 <View className="flex-1 h-px bg-white/10" />
 </View>

 {/* OAuth */}
 <Pressable onPress={() => {}} className="w-full h-13 bg-white rounded-[12px] items-center justify-center flex-row mb-3">
 <Text className="text-black text-base font-semibold">Google</Text>
 </Pressable>
 <Pressable onPress={() => {}} className="w-full h-13 bg-white rounded-[12px] items-center justify-center flex-row mb-6">
 <Text className="text-black text-base font-semibold">Apple</Text>
 </Pressable>

 {/* Switch mode */}
 <Pressable onPress={() => setMode(mode === 'create' ? 'login' : 'create')} className="items-center py-3">
 <Text className="text-[rgba(255,255,255,0.6)] text-sm">
 {mode === 'create' ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
 </Text>
 </Pressable>
 </View>
 </ScrollView>
 </KeyboardAvoidingView>
 );
}
