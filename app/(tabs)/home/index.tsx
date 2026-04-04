import { View, Text, Pressable, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const RECOMMENDATIONS = Array.from({ length: 8 }, (_, i) => ({
  id: `dest-${i + 1}`,
  name: `Destination ${i + 1}`,
  country: `Country ${i + 1}`,
  match: Math.floor(Math.random() * 30) + 70,
}));

// S11 — Home
export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 md:px-6 mt-2">
        <Text className="text-white text-lg font-bold">TRAVI</Text>
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => router.push('/(trip)/notifications')}>
            <Text className="text-xl">🔔</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(trip)/profile')}>
            <View className="w-9 h-9 rounded-full bg-primary/30 items-center justify-center">
              <Text className="text-sm">👤</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerClassName="px-4 md:px-6 pb-24">
        {/* Greeting */}
        <Text className="text-2xl md:text-3xl font-bold text-white mt-4">Good morning, Traveler</Text>
        <View className="flex-row items-center mt-1">
          <View className="bg-primary/20 border border-primary rounded-pill px-3 py-1">
            <Text className="text-primary text-xs font-semibold">✦ Explorer DNA</Text>
          </View>
        </View>

        {/* Complete DNA Banner */}
        <Pressable
          onPress={() => router.push('/(auth)/quick-dna')}
          className="flex-row items-center bg-pink-500/10 border border-pink-500/30 rounded-card p-4 mt-4"
        >
          <Text className="text-lg mr-3">🧬</Text>
          <Text className="flex-1 text-white text-sm">Complete your Travel DNA</Text>
          <Text className="text-text-secondary">›</Text>
        </Pressable>

        {/* Live Trip Strip */}
        <Pressable
          onPress={() => router.push('/(live)/trip-1')}
          className="flex-row items-center bg-green-500/10 border border-green-500/30 rounded-card p-4 mt-3"
        >
          <View className="w-2 h-2 rounded-full bg-green-500 mr-3" />
          <Text className="flex-1 text-white text-sm">Active: Barcelona Trip · Day 3</Text>
          <Text className="text-text-secondary">›</Text>
        </Pressable>

        {/* Plan a Trip Card */}
        <Pressable
          onPress={() => router.push('/(trip)/plan')}
          className="bg-primary rounded-xl p-5 mt-4 flex-row items-center active:opacity-90"
        >
          <View className="w-12 h-12 bg-white/20 rounded-button items-center justify-center mr-4">
            <Text className="text-2xl">✈️</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-xl md:text-2xl font-bold">Plan a Trip</Text>
            <Text className="text-white/70 text-xs mt-1">AI-powered planning</Text>
          </View>
          <Text className="text-white text-xl">›</Text>
        </Pressable>

        {/* Quick Stats */}
        <View className="flex-row gap-3 mt-4">
          <Pressable
            onPress={() => router.push('/(tabs)/wallet')}
            className="flex-1 bg-white/5 border border-white/8 rounded-card p-4 active:opacity-80"
          >
            <Text className="text-lg">💰</Text>
            <Text className="text-text-secondary text-xs mt-2">Cashback</Text>
            <Text className="text-white text-lg font-bold">€42.50</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(tabs)/explore')}
            className="flex-1 bg-white/5 border border-white/8 rounded-card p-4 active:opacity-80"
          >
            <Text className="text-lg">🧭</Text>
            <Text className="text-text-secondary text-xs mt-2">New for you</Text>
            <Text className="text-white text-lg font-bold">12 destinations</Text>
          </Pressable>
        </View>

        {/* Recommendations */}
        <Text className="text-xl md:text-2xl font-bold text-white mt-6 mb-3">Recommended for You</Text>
        <FlatList
          data={RECOMMENDATIONS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/(tabs)/home/destination/${item.id}`)}
              className="w-48 md:w-64 h-64 md:h-80 bg-bg-card rounded-xl overflow-hidden active:scale-[0.97]"
            >
              <View className="flex-1 bg-white/5 items-center justify-center">
                <Text className="text-4xl">🏝️</Text>
              </View>
              <View className="absolute top-3 right-3 bg-pink-500 rounded-pill px-2 py-1">
                <Text className="text-white text-xs font-bold">✦ {item.match}%</Text>
              </View>
              <View className="absolute bottom-0 left-0 right-0 p-4">
                <Text className="text-white text-lg font-bold">{item.name}</Text>
                <Text className="text-text-secondary text-xs">{item.country}</Text>
              </View>
            </Pressable>
          )}
        />
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => router.push('/_modals/ai-chat')}
        className="absolute bottom-24 right-5 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-fab"
      >
        <Text className="text-2xl">🤖</Text>
      </Pressable>
    </View>
  );
}
