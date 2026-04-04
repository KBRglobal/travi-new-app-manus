import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { chatMessages } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';

type Message = { id: string; sender: 'user' | 'ai'; text: string; timestamp: string; actions?: string[] };

export default function AIChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(chatMessages as Message[]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `u${Date.now()}`, sender: 'user', text: input, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: `ai${Date.now()}`,
        sender: 'ai',
        text: "I'd recommend checking out the Gold Souk this afternoon — it's only 10 minutes from your hotel and matches your culture DNA. Would you like me to add it to your itinerary?",
        timestamp: new Date().toISOString(),
        actions: ['Add to itinerary', 'Navigate there', 'Tell me more'],
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const handleAction = (action: string) => {
    const userMsg: Message = { id: `u${Date.now()}`, sender: 'user', text: action, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      const aiMsg: Message = { id: `ai${Date.now()}`, sender: 'ai', text: `Done! I've ${action.toLowerCase()}. Anything else?`, timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-bg-primary">
      <View className="px-6 pt-safe pb-3 flex-row items-center justify-between border-b border-border">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white text-xl">‹ Back</Text>
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-white text-heading-3">TRAVI AI</Text>
          <Text className="text-status-success text-caption">Online</Text>
        </View>
        <View className="w-12" />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-6 py-4"
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInUp.duration(300)} className={`mb-3 ${item.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <View className={`max-w-[80%] rounded-2xl p-3 ${item.sender === 'user' ? 'bg-primary rounded-br-sm' : 'bg-bg-card border border-border rounded-bl-sm'}`}>
              <Text className="text-white text-body">{item.text}</Text>
            </View>
            {item.actions && (
              <View className="flex-row flex-wrap mt-2 gap-2">
                {item.actions.map((action) => (
                  <TouchableOpacity key={action} className="bg-bg-card border border-primary rounded-full px-3 py-1.5" onPress={() => handleAction(action)}>
                    <Text className="text-primary text-body-sm">{action}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        )}
      />

      <View className="px-6 py-3 pb-safe border-t border-border flex-row items-center">
        <TextInput
          className="flex-1 bg-bg-card border border-border rounded-full text-white text-body px-4 py-3 mr-3"
          placeholder="Ask TRAVI anything..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity className="bg-primary w-12 h-12 rounded-full items-center justify-center" onPress={sendMessage}>
          <Text className="text-white text-lg">↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
