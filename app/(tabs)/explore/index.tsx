import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const FILTERS = ['All', 'Adventure', 'Culture', 'Beach', 'City', 'Nature'];
const DESTINATIONS = Array.from({ length: 12 }, (_, i) => ({
  id: `explore-${i + 1}`,
  name: `Place ${i + 1}`,
  country: `Country ${i + 1}`,
  match: Math.floor(Math.random() * 30) + 70,
}));

// S12 — Explore
export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <Text className="text-2xl md:text-3xl font-bold text-white px-4 md:px-6 mt-4">Explore</Text>

      {/* Search bar (tap to navigate) */}
      <Pressable
        onPress={() => router.push('/(tabs)/home/search')}
        className="mx-4 md:mx-6 mt-4 h-12 bg-white/5 border border-white/10 rounded-pill flex-row items-center px-4"
      >
        <Text className="text-text-muted text-base">🔍 Search destinations...</Text>
      </Pressable>

      {/* Filter chips */}
      <FlatList
        data={FILTERS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerClassName="px-4 md:px-6 mt-4 gap-2"
        renderItem={({ item, index }) => (
          <Pressable className={`h-9 px-4 rounded-pill items-center justify-center ${index === 0 ? 'bg-primary' : 'bg-white/5 border border-white/10'}`}>
            <Text className={`text-sm font-semibold ${index === 0 ? 'text-white' : 'text-text-secondary'}`}>{item}</Text>
          </Pressable>
        )}
      />

      {/* Top Picks */}
      <Text className="text-lg font-bold text-white px-4 md:px-6 mt-6 mb-3">Top Picks</Text>
      <FlatList
        data={DESTINATIONS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 md:px-6 pb-24 gap-3"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/(tabs)/explore/destination/${item.id}`)}
            className="w-full md:w-[calc(50%-6px)] bg-bg-card rounded-card p-4 flex-row items-center active:opacity-80"
          >
            <View className="w-16 h-16 bg-white/5 rounded-button items-center justify-center mr-4">
              <Text className="text-2xl">🏝️</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-bold">{item.name}</Text>
              <Text className="text-text-secondary text-xs">{item.country}</Text>
            </View>
            <Text className="text-primary text-sm font-bold">{item.match}%</Text>
          </Pressable>
        )}
      />

      {/* FAB */}
      <Pressable
        onPress={() => router.push('/_modals/ai-chat')}
        className="absolute bottom-24 right-5 w-14 h-14 bg-primary rounded-full items-center justify-center"
      >
        <Text className="text-2xl">🤖</Text>
      </Pressable>
    </View>
  );
}
