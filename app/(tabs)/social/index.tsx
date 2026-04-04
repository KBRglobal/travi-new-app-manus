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

export default function SocialHubScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const sections = [
    {
      title: 'Discover Travelers',
      subtitle: 'Find travel buddies near you',
      icon: 'explore' as const,
      route: '/(social)/discover',
      tint: 'discovery' as const,
      iconColor: colors.primary,
      badge: null,
    },
    {
      title: 'Messages',
      subtitle: '3 unread conversations',
      icon: 'chat-bubble' as const,
      route: '/(social)/messages',
      tint: 'neutral' as const,
      iconColor: colors.text.secondary,
      badge: '3',
    },
    {
      title: 'Travel Buddies',
      subtitle: '12 connections',
      icon: 'group' as const,
      route: '/(social)/buddies',
      tint: 'neutral' as const,
      iconColor: colors.text.secondary,
      badge: null,
    },
    {
      title: 'Groups',
      subtitle: 'Join travel communities',
      icon: 'groups' as const,
      route: '/(social)/groups',
      tint: 'neutral' as const,
      iconColor: colors.text.secondary,
      badge: null,
    },
    {
      title: 'Feed',
      subtitle: 'See what travelers are sharing',
      icon: 'dynamic-feed' as const,
      route: '/(social)/feed',
      tint: 'neutral' as const,
      iconColor: colors.text.secondary,
      badge: null,
    },
    {
      title: 'Events',
      subtitle: 'Upcoming travel meetups',
      icon: 'event' as const,
      route: '/(social)/events',
      tint: 'neutral' as const,
      iconColor: colors.text.secondary,
      badge: '2',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: spacing.screenH, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ ...typography.h2, marginBottom: 24 }}>Social</Text>

        {sections.map(section => (
          <PressableScale key={section.title} onPress={() => router.push(section.route as any)} style={{ marginBottom: 12 }}>
            <GlassCard tint={section.tint} style={section.tint === 'discovery' ? { borderColor: 'rgba(100,67,244,0.2)', borderWidth: 1 } : {}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: section.tint === 'discovery' ? 'rgba(100,67,244,0.15)' : 'rgba(255,255,255,0.04)',
                  borderWidth: 1,
                  borderColor: section.tint === 'discovery' ? 'rgba(100,67,244,0.3)' : 'rgba(255,255,255,0.08)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}>
                  <MaterialIcons name={section.icon} size={24} color={section.iconColor} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.text.primary, marginBottom: 2 }}>{section.title}</Text>
                  <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{section.subtitle}</Text>
                </View>
                {section.badge ? (
                  <LinearGradient
                    colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
                    style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: '#FFFFFF' }}>{section.badge}</Text>
                  </LinearGradient>
                ) : (
                  <MaterialIcons name="chevron-right" size={24} color={colors.text.tertiary} />
                )}
              </View>
            </GlassCard>
          </PressableScale>
        ))}

        {/* Community Stats */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginTop: 16, marginBottom: 12 }}>COMMUNITY STATS</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[
            { value: '2.4k', label: 'Travelers', icon: 'people' as const },
            { value: '156', label: 'Countries', icon: 'public' as const },
            { value: '89%', label: 'Match Rate', icon: 'favorite' as const },
          ].map(stat => (
            <GlassCard key={stat.label} tint="neutral" style={{ flex: 1, alignItems: 'center' }}>
              <MaterialIcons name={stat.icon} size={20} color={colors.primary} style={{ marginBottom: 8 }} />
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.text.primary }}>{stat.value}</Text>
              <Text style={{ ...typography.caption, color: colors.text.tertiary, marginTop: 2 }}>{stat.label}</Text>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
