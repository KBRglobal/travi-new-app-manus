import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const NOTIFICATIONS = [
  { id: '1', emoji: '📉', title: 'Price Drop Alert', desc: 'NYC→Tokyo flight dropped to $890', time: '2m ago', read: false, action: '/(trip)/flights' },
  { id: '2', emoji: '🔥', title: 'Streak Bonus', desc: 'You earned +50 streak points!', time: '1h ago', read: false, action: '/(trip)/points/transactions' },
  { id: '3', emoji: '🤝', title: 'New Connection', desc: 'Sarah accepted your request', time: '3h ago', read: true, action: '/(social)/buddies' },
  { id: '4', emoji: '✈️', title: 'Check-in Open', desc: 'Your flight AA123 check-in is open', time: '5h ago', read: true, action: '/(trip)/pre-trip/documents' },
  { id: '5', emoji: '⭐', title: 'Review Reminder', desc: 'How was your stay at Hotel Shinjuku?', time: '1d ago', read: true, action: '/(trip)/post-trip/review' },
  { id: '6', emoji: '🏆', title: 'Challenge Complete', desc: 'You completed the Foodie challenge!', time: '2d ago', read: true, action: '/(trip)/points/challenges' },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Notifications</Text>
        <View className="flex-1" />
        <TouchableOpacity onPress={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}><Text className="text-primary text-sm">Mark all read</Text></TouchableOpacity>
      </View>
      <FlatList data={notifications} keyExtractor={i => i.id} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => { markRead(item.id); router.push(item.action as any); }} className={`flex-row items-start mx-4 mb-2 p-4 rounded-2xl border ${item.read ? 'bg-bg-secondary border-white/[0.08]' : 'bg-primary/5 border-primary/20'}`}>
          <Text className="text-2xl mr-3">{item.emoji}</Text>
          <View className="flex-1">
            <Text className={`font-bold ${item.read ? 'text-white/60' : 'text-white'}`}>{item.title}</Text>
            <Text className="text-white/40 text-xs">{item.desc}</Text>
            <Text className="text-white/20 text-xs mt-1">{item.time}</Text>
          </View>
          {!item.read && <View className="w-2 h-2 rounded-full bg-primary mt-2" />}
        </TouchableOpacity>
      )} />
    </View>
  );
}
