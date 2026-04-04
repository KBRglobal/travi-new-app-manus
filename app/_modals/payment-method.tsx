import { haptic } from '@/lib/haptics';
import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function PaymentMethodModal() {
  const router = useRouter();
  const methods = [
    { iconName: 'card', label: 'Credit Card', sub: '**** 4242' },
    { iconName: 'business', label: 'Bank Transfer', sub: 'Direct debit' },
    { iconName: 'phone-portrait', label: 'Apple Pay', sub: 'Instant' },
    { iconName: 'cash', label: 'Travi Wallet', sub: '€1,250.00' },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} justify-end">
      <View className="bg-[#120824] rounded-t-3xl px-6 md:px-12 pt-6 pb-safe">
        <View className="w-10 h-1 bg-white/20 rounded-full self-center mb-6" />
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Payment Method</Text>
        <ScrollView className="mt-4">
          {methods.map((m) => (
            <Pressable key={m.label} onPress={() => router.back()} className="flex-row items-center py-4 border-b border-white/5 active:opacity-80">
              <Text className="text-2xl mr-3">{m.icon}</Text>
              <View className="flex-1"><Text className=" text-base" style={{ color: colors.text.primary }}>{m.label}</Text><Text className="text-[rgba(255,255,255,0.6)] text-xs">{m.sub}</Text></View>
              <Text className="text-[rgba(255,255,255,0.6)]">›</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
