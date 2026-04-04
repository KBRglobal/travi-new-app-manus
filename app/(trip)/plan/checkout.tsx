import { View, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function PlanCheckoutScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text></Pressable>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Checkout</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-4 pb-32">
        <View className="w-full max-w-md mx-auto">
          <Text className="text-[rgba(255,255,255,0.6)] text-sm mb-4">Order Summary</Text>
          <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
            <Text className=" text-base" style={{ color: colors.text.primary }}>Barcelona Trip · 7 days</Text>
            <Text className="text-[#6443F4] text-lg font-[Satoshi-Bold] mt-2">€1,140.00</Text>
          </View>
          <Text className="text-[rgba(255,255,255,0.6)] text-sm mb-4">Payment Method</Text>
          <Pressable onPress={() => router.push('/_modals/payment-method')} className="bg-[#120824] rounded-[16px] p-4 flex-row items-center justify-between mb-4 active:opacity-80">
            <Text className=" text-base" style={{ color: colors.text.primary }}>Select payment method</Text>
            <Text className="text-[rgba(255,255,255,0.6)]">›</Text>
          </Pressable>
          <Pressable onPress={() => {}} className="flex-row items-center mb-4">
            <View className="w-5 h-5 rounded border border-white/20 mr-3 items-center justify-center"><Ionicons name="checkmark" size={24} color="#FFFFFF" /></View>
            <Text className="text-[rgba(255,255,255,0.6)] text-sm">Use 2,000 points (€20 discount)</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-safe mb-4 bg-bg-[#6443F4] pt-4">
        <Pressable onPress={() => router.push('/(trip)/plan/payment')} className="w-full max-w-md mx-auto h-14 bg-[#6443F4] rounded-[12px] items-center justify-center active:opacity-80">
          <Text className=" text-base font-semibold" style={{ color: colors.text.primary }}>Pay €1,120.00</Text>
        </Pressable>
      </View>
    </View>
  );
}
