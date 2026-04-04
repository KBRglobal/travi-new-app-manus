import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const REWARDS = [
 { id: '1', iconName: 'airplane', title: 'Flight Discount $50', cost: 5000, category: 'travel' },
 { id: '2', iconName: 'bed', title: 'Hotel Night Free', cost: 10000, category: 'travel' },
 { id: '3', iconName: 'restaurant', title: 'Restaurant Voucher $25', cost: 2500, category: 'food' },
 { id: '4', iconName: 'headset', title: 'Airport Lounge Pass', cost: 3000, category: 'travel' },
 { id: '5', emoji: '', title: 'Spa Treatment', cost: 4000, category: 'wellness' },
 { id: '6', iconName: 'camera', title: 'Photo Book Credit', cost: 1500, category: 'gift' },
 { id: '7', iconName: 'gift', title: 'Gift Card $10', cost: 1000, category: 'gift' },
 { id: '8', iconName: 'car', title: 'Car Rental Day', cost: 7500, category: 'travel' },
 { id: '9', emoji: '', title: 'Travel Gear Discount', cost: 2000, category: 'gift' },
];

export default function RedeemScreen() {
 const router = useRouter();
 const balance = 15400;
 const [filter, setFilter] = useState('all');
 const [redeemed, setRedeemed] = useState<string | null>(null);

 const filtered = filter === 'all' ? REWARDS : REWARDS.filter(r => r.category === filter);

 if (redeemed) {
 const item = REWARDS.find(r => r.id === redeemed);
 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
 <Ionicons name="sparkles" size={24} color="#FFFFFF" />
 <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Redeemed!</Text>
 <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>{item?.title} has been added to your account.</Text>
 <TouchableOpacity onPress={() => { setRedeemed(null); router.back(); }} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
 </View>
 );
 }

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Redeem Points" />
 </View>
 <View className="items-center py-4 mx-4 mb-3 bg-[#6443F4]/10 rounded-2xl border border-[#6443F4]/20">
 <Text className="text-[#6443F4] text-3xl font-[Satoshi-Bold]">{balance.toLocaleString()}</Text>
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Points Available</Text>
 </View>
 <View className="flex-row mx-4 mb-3">
 {['all', 'travel', 'food', 'wellness', 'gift'].map(f => (
 <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`px-3 py-1.5 rounded-full mr-2 ${filter === f ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-xs capitalize ${filter === f ? 'text-white font-[Satoshi-Bold]' : 'text-white/60'}`}>{f}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="Nothing to redeem yet" description="Earn more points to unlock rewards." />} data={filtered} keyExtractor={i => i.id} renderItem={({ item }) => (
 <View className="flex-row items-center mx-4 mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mr-3">{item.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.title}</Text>
 <Text className="text-[#6443F4] text-xs">{item.cost.toLocaleString()} pts</Text>
 </View>
 <TouchableOpacity onPress={() => balance >= item.cost ? setRedeemed(item.id) : null} className={`px-4 py-2 rounded-xl ${balance >= item.cost ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-sm font-[Satoshi-Bold] ${balance >= item.cost ? 'text-white' : 'text-white/30'}`}>Redeem</Text>
 </TouchableOpacity>
 </View>
 )} />
 </View>
 );
}
