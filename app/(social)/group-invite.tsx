import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const SUGGESTED = [
  { id: '1', name: 'Sarah M.', handle: '@sarah_travels', match: 94 },
  { id: '2', name: 'David K.', handle: '@david_k', match: 88 },
  { id: '3', name: 'Emma L.', handle: '@emma_l', match: 82 },
  { id: '4', name: 'James R.', handle: '@james_r', match: 79 },
];

export default function GroupInviteScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [invited, setInvited] = useState<string[]>([]);

  const toggle = (id: string) => {
    setInvited((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <ScreenWrapper title="Invite to Group Trip" scrollable>
      {/* Search */}
      <View style={s.searchWrap}>
        <MaterialIcons name="search" size={18} color={DS.muted} style={s.searchIcon} />
        <TextInput
          style={s.searchInput}
          placeholder="Search travelers..."
          placeholderTextColor={DS.placeholder}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Invited count */}
      {invited.length > 0 && (
        <View style={s.invitedBanner}>
          <MaterialIcons name="group" size={16} color={DS.purple} />
          <Text style={s.invitedText}>{invited.length} traveler{invited.length > 1 ? 's' : ''} invited</Text>
        </View>
      )}

      {/* Suggested */}
      <Text style={s.sectionTitle}>Suggested Travelers</Text>
      {SUGGESTED.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase())).map((person) => {
        const isInvited = invited.includes(person.id);
        return (
          <BlurView key={person.id} intensity={15} tint="dark" style={s.card}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{person.name[0]}</Text>
            </View>
            <View style={s.info}>
              <Text style={s.name}>{person.name}</Text>
              <Text style={s.handle}>{person.handle}</Text>
            </View>
            <View style={s.matchBadge}>
              <Text style={s.matchText}>{person.match}% match</Text>
            </View>
            <TouchableOpacity
              style={[s.inviteBtn, isInvited && s.invitedBtn]}
              onPress={() => toggle(person.id)}
              activeOpacity={0.8}
            >
              <MaterialIcons name={isInvited ? 'check' : 'person-add'} size={16} color={isInvited ? DS.success : DS.white} />
            </TouchableOpacity>
          </BlurView>
        );
      })}

      {/* Send Invites CTA */}
      {invited.length > 0 && (
        <TouchableOpacity
          style={s.ctaWrap}
          onPress={() => router.push('/(social)/group' as any)}
          activeOpacity={0.85}
        >
          <LinearGradient colors={DS.gradient} style={s.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <MaterialIcons name="send" size={18} color={DS.white} />
            <Text style={s.ctaText}>Send {invited.length} Invite{invited.length > 1 ? 's' : ''}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  searchWrap: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 16, backgroundColor: DS.surface, borderRadius: 14, borderWidth: 1, borderColor: DS.border, paddingHorizontal: 14 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 46, fontSize: 15, fontFamily: 'Satoshi-Regular', color: DS.white },
  invitedBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginBottom: 16, padding: 12, borderRadius: 12, backgroundColor: 'rgba(100,67,244,0.15)', borderWidth: 1, borderColor: DS.border },
  invitedText: { fontSize: 14, fontFamily: 'Satoshi-Medium', color: DS.purple },
  sectionTitle: { fontSize: 16, fontFamily: 'Chillax-Bold', color: DS.white, marginHorizontal: 20, marginBottom: 12 },
  card: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 10, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: DS.border, overflow: 'hidden', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(100,67,244,0.3)', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontFamily: 'Chillax-Bold', color: DS.white },
  info: { flex: 1 },
  name: { fontSize: 15, fontFamily: 'Satoshi-Bold', color: DS.white },
  handle: { fontSize: 12, fontFamily: 'Satoshi-Regular', color: DS.muted },
  matchBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, backgroundColor: 'rgba(100,67,244,0.15)', borderWidth: 1, borderColor: DS.border },
  matchText: { fontSize: 11, fontFamily: 'Satoshi-Bold', color: DS.purple },
  inviteBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: DS.purple, justifyContent: 'center', alignItems: 'center' },
  invitedBtn: { backgroundColor: 'rgba(2,166,92,0.2)', borderWidth: 1, borderColor: DS.success },
  ctaWrap: { marginHorizontal: 20, marginTop: 20, marginBottom: 10, borderRadius: 16, overflow: 'hidden' },
  cta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  ctaText: { fontSize: 16, fontFamily: 'Satoshi-Bold', color: DS.white },
});
