import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
 { iconName: 'bed', name: 'Accommodation', spent: 445, budget: 500, pct: 89 },
 { iconName: 'restaurant', name: 'Food', spent: 180, budget: 200, pct: 90 },
 { iconName: 'car', name: 'Transport', spent: 95, budget: 150, pct: 63 },
 { iconName: 'flag', name: 'Activities', spent: 127, budget: 400, pct: 32 },
 { iconName: 'bag', name: 'Shopping', spent: 0, budget: 250, pct: 0 },
];

const SPLITS = [
 { name: 'Dana', amount: 45.50, direction: 'owe' },
 { name: 'Tom', amount: 32.00, direction: 'owed' },
];

export default function BudgetManager() {
 const router = useRouter();
 const { tripId } = useLocalSearchParams();
 const totalBudget = 1500;
 const totalSpent = 847;
 const daysLeft = 4;
 const perDay = Math.round((totalBudget - totalSpent) / daysLeft);

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>Budget Manager</Text>
 <TouchableOpacity><Text className="text-[#6443F4]">Edit</Text></TouchableOpacity>
 </View>

 <ScrollView className="flex-1 px-4">
 <View className="bg-[#120824] rounded-[16px] p-6 mb-4">
 <Text className="text-[rgba(255,255,255,0.6)] mb-1">Total Budget</Text>
 <Text className=" text-3xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>€{totalBudget.toLocaleString()}</Text>
 <View className="flex-row justify-between mb-2">
 <Text className="text-[rgba(255,255,255,0.6)]">Spent: €{totalSpent}</Text>
 <Text className="text-[#6443F4]">Left: €{totalBudget - totalSpent}</Text>
 </View>
 <View className="bg-bg-[#6443F4] rounded-full h-3 overflow-hidden mb-2">
 <View className="bg-[#6443F4] h-full rounded-full" style={{ width: `${Math.round(totalSpent / totalBudget * 100)}%` }} />
 </View>
 <Text className="text-[rgba(255,255,255,0.3)] text-sm">{Math.round(totalSpent / totalBudget * 100)}% used · {daysLeft} days left · €{perDay}/day remaining</Text>
 </View>

 <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Category Breakdown</Text>
 {CATEGORIES.map(cat => (
 <TouchableOpacity onPress={() => {}} key={cat.name} className="bg-[#120824] rounded-[16px] p-4 mb-2">
 <View className="flex-row items-center justify-between mb-2">
 <View className="flex-row items-center">
 <Text className="text-xl mr-2">{cat.icon}</Text>
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>{cat.name}</Text>
 </View>
 <View className="flex-row items-center">
 <Text className=" font-[Satoshi-Bold] mr-2" style={{ color: colors.text.primary }}>€{cat.spent}</Text>
 <Text className="text-[rgba(255,255,255,0.3)]">/ €{cat.budget}</Text>
 <Text className={`ml-2 ${cat.pct >= 80 ? 'text-yellow-400' : 'text-green-400'}`}>{cat.pct >= 80 ? '' : 'checkmark'}</Text>
 </View>
 </View>
 <View className="bg-bg-[#6443F4] rounded-full h-2 overflow-hidden">
 <View className={`h-full rounded-full ${cat.pct >= 80 ? 'bg-yellow-400' : 'bg-green-400'}`} style={{ width: `${cat.pct}%` }} />
 </View>
 </TouchableOpacity>
 ))}

 <View className="bg-[#120824] rounded-[16px] items-center justify-center my-4" style={{ height: 120 }}>
 <Text className="text-[rgba(255,255,255,0.3)]">[ Daily Spend Bar Chart ]</Text>
 </View>

 <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Split Summary</Text>
 <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
 {SPLITS.map(s => (
 <View key={s.name} className="flex-row justify-between py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
 <Text className="text-[rgba(255,255,255,0.6)]">{s.direction === 'owe' ? `You owe ${s.name}` : `${s.name} owes you`}</Text>
 <Text className={s.direction === 'owe' ? 'text-red-400' : 'text-green-400'}>€{s.amount.toFixed(2)}</Text>
 </View>
 ))}
 <View className="flex-row justify-between py-2">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Net</Text>
 <Text className="text-red-400 font-[Satoshi-Bold]">you owe €13.50</Text>
 </View>
 <TouchableOpacity onPress={() => router.push('/(trip)/wallet/split')} className="bg-[#6443F4] rounded-[12px] py-3 items-center mt-3">
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>Settle Up →</Text>
 </TouchableOpacity>
 </View>
 <View className="h-8" />
 </ScrollView>

 <TouchableOpacity onPress={() => {}} className="absolute bottom-6 right-6 bg-[#6443F4] w-14 h-14 rounded-full items-center justify-center" style={{ elevation: 8 }}>
 <Text className=" text-2xl" style={{ color: colors.text.primary }}>+</Text>
 </TouchableOpacity>
 </View>
 );
}
