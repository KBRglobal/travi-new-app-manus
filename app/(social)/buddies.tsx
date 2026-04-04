import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const BUDDIES = Array.from({ length: 12 }, (_, i) => ({ id: `b-${i+1}`, name: `Buddy ${i+1}`, trips: i + 1 }));

export default function BuddiesScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Travel Buddies</Text>
      </View>
      <FlatList data={BUDDIES} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-3"
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/(social)/profile/${item.id}`)} className="w-full md:w-[calc(50%-6px)] bg-bg-card rounded-card p-4 flex-row items-center active:opacity-80">
            <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center mr-3"><Text className="text-xl">👤</Text></View>
            <View className="flex-1"><Text className="text-white text-base font-bold">{item.name}</Text><Text className="text-text-secondary text-xs">{item.trips} trips together</Text></View>
            <Pressable onPress={() => router.push(`/(social)/chat/${item.id}`)}><Text className="text-primary text-sm">Chat</Text></Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}
