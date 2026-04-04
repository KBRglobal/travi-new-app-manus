import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

// S14 — Destination Detail
export default function DestinationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 bg-bg-primary">
      {/* Hero Image */}
      <View className="w-full h-64 md:h-80 lg:h-96 bg-white/5 items-center justify-center">
        <Text className="text-6xl">🏝️</Text>
        {/* Back button overlay */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-safe left-4 mt-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center"
        >
          <Text className="text-white text-xl">‹</Text>
        </Pressable>
        {/* Wishlist */}
        <Pressable className="absolute top-safe right-4 mt-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center">
          <Text className="text-xl">🤍</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-4 md:px-6 lg:px-12 pb-32">
        <Text className="text-2xl md:text-3xl font-bold text-white mt-4">Destination {id}</Text>
        <Text className="text-text-secondary text-sm mt-1">Country Name</Text>

        {/* Match badge */}
        <View className="flex-row mt-3">
          <View className="bg-pink-500/20 border border-pink-500/40 rounded-pill px-3 py-1">
            <Text className="text-pink-400 text-xs font-bold">✦ 92% Match</Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-text-secondary text-sm md:text-base mt-4 leading-6">
          A beautiful destination with amazing culture, food, and experiences waiting for you.
          Explore the local markets, historical sites, and stunning natural landscapes.
        </Text>

        {/* Quick Info */}
        <View className="flex-row gap-4 mt-6">
          <View className="flex-1 bg-white/5 rounded-card p-3 items-center">
            <Text className="text-lg">🌡️</Text>
            <Text className="text-white text-sm font-bold mt-1">25°C</Text>
            <Text className="text-text-muted text-xs">Weather</Text>
          </View>
          <View className="flex-1 bg-white/5 rounded-card p-3 items-center">
            <Text className="text-lg">💰</Text>
            <Text className="text-white text-sm font-bold mt-1">$$</Text>
            <Text className="text-text-muted text-xs">Budget</Text>
          </View>
          <View className="flex-1 bg-white/5 rounded-card p-3 items-center">
            <Text className="text-lg">✈️</Text>
            <Text className="text-white text-sm font-bold mt-1">3h</Text>
            <Text className="text-text-muted text-xs">Flight</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-primary pt-4 border-t border-white/5">
        <Pressable
          onPress={() => router.push({ pathname: '/(trip)/plan/destination', params: { id } })}
          className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80"
        >
          <Text className="text-white text-base md:text-lg font-semibold">Plan Trip Here</Text>
        </Pressable>
      </View>
    </View>
  );
}
