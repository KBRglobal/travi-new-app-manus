import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const CHATS = Array.from({ length: 8 }, (_, i) => ({ id: `c-${i+1}`, name: `Traveler ${i+1}`, lastMsg: 'Hey, how was your trip?', time: `${i+1}h ago`, unread: i < 3 }));

export default function MessagesScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Messages</Text>
      </View>
      <FlatList data={CHATS} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4"
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/(social)/chat/${item.id}`)} className="flex-row items-center py-4 border-b border-white/5 active:opacity-80">
            <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center mr-3"><Text className="text-xl">👤</Text></View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between"><Text className="text-white text-base font-bold">{item.name}</Text><Text className="text-text-muted text-xs">{item.time}</Text></View>
              <Text className="text-text-secondary text-sm mt-1" numberOfLines={1}>{item.lastMsg}</Text>
            </View>
            {item.unread && <View className="w-3 h-3 rounded-full bg-primary ml-2" />}
          </Pressable>
        )}
      />
    </View>
  );
}
