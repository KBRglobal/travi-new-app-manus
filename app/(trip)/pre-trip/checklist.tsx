import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const INITIAL_ITEMS = [
  { id: '1', category: 'Documents', items: [
    { id: 'd1', text: 'Passport (valid 6+ months)', done: true },
    { id: 'd2', text: 'Visa / eVisa', done: true },
    { id: 'd3', text: 'Travel insurance', done: false },
    { id: 'd4', text: 'Hotel confirmation', done: true },
    { id: 'd5', text: 'Flight tickets', done: true },
  ]},
  { id: '2', category: 'Packing', items: [
    { id: 'p1', text: 'Clothes for 7 days', done: false },
    { id: 'p2', text: 'Toiletries', done: false },
    { id: 'p3', text: 'Charger & adapter', done: true },
    { id: 'p4', text: 'Medications', done: false },
    { id: 'p5', text: 'Camera', done: true },
  ]},
  { id: '3', category: 'Before You Go', items: [
    { id: 'b1', text: 'Download offline maps', done: false },
    { id: 'b2', text: 'Notify bank of travel', done: true },
    { id: 'b3', text: 'Set up eSIM / roaming', done: false },
    { id: 'b4', text: 'Exchange currency', done: false },
  ]},
];

export default function ChecklistScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState(INITIAL_ITEMS);

  const toggleItem = (catId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, done: !item.done } : item) } : cat));
  };

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const doneItems = categories.reduce((sum, c) => sum + c.items.filter(i => i.done).length, 0);

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Pre-Trip Checklist</Text>
      </View>
      <View className="mx-4 mb-4 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
        <View className="flex-row justify-between mb-2">
          <Text className="text-white font-bold">{doneItems}/{totalItems} completed</Text>
          <Text className="text-primary font-bold">{Math.round((doneItems / totalItems) * 100)}%</Text>
        </View>
        <View className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
          <View className="h-full bg-primary rounded-full" style={{ width: `${(doneItems / totalItems) * 100}%` }} />
        </View>
      </View>
      {categories.map(cat => (
        <View key={cat.id} className="mx-4 mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">{cat.category}</Text>
          {cat.items.map(item => (
            <TouchableOpacity key={item.id} onPress={() => toggleItem(cat.id, item.id)} className="flex-row items-center p-4 mb-1 bg-bg-secondary rounded-xl border border-white/[0.08]">
              <View className={`w-5 h-5 rounded-md mr-3 items-center justify-center ${item.done ? 'bg-primary' : 'border border-white/20'}`}>
                {item.done && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
              </View>
              <Text className={`flex-1 ${item.done ? 'text-white/40 line-through' : 'text-white'}`}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
