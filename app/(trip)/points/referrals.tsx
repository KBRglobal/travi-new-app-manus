import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { PressableScale } from '@/components/ui/PressableScale';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

export default function ReferralsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.1)', 'rgba(249,68,152,0.05)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScreenHeader title="Invite Friends" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing.screenH, paddingBottom: 40, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero icon */}
        <LinearGradient
          colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 24,
            marginBottom: 20,
            ...shadows.cta,
          }}
        >
          <MaterialIcons name="group-add" size={36} color="#FFFFFF" />
        </LinearGradient>

        <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h1, color: colors.text.primary, textAlign: 'center', marginBottom: 8 }}>
          Earn 500 Points
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.tertiary, textAlign: 'center', lineHeight: 22, marginBottom: 28, maxWidth: 280 }}>
          For every friend who joins and completes their first trip
        </Text>

        {/* Referral code card */}
        <View style={{ width: '100%', maxWidth: 360, marginBottom: 20 }}>
          <GlassCard tint="discovery" style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 8 }}>YOUR REFERRAL CODE</Text>
            <Text style={{ fontFamily: fonts.heading, fontSize: 32, color: colors.text.primary, letterSpacing: 6 }}>TRAVI2024</Text>
            <PressableScale onPress={() => {}} style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MaterialIcons name="content-copy" size={14} color={colors.primary} />
              <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.caption, color: colors.primary }}>Tap to copy</Text>
            </PressableScale>
          </GlassCard>
        </View>

        {/* Share button */}
        <View style={{ width: '100%', maxWidth: 360, marginBottom: 32 }}>
          <GradientButton
            title="Share Invite Link"
            onPress={() => {}}
            icon={<MaterialIcons name="share" size={20} color="#FFFFFF" />}
          />
        </View>

        {/* How it works */}
        <View style={{ width: '100%', maxWidth: 360 }}>
          <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>HOW IT WORKS</Text>
          {[
            { step: '1', title: 'Share your code', desc: 'Send your unique link to friends', icon: 'send' as const },
            { step: '2', title: 'They sign up', desc: 'Your friend creates an account', icon: 'person-add' as const },
            { step: '3', title: 'Both earn points', desc: 'You get 500, they get 250', icon: 'stars' as const },
          ].map((item, i) => (
            <GlassCard key={i} tint="neutral" style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(100,67,244,0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}>
                <MaterialIcons name={item.icon} size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{item.title}</Text>
                <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{item.desc}</Text>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Your Referrals */}
        <View style={{ width: '100%', maxWidth: 360, marginTop: 20 }}>
          <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>YOUR REFERRALS</Text>
          <GlassCard tint="neutral" style={{ alignItems: 'center', paddingVertical: 24 }}>
            <MaterialIcons name="people-outline" size={32} color={colors.text.tertiary} style={{ marginBottom: 8 }} />
            <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.body, color: colors.text.tertiary }}>No referrals yet</Text>
            <Text style={{ ...typography.caption, color: colors.text.tertiary, marginTop: 4 }}>Share your code to get started</Text>
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
}
