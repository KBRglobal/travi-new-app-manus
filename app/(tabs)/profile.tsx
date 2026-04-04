import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { currentUser } from '../../lib/mockData';
import { useAuthStore } from '../../stores/authStore';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { PressableScale } from '@/components/ui/PressableScale';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setAuthenticated } = useAuthStore();

  const menuSections = [
    {
      title: 'MY PROFILE',
      items: [
        { icon: 'edit' as const, label: 'Edit Profile', route: '/(trip)/profile/edit' },
        { icon: 'bar-chart' as const, label: 'My Stats', route: '/(trip)/profile/stats' },
        { icon: 'emoji-events' as const, label: 'Achievements', route: '/(trip)/profile/achievements' },
        { icon: 'rate-review' as const, label: 'Reviews', route: '/(trip)/profile/reviews' },
        { icon: 'favorite' as const, label: 'Wishlist', route: '/(trip)/profile/wishlist' },
      ],
    },
    {
      title: 'TRAVEL',
      items: [
        { icon: 'fingerprint' as const, label: 'My Travel DNA', route: '/(trip)/profile/dna' },
        { icon: 'flight' as const, label: 'My Trips', route: '/(tabs)/trips' },
        { icon: 'explore' as const, label: 'Adventure Log', route: '/(trip)/profile/adventure-log' },
        { icon: 'card-membership' as const, label: 'Membership', route: '/(trip)/membership' },
      ],
    },
    {
      title: 'FINANCE',
      items: [
        { icon: 'account-balance-wallet' as const, label: 'Wallet', route: '/(tabs)/wallet' },
        { icon: 'stars' as const, label: 'Points & Rewards', route: '/(tabs)/points' },
        { icon: 'group-add' as const, label: 'Referrals', route: '/(trip)/points/referrals' },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { icon: 'settings' as const, label: 'Settings', route: '/(trip)/settings' },
        { icon: 'notifications' as const, label: 'Notifications', route: '/(trip)/settings/notifications' },
        { icon: 'help' as const, label: 'Help & Support', route: '/(trip)/settings/help' },
        { icon: 'feedback' as const, label: 'Send Feedback', route: '/(trip)/settings/feedback' },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.08)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: spacing.screenH, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Animated.View entering={FadeInDown} style={{ alignItems: 'center', marginBottom: 24 }}>
          <View style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            borderWidth: 2,
            borderColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 14,
            backgroundColor: 'rgba(100,67,244,0.1)',
          }}>
            <MaterialIcons name="person" size={40} color={colors.primary} />
          </View>
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary, marginBottom: 4 }}>
            {currentUser.firstName} {currentUser.lastName}
          </Text>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.tertiary }}>
            Member since {currentUser.memberSince}
          </Text>
        </Animated.View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 28 }}>
          {[
            { value: currentUser.tripsCompleted, label: 'Trips' },
            { value: currentUser.countriesVisited, label: 'Countries' },
            { value: '12.5K', label: 'Points' },
          ].map((stat) => (
            <GlassCard key={stat.label} tint="neutral" style={{ flex: 1, alignItems: 'center', paddingVertical: 14 }}>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.primary }}>{stat.value}</Text>
              <Text style={{ ...typography.caption, color: colors.text.tertiary, marginTop: 2 }}>{stat.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sIdx) => (
          <Animated.View key={section.title} entering={FadeInDown.delay(sIdx * 80)} style={{ marginBottom: 24 }}>
            <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 10 }}>{section.title}</Text>
            <GlassCard tint="neutral" style={{ padding: 0, overflow: 'hidden' }}>
              {section.items.map((item, i) => (
                <PressableScale
                  key={item.label}
                  onPress={() => router.push(item.route as any)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderBottomWidth: i < section.items.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border.default,
                  }}
                >
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                    <MaterialIcons name={item.icon} size={18} color={colors.text.secondary} />
                  </View>
                  <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.body, color: colors.text.primary, flex: 1 }}>{item.label}</Text>
                  <MaterialIcons name="chevron-right" size={20} color={colors.text.tertiary} />
                </PressableScale>
              ))}
            </GlassCard>
          </Animated.View>
        ))}

        {/* Logout */}
        <PressableScale onPress={() => { setAuthenticated(false); router.replace('/(auth)/welcome'); }} style={{ marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: radius.button, borderWidth: 1, borderColor: 'rgba(248,113,113,0.3)' }}>
            <MaterialIcons name="logout" size={20} color={colors.error} style={{ marginRight: 8 }} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.error }}>Log Out</Text>
          </View>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
