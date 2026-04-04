import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const TRAVELERS = Array.from({ length: 12 }, (_, i) => ({ id: `t-${i+1}`, name: `Traveler ${i+1}`, dna: ['Explorer', 'Foodie', 'Adventurer', 'Culture Lover'][i % 4], match: Math.floor(Math.random() * 30) + 70 }));

export default function DiscoverScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Discover Travelers</Text>
      </View>
      <FlatList data={TRAVELERS} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-3"
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/(social)/profile/${item.id}`)} className="w-full md:w-[calc(50%-6px)] bg-bg-card rounded-card p-4 flex-row items-center active:opacity-80">
            <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center mr-3"><Text className="text-xl">👤</Text></View>
            <View className="flex-1"><Text className="text-white text-base font-bold">{item.name}</Text><Text className="text-text-secondary text-xs">{item.dna}</Text></View>
            <Text className="text-primary text-sm font-bold">{item.match}%</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
