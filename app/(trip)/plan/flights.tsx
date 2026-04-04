import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { PressableScale } from '@/components/ui/PressableScale';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const FLIGHTS = [
  { airline: 'Emirates', code: 'EK001', dep: '07:30', arr: '15:45', duration: '8h 15m', stops: 'Direct', price: 289, dna: 92, best: true },
  { airline: 'Turkish Airlines', code: 'TK788', dep: '10:00', arr: '20:30', duration: '10h 30m', stops: '1 stop', price: 189, dna: 78, best: false },
  { airline: 'Lufthansa', code: 'LH680', dep: '14:15', arr: '23:00', duration: '8h 45m', stops: 'Direct', price: 345, dna: 85, best: false },
];

const SORT_TABS = ['Best', 'Cheapest', 'Fastest', 'Flexible'];

export default function FlightSelect() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeSort, setActiveSort] = useState('Best');
  const [aiMode, setAiMode] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScreenHeader title="Select Flight" rightElement={
        <PressableScale
          onPress={() => setAiMode(!aiMode)}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: radius.pill,
            backgroundColor: aiMode ? colors.primary : 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: aiMode ? colors.primary : colors.border.default,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <MaterialIcons name="auto-awesome" size={14} color={aiMode ? '#FFFFFF' : colors.text.tertiary} />
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: aiMode ? '#FFFFFF' : colors.text.tertiary }}>AI</Text>
        </PressableScale>
      } />

      {/* Sort tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 44, marginBottom: 12, paddingLeft: spacing.screenH }}>
        {SORT_TABS.map(tab => (
          <PressableScale
            key={tab}
            onPress={() => {
              if (tab === 'Flexible') { router.push('/(trip)/plan/flexible-dates'); return; }
              setActiveSort(tab);
            }}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 8,
              borderRadius: radius.pill,
              backgroundColor: activeSort === tab ? colors.primary : 'rgba(255,255,255,0.05)',
              borderWidth: 1,
              borderColor: activeSort === tab ? colors.primary : colors.border.default,
              marginRight: 8,
            }}
          >
            <Text style={{
              fontFamily: activeSort === tab ? fonts.bold : fonts.bodyMedium,
              fontSize: fontSizes.bodySm,
              color: activeSort === tab ? '#FFFFFF' : colors.text.tertiary,
            }}>{tab}</Text>
          </PressableScale>
        ))}
      </ScrollView>

      {/* AI Mode banner */}
      {aiMode && (
        <View style={{ marginHorizontal: spacing.screenH, marginBottom: 12 }}>
          <GlassCard tint="discovery">
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <MaterialIcons name="auto-awesome" size={16} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.primary }}>AI Mode Active</Text>
            </View>
            <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 8 }}>
              Searching 400+ airlines for your DNA match...
            </Text>
            <View style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
              <LinearGradient
                colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: '100%', width: '65%', borderRadius: 2 }}
              />
            </View>
          </GlassCard>
        </View>
      )}

      {/* Flight list */}
      <ScrollView style={{ flex: 1, paddingHorizontal: spacing.screenH }} showsVerticalScrollIndicator={false}>
        {FLIGHTS.map(flight => (
          <PressableScale key={flight.code} onPress={() => router.push('/(trip)/plan/hotels')} style={{ marginBottom: 12 }}>
            <GlassCard tint={flight.best ? 'discovery' : 'neutral'} style={flight.best ? { borderColor: 'rgba(100,67,244,0.3)', borderWidth: 1 } : {}}>
              {/* Header row */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcons name="flight" size={18} color={colors.text.secondary} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{flight.airline}</Text>
                    <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{flight.code}</Text>
                  </View>
                </View>
                <GradientBadge label={`${flight.dna}% match`} variant={flight.dna >= 90 ? 'primary' : 'secondary'} />
              </View>

              {/* Time row */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.primary }}>{flight.dep}</Text>
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                  <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 4 }}>{flight.duration}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <MaterialIcons name="flight" size={14} color={colors.text.tertiary} style={{ marginHorizontal: 4, transform: [{ rotate: '90deg' }] }} />
                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  </View>
                  <Text style={{ ...typography.caption, color: flight.stops === 'Direct' ? colors.success : colors.text.tertiary, marginTop: 4 }}>{flight.stops}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.primary }}>{flight.arr}</Text>
                </View>
              </View>

              {/* Price */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>€{flight.price}</Text>
                {flight.best && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <MaterialIcons name="verified" size={14} color={colors.primary} />
                    <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: colors.primary }}>BEST MATCH</Text>
                  </View>
                )}
              </View>
            </GlassCard>
          </PressableScale>
        ))}
      </ScrollView>

      {/* Bottom actions */}
      <View style={{ paddingHorizontal: spacing.screenH, paddingBottom: insets.bottom + 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border.default }}>
        <PressableScale onPress={() => router.push('/(trip)/plan/flight-alerts')} style={{ marginBottom: 8 }}>
          <View style={{ borderWidth: 1, borderColor: colors.pink, borderRadius: radius.button, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
            <MaterialIcons name="notifications-active" size={18} color={colors.pink} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.pink }}>Set Price Alert</Text>
          </View>
        </PressableScale>
        <PressableScale onPress={() => router.push('/(trip)/plan/hotels')}>
          <Text style={{ ...typography.bodySm, color: colors.text.tertiary, textAlign: 'center', paddingVertical: 8 }}>Skip Flights →</Text>
        </PressableScale>
      </View>
    </View>
  );
}
