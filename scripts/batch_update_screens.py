#!/usr/bin/env python3
"""
TRAVI Batch Screen Updater
Updates all error/empty state screens with TRAVI Design DNA.
"""

import os

BASE = "/home/ubuntu/travi-app/app"

DS_HEADER = '''const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", border: "rgba(123,68,230,0.22)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2" };'''

SCREENS = {
    "(error)/api-error.tsx": '''// Screen 61 — API Error
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS_HEADER + '''

export default function ApiErrorScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.iconWrap}>
        <LinearGradient colors={["rgba(255,147,39,0.2)", "rgba(255,147,39,0.05)"]} style={s.iconGrad}>
          <MaterialIcons name="warning-amber" size={56} color={DS.warning} />
        </LinearGradient>
      </View>
      <Text style={s.title}>Something Went Wrong</Text>
      <Text style={s.body}>We couldn\'t complete your request.{\'\\n\'}Please try again or contact support.</Text>
      <Pressable style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.btnGrad}>
          <MaterialIcons name="refresh" size={18} color={DS.white} style={{ marginRight: 8 }} />
          <Text style={s.btnText}>Try Again</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={s.secondaryBtn} onPress={() => router.push("/(tabs)/support" as any)}>
        <Text style={s.secondaryText}>Contact Support</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  iconWrap: { marginBottom: 28 },
  iconGrad: { width: 120, height: 120, borderRadius: 30, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,147,39,0.25)" },
  title: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 12, textAlign: "center" },
  body: { fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.muted, textAlign: "center", lineHeight: 22, marginBottom: 32 },
  primaryBtn: { height: 52, paddingHorizontal: 40, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6, marginBottom: 12 },
  btnGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  btnText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
  secondaryBtn: { paddingVertical: 12, paddingHorizontal: 24 },
  secondaryText: { fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.muted },
});
''',

    "(error)/camera-denied.tsx": '''// Screen 65 — Camera Denied
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS_HEADER + '''

export default function CameraDeniedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.iconWrap}>
        <LinearGradient colors={["rgba(249,68,152,0.2)", "rgba(249,68,152,0.05)"]} style={s.iconGrad}>
          <MaterialIcons name="no-photography" size={56} color={DS.pink} />
        </LinearGradient>
      </View>
      <Text style={s.title}>Camera Access Denied</Text>
      <Text style={s.body}>TRAVI needs camera access for document verification.{\'\\n\'}Please enable it in your device settings.</Text>
      <Pressable style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.btnGrad}>
          <MaterialIcons name="settings" size={18} color={DS.white} style={{ marginRight: 8 }} />
          <Text style={s.btnText}>Open Settings</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={s.secondaryBtn} onPress={() => router.back()}>
        <Text style={s.secondaryText}>Skip for Now</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  iconWrap: { marginBottom: 28 },
  iconGrad: { width: 120, height: 120, borderRadius: 30, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(249,68,152,0.25)" },
  title: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 12, textAlign: "center" },
  body: { fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.muted, textAlign: "center", lineHeight: 22, marginBottom: 32 },
  primaryBtn: { height: 52, paddingHorizontal: 40, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6, marginBottom: 12 },
  btnGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  btnText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
  secondaryBtn: { paddingVertical: 12, paddingHorizontal: 24 },
  secondaryText: { fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.muted },
});
''',

    "(error)/gps-denied.tsx": '''// Screen 64 — GPS Denied
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS_HEADER + '''

export default function GpsDeniedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.iconWrap}>
        <LinearGradient colors={["rgba(1,190,255,0.2)", "rgba(1,190,255,0.05)"]} style={s.iconGrad}>
          <MaterialIcons name="location-off" size={56} color={DS.info} />
        </LinearGradient>
      </View>
      <Text style={s.title}>Location Access Needed</Text>
      <Text style={s.body}>TRAVI uses your location for real-time trip assistance.{\'\\n\'}Enable location access to continue.</Text>
      <Pressable style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.btnGrad}>
          <MaterialIcons name="settings" size={18} color={DS.white} style={{ marginRight: 8 }} />
          <Text style={s.btnText}>Open Settings</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={s.secondaryBtn} onPress={() => router.back()}>
        <Text style={s.secondaryText}>Continue Without Location</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  iconWrap: { marginBottom: 28 },
  iconGrad: { width: 120, height: 120, borderRadius: 30, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(1,190,255,0.25)" },
  title: { fontSize: 26, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 12, textAlign: "center" },
  body: { fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.muted, textAlign: "center", lineHeight: 22, marginBottom: 32 },
  primaryBtn: { height: 52, paddingHorizontal: 40, borderRadius: 26, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6, marginBottom: 12 },
  btnGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  btnText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: DS.white },
  secondaryBtn: { paddingVertical: 12, paddingHorizontal: 24 },
  secondaryText: { fontSize: 14, fontFamily: "Satoshi-Regular", color: DS.muted },
});
''',

    "(error)/payment-failed.tsx": '''// Screen 62 — Payment Failed
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS_HEADER + '''

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
      <Text style={s.body}>Your payment could not be processed.{\'\\n\'}Please check your card details and try again.</Text>
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
''',

    "(error)/session-expired.tsx": '''// Screen 63 — Session Expired
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS_HEADER + '''

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
      <Text style={s.body}>Your session has timed out for security.{\'\\n\'}Please sign in again to continue.</Text>
      <Pressable style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.replace("/(auth)/sign-up" as any)}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.btnGrad}>
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
''',

    "(error)/empty-trips.tsx": '''// Screen 67 — Empty No Trips
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS_HEADER + '''

export default function EmptyTripsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={s.iconWrap}>
        <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={s.iconGrad}>
          <MaterialIcons name="luggage" size={56} color={DS.purple} />
        </LinearGradient>
      </View>
      <Text style={s.title}>No Trips Yet</Text>
      <Text style={s.body}>Your adventure starts here.{\'\\n\'}Let TRAVI\'s AI plan your perfect first trip.</Text>
      <Pressable style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/plan" as any)}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.btnGrad}>
          <MaterialIcons name="add" size={20} color={DS.white} style={{ marginRight: 8 }} />
          <Text style={s.btnText}>Plan a Trip</Text>
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
''',

    "(error)/empty-search.tsx": '''// Screen 68 — Empty Search Results
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

''' + DS_HEADER + '''

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
      <Text style={s.body}>We couldn\'t find what you\'re looking for.{\'\\n\'}Try one of these popular destinations:</Text>
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
''',
}

def update_screens():
    updated = []
    for rel_path, content in SCREENS.items():
        full_path = os.path.join(BASE, rel_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w") as f:
            f.write(content)
        updated.append(rel_path)
        print(f"✅ Updated: {rel_path}")
    print(f"\n✅ Done! Updated {len(updated)} screens.")

if __name__ == "__main__":
    update_screens()
