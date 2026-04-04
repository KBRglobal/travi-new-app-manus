import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function MembershipScreen() {
  const router = useRouter();
  const tiers = [
    { name: 'Explorer', price: 'Free', features: ['Basic planning', 'Community access'] },
    { name: 'Adventurer', price: '€9.99/mo', features: ['AI planning', 'Priority support', 'Cashback 2%'] },
    { name: 'Globetrotter', price: '€19.99/mo', features: ['Everything in Adventurer', 'Cashback 5%', 'Lounge access', 'Concierge'] },
  ];
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Membership</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6 gap-4">
        {tiers.map((tier, i) => (
          <View key={tier.name} className={`w-full max-w-md mx-auto rounded-card p-5 border ${i === 1 ? 'bg-primary/10 border-primary' : 'bg-bg-card border-white/8'}`}>
            <Text className="text-white text-xl font-bold">{tier.name}</Text>
            <Text className="text-primary text-lg font-bold mt-1">{tier.price}</Text>
            {tier.features.map((f) => (
              <Text key={f} className="text-text-secondary text-sm mt-2">{f}</Text>
            ))}
            <Pressable className={`w-full h-12 rounded-button items-center justify-center mt-4 ${i === 1 ? 'bg-primary' : 'bg-white/10'}`}>
              <Text className="text-white text-sm font-semibold">{i === 0 ? 'Current Plan' : 'Upgrade'}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
