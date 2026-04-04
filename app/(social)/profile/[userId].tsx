import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function UserProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const [isConnected, setIsConnected] = useState(false);

  const user = { name: 'Sarah K.', avatar: '👩', bio: 'Foodie traveler exploring the world one bite at a time', trips: 8, countries: 12, reviews: 23, dna: ['Food 95%', 'Culture 88%', 'Adventure 72%'], badges: ['🏆 Top Reviewer', '🌍 Globe Trotter', '🍜 Foodie Master'] };

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <TouchableOpacity><Text className="text-white/40 text-xl">···</Text></TouchableOpacity>
      </View>
      <View className="items-center py-6">
        <Text className="text-7xl mb-3">{user.avatar}</Text>
        <Text className="text-white text-2xl font-bold">{user.name}</Text>
        <Text className="text-white/60 text-sm text-center px-8 mt-2">{user.bio}</Text>
      </View>
      <View className="flex-row justify-around mx-4 mb-6 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
        <View className="items-center"><Text className="text-white text-xl font-bold">{user.trips}</Text><Text className="text-white/40 text-xs">Trips</Text></View>
        <View className="items-center"><Text className="text-white text-xl font-bold">{user.countries}</Text><Text className="text-white/40 text-xs">Countries</Text></View>
        <View className="items-center"><Text className="text-white text-xl font-bold">{user.reviews}</Text><Text className="text-white/40 text-xs">Reviews</Text></View>
      </View>
      <View className="flex-row mx-4 mb-6">
        <TouchableOpacity onPress={() => setIsConnected(!isConnected)} className={`flex-1 mr-2 py-3 rounded-2xl items-center ${isConnected ? 'bg-white/[0.05] border border-white/[0.08]' : 'bg-primary'}`}>
          <Text className={`font-bold ${isConnected ? 'text-white/60' : 'text-white'}`}>{isConnected ? '✓ Connected' : 'Connect'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/(social)/messages/${userId}`)} className="flex-1 mx-1 py-3 rounded-2xl items-center bg-white/[0.05] border border-white/[0.08]">
          <Text className="text-white/80 font-bold">Message</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/(social)/compatibility/${userId}`)} className="flex-1 ml-2 py-3 rounded-2xl items-center bg-white/[0.05] border border-white/[0.08]">
          <Text className="text-white/80 font-bold">DNA</Text>
        </TouchableOpacity>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white font-bold text-lg mb-3">Travel DNA</Text>
        <View className="flex-row flex-wrap">
          {user.dna.map(d => <View key={d} className="bg-primary/20 px-3 py-1.5 rounded-full mr-2 mb-2"><Text className="text-primary text-sm">{d}</Text></View>)}
        </View>
      </View>
      <View className="mx-4 mb-8">
        <Text className="text-white font-bold text-lg mb-3">Badges</Text>
        <View className="flex-row flex-wrap">
          {user.badges.map(b => <View key={b} className="bg-bg-secondary px-3 py-2 rounded-xl mr-2 mb-2 border border-white/[0.08]"><Text className="text-white/80 text-sm">{b}</Text></View>)}
        </View>
      </View>
    </ScrollView>
  );
}
