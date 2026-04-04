import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const DIMENSIONS = [
  { label: 'Adventure', score: 85 },
  { label: 'Culture', score: 72 },
  { label: 'Relaxation', score: 60 },
];

// S10 — DNA Summary
export default function DNASummaryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      {/* Header */}
      <View className="flex-row items-center px-6 md:px-12 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-white text-2xl">‹</Text>
        </Pressable>
        <View className="flex-1 h-1 bg-white/10 rounded-full ml-4">
          <View className="w-full h-full bg-primary rounded-full" />
        </View>
        <Text className="text-primary text-sm ml-4">✓</Text>
      </View>

      <ScrollView contentContainerClassName="px-6 md:px-12 pb-32">
        {/* Persona Card */}
        <View className="w-full max-w-md mx-auto mt-8 bg-primary rounded-xl p-6 md:p-8 items-center">
          <Text className="text-5xl">🌍</Text>
          <Text className="text-text-secondary text-sm mt-4">You're a</Text>
          <Text className="text-3xl md:text-4xl font-bold text-white mt-1">Explorer</Text>
          <Text className="text-text-secondary text-sm text-center mt-2 px-4">
            You seek adventure and new experiences wherever you go
          </Text>
        </View>

        {/* Dimension Bars */}
        <View className="w-full max-w-md mx-auto mt-8 gap-4">
          {DIMENSIONS.map((dim) => (
            <View key={dim.label}>
              <View className="flex-row justify-between mb-1">
                <Text className="text-white text-base">{dim.label}</Text>
                <Text className="text-primary text-base font-bold">{dim.score}%</Text>
              </View>
              <View className="h-2 bg-white/10 rounded-full">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${dim.score}%` }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-safe mb-4 bg-bg-primary pt-4">
        <Pressable
          onPress={() => {
            router.replace('/(tabs)/home');
            // TODO: trigger /_modals/dna-celebration
          }}
          className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80"
        >
          <Text className="text-white text-base md:text-lg font-semibold">See My Recommendations →</Text>
        </Pressable>
      </View>
    </View>
  );
}
