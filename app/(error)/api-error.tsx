// Screen 61 — API Error — STATIC WIREFRAME
// Warning triangle 120px, Try Again + Contact Support
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ApiErrorScreen() {
  return (
    <View style={s.root}>
      <View style={s.iconWrap}><Text style={s.icon}>⚠</Text></View>
      <Text style={s.title}>Something Went Wrong</Text>
      <Text style={s.body}>We're having trouble connecting to our servers. Please try again in a moment.</Text>
      <Pressable style={s.primaryBtn}><Text style={s.primaryText}>Try Again</Text></Pressable>
      <Pressable style={s.secondaryBtn}><Text style={s.secondaryText}>Contact Support</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center", padding: 40 },
  iconWrap: { width: 120, height: 120, borderRadius: 30, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  icon: { color: "#FBBF24", fontSize: 48 },
  title: { color: "#FFF", fontSize: 22, fontWeight: "800", textAlign: "center" },
  body: { color: "#888", fontSize: 14, textAlign: "center", lineHeight: 22, marginTop: 8 },
  primaryBtn: { marginTop: 24, height: 48, paddingHorizontal: 32, borderRadius: 24, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  primaryText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  secondaryBtn: { marginTop: 12 },
  secondaryText: { color: "#888", fontSize: 14 },
});
