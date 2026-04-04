import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';

const PRIVACY_SETTINGS = [
  { id: 'show_profile', label: 'Show my profile to travelers', sub: 'Let others discover and connect with you', defaultOn: true },
  { id: 'show_trips', label: 'Share my trips publicly', sub: 'Others can see your travel history', defaultOn: false },
  { id: 'show_dna', label: 'Show Travel DNA score', sub: 'Display your compatibility score', defaultOn: true },
  { id: 'allow_messages', label: 'Allow messages from matches', sub: 'Only matched travelers can message you', defaultOn: true },
];

const NOTIFICATION_SETTINGS = [
  { id: 'new_match', label: 'New travel matches', sub: 'When someone matches your DNA', defaultOn: true },
  { id: 'messages', label: 'New messages', sub: 'Chat notifications', defaultOn: true },
  { id: 'group_invite', label: 'Group trip invites', sub: 'When someone invites you to a group', defaultOn: true },
  { id: 'community', label: 'Community activity', sub: 'Likes and comments on your posts', defaultOn: false },
];

export default function SocialSettingsScreen() {
  const router = useRouter();
  const [privacy, setPrivacy] = useState<Record<string, boolean>>(
    Object.fromEntries(PRIVACY_SETTINGS.map((s) => [s.id, s.defaultOn]))
  );
  const [notifs, setNotifs] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_SETTINGS.map((s) => [s.id, s.defaultOn]))
  );

  return (
    <ScreenWrapper title="Social Settings" scrollable>
      {/* Privacy Section */}
      <Text style={s.sectionTitle}>Privacy</Text>
      <BlurView intensity={15} tint="dark" style={s.group}>
        {PRIVACY_SETTINGS.map((setting, i) => (
          <View key={setting.id}>
            <View style={s.row}>
              <View style={s.rowInfo}>
                <Text style={s.rowLabel}>{setting.label}</Text>
                <Text style={s.rowSub}>{setting.sub}</Text>
              </View>
              <Switch
                value={privacy[setting.id]}
                onValueChange={(v) => setPrivacy((p) => ({ ...p, [setting.id]: v }))}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: DS.purple }}
                thumbColor={DS.white}
              />
            </View>
            {i < PRIVACY_SETTINGS.length - 1 && <View style={s.divider} />}
          </View>
        ))}
      </BlurView>

      {/* Notifications Section */}
      <Text style={s.sectionTitle}>Notifications</Text>
      <BlurView intensity={15} tint="dark" style={s.group}>
        {NOTIFICATION_SETTINGS.map((setting, i) => (
          <View key={setting.id}>
            <View style={s.row}>
              <View style={s.rowInfo}>
                <Text style={s.rowLabel}>{setting.label}</Text>
                <Text style={s.rowSub}>{setting.sub}</Text>
              </View>
              <Switch
                value={notifs[setting.id]}
                onValueChange={(v) => setNotifs((p) => ({ ...p, [setting.id]: v }))}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: DS.purple }}
                thumbColor={DS.white}
              />
            </View>
            {i < NOTIFICATION_SETTINGS.length - 1 && <View style={s.divider} />}
          </View>
        ))}
      </BlurView>

      {/* Blocked Users */}
      <Text style={s.sectionTitle}>Account</Text>
      <BlurView intensity={15} tint="dark" style={s.group}>
        <TouchableOpacity style={s.row} activeOpacity={0.75} onPress={() => router.push('/(settings)/privacy-security' as any)}>
          <View style={s.rowInfo}>
            <Text style={s.rowLabel}>Blocked Travelers</Text>
            <Text style={s.rowSub}>Manage who you've blocked</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
        </TouchableOpacity>
        <View style={s.divider} />
        <TouchableOpacity style={s.row} activeOpacity={0.75} onPress={() => router.push('/(settings)/privacy-security' as any)}>
          <View style={s.rowInfo}>
            <Text style={s.rowLabel}>Connected Accounts</Text>
            <Text style={s.rowSub}>Instagram, Facebook</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
        </TouchableOpacity>
        <View style={s.divider} />
        <TouchableOpacity style={[s.row, s.dangerRow]} activeOpacity={0.75} onPress={() => router.push('/(special)/delete-account' as any)}>
          <View style={s.rowInfo}>
            <Text style={[s.rowLabel, s.dangerText]}>Deactivate Social Profile</Text>
            <Text style={s.rowSub}>Hide your profile from all travelers</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={DS.error} />
        </TouchableOpacity>
      </BlurView>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontFamily: 'Chillax-Bold', color: DS.white, marginHorizontal: 20, marginBottom: 10, marginTop: 8 },
  group: { marginHorizontal: 20, marginBottom: 20, borderRadius: 16, borderWidth: 1, borderColor: DS.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rowInfo: { flex: 1 },
  rowLabel: { fontSize: 14, fontFamily: 'Satoshi-Medium', color: DS.white, marginBottom: 2 },
  rowSub: { fontSize: 12, fontFamily: 'Satoshi-Regular', color: DS.muted },
  divider: { height: 1, backgroundColor: DS.border, marginHorizontal: 16 },
  dangerRow: {},
  dangerText: { color: DS.error },
});
