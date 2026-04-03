// Screen 41 — AI Chat — STATIC WIREFRAME
// Swipe handle + title, Message bubbles (AI left 40px avatar, User right), Quick chips, Input 72px + mic + send
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const MESSAGES = [
  { from: "ai", text: "Hi! I'm your TRAVI assistant. I can help with restaurant recommendations, directions, translations, and anything else during your trip. What do you need?" },
  { from: "user", text: "What's a good restaurant near Ubud for dinner tonight?" },
  { from: "ai", text: "Great question! Here are my top 3 picks near Ubud:\n\n1. Locavore — Fine dining, farm-to-table (E45/person)\n2. Sardine — Seafood in rice paddies (E30/person)\n3. Hujan Locale — Indonesian fusion (E25/person)\n\nWould you like me to make a reservation?" },
  { from: "user", text: "Sardine sounds great, can you book for 2 at 7pm?" },
  { from: "ai", text: "I'll check availability at Sardine for 2 guests at 7:00 PM tonight. One moment..." },
];

const QUICK_CHIPS = ["Translate something", "Find nearby ATM", "Weather update", "Call hotel"];

export default function AIChatScreen() {
  return (
    <View style={s.root}>
      {/* Handle + header */}
      <View style={s.handleArea}>
        <View style={s.handle} />
      </View>
      <View style={s.header}>
        <Text style={s.headerTitle}>AI Assistant</Text>
        <Pressable><Text style={s.closeText}>X</Text></Pressable>
      </View>

      {/* Messages */}
      <ScrollView style={s.messages} contentContainerStyle={{ paddingBottom: 20 }}>
        {MESSAGES.map((msg, i) => (
          <View key={i} style={[s.msgRow, msg.from === "user" && s.msgRowUser]}>
            {msg.from === "ai" && (
              <View style={s.avatar}><Text style={s.avatarText}>T</Text></View>
            )}
            <View style={[s.bubble, msg.from === "user" ? s.bubbleUser : s.bubbleAI]}>
              <Text style={[s.msgText, msg.from === "user" && s.msgTextUser]}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Quick chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipsRow}>
        {QUICK_CHIPS.map((chip) => (
          <Pressable key={chip} style={s.chip}>
            <Text style={s.chipText}>{chip}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Input — 72px */}
      <View style={s.inputBar}>
        <View style={s.inputField}><Text style={s.inputPlaceholder}>Type a message...</Text></View>
        <Pressable style={s.micBtn}><Text style={s.micText}>M</Text></Pressable>
        <Pressable style={s.sendBtn}><Text style={s.sendText}>{">"}</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  handleArea: { alignItems: "center", paddingTop: 8 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#444" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#222", marginTop: 40 },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  closeText: { color: "#888", fontSize: 18 },
  messages: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  msgRow: { flexDirection: "row", marginBottom: 12, gap: 8 },
  msgRowUser: { justifyContent: "flex-end" },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#888", fontSize: 16, fontWeight: "700" },
  bubble: { maxWidth: "75%", padding: 14, borderRadius: 16 },
  bubbleAI: { backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", borderTopLeftRadius: 4 },
  bubbleUser: { backgroundColor: "#333", borderTopRightRadius: 4 },
  msgText: { color: "#DDD", fontSize: 14, lineHeight: 22 },
  msgTextUser: { color: "#FFF" },
  chipsRow: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  chipText: { color: "#888", fontSize: 13 },
  inputBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 36, gap: 8, borderTopWidth: 1, borderTopColor: "#222", height: 72 },
  inputField: { flex: 1, height: 44, borderRadius: 22, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", paddingHorizontal: 16 },
  inputPlaceholder: { color: "#555", fontSize: 14 },
  micBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  micText: { color: "#888", fontSize: 14, fontWeight: "700" },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#333", justifyContent: "center", alignItems: "center" },
  sendText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});
