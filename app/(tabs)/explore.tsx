import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useDebouncedCallback } from 'use-debounce';
import { destinations } from '../../lib/mockData';

const categories = ['All', 'Adventure', 'Culture', 'Food', 'Nature', 'Luxury', 'Social', 'Wellness'];

export default function ExploreScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    const filtered = destinations.filter((d) => {
      const matchesQuery = !text || d.name.toLowerCase().includes(text.toLowerCase()) || d.country.toLowerCase().includes(text.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || d.tags.includes(selectedCategory.toLowerCase());
      return matchesQuery && matchesCategory;
    });
    setFilteredDestinations(filtered);
  }, 300);

  const handleSearch = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const handleCategory = (cat: string) => {
    setSelectedCategory(cat);
    const filtered = destinations.filter((d) => {
      const matchesQuery = !query || d.name.toLowerCase().includes(query.toLowerCase());
      const matchesCat = cat === 'All' || d.tags.includes(cat.toLowerCase());
      return matchesQuery && matchesCat;
    });
    setFilteredDestinations(filtered);
  };

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="px-6 mb-4">
        <Text className="text-white text-heading-1 mb-4">Explore</Text>
        <View className="bg-bg-card border border-border rounded-input flex-row items-center px-4">
          <Text className="text-text-muted mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-white text-body py-3"
            placeholder="Search destinations..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={query}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        contentContainerClassName="px-6 mb-4"
        className="max-h-12 mb-2"
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`mr-2 px-4 py-2 rounded-full border ${selectedCategory === item ? 'bg-primary border-primary' : 'border-border'}`}
            onPress={() => handleCategory(item)}
          >
            <Text className={`text-body-sm ${selectedCategory === item ? 'text-white font-semibold' : 'text-text-secondary'}`}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Results */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerClassName="px-6 pb-24"
        columnWrapperClassName="gap-3 mb-3"
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 80).duration(300)} className="flex-1">
            <TouchableOpacity onPress={() => router.push(`/(trip)/destination/${item.id}`)}>
              <Image source={{ uri: item.image }} className="w-full h-40 rounded-card" resizeMode="cover" />
              <View className="absolute bottom-0 left-0 right-0 p-3 bg-bg-overlay rounded-b-card">
                <Text className="text-white text-body-sm font-semibold">{item.name}</Text>
                <Text className="text-text-secondary text-caption">{Math.round(item.matchScore * 100)}% match</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-4xl mb-4">🔍</Text>
            <Text className="text-text-secondary text-body">No destinations found</Text>
          </View>
        }
      />
    </View>
  );
}
