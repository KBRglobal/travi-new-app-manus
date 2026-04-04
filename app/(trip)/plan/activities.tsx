import { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const ACTIVITIES = Array.from({ length: 10 }, (_, i) => ({ id: `a-${i+1}`, name: `Activity ${i+1}`, price: `€${20 + i * 10}`, category: ['Adventure', 'Culture', 'Food', 'Nature'][i % 4] }));

export default function PlanActivitiesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) => setSelected((p) => p.includes(id) ? p.filter((s) => s !== id) : [...p, id]);
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Activities</Text>
      </View>
      <FlatList data={ACTIVITIES} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-3 pb-32"
        renderItem={({ item }) => (
          <Pressable onPress={() => toggle(item.id)} className={`w-full md:w-[calc(50%-6px)] rounded-card p-4 flex-row items-center border ${selected.includes(item.id) ? 'bg-primary/20 border-primary' : 'bg-bg-card border-white/8'}`}>
            <View className="w-12 h-12 bg-white/5 rounded-button items-center justify-center mr-3"><Text className="text-xl">🎯</Text></View>
            <View className="flex-1"><Text className="text-white text-base font-bold">{item.name}</Text><Text className="text-text-secondary text-xs">{item.category} · {item.price}</Text></View>
            {selected.includes(item.id) && <View className="w-6 h-6 bg-primary rounded-full items-center justify-center"><Text className="text-white text-xs">✓</Text></View>}
          </Pressable>
        )}
      />
      <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-primary pt-4">
        <Pressable onPress={() => router.push('/(trip)/plan/itinerary')} className="w-full max-w-md mx-auto h-14 bg-primary rounded-button items-center justify-center active:opacity-80">
          <Text className="text-white text-base font-semibold">Continue ({selected.length} selected)</Text>
        </Pressable>
      </View>
    </View>
  );
}
