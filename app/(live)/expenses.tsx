import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { expenses, exchangeRates } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
 <View className="flex-1 bg-bg-primary pt-safe">
 <View className="px-6 flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}>
 <Text className="text-white text-xl">‹ Back</Text>
 </TouchableOpacity>
 <Text className="text-white text-heading-3">Expenses</Text>
 <TouchableOpacity onPress={() => router.push('/(trip)/budget-manager')}>
 <Ionicons name="bar-chart" size={24} color="#FFFFFF" />
 </TouchableOpacity>
 </View>

 {/* Budget overview */}
 <Animated.View entering={FadeInDown} className="mx-6 bg-bg-card border border-border rounded-card p-4 mb-4">
 <View className="flex-row justify-between mb-2">
 <Text className="text-text-secondary text-body-sm">Total Spent</Text>
 <Text className="text-white text-heading-2 font-bold">€{totalSpent.toFixed(2)}</Text>
 </View>
 <View className="h-2 bg-bg-surface rounded-full mb-2">
 <View className={`h-full rounded-full ${budgetPercent > 80 ? 'bg-status-error' : budgetPercent > 60 ? 'bg-status-warning' : 'bg-status-success'}`} style={{ width: `${budgetPercent}%` }} />
 </View>
 <Text className="text-text-muted text-caption">Budget: €{dailyBudget}/day</Text>
 </Animated.View>

 {/* Category breakdown */}
 <View className="flex-row px-6 mb-4">
 {categoryTotals.map((cat) => (
 <View key={cat.key} className="flex-1 items-center">
 <Text className="text-xl mb-1">{cat.emoji}</Text>
 <Text className="text-white text-body-sm font-semibold">€{cat.total}</Text>
 <Text className="text-text-muted text-caption">{cat.label}</Text>
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
 <View className="flex-row bg-bg-card border border-border rounded-card p-3 mb-2 items-center">
 <Text className="text-xl mr-3">{categories.find((c) => c.key === item.category)?.emoji || ''}</Text>
 <View className="flex-1">
 <Text className="text-white text-body">{item.description}</Text>
 <Text className="text-text-muted text-caption">{item.date}{item.splitWith.length > 0 ? ` · Split ${item.splitWith.length + 1} ways` : ''}</Text>
 </View>
 <Text className="text-white text-body font-semibold">€{item.amount}</Text>
 </View>
 </Animated.View>
 )}
 />

 {/* Add expense FAB */}
 <TouchableOpacity
 className="absolute bottom-24 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg"
 onPress={() => setShowAddForm(!showAddForm)}
 >
 <Text className="text-white text-2xl">{showAddForm ? '' : '+'}</Text>
 </TouchableOpacity>

 {/* Add form (bottom sheet style) */}
 {showAddForm && (
 <Animated.View entering={SlideInRight} className="absolute bottom-0 left-0 right-0 bg-bg-primary border-t border-border rounded-t-3xl p-6 pb-safe">
 <Text className="text-white text-heading-3 mb-4">Add Expense</Text>
 <TextInput className="bg-bg-card border border-border rounded-input text-white text-heading-2 p-4 mb-3 text-center" placeholder="0.00" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="decimal-pad" value={newAmount} onChangeText={setNewAmount} />
 <View className="flex-row mb-3">
 {categories.map((cat) => (
 <TouchableOpacity key={cat.key} className={`flex-1 items-center py-2 rounded-lg mr-1 ${newCategory === cat.key ? 'bg-primary' : 'bg-bg-card'}`} onPress={() => setNewCategory(cat.key)}>
 <Text className="text-lg">{cat.emoji}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <TextInput className="bg-bg-card border border-border rounded-input text-white text-body p-3 mb-4" placeholder="Description..." placeholderTextColor="rgba(255,255,255,0.3)" value={newDescription} onChangeText={setNewDescription} />
 <TouchableOpacity className="bg-primary py-4 rounded-button items-center" onPress={() => setShowAddForm(false)}>
 <Text className="text-white text-body font-bold">Add Expense</Text>
 </TouchableOpacity>
 </Animated.View>
 )}
 </View>
 );
}
