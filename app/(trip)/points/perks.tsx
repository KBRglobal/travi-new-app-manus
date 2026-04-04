import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">My Perks</Text>
      </View>
      <View className="mx-4 mb-4 p-4 bg-primary/10 rounded-2xl border border-primary/20">
        <Text className="text-white font-bold text-lg">Gold Member</Text>
        <Text className="text-white/60 text-sm">5,600 more points to reach Platinum</Text>
        <View className="h-2 bg-white/[0.05] rounded-full mt-3 overflow-hidden">
          <View className="h-full bg-primary rounded-full" style={{ width: '73%' }} />
        </View>
      </View>
      {['Silver', 'Gold', 'Platinum'].map(tier => {
        const tierPerks = PERKS.filter(p => p.tier === tier);
        return (
          <View key={tier} className="mx-4 mb-6">
            <Text className="text-white/60 text-xs uppercase mb-3 ml-1">{tier} Perks</Text>
            {tierPerks.map(item => (
              <View key={item.title} className={`flex-row items-center mb-2 p-4 rounded-2xl border ${item.unlocked ? 'bg-bg-secondary border-white/[0.08]' : 'bg-bg-secondary/50 border-white/[0.04]'}`}>
                <Text className={`text-2xl mr-3 ${item.unlocked ? '' : 'opacity-30'}`}>{item.emoji}</Text>
                <View className="flex-1">
                  <Text className={`font-bold ${item.unlocked ? 'text-white' : 'text-white/30'}`}>{item.title}</Text>
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
