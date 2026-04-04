import { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { useTripStore } from '@/stores/tripStore';
import { useDnaStore } from '@/stores/dnaStore';
import * as Haptics from 'expo-haptics';

const SURPRISE_DESTINATIONS = [
  { id: 'dubai', name: 'DUBAI', country: 'UAE', match: 94, price: 340, tagline: 'Perfect for Explorers who love Culture & Adventure', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800' },
  { id: 'tokyo', name: 'TOKYO', country: 'JAPAN', match: 91, price: 520, tagline: 'Perfect for Foodies who love Technology & Tradition', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800' },
  { id: 'barcelona', name: 'BARCELONA', country: 'SPAIN', match: 87, price: 280, tagline: 'Perfect for Creatives who love Architecture & Nightlife', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800' },
  { id: 'bali', name: 'BALI', country: 'INDONESIA', match: 85, price: 410, tagline: 'Perfect for Wellness seekers who love Nature & Spirituality', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800' },
  { id: 'iceland', name: 'REYKJAVIK', country: 'ICELAND', match: 82, price: 480, tagline: 'Perfect for Adventurers who love Nature & Photography', imageUrl: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800' },
];

type Phase = 'intro' | 'generating' | 'reveal';

export default function SurpriseScreen() {
  const router = useRouter();
  const setDestination = useTripStore((s) => s.setDestination);
  const [phase, setPhase] = useState<Phase>('intro');
  const [destination, setDest] = useState(SURPRISE_DESTINATIONS[0]);
  const [revealedChars, setRevealedChars] = useState(0);
  const [countUp, setCountUp] = useState(0);

  // Animations
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const blurAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Bounce animation for intro icon
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -15, duration: 600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 600, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleGenerate = () => {
    // Pick random destination
    const idx = Math.floor(Math.random() * SURPRISE_DESTINATIONS.length);
    setDest(SURPRISE_DESTINATIONS[idx]);
    setPhase('generating');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Progress bar animation
    Animated.timing(progressAnim, { toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: false }).start();

    // After 1.5s, reveal
    setTimeout(() => {
      setPhase('reveal');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Scale spring
      Animated.spring(scaleAnim, { toValue: 1, damping: 12, stiffness: 80, useNativeDriver: true }).start();

      // Blur fade (simulated with opacity)
      Animated.timing(blurAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start();

      // Fade in content
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay: 400, useNativeDriver: true }).start();
    }, 1800);
  };

  // Character reveal effect
  useEffect(() => {
    if (phase !== 'reveal') return;
    const name = destination.name;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setRevealedChars(i);
      if (i >= name.length) clearInterval(interval);
    }, 600 / name.length);
    return () => clearInterval(interval);
  }, [phase, destination.name]);

  // Count up effect
  useEffect(() => {
    if (phase !== 'reveal') return;
    const target = destination.match;
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= target) { current = target; clearInterval(interval); }
      setCountUp(current);
    }, 20);
    return () => clearInterval(interval);
  }, [phase, destination.match]);

  const handleTryAnother = () => {
    setPhase('intro');
    setRevealedChars(0);
    setCountUp(0);
    progressAnim.setValue(0);
    scaleAnim.setValue(0.8);
    blurAnim.setValue(1);
    fadeAnim.setValue(0);
  };

  const handleLetsGo = () => {
    setDestination({
      id: destination.id,
      name: destination.name,
      country: destination.country,
      imageUrl: destination.imageUrl,
      matchScore: destination.match,
    });
    router.push('/(trip)/plan/dates');
  };

  const revealedText = destination.name.slice(0, revealedChars);
  const hiddenText = '?'.repeat(Math.max(0, destination.name.length - revealedChars));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 }}>
        <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
        {/* Phase 1: Intro */}
        {phase === 'intro' && (
          <View style={{ alignItems: 'center' }}>
            <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
              <MaterialIcons name="casino" size={80} color={colors.primary} />
            </Animated.View>
            <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.display, color: colors.text.primary, marginTop: 24, textAlign: 'center' }}>Surprise Me!</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.secondary, marginTop: 12, textAlign: 'center', lineHeight: 24 }}>Let your Travel DNA pick the perfect destination</Text>
            <Pressable
              onPress={handleGenerate}
              style={{ marginTop: 40, height: 56, paddingHorizontal: 40, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, ...shadows.glow }}
            >
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodyLg, color: '#FFF' }}>Generate My Surprise →</Text>
            </Pressable>
          </View>
        )}

        {/* Phase 2: Generating */}
        {phase === 'generating' && (
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 160, height: 160, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="fingerprint" size={80} color={colors.primary} />
            </View>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.secondary, marginTop: 24 }}>Analyzing your DNA...</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.muted, marginTop: 8 }}>Finding your perfect match...</Text>
            <View style={{ width: 200, height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 24 }}>
              <Animated.View style={{ height: 4, borderRadius: 2, backgroundColor: colors.primary, width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }} />
            </View>
          </View>
        )}

        {/* Phase 3: Reveal */}
        {phase === 'reveal' && (
          <Animated.View style={{ alignItems: 'center', transform: [{ scale: scaleAnim }], width: '100%' }}>
            {/* Destination Image */}
            <View style={{ width: '100%', height: 220, borderRadius: radius.card, overflow: 'hidden', marginBottom: 24 }}>
              <Animated.Image
                source={{ uri: destination.imageUrl }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              {/* Blur overlay that fades out */}
              <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.bg.primary, opacity: blurAnim }} />
            </View>

            {/* Destination Name */}
            <Text style={{ fontFamily: fonts.heading, fontSize: 40, color: colors.text.primary, letterSpacing: 4 }}>
              {revealedText}<Text style={{ color: colors.text.muted }}>{hiddenText}</Text>
            </Text>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.secondary, marginTop: 4 }}>{destination.country}</Text>

            {/* Match Score */}
            <Animated.View style={{ opacity: fadeAnim, marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'rgba(249,68,152,0.15)', borderRadius: radius.pill }}>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.bodyLg, color: colors.pink }}>✦ {countUp}% DNA Match</Text>
            </Animated.View>

            {/* Tagline */}
            <Animated.Text style={{ opacity: fadeAnim, fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary, marginTop: 12, textAlign: 'center' }}>{destination.tagline}</Animated.Text>

            {/* Price */}
            <Animated.Text style={{ opacity: fadeAnim, fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.muted, marginTop: 8 }}>from €{destination.price} return</Animated.Text>

            {/* Buttons */}
            <Animated.View style={{ opacity: fadeAnim, flexDirection: 'row', gap: 12, marginTop: 32, width: '100%' }}>
              <Pressable
                onPress={handleTryAnother}
                style={{ flex: 1, height: 52, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border.strong }}
              >
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>Try Another</Text>
              </Pressable>
              <Pressable
                onPress={handleLetsGo}
                style={{ flex: 1, height: 52, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, ...shadows.glow }}
              >
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#FFF' }}>Yes, Let's Go!</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
