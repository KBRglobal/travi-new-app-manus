import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary">
      <ScrollView className="flex-1 px-4 pt-12">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-text-secondary">Good morning</Text>
            <Text className="text-white text-2xl font-bold">Welcome back! 👋</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(trip)/profile')}>
            <View className="w-10 h-10 bg-primary rounded-full items-center justify-center">
              <Text className="text-white font-bold">U</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(trip)/plan/destination')} className="bg-primary rounded-card p-6 mb-4">
          <Text className="text-white text-lg font-bold mb-1">AI Trip Suggestion</Text>
          <Text className="text-white/80">Based on your Travel DNA — Dubai is 92% match!</Text>
          <Text className="text-white font-semibold mt-2">Plan Trip →</Text>
        </TouchableOpacity>

        <Text className="text-white font-bold text-lg mb-3">Quick Stats</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <TouchableOpacity onPress={() => router.push('/(tabs)/wallet')} className="bg-bg-card rounded-card p-4 mr-3" style={{ width: 140 }}>
            <Text className="text-text-secondary text-sm">Wallet</Text>
            <Text className="text-white text-xl font-bold">€2,450</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/points')} className="bg-bg-card rounded-card p-4 mr-3" style={{ width: 140 }}>
            <Text className="text-text-secondary text-sm">Points</Text>
            <Text className="text-white text-xl font-bold">12,500</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(trip)/plan/flight-alerts')} className="bg-bg-card rounded-card p-4 mr-3" style={{ width: 140, borderWidth: 1, borderColor: '#F94498' }}>
            <Text className="text-pink text-sm">Flight Deals 🔥</Text>
            <Text className="text-white text-xl font-bold">3 alerts</Text>
            <Text className="text-pink text-xs">NEW</Text>
          </TouchableOpacity>
        </ScrollView>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white font-bold text-lg">Your DNA Persona</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore/nomad')}>
            <View className="bg-primary/20 px-3 py-1 rounded-pill flex-row items-center">
              <Text className="text-primary text-sm font-semibold">Nomad Mode 🌍</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/(trip)/dna/results')} className="bg-bg-card rounded-card p-4 mb-4">
          <Text className="text-primary font-bold">Explorer · Foodie · Culture Lover</Text>
          <Text className="text-text-secondary text-sm mt-1">Tap to see your full Travel DNA →</Text>
        </TouchableOpacity>

        <Text className="text-white font-bold text-lg mb-3">Trending Destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {['Dubai 🇦🇪', 'Tokyo 🇯🇵', 'Barcelona 🇪🇸', 'Bali 🇮🇩'].map(dest => (
            <TouchableOpacity key={dest} onPress={() => router.push('/(trip)/plan/destination')} className="bg-bg-card rounded-card p-4 mr-3" style={{ width: 150 }}>
              <Text className="text-white font-semibold">{dest}</Text>
              <Text className="text-primary text-sm mt-1">Explore →</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="text-white font-bold text-lg mb-3">Quick Actions</Text>
        <View className="flex-row flex-wrap mb-8">
          {[
            { label: 'New Trip', icon: '✈️', route: '/(trip)/plan/destination' },
            { label: 'My Trips', icon: '📋', route: '/(tabs)/home/trips' },
            { label: 'Explore', icon: '🌍', route: '/(tabs)/explore' },
            { label: 'Wallet', icon: '💰', route: '/(tabs)/wallet' },
          ].map(action => (
            <TouchableOpacity key={action.label} onPress={() => router.push(action.route as any)} className="bg-bg-card rounded-card p-4 items-center" style={{ width: '48%', marginRight: '2%', marginBottom: 8 }}>
              <Text className="text-2xl mb-1">{action.icon}</Text>
              <Text className="text-white font-semibold">{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
