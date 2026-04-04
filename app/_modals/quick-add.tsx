import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function QuickAddModal() {
  const router = useRouter();
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const types = [
    { id: 'expense', emoji: '💸', name: 'Expense' },
    { id: 'memory', emoji: '📸', name: 'Memory' },
    { id: 'note', emoji: '📝', name: 'Note' },
    { id: 'checklist', emoji: '✅', name: 'Checklist Item' },
  ];

  return (
    <View className="flex-1 bg-bg-primary pt-safe px-4">
      <View className="flex-row items-center justify-between py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white/60">Cancel</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold">Quick Add</Text>
        <TouchableOpacity onPress={() => router.back()}><Text className="text-primary font-bold">Save</Text></TouchableOpacity>
      </View>
      <View className="flex-row mb-4">
        {types.map(t => (
          <TouchableOpacity key={t.id} onPress={() => setType(t.id)} className={`flex-1 py-3 mx-1 rounded-xl items-center ${type === t.id ? 'bg-primary' : 'bg-bg-secondary border border-white/[0.08]'}`}>
            <Text className="text-xl mb-1">{t.emoji}</Text>
            <Text className={`text-xs ${type === t.id ? 'text-white font-bold' : 'text-white/60'}`}>{t.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {type === 'expense' && (
        <TextInput className="bg-bg-secondary rounded-xl px-4 py-4 text-white text-2xl font-bold text-center border border-white/[0.08] mb-4" value={amount} onChangeText={setAmount} placeholder="$0.00" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="numeric" />
      )}
      <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08] mb-4" value={note} onChangeText={setNote} placeholder={type === 'expense' ? 'What was this for?' : 'Add a note...'} placeholderTextColor="rgba(255,255,255,0.3)" />
    </View>
  );
}
