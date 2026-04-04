import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

// S6 — Welcome to TRAVI
export default function WelcomeTraviScreen() {
  const router = useRouter();

  useEffect(() => {
    // Auto-advance after 10s
    const timer = setTimeout(() => {
      router.push('/(auth)/quick-dna');
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-bg-primary items-center justify-between px-6 md:px-12 lg:px-24">
      {/* Top: Mascot */}
      <View className="flex-1 items-center justify-center">
        <View className="w-60 h-60 md:w-72 md:h-72 items-center justify-center">
          <Text className="text-8xl">🦊</Text>
        </View>
      </View>

      {/* Bottom: Text + Buttons */}
      <View className="w-full max-w-md mx-auto items-center pb-safe mb-6 md:mb-12">
        <Text className="text-text-secondary text-sm md:text-base">Welcome to TRAVI,</Text>
        <Text className="text-3xl md:text-4xl font-bold text-white mt-1">Traveler!</Text>
        <Text className="text-text-secondary text-sm md:text-base text-center mt-3 px-8">
          Let's discover your unique travel personality
        </Text>

        <Pressable
          onPress={() => router.push('/(auth)/quick-dna')}
          className="w-full h-14 bg-primary rounded-button items-center justify-center mt-8 active:opacity-80"
        >
          <Text className="text-white text-base md:text-lg font-semibold">Let's Go →</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/(tabs)/home')}
          className="mt-4 py-3"
        >
          <Text className="text-text-muted text-sm">Skip for now</Text>
        </Pressable>
      </View>
    </View>
  );
}
