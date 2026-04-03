// Screen 64 — GPS Denied — STATIC WIREFRAME
// Banner 56px in Live mode context
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function GpsDeniedScreen() {
  return (
    <View style={s.root}>
      <View style={s.banner}>
        <Text style={s.bannerIcon}>📍</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.bannerTitle}>Location Access Denied</Text>
          <Text style={s.bannerBody}>Enable location for live navigation and nearby recommendations.</Text>
        </View>
        <Pressable style={s.enableBtn}><Text style={s.enableText}>Enable</Text></Pressable>
      </View>
      <View style={s.content}>
        <Text style={s.contentText}>Live Mode features are limited without location access.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  banner: { flexDirection: "row", alignItems: "center", gap: 10, height: 56, paddingHorizontal: 16, backgroundColor: "#FBBF2420", borderBottomWidth: 1, borderBottomColor: "#FBBF2440", marginTop: 48 },
  bannerIcon: { fontSize: 18 },
  bannerTitle: { color: "#FBBF24", fontSize: 13, fontWeight: "700" },
  bannerBody: { color: "#FBBF24", fontSize: 11, opacity: 0.8 },
  enableBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: "#FBBF24", },
  enableText: { color: "#111", fontSize: 12, fontWeight: "700" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  contentText: { color: "#888", fontSize: 14, textAlign: "center" },
});
