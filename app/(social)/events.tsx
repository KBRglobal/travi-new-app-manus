import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const EVENTS = [
  { id: '1', title: 'Barcelona Meetup', emoji: '🍷', date: 'May 18, 2026', location: 'La Rambla', attendees: 12, going: false, type: 'meetup' },
  { id: '2', title: 'Tokyo Food Crawl', emoji: '🍣', date: 'Jun 5, 2026', location: 'Tsukiji Market', attendees: 8, going: true, type: 'food' },
  { id: '3', title: 'Bali Surf Session', emoji: '🏄', date: 'Jun 12, 2026', location: 'Kuta Beach', attendees: 6, going: false, type: 'adventure' },
  { id: '4', title: 'Paris Art Walk', emoji: '🎨', date: 'Jul 1, 2026', location: 'Montmartre', attendees: 15, going: false, type: 'culture' },
  { id: '5', title: 'Iceland Northern Lights', emoji: '🌌', date: 'Sep 15, 2026', location: 'Reykjavik', attendees: 20, going: true, type: 'adventure' },
];

export default function EventsScreen() {
  const router = useRouter();
  const [events, setEvents] = useState(EVENTS);
  const [filter, setFilter] = useState('all');

  const toggleGoing = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, going: !e.going, attendees: e.going ? e.attendees - 1 : e.attendees + 1 } : e));
  };

  const filtered = filter === 'all' ? events : filter === 'going' ? events.filter(e => e.going) : events.filter(e => e.type === filter);

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold">Events</Text>
        <TouchableOpacity><Text className="text-primary text-sm">Create</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-3" contentContainerStyle={{ gap: 8 }}>
        {['all', 'going', 'meetup', 'food', 'adventure', 'culture'].map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} className={`px-4 py-2 rounded-full ${filter === f ? 'bg-primary' : 'bg-white/[0.05]'}`}>
            <Text className={`text-sm capitalize ${filter === f ? 'text-white font-bold' : 'text-white/60'}`}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="events" />} data={filtered} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View className="mx-4 mb-3 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <View className="flex-row items-start mb-3">
            <Text className="text-3xl mr-3">{item.emoji}</Text>
            <View className="flex-1">
              <Text className="text-white font-bold text-base">{item.title}</Text>
              <Text className="text-white/60 text-xs">{item.date}</Text>
              <Text className="text-white/40 text-xs">📍 {item.location}</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-white/40 text-sm">👥 {item.attendees} going</Text>
            <TouchableOpacity onPress={() => toggleGoing(item.id)} className={`px-5 py-2 rounded-xl ${item.going ? 'bg-green-500/20' : 'bg-primary'}`}>
              <Text className={`font-bold text-sm ${item.going ? 'text-green-400' : 'text-white'}`}>{item.going ? '✓ Going' : 'Join'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )} />
    </View>
  );
}
