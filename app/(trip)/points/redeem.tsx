import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const REWARDS = Array.from({ length: 8 }, (_, i) => ({ id: `r-${i+1}`, name: `Reward ${i+1}`, points: (i+1) * 500, category: ['Flight', 'Hotel', 'Activity', 'Cashback'][i % 4] }));

export default function RedeemScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Redeem Points</Text>
        <View className="ml-auto bg-primary/20 rounded-pill px-3 py-1"><Text className="text-primary text-xs font-bold">12,450 pts</Text></View>
      </View>
      <FlatList data={REWARDS} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-3"
        renderItem={({ item }) => (
          <Pressable className="w-full md:w-[calc(50%-6px)] bg-bg-card rounded-card p-4 flex-row items-center active:opacity-80">
            <View className="w-12 h-12 bg-primary/20 rounded-button items-center justify-center mr-3"><Text className="text-xl">🎁</Text></View>
            <View className="flex-1"><Text className="text-white text-base font-bold">{item.name}</Text><Text className="text-text-secondary text-xs">{item.category}</Text></View>
            <Text className="text-primary text-sm font-bold">{item.points} pts</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
