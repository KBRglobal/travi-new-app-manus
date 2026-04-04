import React from 'react';
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
import { IconButton } from '@/components/ui/IconButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const DAYS = [
  { day: 1, title: 'Cultural Immersion', activities: [
    { name: 'Dubai Museum', time: '9:00 AM', icon: 'museum' as const },
    { name: 'Gold Souk', time: '12:00 PM', icon: 'storefront' as const },
    { name: 'Spice Market', time: '3:00 PM', icon: 'local-florist' as const },
  ]},
  { day: 2, title: 'Adventure Day', activities: [
    { name: 'Desert Safari', time: '10:00 AM', icon: 'terrain' as const },
    { name: 'Dune Bashing', time: '2:00 PM', icon: 'directions-car' as const },
    { name: 'BBQ Dinner', time: '7:00 PM', icon: 'restaurant' as const },
  ]},
  { day: 3, title: 'Modern Dubai', activities: [
    { name: 'Burj Khalifa', time: '9:00 AM', icon: 'apartment' as const },
    { name: 'Dubai Mall', time: '1:00 PM', icon: 'shopping-bag' as const },
    { name: 'Fountain Show', time: '8:00 PM', icon: 'water' as const },
  ]},
];

export default function ItineraryBuilder() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScreenHeader
        title="Itinerary"
        rightElement={
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <IconButton icon="luggage" onPress={() => router.push('/(trip)/plan/packing-list')} />
            <IconButton icon="group" onPress={() => router.push('/(trip)/plan/trip-companions')} />
            <IconButton icon="auto-awesome" onPress={() => router.push('/(trip)/plan/ai-itinerary')} />
            <IconButton icon="people" onPress={() => router.push('/(trip)/plan/collab/tripId' as any)} />
            <IconButton icon="share" onPress={() => router.push('/_modals/share-trip' as any)} />
          </View>
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing.screenH, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {DAYS.map((day, dayIdx) => (
          <View key={day.day} style={{ marginBottom: 28 }}>
            {/* Day header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
              <LinearGradient
                colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
                style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
              >
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: '#FFFFFF' }}>{day.day}</Text>
              </LinearGradient>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.text.primary }}>
                Day {day.day} — {day.title}
              </Text>
            </View>

            {/* Activities with timeline */}
            {day.activities.map((act, i) => (
              <View key={act.name} style={{ flexDirection: 'row', marginBottom: i < day.activities.length - 1 ? 0 : 8 }}>
                {/* Timeline */}
                <View style={{ width: 32, alignItems: 'center', marginRight: 10 }}>
                  <View style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: colors.primary,
                    borderWidth: 2,
                    borderColor: 'rgba(100,67,244,0.3)',
                  }} />
                  {i < day.activities.length - 1 && (
                    <View style={{ width: 1, flex: 1, backgroundColor: 'rgba(100,67,244,0.2)', minHeight: 60 }} />
                  )}
                </View>

                {/* Activity card */}
                <PressableScale onPress={() => {}} style={{ flex: 1, marginBottom: 10 }}>
                  <GlassCard tint="neutral">
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: 'rgba(100,67,244,0.1)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}>
                        <MaterialIcons name={act.icon} size={20} color={colors.primary} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{act.name}</Text>
                        <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{act.time}</Text>
                      </View>
                      <MaterialIcons name="drag-indicator" size={20} color={colors.text.tertiary} />
                    </View>
                  </GlassCard>
                </PressableScale>
              </View>
            ))}

            {/* Add activity */}
            <PressableScale onPress={() => {}} style={{ marginLeft: 42 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: radius.button, borderWidth: 1, borderColor: colors.border.default, borderStyle: 'dashed' }}>
                <MaterialIcons name="add" size={16} color={colors.primary} style={{ marginRight: 4 }} />
                <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.bodySm, color: colors.primary }}>Add Activity</Text>
              </View>
            </PressableScale>
          </View>
        ))}
      </ScrollView>

      {/* Bottom actions */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.screenH,
        paddingBottom: insets.bottom + 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border.default,
        backgroundColor: colors.bg.primary,
      }}>
        <PressableScale onPress={() => router.push('/(trip)/plan/road-trip')} style={{ marginBottom: 10 }}>
          <View style={{ borderWidth: 1, borderColor: colors.pink, borderRadius: radius.button, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            <MaterialIcons name="directions-car" size={18} color={colors.pink} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.pink }}>Road Trip Mode</Text>
            <GradientBadge label="NEW" variant="primary" style={{ paddingHorizontal: 6, paddingVertical: 1 }} />
          </View>
        </PressableScale>
        <GradientButton
          title="Review Cart →"
          onPress={() => router.push('/(trip)/plan/cart')}
          icon={<MaterialIcons name="shopping-cart" size={20} color="#FFFFFF" />}
        />
      </View>
    </View>
  );
}
