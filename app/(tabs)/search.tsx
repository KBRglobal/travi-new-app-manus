import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useDebouncedCallback } from 'use-debounce';
import { destinations, activities, hotels } from '../../lib/mockData';

type SearchResult = { id: string; type: 'destination' | 'activity' | 'hotel'; name: string; subtitle: string; emoji: string };

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches] = useState(['Dubai', 'Barcelona', 'Bali', 'Tokyo']);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    if (!text) { setResults([]); return; }
    const q = text.toLowerCase();
    const destResults: SearchResult[] = destinations.filter((d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)).map((d) => ({ id: d.id, type: 'destination', name: d.name, subtitle: d.country, emoji: '🌍' }));
    const actResults: SearchResult[] = activities.filter((a) => a.name.toLowerCase().includes(q)).map((a) => ({ id: a.id, type: 'activity', name: a.name, subtitle: `€${a.price} · ${a.duration}`, emoji: '🎯' }));
    const hotelResults: SearchResult[] = hotels.filter((h) => h.name.toLowerCase().includes(q)).map((h) => ({ id: h.id, type: 'hotel', name: h.name, subtitle: `€${h.price}/night · ⭐${h.rating}`, emoji: '🏨' }));
    setResults([...destResults, ...actResults, ...hotelResults]);
  }, 300);

  const handlePress = (item: SearchResult) => {
    if (item.type === 'destination') router.push(`/(trip)/destination/${item.id}`);
    else if (item.type === 'activity') router.push(`/(trip)/activity/${item.id}`);
    else router.push(`/(trip)/hotel/${item.id}`);
  };

  return (
    <View className="flex-1 bg-bg-primary pt-safe px-6">
      <Text className="text-white text-heading-1 mb-4">Search</Text>
      <View className="bg-bg-card border border-border rounded-input flex-row items-center px-4 mb-6">
        <Text className="text-text-muted mr-2">🔍</Text>
        <TextInput className="flex-1 text-white text-body py-3" placeholder="Search anything..." placeholderTextColor="rgba(255,255,255,0.4)" value={query} onChangeText={(t) => { setQuery(t); debouncedSearch(t); }} autoFocus />
        {query ? <TouchableOpacity onPress={() => { setQuery(''); setResults([]); }}><Text className="text-text-muted text-lg">✕</Text></TouchableOpacity> : null}
      </View>

      {!query && (
        <View>
          <Text className="text-text-secondary text-body-sm mb-3">Recent Searches</Text>
          {recentSearches.map((s) => (
            <TouchableOpacity key={s} className="flex-row items-center py-3 border-b border-border" onPress={() => { setQuery(s); debouncedSearch(s); }}>
              <Text className="text-text-muted mr-3">🕐</Text>
              <Text className="text-white text-body">{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center py-3 border-b border-border" onPress={() => handlePress(item)}>
            <Text className="text-2xl mr-3">{item.emoji}</Text>
            <View className="flex-1">
              <Text className="text-white text-body">{item.name}</Text>
              <Text className="text-text-secondary text-body-sm">{item.subtitle}</Text>
            </View>
            <Text className="text-text-muted">›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
