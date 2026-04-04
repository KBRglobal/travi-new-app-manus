import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const MEMBERS = [
  { name: 'You', avatar: '👤', online: true },
  { name: 'Dana', avatar: '👩', online: true },
  { name: 'Tom', avatar: '👨', online: true },
  { name: 'Sarah', avatar: '👩‍🦰', online: false },
];

const ACTIVITIES = [
  { name: 'Dubai Museum', votes: { up: 3, down: 1 }, addedBy: 'Dana', locked: false },
  { name: 'Gold Souk', votes: { up: 4, down: 0 }, addedBy: 'You', locked: false },
  { name: 'Desert Safari', votes: { up: 2, down: 2 }, addedBy: 'Tom', locked: true, lockedBy: 'Dana' },
  { name: 'Burj Khalifa', votes: { up: 4, down: 0 }, addedBy: 'Sarah', locked: false },
];

export default function CollabPlanning() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const [showChat, setShowChat] = useState(false);

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Planning Together</Text>
        <TouchableOpacity onPress={() => setShowChat(!showChat)}>
          <Text className="text-primary text-lg">💬</Text>
        </TouchableOpacity>
      </View>

      <View className="px-4 mb-4">
        <View className="flex-row items-center">
          {MEMBERS.filter(m => m.online).map(m => (
            <View key={m.name} className="mr-2 items-center">
              <Text className="text-2xl">{m.avatar}</Text>
              <View className="w-2 h-2 rounded-full bg-green-500 absolute bottom-0 right-0" />
            </View>
          ))}
          <Text className="text-text-secondary ml-2">{MEMBERS.filter(m => m.online).length} editing now</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {ACTIVITIES.map((act, i) => (
          <View key={act.name} className="bg-bg-card rounded-card p-4 mb-3" style={{ opacity: act.locked ? 0.7 : 1 }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Text className="text-text-muted mr-2">≡</Text>
                <Text className="text-white font-bold flex-1">{act.name}</Text>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity className="bg-green-900/30 px-2 py-1 rounded mr-2">
                  <Text className="text-green-400">👍 {act.votes.up}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-900/30 px-2 py-1 rounded">
                  <Text className="text-red-400">👎 {act.votes.down}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-text-muted text-xs mt-1">{act.addedBy} added</Text>
            {act.locked && <Text className="text-yellow-400 text-xs mt-1">🔒 {act.lockedBy} is editing this...</Text>}
          </View>
        ))}

        <TouchableOpacity className="bg-bg-card rounded-button py-3 items-center mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed' }}>
          <Text className="text-primary font-semibold">+ Add Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-bg-card rounded-button py-3 items-center mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
          <Text className="text-primary font-semibold">Invite More 👥</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(trip)/plan/cart')} className="bg-primary rounded-button py-4 items-center mb-8">
          <Text className="text-white font-bold text-lg">Finalize & Book</Text>
        </TouchableOpacity>
      </ScrollView>

      {showChat && (
        <View className="absolute bottom-0 left-0 right-0 bg-bg-secondary rounded-t-modal p-4" style={{ height: 300 }}>
          <View className="flex-row justify-between mb-3">
            <Text className="text-white font-bold">Chat</Text>
            <TouchableOpacity onPress={() => setShowChat(false)}><Text className="text-text-secondary">✕</Text></TouchableOpacity>
          </View>
          <Text className="text-text-muted text-center py-8">Chat messages will appear here</Text>
        </View>
      )}
    </View>
  );
}
