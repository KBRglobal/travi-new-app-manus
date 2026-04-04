import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const MESSAGES = [
 { id: '1', sender: 'other', text: 'Hey! Are you coming to Barcelona?', time: '10:30' },
 { id: '2', sender: 'me', text: 'Yes! I just booked my flight airplane', time: '10:32' },
 { id: '3', sender: 'other', text: 'Amazing! We should plan some activities together', time: '10:33' },
 { id: '4', sender: 'me', text: 'Definitely! I want to try the food tour', time: '10:35' },
 { id: '5', sender: 'other', text: 'I know a great one near La Boqueria!', time: '10:36' },
 { id: '6', sender: 'other', text: 'See you in Barcelona! ', time: '10:37' },
];

export default function ChatScreen() {
 const router = useRouter();
 const { convId } = useLocalSearchParams();
 const [messages, setMessages] = useState(MESSAGES);
 const [text, setText] = useState('');
 const flatListRef = useRef<FlatList>(null);

 const sendMessage = () => {
 if (!text.trim()) return;
 setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', text: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
 setText('');
 setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
 };

 return (
 <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg.primary }}" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
 <View className="flex-row items-center px-4 py-3 pt-safe border-b border-white/[0.08]">
 <TouchableOpacity onPress={() => router.back()} className="mr-3"><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className="text-3xl mr-3">person</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Sarah K.</Text>
 <Text className="text-green-400 text-xs">Online</Text>
 </View>
 <TouchableOpacity onPress={() => router.push(`/(social)/profile/${convId}`)}><Ionicons name="information-circle" size={24} color="#FFFFFF" /></TouchableOpacity>
 </View>
 <FlatList
 ref={flatListRef}
 data={messages}
 keyExtractor={i => i.id}
 className="flex-1 px-4 pt-4"
 onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
 renderItem={({ item }) => (
 <View className={`mb-3 max-w-[80%] ${item.sender === 'me' ? 'self-end' : 'self-start'}`}>
 <View className={`px-4 py-3 rounded-2xl ${item.sender === 'me' ? 'bg-[#6443F4] rounded-br-sm' : 'bg-[#120824] rounded-bl-sm border border-white/[0.08]'}`}>
 <Text className=" text-sm" style={{ color: colors.text.primary }}>{item.text}</Text>
 </View>
 <Text className={`text-white/30 text-xs mt-1 ${item.sender === 'me' ? 'text-right' : ''}`}>{item.time}</Text>
 </View>
 )}
 />
 <View className="flex-row items-center px-4 py-3 pb-safe border-t border-white/[0.08]">
 <TouchableOpacity className="mr-2"><Ionicons name="attach" size={24} color="#FFFFFF" /></TouchableOpacity>
 <TextInput className="flex-1 bg-white/[0.05] rounded-2xl px-4 py-3 text-white border border-white/[0.08]" placeholder="Type a message..." placeholderTextColor="rgba(255,255,255,0.3)" value={text} onChangeText={setText} multiline />
 <TouchableOpacity onPress={sendMessage} className="ml-2 bg-[#6443F4] w-10 h-10 rounded-full items-center justify-center">
 <Text className="" style={{ color: colors.text.primary }}>↑</Text>
 </TouchableOpacity>
 </View>
 </KeyboardAvoidingView>
 );
}
