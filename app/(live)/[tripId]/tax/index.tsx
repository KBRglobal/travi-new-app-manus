import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function TaxHubScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const items = [
    { iconName: 'add-circle', label: 'Add Purchase', route: `/(live)/${tripId}/tax/add` },
    { iconName: 'clipboard', label: 'Review Purchases', route: `/(live)/${tripId}/tax/review` },
    { iconName: 'book', label: 'Tax Rules', route: `/(live)/${tripId}/tax/rules` },
    { iconName: 'receipt', label: 'VAT Refund', route: `/(live)/${tripId}/tax/vat` },
    { iconName: 'checkmark-circle', label: 'Checklist', route: `/(live)/${tripId}/tax/checklist` },
    { iconName: 'create', label: 'Tax Form', route: `/(live)/${tripId}/tax/form` },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text></Pressable>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Tax Refund</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6">
        <View className="w-full max-w-md mx-auto bg-[#6443F4]/10 border border-[#6443F4]/30 rounded-[16px] p-4 mb-4 items-center">
          <Text className="text-[rgba(255,255,255,0.6)] text-sm">Potential Refund</Text>
          <Text className=" text-3xl font-[Satoshi-Bold] mt-1" style={{ color: colors.text.primary }}>€85.40</Text>
        </View>
        {items.map((item) => (
          <Pressable key={item.label} onPress={() => router.push(item.route as any)} className="w-full max-w-md mx-auto bg-[#120824] rounded-[16px] p-4 flex-row items-center mb-3 active:opacity-80">
            <Text className="text-xl mr-3">{item.icon}</Text>
            <Text className=" text-base flex-1" style={{ color: colors.text.primary }}>{item.label}</Text>
            <Text className="text-[rgba(255,255,255,0.6)]">›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
