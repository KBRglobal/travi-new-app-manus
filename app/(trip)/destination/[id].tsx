import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { destinations, activities } from '../../../lib/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

export default function DestinationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const destination = destinations.find((d) => d.id === id) || destinations[0];
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scrollY.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.4], Extrapolation.CLAMP) }],
    opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT * 0.8], [1, 0.3], Extrapolation.CLAMP),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scrollY.value, [0, HEADER_HEIGHT], [0, -40], Extrapolation.CLAMP) }],
    opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT * 0.5], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <View className="flex-1 bg-bg-primary">
      {/* Back button */}
      <TouchableOpacity className="absolute top-14 left-6 z-10 bg-bg-overlay w-10 h-10 rounded-full items-center justify-center" onPress={() => router.back()}>
        <Text className="text-white text-lg">‹</Text>
      </TouchableOpacity>

      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16} contentContainerClassName="pb-24">
        {/* Parallax Hero */}
        <Animated.View style={[headerStyle, { height: HEADER_HEIGHT }]}>
          <Image source={{ uri: destination.image }} className="w-full h-full" resizeMode="cover" />
          <Animated.View style={titleStyle} className="absolute bottom-0 left-0 right-0 p-6 bg-bg-overlay">
            <Text className="text-white text-heading-1">{destination.name}</Text>
            <Text className="text-text-secondary text-body">{destination.country}</Text>
          </Animated.View>
        </Animated.View>

        {/* Match Score */}
        <View className="px-6 py-4">
          <View className="bg-bg-card border border-border rounded-card p-4 flex-row items-center justify-between">
            <View>
              <Text className="text-white text-heading-3">DNA Match</Text>
              <Text className="text-text-secondary text-body-sm">Based on your travel profile</Text>
            </View>
            <View className="bg-primary w-16 h-16 rounded-full items-center justify-center">
              <Text className="text-white text-heading-3 font-bold">{Math.round(destination.matchScore * 100)}%</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row px-6 mb-4">
          {[{ emoji: '💰', label: 'Budget', value: destination.priceIndex < 0.4 ? 'Low' : destination.priceIndex < 0.7 ? 'Medium' : 'High' },
            { emoji: '🌡️', label: 'Weather', value: '28°C' },
            { emoji: '✈️', label: 'Flight', value: '5h 30m' }
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-bg-card border border-border rounded-card p-3 mr-2 items-center">
              <Text className="text-xl mb-1">{stat.emoji}</Text>
              <Text className="text-text-muted text-caption">{stat.label}</Text>
              <Text className="text-white text-body-sm font-semibold">{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap px-6 mb-4">
          {destination.tags.map((tag) => (
            <View key={tag} className="bg-primary/20 px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-primary text-body-sm">{tag}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View className="px-6 mb-6">
          <TouchableOpacity className="bg-primary py-4 rounded-button items-center mb-3" onPress={() => router.push('/(trip)/dates')}>
            <Text className="text-white text-body font-bold">Plan a Trip Here</Text>
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-bg-card border border-border py-3 rounded-button items-center" onPress={() => router.push('/(trip)/flights')}>
              <Text className="text-white text-body-sm">✈️ Flights</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-bg-card border border-border py-3 rounded-button items-center" onPress={() => router.push('/(trip)/hotels')}>
              <Text className="text-white text-body-sm">🏨 Hotels</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-bg-card border border-border py-3 rounded-button items-center" onPress={() => router.push('/(trip)/hotel-compare')}>
              <Text className="text-white text-body-sm">📊 Compare</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activities */}
        <View className="px-6">
          <Text className="text-white text-heading-3 mb-3">Top Activities</Text>
          {activities.slice(0, 4).map((act) => (
            <TouchableOpacity key={act.id} className="flex-row bg-bg-card border border-border rounded-card p-3 mb-2" onPress={() => router.push(`/(trip)/activity/${act.id}`)}>
              <Image source={{ uri: act.image }} className="w-20 h-20 rounded-lg mr-3" />
              <View className="flex-1 justify-center">
                <Text className="text-white text-body font-semibold">{act.name}</Text>
                <Text className="text-text-secondary text-body-sm">{act.category} · {act.duration}</Text>
                <Text className="text-primary text-body-sm font-semibold mt-1">€{act.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
