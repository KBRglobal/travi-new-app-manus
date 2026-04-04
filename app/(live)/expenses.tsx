import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { expenses, exchangeRates } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const categories = [
 { key: 'food', iconName: 'restaurant', label: 'Food' },
 { key: 'transport', iconName: 'car', label: 'Transport' },
 { key: 'activities', iconName: 'flag', label: 'Activities' },
 { key: 'shopping', iconName: 'bag', label: 'Shopping' },
 { key: 'other', emoji: '', label: 'Other' },
];

export default function ExpensesScreen() {
 const router = useRouter();
 const [showAddForm, setShowAddForm] = useState(false);
 const [newAmount, setNewAmount] = useState('');
 const [newCategory, setNewCategory] = useState('food');
 const [newDescription, setNewDescription] = useState('');

 const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
 const dailyBudget = 150;
 const budgetPercent = Math.min((totalSpent / (dailyBudget * 3)) * 100, 100);

 const categoryTotals = categories.map((cat) => ({
 ...cat,
 total: expenses.filter((e) => e.category === cat.key).reduce((sum, e) => sum + e.amount, 0),
 }));

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="px-6 flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}>
 <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Expenses</Text>
 <TouchableOpacity onPress={() => router.push('/(trip)/budget-manager')}>
 <Ionicons name="bar-chart" size={24} color="#FFFFFF" />
 </TouchableOpacity>
 </View>

 {/* Budget overview */}
 <Animated.View entering={FadeInDown} className="mx-6 bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-4">
 <View className="flex-row justify-between mb-2">
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">Total Spent</Text>
 <Text className=" text-[22px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>€{totalSpent.toFixed(2)}</Text>
 </View>
 <View className="h-2 bg-bg-surface rounded-full mb-2">
 <View className={`h-full rounded-full ${budgetPercent > 80 ? 'bg-[#F87171]' : budgetPercent > 60 ? 'bg-[#FBBF24]' : 'bg-[#4ADE80]'}`} style={{ width: `${budgetPercent}%` }} />
 </View>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">Budget: €{dailyBudget}/day</Text>
 </Animated.View>

 {/* Category breakdown */}
 <View className="flex-row px-6 mb-4">
 {categoryTotals.map((cat) => (
 <View key={cat.key} className="flex-1 items-center">
 <Text className="text-xl mb-1">{cat.emoji}</Text>
 <Text className=" text-[13px] font-semibold" style={{ color: colors.text.primary }}>€{cat.total}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{cat.label}</Text>
 </View>
 ))}
 </View>

 {/* Expense list */}
 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="cash" title="No expenses yet" description="Start tracking your trip expenses." />}
 data={expenses}
 keyExtractor={(item) => item.id}
 contentContainerClassName="px-6 pb-24"
 renderItem={({ item, index }) => (
 <Animated.View entering={FadeInDown.delay(index * 80)}>
 <View className="flex-row bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-3 mb-2 items-center">
 <Text className="text-xl mr-3">{categories.find((c) => c.key === item.category)?.emoji || ''}</Text>
 <View className="flex-1">
 <Text className=" text-[15px]" style={{ color: colors.text.primary }}>{item.description}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{item.date}{item.splitWith.length > 0 ? ` · Split ${item.splitWith.length + 1} ways` : ''}</Text>
 </View>
 <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>€{item.amount}</Text>
 </View>
 </Animated.View>
 )}
 />

 {/* Add expense FAB */}
 <TouchableOpacity
 className="absolute bottom-24 right-6 bg-[#6443F4] w-14 h-14 rounded-full items-center justify-center shadow-lg"
 onPress={() => setShowAddForm(!showAddForm)}
 >
 <Text className=" text-2xl" style={{ color: colors.text.primary }}>{showAddForm ? '' : '+'}</Text>
 </TouchableOpacity>

 {/* Add form (bottom sheet style) */}
 {showAddForm && (
 <Animated.View entering={SlideInRight} className="absolute bottom-0 left-0 right-0 bg-bg-[#6443F4] border-t border-[rgba(255,255,255,0.08)] rounded-t-3xl p-6 pb-safe">
 <Text className=" text-[18px] mb-4" style={{ color: colors.text.primary }}>Add Expense</Text>
 <TextInput className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-input text-white text-[22px] p-4 mb-3 text-center" placeholder="0.00" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="decimal-pad" value={newAmount} onChangeText={setNewAmount} />
 <View className="flex-row mb-3">
 {categories.map((cat) => (
 <TouchableOpacity key={cat.key} className={`flex-1 items-center py-2 rounded-lg mr-1 ${newCategory === cat.key ? 'bg-[#6443F4]' : 'bg-[#120824]'}`} onPress={() => setNewCategory(cat.key)}>
 <Text className="text-lg">{cat.emoji}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <TextInput className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-input text-white text-[15px] p-3 mb-4" placeholder="Description..." placeholderTextColor="rgba(255,255,255,0.3)" value={newDescription} onChangeText={setNewDescription} />
 <TouchableOpacity className="bg-[#6443F4] py-4 rounded-[12px] items-center" onPress={() => setShowAddForm(false)}>
 <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Add Expense</Text>
 </TouchableOpacity>
 </Animated.View>
 )}
 </View>
 );
}
