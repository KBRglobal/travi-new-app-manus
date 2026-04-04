import { View, Text, Pressable, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
const DESTS = Array.from({ length: 15 }, (_, i) => ({ id: `d-${i+1}`, name: `Destination ${i+1}`, country: `Country ${i+1}` }));

export default function PlanDestinationScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Choose Destination</Text>
      </View>
      <TextInput placeholder="Search..." placeholderTextColor="rgba(255,255,255,0.3)" className="mx-4 md:mx-6 mt-4 h-12 px-4 bg-white/5 border border-white/10 rounded-pill text-white text-base" />
      <FlatList data={DESTS} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-3"
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push('/(trip)/plan/dates')} className="w-full md:w-[calc(50%-6px)] bg-bg-card rounded-card p-4 flex-row items-center active:opacity-80">
            <View className="w-12 h-12 bg-white/5 rounded-button items-center justify-center mr-3"><Text className="text-2xl">🏝️</Text></View>
            <View className="flex-1"><Text className="text-white text-base font-bold">{item.name}</Text><Text className="text-text-secondary text-xs">{item.country}</Text></View>
            <Text className="text-text-secondary">›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
