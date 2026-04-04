import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const TRANSACTIONS = [
 { id: '1', type: 'earn', title: 'Flight Booking', points: 350, date: 'Apr 2, 2026', iconName: 'airplane' },
 { id: '2', type: 'earn', title: 'Hotel Review', points: 50, date: 'Apr 1, 2026', iconName: 'star' },
 { id: '3', type: 'redeem', title: 'Restaurant Voucher', points: -2500, date: 'Mar 28, 2026', iconName: 'restaurant' },
 { id: '4', type: 'earn', title: 'Daily Check-in', points: 10, date: 'Mar 27, 2026', emoji: 'calendar' },
 { id: '5', type: 'earn', title: 'Photo Upload (5)', points: 50, date: 'Mar 25, 2026', iconName: 'camera' },
 { id: '6', type: 'earn', title: 'Challenge: Foodie', points: 300, date: 'Mar 22, 2026', iconName: 'flag' },
 { id: '7', type: 'earn', title: 'Referral Bonus', points: 500, date: 'Mar 20, 2026', iconName: 'people' },
 { id: '8', type: 'redeem', title: 'Flight Discount', points: -5000, date: 'Mar 15, 2026', iconName: 'airplane' },
 { id: '9', type: 'earn', title: 'Hotel Booking', points: 200, date: 'Mar 10, 2026', iconName: 'bed' },
 { id: '10', type: 'expire', title: 'Points Expired', points: -100, date: 'Mar 1, 2026', iconName: 'alarm' },
];

export default function PointsTransactionsScreen() {
 const router = useRouter();
 const [filter, setFilter] = useState<'all' | 'earn' | 'redeem'>('all');
 const filtered = filter === 'all' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === filter);

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Points History" />
 </View>
 <View className="flex-row mx-4 mb-3">
 {(['all', 'earn', 'redeem'] as const).map(f => (
 <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`flex-1 py-2 mx-1 rounded-xl ${filter === f ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center text-sm font-[Satoshi-Bold] capitalize ${filter === f ? 'text-white' : 'text-white/60'}`}>{f === 'all' ? 'All' : f === 'earn' ? 'Earned' : 'Redeemed'}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState stateKey="transactions" />} data={filtered} keyExtractor={i => i.id} renderItem={({ item }) => (
 <View className="flex-row items-center mx-4 mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mr-3">{item.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.title}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.date}</Text>
 </View>
 <Text className={`font-[Satoshi-Bold] ${item.points > 0 ? 'text-green-400' : item.type === 'expire' ? 'text-red-400' : 'text-white/60'}`}>
 {item.points > 0 ? '+' : ''}{item.points.toLocaleString()}
 </Text>
 </View>
 )} />
 </View>
 );
}
