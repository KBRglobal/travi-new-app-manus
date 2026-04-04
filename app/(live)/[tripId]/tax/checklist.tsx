import { View, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function Screen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text>
        </Pressable>
        <Text className=" text-xl md:text-2xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Tax Checklist</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6 items-center">
        
      </ScrollView>
    </View>
  );
}
