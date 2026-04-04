import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { PressableScale } from '@/components/ui/PressableScale';

export default function PointsDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const quickNav = [
    { icon: 'card-giftcard' as const, label: 'Redeem', route: '/(trip)/points/redeem', color: colors.pink },
    { icon: 'trending-up' as const, label: 'Earn', route: '/(trip)/points/earn', color: colors.success },
    { icon: 'history' as const, label: 'History', route: '/(trip)/points/transactions', color: colors.primary },
    { icon: 'workspace-premium' as const, label: 'Perks', route: '/(trip)/points/perks', color: colors.gold },
    { icon: 'group-add' as const, label: 'Referrals', route: '/(trip)/points/referrals', color: '#02A65C' },
    { icon: 'emoji-events' as const, label: 'Challenges', route: '/(trip)/points/challenges', color: colors.warning },
    { icon: 'leaderboard' as const, label: 'Leaderboard', route: '/(trip)/points/leaderboard', color: '#FF6B35' },
    { icon: 'military-tech' as const, label: 'Badges', route: '/(trip)/points/badges', color: '#FFD700' },
    { icon: 'card-giftcard' as const, label: 'Gift Points', route: '/(trip)/points/gift', color: colors.pink },
  ];

  const recentActivity = [
    { text: 'Earned 500 pts', desc: 'Hotel booking', date: 'Apr 12', icon: 'hotel' as const, positive: true },
    { text: 'Earned 200 pts', desc: 'Flight check-in', date: 'Apr 10', icon: 'flight' as const, positive: true },
    { text: 'Redeemed 1,000 pts', desc: 'Lounge access', date: 'Apr 8', icon: 'airline-seat-individual-suite' as const, positive: false },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '35%' }}>
        <LinearGradient
          colors={['rgba(100,67,244,0.1)', 'rgba(249,68,152,0.05)', 'transparent']}
          style={{ flex: 1 }}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: spacing.screenH, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ ...typography.h2, marginBottom: 20 }}>Points & Rewards</Text>

        {/* Hero Points Card */}
        <LinearGradient
          colors={[...gradients.points] as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: radius.card, padding: 28, marginBottom: 28, alignItems: 'center', ...shadows.cta }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <MaterialIcons name="stars" size={18} color="rgba(255,255,255,0.8)" style={{ marginRight: 6 }} />
            <Text style={{ ...typography.label, color: 'rgba(255,255,255,0.8)' }}>YOUR POINTS</Text>
          </View>
          <Text style={{ fontFamily: fonts.heading, fontSize: 48, color: '#FFFFFF', marginBottom: 8 }}>12,500</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <GradientBadge label="GOLD" variant="primary" style={{ marginRight: 8 }} />
            <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.bodySm, color: 'rgba(255,255,255,0.75)' }}>2,500 to Platinum</Text>
          </View>
          {/* Progress bar */}
          <View style={{ width: 200, height: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
            <View style={{ width: '75%', height: '100%', backgroundColor: '#FFFFFF', borderRadius: 3 }} />
          </View>
        </LinearGradient>

        {/* Quick Navigation */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>QUICK NAVIGATION</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
          {quickNav.map(item => (
            <PressableScale key={item.label} onPress={() => router.push(item.route as any)} style={{ width: '47%' }}>
              <GlassCard tint="neutral" style={item.isNew ? { borderColor: 'rgba(249,68,152,0.3)', borderWidth: 1 } : {}}>
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
                    <MaterialIcons name={item.icon} size={20} color={item.color} />
                  </View>
                  {item.isNew && <GradientBadge label="NEW" variant="primary" style={{ paddingHorizontal: 6, paddingVertical: 1 }} />}
                </View>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: item.isNew ? colors.pink : colors.text.primary }}>{item.label}</Text>
              </GlassCard>
            </PressableScale>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>RECENT ACTIVITY</Text>
        {recentActivity.map((act, i) => (
          <GlassCard key={i} tint="neutral" style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: act.positive ? 'rgba(74,222,128,0.1)' : 'rgba(249,68,152,0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}>
                <MaterialIcons name={act.icon} size={20} color={act.positive ? colors.success : colors.pink} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{act.text}</Text>
                <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{act.desc}</Text>
              </View>
              <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{act.date}</Text>
            </View>
          </GlassCard>
        ))}
      </ScrollView>
    </View>
  );
}
