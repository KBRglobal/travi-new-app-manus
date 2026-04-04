import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function LiveDashboardScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const actions = [
    { icon: '📋', label: 'Timeline', route: `/(live)/${tripId}/timeline` },
    { icon: '🗺️', label: 'Map', route: `/(live)/${tripId}/map` },
    { icon: '💰', label: 'Expenses', route: `/(live)/${tripId}/expenses` },
    { icon: '📸', label: 'Memories', route: `/(live)/${tripId}/memories` },
    { icon: '🆘', label: 'Emergency', route: `/(live)/${tripId}/emergency` },
    { icon: '⚙️', label: 'Settings', route: `/(live)/${tripId}/settings` },
    { icon: '🧾', label: 'Tax Refund', route: `/(live)/${tripId}/tax` },
  ];
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 md:px-6 mt-4">
        <View>
          <Text className="text-text-secondary text-sm">Live Trip</Text>
          <Text className="text-white text-xl font-bold">Barcelona · Day 3</Text>
        </View>
        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-green-500 mr-2" /><Text className="text-green-400 text-sm">Active</Text></View>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-4 pb-24">
        {/* Next event */}
        <View className="w-full max-w-md bg-primary/10 border border-primary/30 rounded-card p-4 mb-4">
          <Text className="text-text-secondary text-xs">Next up in 45 min</Text>
          <Text className="text-white text-lg font-bold mt-1">Sagrada Familia Tour</Text>
        </View>
        {/* Weather */}
        <View className="w-full max-w-md bg-white/5 rounded-card p-4 mb-4 flex-row items-center">
          <Text className="text-3xl mr-3">☀️</Text><View><Text className="text-white text-lg font-bold">25°C</Text><Text className="text-text-secondary text-xs">Sunny, Barcelona</Text></View>
        </View>
        {/* Quick Actions */}
        <View className="flex-row flex-wrap gap-3">
          {actions.map((a) => (
            <Pressable key={a.label} onPress={() => router.push(a.route as any)} className="w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] bg-bg-card rounded-card p-4 items-center active:opacity-80">
              <Text className="text-2xl">{a.icon}</Text>
              <Text className="text-white text-sm mt-2">{a.label}</Text>
            </Pressable>
          ))}
        </View>
        {/* Activity */}
        <Text className="text-lg font-bold text-white mt-6 mb-3">Today's Activities</Text>
        {['Morning Walk', 'Sagrada Familia', 'Lunch at La Boqueria'].map((act, i) => (
          <Pressable key={i} onPress={() => router.push(`/(live)/${tripId}/activity/act-${i+1}`)} className="bg-bg-card rounded-card p-4 mb-2 flex-row items-center active:opacity-80">
            <View className="w-8 h-8 bg-primary/20 rounded-full items-center justify-center mr-3"><Text className="text-primary text-xs font-bold">{i+1}</Text></View>
            <Text className="text-white text-base flex-1">{act}</Text><Text className="text-text-secondary">›</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable onPress={() => router.push('/_modals/ai-chat')} className="absolute bottom-6 right-5 w-14 h-14 bg-primary rounded-full items-center justify-center">
        <Text className="text-2xl">🤖</Text>
      </Pressable>
    </View>
  );
}
