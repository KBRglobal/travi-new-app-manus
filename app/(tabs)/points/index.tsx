import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PointsDashboard() {
  const router = useRouter();

  const quickNav = [
    { icon: '🎁', label: 'Redeem', route: '/(trip)/points/redeem' },
    { icon: '💎', label: 'Earn', route: '/(trip)/points/earn' },
    { icon: '📜', label: 'History', route: '/(trip)/points/history' },
    { icon: '👑', label: 'Perks', route: '/(trip)/points/perks' },
    { icon: '👥', label: 'Referrals', route: '/(trip)/points/referrals' },
    { icon: '🚨', label: 'Alerts', route: '/(trip)/plan/flight-alerts', isNew: true },
  ];

  return (
    <View className="flex-1 bg-bg-primary">
      <ScrollView className="flex-1 px-4 pt-12">
        <Text className="text-white text-2xl font-bold mb-6">Points & Rewards</Text>

        <View className="bg-primary rounded-card p-6 mb-6 items-center">
          <Text className="text-white/80 mb-1">Your Points</Text>
          <Text className="text-white text-5xl font-bold mb-2">12,500</Text>
          <Text className="text-white/80">Gold Member · 2,500 to Platinum</Text>
          <View className="bg-white/20 rounded-full h-2 w-48 mt-2 overflow-hidden">
            <View className="bg-white h-full rounded-full" style={{ width: '75%' }} />
          </View>
        </View>

        <Text className="text-white font-bold text-lg mb-3">Quick Navigation</Text>
        <View className="flex-row flex-wrap mb-6">
          {quickNav.map(item => (
            <TouchableOpacity key={item.label} onPress={() => router.push(item.route as any)} className="bg-bg-card rounded-card p-4 items-center" style={{ width: '48%', marginRight: '2%', marginBottom: 8, borderWidth: item.isNew ? 1 : 0, borderColor: item.isNew ? '#F94498' : 'transparent' }}>
              <Text className="text-2xl mb-1">{item.icon}</Text>
              <Text className={`font-semibold text-sm ${item.isNew ? 'text-pink' : 'text-white'}`}>{item.label}</Text>
              {item.isNew && <Text className="text-pink text-xs">NEW</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-white font-bold text-lg mb-3">Recent Activity</Text>
        {[
          { text: 'Earned 500 pts — Hotel booking', date: 'Apr 12' },
          { text: 'Earned 200 pts — Flight check-in', date: 'Apr 10' },
          { text: 'Redeemed 1,000 pts — Lounge access', date: 'Apr 8' },
        ].map((act, i) => (
          <View key={i} className="bg-bg-card rounded-card p-4 mb-2">
            <Text className="text-white">{act.text}</Text>
            <Text className="text-text-muted text-sm">{act.date}</Text>
          </View>
        ))}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
