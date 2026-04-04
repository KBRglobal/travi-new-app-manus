import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

// S1 — Splash Screen
export default function SplashScreen() {
  const router = useRouter();
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    // Simulate auth check — auto-navigate after 2s
    const timer = setTimeout(() => {
      // TODO: Check token + activeTripId
      // token valid + activeTripId → /(live)/[tripId]
      // token valid, no trip → /(tabs)/home
      // no token → /(auth)/welcome
      router.replace('/(auth)/welcome');
    }, 2000);

    const retryTimer = setTimeout(() => setShowRetry(true), 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(retryTimer);
    };
  }, []);

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <View className="w-48 h-48 md:w-64 md:h-64 items-center justify-center">
        <Text className="text-7xl md:text-8xl">🦊</Text>
      </View>
      <Text className="text-3xl md:text-4xl font-bold text-white mt-6">TRAVI</Text>
      <Text className="text-sm md:text-base text-text-secondary mt-3">
        Your AI Travel Companion
      </Text>
      <View className="flex-row gap-2 mt-10">
        <View className="w-2 h-2 rounded-full bg-primary" />
        <View className="w-2 h-2 rounded-full bg-primary opacity-60" />
        <View className="w-2 h-2 rounded-full bg-primary opacity-30" />
      </View>
      {showRetry && (
        <Pressable
          onPress={() => router.replace('/(auth)/welcome')}
          className="mt-8 px-6 py-3 bg-primary rounded-button"
        >
          <Text className="text-white text-base font-semibold">Retry</Text>
        </Pressable>
      )}
    </View>
  );
}
