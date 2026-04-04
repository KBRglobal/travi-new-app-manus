import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const PEOPLE = [
  { name: "You", avatar: "Y", amount: "€695", status: "Your share", color: DS.purple },
  { name: "Sarah M.", avatar: "S", amount: "€695", status: "Pending", color: DS.pink },
  { name: "David K.", avatar: "D", amount: "€695", status: "Pending", color: DS.warning },
];

export default function SplitPaymentScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<"equal" | "custom">("equal");

  return (
    <ScreenWrapper title="Split Payment" scrollable bottomPad={100}>
      {/* Total Card */}
      <BlurView intensity={20} tint="dark" style={s.totalCard}>
        <View style={s.totalInner}>
          <Text style={s.totalLabel}>Total Amount</Text>
          <Text style={s.totalAmount}>€2,085</Text>
          <Text style={s.totalSub}>Bali Trip — Hotel + Activities</Text>
        </View>
      </BlurView>

      {/* Toggle */}
      <View style={s.toggleRow}>
        <Pressable style={[s.toggleBtn, mode === "equal" && s.toggleActive]} onPress={() => setMode("equal")}>
          <Text style={[s.toggleText, mode === "equal" && s.toggleTextActive]}>Equal Split</Text>
        </Pressable>
        <Pressable style={[s.toggleBtn, mode === "custom" && s.toggleActive]} onPress={() => setMode("custom")}>
          <Text style={[s.toggleText, mode === "custom" && s.toggleTextActive]}>Custom</Text>
        </Pressable>
      </View>

      {/* People */}
      <Text style={s.sectionTitle}>Split Between</Text>
      {PEOPLE.map((p) => (
        <BlurView key={p.name} intensity={15} tint="dark" style={s.personCard}>
          <View style={[s.avatar, { backgroundColor: p.color + "33", borderColor: p.color + "66" }]}>
            <Text style={[s.avatarText, { color: p.color }]}>{p.avatar}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.personName}>{p.name}</Text>
            <Text style={s.personStatus}>{p.status}</Text>
          </View>
          <Text style={s.personAmount}>{p.amount}</Text>
        </BlurView>
      ))}
      <Pressable style={s.addPerson}>
        <MaterialIcons name="add" size={16} color={DS.purple} />
        <Text style={s.addPersonText}>Add Person</Text>
      </Pressable>

      {/* Summary */}
      <BlurView intensity={20} tint="dark" style={s.summaryCard}>
        {[
          { label: "Your share", value: "€695" },
          { label: "Others owe you", value: "€1,390" },
          { label: "Requests to send", value: "2" },
        ].map((row, i) => (
          <View key={i} style={[s.summaryRow, i < 2 && { borderBottomWidth: 1, borderBottomColor: DS.border }]}>
            <Text style={s.summaryLabel}>{row.label}</Text>
            <Text style={s.summaryValue}>{row.value}</Text>
          </View>
        ))}
      </BlurView>

      {/* CTA */}
      <Pressable onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.sendBtn}>
          <MaterialIcons name="send" size={20} color="#FFF" />
          <Text style={s.sendText}>Send Requests</Text>
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  totalCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 16 },
  totalInner: { alignItems: "center", padding: 24, backgroundColor: DS.surface },
  totalLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  totalAmount: { color: DS.white, fontSize: 40, fontFamily: "Chillax-Bold", marginTop: 4 },
  totalSub: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular", marginTop: 4 },
  toggleRow: { flexDirection: "row", borderRadius: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, overflow: "hidden", marginBottom: 24 },
  toggleBtn: { flex: 1, paddingVertical: 13, alignItems: "center" },
  toggleActive: { backgroundColor: DS.purple + "33" },
  toggleText: { color: DS.muted, fontSize: 14, fontFamily: "Satoshi-Medium" },
  toggleTextActive: { color: DS.white },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 12 },
  personCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 10, flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 16, fontFamily: "Chillax-Bold" },
  personName: { color: DS.white, fontSize: 15, fontFamily: "Satoshi-Medium" },
  personStatus: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  personAmount: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
  addPerson: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "center", marginVertical: 8, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: DS.purple + "66" },
  addPersonText: { color: DS.purple, fontSize: 13, fontFamily: "Satoshi-Medium" },
  summaryCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginVertical: 16, backgroundColor: DS.surface },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 16 },
  summaryLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  summaryValue: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  sendBtn: { height: 56, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 },
  sendText: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
});
