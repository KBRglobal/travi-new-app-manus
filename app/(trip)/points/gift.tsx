import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

export default function GiftPointsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
      <Ionicons name="gift" size={24} color="#FFFFFF" />
      <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Points Sent!</Text>
      <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>{amount} points sent to {recipient}</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <ScreenHeader title="Gift Points" />
      </View>
      <View className="items-center py-4">
        <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Available: 15,400 pts</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Amount</Text>
        <View className="flex-row flex-wrap">
          {AMOUNTS.map(a => (
            <TouchableOpacity key={a} onPress={() => setAmount(a)} className={`px-4 py-3 rounded-xl mr-2 mb-2 ${amount === a ? 'bg-[#6443F4]' : 'bg-white/[0.05] border border-white/[0.08]'}`}>
              <Text className={`font-[Satoshi-Bold] ${amount === a ? 'text-white' : 'text-white/60'}`}>{a} pts</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="mx-4 mb-4">
        <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Recipient</Text>
        <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={recipient} onChangeText={setRecipient} placeholder="Search by name or email" placeholderTextColor="rgba(255,255,255,0.3)" />
      </View>
      <View className="mx-4 mb-6">
        <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Message (optional)</Text>
        <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={message} onChangeText={setMessage} placeholder="Add a personal message" placeholderTextColor="rgba(255,255,255,0.3)" />
      </View>
      <TouchableOpacity onPress={() => amount > 0 && recipient ? setSent(true) : null} className={`mx-4 py-4 rounded-2xl items-center ${amount > 0 && recipient ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
        <Text className={`font-[Satoshi-Bold] ${amount > 0 && recipient ? 'text-white' : 'text-white/30'}`}>Send Gift</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
