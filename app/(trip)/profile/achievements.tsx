import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const ACHIEVEMENTS = [
  { id: '1', iconName: 'globe', title: 'Globe Trotter', desc: 'Visit 10 countries', progress: 8, total: 10, unlocked: false },
  { id: '2', iconName: 'restaurant', title: 'Foodie Master', desc: 'Try 50 local restaurants', progress: 50, total: 50, unlocked: true },
  { id: '3', iconName: 'snow', title: 'Summit Seeker', desc: 'Complete 5 hiking trips', progress: 3, total: 5, unlocked: false },
  { id: '4', iconName: 'camera', title: 'Photographer', desc: 'Upload 100 travel photos', progress: 100, total: 100, unlocked: true },
  { id: '5', iconName: 'airplane', title: 'Frequent Flyer', desc: 'Take 20 flights', progress: 14, total: 20, unlocked: false },
  { id: '6', iconName: 'star', title: 'Top Reviewer', desc: 'Write 25 reviews', progress: 25, total: 25, unlocked: true },
  { id: '7', iconName: 'people', title: 'Social Butterfly', desc: 'Connect with 50 travelers', progress: 32, total: 50, unlocked: false },
  { id: '8', iconName: 'diamond', title: 'VIP Traveler', desc: 'Reach Platinum tier', progress: 0, total: 1, unlocked: false },
];

export default function AchievementsScreen() {
  const router = useRouter();
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <ScreenHeader title="Achievements" />
      </View>
      <View className="items-center py-6">
        <Text className="text-[#6443F4] text-4xl font-[Satoshi-Bold]">{unlocked}/{ACHIEVEMENTS.length}</Text>
        <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Achievements Unlocked</Text>
      </View>
      {ACHIEVEMENTS.map(item => (
        <View key={item.id} className={`flex-row items-center mx-4 mb-3 p-4 rounded-2xl border ${item.unlocked ? 'bg-[#6443F4]/10 border-[#6443F4]/30' : 'bg-[#120824] border-white/[0.08]'}`}>
          <Text className={`text-3xl mr-3 ${item.unlocked ? '' : 'opacity-40'}`}>{item.emoji}</Text>
          <View className="flex-1">
            <Text className={`font-[Satoshi-Bold] ${item.unlocked ? 'text-white' : 'text-white/60'}`}>{item.title}</Text>
            <Text className="/40 text-xs mb-2" style={{ color: colors.text.primary }}>{item.desc}</Text>
            <View className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <View className={`h-full rounded-full ${item.unlocked ? 'bg-[#6443F4]' : 'bg-white/20'}`} style={{ width: `${(item.progress / item.total) * 100}%` }} />
            </View>
            <Text className="/30 text-xs mt-1" style={{ color: colors.text.primary }}>{item.progress}/{item.total}</Text>
          </View>
          {item.unlocked && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
        </View>
      ))}
    </ScrollView>
  );
}
