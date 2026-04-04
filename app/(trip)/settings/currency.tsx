import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
];

export default function CurrencySettingsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('USD');
  const [search, setSearch] = useState('');

  const filtered = CURRENCIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <ScreenHeader title="Currency" />
      </View>
      <View className="px-4 mb-3">
        <TextInput className="bg-white/[0.05] rounded-xl px-4 py-3 text-white border border-white/[0.08]" placeholder="Search currency..." placeholderTextColor="rgba(255,255,255,0.3)" value={search} onChangeText={setSearch} />
      </View>
      <FlatList data={filtered} keyExtractor={i => i.code} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelected(item.code)} className={`flex-row items-center mx-4 mb-2 p-4 rounded-2xl border ${selected === item.code ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
          <Text className="text-2xl mr-3">{item.flag}</Text>
          <View className="flex-1">
            <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.code}</Text>
            <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.name}</Text>
          </View>
          <Text className="/60 mr-2" style={{ color: colors.text.primary }}>{item.symbol}</Text>
          {selected === item.code && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
        </TouchableOpacity>
      )} />
    </View>
  );
}
