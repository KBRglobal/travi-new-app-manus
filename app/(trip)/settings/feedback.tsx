import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function FeedbackScreen() {
 const router = useRouter();
 const [rating, setRating] = useState(0);
 const [feedback, setFeedback] = useState('');
 const [submitted, setSubmitted] = useState(false);

 if (submitted) return (
 <View className="flex-1 bg-bg-primary items-center justify-center px-8">
 <Ionicons name="hand-left" size={24} color="#FFFFFF" />
 <Text className="text-white text-2xl font-bold mb-2">Thank You!</Text>
 <Text className="text-white/60 text-center mb-6">Your feedback helps us make TRAVI better for everyone.</Text>
 <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
 </View>
 );

 return (
 <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary pt-safe">
 <View className="flex-row items-center px-4 py-3 mb-2">
 <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
 <Text className="text-white text-xl font-bold ml-3">Feedback</Text>
 </View>
 <View className="items-center py-8">
 <Text className="text-white text-lg font-bold mb-4">How's your experience?</Text>
 <View className="flex-row">
 {[1, 2, 3, 4, 5].map(star => (
 <TouchableOpacity key={star} onPress={() => setRating(star)} className="mx-2">
 <Text className="text-4xl">{star <= rating ? '⭐' : ''}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 <View className="mx-4 mb-4">
 <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Tell us more</Text>
 <TextInput className="bg-bg-secondary rounded-2xl px-4 py-4 text-white h-32 border border-white/[0.08]" placeholder="What can we improve?" placeholderTextColor="rgba(255,255,255,0.3)" value={feedback} onChangeText={setFeedback} multiline textAlignVertical="top" />
 </View>
 <TouchableOpacity onPress={() => rating > 0 ? setSubmitted(true) : null} className={`mx-4 py-4 rounded-2xl items-center ${rating > 0 ? 'bg-primary' : 'bg-white/[0.05]'}`}>
 <Text className={`font-bold ${rating > 0 ? 'text-white' : 'text-white/30'}`}>Send Feedback</Text>
 </TouchableOpacity>
 </ScrollView>
 );
}
