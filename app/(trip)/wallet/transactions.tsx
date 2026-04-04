import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const TXS = Array.from({ length: 15 }, (_, i) => ({ id: `tx-${i+1}`, label: `Transaction ${i+1}`, amount: i % 3 === 0 ? `+€${(i+1)*5}` : `-€${(i+1)*12}`, date: `Mar ${28-i}` }));

export default function TransactionsScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Transactions</Text>
      </View>
      <FlatList data={TXS} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4"
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between py-3 border-b border-white/5">
            <View><Text className="text-white text-base">{item.label}</Text><Text className="text-text-muted text-xs">{item.date}</Text></View>
            <Text className={`text-base font-bold ${item.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}
