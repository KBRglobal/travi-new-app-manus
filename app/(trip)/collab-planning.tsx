import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { travelers, activities } from '../../lib/mockData';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CachedImage } from '../../components/ui/CachedImage';

export default function CollabPlanningScreen() {
  const router = useRouter();
  const [chatInput, setChatInput] = useState('');
  const onlineMembers = travelers.slice(0, 3);

  const votableActivities = activities.slice(0, 4).map((a) => ({
    ...a,
    votes: Math.floor(Math.random() * 4),
    voters: travelers.slice(0, Math.floor(Math.random() * 3) + 1),
  }));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
        <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Plan Together</Text>
        <TouchableOpacity><Text className="text-[#6443F4] text-[13px]">+ Invite</Text></TouchableOpacity>
      </View>

      {/* Online members */}
      <View className="flex-row items-center mb-6">
        {onlineMembers.map((m, i) => (
          <View key={m.id} className="relative" style={{ marginLeft: i > 0 ? -8 : 0 }}>
            <CachedImage source={{ uri: m.avatar }} className="w-10 h-10 rounded-full border-2 border-bg-[#6443F4]" />
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-[#4ADE80] rounded-full border border-bg-[#6443F4]" />
          </View>
        ))}
        <Text className="text-[rgba(255,255,255,0.6)] text-[13px] ml-3">{onlineMembers.length} online</Text>
      </View>

      {/* Voting section */}
      <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>Vote on Activities</Text>
      {votableActivities.map((act, i) => (
        <Animated.View key={act.id} entering={FadeInDown.delay(i * 100)}>
          <View className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{act.name}</Text>
              <View className="flex-row items-center">
                <Text className="text-[#6443F4] text-[15px] font-[Satoshi-Bold] mr-2">{act.votes}</Text>
                <TouchableOpacity onPress={() => {}} className="bg-[#6443F4]/20 px-3 py-1 rounded-full"><Text className="text-[#6443F4] text-[13px]">Vote</Text></TouchableOpacity>
              </View>
            </View>
            <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{act.duration} · €{act.price}</Text>
            <View className="flex-row mt-2">
              {act.voters.map((v) => (
                <Image key={v.id} source={{ uri: v.avatar }} className="w-6 h-6 rounded-full mr-1" />
              ))}
            </View>
          </View>
        </Animated.View>
      ))}

      {/* Mini chat */}
      <Text className=" text-[18px] mb-3 mt-4" style={{ color: colors.text.primary }}>Chat</Text>
      <View className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-4">
        {[
          { user: travelers[0], text: 'I think we should do the food tour!' },
          { user: travelers[1], text: 'Agreed! And maybe the museum after?' },
        ].map((msg, i) => (
          <View key={i} className="flex-row mb-3">
            <CachedImage source={{ uri: msg.user.avatar }} className="w-8 h-8 rounded-full mr-2" />
            <View className="bg-bg-surface rounded-2xl p-2 px-3 flex-1">
              <Text className="text-[#6443F4] text-[12px] font-semibold">{msg.user.name.split(' ')[0]}</Text>
              <Text className=" text-[13px]" style={{ color: colors.text.primary }}>{msg.text}</Text>
            </View>
          </View>
        ))}
        <View className="flex-row items-center mt-2">
          <TextInput className="flex-1 bg-bg-surface border border-[rgba(255,255,255,0.08)] rounded-full text-white text-[13px] px-4 py-2 mr-2" placeholder="Type a message..." placeholderTextColor="rgba(255,255,255,0.3)" value={chatInput} onChangeText={setChatInput} />
          <TouchableOpacity onPress={() => {}} className="bg-[#6443F4] w-10 h-10 rounded-full items-center justify-center"><Text className="" style={{ color: colors.text.primary }}>↑</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
