import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function FeedbackScreen() {
 const router = useRouter();
 const [rating, setRating] = useState(0);
 const [feedback, setFeedback] = useState('');
 const [submitted, setSubmitted] = useState(false);

 if (submitted) return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
 <Ionicons name="hand-left" size={24} color="#FFFFFF" />
 <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Thank You!</Text>
 <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>Your feedback helps us make TRAVI better for everyone.</Text>
 <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
 </View>
 );

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center px-4 py-3 mb-2">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Feedback</Text>
 </View>
 <View className="items-center py-8">
 <Text className=" text-lg font-[Satoshi-Bold] mb-4" style={{ color: colors.text.primary }}>How's your experience?</Text>
 <View className="flex-row">
 {[1, 2, 3, 4, 5].map(star => (
 <TouchableOpacity key={star} onPress={() => setRating(star)} className="mx-2">
 <Text className="text-4xl">{star <= rating ? '⭐' : ''}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 <View className="mx-4 mb-4">
 <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Tell us more</Text>
 <TextInput className="bg-[#120824] rounded-2xl px-4 py-4 text-white h-32 border border-white/[0.08]" placeholder="What can we improve?" placeholderTextColor="rgba(255,255,255,0.3)" value={feedback} onChangeText={setFeedback} multiline textAlignVertical="top" />
 </View>
 <TouchableOpacity onPress={() => rating > 0 ? setSubmitted(true) : null} className={`mx-4 py-4 rounded-2xl items-center ${rating > 0 ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`font-[Satoshi-Bold] ${rating > 0 ? 'text-white' : 'text-white/30'}`}>Send Feedback</Text>
 </TouchableOpacity>
 </ScrollView>
 );
}
