import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// S91 — Points Hub
export default function PointsHubScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <Text className="text-2xl md:text-3xl font-bold text-white px-4 md:px-6 mt-4">Points</Text>

      <ScrollView contentContainerClassName="px-4 md:px-6 pb-24">
        {/* Points Balance */}
        <View className="w-full max-w-md bg-primary rounded-xl p-6 mt-4 items-center">
          <Text className="text-white/70 text-sm">Your Points</Text>
          <Text className="text-white text-4xl md:text-5xl font-bold mt-1">12,450</Text>
          <Text className="text-white/60 text-sm mt-1">≈ €124.50 value</Text>
        </View>

        {/* Actions Grid */}
        <View className="flex-row flex-wrap gap-3 mt-4">
          <Pressable
            onPress={() => router.push('/(trip)/points/redeem')}
            className="w-[calc(50%-6px)] bg-white/5 border border-white/8 rounded-card p-4 items-center active:opacity-80"
          >
            <Text className="text-2xl">🎁</Text>
            <Text className="text-white text-sm font-semibold mt-2">Redeem</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(trip)/points/earn')}
            className="w-[calc(50%-6px)] bg-white/5 border border-white/8 rounded-card p-4 items-center active:opacity-80"
          >
            <Text className="text-2xl">💎</Text>
            <Text className="text-white text-sm font-semibold mt-2">Earn More</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(trip)/points/transactions')}
            className="w-[calc(50%-6px)] bg-white/5 border border-white/8 rounded-card p-4 items-center active:opacity-80"
          >
            <Text className="text-2xl">📊</Text>
            <Text className="text-white text-sm font-semibold mt-2">History</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(trip)/points/perks')}
            className="w-[calc(50%-6px)] bg-white/5 border border-white/8 rounded-card p-4 items-center active:opacity-80"
          >
            <Text className="text-2xl">✨</Text>
            <Text className="text-white text-sm font-semibold mt-2">Perks</Text>
          </Pressable>
        </View>

        {/* Referrals */}
        <Pressable
          onPress={() => router.push('/(trip)/points/referrals')}
          className="w-full bg-pink-500/10 border border-pink-500/30 rounded-card p-4 mt-4 flex-row items-center active:opacity-80"
        >
          <Text className="text-2xl mr-3">👥</Text>
          <View className="flex-1">
            <Text className="text-white text-base font-bold">Invite Friends</Text>
            <Text className="text-text-secondary text-xs">Earn 500 points per referral</Text>
          </View>
          <Text className="text-text-secondary">›</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
