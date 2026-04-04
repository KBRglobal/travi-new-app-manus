import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const DIMENSIONS = [
  { label: 'Adventure', score: 85 },
  { label: 'Culture', score: 72 },
  { label: 'Relaxation', score: 60 },
];

// S10 — DNA Summary
export default function DNASummaryScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      {/* Header */}
      <View className="flex-row items-center px-6 md:px-12 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text>
        </Pressable>
        <View className="flex-1 h-1 bg-white/10 rounded-full ml-4">
          <View className="w-full h-full bg-[#6443F4] rounded-full" />
        </View>
        <Ionicons name="checkmark" size={24} color="#FFFFFF" />
      </View>

      <ScrollView contentContainerClassName="px-6 md:px-12 pb-32">
        {/* Persona Card */}
        <View className="w-full max-w-md mx-auto mt-8 bg-[#6443F4] rounded-xl p-6 md:p-8 items-center">
          <Ionicons name="globe" size={24} color="#FFFFFF" />
          <Text className="text-[rgba(255,255,255,0.6)] text-sm mt-4">You're a</Text>
          <Text className="text-3xl md:text-4xl font-[Satoshi-Bold]  mt-1" style={{ color: colors.text.primary }}>Explorer</Text>
          <Text className="text-[rgba(255,255,255,0.6)] text-sm text-center mt-2 px-4">
            You seek adventure and new experiences wherever you go
          </Text>
        </View>

        {/* Dimension Bars */}
        <View className="w-full max-w-md mx-auto mt-8 gap-4">
          {DIMENSIONS.map((dim) => (
            <View key={dim.label}>
              <View className="flex-row justify-between mb-1">
                <Text className=" text-base" style={{ color: colors.text.primary }}>{dim.label}</Text>
                <Text className="text-[#6443F4] text-base font-[Satoshi-Bold]">{dim.score}%</Text>
              </View>
              <View className="h-2 bg-white/10 rounded-full">
                <View
                  className="h-full bg-[#6443F4] rounded-full"
                  style={{ width: `${dim.score}%` }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-safe mb-4 bg-bg-[#6443F4] pt-4">
        <Pressable
          onPress={() => {
            router.replace('/(tabs)/home');
            // TODO: trigger /_modals/dna-celebration
          }}
          className="w-full max-w-md mx-auto h-14 bg-[#6443F4] rounded-[12px] items-center justify-center active:opacity-80"
        >
          <Text className=" text-base md:text-lg font-semibold" style={{ color: colors.text.primary }}>See My Recommendations →</Text>
        </Pressable>
      </View>
    </View>
  );
}
