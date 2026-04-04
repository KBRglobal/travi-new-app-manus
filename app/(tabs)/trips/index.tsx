import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const TRIPS = [
  { id: 'trip-1', name: 'Barcelona Adventure', status: 'active', dates: 'Mar 28 - Apr 5' },
  { id: 'trip-2', name: 'Tokyo Explorer', status: 'upcoming', dates: 'May 10 - May 20' },
  { id: 'trip-3', name: 'Paris Romance', status: 'completed', dates: 'Feb 14 - Feb 21' },
  { id: 'trip-4', name: 'Bali Retreat', status: 'draft', dates: 'TBD' },
];

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500',
  upcoming: 'bg-blue-500',
  completed: 'bg-purple-500',
  draft: 'bg-gray-500',
};

// S57 — My Trips
export default function MyTripsScreen() {
  const router = useRouter();

  const handleTripPress = (trip: typeof TRIPS[0]) => {
    switch (trip.status) {
      case 'draft': router.push('/(trip)/plan'); break;
      case 'upcoming': router.push(`/(trip)/pre/${trip.id}`); break;
      case 'active': router.push(`/(live)/${trip.id}`); break;
      case 'completed': router.push(`/(trip)/post/${trip.id}/summary`); break;
    }
  };

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 md:px-6 mt-4">
        <Text className="text-2xl md:text-3xl font-bold text-white">My Trips</Text>
        <Pressable
          onPress={() => router.push('/(trip)/plan')}
          className="bg-primary rounded-button px-4 py-2"
        >
          <Text className="text-white text-sm font-semibold">+ Plan New</Text>
        </Pressable>
      </View>

      <FlatList
        data={TRIPS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 md:px-6 py-4 gap-3"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleTripPress(item)}
            className="w-full md:w-[calc(50%-6px)] bg-bg-card rounded-card p-4 active:opacity-80"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-white text-lg font-bold flex-1">{item.name}</Text>
              <View className={`${STATUS_COLORS[item.status]} rounded-pill px-2 py-0.5`}>
                <Text className="text-white text-xs font-bold capitalize">{item.status}</Text>
              </View>
            </View>
            <Text className="text-text-secondary text-sm mt-2">{item.dates}</Text>
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
