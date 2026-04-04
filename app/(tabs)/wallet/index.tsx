import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const TRANSACTIONS = [
  { id: '1', label: 'Hotel Barcelona', amount: '-€320.00', date: 'Mar 28' },
  { id: '2', label: 'Cashback Reward', amount: '+€16.00', date: 'Mar 28' },
  { id: '3', label: 'Flight TLV-BCN', amount: '-€180.00', date: 'Mar 25' },
];

// S48 — Wallet
export default function WalletScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <Text className="text-2xl md:text-3xl font-bold text-white px-4 md:px-6 mt-4">Wallet</Text>

      <ScrollView contentContainerClassName="px-4 md:px-6 pb-24">
        {/* Balance Card */}
        <View className="w-full max-w-md bg-primary rounded-xl p-6 mt-4">
          <Text className="text-white/70 text-sm">Available Balance</Text>
          <Text className="text-white text-3xl md:text-4xl font-bold mt-1">€1,250.00</Text>
          <View className="flex-row gap-3 mt-4">
            <Pressable
              onPress={() => router.push('/(trip)/wallet/add-funds')}
              className="flex-1 h-10 bg-white/20 rounded-button items-center justify-center active:opacity-80"
            >
              <Text className="text-white text-sm font-semibold">+ Add Funds</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/(trip)/wallet/split')}
              className="flex-1 h-10 bg-white/20 rounded-button items-center justify-center active:opacity-80"
            >
              <Text className="text-white text-sm font-semibold">Split</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-3 mt-4">
          <Pressable
            onPress={() => router.push('/(trip)/wallet/transactions')}
            className="flex-1 bg-white/5 border border-white/8 rounded-card p-4 items-center active:opacity-80"
          >
            <Text className="text-lg">📊</Text>
            <Text className="text-white text-sm mt-2">Transactions</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(trip)/wallet/kyc')}
            className="flex-1 bg-white/5 border border-white/8 rounded-card p-4 items-center active:opacity-80"
          >
            <Text className="text-lg">🪪</Text>
            <Text className="text-white text-sm mt-2">KYC</Text>
          </Pressable>
        </View>

        {/* Recent Transactions */}
        <Text className="text-lg font-bold text-white mt-6 mb-3">Recent</Text>
        {TRANSACTIONS.map((tx) => (
          <View key={tx.id} className="flex-row items-center justify-between py-3 border-b border-white/5">
            <View>
              <Text className="text-white text-base">{tx.label}</Text>
              <Text className="text-text-muted text-xs">{tx.date}</Text>
            </View>
            <Text className={`text-base font-bold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>
              {tx.amount}
            </Text>
          </View>
        ))}
      </ScrollView>

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
