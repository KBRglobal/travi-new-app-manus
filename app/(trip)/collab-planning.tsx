import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { travelers, activities } from '../../lib/mockData';

export default function CollabPlanningScreen() {
  const router = useRouter();
  const [chatInput, setChatInput] = useState('');
  const onlineMembers = travelers.slice(0, 3);

  const votableActivities = activities.slice(0, 4).map((a) => ({
    ...a,
    votes: Math.floor(Math.random() * 4),
    voters: travelers.slice(0, Math.floor(Math.random() * 3) + 1),
  }));

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Plan Together</Text>
        <TouchableOpacity><Text className="text-primary text-body-sm">+ Invite</Text></TouchableOpacity>
      </View>

      {/* Online members */}
      <View className="flex-row items-center mb-6">
        {onlineMembers.map((m, i) => (
          <View key={m.id} className="relative" style={{ marginLeft: i > 0 ? -8 : 0 }}>
            <Image source={{ uri: m.avatar }} className="w-10 h-10 rounded-full border-2 border-bg-primary" />
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-status-success rounded-full border border-bg-primary" />
          </View>
        ))}
        <Text className="text-text-secondary text-body-sm ml-3">{onlineMembers.length} online</Text>
      </View>

      {/* Voting section */}
      <Text className="text-white text-heading-3 mb-3">Vote on Activities</Text>
      {votableActivities.map((act, i) => (
        <Animated.View key={act.id} entering={FadeInDown.delay(i * 100)}>
          <View className="bg-bg-card border border-border rounded-card p-4 mb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white text-body font-semibold">{act.name}</Text>
              <View className="flex-row items-center">
                <Text className="text-primary text-body font-bold mr-2">{act.votes}</Text>
                <TouchableOpacity className="bg-primary/20 px-3 py-1 rounded-full"><Text className="text-primary text-body-sm">👍 Vote</Text></TouchableOpacity>
              </View>
            </View>
            <Text className="text-text-secondary text-body-sm">{act.duration} · €{act.price}</Text>
            <View className="flex-row mt-2">
              {act.voters.map((v) => (
                <Image key={v.id} source={{ uri: v.avatar }} className="w-6 h-6 rounded-full mr-1" />
              ))}
            </View>
          </View>
        </Animated.View>
      ))}

      {/* Mini chat */}
      <Text className="text-white text-heading-3 mb-3 mt-4">Chat</Text>
      <View className="bg-bg-card border border-border rounded-card p-4 mb-4">
        {[
          { user: travelers[0], text: 'I think we should do the food tour!' },
          { user: travelers[1], text: 'Agreed! And maybe the museum after?' },
        ].map((msg, i) => (
          <View key={i} className="flex-row mb-3">
            <Image source={{ uri: msg.user.avatar }} className="w-8 h-8 rounded-full mr-2" />
            <View className="bg-bg-surface rounded-2xl p-2 px-3 flex-1">
              <Text className="text-primary text-caption font-semibold">{msg.user.name.split(' ')[0]}</Text>
              <Text className="text-white text-body-sm">{msg.text}</Text>
            </View>
          </View>
        ))}
        <View className="flex-row items-center mt-2">
          <TextInput className="flex-1 bg-bg-surface border border-border rounded-full text-white text-body-sm px-4 py-2 mr-2" placeholder="Type a message..." placeholderTextColor="rgba(255,255,255,0.3)" value={chatInput} onChangeText={setChatInput} />
          <TouchableOpacity className="bg-primary w-10 h-10 rounded-full items-center justify-center"><Text className="text-white">↑</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
