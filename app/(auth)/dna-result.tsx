import { haptic } from '@/lib/haptics';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import { currentUser } from '../../lib/mockData';

const dimensions = [
  { key: 'adventure', label: 'Adventure & Sports', emoji: '🏔️', value: currentUser.dna.adventure },
  { key: 'culture', label: 'Culture & History', emoji: '🏛️', value: currentUser.dna.culture },
  { key: 'food', label: 'Food & Gastronomy', emoji: '🍜', value: currentUser.dna.food },
  { key: 'nature', label: 'Nature & Wildlife', emoji: '🌿', value: currentUser.dna.nature },
  { key: 'social', label: 'Social & Nightlife', emoji: '🎉', value: currentUser.dna.social },
  { key: 'wellness', label: 'Wellness & Relaxation', emoji: '🧘', value: currentUser.dna.wellness },
  { key: 'luxury', label: 'Luxury & Comfort', emoji: '✨', value: currentUser.dna.luxury },
  { key: 'budget', label: 'Budget Conscious', emoji: '💰', value: currentUser.dna.budget },
];

function DNABar({ dimension, index }: { dimension: typeof dimensions[0]; index: number }) {
  const barWidth = useSharedValue(0);

  useEffect(() => {
    barWidth.value = withDelay(index * 100, withSpring(dimension.value * 100, { damping: 15 }));
  }, []);

  const barStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }));

  return (
    <View className="mb-4">
      <View className="flex-row justify-between mb-1">
        <Text className="text-white text-body-sm">{dimension.emoji} {dimension.label}</Text>
        <Text className="text-text-secondary text-body-sm">{Math.round(dimension.value * 100)}%</Text>
      </View>
      <View className="h-3 bg-bg-surface rounded-full overflow-hidden">
        <Animated.View style={barStyle} className="h-full bg-primary rounded-full" />
      </View>
    </View>
  );
}

export default function DNAResultScreen() {
  const router = useRouter();
  const { setHasCompletedDNA } = useAuthStore();
  const titleOpacity = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  const titleStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value }));

  const topDimensions = [...dimensions].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <ScrollView className="flex-1 bg-bg-primary px-6" contentContainerClassName="pt-safe pb-8">
      <Animated.View style={titleStyle} className="items-center mb-8">
        <Text className="text-6xl mb-4">🧬</Text>
        <Text className="text-white text-heading-1 text-center mb-2">Your Travel DNA</Text>
        <Text className="text-text-secondary text-body text-center">
          You're a {topDimensions.map((d) => d.label.split(' ')[0]).join(' + ')} traveler
        </Text>
      </Animated.View>

      {dimensions.map((dim, i) => (
        <DNABar key={dim.key} dimension={dim} index={i} />
      ))}

      <View className="bg-bg-card rounded-card p-4 mt-6 mb-6">
        <Text className="text-white text-heading-3 mb-2">What this means</Text>
        <Text className="text-text-secondary text-body">
          We'll use your DNA profile to recommend destinations, activities, and experiences that match your personality. The more you travel with TRAVI, the smarter your recommendations get.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-primary py-4 rounded-button items-center"
        onPress={() => {
          setHasCompletedDNA(true);
          router.replace('/(tabs)/home');
        }}
      >
        <Text className="text-white text-body font-bold">Start Exploring</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
