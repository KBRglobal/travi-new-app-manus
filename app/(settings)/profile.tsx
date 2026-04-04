import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const STATS = [
  { label: 'Trips', value: '12', icon: 'flight-takeoff' as const },
  { label: 'Countries', value: '8', icon: 'public' as const },
  { label: 'Points', value: '4.2K', icon: 'star' as const },
  { label: 'Reviews', value: '24', icon: 'rate-review' as const },
];

const MENU_ITEMS = [
  { icon: 'edit' as const, label: 'Edit Profile', route: '/(settings)/edit-profile' },
  { icon: 'lock' as const, label: 'Change Password', route: '/(settings)/change-password' },
  { icon: 'notifications' as const, label: 'Notifications', route: '/(settings)/notifications' },
  { icon: 'privacy-tip' as const, label: 'Privacy & Security', route: '/(settings)/privacy-security' },
  { icon: 'language' as const, label: 'Language', route: '/(settings)/language-selector' },
  { icon: 'attach-money' as const, label: 'Currency', route: '/(settings)/currency-selector' },
  { icon: 'emergency' as const, label: 'Emergency Contacts', route: '/(settings)/emergency' },
];

export default function ProfileSettingsScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper title="My Profile" scrollable>
      {/* Avatar Section */}
      <View style={s.avatarSection}>
        <LinearGradient
          colors={DS.gradient}
          style={s.avatarRing}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={s.avatarInner}>
            <Text style={s.avatarText}>AC</Text>
          </View>
        </LinearGradient>
        <Text style={s.name}>Amit Cohen</Text>
        <Text style={s.email}>amit@example.com</Text>
        <View style={s.dnaTag}>
          <MaterialIcons name="auto-awesome" size={12} color={DS.purple} />
          <Text style={s.dnaText}>Explorer DNA</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={s.statsRow}>
        {STATS.map((stat) => (
          <BlurView key={stat.label} intensity={20} tint="dark" style={s.statCard}>
            <MaterialIcons name={stat.icon} size={20} color={DS.purple} />
            <Text style={s.statValue}>{stat.value}</Text>
            <Text style={s.statLabel}>{stat.label}</Text>
          </BlurView>
        ))}
      </View>

      {/* Menu Items */}
      <View style={s.menuSection}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={s.menuItem}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.75}
          >
            <View style={s.menuIconWrap}>
              <MaterialIcons name={item.icon} size={20} color={DS.purple} />
            </View>
            <Text style={s.menuLabel}>{item.label}</Text>
            <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={s.signOut} onPress={() => router.replace('/(auth)/welcome' as any)} activeOpacity={0.75}>
        <MaterialIcons name="logout" size={18} color={DS.error} />
        <Text style={s.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  avatarSection: { alignItems: 'center', paddingVertical: 28 },
  avatarRing: { width: 96, height: 96, borderRadius: 48, padding: 3, marginBottom: 14 },
  avatarInner: { flex: 1, borderRadius: 45, backgroundColor: DS.bg, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 32, fontFamily: 'Chillax-Bold', color: DS.white },
  name: { fontSize: 22, fontFamily: 'Chillax-Bold', color: DS.white, marginBottom: 4 },
  email: { fontSize: 14, fontFamily: 'Satoshi-Regular', color: DS.muted, marginBottom: 10 },
  dnaTag: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(100,67,244,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: DS.border },
  dnaText: { fontSize: 12, fontFamily: 'Satoshi-Bold', color: DS.purple },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 24 },
  statCard: { flex: 1, alignItems: 'center', borderRadius: 14, paddingVertical: 14, borderWidth: 1, borderColor: DS.border, overflow: 'hidden', gap: 4 },
  statValue: { fontSize: 18, fontFamily: 'Chillax-Bold', color: DS.white },
  statLabel: { fontSize: 11, fontFamily: 'Satoshi-Medium', color: DS.muted },
  menuSection: { paddingHorizontal: 20, gap: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: DS.border },
  menuIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(100,67,244,0.12)', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  menuLabel: { flex: 1, fontSize: 15, fontFamily: 'Satoshi-Medium', color: DS.white },
  signOut: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 32, marginBottom: 20, paddingVertical: 14, marginHorizontal: 20, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,107,107,0.3)', backgroundColor: 'rgba(255,107,107,0.08)' },
  signOutText: { fontSize: 15, fontFamily: 'Satoshi-Bold', color: DS.error },
});
