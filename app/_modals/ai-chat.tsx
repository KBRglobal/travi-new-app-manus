import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
const MSGS = [
  { id: '1', text: "Hi! I'm Travi, your AI travel companion. How can I help?", mine: false },
];

export default function AIChatModal() {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState(MSGS);
  const send = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: msg, mine: true }, { id: (Date.now()+1).toString(), text: "That sounds great! Let me help you with that.", mine: false }]);
    setMsg('');
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-bg-primary">
      <View className="flex-row items-center justify-between px-4 md:px-6 pt-safe mt-4">
        <View className="flex-row items-center">
          <Text className="text-2xl mr-2">🤖</Text>
          <Text className="text-white text-lg font-bold">Travi AI</Text>
        </View>
        <Pressable onPress={() => router.back()} className="p-2"><Text className="text-text-secondary text-lg">✕</Text></Pressable>
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState emoji="🤖" title="Ask me anything!" description="I can help plan your trip, find deals, and more." />} data={messages} keyExtractor={(i) => i.id} contentContainerClassName="px-4 md:px-6 py-4 gap-2"
        renderItem={({ item }) => (
          <View className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 ${item.mine ? 'bg-primary self-end' : 'bg-white/5 self-start'}`}>
            <Text className="text-white text-sm">{item.text}</Text>
          </View>
        )}
      />
      <View className="flex-row items-center px-4 md:px-6 pb-safe mb-2 gap-2">
        <TextInput value={msg} onChangeText={setMsg} placeholder="Ask me anything..." placeholderTextColor="rgba(255,255,255,0.3)" onSubmitEditing={send} className="flex-1 h-12 px-4 bg-white/5 border border-white/10 rounded-pill text-white text-base" />
        <Pressable onPress={send} className="w-12 h-12 bg-primary rounded-full items-center justify-center active:opacity-80"><Text className="text-white text-lg">↑</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
