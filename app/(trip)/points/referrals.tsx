import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function ReferralsScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Text className="text-white text-xl font-bold ml-3">Invite Friends</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6 items-center">
        <View className="w-full max-w-md items-center">
          <Ionicons name="people" size={24} color="#FFFFFF" />
          <Text className="text-2xl font-bold text-white mt-4">Earn 500 Points</Text>
          <Text className="text-text-secondary text-sm mt-2 text-center">For every friend who joins and completes their first trip</Text>
          <View className="w-full bg-white/5 rounded-card p-4 mt-6 items-center">
            <Text className="text-text-secondary text-xs">Your referral code</Text>
            <Text className="text-white text-2xl font-bold mt-1 tracking-widest">TRAVI2024</Text>
          </View>
          <Pressable className="w-full h-14 bg-primary rounded-button items-center justify-center mt-6 active:opacity-80">
            <Text className="text-white text-base font-semibold">Share Invite Link</Text>
          </Pressable>
          <Text className="text-lg font-bold text-white mt-8 self-start">Your Referrals</Text>
          <Text className="text-text-secondary text-sm mt-2 self-start">No referrals yet</Text>
        </View>
      </ScrollView>
    </View>
  );
}
