/**
 * TRAVI — Profile Screen
 * Dark mode: #1A0B2E bg, #24103E surface, purple->pink gradients
 * NO circles — bare icons, pill badges, glassmorphism cards
 */
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Switch,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const C = {
  bg: '#1A0B2E', surface: '#24103E', glassStroke: 'rgba(123,68,230,0.3)',
  purple: '#6443F4', pink: '#F94498', orange: '#FF9327', green: '#02A65C',
  white: '#FFFFFF', textPrimary: '#FFFFFF', textSecondary: '#D3CFD8',
  textMuted: '#A79FB2', textDisabled: '#504065',
};

const DNA_TRAITS = [
  { label: 'Adventure', pct: 85, color: C.purple },
  { label: 'Culture',   pct: 72, color: C.pink },
  { label: 'Wellness',  pct: 65, color: C.green },
  { label: 'Food',      pct: 90, color: C.orange },
  { label: 'Nature',    pct: 78, color: '#06B6D4' },
];

const ACHIEVEMENTS = [
  { id: 'a1', emoji: '🌍', title: 'World Explorer',  desc: 'Visited 10+ countries', earned: true },
  { id: 'a2', emoji: '✈️', title: 'Frequent Flyer',  desc: '20+ flights booked',    earned: true },
  { id: 'a3', emoji: '🏆', title: 'Elite Nomad',     desc: 'Gold tier member',       earned: false },
  { id: 'a4', emoji: '🧬', title: 'DNA Pioneer',     desc: 'Completed DNA quiz',     earned: true },
  { id: 'a5', emoji: '💎', title: 'Hidden Gem',      desc: 'Visited 3 hidden gems',  earned: false },
  { id: 'a6', emoji: '⭐', title: '5-Star Traveler', desc: 'All 5-star reviews',     earned: true },
];

const SETTINGS_SECTIONS = [
  {
    title: 'Preferences',
    items: [
      { id: 's1', icon: 'globe',                    label: 'Language',           value: 'English', hasChevron: true,  isToggle: false },
      { id: 's2', icon: 'dollarsign.circle.fill',   label: 'Currency',           value: 'EUR (€)', hasChevron: true,  isToggle: false },
      { id: 's3', icon: 'bell.fill',                label: 'Notifications',      value: '',        hasChevron: false, isToggle: true },
      { id: 's4', icon: 'moon.fill',                label: 'Dark Mode',          value: '',        hasChevron: false, isToggle: true },
    ],
  },
  {
    title: 'Account',
    items: [
      { id: 's5', icon: 'person.fill',              label: 'Edit Profile',       value: '', hasChevron: true,  isToggle: false },
      { id: 's6', icon: 'lock.fill',                label: 'Privacy & Security', value: '', hasChevron: true,  isToggle: false },
      { id: 's7', icon: 'creditcard.fill',          label: 'Payment Methods',    value: '', hasChevron: true,  isToggle: false },
      { id: 's8', icon: 'questionmark.circle.fill', label: 'Help & Support',     value: '', hasChevron: true,  isToggle: false },
    ],
  },
];

