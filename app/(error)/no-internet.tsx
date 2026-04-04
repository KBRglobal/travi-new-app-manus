// Screen 60 — No Internet
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", purple: "#6443F4", pink: "#F94498", white: "#FFFFFF", muted: "#A79FB2", error: "#FF6B6B" };

export default function NoInternetScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.iconWrap}>
        <LinearGradient colors={["rgba(255,107,107,0.2)", "rgba(255,107,107,0.05)"]} style={s.iconGrad}>
          <MaterialIcons name="wifi-off" size={56} color={DS.error} />
        </LinearGradient>
      </View>
      <Text style={s.title}>No Internet</Text>
      <Text style={s.body}>Please check your connection and try again.{"\n"}Some features may be available offline.</Text>
      <Pressable style={({ pressed }) => [s.retryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.retryGrad}>
          <MaterialIcons name="refresh" size={18} color={DS.white} style={{ marginRight: 8 }} />
          <Text style={s.retryText}>Retry</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  iconWrap: { marginBottom: 28 },
  iconGrad: { width: 120, height: 120, borderRadius: 30, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,107,107,0.25)" },
  title: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 12, textAlign: "center" },
  body: { fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.muted, textAlign: "center", lineHeight: 22, marginBottom: 32 },
  retryBtn: { height: 52, paddingHorizontal: 40, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  retryGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  retryText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
});
