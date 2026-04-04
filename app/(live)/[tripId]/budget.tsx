import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

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
 <View className="flex-1 bg-bg-primary">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className="text-white text-lg">‹ Back</Text>
 </TouchableOpacity>
 <Text className="text-white text-xl font-bold flex-1">Budget Manager</Text>
 <TouchableOpacity><Text className="text-primary">Edit</Text></TouchableOpacity>
 </View>

 <ScrollView className="flex-1 px-4">
 <View className="bg-bg-card rounded-card p-6 mb-4">
 <Text className="text-text-secondary mb-1">Total Budget</Text>
 <Text className="text-white text-3xl font-bold mb-2">€{totalBudget.toLocaleString()}</Text>
 <View className="flex-row justify-between mb-2">
 <Text className="text-text-secondary">Spent: €{totalSpent}</Text>
 <Text className="text-primary">Left: €{totalBudget - totalSpent}</Text>
 </View>
 <View className="bg-bg-primary rounded-full h-3 overflow-hidden mb-2">
 <View className="bg-primary h-full rounded-full" style={{ width: `${Math.round(totalSpent / totalBudget * 100)}%` }} />
 </View>
 <Text className="text-text-muted text-sm">{Math.round(totalSpent / totalBudget * 100)}% used · {daysLeft} days left · €{perDay}/day remaining</Text>
 </View>

 <Text className="text-white font-bold text-lg mb-3">Category Breakdown</Text>
 {CATEGORIES.map(cat => (
 <TouchableOpacity key={cat.name} className="bg-bg-card rounded-card p-4 mb-2">
 <View className="flex-row items-center justify-between mb-2">
 <View className="flex-row items-center">
 <Text className="text-xl mr-2">{cat.icon}</Text>
 <Text className="text-white font-semibold">{cat.name}</Text>
 </View>
 <View className="flex-row items-center">
 <Text className="text-white font-bold mr-2">€{cat.spent}</Text>
 <Text className="text-text-muted">/ €{cat.budget}</Text>
 <Text className={`ml-2 ${cat.pct >= 80 ? 'text-yellow-400' : 'text-green-400'}`}>{cat.pct >= 80 ? '' : 'checkmark'}</Text>
 </View>
 </View>
 <View className="bg-bg-primary rounded-full h-2 overflow-hidden">
 <View className={`h-full rounded-full ${cat.pct >= 80 ? 'bg-yellow-400' : 'bg-green-400'}`} style={{ width: `${cat.pct}%` }} />
 </View>
 </TouchableOpacity>
 ))}

 <View className="bg-bg-card rounded-card items-center justify-center my-4" style={{ height: 120 }}>
 <Text className="text-text-muted">[ Daily Spend Bar Chart ]</Text>
 </View>

 <Text className="text-white font-bold text-lg mb-3">Split Summary</Text>
 <View className="bg-bg-card rounded-card p-4 mb-4">
 {SPLITS.map(s => (
 <View key={s.name} className="flex-row justify-between py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
 <Text className="text-text-secondary">{s.direction === 'owe' ? `You owe ${s.name}` : `${s.name} owes you`}</Text>
 <Text className={s.direction === 'owe' ? 'text-red-400' : 'text-green-400'}>€{s.amount.toFixed(2)}</Text>
 </View>
 ))}
 <View className="flex-row justify-between py-2">
 <Text className="text-white font-bold">Net</Text>
 <Text className="text-red-400 font-bold">you owe €13.50</Text>
 </View>
 <TouchableOpacity onPress={() => router.push('/(trip)/wallet/split')} className="bg-primary rounded-button py-3 items-center mt-3">
 <Text className="text-white font-semibold">Settle Up →</Text>
 </TouchableOpacity>
 </View>
 <View className="h-8" />
 </ScrollView>

 <TouchableOpacity className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center" style={{ elevation: 8 }}>
 <Text className="text-white text-2xl">+</Text>
 </TouchableOpacity>
 </View>
 );
}
