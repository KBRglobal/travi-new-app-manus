import React, { useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { PressableScale } from '@/components/ui/PressableScale';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const DESTINATIONS = Array.from({ length: 30 }, (_, i) => {
  const places = ['Santorini', 'Tokyo', 'Bali', 'Paris', 'Dubai', 'Maldives', 'New York', 'Barcelona', 'Iceland', 'Marrakech',
    'Rome', 'Sydney', 'Kyoto', 'Cape Town', 'Amsterdam', 'Lisbon', 'Prague', 'Vienna', 'Budapest', 'Dubrovnik',
    'Petra', 'Machu Picchu', 'Havana', 'Rio', 'Singapore', 'Hong Kong', 'Seoul', 'Bangkok', 'Zanzibar', 'Fiji'];
  const countries = ['Greece', 'Japan', 'Indonesia', 'France', 'UAE', 'Maldives', 'USA', 'Spain', 'Iceland', 'Morocco',
    'Italy', 'Australia', 'Japan', 'South Africa', 'Netherlands', 'Portugal', 'Czech Republic', 'Austria', 'Hungary', 'Croatia',
    'Jordan', 'Peru', 'Cuba', 'Brazil', 'Singapore', 'China', 'South Korea', 'Thailand', 'Tanzania', 'Fiji'];
  return { id: i + 1, name: places[i], country: countries[i] };
});

export default function DNASwipeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAction = (action: 'like' | 'reject') => {
    if (currentIndex >= DESTINATIONS.length - 1) {
      router.push('/(auth)/quick-dna/schedule');
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const current = DESTINATIONS[currentIndex];
  const progress = (currentIndex + 1) / DESTINATIONS.length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%' }}>
        <LinearGradient colors={['rgba(249,68,152,0.08)', 'rgba(100,67,244,0.04)', 'transparent']} style={{ flex: 1 }} />
      </View>

      {/* Header with progress */}
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: spacing.screenH, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <PressableScale onPress={() => router.back()} style={{ marginRight: 12 }}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border.default }}>
            <MaterialIcons name="arrow-back" size={18} color={colors.text.secondary} />
          </View>
        </PressableScale>
        <View style={{ flex: 1, height: 4, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
          <LinearGradient
            colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: '100%', width: `${progress * 100}%`, borderRadius: 2 }}
          />
        </View>
        <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.caption, color: colors.text.tertiary, marginLeft: 12 }}>
          {currentIndex + 1}/{DESTINATIONS.length}
        </Text>
      </View>

      {/* Card */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.screenH }}>
        <View style={{
          width: '100%',
          maxWidth: 340,
          aspectRatio: 3 / 4,
          borderRadius: radius.card,
          overflow: 'hidden',
          ...shadows.card,
        }}>
          <LinearGradient
            colors={['rgba(100,67,244,0.15)', 'rgba(249,68,152,0.08)', colors.bg.card]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border.default, alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            {/* Destination icon */}
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}>
              <MaterialIcons name="place" size={36} color={colors.primary} />
            </View>

            <Text style={{ fontFamily: fonts.heading, fontSize: 32, color: colors.text.primary, textAlign: 'center', marginBottom: 8 }}>
              {current?.name}
            </Text>
            <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.body, color: colors.text.tertiary, textAlign: 'center' }}>
              {current?.country}
            </Text>

            {/* Swipe hint */}
            <View style={{ position: 'absolute', bottom: 24, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MaterialIcons name="swipe" size={16} color={colors.text.tertiary} />
              <Text style={{ ...typography.caption, color: colors.text.tertiary }}>Swipe or tap below</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Action buttons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 32, paddingBottom: insets.bottom + 24, paddingTop: 16 }}>
        {/* Reject */}
        <PressableScale onPress={() => handleAction('reject')}>
          <View style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderWidth: 1,
            borderColor: 'rgba(248,113,113,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MaterialIcons name="close" size={28} color={colors.error} />
          </View>
        </PressableScale>

        {/* Like */}
        <PressableScale onPress={() => handleAction('like')}>
          <LinearGradient
            colors={[...gradients.secondaryCTA] as [string, string, ...string[]]}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              alignItems: 'center',
              justifyContent: 'center',
              ...shadows.cta,
            }}
          >
            <MaterialIcons name="favorite" size={32} color="#FFFFFF" />
          </LinearGradient>
        </PressableScale>
      </View>
    </View>
  );
}
