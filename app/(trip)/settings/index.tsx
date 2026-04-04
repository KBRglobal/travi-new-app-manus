import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, typography } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { PressableScale } from '@/components/ui/PressableScale';
import { useAuthStore } from '@/stores/authStore';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setAuthenticated } = useAuthStore();

  const sections = [
    {
      title: 'ACCOUNT',
      items: [
        { icon: 'person' as const, label: 'Personal Info', route: '/(trip)/settings/personal' },
        { icon: 'lock' as const, label: 'Privacy & Security', route: '/(trip)/settings/privacy' },
        { icon: 'notifications' as const, label: 'Notifications', route: '/(trip)/settings/notifications' },
        { icon: 'email' as const, label: 'Change Email', route: '/(trip)/account/change-email' },
        { icon: 'vpn-key' as const, label: 'Change Password', route: '/(trip)/account/change-password' },
      ],
    },
    {
      title: 'PREFERENCES',
      items: [
        { icon: 'language' as const, label: 'Language', route: '/(trip)/settings/language' },
        { icon: 'currency-exchange' as const, label: 'Currency', route: '/(trip)/settings/currency' },
        { icon: 'palette' as const, label: 'Appearance', route: '/(trip)/settings/appearance' },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        { icon: 'help' as const, label: 'Help Center', route: '/(trip)/settings/help' },
        { icon: 'feedback' as const, label: 'Send Feedback', route: '/(trip)/settings/feedback' },
        { icon: 'article' as const, label: 'Terms & Privacy', route: '/(trip)/settings/terms' },
        { icon: 'contact-support' as const, label: 'Contact Support', route: '/(trip)/settings/support' },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
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
          <Text style={{ ...typography.h2 }}>Settings</Text>
        </View>

        {/* Sections */}
        {sections.map((section) => (
          <View key={section.title} style={{ marginBottom: 24 }}>
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
          </View>
        ))}

        {/* Danger Zone */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 10 }}>DANGER ZONE</Text>
          <PressableScale onPress={() => router.push('/(trip)/account/delete')}>
            <GlassCard tint="neutral" style={{ borderColor: 'rgba(248,113,113,0.2)', borderWidth: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="delete-forever" size={20} color={colors.error} style={{ marginRight: 12 }} />
                <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.body, color: colors.error }}>Delete Account</Text>
              </View>
            </GlassCard>
          </PressableScale>
        </View>

        {/* Logout */}
        <PressableScale onPress={() => { setAuthenticated(false); router.replace('/(auth)/welcome'); }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: radius.button, borderWidth: 1, borderColor: 'rgba(248,113,113,0.3)' }}>
            <MaterialIcons name="logout" size={20} color={colors.error} style={{ marginRight: 8 }} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.error }}>Log Out</Text>
          </View>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
