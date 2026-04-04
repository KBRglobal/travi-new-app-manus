// Screen 68 — Empty Search Results
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", border: "rgba(123,68,230,0.22)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2" };

const SUGGESTIONS = ["Bali", "Tokyo", "Barcelona", "Santorini", "Dubai", "Paris"];

export default function EmptySearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={[s.root, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 }]} showsVerticalScrollIndicator={false}>
      <View style={s.iconWrap}>
        <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(100,67,244,0.05)"]} style={s.iconGrad}>
          <MaterialIcons name="search-off" size={56} color={DS.purple} />
        </LinearGradient>
      </View>
      <Text style={s.title}>No Results Found</Text>
      <Text style={s.body}>We couldn't find what you're looking for.{'\n'}Try one of these popular destinations:</Text>
      <View style={s.pillsWrap}>
        {SUGGESTIONS.map((s2) => (
          <Pressable key={s2} style={({ pressed }) => [s.pill, pressed && { opacity: 0.7 }]} onPress={() => router.push("/(tabs)/search" as any)}>
            <MaterialIcons name="place" size={14} color={DS.purple} style={{ marginRight: 4 }} />
            <Text style={s.pillText}>{s2}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(tabs)/explore" as any)}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.btnGrad}>
          <MaterialIcons name="explore" size={18} color={DS.white} style={{ marginRight: 8 }} />
          <Text style={s.btnText}>Browse All Destinations</Text>
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: { alignItems: "center", paddingHorizontal: 24 },
  iconWrap: { marginBottom: 28 },
  iconGrad: { width: 120, height: 120, borderRadius: 30, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(100,67,244,0.25)" },
  title: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 12, textAlign: "center" },
  body: { fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.muted, textAlign: "center", lineHeight: 22, marginBottom: 24 },
  pillsWrap: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 32 },
  pill: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "rgba(100,67,244,0.12)", borderWidth: 1, borderColor: "rgba(100,67,244,0.25)" },
  pillText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.white },
  primaryBtn: { width: "100%", height: 52, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  btnGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  btnText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
});
