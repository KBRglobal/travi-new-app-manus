// Screen 63 — Session Expired
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", border: "rgba(123,68,230,0.22)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2" };

export default function SessionExpiredScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.iconWrap}>
        <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(100,67,244,0.05)"]} style={s.iconGrad}>
          <MaterialIcons name="lock-clock" size={56} color={DS.purple} />
        </LinearGradient>
      </View>
      <Text style={s.title}>Session Expired</Text>
      <Text style={s.body}>Your session has timed out for security.{'\n'}Please sign in again to continue.</Text>
      <Pressable style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.replace("/(auth)/sign-up" as any)}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.btnGrad}>
          <MaterialIcons name="login" size={18} color={DS.white} style={{ marginRight: 8 }} />
          <Text style={s.btnText}>Sign In Again</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  iconWrap: { marginBottom: 28 },
  iconGrad: { width: 120, height: 120, borderRadius: 30, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(100,67,244,0.25)" },
  title: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 12, textAlign: "center" },
  body: { fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.muted, textAlign: "center", lineHeight: 22, marginBottom: 32 },
  primaryBtn: { height: 52, paddingHorizontal: 40, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  btnGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  btnText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
});
