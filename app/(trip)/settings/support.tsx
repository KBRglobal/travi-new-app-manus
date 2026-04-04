import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function SupportScreen() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['Booking Issue', 'Payment Problem', 'Account Help', 'Bug Report', 'Feature Request', 'Other'];

  if (submitted) return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
      <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Ticket Submitted</Text>
      <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>We'll get back to you within 2 hours. Check your email for updates.</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Contact Support</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Category</Text>
        <View className="flex-row flex-wrap">
          {categories.map(c => (
            <TouchableOpacity key={c} onPress={() => setCategory(c)} className={`px-4 py-2 rounded-full mr-2 mb-2 ${category === c ? 'bg-[#6443F4]' : 'bg-white/[0.05] border border-white/[0.08]'}`}>
              <Text className={`text-sm ${category === c ? 'text-white font-[Satoshi-Bold]' : 'text-white/60'}`}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="mx-4 mb-4">
        <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Message</Text>
        <TextInput className="bg-[#120824] rounded-2xl px-4 py-4 text-white h-40 border border-white/[0.08]" placeholder="Describe your issue..." placeholderTextColor="rgba(255,255,255,0.3)" value={message} onChangeText={setMessage} multiline textAlignVertical="top" />
      </View>
      <TouchableOpacity onPress={() => category && message ? setSubmitted(true) : null} className={`mx-4 py-4 rounded-2xl items-center ${category && message ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
        <Text className={`font-[Satoshi-Bold] ${category && message ? 'text-white' : 'text-white/30'}`}>Submit Ticket</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
