import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const BADGES = [
  { id: '1', iconName: 'globe', name: 'World Explorer', desc: 'Visit 10 countries', tier: 'gold', unlocked: true },
  { id: '2', iconName: 'restaurant', name: 'Foodie', desc: 'Rate 20 restaurants', tier: 'gold', unlocked: true },
  { id: '3', iconName: 'camera', name: 'Photographer', desc: 'Upload 100 photos', tier: 'silver', unlocked: true },
  { id: '4', iconName: 'airplane', name: 'Jet Setter', desc: 'Take 15 flights', tier: 'silver', unlocked: false },
  { id: '5', iconName: 'bed', name: 'Hotel Critic', desc: 'Review 10 hotels', tier: 'bronze', unlocked: true },
  { id: '6', iconName: 'fitness', name: 'Adventurer', desc: 'Complete 10 activities', tier: 'bronze', unlocked: false },
  { id: '7', iconName: 'diamond', name: 'VIP', desc: 'Reach Platinum tier', tier: 'platinum', unlocked: false },
  { id: '8', iconName: 'people', name: 'Connector', desc: 'Make 25 travel buddies', tier: 'silver', unlocked: false },
];

const tierColors: Record<string, string> = { platinum: 'bg-purple-500/20', gold: 'bg-yellow-500/20', silver: 'bg-gray-400/20', bronze: 'bg-orange-600/20' };
const tierText: Record<string, string> = { platinum: 'text-purple-400', gold: 'text-yellow-400', silver: 'text-gray-300', bronze: 'text-orange-400' };

export default function BadgesScreen() {
  const router = useRouter();
  const unlocked = BADGES.filter(b => b.unlocked).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <ScreenHeader title="Badges" />
        <View className="flex-1" />
        <Text className="text-[#6443F4] font-[Satoshi-Bold]">{unlocked}/{BADGES.length}</Text>
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="badges" />} data={BADGES} numColumns={2} keyExtractor={i => i.id} contentContainerStyle={{ padding: 8 }} renderItem={({ item }) => (
        <View className={`flex-1 m-2 p-4 rounded-2xl border items-center ${item.unlocked ? 'bg-[#120824] border-white/[0.08]' : 'bg-[#120824]/50 border-white/[0.04]'}`}>
          <Text className={`text-4xl mb-2 ${item.unlocked ? '' : 'opacity-30'}`}>{item.emoji}</Text>
          <Text className={`font-[Satoshi-Bold] text-center text-sm ${item.unlocked ? 'text-white' : 'text-white/30'}`}>{item.name}</Text>
          <Text className="/40 text-xs text-center mt-1" style={{ color: colors.text.primary }}>{item.desc}</Text>
          <View className={`mt-2 px-2 py-0.5 rounded-full ${tierColors[item.tier]}`}>
            <Text className={`text-xs capitalize ${tierText[item.tier]}`}>{item.tier}</Text>
          </View>
        </View>
      )} />
    </View>
  );
}
