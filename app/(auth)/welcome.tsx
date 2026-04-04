import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

// S2 — Welcome
export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary justify-between px-6 md:px-12 lg:px-24">
      {/* Top: Logo + Tagline */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-4xl md:text-5xl font-bold text-white">TRAVI</Text>
        <Text className="text-2xl md:text-3xl font-bold text-white mt-4 text-center">
          Your Journey Starts Here
        </Text>
        <Text className="text-sm md:text-base text-text-secondary mt-2 text-center">
          Plan, book, and experience travel like never before
        </Text>
      </View>

      {/* Bottom: Buttons */}
      <View className="w-full max-w-md mx-auto pb-safe mb-6 md:mb-12">
        <Pressable
          onPress={() => router.push({ pathname: '/(auth)/signup', params: { mode: 'create' } })}
          className="w-full h-14 bg-primary rounded-button items-center justify-center active:opacity-80"
        >
          <Text className="text-white text-base md:text-lg font-semibold">Get Started</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push({ pathname: '/(auth)/signup', params: { mode: 'login' } })}
          className="mt-4 items-center py-3"
        >
          <Text className="text-text-secondary text-sm md:text-base underline">Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}
