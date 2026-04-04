import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { GradientButton } from '@/components/ui/GradientButton';
import { PressableScale } from '@/components/ui/PressableScale';

export default function PreTripDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tripId } = useLocalSearchParams();

  const quickCards = [
    { icon: 'checklist' as const, label: 'Checklist', route: `/(trip)/pre/${tripId}/checklist`, color: colors.primary },
    { icon: 'description' as const, label: 'Documents', route: `/(trip)/pre/${tripId}/documents`, color: colors.success },
    { icon: 'card-travel' as const, label: 'Visa & Entry', route: '/(trip)/visa-passport', color: colors.gold, isNew: true },
    { icon: 'flight' as const, label: 'Flight Status', route: `/(trip)/pre/${tripId}/flight-status`, color: colors.pink, isNew: true },
    { icon: 'luggage' as const, label: 'Packing List', route: '/(trip)/plan/packing-list', color: '#4FC3F7' },
    { icon: 'group' as const, label: 'Companions', route: '/(trip)/plan/trip-companions', color: '#AB47BC' },
  ];

  const tasks = [
    { label: 'Book flights', done: true },
    { label: 'Book hotel', done: true },
    { label: 'Upload passport', done: false },
    { label: 'Pack essentials', done: false },
    { label: 'Download offline maps', done: false },
  ];

  const completedCount = tasks.filter(t => t.done).length;
  const progress = completedCount / tasks.length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.1)', 'rgba(249,68,152,0.04)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingHorizontal: spacing.screenH, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <PressableScale onPress={() => router.back()} style={{ marginRight: 12 }}>
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons name="arrow-back" size={20} color={colors.text.primary} />
            </View>
          </PressableScale>
          <Text style={{ ...typography.h2 }}>Pre-Trip</Text>
        </View>

        {/* Trip Info Card */}
        <LinearGradient
          colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: radius.card, padding: 24, marginBottom: 24, ...shadows.cta }}
        >
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: '#FFFFFF', marginBottom: 4 }}>Dubai Adventure</Text>
          <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.body, color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>
            April 10 — April 17, 2026
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <GradientBadge label="5 DAYS TO GO" variant="secondary" />
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: 'rgba(255,255,255,0.7)' }}>
              {completedCount}/{tasks.length} tasks done
            </Text>
          </View>
          {/* Progress bar */}
          <View style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, marginTop: 16 }}>
            <View style={{ height: 4, width: `${progress * 100}%`, backgroundColor: '#FFFFFF', borderRadius: 2 }} />
          </View>
        </LinearGradient>

        {/* Quick Access */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>QUICK ACCESS</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {quickCards.map(card => (
            <PressableScale key={card.label} onPress={() => router.push(card.route as any)} style={{ width: '47%' }}>
              <GlassCard tint="neutral" style={card.isNew ? { borderColor: 'rgba(249,68,152,0.2)', borderWidth: 1 } : {}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <View style={{
                    width: 40, height: 40, borderRadius: 20,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <MaterialIcons name={card.icon} size={20} color={card.color} />
                  </View>
                  {card.isNew && <GradientBadge label="NEW" variant="primary" style={{ paddingHorizontal: 6, paddingVertical: 1 }} />}
                </View>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{card.label}</Text>
              </GlassCard>
            </PressableScale>
          ))}
        </View>

        {/* Checklist */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>TRIP CHECKLIST</Text>
        <GlassCard tint="neutral" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          {tasks.map((task, i) => (
            <View
              key={task.label}
              style={{
                flexDirection: 'row', alignItems: 'center',
                paddingVertical: 14, paddingHorizontal: 16,
                borderBottomWidth: i < tasks.length - 1 ? 1 : 0,
                borderBottomColor: colors.border.default,
              }}
            >
              <View style={{
                width: 22, height: 22, borderRadius: 11, marginRight: 12,
                backgroundColor: task.done ? colors.success : 'transparent',
                borderWidth: task.done ? 0 : 1.5,
                borderColor: task.done ? 'transparent' : colors.text.tertiary,
                alignItems: 'center', justifyContent: 'center',
              }}>
                {task.done && <MaterialIcons name="check" size={14} color="#FFFFFF" />}
              </View>
              <Text style={{
                fontFamily: fonts.body, fontSize: fontSizes.body,
                color: task.done ? colors.text.tertiary : colors.text.primary,
                textDecorationLine: task.done ? 'line-through' : 'none',
              }}>{task.label}</Text>
            </View>
          ))}
        </GlassCard>

        {/* Start Trip CTA */}
        <GradientButton label="Start Trip" onPress={() => router.push(`/(live)/${tripId}` as any)} />
      </ScrollView>
    </View>
  );
}
