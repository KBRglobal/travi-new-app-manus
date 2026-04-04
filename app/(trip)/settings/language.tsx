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

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('en');
  const [search, setSearch] = useState('');

  const filtered = LANGUAGES.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.native.includes(search));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <ScreenHeader title="Language" />
      </View>
      <View className="px-4 mb-3">
        <TextInput className="bg-white/[0.05] rounded-xl px-4 py-3 text-white border border-white/[0.08]" placeholder="Search language..." placeholderTextColor="rgba(255,255,255,0.3)" value={search} onChangeText={setSearch} />
      </View>
      <FlatList data={filtered} keyExtractor={i => i.code} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelected(item.code)} className={`flex-row items-center mx-4 mb-2 p-4 rounded-2xl border ${selected === item.code ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
          <Text className="text-2xl mr-3">{item.flag}</Text>
          <View className="flex-1">
            <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.name}</Text>
            <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.native}</Text>
          </View>
          {selected === item.code && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
        </TouchableOpacity>
      )} />
    </View>
  );
}
