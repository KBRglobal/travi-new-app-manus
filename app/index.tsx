import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../stores/authStore';
import { colors, fonts, fontSizes, gradients, typography } from '../constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, hasCompletedDNA } = useAuthStore();

  const glowOpacity = useSharedValue(0);
  const mascotScale = useSharedValue(0.3);
  const mascotOpacity = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoY = useSharedValue(20);
  const taglineOpacity = useSharedValue(0);
  const lineWidth = useSharedValue(0);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: mascotScale.value }],
    opacity: mascotOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const lineStyle = useAnimatedStyle(() => ({
    width: lineWidth.value,
  }));

  const navigate = () => {
    if (isAuthenticated && hasCompletedDNA) {
      router.replace('/(tabs)/home');
    } else if (isAuthenticated) {
      router.replace('/(auth)/dna-welcome');
    } else {
      router.replace('/(auth)/welcome');
    }
  };

  useEffect(() => {
    // Glow
    glowOpacity.value = withTiming(1, { duration: 400 });

    // Mascot
    mascotScale.value = withDelay(200, withSpring(1, { damping: 12, stiffness: 100 }));
    mascotOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));

    // Logo
    logoOpacity.value = withDelay(600, withTiming(1, { duration: 300 }));
    logoY.value = withDelay(600, withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) }));

    // Tagline
    taglineOpacity.value = withDelay(900, withTiming(1, { duration: 250 }));

    // Bottom line
    lineWidth.value = withDelay(1000, withTiming(60, { duration: 400 }));

    const timer = setTimeout(() => navigate(), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Radial glow */}
      <Animated.View
        style={[
          glowStyle,
          {
            position: 'absolute',
            top: '20%',
            left: '5%',
            width: '90%',
            height: '35%',
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(100,67,244,0.12)', 'rgba(249,68,152,0.06)', 'transparent']}
          style={{ width: '100%', height: '100%', borderRadius: 200 }}
        />
      </Animated.View>

      {/* Center content */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* Mascot */}
        <Animated.View style={[mascotStyle, { marginBottom: 24 }]}>
          <Image
            source={require('../assets/images/Mascot_for_Dark_Background.png')}
            style={{ width: 140, height: 140 }}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Logotype */}
        <Animated.View style={logoStyle}>
          <Image
            source={require('../assets/images/Logotype_for_Dark_Background.webp')}
            style={{ width: 160, height: 48 }}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={[taglineStyle, { marginTop: 16 }]}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSizes.label,
              color: colors.text.tertiary,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Your AI Travel Companion
          </Text>
        </Animated.View>
      </View>

      {/* Bottom gradient line */}
      <View style={{ paddingBottom: insets.bottom + 20, alignItems: 'center' }}>
        <Animated.View style={[lineStyle, { height: 3, overflow: 'hidden', borderRadius: 2 }]}>
          <LinearGradient
            colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 60, height: 3, borderRadius: 2 }}
          />
        </Animated.View>
      </View>
    </View>
  );
}
