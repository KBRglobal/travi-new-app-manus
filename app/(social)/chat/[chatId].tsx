import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
const MSGS = Array.from({ length: 10 }, (_, i) => ({ id: `m-${i+1}`, text: `Message ${i+1} content here`, mine: i % 3 === 0, time: `${12+i}:${i*5 < 10 ? '0' : ''}${i*5}` }));

export default function ChatScreen() {
 const router = useRouter();
 const { chatId } = useLocalSearchParams<{ chatId: string }>();
 const [msg, setMsg] = useState('');
 return (
 <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <View className="flex-row items-center px-4 md:px-6 pt-safe mt-4">
 <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text></Pressable>
 <View className="w-9 h-9 rounded-full bg-[#6443F4]/20 items-center justify-center ml-2 mr-3"><Ionicons name="person" size={24} color="#FFFFFF" /></View>
 <Text className=" text-lg font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>Chat {chatId}</Text>
 <Pressable onPress={() => router.push(`/(social)/profile/${chatId}`)}><Text className="text-[#6443F4] text-sm">Profile</Text></Pressable>
 </View>
 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="Start the conversation" description="Say hello to your travel buddy!" />} data={MSGS} keyExtractor={(i) => i.id} inverted contentContainerClassName="px-4 md:px-6 py-4 gap-2"
 renderItem={({ item }) => (
 <View className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 ${item.mine ? 'bg-[#6443F4] self-end' : 'bg-white/5 self-start'}`}>
 <Text className=" text-sm" style={{ color: colors.text.primary }}>{item.text}</Text>
 <Text className="/50 text-xs mt-1 self-end" style={{ color: colors.text.primary }}>{item.time}</Text>
 </View>
 )}
 />
 <View className="flex-row items-center px-4 md:px-6 pb-safe mb-2 gap-2">
 <TextInput value={msg} onChangeText={setMsg} placeholder="Type a message..." placeholderTextColor="rgba(255,255,255,0.3)" className="flex-1 h-12 px-4 bg-white/5 border border-white/10 rounded-full text-white text-base" />
 <Pressable onPress={() => {}} className="w-12 h-12 bg-[#6443F4] rounded-full items-center justify-center active:opacity-80"><Text className=" text-lg" style={{ color: colors.text.primary }}>↑</Text></Pressable>
 </View>
 </KeyboardAvoidingView>
 );
}
