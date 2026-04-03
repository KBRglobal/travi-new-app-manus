// Screen 65 — Camera Denied — STATIC WIREFRAME
// Inline in KYC context
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function CameraDeniedScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Verify Identity</Text>
        <View style={{ width: 32 }} />
      </View>
      <View style={s.content}>
        <View style={s.iconWrap}><Text style={s.icon}>📷</Text><Text style={s.iconX}>✕</Text></View>
        <Text style={s.title}>Camera Access Required</Text>
        <Text style={s.body}>We need camera access to scan your ID document. Please enable it in your device settings.</Text>
        <Pressable style={s.settingsBtn}><Text style={s.settingsText}>Open Settings</Text></Pressable>
        <Pressable style={s.uploadBtn}><Text style={s.uploadText}>Upload from Gallery Instead</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  iconWrap: { width: 120, height: 120, borderRadius: 30, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  icon: { fontSize: 48 },
  iconX: { position: "absolute", bottom: 20, right: 28, color: "#F87171", fontSize: 20 },
  title: { color: "#FFF", fontSize: 20, fontWeight: "800", textAlign: "center" },
  body: { color: "#888", fontSize: 14, textAlign: "center", lineHeight: 22, marginTop: 8 },
  settingsBtn: { marginTop: 24, height: 48, paddingHorizontal: 32, borderRadius: 24, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  settingsText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  uploadBtn: { marginTop: 12 },
  uploadText: { color: "#888", fontSize: 14 },
});
