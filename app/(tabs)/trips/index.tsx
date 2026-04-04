import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { GradientButton } from '@/components/ui/GradientButton';
import { PressableScale } from '@/components/ui/PressableScale';
import { GradientFAB } from '@/components/ui/GradientFAB';
import { EmptyState } from '@/components/ui/EmptyState';

const TRIPS = [
  { id: 'trip-1', name: 'Barcelona Adventure', status: 'active', dates: 'Mar 28 - Apr 5', icon: 'flight-takeoff' as const },
  { id: 'trip-2', name: 'Tokyo Explorer', status: 'upcoming', dates: 'May 10 - May 20', icon: 'event' as const },
  { id: 'trip-3', name: 'Paris Romance', status: 'completed', dates: 'Feb 14 - Feb 21', icon: 'check-circle' as const },
  { id: 'trip-4', name: 'Bali Retreat', status: 'draft', dates: 'TBD', icon: 'edit' as const },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string; variant: 'primary' | 'secondary' }> = {
  active: { color: colors.success, bg: 'rgba(74,222,128,0.1)', label: 'Active', variant: 'primary' },
  upcoming: { color: colors.primary, bg: 'rgba(100,67,244,0.1)', label: 'Upcoming', variant: 'secondary' },
  completed: { color: colors.text.tertiary, bg: 'rgba(255,255,255,0.05)', label: 'Completed', variant: 'secondary' },
  draft: { color: colors.gold, bg: 'rgba(251,191,36,0.1)', label: 'Draft', variant: 'secondary' },
};

export default function MyTripsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleTripPress = (trip: typeof TRIPS[0]) => {
    switch (trip.status) {
      case 'draft': router.push('/(trip)/plan'); break;
      case 'upcoming': router.push(`/(trip)/pre/${trip.id}` as any); break;
      case 'active': router.push(`/(live)/${trip.id}` as any); break;
      case 'completed': router.push(`/(trip)/post/${trip.id}/celebration` as any); break;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
      </View>

      {/* Header */}
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: spacing.screenH, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={typography.h2}>My Trips</Text>
        <PressableScale onPress={() => router.push('/(trip)/plan')}>
          <LinearGradient
            colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.button, flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            <MaterialIcons name="add" size={18} color="#FFFFFF" />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: '#FFFFFF' }}>Plan New</Text>
          </LinearGradient>
        </PressableScale>
      </View>

      <FlatList
        ListEmptyComponent={() => <EmptyState stateKey="trips" />}
        data={TRIPS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.screenH, paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => {
          const status = STATUS_CONFIG[item.status];
          const isActive = item.status === 'active';

          return (
            <PressableScale onPress={() => handleTripPress(item)}>
              <GlassCard tint={isActive ? 'discovery' : 'neutral'} style={isActive ? { borderColor: 'rgba(74,222,128,0.2)', borderWidth: 1 } : {}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* Icon */}
                  <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: status.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 14,
                  }}>
                    <MaterialIcons name={item.icon} size={22} color={status.color} />
                  </View>

                  {/* Info */}
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.text.primary, marginBottom: 4 }}>
                      {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <MaterialIcons name="calendar-today" size={12} color={colors.text.tertiary} />
                      <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{item.dates}</Text>
                    </View>
                  </View>

                  {/* Status badge */}
                  <GradientBadge label={status.label.toUpperCase()} variant={status.variant} />
                </View>
              </GlassCard>
            </PressableScale>
          );
        }}
      />

      {/* FAB */}
      <GradientFAB
        icon="smart-toy"
        onPress={() => router.push('/_modals/ai-chat')}
      />
    </View>
  );
}
