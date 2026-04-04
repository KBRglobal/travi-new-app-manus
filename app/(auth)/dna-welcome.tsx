import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

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
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Animated.View style={dnaStyle}>
        <Text className="text-8xl mb-6">🧬</Text>
      </Animated.View>

      <Animated.View style={textStyle} className="items-center">
        <Text className="text-white text-heading-1 text-center mb-4">Let's Discover Your Travel DNA</Text>
        <Text className="text-text-secondary text-body text-center mb-2">Answer a few fun questions so we can personalize every trip for you.</Text>
        <Text className="text-text-muted text-body-sm text-center">Takes about 2 minutes</Text>
      </Animated.View>

      <Animated.View style={buttonStyle} className="w-full mt-10">
        <TouchableOpacity className="bg-primary py-4 rounded-button items-center mb-3" onPress={() => router.push('/(auth)/dna-quiz')}>
          <Text className="text-white text-body font-bold">Start DNA Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-4 items-center" onPress={() => router.replace('/(tabs)/home')}>
          <Text className="text-text-muted text-body-sm">Skip for now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
