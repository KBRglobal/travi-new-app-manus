import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const NOTIFS = Array.from({ length: 10 }, (_, i) => ({ id: `n-${i+1}`, title: `Notification ${i+1}`, body: 'Something happened in your trip', time: `${i+1}h ago`, read: i > 2 }));

export default function NotificationsScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Notifications</Text>
      </View>
      <FlatList data={NOTIFS} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4"
        renderItem={({ item }) => (
          <View className={`py-4 border-b border-white/5 ${!item.read ? 'bg-primary/5' : ''}`}>
            <View className="flex-row items-center">
              {!item.read && <View className="w-2 h-2 rounded-full bg-primary mr-2" />}
              <Text className="text-white text-base font-bold flex-1">{item.title}</Text>
              <Text className="text-text-muted text-xs">{item.time}</Text>
            </View>
            <Text className="text-text-secondary text-sm mt-1">{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}
