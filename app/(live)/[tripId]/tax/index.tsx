import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function TaxHubScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const items = [
    { icon: '➕', label: 'Add Purchase', route: `/(live)/${tripId}/tax/add` },
    { icon: '📋', label: 'Review Purchases', route: `/(live)/${tripId}/tax/review` },
    { icon: '📖', label: 'Tax Rules', route: `/(live)/${tripId}/tax/rules` },
    { icon: '🧾', label: 'VAT Refund', route: `/(live)/${tripId}/tax/vat` },
    { icon: '✅', label: 'Checklist', route: `/(live)/${tripId}/tax/checklist` },
    { icon: '📝', label: 'Tax Form', route: `/(live)/${tripId}/tax/form` },
  ];
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Tax Refund</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6">
        <View className="w-full max-w-md mx-auto bg-primary/10 border border-primary/30 rounded-card p-4 mb-4 items-center">
          <Text className="text-text-secondary text-sm">Potential Refund</Text>
          <Text className="text-white text-3xl font-bold mt-1">€85.40</Text>
        </View>
        {items.map((item) => (
          <Pressable key={item.label} onPress={() => router.push(item.route as any)} className="w-full max-w-md mx-auto bg-bg-card rounded-card p-4 flex-row items-center mb-3 active:opacity-80">
            <Text className="text-xl mr-3">{item.icon}</Text>
            <Text className="text-white text-base flex-1">{item.label}</Text>
            <Text className="text-text-secondary">›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
