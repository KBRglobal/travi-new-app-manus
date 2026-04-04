import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const FILTERS = ['All', 'Beaches', 'Cities', 'Mountains', 'Culture', 'Food', 'Nomad'];
const DESTINATIONS = [
  { name: 'Dubai', country: '🇦🇪 UAE', match: 92, category: 'Cities' },
  { name: 'Bali', country: '🇮🇩 Indonesia', match: 88, category: 'Beaches' },
  { name: 'Tokyo', country: '🇯🇵 Japan', match: 85, category: 'Culture' },
  { name: 'Swiss Alps', country: '🇨🇭 Switzerland', match: 78, category: 'Mountains' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="px-4 pt-12 pb-4">
        <Text className="text-white text-2xl font-bold mb-4">Explore</Text>
        <TextInput className="bg-bg-card rounded-input p-3 text-white mb-4" placeholder="Search destinations..." placeholderTextColor="rgba(255,255,255,0.3)" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-4" style={{ maxHeight: 40 }}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => {
              if (f === 'Nomad') { router.push('/(tabs)/explore/nomad'); return; }
              setActiveFilter(f);
            }}
            className={`px-4 py-2 rounded-pill mr-2 ${activeFilter === f ? 'bg-primary' : 'bg-bg-card'}`}
            style={f === 'Nomad' ? { borderWidth: 1, borderColor: '#F94498' } : {}}
          >
            <Text className={activeFilter === f ? 'text-white font-semibold' : f === 'Nomad' ? 'text-pink font-semibold' : 'text-text-secondary'}>
              {f}{f === 'Nomad' ? ' NEW' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView className="flex-1 px-4">
        {DESTINATIONS.filter(d => activeFilter === 'All' || d.category === activeFilter).map(dest => (
          <TouchableOpacity key={dest.name} onPress={() => router.push('/(trip)/plan/destination')} className="bg-bg-card rounded-card p-4 mb-3">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">{dest.name}</Text>
                <Text className="text-text-secondary">{dest.country}</Text>
              </View>
              <View className="items-end">
                <Text className="text-primary font-bold">✦ {dest.match}%</Text>
                <Text className="text-text-muted text-xs">DNA Match</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
