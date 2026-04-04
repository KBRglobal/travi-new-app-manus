import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { chatMessages } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: colors.bg.primary }}">
      <View className="px-6 pt-safe pb-3 flex-row items-center justify-between border-b border-[rgba(255,255,255,0.08)]">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <View className="items-center">
          <Text className=" text-[18px]" style={{ color: colors.text.primary }}>TRAVI AI</Text>
          <Text className="text-[#4ADE80] text-[12px]">Online</Text>
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
            <View className={`max-w-[80%] rounded-2xl p-3 ${item.sender === 'user' ? 'bg-[#6443F4] rounded-br-sm' : 'bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-bl-sm'}`}>
              <Text className=" text-[15px]" style={{ color: colors.text.primary }}>{item.text}</Text>
            </View>
            {item.actions && (
              <View className="flex-row flex-wrap mt-2 gap-2">
                {item.actions.map((action) => (
                  <TouchableOpacity key={action} className="bg-[#120824] border border-[#6443F4] rounded-full px-3 py-1.5" onPress={() => handleAction(action)}>
                    <Text className="text-[#6443F4] text-[13px]">{action}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        )}
      />

      <View className="px-6 py-3 pb-safe border-t border-[rgba(255,255,255,0.08)] flex-row items-center">
        <TextInput
          className="flex-1 bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-full text-white text-[15px] px-4 py-3 mr-3"
          placeholder="Ask TRAVI anything..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity className="bg-[#6443F4] w-12 h-12 rounded-full items-center justify-center" onPress={sendMessage}>
          <Text className=" text-lg" style={{ color: colors.text.primary }}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
