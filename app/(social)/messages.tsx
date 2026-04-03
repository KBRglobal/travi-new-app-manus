// @ts-nocheck
import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  TextInput, Image, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  dnaType: string;
  dnaColor: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CONVERSATIONS: Conversation[] = [
  {
    id: "1", name: "Maya Rosen", online: true, unread: 3,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    lastMessage: "Are you also going to Tokyo in March? Would love to meet up!",
    time: "2m ago", dnaType: "Explorer", dnaColor: BRAND.purple,
  },
  {
    id: "2", name: "Lior Cohen", online: false, unread: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    lastMessage: "That hiking trail in Kyoto was absolutely insane",
    time: "1h ago", dnaType: "Adventurer", dnaColor: BRAND.orange,
  },
  {
    id: "3", name: "Noa Levy", online: true, unread: 1,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    lastMessage: "I found the most amazing hidden museum in Rome",
    time: "3h ago", dnaType: "Culturalist", dnaColor: BRAND.cyan,
  },
  {
    id: "4", name: "Avi Shapiro", online: false, unread: 0,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    lastMessage: "The ramen place I told you about — 10/10, no question",
    time: "Yesterday", dnaType: "Foodie", dnaColor: BRAND.pink,
  },
  {
    id: "5", name: "Tamar Ben-David", online: false, unread: 0,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    lastMessage: "Santorini sunset was everything. Thanks for the recommendation!",
    time: "2 days ago", dnaType: "Relaxer", dnaColor: BRAND.green,
  },
];

// ─── Conversation Row ─────────────────────────────────────────────────────────
function ConversationRow({ item }: { item: Conversation }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push({ pathname: "/(social)/message-chat", params: { conversationId: item.id, name: item.name } });
      }}
      activeOpacity={0.8}
    >
      <View style={styles.avatarWrap}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.rowContent}>
        <View style={styles.rowHeader}>
          <Text style={[styles.rowName, item.unread > 0 && styles.rowNameBold]}>{item.name}</Text>
          <Text style={styles.rowTime}>{item.time}</Text>
        </View>
        <View style={styles.rowFooter}>
          <Text style={[styles.rowMessage, item.unread > 0 && styles.rowMessageBold]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
        <View style={[styles.dnaPill, { borderColor: item.dnaColor + "50" }]}>
          <Text style={[styles.dnaText, { color: item.dnaColor }]}>{item.dnaType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function MessagesScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const filtered = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[BRAND.bgDeep, BRAND.bgOverlay]} style={StyleSheet.absoluteFillObject} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color={BRAND.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Messages</Text>
          <Text style={styles.headerSub}>{CONVERSATIONS.filter(c => c.unread > 0).length} unread</Text>
        </View>
        <TouchableOpacity style={styles.newBtn} onPress={() => router.push("/(social)/discover")}>
          <IconSymbol name="plus" size={20} color={BRAND.purple} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={16} color={BRAND.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={BRAND.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Online travelers */}
      <View style={styles.onlineSection}>
        <Text style={styles.onlineLabel}>Online Now</Text>
        <View style={styles.onlineRow}>
          {CONVERSATIONS.filter(c => c.online).map(c => (
            <TouchableOpacity
              key={c.id}
              style={styles.onlineAvatar}
              onPress={() => router.push({ pathname: "/(social)/message-chat", params: { conversationId: c.id, name: c.name } })}
            >
              <Image source={{ uri: c.avatar }} style={styles.onlineAvatarImg} />
              <View style={styles.onlineDotSmall} />
              <Text style={styles.onlineName} numberOfLines={1}>{c.name.split(" ")[0]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ConversationRow item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <IconSymbol name="message.fill" size={40} color={BRAND.textMuted} />
            <Text style={styles.emptyText}>No conversations yet</Text>
            <TouchableOpacity style={styles.discoverBtn} onPress={() => router.push("/(social)/discover")}>
              <Text style={styles.discoverBtnText}>Discover Travelers</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 20, paddingVertical: 16 },
  backBtn: { padding: 4 },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary },
  headerSub: { ...TYPE.small, color: BRAND.textSecondary, marginTop: 1 },
  newBtn: { marginLeft: "auto", width: 40, height: 40, borderRadius: 20, backgroundColor: BRAND.purple + "20", alignItems: "center", justifyContent: "center" },
  searchContainer: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 20, marginBottom: 16, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: RADIUS.md, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: BRAND.border },
  searchInput: { flex: 1, ...TYPE.body, color: BRAND.textPrimary },

  onlineSection: { paddingHorizontal: 20, marginBottom: 16 },
  onlineLabel: { ...TYPE.label, color: BRAND.textSecondary, marginBottom: 10 },
  onlineRow: { flexDirection: "row", gap: 16 },
  onlineAvatar: { alignItems: "center", gap: 4, position: "relative" },
  onlineAvatarImg: { width: 48, height: 48, borderRadius: 24, backgroundColor: BRAND.bgCard },
  onlineDotSmall: { position: "absolute", top: 34, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: BRAND.green, borderWidth: 2, borderColor: BRAND.bgDeep },
  onlineName: { ...TYPE.caption, color: BRAND.textSecondary, maxWidth: 48 },

  listContent: { paddingHorizontal: 20, paddingBottom: 130 },
  separator: { height: 1, backgroundColor: BRAND.border, marginLeft: 74 },

  row: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 12 },
  avatarWrap: { position: "relative" },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: BRAND.bgCard },
  onlineDot: { position: "absolute", bottom: 1, right: 1, width: 12, height: 12, borderRadius: 6, backgroundColor: BRAND.green, borderWidth: 2, borderColor: BRAND.bgDeep },
  rowContent: { flex: 1, gap: 3 },
  rowHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowName: { ...TYPE.body, color: BRAND.textPrimary },
  rowNameBold: { fontFamily: "Satoshi-Bold" },
  rowTime: { ...TYPE.caption, color: BRAND.textMuted },
  rowFooter: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowMessage: { flex: 1, ...TYPE.small, color: BRAND.textSecondary },
  rowMessageBold: { color: BRAND.textPrimary, fontFamily: "Satoshi-Bold" },
  unreadBadge: { minWidth: 20, height: 20, borderRadius: 10, backgroundColor: BRAND.purple, alignItems: "center", justifyContent: "center", paddingHorizontal: 5 },
  unreadText: { ...TYPE.caption, fontFamily: "Satoshi-Bold", color: "#fff" },
  dnaPill: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 1, backgroundColor: "transparent" },
  dnaText: { ...TYPE.caption },

  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: { ...TYPE.body, color: BRAND.textSecondary },
  discoverBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: BRAND.purple },
  discoverBtnText: { ...TYPE.label, color: "#fff" },
});
