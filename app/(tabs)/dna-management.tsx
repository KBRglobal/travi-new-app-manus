import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const DNA_DIMS = [
  { label: "Adventure", value: 85, icon: "terrain", color: DS.purple },
  { label: "Culture", value: 72, icon: "museum", color: DS.pink },
  { label: "Relaxation", value: 60, icon: "spa", color: DS.success },
  { label: "Gastronomy", value: 90, icon: "restaurant", color: DS.warning },
  { label: "Social", value: 45, icon: "people", color: DS.info },
  { label: "Budget", value: 65, icon: "savings", color: DS.secondary },
  { label: "Luxury", value: 55, icon: "diamond", color: DS.pink },
  { label: "Nature", value: 78, icon: "park", color: DS.success },
];

export default function DNAManagementScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper title="Travel DNA" scrollable bottomPad={40}>
      {/* DNA Type */}
      <BlurView intensity={20} tint="dark" style={s.typeCard}>
        <LinearGradient colors={[DS.purple + "33", DS.pink + "22"]} style={s.typeInner}>
          <View style={s.typeIcon}>
            <MaterialIcons name="psychology" size={32} color={DS.purple} />
          </View>
          <Text style={s.typeLabel}>Your DNA Type</Text>
          <Text style={s.typeName}>Adventure Explorer</Text>
          <Text style={s.typeDesc}>You crave new experiences, local culture, and off-the-beaten-path adventures.</Text>
          <Pressable style={s.retakeBtn} onPress={() => router.push("/(dna)/categories" as any)}>
            <Text style={s.retakeText}>Retake Quiz</Text>
          </Pressable>
        </LinearGradient>
      </BlurView>

      {/* Dimensions */}
      <Text style={s.sectionTitle}>DNA Dimensions</Text>
      {DNA_DIMS.map(dim => (
        <View key={dim.label} style={s.dimRow}>
          <View style={[s.dimIcon, { backgroundColor: dim.color + "22" }]}>
            <MaterialIcons name={dim.icon as any} size={18} color={dim.color} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={s.dimHeader}>
              <Text style={s.dimLabel}>{dim.label}</Text>
              <Text style={[s.dimValue, { color: dim.color }]}>{dim.value}%</Text>
            </View>
            <View style={s.dimBarBg}>
              <View style={[s.dimBarFill, { width: `${dim.value}%`, backgroundColor: dim.color }]} />
            </View>
          </View>
        </View>
      ))}

      {/* Update CTA */}
      <Pressable style={{ marginTop: 16 }}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.updateBtn}>
          <MaterialIcons name="edit" size={18} color="#FFF" />
          <Text style={s.updateBtnText}>Update Preferences</Text>
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  typeCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 24 },
  typeInner: { alignItems: "center", padding: 24, gap: 8 },
  typeIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: DS.purple + "22", justifyContent: "center", alignItems: "center", marginBottom: 4 },
  typeLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  typeName: { color: DS.white, fontSize: 24, fontFamily: "Chillax-Bold" },
  typeDesc: { color: DS.secondary, fontSize: 14, fontFamily: "Satoshi-Regular", textAlign: "center", lineHeight: 20 },
  retakeBtn: { marginTop: 8, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: DS.purple + "66" },
  retakeText: { color: DS.purple, fontSize: 13, fontFamily: "Satoshi-Medium" },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 16 },
  dimRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  dimIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  dimHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  dimLabel: { color: DS.white, fontSize: 13, fontFamily: "Satoshi-Medium" },
  dimValue: { fontSize: 13, fontFamily: "Chillax-Bold" },
  dimBarBg: { height: 6, borderRadius: 3, backgroundColor: DS.surface },
  dimBarFill: { height: 6, borderRadius: 3 },
  updateBtn: { height: 52, borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  updateBtnText: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold" },
});
