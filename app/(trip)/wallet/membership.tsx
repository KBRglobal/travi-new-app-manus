import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function MembershipScreen() {
  const router = useRouter();
  const tiers = [
    { name: 'Explorer', price: 'Free', features: ['Basic planning', 'Community access'] },
    { name: 'Adventurer', price: '€9.99/mo', features: ['AI planning', 'Priority support', 'Cashback 2%'] },
    { name: 'Globetrotter', price: '€19.99/mo', features: ['Everything in Adventurer', 'Cashback 5%', 'Lounge access', 'Concierge'] },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text></Pressable>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Membership</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6 gap-4">
        {tiers.map((tier, i) => (
          <View key={tier.name} className={`w-full max-w-md mx-auto rounded-[16px] p-5 border ${i === 1 ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/8'}`}>
            <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{tier.name}</Text>
            <Text className="text-[#6443F4] text-lg font-[Satoshi-Bold] mt-1">{tier.price}</Text>
            {tier.features.map((f) => (
              <Text key={f} className="text-[rgba(255,255,255,0.6)] text-sm mt-2">{f}</Text>
            ))}
            <Pressable onPress={() => {}} className={`w-full h-12 rounded-[12px] items-center justify-center mt-4 ${i === 1 ? 'bg-[#6443F4]' : 'bg-white/10'}`}>
              <Text className=" text-sm font-semibold" style={{ color: colors.text.primary }}>{i === 0 ? 'Current Plan' : 'Upgrade'}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
