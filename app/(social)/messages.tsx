import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const CONVERSATIONS = [
  { id: '1', name: 'Sarah K.', avatar: '👩', lastMessage: 'See you in Barcelona!', time: '2m', unread: 2, online: true },
  { id: '2', name: 'Mike R.', avatar: '👨', lastMessage: 'The hiking trail was amazing', time: '1h', unread: 0, online: false },
  { id: '3', name: 'Barcelona Trip Group', avatar: '🏰', lastMessage: 'Emma: I booked the restaurant', time: '3h', unread: 5, online: true },
  { id: '4', name: 'Emma L.', avatar: '👱‍♀️', lastMessage: 'Thanks for the recommendation!', time: '1d', unread: 0, online: true },
  { id: '5', name: 'David W.', avatar: '🧔', lastMessage: 'Photo attached', time: '2d', unread: 0, online: false },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = CONVERSATIONS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold">Messages</Text>
        <TouchableOpacity><Text className="text-primary text-sm">New</Text></TouchableOpacity>
      </View>
      <View className="px-4 mb-3">
        <TextInput className="bg-white/[0.05] rounded-xl px-4 py-3 text-white border border-white/[0.08]" placeholder="Search messages..." placeholderTextColor="rgba(255,255,255,0.3)" value={search} onChangeText={setSearch} />
      </View>
      <FlatList data={filtered} keyExtractor={i => i.id} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/(social)/messages/${item.id}`)} className="flex-row items-center mx-4 mb-1 p-4 rounded-2xl active:bg-white/[0.03]">
          <View className="relative mr-3">
            <Text className="text-3xl">{item.avatar}</Text>
            {item.online && <View className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-bg-primary" />}
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <Text className={`font-bold ${item.unread > 0 ? 'text-white' : 'text-white/80'}`}>{item.name}</Text>
              <Text className="text-white/40 text-xs">{item.time}</Text>
            </View>
            <Text className={`text-sm mt-0.5 ${item.unread > 0 ? 'text-white/80' : 'text-white/40'}`} numberOfLines={1}>{item.lastMessage}</Text>
          </View>
          {item.unread > 0 && (
            <View className="bg-primary w-5 h-5 rounded-full items-center justify-center ml-2">
              <Text className="text-white text-xs font-bold">{item.unread}</Text>
            </View>
          )}
        </TouchableOpacity>
      )} />
    </View>
  );
}
