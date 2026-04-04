import { useLoadingState } from '@/hooks/useLoadingState';
import { useRefresh } from '@/hooks/useRefresh';
import { haptic } from '@/lib/haptics';
import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const slides = [
  { id: '1', emoji: '🌍', title: 'Discover Your Travel DNA', subtitle: 'We learn what you love — so every trip feels personal' },
  { id: '2', emoji: '✈️', title: 'Plan Smarter', subtitle: 'AI-powered itineraries, real-time prices, one-tap booking' },
  { id: '3', emoji: '🗺️', title: 'Live Travel Mode', subtitle: 'Real-time guidance, auto check-ins, instant expense tracking' },
  { id: '4', emoji: '💰', title: 'Earn While You Travel', subtitle: 'Cashback on every booking, points that actually matter' },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  return (
    <View className="flex-1 bg-bg-primary">
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ width }} className="flex-1 items-center justify-center px-8">
            <Text className="text-8xl mb-8">{item.emoji}</Text>
            <Text className="text-white text-heading-2 text-center mb-4">{item.title}</Text>
            <Text className="text-text-secondary text-body text-center">{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View className="flex-row justify-center mb-8">
        {slides.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${i === currentIndex ? 'bg-primary w-6' : 'bg-text-muted'}`}
          />
        ))}
      </View>

      {/* Buttons */}
      <View className="px-6 pb-safe mb-4">
        <TouchableOpacity
          className="bg-primary py-4 rounded-button items-center mb-3"
          onPress={() => router.push('/(auth)/register')}
        >
          <Text className="text-white text-body font-bold">Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-4 rounded-button items-center"
          onPress={() => router.push('/(auth)/login')}
        >
          <Text className="text-primary text-body font-semibold">I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
