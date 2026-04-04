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

const TRANSACTIONS = [
  { name: 'Hotel Luxe', amount: -445, date: 'Apr 12', icon: 'hotel' as const },
  { name: 'Points Cashback', amount: 25, date: 'Apr 11', icon: 'stars' as const },
  { name: 'Restaurant', amount: -32, date: 'Apr 11', icon: 'restaurant' as const },
  { name: 'Taxi', amount: -18, date: 'Apr 10', icon: 'local-taxi' as const },
];

export default function WalletScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const quickActions = [
    { icon: 'call-split' as const, label: 'Split Pay', route: '/(trip)/wallet/split', color: colors.primary },
    { icon: 'receipt-long' as const, label: 'History', route: '/(trip)/wallet/transactions', color: colors.primary },
    { icon: 'currency-exchange' as const, label: 'Currency', route: '/(trip)/wallet/currency', color: colors.pink, isNew: true },
    { icon: 'verified-user' as const, label: 'KYC', route: '/(trip)/wallet/kyc', color: colors.success },
    { icon: 'card-membership' as const, label: 'Membership', route: '/(trip)/wallet/membership', color: colors.gold },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.1)', 'rgba(249,68,152,0.05)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: spacing.screenH, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ ...typography.h2, marginBottom: 20 }}>Wallet</Text>

        {/* Balance card */}
        <LinearGradient
          colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: radius.card, padding: 28, marginBottom: 24, ...shadows.cta }}
        >
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Total Balance</Text>
          <Text style={{ fontFamily: fonts.heading, fontSize: 42, color: '#FFFFFF', marginBottom: 20 }}>€2,450.00</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <PressableScale onPress={() => router.push('/(trip)/wallet/add-funds')} style={{ flex: 1 }}>
              <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.button, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
                <MaterialIcons name="add" size={18} color="#FFFFFF" />
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: '#FFFFFF' }}>Add Funds</Text>
              </View>
            </PressableScale>
            <PressableScale onPress={() => {}} style={{ flex: 1 }}>
              <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.button, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
                <MaterialIcons name="send" size={18} color="#FFFFFF" />
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: '#FFFFFF' }}>Send</Text>
              </View>
            </PressableScale>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>QUICK ACTIONS</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {quickActions.map(action => (
            <PressableScale key={action.label} onPress={() => router.push(action.route as any)} style={{ flex: 1 }}>
              <GlassCard tint="neutral" style={action.isNew ? { borderColor: 'rgba(249,68,152,0.3)', borderWidth: 1 } : {}}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.08)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                  <MaterialIcons name={action.icon} size={20} color={action.color} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: action.isNew ? colors.pink : colors.text.primary }}>{action.label}</Text>
                  {action.isNew && <GradientBadge label="NEW" variant="primary" style={{ paddingHorizontal: 4, paddingVertical: 0 }} />}
                </View>
              </GlassCard>
            </PressableScale>
          ))}
        </View>

        {/* Recent Transactions */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>RECENT TRANSACTIONS</Text>
        {TRANSACTIONS.map((tx, i) => (
          <GlassCard key={i} tint="neutral" style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: tx.amount > 0 ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}>
                <MaterialIcons name={tx.icon} size={20} color={tx.amount > 0 ? colors.success : colors.text.secondary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{tx.name}</Text>
                <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{tx.date}</Text>
              </View>
              <Text style={{
                fontFamily: fonts.heading,
                fontSize: fontSizes.h4,
                color: tx.amount > 0 ? colors.success : colors.text.primary,
              }}>
                {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount)}
              </Text>
            </View>
          </GlassCard>
        ))}
      </ScrollView>
    </View>
  );
}
