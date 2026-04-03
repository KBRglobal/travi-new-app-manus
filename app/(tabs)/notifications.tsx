// Screen 18 — Notifications — STATIC WIREFRAME
// Route: /(tabs)/notifications | Mode: Universal
// Spec: Header 60px + Mark All Read, Filter tabs, Date-grouped rows (88px min), Swipe-to-delete

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const FILTERS = ["All", "Trips", "Deals", "Social", "System"];

const NOTIFICATIONS = {
  "Today": [
    { id: "1", icon: "✈️", title: "Trip to Bali starts in 3 days!", body: "Don't forget to check your packing list", time: "2h ago", unread: true },
    { id: "2", icon: "💰", title: "Flash Sale: 30% off Tokyo flights", body: "Book before midnight to save €360", time: "4h ago", unread: true },
  ],
  "Yesterday": [
    { id: "3", icon: "🧬", title: "New DNA match found", body: "Santorini is a 94% match for your profile", time: "1d ago", unread: false },
    { id: "4", icon: "⭐", title: "Rate your Dubai trip", body: "Share your experience to earn 50 points", time: "1d ago", unread: false },
  ],
  "This Week": [
    { id: "5", icon: "🎉", title: "Welcome to Gold tier!", body: "You've unlocked exclusive perks and cashback", time: "3d ago", unread: false },
    { id: "6", icon: "📋", title: "Checklist reminder", body: "3 items still pending for your Bali trip", time: "4d ago", unread: false },
    { id: "7", icon: "👥", title: "Sarah joined your trip", body: "Your Paris group trip now has 4 travelers", time: "5d ago", unread: false },
  ],
};

export default function NotificationsScreen() {
  return (
    <View style={s.root}>
      {/* Header — 60px */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>‹</Text></Pressable>
        <Text style={s.headerTitle}>Notifications</Text>
        <Pressable><Text style={s.markAllText}>Mark All Read</Text></Pressable>
      </View>

      {/* Filter tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
        {FILTERS.map((f, i) => (
          <Pressable key={f} style={[s.filterChip, i === 0 && s.filterActive]}>
            <Text style={[s.filterText, i === 0 && s.filterTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Date-grouped rows */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {Object.entries(NOTIFICATIONS).map(([date, items]) => (
          <View key={date}>
            <Text style={s.dateLabel}>{date}</Text>
            {items.map((n) => (
              <Pressable key={n.id} style={[s.notifRow, n.unread && s.notifUnread]}>
                <View style={s.notifIcon}><Text style={{ fontSize: 22 }}>{n.icon}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.notifTitle}>{n.title}</Text>
                  <Text style={s.notifBody} numberOfLines={1}>{n.body}</Text>
                </View>
                <View style={s.notifRight}>
                  <Text style={s.notifTime}>{n.time}</Text>
                  {n.unread && <View style={s.unreadDot} />}
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: {
    height: 60, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, gap: 12, marginTop: 48,
    borderBottomWidth: 1, borderBottomColor: "#222",
  },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600" },
  markAllText: { color: "#888", fontSize: 13 },
  filterRow: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  filterActive: { backgroundColor: "#333", borderColor: "#666" },
  filterText: { color: "#888", fontSize: 13 },
  filterTextActive: { color: "#FFF", fontWeight: "600" },
  dateLabel: { color: "#666", fontSize: 12, fontWeight: "600", letterSpacing: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  notifRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 20, paddingVertical: 14, minHeight: 88,
    borderBottomWidth: 1, borderBottomColor: "#1A1A1A",
  },
  notifUnread: { backgroundColor: "rgba(255,255,255,0.03)" },
  notifIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#1A1A1A", justifyContent: "center", alignItems: "center" },
  notifTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  notifBody: { color: "#888", fontSize: 13, marginTop: 2 },
  notifRight: { alignItems: "flex-end", gap: 6 },
  notifTime: { color: "#666", fontSize: 11 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
});
