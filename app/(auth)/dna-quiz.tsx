import { haptic } from '@/lib/haptics';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { dnaCards } from '../../lib/mockData';
import { logSwipeLike, logSwipeReject } from '../../lib/dnaSignals';
import { useDnaStore } from '../../stores/dnaStore';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { CachedImage } from '../../components/ui/CachedImage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

function SwipeCard({ card, onSwipeLeft, onSwipeRight, isTop }: any) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const swipeStartTime = useRef(Date.now());

  const gesture = Gesture.Pan()
    .onStart(() => {
      swipeStartTime.current = Date.now();
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.5;
      rotation.value = (event.translationX / SCREEN_WIDTH) * 15;
    })
    .onEnd((event) => {
      const hesitationMs = Date.now() - swipeStartTime.current;
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 });
        runOnJS(onSwipeRight)(card, hesitationMs);
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 });
        runOnJS(onSwipeLeft)(card);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? Math.min(translateX.value / SWIPE_THRESHOLD, 1) : 0,
  }));

  const nopeOpacity = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? Math.min(-translateX.value / SWIPE_THRESHOLD, 1) : 0,
  }));

  if (!isTop) {
    return (
      <View className="absolute w-full h-full rounded-card bg-bg-card overflow-hidden" style={{ transform: [{ scale: 0.95 }] }}>
        <CachedImage source={{ uri: card.image }} className="w-full h-full" resizeMode="cover" />
      </View>
    );
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={cardStyle} className="absolute w-full h-full rounded-card bg-bg-card overflow-hidden shadow-card">
        <CachedImage source={{ uri: card.image }} className="w-full h-full" resizeMode="cover" />
        <View className="absolute bottom-0 left-0 right-0 p-6 bg-bg-overlay">
          <Text className="text-white text-heading-2 mb-1">{card.title}</Text>
          <Text className="text-text-secondary text-body">{card.category}</Text>
        </View>
        <Animated.View style={likeOpacity} className="absolute top-8 left-8 border-4 border-status-success rounded-lg px-4 py-2 rotate-[-15deg]">
          <Text className="text-status-success text-heading-3 font-bold">LOVE</Text>
        </Animated.View>
        <Animated.View style={nopeOpacity} className="absolute top-8 right-8 border-4 border-status-error rounded-lg px-4 py-2 rotate-[15deg]">
          <Text className="text-status-error text-heading-3 font-bold">NOPE</Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

export default function DNAQuizScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setQuizCompleted } = useDnaStore();

  const handleSwipeRight = (card: any, hesitationMs: number) => {
    logSwipeLike(card.id, 'activity', hesitationMs);
    setTimeout(() => {
      if (currentIndex >= dnaCards.length - 1) {
        setQuizCompleted(true);
        router.replace('/(auth)/dna-result');
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 350);
  };

  const handleSwipeLeft = (card: any) => {
    logSwipeReject(card.id, 'activity');
    setTimeout(() => {
      if (currentIndex >= dnaCards.length - 1) {
        setQuizCompleted(true);
        router.replace('/(auth)/dna-result');
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 350);
  };

  const remaining = dnaCards.length - currentIndex;

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="px-6 pt-safe pb-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white text-xl">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-text-secondary text-body-sm">{currentIndex + 1} / {dnaCards.length}</Text>
        <TouchableOpacity onPress={() => { setQuizCompleted(true); router.replace('/(auth)/dna-result'); }}>
          <Text className="text-text-muted text-body-sm">Skip</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white text-heading-3 text-center mb-4">Swipe right if you love it</Text>

      {/* Progress bar */}
      <View className="mx-6 h-1 bg-bg-surface rounded-full mb-6">
        <View className="h-full bg-primary rounded-full" style={{ width: `${((currentIndex + 1) / dnaCards.length) * 100}%` }} />
      </View>

      {/* Card stack */}
      <View className="flex-1 mx-6 mb-6">
        {remaining > 1 && <SwipeCard card={dnaCards[currentIndex + 1]} isTop={false} onSwipeLeft={() => {}} onSwipeRight={() => {}} />}
        {remaining > 0 && <SwipeCard card={dnaCards[currentIndex]} isTop={true} onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />}
      </View>
    </View>
  );
}
