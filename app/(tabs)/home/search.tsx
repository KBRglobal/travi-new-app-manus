import { useState, useCallback} from 'react';
import { View, Text, TextInput, Pressable, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const RECENT = ['Paris', 'Tokyo', 'Barcelona', 'Bali'];
const TRENDING = ['Iceland', 'Morocco', 'New Zealand', 'Portugal'];

// S13 — Search
export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      {/* Search bar */}
      <View className="flex-row items-center px-4 md:px-6 mt-4 gap-3">
        <Pressable onPress={() => router.back()} className="p-2">
          <Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text>
        </Pressable>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search destinations..."
          placeholderTextColor="rgba(255,255,255,0.3)"
          autoFocus
          onSubmitEditing={() => router.push({ pathname: '/(tabs)/home/search-results', params: { q: query } })}
          className="flex-1 h-12 px-4 bg-white/5 border border-white/10 rounded-full text-white text-base"
        />
      </View>

      <ScrollView contentContainerClassName="px-4 md:px-6 mt-6">
        {/* Recent */}
        <Text className="text-[rgba(255,255,255,0.6)] text-sm font-semibold mb-3">Recent</Text>
        {RECENT.map((item) => (
          <Pressable
            key={item}
            onPress={() => router.push({ pathname: '/(tabs)/home/search-results', params: { q: item } })}
            className="flex-row items-center py-3 border-b border-white/5"
          >
            <Ionicons name="time" size={24} color="#FFFFFF" />
            <Text className=" text-base" style={{ color: colors.text.primary }}>{item}</Text>
          </Pressable>
        ))}

        {/* Trending */}
        <Text className="text-[rgba(255,255,255,0.6)] text-sm font-semibold mt-6 mb-3">Trending</Text>
        {TRENDING.map((item) => (
          <Pressable
            key={item}
            onPress={() => router.push({ pathname: '/(tabs)/home/search-results', params: { q: item } })}
            className="flex-row items-center py-3 border-b border-white/5"
          >
            <Ionicons name="flame" size={24} color="#FFFFFF" />
            <Text className=" text-base" style={{ color: colors.text.primary }}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
