import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, RefreshControl, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { destinations, activities, currentUser } from '../../lib/mockData';

function DestinationCard({ item, index }: { item: typeof destinations[0]; index: number }) {
  const router = useRouter();
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <TouchableOpacity
        className="mr-4 w-44"
        onPress={() => router.push(`/(trip)/destination/${item.id}`)}
      >
        <Image source={{ uri: item.image }} className="w-44 h-56 rounded-card" resizeMode="cover" />
        <View className="absolute bottom-0 left-0 right-0 p-3 bg-bg-overlay rounded-b-card">
          <Text className="text-white text-body font-semibold">{item.name}</Text>
          <Text className="text-text-secondary text-body-sm">{item.country}</Text>
          <View className="flex-row items-center mt-1">
            <View className="bg-primary px-2 py-0.5 rounded-full">
              <Text className="text-white text-caption font-bold">{Math.round(item.matchScore * 100)}% match</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function QuickAction({ emoji, label, onPress }: { emoji: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity className="items-center mr-6" onPress={onPress}>
      <View className="w-14 h-14 bg-bg-card rounded-full items-center justify-center mb-1 border border-border">
        <Text className="text-2xl">{emoji}</Text>
      </View>
      <Text className="text-text-secondary text-caption">{label}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setRefreshing(false);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <ScrollView
      className="flex-1 bg-bg-primary"
      contentContainerClassName="pt-safe pb-24"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6443F4" />}
    >
      {/* Header */}
      <View className="px-6 mb-6">
        <Text className="text-text-secondary text-body">{greeting},</Text>
        <Text className="text-white text-heading-1">{currentUser.firstName} 👋</Text>
      </View>

      {/* AI Trip Suggestion */}
      <TouchableOpacity
        className="mx-6 bg-bg-card border border-border rounded-card p-4 mb-6"
        onPress={() => router.push('/(trip)/ai-itinerary')}
      >
        <View className="flex-row items-center mb-2">
          <Text className="text-lg mr-2">🤖</Text>
          <Text className="text-primary text-body-sm font-semibold">AI Suggestion</Text>
        </View>
        <Text className="text-white text-body font-semibold mb-1">Weekend in Barcelona?</Text>
        <Text className="text-text-secondary text-body-sm">Based on your DNA: 89% match. Flights from €120.</Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View className="px-6 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <QuickAction emoji="✈️" label="Flights" onPress={() => router.push('/(trip)/flights')} />
          <QuickAction emoji="🏨" label="Hotels" onPress={() => router.push('/(trip)/hotels')} />
          <QuickAction emoji="🎯" label="Activities" onPress={() => router.push('/(trip)/activities')} />
          <QuickAction emoji="💰" label="Deals" onPress={() => router.push('/(trip)/flight-alerts')} />
          <QuickAction emoji="🌡️" label="Currency" onPress={() => router.push('/(trip)/currency')} />
        </ScrollView>
      </View>

      {/* Trending Destinations */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center px-6 mb-3">
          <Text className="text-white text-heading-3">For You</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
            <Text className="text-primary text-body-sm">See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={destinations.slice(0, 5)}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-6"
          renderItem={({ item, index }) => <DestinationCard item={item} index={index} />}
        />
      </View>

      {/* Upcoming Trip */}
      <TouchableOpacity
        className="mx-6 bg-bg-card border border-border rounded-card p-4 mb-6"
        onPress={() => router.push('/(trip)/pre-trip')}
      >
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-white text-heading-3">Upcoming Trip</Text>
          <View className="bg-status-success/20 px-2 py-1 rounded-full">
            <Text className="text-status-success text-caption font-semibold">In 12 days</Text>
          </View>
        </View>
        <Text className="text-text-secondary text-body">Dubai · May 15-22 · 2 travelers</Text>
        <View className="mt-3 h-1 bg-bg-surface rounded-full">
          <View className="h-full bg-primary rounded-full w-3/4" />
        </View>
        <Text className="text-text-muted text-caption mt-1">75% prepared</Text>
      </TouchableOpacity>

      {/* Popular Activities */}
      <View className="px-6 mb-6">
        <Text className="text-white text-heading-3 mb-3">Popular Activities</Text>
        {activities.slice(0, 3).map((act, i) => (
          <TouchableOpacity
            key={act.id}
            className="flex-row bg-bg-card border border-border rounded-card p-3 mb-2"
            onPress={() => router.push(`/(trip)/activity/${act.id}`)}
          >
            <Image source={{ uri: act.image }} className="w-16 h-16 rounded-lg mr-3" />
            <View className="flex-1 justify-center">
              <Text className="text-white text-body font-semibold">{act.name}</Text>
              <Text className="text-text-secondary text-body-sm">{act.duration} · €{act.price}</Text>
            </View>
            <View className="justify-center">
              <Text className="text-primary text-body-sm font-semibold">⭐ {act.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
