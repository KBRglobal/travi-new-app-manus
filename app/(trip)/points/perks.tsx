import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const PERKS = [
  { iconName: 'airplane', title: 'Priority Boarding', desc: 'Skip the line at the gate', tier: 'Silver', unlocked: true },
  { iconName: 'briefcase', title: 'Extra Luggage', desc: '+10kg baggage allowance', tier: 'Silver', unlocked: true },
  { iconName: 'bed', title: 'Room Upgrade', desc: 'Free room upgrade when available', tier: 'Gold', unlocked: true },
  { iconName: 'restaurant', title: 'Airport Lounge', desc: '2 free lounge visits/month', tier: 'Gold', unlocked: true },
  { iconName: 'car', title: 'Free Airport Transfer', desc: 'Complimentary car service', tier: 'Platinum', unlocked: false },
  { iconName: 'gift', title: 'Welcome Gift', desc: 'Special gift at check-in', tier: 'Platinum', unlocked: false },
  { iconName: 'diamond', title: 'Concierge Service', desc: '24/7 personal travel concierge', tier: 'Platinum', unlocked: false },
  { iconName: 'star', title: 'Exclusive Events', desc: 'VIP access to travel events', tier: 'Platinum', unlocked: false },
];

export default function PerksScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <ScreenHeader title="My Perks" />
      </View>
      <View className="mx-4 mb-4 p-4 bg-[#6443F4]/10 rounded-2xl border border-[#6443F4]/20">
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Gold Member</Text>
        <Text className="/60 text-sm" style={{ color: colors.text.primary }}>5,600 more points to reach Platinum</Text>
        <View className="h-2 bg-white/[0.05] rounded-full mt-3 overflow-hidden">
          <View className="h-full bg-[#6443F4] rounded-full" style={{ width: '73%' }} />
        </View>
      </View>
      {['Silver', 'Gold', 'Platinum'].map(tier => {
        const tierPerks = PERKS.filter(p => p.tier === tier);
        return (
          <View key={tier} className="mx-4 mb-6">
            <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>{tier} Perks</Text>
            {tierPerks.map(item => (
              <View key={item.title} className={`flex-row items-center mb-2 p-4 rounded-2xl border ${item.unlocked ? 'bg-[#120824] border-white/[0.08]' : 'bg-[#120824]/50 border-white/[0.04]'}`}>
                <Text className={`text-2xl mr-3 ${item.unlocked ? '' : 'opacity-30'}`}>{item.emoji}</Text>
                <View className="flex-1">
                  <Text className={`font-[Satoshi-Bold] ${item.unlocked ? 'text-white' : 'text-white/30'}`}>{item.title}</Text>
                  <Text className={`text-xs ${item.unlocked ? 'text-white/40' : 'text-white/20'}`}>{item.desc}</Text>
                </View>
                {item.unlocked ? <Ionicons name="checkmark" size={24} color="#FFFFFF" /> : <Ionicons name="lock-closed" size={24} color="#FFFFFF" />}
              </View>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}
