import { Skeleton } from '@/components/ui/Skeleton';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const RESULTS = Array.from({ length: 10 }, (_, i) => ({
  id: `result-${i + 1}`,
  name: `Result ${i + 1}`,
  country: `Country ${i + 1}`,
  match: Math.floor(Math.random() * 30) + 70,
}));

// S59 — Search Results
export default function SearchResultsScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q: string }>();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      {/* Header */}
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-white text-2xl">‹</Text>
        </Pressable>
        <Text className="text-white text-lg font-bold ml-3">Results for "{q}"</Text>
      </View>

      <FlatList
            ListEmptyComponent={() => <EmptyState emoji="🔍" title="No results found" description="Try adjusting your search." />}
        data={RESULTS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 md:px-6 py-4 gap-3"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/(tabs)/home/destination/${item.id}`)}
            className="w-full md:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)] bg-bg-card rounded-card p-4 flex-row items-center active:opacity-80"
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
    </View>
  );
}
