// Screen 62 — Payment Failed
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", border: "rgba(123,68,230,0.22)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2" };

export default function PaymentFailedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.iconWrap}>
        <LinearGradient colors={["rgba(255,107,107,0.2)", "rgba(255,107,107,0.05)"]} style={s.iconGrad}>
          <MaterialIcons name="credit-card-off" size={56} color={DS.error} />
        </LinearGradient>
      </View>
      <Text style={s.title}>Payment Failed</Text>
      <Text style={s.body}>Your payment could not be processed.{'\n'}Please check your card details and try again.</Text>
      <View style={s.card}>
        <View style={s.errorRow}>
          <MaterialIcons name="info-outline" size={16} color={DS.error} />
          <Text style={s.errorText}>Insufficient funds or card declined</Text>
        </View>
      </View>
      <Pressable style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.btnGrad}>
          <Text style={s.btnText}>Try Again</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={s.outlineBtn} onPress={() => router.push("/(tabs)/wallet" as any)}>
        <Text style={s.outlineText}>Change Payment Method</Text>
      </Pressable>
      <Pressable style={s.secondaryBtn} onPress={() => router.push("/(tabs)/index" as any)}>
        <Text style={s.secondaryText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  iconWrap: { marginBottom: 24 },
  iconGrad: { width: 120, height: 120, borderRadius: 30, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,107,107,0.25)" },
  title: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 12, textAlign: "center" },
  body: { fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.muted, textAlign: "center", lineHeight: 22, marginBottom: 20 },
  card: { width: "100%", backgroundColor: "rgba(255,107,107,0.08)", borderWidth: 1, borderColor: "rgba(255,107,107,0.2)", borderRadius: 14, padding: 14, marginBottom: 24 },
  errorRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  errorText: { fontSize: 13, fontFamily: "Satoshi-Regular", color: DS.error },
  primaryBtn: { width: "100%", height: 52, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6, marginBottom: 12 },
  btnGrad: { flex: 1, justifyContent: "center", alignItems: "center" },
  btnText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
  outlineBtn: { width: "100%", height: 52, borderRadius: 26, borderWidth: 1.5, borderColor: DS.purple, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  outlineText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.purple },
  secondaryBtn: { paddingVertical: 12 },
  secondaryText: { fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.muted },
});
