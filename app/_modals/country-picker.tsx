import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import { View, Text, Pressable, FlatList, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
const COUNTRIES = ['Israel', 'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Japan', 'Australia', 'Brazil', 'Canada', 'India'];

export default function CountryPickerModal() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} justify-end">
      <View className="bg-[#120824] rounded-t-3xl px-6 md:px-12 pt-6 pb-safe h-3/4">
        <View className="w-10 h-1 bg-white/20 rounded-full self-center mb-6" />
        <Text className=" text-xl font-[Satoshi-Bold] mb-4" style={{ color: colors.text.primary }}>Select Country</Text>
        <TextInput placeholder="Search..." placeholderTextColor="rgba(255,255,255,0.3)" className="h-12 px-4 bg-white/5 border border-white/10 rounded-full text-white text-base mb-4" />
        <FlatList data={COUNTRIES} keyExtractor={(i) => i}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.back()} className="py-4 border-b border-white/5 active:opacity-80">
              <Text className=" text-base" style={{ color: colors.text.primary }}>{item}</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}
