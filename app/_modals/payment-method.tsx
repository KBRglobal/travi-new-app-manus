import { haptic } from '@/lib/haptics';
import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentMethodModal() {
  const router = useRouter();
  const methods = [
    { iconName: 'card', label: 'Credit Card', sub: '**** 4242' },
    { iconName: 'business', label: 'Bank Transfer', sub: 'Direct debit' },
    { iconName: 'phone-portrait', label: 'Apple Pay', sub: 'Instant' },
    { iconName: 'cash', label: 'Travi Wallet', sub: '€1,250.00' },
  ];
  return (
    <View className="flex-1 bg-bg-primary justify-end">
      <View className="bg-bg-card rounded-t-3xl px-6 md:px-12 pt-6 pb-safe">
        <View className="w-10 h-1 bg-white/20 rounded-full self-center mb-6" />
        <Text className="text-white text-xl font-bold">Payment Method</Text>
        <ScrollView removeClippedSubviews={true} className="mt-4">
          {methods.map((m) => (
            <Pressable key={m.label} onPress={() => router.back()} className="flex-row items-center py-4 border-b border-white/5 active:opacity-80">
              <Text className="text-2xl mr-3">{m.icon}</Text>
              <View className="flex-1"><Text className="text-white text-base">{m.label}</Text><Text className="text-text-secondary text-xs">{m.sub}</Text></View>
              <Text className="text-text-secondary">›</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
