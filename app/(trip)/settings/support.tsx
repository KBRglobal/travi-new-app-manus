import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function SupportScreen() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['Booking Issue', 'Payment Problem', 'Account Help', 'Bug Report', 'Feature Request', 'Other'];

  if (submitted) return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-5xl mb-4">✅</Text>
      <Text className="text-white text-2xl font-bold mb-2">Ticket Submitted</Text>
      <Text className="text-white/60 text-center mb-6">We'll get back to you within 2 hours. Check your email for updates.</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Contact Support</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Category</Text>
        <View className="flex-row flex-wrap">
          {categories.map(c => (
            <TouchableOpacity key={c} onPress={() => setCategory(c)} className={`px-4 py-2 rounded-full mr-2 mb-2 ${category === c ? 'bg-primary' : 'bg-white/[0.05] border border-white/[0.08]'}`}>
              <Text className={`text-sm ${category === c ? 'text-white font-bold' : 'text-white/60'}`}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Message</Text>
        <TextInput className="bg-bg-secondary rounded-2xl px-4 py-4 text-white h-40 border border-white/[0.08]" placeholder="Describe your issue..." placeholderTextColor="rgba(255,255,255,0.3)" value={message} onChangeText={setMessage} multiline textAlignVertical="top" />
      </View>
      <TouchableOpacity onPress={() => category && message ? setSubmitted(true) : null} className={`mx-4 py-4 rounded-2xl items-center ${category && message ? 'bg-primary' : 'bg-white/[0.05]'}`}>
        <Text className={`font-bold ${category && message ? 'text-white' : 'text-white/30'}`}>Submit Ticket</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
