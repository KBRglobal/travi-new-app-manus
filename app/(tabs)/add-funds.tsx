import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const AMOUNTS = ["50", "100", "250", "500", "1000"];
const METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: "credit-card", last4: "4242" },
  { id: "bank", label: "Bank Transfer", icon: "account-balance", last4: null },
  { id: "apple", label: "Apple Pay", icon: "phone-iphone", last4: null },
];

export default function AddFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("100");
  const [method, setMethod] = useState("card");

  return (
    <ScreenWrapper title="Add Funds" scrollable bottomPad={100}>
      {/* Balance */}
      <BlurView intensity={20} tint="dark" style={s.balanceCard}>
        <LinearGradient colors={[DS.purple + "33", DS.pink + "22"]} style={s.balanceInner}>
          <Text style={s.balanceLabel}>Current Balance</Text>
          <Text style={s.balanceAmount}>€1,247.50</Text>
        </LinearGradient>
      </BlurView>

      {/* Amount input */}
      <Text style={s.sectionTitle}>Amount</Text>
      <BlurView intensity={15} tint="dark" style={s.inputCard}>
        <Text style={s.currencySymbol}>€</Text>
        <TextInput
          style={s.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor={DS.muted}
        />
      </BlurView>

      {/* Quick amounts */}
      <View style={s.quickAmounts}>
        {AMOUNTS.map(a => (
          <Pressable key={a} style={[s.quickBtn, amount === a && s.quickBtnActive]} onPress={() => setAmount(a)}>
            <Text style={[s.quickText, amount === a && s.quickTextActive]}>€{a}</Text>
          </Pressable>
        ))}
      </View>

      {/* Payment method */}
      <Text style={s.sectionTitle}>Payment Method</Text>
      {METHODS.map(m => (
        <Pressable key={m.id} onPress={() => setMethod(m.id)}>
          <BlurView intensity={15} tint="dark" style={[s.methodCard, method === m.id && { borderColor: DS.purple }]}>
            <View style={[s.methodIcon, method === m.id && { backgroundColor: DS.purple + "33", borderColor: DS.purple + "66" }]}>
              <MaterialIcons name={m.icon as any} size={20} color={method === m.id ? DS.purple : DS.muted} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.methodLabel}>{m.label}</Text>
              {m.last4 && <Text style={s.methodSub}>•••• {m.last4}</Text>}
            </View>
            {method === m.id && <MaterialIcons name="check-circle" size={20} color={DS.purple} />}
          </BlurView>
        </Pressable>
      ))}

      {/* CTA */}
      <Pressable onPress={() => router.back()} style={{ marginTop: 8 }}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.cta}>
          <MaterialIcons name="add" size={20} color="#FFF" />
          <Text style={s.ctaText}>Add €{amount || "0"}</Text>
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  balanceCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 24 },
  balanceInner: { alignItems: "center", padding: 24 },
  balanceLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  balanceAmount: { color: DS.white, fontSize: 40, fontFamily: "Chillax-Bold", marginTop: 4 },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 12 },
  inputCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.purple, flexDirection: "row", alignItems: "center", paddingHorizontal: 20, height: 64, backgroundColor: DS.surface, marginBottom: 12 },
  currencySymbol: { color: DS.purple, fontSize: 28, fontFamily: "Chillax-Bold", marginRight: 8 },
  amountInput: { flex: 1, color: DS.white, fontSize: 32, fontFamily: "Chillax-Bold" },
  quickAmounts: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 24 },
  quickBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  quickBtnActive: { backgroundColor: DS.purple + "33", borderColor: DS.purple },
  quickText: { color: DS.muted, fontSize: 14, fontFamily: "Satoshi-Medium" },
  quickTextActive: { color: DS.white },
  methodCard: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.border, flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface, marginBottom: 10 },
  methodIcon: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  methodLabel: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  methodSub: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  cta: { height: 56, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  ctaText: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
});