function TraitBar({ trait }) {
  return (
    <View style={S.traitRow}>
      <Text style={S.traitLabel}>{trait.label}</Text>
      <View style={S.traitBarBg}>
        <View style={[S.traitBarFill, { width: trait.pct + '%', backgroundColor: trait.color }]} />
      </View>
      <Text style={[S.traitPct, { color: trait.color }]}>{trait.pct}%</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const tabBarOffset = 60 + Math.max(insets.bottom, 8) + 16;
  const [toggles, setToggles] = useState({ s3: true, s4: true });
  const toggleSwitch = (id) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <View style={S.root}>
      <LinearGradient colors={[C.purple, '#9B3FD4', C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[S.header, { paddingTop: insets.top + 12 }]}>
        <View style={S.profileRow}>
          <View style={S.avatarWrap}>
            <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.avatarInitials}>AT</Text>
          </View>
          <View style={S.profileInfo}>
            <Text style={S.profileName}>Alex Traveler</Text>
            <Text style={S.profileEmail}>alex@travi.app</Text>
            <View style={S.tierBadge}><Text style={S.tierBadgeText}>Gold Explorer</Text></View>
          </View>
          <TouchableOpacity style={S.editProfileBtn} activeOpacity={0.85}>
            <IconSymbol name='pencil' size={18} color={C.white} />
          </TouchableOpacity>
        </View>
        <View style={S.statsRow}>
          {[['23','Countries'],['47','Trips'],['8,450','Points'],['4.9★','Rating']].map(([n,l],i,arr) => (
            <React.Fragment key={l}>
              <View style={S.statItem}>
                <Text style={S.statNum}>{n}</Text>
                <Text style={S.statLabel}>{l}</Text>
              </View>
              {i < arr.length-1 && <View style={S.statDivider} />}
            </React.Fragment>
          ))}
        </View>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarOffset + 32 }}>
        <View style={S.sectionPad}>
          <View style={S.sectionHeader}>
            <Text style={S.sectionTitle}>Travel DNA</Text>
            <TouchableOpacity style={S.retakeBtn} onPress={() => router.push('/(trip)/swipe')} activeOpacity={0.85}>
              <Text style={S.retakeBtnText}>Retake Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={S.dnaCard}>{DNA_TRAITS.map(t => <TraitBar key={t.label} trait={t} />)}</View>
        </View>
        <View style={S.sectionPad}>
          <Text style={S.sectionTitle}>Achievements</Text>
          <View style={S.achievementsGrid}>
            {ACHIEVEMENTS.map(a => (
              <View key={a.id} style={[S.achievementCard, !a.earned && S.achievementCardLocked]}>
                <Text style={[S.achievementEmoji, !a.earned && { opacity: 0.35 }]}>{a.emoji}</Text>
                <Text style={[S.achievementTitle, !a.earned && S.achievementTitleLocked]}>{a.title}</Text>
                <Text style={S.achievementDesc}>{a.desc}</Text>
                {!a.earned && <View style={S.lockedBadge}><Text style={S.lockedBadgeText}>Locked</Text></View>}
              </View>
            ))}
          </View>
        </View>
        {SETTINGS_SECTIONS.map(section => (
          <View key={section.title} style={S.sectionPad}>
            <Text style={S.sectionTitle}>{section.title}</Text>
            <View style={S.settingsCard}>
              {section.items.map((item, i) => (
                <View key={item.id} style={[S.settingsRow, i === section.items.length-1 && { borderBottomWidth: 0 }]}>
                  <View style={S.settingsIconWrap}>
                    <IconSymbol name={item.icon} size={18} color={C.purple} />
                  </View>
                  <Text style={S.settingsLabel}>{item.label}</Text>
                  {item.isToggle ? (
                    <Switch value={toggles[item.id] ?? false} onValueChange={() => toggleSwitch(item.id)} trackColor={{ false: C.textDisabled, true: C.purple }} thumbColor={C.white} />
                  ) : (
                    <View style={S.settingsRight}>
                      {item.value ? <Text style={S.settingsValue}>{item.value}</Text> : null}
                      <IconSymbol name='chevron.right' size={16} color={C.textDisabled} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
        <View style={S.sectionPad}>
          <TouchableOpacity style={S.signOutBtn} activeOpacity={0.85}>
            <IconSymbol name='arrow.right.square.fill' size={18} color={C.pink} />
            <Text style={S.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingBottom: 20, gap: 16 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarWrap: { width: 64, height: 64, borderRadius: 18, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { color: C.white, fontSize: 22, fontWeight: '800', fontFamily: 'Chillax-Bold' },
  profileInfo: { flex: 1, gap: 4 },
  profileName: { color: C.white, fontSize: 20, fontWeight: '800', fontFamily: 'Chillax-Bold' },
  profileEmail: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'Satoshi-Regular' },
  tierBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  tierBadgeText: { color: C.white, fontSize: 11, fontWeight: '700', fontFamily: 'Satoshi-Bold' },
  editProfileBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  statsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20 },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statNum: { color: C.white, fontSize: 16, fontWeight: '800', fontFamily: 'Chillax-Bold' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'Satoshi-Regular' },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' },
  sectionPad: { paddingTop: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { color: C.white, fontSize: 18, fontWeight: '700', fontFamily: 'Chillax-Bold', marginBottom: 12 },
  retakeBtn: { backgroundColor: 'rgba(100,67,244,0.2)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: C.glassStroke },
  retakeBtnText: { color: C.purple, fontSize: 12, fontWeight: '700', fontFamily: 'Satoshi-Bold' },
  dnaCard: { backgroundColor: C.surface, borderRadius: 20, padding: 16, gap: 12, borderWidth: 1, borderColor: C.glassStroke },
  traitRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  traitLabel: { color: C.textSecondary, fontSize: 13, fontFamily: 'Satoshi-Medium', width: 70 },
  traitBarBg: { flex: 1, height: 8, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' },
  traitBarFill: { height: '100%', borderRadius: 4 },
  traitPct: { fontSize: 12, fontWeight: '700', fontFamily: 'Satoshi-Bold', width: 36, textAlign: 'right' },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  achievementCard: { width: '30.5%', backgroundColor: C.surface, borderRadius: 16, padding: 12, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: C.glassStroke },
  achievementCardLocked: { opacity: 0.55 },
  achievementEmoji: { fontSize: 24 },
  achievementTitle: { color: C.white, fontSize: 11, fontWeight: '700', fontFamily: 'Satoshi-Bold', textAlign: 'center' },
  achievementTitleLocked: { color: C.textMuted },
  achievementDesc: { color: C.textMuted, fontSize: 9, fontFamily: 'Satoshi-Regular', textAlign: 'center' },
  lockedBadge: { backgroundColor: 'rgba(80,64,101,0.6)', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, marginTop: 2 },
  lockedBadgeText: { color: C.textMuted, fontSize: 9, fontFamily: 'Satoshi-Medium' },
  settingsCard: { backgroundColor: C.surface, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: C.glassStroke },
  settingsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(123,68,230,0.15)' },
  settingsIconWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  settingsLabel: { flex: 1, color: C.textPrimary, fontSize: 15, fontFamily: 'Satoshi-Medium' },
  settingsRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  settingsValue: { color: C.textMuted, fontSize: 14, fontFamily: 'Satoshi-Regular' },
  signOutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: 'rgba(249,68,152,0.1)', borderRadius: 16, paddingVertical: 16, borderWidth: 1, borderColor: 'rgba(249,68,152,0.3)' },
  signOutText: { color: C.pink, fontSize: 15, fontWeight: '700', fontFamily: 'Satoshi-Bold' },
});
