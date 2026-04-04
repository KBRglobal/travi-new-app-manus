import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { PressableScale } from '@/components/ui/PressableScale';

const FILTERS = ['All', 'Beaches', 'Cities', 'Mountains', 'Culture', 'Food', 'Nomad'];
const DESTINATIONS = [
  { name: 'Dubai', country: '🇦🇪 UAE', match: 92, category: 'Cities' },
  { name: 'Bali', country: '🇮🇩 Indonesia', match: 88, category: 'Beaches' },
  { name: 'Tokyo', country: '🇯🇵 Japan', match: 85, category: 'Culture' },
  { name: 'Swiss Alps', country: '🇨🇭 Switzerland', match: 78, category: 'Mountains' },
  { name: 'Barcelona', country: '🇪🇸 Spain', match: 82, category: 'Cities' },
  { name: 'Santorini', country: '🇬🇷 Greece', match: 80, category: 'Beaches' },
];

const DISCOVER_SECTIONS = [
  { icon: 'explore' as const, label: 'Adventure Log', route: '/(trip)/adventure-log', color: colors.primary },
  { icon: 'flight' as const, label: 'Flight Status', route: '/(trip)/flight-status', color: colors.pink },
  { icon: 'currency-exchange' as const, label: 'Currency', route: '/(trip)/currency', color: colors.gold },
  { icon: 'card-travel' as const, label: 'Visa & Passport', route: '/(trip)/visa-passport', color: colors.success },
];

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = DESTINATIONS.filter(d => {
    const matchesFilter = activeFilter === 'All' || d.category === activeFilter;
    const matchesSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: spacing.screenH, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ ...typography.h2, marginBottom: 16 }}>Explore</Text>

        {/* Search */}
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: colors.bg.card, borderRadius: radius.button,
          paddingHorizontal: 14, marginBottom: 16,
          borderWidth: 1, borderColor: colors.border.default,
        }}>
          <MaterialIcons name="search" size={20} color={colors.text.tertiary} style={{ marginRight: 8 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search destinations..."
            placeholderTextColor={colors.text.muted}
            style={{ flex: 1, fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.primary, paddingVertical: 12 }}
          />
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20, marginHorizontal: -spacing.screenH }} contentContainerStyle={{ paddingHorizontal: spacing.screenH }}>
          {FILTERS.map(f => {
            const isActive = activeFilter === f;
            const isNomad = f === 'Nomad';
            return (
              <PressableScale
                key={f}
                onPress={() => {
                  if (isNomad) { router.push('/(tabs)/explore/nomad' as any); return; }
                  setActiveFilter(f);
                }}
                style={{ marginRight: 8 }}
              >
                {isActive ? (
                  <LinearGradient
                    colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
                    style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.pill }}
                  >
                    <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: '#FFFFFF' }}>{f}</Text>
                  </LinearGradient>
                ) : (
                  <View style={{
                    paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.pill,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderWidth: 1,
                    borderColor: isNomad ? 'rgba(249,68,152,0.3)' : colors.border.default,
                  }}>
                    <Text style={{ fontFamily: fonts.bodyMedium, fontSize: fontSizes.bodySm, color: isNomad ? colors.pink : colors.text.secondary }}>
                      {f}{isNomad ? ' ✦' : ''}
                    </Text>
                  </View>
                )}
              </PressableScale>
            );
          })}
        </ScrollView>

        {/* Discover Tools */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>DISCOVER</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24, marginHorizontal: -spacing.screenH }} contentContainerStyle={{ paddingHorizontal: spacing.screenH }}>
          {DISCOVER_SECTIONS.map(section => (
            <PressableScale key={section.label} onPress={() => router.push(section.route as any)} style={{ marginRight: 10 }}>
              <GlassCard tint="neutral" style={{ width: 110, alignItems: 'center' }}>
                <View style={{
                  width: 40, height: 40, borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
                  alignItems: 'center', justifyContent: 'center', marginBottom: 8,
                }}>
                  <MaterialIcons name={section.icon} size={20} color={section.color} />
                </View>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: colors.text.primary, textAlign: 'center' }}>{section.label}</Text>
              </GlassCard>
            </PressableScale>
          ))}
        </ScrollView>

        {/* Destinations */}
        <Text style={{ ...typography.label, color: colors.text.tertiary, marginBottom: 12 }}>DESTINATIONS</Text>
        {filtered.map(dest => (
          <PressableScale key={dest.name} onPress={() => router.push('/(trip)/plan/destination' as any)} style={{ marginBottom: 10 }}>
            <GlassCard tint="neutral">
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 48, height: 48, borderRadius: 24,
                  backgroundColor: 'rgba(100,67,244,0.08)',
                  alignItems: 'center', justifyContent: 'center', marginRight: 14,
                }}>
                  <Text style={{ fontSize: 24 }}>{dest.country.split(' ')[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.text.primary, marginBottom: 2 }}>{dest.name}</Text>
                  <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{dest.country}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.primary }}>{dest.match}%</Text>
                  <Text style={{ ...typography.caption, color: colors.text.tertiary }}>DNA Match</Text>
                </View>
              </View>
            </GlassCard>
          </PressableScale>
        ))}
      </ScrollView>
    </View>
  );
}
