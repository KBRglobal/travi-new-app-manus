import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { destinations, activities } from '../../../lib/mockData';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { PressableScale } from '@/components/ui/PressableScale';
import { IconButton } from '@/components/ui/IconButton';
import { CachedImage } from '../../../components/ui/CachedImage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 340;

export default function DestinationDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const destination = destinations.find((d) => d.id === id) || destinations[0];
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scrollY.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.4], Extrapolation.CLAMP) }],
    opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT * 0.8], [1, 0.3], Extrapolation.CLAMP),
  }));

  const matchScore = Math.round(destination.matchScore * 100);
  const budget = destination.priceIndex < 0.4 ? 'Budget' : destination.priceIndex < 0.7 ? 'Mid-range' : 'Premium';

  const stats = [
    { icon: 'attach-money' as const, label: 'Budget', value: budget },
    { icon: 'thermostat' as const, label: 'Weather', value: '28°C' },
    { icon: 'flight' as const, label: 'Flight', value: '5h 30m' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Floating header buttons */}
      <View style={{ position: 'absolute', top: insets.top + 8, left: spacing.screenH, right: spacing.screenH, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <IconButton name="arrow-back" onPress={() => router.back()} />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconButton name="favorite-border" onPress={() => {}} />
          <IconButton name="share" onPress={() => {}} />
        </View>
      </View>

      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Parallax Hero */}
        <Animated.View style={[headerStyle, { height: HEADER_HEIGHT }]}>
          <CachedImage source={{ uri: destination.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          <LinearGradient
            colors={[...gradients.imageOverlay] as [string, string, ...string[]]}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%' }}
          />
          <View style={{ position: 'absolute', bottom: 24, left: spacing.screenH, right: spacing.screenH }}>
            <Text style={{ ...typography.display, marginBottom: 4 }}>{destination.name}</Text>
            <Text style={{ ...typography.bodyLg, color: colors.text.secondary }}>{destination.country}</Text>
          </View>
        </Animated.View>

        {/* DNA Match Score */}
        <View style={{ paddingHorizontal: spacing.screenH, marginTop: 20, marginBottom: 20 }}>
          <GlassCard tint="discovery">
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <MaterialIcons name="fingerprint" size={18} color={colors.primary} style={{ marginRight: 6 }} />
                  <Text style={{ ...typography.label, color: colors.text.tertiary }}>DNA MATCH</Text>
                </View>
                <Text style={{ ...typography.bodySm, color: colors.text.secondary }}>
                  Based on your travel profile
                </Text>
              </View>
              <LinearGradient
                colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
                style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: '#FFFFFF' }}>{matchScore}%</Text>
              </LinearGradient>
            </View>
          </GlassCard>
        </View>

        {/* Quick Stats */}
        <View style={{ flexDirection: 'row', paddingHorizontal: spacing.screenH, gap: 10, marginBottom: 20 }}>
          {stats.map((stat) => (
            <GlassCard key={stat.label} tint="neutral" style={{ flex: 1 }}>
              <View style={{ alignItems: 'center' }}>
                <MaterialIcons name={stat.icon} size={22} color={colors.pink} style={{ marginBottom: 6 }} />
                <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 2 }}>{stat.label}</Text>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{stat.value}</Text>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Tags */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.screenH, gap: 8, marginBottom: 24 }}>
          {destination.tags.map((tag: string) => (
            <View
              key={tag}
              style={{
                backgroundColor: colors.primaryLight,
                borderWidth: 1,
                borderColor: 'rgba(100,67,244,0.2)',
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: radius.pill,
              }}
            >
              <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.caption, color: colors.primary }}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={{ paddingHorizontal: spacing.screenH, marginBottom: 28 }}>
          <GradientButton
            title="Plan a Trip Here"
            onPress={() => router.push('/(trip)/dates')}
            icon={<MaterialIcons name="flight-takeoff" size={20} color="#FFFFFF" />}
            style={{ marginBottom: 12 }}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {[
              { label: 'Flights', icon: 'flight' as const, route: '/(trip)/flights' },
              { label: 'Hotels', icon: 'hotel' as const, route: '/(trip)/hotels' },
              { label: 'Compare', icon: 'compare-arrows' as const, route: '/(trip)/hotel-compare' },
            ].map((btn) => (
              <PressableScale key={btn.label} onPress={() => router.push(btn.route as any)} style={{ flex: 1 }}>
                <GlassCard tint="neutral">
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <MaterialIcons name={btn.icon} size={20} color={colors.text.secondary} />
                    <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.caption, color: colors.text.primary }}>{btn.label}</Text>
                  </View>
                </GlassCard>
              </PressableScale>
            ))}
          </View>
        </View>

        {/* Activities */}
        <View style={{ paddingHorizontal: spacing.screenH }}>
          <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>TOP ACTIVITIES</Text>
          {activities.slice(0, 4).map((act) => (
            <PressableScale key={act.id} onPress={() => router.push(`/(trip)/activity/${act.id}` as any)} style={{ marginBottom: 12 }}>
              <GlassCard tint="neutral" noPadding>
                <View style={{ flexDirection: 'row', padding: 14 }}>
                  <CachedImage source={{ uri: act.image }} style={{ width: 80, height: 80, borderRadius: radius.sm }} />
                  <View style={{ flex: 1, justifyContent: 'center', marginLeft: 14 }}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary, marginBottom: 4 }}>{act.name}</Text>
                    <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{act.category} · {act.duration}</Text>
                    <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.pink, marginTop: 6 }}>€{act.price}</Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <MaterialIcons name="chevron-right" size={22} color={colors.text.tertiary} />
                  </View>
                </View>
              </GlassCard>
            </PressableScale>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
