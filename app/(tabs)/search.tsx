import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { useDebouncedCallback } from 'use-debounce';
import { destinations, activities, hotels } from '../../lib/mockData';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

type SearchResult = { id: string; type: 'destination' | 'activity' | 'hotel'; name: string; subtitle: string; emoji: string };

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches] = useState(['Dubai', 'Barcelona', 'Bali', 'Tokyo']);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    if (!text) { setResults([]); return; }
    const q = text.toLowerCase();
    const destResults: SearchResult[] = destinations.filter((d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)).map((d) => ({ id: d.id, type: 'destination', name: d.name, subtitle: d.country, iconName: 'globe' }));
    const actResults: SearchResult[] = activities.filter((a) => a.name.toLowerCase().includes(q)).map((a) => ({ id: a.id, type: 'activity', name: a.name, subtitle: `€${a.price} · ${a.duration}`, iconName: 'flag' }));
    const hotelResults: SearchResult[] = hotels.filter((h) => h.name.toLowerCase().includes(q)).map((h) => ({ id: h.id, type: 'hotel', name: h.name, subtitle: `€${h.price}/night · ⭐${h.rating}`, iconName: 'bed' }));
    setResults([...destResults, ...actResults, ...hotelResults]);
  }, 300);

  const handlePress = (item: SearchResult) => {
    if (item.type === 'destination') router.push(`/(trip)/destination/${item.id}`);
    else if (item.type === 'activity') router.push(`/(trip)/activity/${item.id}`);
    else router.push(`/(trip)/hotel/${item.id}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe px-6">
      <Text className=" text-[28px] mb-4" style={{ color: colors.text.primary }}>Search</Text>
      <View className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-input flex-row items-center px-4 mb-6">
        <Ionicons name="search" size={24} color="#FFFFFF" />
        <TextInput className="flex-1  text-[15px] py-3" style={{ color: colors.text.primary }} placeholder="Search anything..." placeholderTextColor="rgba(255,255,255,0.4)" value={query} onChangeText={(t) => { setQuery(t); debouncedSearch(t); }} autoFocus />
        {query ? <TouchableOpacity onPress={() => { setQuery(''); setResults([]); }}><Ionicons name="close" size={24} color="#FFFFFF" /></TouchableOpacity> : null}
      </View>

      {!query && (
        <View>
          <Text className="text-[rgba(255,255,255,0.6)] text-[13px] mb-3">Recent Searches</Text>
          {recentSearches.map((s) => (
            <TouchableOpacity key={s} className="flex-row items-center py-3 border-b border-[rgba(255,255,255,0.08)]" onPress={() => { setQuery(s); debouncedSearch(s); }}>
              <Ionicons name="time" size={24} color="#FFFFFF" />
              <Text className=" text-[15px]" style={{ color: colors.text.primary }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center py-3 border-b border-[rgba(255,255,255,0.08)]" onPress={() => handlePress(item)}>
            <Text className="text-2xl mr-3">{item.emoji}</Text>
            <View className="flex-1">
              <Text className=" text-[15px]" style={{ color: colors.text.primary }}>{item.name}</Text>
              <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{item.subtitle}</Text>
            </View>
            <Text className="text-[rgba(255,255,255,0.3)]">›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
