import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radius, gradients, spacing, typography, letterSpacing } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';
import { GradientButton } from '@/components/ui/GradientButton';
import { PressableScale } from '@/components/ui/PressableScale';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'fingerprint' as const,
    iconColor: '#6443F4',
    title: 'Discover Your\nTravel DNA',
    subtitle: 'We learn what you love — so every trip feels personal',
  },
  {
    id: '2',
    icon: 'auto-awesome' as const,
    iconColor: '#F94498',
    title: 'Plan Smarter\nWith AI',
    subtitle: 'AI-powered itineraries, real-time prices, one-tap booking',
  },
  {
    id: '3',
    icon: 'explore' as const,
    iconColor: '#02A65C',
    title: 'Live Travel\nMode',
    subtitle: 'Real-time guidance, auto check-ins, instant expense tracking',
  },
  {
    id: '4',
    icon: 'stars' as const,
    iconColor: '#FFD700',
    title: 'Earn While\nYou Travel',
    subtitle: 'Cashback on every booking, points that actually matter',
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { loginAsGuest } = useAuthStore();
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
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%' }}>
        <LinearGradient
          colors={['rgba(100,67,244,0.08)', 'transparent']}
          style={{ flex: 1 }}
        />
      </View>

      {/* Mascot — logotype only on auth screens */}
      <View style={{ alignItems: 'center', paddingTop: insets.top + 24 }}>
        <Image
          source={require('@/assets/images/Logotype_for_Dark_Background.webp')}
          style={{ width: 100, height: 30 }}
          resizeMode="contain"
        />
      </View>

      {/* Slides */}
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
          <View style={{ width, flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.screenH }}>
            {/* Icon circle */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderWidth: 1.5,
                borderColor: 'rgba(255,255,255,0.06)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
              }}
            >
              <MaterialIcons name={item.icon} size={36} color={item.iconColor} />
            </View>

            <Text
              style={{
                ...typography.h1,
                textAlign: 'center',
                marginBottom: 16,
                lineHeight: 40,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                ...typography.body,
                textAlign: 'center',
                maxWidth: 280,
              }}
            >
              {item.subtitle}
            </Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32 }}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={{
              width: i === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: i === currentIndex ? colors.pink : 'rgba(255,255,255,0.15)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={{ paddingHorizontal: spacing.screenH, paddingBottom: insets.bottom + 16 }}>
        {/* Primary CTA — Gradient */}
        <GradientButton
          title="Get Started"
          onPress={() => router.push('/(auth)/register')}
          style={{ marginBottom: 12 }}
        />

        {/* Secondary — Outline */}
        <PressableScale
          onPress={() => router.push('/(auth)/login')}
          style={{
            borderWidth: 1.5,
            borderColor: colors.primary,
            borderRadius: radius.button,
            paddingVertical: 14,
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSizes.cta,
              letterSpacing: letterSpacing.cta,
              color: colors.primary,
            }}
          >
            I already have an account
          </Text>
        </PressableScale>

        {/* Ghost — Continue as Guest */}
        <PressableScale
          onPress={() => {
            loginAsGuest();
            router.replace('/(tabs)/home');
          }}
          style={{
            paddingVertical: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: fontSizes.bodySm,
              color: colors.text.tertiary,
            }}
          >
            Continue as Guest
          </Text>
        </PressableScale>
      </View>
    </View>
  );
}
