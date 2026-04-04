import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../stores/authStore';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, hasCompletedDNA } = useAuthStore();

  const mascotY = useSharedValue(80);
  const mascotScale = useSharedValue(0.3);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: mascotY.value },
      { scale: mascotScale.value },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const navigate = () => {
    if (isAuthenticated && hasCompletedDNA) {
      router.replace('/(tabs)/home');
    } else if (isAuthenticated) {
      router.replace('/(auth)/dna-welcome');
    } else {
      router.replace('/(auth)/welcome');
    }
  };

  useEffect(() => {
    mascotY.value = withSpring(0, { damping: 12, stiffness: 80 });
    mascotScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));

    const timer = setTimeout(() => navigate(), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <Animated.View style={mascotStyle} className="items-center">
        <Text className="text-6xl mb-4">🦊</Text>
      </Animated.View>

      <Animated.Text style={titleStyle} className="text-white text-heading-1 font-bold">
        TRAVI
      </Animated.Text>

      <Animated.Text style={subtitleStyle} className="text-text-secondary text-body mt-2">
        Your AI Travel Companion
      </Animated.Text>
    </View>
  );
}
