import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { walletData } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';

export default function WalletScreen() {
  const router = useRouter();
  const cardScale = useSharedValue(1);
  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: cardScale.value }] }));

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24">
      <Text className="text-white text-heading-1 px-6 mb-6">Wallet</Text>

      {/* Balance Card */}
      <Animated.View entering={FadeInDown} style={cardStyle} className="mx-6 bg-primary rounded-card p-6 mb-6">
        <Text className="text-white/70 text-body-sm mb-1">Available Balance</Text>
        <Text className="text-white text-4xl font-bold mb-4">€{walletData.balance.toFixed(2)}</Text>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-white/60 text-caption">Pending Cashback</Text>
            <Text className="text-white text-body font-semibold">€{walletData.pendingCashback.toFixed(2)}</Text>
          </View>
          <View className="items-end">
            <Text className="text-white/60 text-caption">Currency</Text>
            <Text className="text-white text-body font-semibold">{walletData.currency}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Quick Actions */}
      <View className="flex-row px-6 mb-6 gap-3">
        <TouchableOpacity className="flex-1 bg-bg-card border border-border rounded-card py-4 items-center" onPress={() => router.push('/(trip)/topup')}>
          <Text className="text-2xl mb-1">💳</Text>
          <Text className="text-white text-body-sm">Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-bg-card border border-border rounded-card py-4 items-center" onPress={() => router.push('/(trip)/send')}>
          <Text className="text-2xl mb-1">📤</Text>
          <Text className="text-white text-body-sm">Send</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-bg-card border border-border rounded-card py-4 items-center" onPress={() => router.push('/(trip)/split-pay')}>
          <Text className="text-2xl mb-1">✂️</Text>
          <Text className="text-white text-body-sm">Split</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions */}
      <View className="px-6">
        <Text className="text-white text-heading-3 mb-3">Recent Transactions</Text>
        {walletData.transactions.map((tx, i) => (
          <Animated.View key={tx.id} entering={FadeInDown.delay(i * 80)}>
            <View className="flex-row bg-bg-card border border-border rounded-card p-3 mb-2 items-center">
              <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${tx.type === 'cashback' ? 'bg-status-success/20' : tx.type === 'topup' ? 'bg-primary/20' : 'bg-status-error/20'}`}>
                <Text className="text-lg">{tx.type === 'cashback' ? '💰' : tx.type === 'topup' ? '💳' : '🛒'}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-body">{tx.description}</Text>
                <Text className="text-text-muted text-caption">{tx.date}</Text>
              </View>
              <Text className={`text-body font-semibold ${tx.amount > 0 ? 'text-status-success' : 'text-white'}`}>
                {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toFixed(2)}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}
