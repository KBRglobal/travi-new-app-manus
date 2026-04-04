import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function DNACelebrationModal() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-black/80 items-center justify-center px-6">
      <View className="w-full max-w-md bg-bg-card rounded-3xl p-8 items-center">
        <Text className="text-6xl">🎉</Text>
        <Text className="text-2xl font-bold text-white mt-4">DNA Complete!</Text>
        <Text className="text-text-secondary text-sm mt-2 text-center">Your travel personality has been mapped. Get ready for personalized recommendations!</Text>
        <Pressable onPress={() => router.back()} className="w-full h-14 bg-primary rounded-button items-center justify-center mt-6 active:opacity-80">
          <Text className="text-white text-base font-semibold">Awesome!</Text>
        </Pressable>
      </View>
    </View>
  );
}
