import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const MEMBERS = [
  { id: '1', name: 'You', initials: 'AC', role: 'Organizer', status: 'confirmed' },
  { id: '2', name: 'Sarah M.', initials: 'SM', role: 'Member', status: 'confirmed' },
  { id: '3', name: 'David K.', initials: 'DK', role: 'Member', status: 'pending' },
  { id: '4', name: 'Emma L.', initials: 'EL', role: 'Member', status: 'pending' },
];

const TABS = ['Overview', 'Members', 'Expenses', 'Chat'];

export default function GroupTripScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ScreenWrapper
      title="Bali Group Trip"
      scrollable
      headerRight={
        <TouchableOpacity onPress={() => router.push('/(social)/group-invite' as any)} style={s.addBtn}>
          <MaterialIcons name="person-add" size={18} color={DS.purple} />
        </TouchableOpacity>
      }
    >
      {/* Hero Banner */}
      <LinearGradient
        colors={['rgba(100,67,244,0.3)', 'rgba(249,68,152,0.2)']}
        style={s.heroBanner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={s.heroDestination}>🌴 Bali, Indonesia</Text>
        <Text style={s.heroDates}>Jun 15 – Jun 25, 2025</Text>
        <View style={s.heroStats}>
          <View style={s.heroStat}>
            <Text style={s.heroStatValue}>{MEMBERS.length}</Text>
            <Text style={s.heroStatLabel}>Travelers</Text>
          </View>
          <View style={s.heroDivider} />
          <View style={s.heroStat}>
            <Text style={s.heroStatValue}>10</Text>
            <Text style={s.heroStatLabel}>Days</Text>
          </View>
          <View style={s.heroDivider} />
          <View style={s.heroStat}>
            <Text style={s.heroStatValue}>$2,400</Text>
            <Text style={s.heroStatLabel}>Budget</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabsScroll} contentContainerStyle={s.tabsContent}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab} style={[s.tab, activeTab === i && s.tabActive]} onPress={() => setActiveTab(i)} activeOpacity={0.8}>
            <Text style={[s.tabText, activeTab === i && s.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Members Tab */}
      {activeTab === 1 && (
        <View style={s.section}>
          {MEMBERS.map((m) => (
            <BlurView key={m.id} intensity={15} tint="dark" style={s.memberCard}>
              <View style={[s.memberAvatar, m.id === '1' && s.memberAvatarOrg]}>
                <Text style={s.memberInitials}>{m.initials}</Text>
              </View>
              <View style={s.memberInfo}>
                <Text style={s.memberName}>{m.name}</Text>
                <Text style={s.memberRole}>{m.role}</Text>
              </View>
              <View style={[s.statusBadge, m.status === 'confirmed' ? s.statusConfirmed : s.statusPending]}>
                <MaterialIcons name={m.status === 'confirmed' ? 'check-circle' : 'schedule'} size={12} color={m.status === 'confirmed' ? DS.success : DS.warning} />
                <Text style={[s.statusText, { color: m.status === 'confirmed' ? DS.success : DS.warning }]}>
                  {m.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </Text>
              </View>
            </BlurView>
          ))}
          <TouchableOpacity style={s.inviteMoreBtn} onPress={() => router.push('/(social)/group-invite' as any)} activeOpacity={0.8}>
            <MaterialIcons name="add" size={18} color={DS.purple} />
            <Text style={s.inviteMoreText}>Invite More</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Overview Tab */}
      {activeTab === 0 && (
        <View style={s.section}>
          <BlurView intensity={15} tint="dark" style={s.overviewCard}>
            <Text style={s.overviewTitle}>Trip Progress</Text>
            <View style={s.progressRow}>
              <Text style={s.progressLabel}>Flights</Text>
              <View style={s.progressBarBg}><View style={[s.progressBarFill, { width: '100%', backgroundColor: DS.success }]} /></View>
              <Text style={s.progressStatus}>Booked</Text>
            </View>
            <View style={s.progressRow}>
              <Text style={s.progressLabel}>Hotel</Text>
              <View style={s.progressBarBg}><View style={[s.progressBarFill, { width: '100%', backgroundColor: DS.success }]} /></View>
              <Text style={s.progressStatus}>Booked</Text>
            </View>
            <View style={s.progressRow}>
              <Text style={s.progressLabel}>Activities</Text>
              <View style={s.progressBarBg}><View style={[s.progressBarFill, { width: '60%', backgroundColor: DS.warning }]} /></View>
              <Text style={s.progressStatus}>3/5 done</Text>
            </View>
          </BlurView>

          <TouchableOpacity style={s.ctaWrap} onPress={() => router.push('/(social)/shared-wishlist' as any)} activeOpacity={0.85}>
            <LinearGradient colors={DS.gradient} style={s.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <MaterialIcons name="favorite" size={18} color={DS.white} />
              <Text style={s.ctaText}>View Shared Wishlist</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Expenses Tab */}
      {activeTab === 2 && (
        <View style={s.section}>
          <TouchableOpacity style={s.ctaWrap} onPress={() => router.push('/(tabs)/split-payment' as any)} activeOpacity={0.85}>
            <LinearGradient colors={DS.gradient} style={s.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <MaterialIcons name="calculate" size={18} color={DS.white} />
              <Text style={s.ctaText}>Open Split Payment</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Chat Tab */}
      {activeTab === 3 && (
        <View style={s.section}>
          <TouchableOpacity style={s.ctaWrap} onPress={() => router.push('/(social)/messages' as any)} activeOpacity={0.85}>
            <LinearGradient colors={DS.gradient} style={s.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <MaterialIcons name="chat" size={18} color={DS.white} />
              <Text style={s.ctaText}>Open Group Chat</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(100,67,244,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: DS.border },
  heroBanner: { marginHorizontal: 20, marginBottom: 20, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: DS.border },
  heroDestination: { fontSize: 20, fontFamily: 'Chillax-Bold', color: DS.white, marginBottom: 4 },
  heroDates: { fontSize: 13, fontFamily: 'Satoshi-Regular', color: DS.muted, marginBottom: 16 },
  heroStats: { flexDirection: 'row', alignItems: 'center' },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatValue: { fontSize: 20, fontFamily: 'Chillax-Bold', color: DS.white },
  heroStatLabel: { fontSize: 11, fontFamily: 'Satoshi-Medium', color: DS.muted },
  heroDivider: { width: 1, height: 32, backgroundColor: DS.border },
  tabsScroll: { marginBottom: 16 },
  tabsContent: { paddingHorizontal: 20, gap: 8 },
  tab: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: DS.border, backgroundColor: DS.surface },
  tabActive: { backgroundColor: DS.purple, borderColor: DS.purple },
  tabText: { fontSize: 13, fontFamily: 'Satoshi-Medium', color: DS.muted },
  tabTextActive: { color: DS.white, fontFamily: 'Satoshi-Bold' },
  section: { paddingHorizontal: 20, gap: 12 },
  memberCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: DS.border, overflow: 'hidden', gap: 12 },
  memberAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(100,67,244,0.25)', justifyContent: 'center', alignItems: 'center' },
  memberAvatarOrg: { backgroundColor: 'rgba(249,68,152,0.25)' },
  memberInitials: { fontSize: 16, fontFamily: 'Chillax-Bold', color: DS.white },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 15, fontFamily: 'Satoshi-Bold', color: DS.white },
  memberRole: { fontSize: 12, fontFamily: 'Satoshi-Regular', color: DS.muted },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  statusConfirmed: { backgroundColor: 'rgba(2,166,92,0.1)', borderColor: 'rgba(2,166,92,0.3)' },
  statusPending: { backgroundColor: 'rgba(255,147,39,0.1)', borderColor: 'rgba(255,147,39,0.3)' },
  statusText: { fontSize: 11, fontFamily: 'Satoshi-Bold' },
  inviteMoreBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: DS.border, borderStyle: 'dashed' },
  inviteMoreText: { fontSize: 14, fontFamily: 'Satoshi-Medium', color: DS.purple },
  overviewCard: { borderRadius: 16, padding: 18, borderWidth: 1, borderColor: DS.border, overflow: 'hidden', gap: 12 },
  overviewTitle: { fontSize: 16, fontFamily: 'Chillax-Bold', color: DS.white, marginBottom: 4 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressLabel: { width: 70, fontSize: 13, fontFamily: 'Satoshi-Medium', color: DS.muted },
  progressBarBg: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3 },
  progressBarFill: { height: 6, borderRadius: 3 },
  progressStatus: { width: 60, fontSize: 11, fontFamily: 'Satoshi-Bold', color: DS.white, textAlign: 'right' },
  ctaWrap: { borderRadius: 16, overflow: 'hidden' },
  cta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  ctaText: { fontSize: 16, fontFamily: 'Satoshi-Bold', color: DS.white },
});
