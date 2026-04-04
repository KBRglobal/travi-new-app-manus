import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const HOTELS = Array.from({ length: 8 }, (_, i) => ({ id: `h-${i+1}`, name: `Hotel ${i+1}`, price: `€${80 + i * 25}/night`, rating: (4 + Math.random()).toFixed(1), stars: '⭐'.repeat(3 + (i % 3)) }));

export default function PlanHotelsScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Select Hotel</Text>
      </View>
      <FlatList data={HOTELS} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-3"
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/(trip)/plan/hotel/${item.id}`)} className="w-full md:w-[calc(50%-6px)] bg-bg-card rounded-card overflow-hidden active:opacity-80">
            <View className="w-full h-32 bg-white/5 items-center justify-center"><Text className="text-3xl">🏨</Text></View>
            <View className="p-4">
              <Text className="text-white text-base font-bold">{item.name}</Text>
              <Text className="text-text-secondary text-xs mt-1">{item.stars} · {item.rating}</Text>
              <Text className="text-primary text-sm font-bold mt-2">{item.price}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
