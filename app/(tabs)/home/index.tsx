import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { GradientBadge, PointsBadge } from '@/components/ui/GradientBadge';
import { PressableScale } from '@/components/ui/PressableScale';
import { AvatarFallback } from '@/components/ui/AvatarFallback';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
};

const destinations = [
  { name: 'Dubai', flag: '🇦🇪', match: 92, color: '#FFD700' },
  { name: 'Tokyo', flag: '🇯🇵', match: 88, color: '#F94498' },
  { name: 'Barcelona', flag: '🇪🇸', match: 85, color: '#FF9327' },
  { name: 'Bali', flag: '🇮🇩', match: 81, color: '#02A65C' },
];

const quickActions = [
  { label: 'New Trip', icon: 'flight-takeoff' as const, route: '/(trip)/plan/destination', gradient: gradients.primaryCTA },
  { label: 'My Trips', icon: 'luggage' as const, route: '/(tabs)/home/trips', gradient: gradients.planning },
  { label: 'Explore', icon: 'explore' as const, route: '/(tabs)/explore', gradient: gradients.cardTintDiscovery },
  { label: 'Wallet', icon: 'account-balance-wallet' as const, route: '/(tabs)/wallet', gradient: gradients.points },
  { label: 'Wishlist', icon: 'favorite' as const, route: '/(trip)/wishlist', gradient: gradients.primaryCTA },
  { label: 'Road Trip', icon: 'directions-car' as const, route: '/(trip)/road-trip', gradient: gradients.planning },
  { label: 'Nomad Hub', icon: 'public' as const, route: '/(trip)/nomad-hub', gradient: gradients.cardTintDiscovery },
  { label: 'Flight Alerts', icon: 'flight' as const, route: '/(trip)/flight-alerts', gradient: gradients.points },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%' }}>
        <LinearGradient
          colors={['rgba(100,67,244,0.08)', 'rgba(249,68,152,0.04)', 'transparent']}
          style={{ flex: 1 }}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: spacing.screenH,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <View>
            <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 4 }}>
              {getGreeting()}
            </Text>
            <Text style={typography.h2}>
              Welcome back!
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <PressableScale onPress={() => router.push('/(tabs)/home/search' as any)}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="search" size={20} color={colors.text.secondary} />
              </View>
            </PressableScale>
            <PressableScale onPress={() => router.push('/(trip)/notifications' as any)}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="notifications-none" size={20} color={colors.text.secondary} />
              </View>
            </PressableScale>
            <PressableScale onPress={() => router.push('/(tabs)/profile' as any)}>
              <AvatarFallback name="User" size={40} />
            </PressableScale>
          </View>
        </View>

        {/* AI Trip Suggestion — Hero Card */}
        <PressableScale onPress={() => router.push('/(trip)/plan/destination')} style={{ marginBottom: 24 }}>
          <LinearGradient
            colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: radius.card,
              padding: 22,
              ...shadows.cta,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <MaterialIcons name="auto-awesome" size={16} color="rgba(255,255,255,0.9)" />
                  <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.label, letterSpacing: 1.5, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', marginLeft: 6 }}>
                    AI Suggestion
                  </Text>
                </View>
                <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: '#FFFFFF', marginBottom: 6 }}>
                  Dubai is a 92% match!
                </Text>
                <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: 'rgba(255,255,255,0.75)' }}>
                  Based on your Travel DNA profile
                </Text>
              </View>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />
              </View>
            </View>
          </LinearGradient>
        </PressableScale>

        {/* Quick Stats */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>
          OVERVIEW
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 28, marginHorizontal: -spacing.screenH }} contentContainerStyle={{ paddingHorizontal: spacing.screenH }}>
          {/* Wallet */}
          <PressableScale onPress={() => router.push('/(tabs)/wallet')} style={{ marginRight: 12 }}>
            <GlassCard tint="neutral" style={{ width: 150 }}>
              <MaterialIcons name="account-balance-wallet" size={20} color={colors.primary} style={{ marginBottom: 8 }} />
              <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 4 }}>Wallet</Text>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.primary }}>€2,450</Text>
            </GlassCard>
          </PressableScale>

          {/* Points */}
          <PressableScale onPress={() => router.push('/(tabs)/points')} style={{ marginRight: 12 }}>
            <GlassCard tint="neutral" style={{ width: 150 }}>
              <MaterialIcons name="stars" size={20} color={colors.gold} style={{ marginBottom: 8 }} />
              <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 4 }}>Points</Text>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.primary }}>12,500</Text>
            </GlassCard>
          </PressableScale>

          {/* Flight Deals */}
          <PressableScale onPress={() => router.push('/(trip)/plan/flight-alerts')}>
            <GlassCard tint="planning" style={{ width: 150 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MaterialIcons name="local-fire-department" size={20} color={colors.pink} />
                <GradientBadge label="NEW" variant="primary" style={{ marginLeft: 8, paddingHorizontal: 8, paddingVertical: 2 }} />
              </View>
              <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 4 }}>Flight Deals</Text>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.primary }}>3 alerts</Text>
            </GlassCard>
          </PressableScale>
        </ScrollView>

        {/* DNA Persona */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ ...typography.label, color: colors.text.tertiary }}>
            YOUR DNA PERSONA
          </Text>
          <PressableScale onPress={() => router.push('/(tabs)/explore/nomad')}>
            <View style={{ backgroundColor: colors.primaryLight, paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.pill, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MaterialIcons name="public" size={14} color={colors.primary} />
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.label, color: colors.primary, letterSpacing: 0.5 }}>NOMAD</Text>
            </View>
          </PressableScale>
        </View>
        <PressableScale onPress={() => router.push('/(trip)/dna/results')} style={{ marginBottom: 28 }}>
          <GlassCard tint="discovery">
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <MaterialIcons name="fingerprint" size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.primary }}>
                Explorer · Foodie · Culture Lover
              </Text>
            </View>
            <Text style={{ ...typography.bodySm, color: colors.text.tertiary }}>
              Tap to see your full Travel DNA →
            </Text>
          </GlassCard>
        </PressableScale>

        {/* Trending Destinations */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>
          TRENDING DESTINATIONS
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 28, marginHorizontal: -spacing.screenH }} contentContainerStyle={{ paddingHorizontal: spacing.screenH }}>
          {destinations.map((dest) => (
            <PressableScale
              key={dest.name}
              onPress={() => router.push('/(trip)/plan/destination')}
              style={{ marginRight: 12 }}
            >
              <GlassCard tint="neutral" style={{ width: 155 }}>
                <Text style={{ fontSize: 28, marginBottom: 8 }}>{dest.flag}</Text>
                <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.text.primary, marginBottom: 4 }}>
                  {dest.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dest.color }} />
                  <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.caption, color: colors.text.tertiary }}>
                    {dest.match}% match
                  </Text>
                </View>
              </GlassCard>
            </PressableScale>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>
          QUICK ACTIONS
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {quickActions.map((action) => (
            <PressableScale
              key={action.label}
              onPress={() => router.push(action.route as any)}
              style={{ width: '47%' }}
            >
              <GlassCard tint="neutral">
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.08)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}
                >
                  <MaterialIcons name={action.icon} size={22} color={colors.primary} />
                </View>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>
                  {action.label}
                </Text>
              </GlassCard>
            </PressableScale>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
