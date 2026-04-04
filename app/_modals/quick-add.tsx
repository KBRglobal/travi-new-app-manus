import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function QuickAddModal() {
  const router = useRouter();
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const types = [
    { id: 'expense', iconName: 'cash', name: 'Expense' },
    { id: 'memory', iconName: 'camera', name: 'Memory' },
    { id: 'note', iconName: 'create', name: 'Note' },
    { id: 'checklist', iconName: 'checkmark-circle', name: 'Checklist Item' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe px-4">
      <View className="flex-row items-center justify-between py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="/60" style={{ color: colors.text.primary }}>Cancel</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Quick Add</Text>
        <TouchableOpacity onPress={() => router.back()}><Text className="text-[#6443F4] font-[Satoshi-Bold]">Save</Text></TouchableOpacity>
      </View>
      <View className="flex-row mb-4">
        {types.map(t => (
          <TouchableOpacity key={t.id} onPress={() => setType(t.id)} className={`flex-1 py-3 mx-1 rounded-xl items-center ${type === t.id ? 'bg-[#6443F4]' : 'bg-[#120824] border border-white/[0.08]'}`}>
            <Text className="text-xl mb-1">{t.emoji}</Text>
            <Text className={`text-xs ${type === t.id ? 'text-white font-[Satoshi-Bold]' : 'text-white/60'}`}>{t.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {type === 'expense' && (
        <TextInput className="bg-[#120824] rounded-xl px-4 py-4 text-white text-2xl font-[Satoshi-Bold] text-center border border-white/[0.08] mb-4" value={amount} onChangeText={setAmount} placeholder="$0.00" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="numeric" />
      )}
      <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08] mb-4" value={note} onChangeText={setNote} placeholder={type === 'expense' ? 'What was this for?' : 'Add a note...'} placeholderTextColor="rgba(255,255,255,0.3)" />
    </View>
  );
}
