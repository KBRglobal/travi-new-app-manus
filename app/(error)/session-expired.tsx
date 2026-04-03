// Screen 63 — Session Expired — STATIC WIREFRAME
// Modal, cannot dismiss, must sign in
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SessionExpiredScreen() {
  return (
    <View style={s.root}>
      <View style={s.overlay} />
      <View style={s.modal}>
        <View style={s.iconWrap}><Text style={s.icon}>🔒</Text></View>
        <Text style={s.title}>Session Expired</Text>
        <Text style={s.body}>Your session has expired for security reasons. Please sign in again to continue.</Text>
        <Pressable style={s.signInBtn}><Text style={s.signInText}>Sign In</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "#000", opacity: 0.8 },
  modal: { width: "100%", borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 24, alignItems: "center" },
  iconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#222", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  icon: { fontSize: 28 },
  title: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  body: { color: "#888", fontSize: 14, textAlign: "center", lineHeight: 22, marginTop: 8 },
  signInBtn: { marginTop: 20, width: "100%", height: 48, borderRadius: 24, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  signInText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
});
