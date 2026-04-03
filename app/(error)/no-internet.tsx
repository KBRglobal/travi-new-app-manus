// Screen 60 — No Internet — STATIC WIREFRAME
// Full screen overlay, cloud-off icon 120px, Retry button
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function NoInternetScreen() {
  return (
    <View style={s.root}>
      <View style={s.iconWrap}><Text style={s.icon}>☁</Text><Text style={s.iconX}>✕</Text></View>
      <Text style={s.title}>No Internet Connection</Text>
      <Text style={s.body}>Please check your connection and try again. Some features may be available offline.</Text>
      <Pressable style={s.retryBtn}><Text style={s.retryText}>Retry</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center", padding: 40 },
  iconWrap: { width: 120, height: 120, borderRadius: 30, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  icon: { color: "#555", fontSize: 48 },
  iconX: { position: "absolute", bottom: 20, right: 28, color: "#F87171", fontSize: 20 },
  title: { color: "#FFF", fontSize: 22, fontWeight: "800", textAlign: "center" },
  body: { color: "#888", fontSize: 14, textAlign: "center", lineHeight: 22, marginTop: 8 },
  retryBtn: { marginTop: 24, height: 48, paddingHorizontal: 32, borderRadius: 24, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  retryText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
});
