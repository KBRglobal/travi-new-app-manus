import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const TIERS = [
 { name: 'Bronze', emoji: '', points: '0', perks: ['Basic rewards', 'Standard support'], color: 'border-orange-600/30', bg: 'bg-orange-600/10' },
 { name: 'Silver', emoji: '', points: '5,000', perks: ['1.5x points', 'Priority boarding', 'Extra luggage'], color: 'border-gray-400/30', bg: 'bg-gray-400/10' },
 { name: 'Gold', iconName: 'medal', points: '15,000', perks: ['2x points', 'Room upgrades', 'Lounge access', 'Priority support'], color: 'border-yellow-500/30', bg: 'bg-yellow-500/10', current: true },
 { name: 'Platinum', iconName: 'diamond', points: '30,000', perks: ['3x points', 'Free transfers', 'Concierge', 'VIP events', 'Welcome gifts'], color: 'border-purple-500/30', bg: 'bg-purple-500/10' },
];

export default function MembershipScreen() {
 const router = useRouter();

 return (
 <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary pt-safe">
 <View className="flex-row items-center px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
 <Text className="text-white text-xl font-bold ml-3">Membership</Text>
 </View>
 <View className="items-center py-6">
 <Ionicons name="medal" size={24} color="#FFFFFF" />
 <Text className="text-white text-2xl font-bold">Gold Member</Text>
 <Text className="text-white/60 text-sm mt-1">15,400 lifetime points</Text>
 </View>
 {TIERS.map(tier => (
 <View key={tier.name} className={`mx-4 mb-3 p-4 rounded-2xl border ${tier.color} ${tier.bg}`}>
 <View className="flex-row items-center mb-2">
 <Text className="text-2xl mr-2">{tier.emoji}</Text>
 <Text className="text-white font-bold text-lg">{tier.name}</Text>
 {(tier as any).current && <View className="ml-2 px-2 py-0.5 bg-primary rounded-full"><Text className="text-white text-xs font-bold">Current</Text></View>}
 <View className="flex-1" />
 <Text className="text-white/40 text-sm">{tier.points} pts</Text>
 </View>
 {tier.perks.map(perk => (
 <View key={perk} className="flex-row items-center ml-8 mb-1">
 <Text className="text-white/40 mr-2 text-xs">•</Text>
 <Text className="text-white/80 text-sm">{perk}</Text>
 </View>
 ))}
 </View>
 ))}
 </ScrollView>
 );
}
