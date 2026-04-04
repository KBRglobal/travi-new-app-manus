import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const WISHLIST = [
  { id: '1', name: 'Tanah Lot Temple', type: 'Activity', votes: 3, totalVoters: 4, addedBy: 'You', icon: 'temple-buddhist' as const },
  { id: '2', name: 'Ubud Monkey Forest', type: 'Activity', votes: 4, totalVoters: 4, addedBy: 'Sarah M.', icon: 'park' as const },
  { id: '3', name: 'Seminyak Beach Club', type: 'Restaurant', votes: 2, totalVoters: 4, addedBy: 'David K.', icon: 'beach-access' as const },
  { id: '4', name: 'Mount Batur Sunrise', type: 'Activity', votes: 3, totalVoters: 4, addedBy: 'Emma L.', icon: 'landscape' as const },
  { id: '5', name: 'Jimbaran Seafood', type: 'Restaurant', votes: 4, totalVoters: 4, addedBy: 'You', icon: 'restaurant' as const },
];

export default function SharedWishlistScreen() {
  const router = useRouter();
  const [voted, setVoted] = useState<string[]>([]);

  const toggleVote = (id: string) => {
    setVoted((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <ScreenWrapper title="Shared Wishlist" scrollable
      headerRight={
        <TouchableOpacity style={s.addBtn}>
          <MaterialIcons name="add" size={20} color={DS.purple} />
        </TouchableOpacity>
      }
    >
      {/* Group Info */}
      <BlurView intensity={15} tint="dark" style={s.groupInfo}>
        <View style={s.groupAvatars}>
          {['AC', 'SM', 'DK', 'EL'].map((init, i) => (
            <View key={init} style={[s.groupAvatar, { marginLeft: i > 0 ? -10 : 0, zIndex: 4 - i }]}>
              <Text style={s.groupAvatarText}>{init}</Text>
            </View>
          ))}
        </View>
        <View style={s.groupInfoText}>
          <Text style={s.groupName}>Bali Group Trip</Text>
          <Text style={s.groupSub}>4 travelers · {WISHLIST.length} items</Text>
        </View>
      </BlurView>

      {/* Items */}
      <Text style={s.sectionTitle}>Wishlist Items</Text>
      {WISHLIST.map((item) => {
        const hasVoted = voted.includes(item.id);
        const voteCount = item.votes + (hasVoted ? 1 : 0);
        const votePercent = (voteCount / item.totalVoters) * 100;
        const isUnanimous = voteCount >= item.totalVoters;
        return (
          <BlurView key={item.id} intensity={15} tint="dark" style={[s.card, isUnanimous && s.cardUnanimous]}>
            <View style={[s.iconWrap, { backgroundColor: isUnanimous ? 'rgba(2,166,92,0.2)' : 'rgba(100,67,244,0.15)' }]}>
              <MaterialIcons name={item.icon} size={22} color={isUnanimous ? DS.success : DS.purple} />
            </View>
            <View style={s.cardInfo}>
              <View style={s.cardTopRow}>
                <Text style={s.cardName}>{item.name}</Text>
                {isUnanimous && (
                  <View style={s.unanimousBadge}>
                    <MaterialIcons name="check-circle" size={12} color={DS.success} />
                    <Text style={s.unanimousText}>All in!</Text>
                  </View>
                )}
              </View>
              <Text style={s.cardMeta}>{item.type} · Added by {item.addedBy}</Text>
              <View style={s.voteBar}>
                <View style={[s.voteBarFill, { width: `${votePercent}%` as any, backgroundColor: isUnanimous ? DS.success : DS.purple }]} />
              </View>
              <Text style={s.voteCount}>{voteCount}/{item.totalVoters} votes</Text>
            </View>
            <TouchableOpacity
              style={[s.voteBtn, hasVoted && s.votedBtn]}
              onPress={() => toggleVote(item.id)}
              activeOpacity={0.8}
            >
              <MaterialIcons name={hasVoted ? 'favorite' : 'favorite-border'} size={18} color={hasVoted ? DS.pink : DS.muted} />
            </TouchableOpacity>
          </BlurView>
        );
      })}

      {/* Add to Itinerary */}
      <TouchableOpacity style={s.ctaWrap} onPress={() => router.push('/(trip)/itinerary-builder' as any)} activeOpacity={0.85}>
        <LinearGradient colors={DS.gradient} style={s.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <MaterialIcons name="add-circle" size={18} color={DS.white} />
          <Text style={s.ctaText}>Add Voted Items to Itinerary</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(100,67,244,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: DS.border },
  groupInfo: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 20, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: DS.border, overflow: 'hidden', gap: 12 },
  groupAvatars: { flexDirection: 'row' },
  groupAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(100,67,244,0.3)', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: DS.bg },
  groupAvatarText: { fontSize: 11, fontFamily: 'Chillax-Bold', color: DS.white },
  groupInfoText: { flex: 1 },
  groupName: { fontSize: 15, fontFamily: 'Satoshi-Bold', color: DS.white },
  groupSub: { fontSize: 12, fontFamily: 'Satoshi-Regular', color: DS.muted },
  sectionTitle: { fontSize: 16, fontFamily: 'Chillax-Bold', color: DS.white, marginHorizontal: 20, marginBottom: 12 },
  card: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 10, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: DS.border, overflow: 'hidden', gap: 12 },
  cardUnanimous: { borderColor: 'rgba(2,166,92,0.4)' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1 },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  cardName: { fontSize: 14, fontFamily: 'Satoshi-Bold', color: DS.white, flex: 1 },
  unanimousBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, backgroundColor: 'rgba(2,166,92,0.15)' },
  unanimousText: { fontSize: 10, fontFamily: 'Satoshi-Bold', color: DS.success },
  cardMeta: { fontSize: 11, fontFamily: 'Satoshi-Regular', color: DS.muted, marginBottom: 6 },
  voteBar: { height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 4 },
  voteBarFill: { height: 4, borderRadius: 2 },
  voteCount: { fontSize: 11, fontFamily: 'Satoshi-Medium', color: DS.muted },
  voteBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.06)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: DS.border },
  votedBtn: { backgroundColor: 'rgba(249,68,152,0.15)', borderColor: 'rgba(249,68,152,0.4)' },
  ctaWrap: { marginHorizontal: 20, marginTop: 20, marginBottom: 10, borderRadius: 16, overflow: 'hidden' },
  cta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  ctaText: { fontSize: 16, fontFamily: 'Satoshi-Bold', color: DS.white },
});
