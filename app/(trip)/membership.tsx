import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const TIERS = [
 { name: 'Bronze', emoji: '', points: '0', perks: ['Basic rewards', 'Standard support'], color: 'border-orange-600/30', bg: 'bg-orange-600/10' },
 { name: 'Silver', emoji: '', points: '5,000', perks: ['1.5x points', 'Priority boarding', 'Extra luggage'], color: 'border-gray-400/30', bg: 'bg-gray-400/10' },
 { name: 'Gold', iconName: 'medal', points: '15,000', perks: ['2x points', 'Room upgrades', 'Lounge access', 'Priority support'], color: 'border-yellow-500/30', bg: 'bg-yellow-500/10', current: true },
 { name: 'Platinum', iconName: 'diamond', points: '30,000', perks: ['3x points', 'Free transfers', 'Concierge', 'VIP events', 'Welcome gifts'], color: 'border-purple-500/30', bg: 'bg-purple-500/10' },
];

export default function MembershipScreen() {
 const router = useRouter();

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Membership" />
 </View>
 <View className="items-center py-6">
 <Ionicons name="medal" size={24} color="#FFFFFF" />
 <Text className=" text-2xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Gold Member</Text>
 <Text className="/60 text-sm mt-1" style={{ color: colors.text.primary }}>15,400 lifetime points</Text>
 </View>
 {TIERS.map(tier => (
 <View key={tier.name} className={`mx-4 mb-3 p-4 rounded-2xl border ${tier.color} ${tier.bg}`}>
 <View className="flex-row items-center mb-2">
 <Text className="text-2xl mr-2">{tier.emoji}</Text>
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>{tier.name}</Text>
 {(tier as any).current && <View className="ml-2 px-2 py-0.5 bg-[#6443F4] rounded-full"><Text className=" text-xs font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Current</Text></View>}
 <View className="flex-1" />
 <Text className="/40 text-sm" style={{ color: colors.text.primary }}>{tier.points} pts</Text>
 </View>
 {tier.perks.map(perk => (
 <View key={perk} className="flex-row items-center ml-8 mb-1">
 <Text className="/40 mr-2 text-xs" style={{ color: colors.text.primary }}>•</Text>
 <Text className="/80 text-sm" style={{ color: colors.text.primary }}>{perk}</Text>
 </View>
 ))}
 </View>
 ))}
 </ScrollView>
 );
}
