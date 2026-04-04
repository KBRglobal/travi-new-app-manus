import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const DNA_TRAITS = [
  { label: 'Adventure Level', value: 85, color: DS.purple, icon: 'terrain' as const },
  { label: 'Culture Seeker', value: 72, color: DS.pink, icon: 'museum' as const },
  { label: 'Foodie Score', value: 90, color: '#FF9327', icon: 'restaurant' as const },
  { label: 'Relaxation', value: 60, color: '#01BEFF', icon: 'spa' as const },
  { label: 'Social Traveler', value: 78, color: '#02A65C', icon: 'people' as const },
];

const DNA_BADGES = [
  { icon: 'flight-takeoff' as const, label: 'Frequent Flyer', color: DS.purple },
  { icon: 'explore' as const, label: 'Explorer', color: DS.pink },
  { icon: 'restaurant' as const, label: 'Foodie', color: '#FF9327' },
];

export default function DnaProfileScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper
      title="Travel DNA"
      scrollable
      headerRight={
        <TouchableOpacity onPress={() => router.push('/(dna)/categories' as any)} style={s.editBtn}>
          <Text style={s.editBtnText}>Edit</Text>
        </TouchableOpacity>
      }
    >
      {/* DNA Score Card */}
      <LinearGradient
        colors={['rgba(100,67,244,0.25)', 'rgba(249,68,152,0.15)']}
        style={s.scoreCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={s.scoreCircle}>
          <LinearGradient colors={DS.gradient} style={s.scoreGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={s.scoreNumber}>87</Text>
            <Text style={s.scoreLabel}>DNA Score</Text>
          </LinearGradient>
        </View>
        <View style={s.scoreInfo}>
          <Text style={s.scoreTitle}>Explorer DNA</Text>
          <Text style={s.scoreDesc}>You love adventure, culture, and authentic local experiences.</Text>
          <View style={s.badgesRow}>
            {DNA_BADGES.map((b) => (
              <View key={b.label} style={[s.badge, { borderColor: b.color + '44' }]}>
                <MaterialIcons name={b.icon} size={12} color={b.color} />
                <Text style={[s.badgeText, { color: b.color }]}>{b.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* Traits */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Your Travel Traits</Text>
        {DNA_TRAITS.map((trait) => (
          <BlurView key={trait.label} intensity={15} tint="dark" style={s.traitCard}>
            <View style={s.traitHeader}>
              <View style={[s.traitIcon, { backgroundColor: trait.color + '22' }]}>
                <MaterialIcons name={trait.icon} size={18} color={trait.color} />
              </View>
              <Text style={s.traitLabel}>{trait.label}</Text>
              <Text style={[s.traitValue, { color: trait.color }]}>{trait.value}%</Text>
            </View>
            <View style={s.barBg}>
              <View style={[s.barFill, { width: `${trait.value}%` as any, backgroundColor: trait.color }]} />
            </View>
          </BlurView>
        ))}
      </View>

      {/* Actions */}
      <View style={s.actionsRow}>
        <TouchableOpacity style={s.actionBtn} onPress={() => router.push('/(dna)/quick-swipe' as any)} activeOpacity={0.8}>
          <LinearGradient colors={DS.gradient} style={s.actionGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <MaterialIcons name="refresh" size={18} color={DS.white} />
            <Text style={s.actionText}>Retake Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={s.actionBtnOutline} onPress={() => router.push('/(dna)/categories' as any)} activeOpacity={0.8}>
          <MaterialIcons name="tune" size={18} color={DS.purple} />
          <Text style={s.actionTextOutline}>Fine-tune</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  editBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: DS.border },
  editBtnText: { fontSize: 13, fontFamily: 'Satoshi-Medium', color: DS.purple },
  scoreCard: { marginHorizontal: 20, marginBottom: 28, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16, borderWidth: 1, borderColor: DS.border },
  scoreCircle: { width: 90, height: 90, borderRadius: 45, overflow: 'hidden' },
  scoreGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scoreNumber: { fontSize: 28, fontFamily: 'Chillax-Bold', color: DS.white },
  scoreLabel: { fontSize: 10, fontFamily: 'Satoshi-Medium', color: 'rgba(255,255,255,0.7)' },
  scoreInfo: { flex: 1 },
  scoreTitle: { fontSize: 18, fontFamily: 'Chillax-Bold', color: DS.white, marginBottom: 4 },
  scoreDesc: { fontSize: 12, fontFamily: 'Satoshi-Regular', color: DS.muted, lineHeight: 18, marginBottom: 10 },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.04)' },
  badgeText: { fontSize: 10, fontFamily: 'Satoshi-Bold' },
  section: { paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontFamily: 'Chillax-Bold', color: DS.white, marginBottom: 4 },
  traitCard: { borderRadius: 14, padding: 14, borderWidth: 1, borderColor: DS.border, overflow: 'hidden' },
  traitHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  traitIcon: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  traitLabel: { flex: 1, fontSize: 14, fontFamily: 'Satoshi-Medium', color: DS.white },
  traitValue: { fontSize: 14, fontFamily: 'Chillax-Bold' },
  barBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3 },
  barFill: { height: 6, borderRadius: 3 },
  actionsRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 24 },
  actionBtn: { flex: 1, borderRadius: 14, overflow: 'hidden' },
  actionGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14 },
  actionText: { fontSize: 15, fontFamily: 'Satoshi-Bold', color: DS.white },
  actionBtnOutline: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: DS.border },
  actionTextOutline: { fontSize: 15, fontFamily: 'Satoshi-Bold', color: DS.purple },
});
