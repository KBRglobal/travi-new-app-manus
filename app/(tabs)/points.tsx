import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { pointsData } from '../../lib/mockData';
import { useEffect } from 'react';

export default function PointsScreen() {
  const router = useRouter();
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withDelay(300, withSpring(pointsData.tierProgress * 100, { damping: 15 }));
  }, []);

  const progressStyle = useAnimatedStyle(() => ({ width: `${progressWidth.value}%` }));

  const tierColors: Record<string, string> = { silver: '#C0C0C0', gold: '#FFD700', platinum: '#E5E4E2', diamond: '#B9F2FF' };

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24">
      <Text className="text-white text-heading-1 px-6 mb-6">Points</Text>

      {/* Points Balance */}
      <Animated.View entering={FadeInDown} className="mx-6 bg-bg-card border border-border rounded-card p-6 mb-6">
        <Text className="text-text-secondary text-body-sm mb-1">Total Points</Text>
        <Text className="text-white text-4xl font-bold mb-2">{pointsData.balance.toLocaleString()}</Text>
        <View className="flex-row items-center mb-4">
          <View className="px-3 py-1 rounded-full mr-2" style={{ backgroundColor: tierColors[pointsData.tier] + '30' }}>
            <Text style={{ color: tierColors[pointsData.tier] }} className="text-body-sm font-bold capitalize">{pointsData.tier}</Text>
          </View>
          <Text className="text-text-muted text-body-sm">{pointsData.earnRate}x earn rate</Text>
        </View>

        {/* Tier progress */}
        <Text className="text-text-muted text-caption mb-1">Progress to {pointsData.nextTier}</Text>
        <View className="h-3 bg-bg-surface rounded-full overflow-hidden mb-1">
          <Animated.View style={progressStyle} className="h-full bg-primary rounded-full" />
        </View>
        <Text className="text-text-muted text-caption">{pointsData.balance.toLocaleString()} / {pointsData.nextTierAt.toLocaleString()} points</Text>
      </Animated.View>

      {/* Quick Actions */}
      <View className="flex-row px-6 mb-6 gap-3">
        <TouchableOpacity className="flex-1 bg-bg-card border border-border rounded-card py-4 items-center" onPress={() => router.push('/(trip)/redeem')}>
          <Text className="text-2xl mb-1">🎁</Text>
          <Text className="text-white text-body-sm">Redeem</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-bg-card border border-border rounded-card py-4 items-center" onPress={() => router.push('/(trip)/earn-more')}>
          <Text className="text-2xl mb-1">⚡</Text>
          <Text className="text-white text-body-sm">Earn More</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-bg-card border border-border rounded-card py-4 items-center" onPress={() => router.push('/(trip)/referral')}>
          <Text className="text-2xl mb-1">👥</Text>
          <Text className="text-white text-body-sm">Refer</Text>
        </TouchableOpacity>
      </View>

      {/* History */}
      <View className="px-6">
        <Text className="text-white text-heading-3 mb-3">Points History</Text>
        {pointsData.transactions.map((tx, i) => (
          <Animated.View key={tx.id} entering={FadeInDown.delay(i * 80)}>
            <View className="flex-row bg-bg-card border border-border rounded-card p-3 mb-2 items-center">
              <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${tx.type === 'earn' ? 'bg-status-success/20' : 'bg-pink/20'}`}>
                <Text className="text-lg">{tx.type === 'earn' ? '⬆️' : '⬇️'}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-body">{tx.description}</Text>
                <Text className="text-text-muted text-caption">{tx.date}</Text>
              </View>
              <Text className={`text-body font-semibold ${tx.type === 'earn' ? 'text-status-success' : 'text-pink'}`}>
                {tx.type === 'earn' ? '+' : ''}{tx.amount.toLocaleString()}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}
