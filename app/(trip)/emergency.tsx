// Screen 42 — Emergency Contacts — STATIC WIREFRAME
// Alert banner 100px red, Contact cards 88px (Call + Message), Share Location card 120px
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const CONTACTS = [
  { title: "Local Police", number: "110", type: "Emergency" },
  { title: "Ambulance", number: "118", type: "Emergency" },
  { title: "Fire Department", number: "113", type: "Emergency" },
  { title: "Israeli Embassy", number: "+62 21 524 0150", type: "Embassy" },
  { title: "The Mulia Resort", number: "+62 361 301 7777", type: "Hotel" },
  { title: "Travel Insurance", number: "+44 20 1234 5678", type: "Insurance" },
];

export default function EmergencyScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Emergency</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Alert banner — 100px */}
        <View style={s.alertBanner}>
          <Text style={s.alertIcon}>!</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.alertTitle}>Emergency Assistance</Text>
            <Text style={s.alertSub}>Tap any contact to call immediately. For life-threatening emergencies, call 112.</Text>
          </View>
        </View>

        {/* Contact cards — 88px each */}
        {CONTACTS.map((c, i) => (
          <View key={i} style={s.contactCard}>
            <View style={s.contactIcon}><Text style={s.contactIconText}>{c.type[0]}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.contactTitle}>{c.title}</Text>
              <Text style={s.contactNumber}>{c.number}</Text>
              <Text style={s.contactType}>{c.type}</Text>
            </View>
            <Pressable style={s.callBtn}><Text style={s.callText}>Call</Text></Pressable>
            <Pressable style={s.msgBtn}><Text style={s.msgText}>Msg</Text></Pressable>
          </View>
        ))}

        {/* Share Location card — 120px */}
        <View style={s.shareCard}>
          <Text style={s.shareTitle}>Share Your Location</Text>
          <Text style={s.shareSub}>Send your current GPS coordinates to emergency contacts or family members</Text>
          <Pressable style={s.shareBtn}><Text style={s.shareBtnText}>Share Location Now</Text></Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  alertBanner: { flexDirection: "row", margin: 20, padding: 16, height: 100, borderRadius: 14, backgroundColor: "#2A1515", borderWidth: 1, borderColor: "#F87171", gap: 12, alignItems: "center" },
  alertIcon: { color: "#F87171", fontSize: 24, fontWeight: "800" },
  alertTitle: { color: "#F87171", fontSize: 16, fontWeight: "700" },
  alertSub: { color: "#F8717180", fontSize: 12, marginTop: 4, lineHeight: 18 },
  contactCard: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 8, padding: 14, height: 88, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", gap: 10 },
  contactIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  contactIconText: { color: "#888", fontSize: 16, fontWeight: "700" },
  contactTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  contactNumber: { color: "#BBB", fontSize: 13, marginTop: 2 },
  contactType: { color: "#888", fontSize: 11, marginTop: 2 },
  callBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: "#333" },
  callText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  msgBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#333" },
  msgText: { color: "#888", fontSize: 12 },
  shareCard: { margin: 20, padding: 20, height: 120, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center" },
  shareTitle: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  shareSub: { color: "#888", fontSize: 12, marginTop: 4, lineHeight: 18 },
  shareBtn: { marginTop: 10, alignSelf: "flex-start", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: "#333" },
  shareBtnText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
});
