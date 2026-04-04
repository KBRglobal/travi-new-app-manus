import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { PressableScale } from '@/components/ui/PressableScale';

export default function LiveDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tripId } = useLocalSearchParams();

  const quickActions = [
    { icon: 'event-note' as const, label: 'Timeline', route: `/(live)/${tripId}/timeline`, tint: 'planning' as const },
    { icon: 'map' as const, label: 'Map', route: `/(live)/${tripId}/map`, tint: 'discovery' as const },
    { icon: 'receipt-long' as const, label: 'Expenses', route: `/(live)/${tripId}/expenses`, tint: 'neutral' as const },
    { icon: 'photo-camera' as const, label: 'Memories', route: `/(live)/${tripId}/memories`, tint: 'neutral' as const },
    { icon: 'emergency' as const, label: 'Emergency', route: `/(live)/${tripId}/emergency`, tint: 'neutral' as const },
    { icon: 'request-quote' as const, label: 'Tax', route: `/(live)/${tripId}/tax`, tint: 'neutral' as const },
    { icon: 'bar-chart' as const, label: 'Budget', route: `/(live)/${tripId}/budget`, tint: 'neutral' as const, isNew: true },
    { icon: 'settings' as const, label: 'Settings', route: `/(live)/${tripId}/settings`, tint: 'neutral' as const },
  ];

  const stats = [
    { icon: 'thermostat' as const, label: 'Weather', value: '34°C', sub: 'Sunny', color: colors.gold },
    { icon: 'payments' as const, label: 'Spent today', value: '€127', sub: 'Budget OK', color: colors.success },
    { icon: 'directions-walk' as const, label: 'Steps', value: '8,432', sub: '67%', color: colors.pink },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top gradient glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%' }}>
        <LinearGradient
          colors={['rgba(100,67,244,0.1)', 'rgba(249,68,152,0.04)', 'transparent']}
          style={{ flex: 1 }}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: spacing.screenH, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 4 }}>Currently in</Text>
          <Text style={{ ...typography.display, marginBottom: 4 }}>Dubai 🇦🇪</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <GradientBadge label="LIVE" variant="primary" />
            <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.body, color: colors.primary }}>Day 3 of 7</Text>
          </View>
        </View>

        {/* Next Up Card */}
        <PressableScale onPress={() => router.push(`/(live)/${tripId}/timeline` as any)} style={{ marginBottom: 20 }}>
          <LinearGradient
            colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: radius.card, padding: 20, ...shadows.cta }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <MaterialIcons name="schedule" size={16} color="rgba(255,255,255,0.8)" style={{ marginRight: 6 }} />
              <Text style={{ ...typography.label, color: 'rgba(255,255,255,0.8)' }}>NEXT UP</Text>
            </View>
            <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: '#FFFFFF', marginBottom: 4 }}>
              Desert Safari — 2:00 PM
            </Text>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: 'rgba(255,255,255,0.7)' }}>
              In 3 hours · Pickup from hotel
            </Text>
          </LinearGradient>
        </PressableScale>

        {/* Stats Row */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 28 }}>
          {stats.map(stat => (
            <GlassCard key={stat.label} tint="neutral" style={{ flex: 1 }}>
              <MaterialIcons name={stat.icon} size={20} color={stat.color} style={{ marginBottom: 8 }} />
              <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 2 }}>{stat.label}</Text>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.text.primary }}>{stat.value}</Text>
              <Text style={{ ...typography.caption, color: stat.color, marginTop: 2 }}>{stat.sub}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>QUICK ACTIONS</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {quickActions.map(action => (
            <PressableScale key={action.label} onPress={() => router.push(action.route as any)} style={{ width: '47%' }}>
              <GlassCard tint={action.tint}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.08)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MaterialIcons name={action.icon} size={20} color={colors.primary} />
                  </View>
                  {action.isNew && <GradientBadge label="NEW" variant="primary" style={{ paddingHorizontal: 6, paddingVertical: 1 }} />}
                </View>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{action.label}</Text>
              </GlassCard>
            </PressableScale>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
