import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const FLIGHTS = Array.from({ length: 6 }, (_, i) => ({ id: `f-${i+1}`, airline: `Airline ${i+1}`, price: `€${150 + i * 30}`, time: `${6+i*2}:00 - ${9+i*2}:30`, stops: i % 3 === 0 ? 'Direct' : `${(i%3)} stop` }));

export default function PlanFlightsScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Select Flight</Text>
        <View className="ml-auto bg-status-warning/20 rounded-pill px-3 py-1"><Text className="text-status-warning text-xs">⏱ 15:00</Text></View>
      </View>
      <FlatList data={FLIGHTS} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-3"
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push('/(trip)/plan/hotels')} className="w-full md:w-[calc(50%-6px)] bg-bg-card rounded-card p-4 active:opacity-80">
            <View className="flex-row justify-between"><Text className="text-white text-base font-bold">{item.airline}</Text><Text className="text-primary text-base font-bold">{item.price}</Text></View>
            <Text className="text-text-secondary text-sm mt-1">{item.time}</Text>
            <Text className="text-text-muted text-xs mt-1">{item.stops}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
