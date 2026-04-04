import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { PressableScale } from '@/components/ui/PressableScale';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const NEARBY = [
  { name: 'Dubai Museum', distance: '0.3 km', type: 'Culture', icon: 'museum' as const, dna: 92 },
  { name: 'Gold Souk', distance: '0.8 km', type: 'Shopping', icon: 'storefront' as const, dna: 85 },
  { name: 'Al Fahidi Fort', distance: '1.2 km', type: 'History', icon: 'castle' as const, dna: 78 },
  { name: 'Creek Park', distance: '2.1 km', type: 'Nature', icon: 'park' as const, dna: 70 },
];

const FILTERS = ['All', 'Food', 'Culture', 'Shopping', 'Nature'];

export default function LiveMapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tripId } = useLocalSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <ScreenHeader title="Live Map" />

      {/* Map placeholder */}
      <View style={{ flex: 1, backgroundColor: colors.bg.card, margin: spacing.screenH, borderRadius: radius.card, overflow: 'hidden', borderWidth: 1, borderColor: colors.border.default }}>
        <LinearGradient
          colors={['rgba(100,67,244,0.08)', 'rgba(249,68,152,0.04)', colors.bg.card]}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Grid pattern */}
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={`h${i}`} style={{ position: 'absolute', top: `${(i + 1) * 11}%`, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.03)' }} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={`v${i}`} style={{ position: 'absolute', left: `${(i + 1) * 14}%`, top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.03)' }} />
          ))}

          {/* Center marker */}
          <View style={{ alignItems: 'center' }}>
            <LinearGradient
              colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
              style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', ...shadows.cta }}
            >
              <MaterialIcons name="my-location" size={24} color="#FFFFFF" />
            </LinearGradient>
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: colors.primary, marginTop: 8 }}>You are here</Text>
          </View>

          {/* Nearby markers */}
          <View style={{ position: 'absolute', top: '25%', right: '20%' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(100,67,244,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.primary }}>
              <MaterialIcons name="museum" size={14} color={colors.primary} />
            </View>
          </View>
          <View style={{ position: 'absolute', top: '35%', left: '15%' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(249,68,152,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.pink }}>
              <MaterialIcons name="storefront" size={14} color={colors.pink} />
            </View>
          </View>
          <View style={{ position: 'absolute', bottom: '30%', left: '30%' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(74,222,128,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.success }}>
              <MaterialIcons name="park" size={14} color={colors.success} />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Filter pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 44, marginBottom: 8, paddingLeft: spacing.screenH }}>
        {FILTERS.map(f => (
          <PressableScale
            key={f}
            onPress={() => setActiveFilter(f)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: radius.pill,
              backgroundColor: activeFilter === f ? colors.primary : 'rgba(255,255,255,0.05)',
              borderWidth: 1,
              borderColor: activeFilter === f ? colors.primary : colors.border.default,
              marginRight: 8,
            }}
          >
            <Text style={{
              fontFamily: activeFilter === f ? fonts.bold : fonts.bodyMedium,
              fontSize: fontSizes.bodySm,
              color: activeFilter === f ? '#FFFFFF' : colors.text.tertiary,
            }}>{f}</Text>
          </PressableScale>
        ))}
      </ScrollView>

      {/* Nearby places */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 120, paddingLeft: spacing.screenH }} contentContainerStyle={{ paddingRight: spacing.screenH, paddingBottom: insets.bottom + 8 }}>
        {NEARBY.map(place => (
          <PressableScale onPress={() => {}} key={place.name} style={{ marginRight: 10, width: 180 }}>
            <GlassCard tint="neutral" style={{ paddingVertical: 12, paddingHorizontal: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(100,67,244,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                  <MaterialIcons name={place.icon} size={16} color={colors.primary} />
                </View>
                <GradientBadge label={`${place.dna}%`} variant={place.dna >= 90 ? 'primary' : 'secondary'} />
              </View>
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.primary }} numberOfLines={1}>{place.name}</Text>
              <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{place.distance} · {place.type}</Text>
            </GlassCard>
          </PressableScale>
        ))}
      </ScrollView>
    </View>
  );
}
