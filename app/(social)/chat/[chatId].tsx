import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
const MSGS = Array.from({ length: 10 }, (_, i) => ({ id: `m-${i+1}`, text: `Message ${i+1} content here`, mine: i % 3 === 0, time: `${12+i}:${i*5 < 10 ? '0' : ''}${i*5}` }));

export default function ChatScreen() {
 const router = useRouter();
 const { chatId } = useLocalSearchParams<{ chatId: string }>();
 const [msg, setMsg] = useState('');
 return (
 <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-bg-primary">
 <View className="flex-row items-center px-4 md:px-6 pt-safe mt-4">
 <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
 <View className="w-9 h-9 rounded-full bg-primary/20 items-center justify-center ml-2 mr-3"><Ionicons name="person" size={24} color="#FFFFFF" /></View>
 <Text className="text-white text-lg font-bold flex-1">Chat {chatId}</Text>
 <Pressable onPress={() => router.push(`/(social)/profile/${chatId}`)}><Text className="text-primary text-sm">Profile</Text></Pressable>
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="Start the conversation" description="Say hello to your travel buddy!" />} data={MSGS} keyExtractor={(i) => i.id} inverted contentContainerClassName="px-4 md:px-6 py-4 gap-2"
 renderItem={({ item }) => (
 <View className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 ${item.mine ? 'bg-primary self-end' : 'bg-white/5 self-start'}`}>
 <Text className="text-white text-sm">{item.text}</Text>
 <Text className="text-white/50 text-xs mt-1 self-end">{item.time}</Text>
 </View>
 )}
 />
 <View className="flex-row items-center px-4 md:px-6 pb-safe mb-2 gap-2">
 <TextInput value={msg} onChangeText={setMsg} placeholder="Type a message..." placeholderTextColor="rgba(255,255,255,0.3)" className="flex-1 h-12 px-4 bg-white/5 border border-white/10 rounded-pill text-white text-base" />
 <Pressable className="w-12 h-12 bg-primary rounded-full items-center justify-center active:opacity-80"><Text className="text-white text-lg">↑</Text></Pressable>
 </View>
 </KeyboardAvoidingView>
 );
}
