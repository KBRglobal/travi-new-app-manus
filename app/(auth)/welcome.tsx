import { haptic } from '@/lib/haptics';
import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
    <View className="flex-1" style={{ backgroundColor: colors.bg.primary }}>
      {/* Mascot at top */}
      <View className="items-center pt-safe mt-8">
        <Image
          source={require('@/assets/Mascot_for_Dark_Background.png')}
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        />
      </View>

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
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1 items-center justify-center px-8">
            <Text style={{ fontSize: 72, marginBottom: 32 }}>{item.emoji}</Text>
            <Text
              style={{
                fontFamily: fonts.heading,
                fontSize: fontSizes.h1,
                color: colors.text.primary,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: fonts.body,
                fontSize: fontSizes.body,
                color: colors.text.secondary,
                textAlign: 'center',
              }}
            >
              {item.subtitle}
            </Text>
          </View>
        )}
      />

      {/* Dots */}
      <View className="flex-row justify-center mb-8">
        {slides.map((_, i) => (
          <View
            key={i}
            style={{
              width: i === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: i === currentIndex ? colors.primary : colors.text.muted,
            }}
          />
        ))}
      </View>

      {/* Buttons */}
      <View className="px-6 pb-safe mb-4">
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 16,
            borderRadius: radius.button,
            alignItems: 'center',
            marginBottom: 12,
            ...shadows.fab,
          }}
          onPress={() => {
            haptic.light();
            router.push('/(auth)/register');
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSizes.body,
              color: '#FFFFFF',
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 16,
            borderRadius: radius.button,
            alignItems: 'center',
          }}
          onPress={() => {
            haptic.light();
            router.push('/(auth)/login');
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSizes.body,
              color: colors.primary,
            }}
          >
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
