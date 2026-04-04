import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function DNAWelcomeScreen() {
  const router = useRouter();
  const dnaScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    dnaScale.value = withSpring(1, { damping: 8, stiffness: 100 });
    textOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
    buttonOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));
  }, []);

  const dnaStyle = useAnimatedStyle(() => ({ transform: [{ scale: dnaScale.value }] }));
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));
  const buttonStyle = useAnimatedStyle(() => ({ opacity: buttonOpacity.value }));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Animated.View style={dnaStyle}>
        <Ionicons name="flask" size={24} color="#FFFFFF" />
      </Animated.View>

      <Animated.View style={textStyle} className="items-center">
        <Text className=" text-[28px] text-center mb-4" style={{ color: colors.text.primary }}>Let's Discover Your Travel DNA</Text>
        <Text className="text-[rgba(255,255,255,0.6)] text-[15px] text-center mb-2">Answer a few fun questions so we can personalize every trip for you.</Text>
        <Text className="text-[rgba(255,255,255,0.3)] text-[13px] text-center">Takes about 2 minutes</Text>
      </Animated.View>

      <Animated.View style={buttonStyle} className="w-full mt-10">
        <TouchableOpacity className="bg-[#6443F4] py-4 rounded-[12px] items-center mb-3" onPress={() => router.push('/(auth)/dna-quiz')}>
          <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Start DNA Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-[#6443F4]/30 py-4 rounded-[12px] items-center mb-3" onPress={() => router.push('/(auth)/dna-questions' as any)}>
          <Text className="text-[#6443F4] text-[15px] font-[Satoshi-Bold]">Detailed Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-4 items-center" onPress={() => router.replace('/(tabs)/home')}>
          <Text className="text-[rgba(255,255,255,0.3)] text-[13px]">Skip for now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
