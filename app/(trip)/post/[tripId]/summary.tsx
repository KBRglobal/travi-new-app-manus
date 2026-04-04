import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TripSummary() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Trip Summary</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-bg-card rounded-card p-6 mb-4 items-center">
          <Text className="text-white text-2xl font-bold mb-1">Dubai Adventure</Text>
          <Text className="text-primary text-lg">April 10 - 17, 2026</Text>
          <Text className="text-yellow-400 text-lg mt-2">⭐⭐⭐⭐⭐</Text>
        </View>

        <View className="flex-row justify-around bg-bg-card rounded-card p-4 mb-4">
          {[['7', 'Days'], ['18', 'Activities'], ['€1,247', 'Spent'], ['142', 'Photos']].map(([num, label]) => (
            <View key={label} className="items-center">
              <Text className="text-white font-bold text-lg">{num}</Text>
              <Text className="text-text-muted text-sm">{label}</Text>
            </View>
          ))}
        </View>

        <View className="bg-bg-card rounded-card items-center justify-center mb-4" style={{ height: 150 }}>
          <Text className="text-text-muted">[ Countries Map ]</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/(trip)/profile/adventure-log')} className="bg-primary/10 rounded-card p-4 mb-4" style={{ borderWidth: 1, borderColor: '#6443F4' }}>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white font-bold">🌍 Your Journey So Far</Text>
              <Text className="text-text-secondary mt-1">23 countries total · +1 new this trip</Text>
            </View>
            <Text className="text-primary font-semibold">Adventure Log →</Text>
          </View>
        </TouchableOpacity>

        <Text className="text-white font-bold text-lg mb-3">Highlights</Text>
        <View className="bg-bg-card rounded-card p-4 mb-4">
          <Text className="text-white mb-2">Best moment: Desert Safari sunset</Text>
          <Text className="text-white mb-2">Most visited: Dubai Mall (3 times)</Text>
          <Text className="text-white">Favorite food: Shawarma at Old Souk</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/(trip)/post/[tripId]/share' as any)} className="bg-primary rounded-button py-4 items-center mb-8">
          <Text className="text-white font-bold text-lg">Share Trip Story →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
