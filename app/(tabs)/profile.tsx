import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { currentUser } from '../../lib/mockData';
import { useAuthStore } from '../../stores/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { setAuthenticated } = useAuthStore();

  const menuItems = [
    { emoji: '🧬', label: 'My Travel DNA', route: '/(trip)/dna-profile' },
    { emoji: '✈️', label: 'My Trips', route: '/(tabs)/trips' },
    { emoji: '💰', label: 'Wallet', route: '/(tabs)/wallet' },
    { emoji: '⭐', label: 'Points & Rewards', route: '/(tabs)/points' },
    { emoji: '🏆', label: 'Membership', route: '/(trip)/membership' },
    { emoji: '🗺️', label: 'Adventure Log', route: '/(trip)/adventure-log' },
    { emoji: '👥', label: 'Referrals', route: '/(trip)/referral' },
    { emoji: '⚙️', label: 'Settings', route: '/(trip)/settings' },
    { emoji: '❓', label: 'Help & Support', route: '/(trip)/support' },
  ];

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24">
      {/* Profile Header */}
      <Animated.View entering={FadeInDown} className="items-center px-6 mb-6">
        <Image source={{ uri: currentUser.avatar }} className="w-24 h-24 rounded-full mb-3 border-2 border-primary" />
        <Text className="text-white text-heading-2">{currentUser.firstName} {currentUser.lastName}</Text>
        <Text className="text-text-secondary text-body">Member since {currentUser.memberSince}</Text>
      </Animated.View>

      {/* Stats */}
      <View className="flex-row px-6 mb-6">
        {[
          { value: currentUser.tripsCompleted, label: 'Trips' },
          { value: currentUser.countriesVisited, label: 'Countries' },
          { value: '12.5K', label: 'Points' },
        ].map((stat) => (
          <View key={stat.label} className="flex-1 bg-bg-card border border-border rounded-card py-3 items-center mr-2">
            <Text className="text-white text-heading-3 font-bold">{stat.value}</Text>
            <Text className="text-text-muted text-caption">{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View className="px-6">
        {menuItems.map((item, i) => (
          <Animated.View key={item.label} entering={FadeInDown.delay(i * 50)}>
            <TouchableOpacity className="flex-row items-center py-4 border-b border-border" onPress={() => router.push(item.route as any)}>
              <Text className="text-xl mr-4">{item.emoji}</Text>
              <Text className="text-white text-body flex-1">{item.label}</Text>
              <Text className="text-text-muted">›</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Logout */}
        <TouchableOpacity className="flex-row items-center py-4 mt-4" onPress={() => { setAuthenticated(false); router.replace('/(auth)/welcome'); }}>
          <Text className="text-xl mr-4">🚪</Text>
          <Text className="text-status-error text-body">Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
