import { View, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function ActivityDetailScreen() {
  const router = useRouter();
  const { tripId, actId } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text></Pressable>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Activity {actId}</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6">
        <View className="w-full max-w-md mx-auto">
          <View className="w-full h-48 bg-white/5 rounded-[16px] items-center justify-center mb-4"><Ionicons name="flag" size={24} color="#FFFFFF" /></View>
          <Text className=" text-2xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Activity Details</Text>
          <Text className="text-[rgba(255,255,255,0.6)] text-sm mt-2">Time: 10:00 AM - 12:00 PM</Text>
          <Text className="text-[rgba(255,255,255,0.6)] text-sm mt-4 leading-6">Enjoy this amazing activity during your trip. Don't forget to take photos!</Text>
          <Pressable onPress={() => router.push('/_modals/quick-rating')} className="w-full h-12 bg-[#6443F4]/20 border border-[#6443F4] rounded-[12px] items-center justify-center mt-6 active:opacity-80">
            <Text className="text-[#6443F4] text-base font-semibold">Rate Activity</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
