import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  TextInput, Platform, Dimensions, Modal
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
type SplitMode = "equal" | "custom" | "percentage" | "shares";

interface Participant {
  id: string;
  name: string;
  initial: string;
  color: string;
  amount: number;
  paid: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TOTAL_AMOUNT = 840;
const DESCRIPTION = "Airbnb Tokyo — 3 nights";

const INITIAL_PARTICIPANTS: Participant[] = [
  { id: "1", name: "You",     initial: "Y", color: BRAND.purple, amount: 280, paid: true },
  { id: "2", name: "Maya R.", initial: "M", color: BRAND.pink,   amount: 280, paid: false },
  { id: "3", name: "Lior K.", initial: "L", color: BRAND.cyan,   amount: 280, paid: false },
];

const PAYMENT_METHODS = [
  { id: "card",   label: "Visa •••• 4242", icon: "creditcard.fill",  color: BRAND.purple },
  { id: "apple",  label: "Apple Pay",       icon: "apple.logo",       color: "#FFF" },
  { id: "points", label: "TRAVI Points",    icon: "star.fill",        color: "#FFD112" },
];

// ─── Participant Row ──────────────────────────────────────────────────────────
function ParticipantRow({
  p, mode, onAmountChange, totalAmount,
}: { p: Participant; mode: SplitMode; onAmountChange: (id: string, val: number) => void; totalAmount: number }) {
  const pct = totalAmount > 0 ? Math.round((p.amount / totalAmount) * 100) : 0;

  return (
    <View style={S.participantRow}>
      <View style={[S.participantAvatar, { backgroundColor: p.color + "25", borderColor: p.color + "50" }]}>
        <Text style={[S.participantInitial, { color: p.color }]}>{p.initial}</Text>
      </View>
      <View style={S.participantInfo}>
        <Text style={S.participantName}>{p.name}</Text>
        {p.paid && <View style={S.paidBadge}><Text style={S.paidBadgeText}>Paid ✓</Text></View>}
      </View>
      <View style={S.participantAmountWrap}>
        {mode === "custom" ? (
          <View style={S.customInput}>
            <Text style={S.dollarSign}>$</Text>
            <TextInput
              style={S.customInputField}
              value={p.amount.toString()}
              onChangeText={(v) => onAmountChange(p.id, parseFloat(v) || 0)}
              keyboardType="decimal-pad"
              selectTextOnFocus
            />
          </View>
        ) : (
          <View style={S.amountDisplay}>
            <Text style={S.participantAmount}>${p.amount.toFixed(0)}</Text>
            {mode === "percentage" && <Text style={S.participantPct}>{pct}%</Text>}
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Success Modal ────────────────────────────────────────────────────────────
function SuccessModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={S.successOverlay}>
        <View style={S.successCard}>
          <LinearGradient colors={["#3A1F5C", "#24103E"]} style={StyleSheet.absoluteFillObject} />
          <LinearGradient colors={["rgba(100,67,244,0.3)", "rgba(249,68,152,0.15)"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.successIconWrap}>
            <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
            <IconSymbol name="checkmark" size={36} color="#FFF" />
          </View>
          <Text style={S.successTitle}>Payment Sent! 🎉</Text>
          <Text style={S.successBody}>Your share of ${INITIAL_PARTICIPANTS[0].amount} has been processed. Maya and Lior will receive a payment request.</Text>
          <TouchableOpacity style={S.successBtn} onPress={onClose} activeOpacity={0.85}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.successBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SplitPaymentScreen() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<SplitMode>("equal");
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);

  const splitModes: { key: SplitMode; label: string; icon: string }[] = [
    { key: "equal",      label: "Equal",      icon: "equal" },
    { key: "custom",     label: "Custom",     icon: "pencil" },
    { key: "percentage", label: "Percent",    icon: "percent" },
    { key: "shares",     label: "Shares",     icon: "person.2.fill" },
  ];

  const handleModeChange = (newMode: SplitMode) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMode(newMode);
    if (newMode === "equal") {
      const share = Math.round(TOTAL_AMOUNT / participants.length);
      setParticipants((prev) => prev.map((p) => ({ ...p, amount: share })));
    }
  };

  const handleAmountChange = (id: string, val: number) => {
    setParticipants((prev) => prev.map((p) => p.id === id ? { ...p, amount: val } : p));
  };

  const totalAssigned = participants.reduce((a, p) => a + p.amount, 0);
  const remaining = TOTAL_AMOUNT - totalAssigned;
  const isBalanced = Math.abs(remaining) < 0.5;

  const handlePay = () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowSuccess(true);
  };

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#24103E", "rgba(36,16,62,0.55)", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtnInner} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Split Payment</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130, paddingHorizontal: 16 }}>
        {/* Bill summary card */}
        <View style={S.billCard}>
          <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.billIconWrap}>
            <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
            <IconSymbol name="creditcard.fill" size={22} color="#FFF" />
          </View>
          <View style={S.billInfo}>
            <Text style={S.billDescription}>{DESCRIPTION}</Text>
            <Text style={S.billDate}>Tokyo Trip · Mar 18–21</Text>
          </View>
          <Text style={S.billTotal}>${TOTAL_AMOUNT}</Text>
        </View>

        {/* Split mode selector */}
        <Text style={S.sectionTitle}>Split Method</Text>
        <View style={S.modeRow}>
          {splitModes.map((m) => (
            <TouchableOpacity
              key={m.key}
              style={[S.modeBtn, mode === m.key && S.modeBtnActive]}
              onPress={() => handleModeChange(m.key)}
              activeOpacity={0.8}
            >
              {mode === m.key && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
              <IconSymbol name={m.icon as any} size={16} color={mode === m.key ? "#FFF" : BRAND.textMuted} />
              <Text style={[S.modeBtnText, mode === m.key && S.modeBtnTextActive]}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Participants */}
        <Text style={S.sectionTitle}>Participants</Text>
        <View style={S.participantsCard}>
          <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]} style={StyleSheet.absoluteFillObject} />
          {participants.map((p, i) => (
            <View key={p.id}>
              <ParticipantRow p={p} mode={mode} onAmountChange={handleAmountChange} totalAmount={TOTAL_AMOUNT} />
              {i < participants.length - 1 && <View style={S.divider} />}
            </View>
          ))}
        </View>

        {/* Balance indicator */}
        {mode === "custom" && (
          <View style={[S.balanceIndicator, { borderColor: isBalanced ? BRAND.green + "40" : BRAND.pink + "40" }]}>
            <LinearGradient
              colors={isBalanced ? ["rgba(2,166,92,0.12)", "rgba(2,166,92,0.06)"] : ["rgba(249,68,152,0.12)", "rgba(249,68,152,0.06)"]}
              style={StyleSheet.absoluteFillObject}
            />
            <IconSymbol name={isBalanced ? "checkmark.circle.fill" : "exclamationmark.circle.fill"} size={18} color={isBalanced ? BRAND.green : BRAND.pink} />
            <Text style={[S.balanceText, { color: isBalanced ? BRAND.green : BRAND.pink }]}>
              {isBalanced ? "Perfectly balanced!" : `$${Math.abs(remaining).toFixed(2)} ${remaining > 0 ? "unassigned" : "over-assigned"}`}
            </Text>
          </View>
        )}

        {/* Visual split bar */}
        <View style={S.splitBarWrap}>
          {participants.map((p) => (
            <View
              key={p.id}
              style={[S.splitBarSegment, {
                flex: p.amount,
                backgroundColor: p.color,
              }]}
            />
          ))}
        </View>
        <View style={S.splitBarLabels}>
          {participants.map((p) => (
            <Text key={p.id} style={[S.splitBarLabel, { color: p.color }]}>
              {p.name.split(" ")[0]}{"\n"}${p.amount}
            </Text>
          ))}
        </View>

        {/* Payment method */}
        <Text style={S.sectionTitle}>Pay With</Text>
        <View style={S.paymentMethods}>
          {PAYMENT_METHODS.map((pm) => (
            <TouchableOpacity
              key={pm.id}
              style={[S.paymentMethod, selectedPayment === pm.id && S.paymentMethodActive]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedPayment(pm.id);
              }}
              activeOpacity={0.8}
            >
              {selectedPayment === pm.id && <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />}
              <View style={[S.paymentIconWrap, { backgroundColor: pm.color + "20" }]}>
                <IconSymbol name={pm.icon as any} size={18} color={pm.color} />
              </View>
              <Text style={S.paymentLabel}>{pm.label}</Text>
              {selectedPayment === pm.id && <IconSymbol name="checkmark.circle.fill" size={18} color={BRAND.purple} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        <View style={S.summaryCard}>
          <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.summaryRow}>
            <Text style={S.summaryLabel}>Your share</Text>
            <Text style={S.summaryValue}>${participants[0].amount.toFixed(0)}</Text>
          </View>
          <View style={S.summaryRow}>
            <Text style={S.summaryLabel}>Others will be notified</Text>
            <Text style={S.summaryValue}>${(TOTAL_AMOUNT - participants[0].amount).toFixed(0)}</Text>
          </View>
          <View style={[S.summaryRow, S.summaryTotal]}>
            <Text style={S.summaryTotalLabel}>Total Bill</Text>
            <Text style={S.summaryTotalValue}>${TOTAL_AMOUNT}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay button */}
      <View style={[S.payBtnWrap, { paddingBottom: insets.bottom + 16 }]}>
        <LinearGradient colors={["rgba(36,16,62,0)", "#24103E"]} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity style={S.payBtn} onPress={handlePay} activeOpacity={0.85}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="lock.fill" size={16} color="#FFF" />
          <Text style={S.payBtnText}>Pay ${participants[0].amount.toFixed(0)} Securely</Text>
        </TouchableOpacity>
        <Text style={S.payDisclaimer}>Secured by 256-bit encryption · TRAVI Pay</Text>
      </View>

      <SuccessModal visible={showSuccess} onClose={() => { setShowSuccess(false); router.back(); }} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  orb1: { position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(100,67,244,0.1)" },
  orb2: { position: "absolute", bottom: 200, left: -80, width: 160, height: 160, borderRadius: 80, backgroundColor: "rgba(249,68,152,0.07)" },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, paddingTop: 4 },
  backBtnInner: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center", marginRight: 8 },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary, flex: 1 },

  sectionTitle: { ...TYPE.h4, color: BRAND.textPrimary, marginBottom: 12, marginTop: 20 },

  billCard: { overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(100,67,244,0.25)", flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
  billIconWrap: { overflow: "hidden", width: 48, height: 48, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  billInfo: { flex: 1 },
  billDescription: { ...TYPE.bodyMed, color: BRAND.textPrimary, marginBottom: 3 },
  billDate: { ...TYPE.caption, color: BRAND.textMuted },
  billTotal: { ...TYPE.h2, color: "#FFF", fontFamily: "Chillax-Bold" },

  modeRow: { flexDirection: "row", gap: 8 },
  modeBtn: { overflow: "hidden", flex: 1, borderRadius: RADIUS.xl, paddingVertical: 10, alignItems: "center", gap: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  modeBtnActive: { borderColor: "transparent" },
  modeBtnText: { ...TYPE.caption, color: BRAND.textMuted },
  modeBtnTextActive: { color: "#FFF" },

  participantsCard: { overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  participantRow: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  participantAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: 1.5 },
  participantInitial: { ...TYPE.bodyMed, fontFamily: "Chillax-Bold" },
  participantInfo: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  participantName: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  paidBadge: { backgroundColor: "rgba(2,166,92,0.15)", borderRadius: RADIUS.full, paddingHorizontal: 8, paddingVertical: 2 },
  paidBadgeText: { ...TYPE.caption, color: BRAND.green },
  participantAmountWrap: {},
  amountDisplay: { alignItems: "flex-end" },
  participantAmount: { ...TYPE.bodyMed, color: BRAND.textPrimary, fontFamily: "Chillax-Semibold" },
  participantPct: { ...TYPE.caption, color: BRAND.textMuted },
  customInput: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: RADIUS.md, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  dollarSign: { ...TYPE.bodyMed, color: BRAND.textSecondary, marginRight: 2 },
  customInputField: { ...TYPE.bodyMed, color: BRAND.textPrimary, width: 60, textAlign: "right" },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.06)", marginHorizontal: 14 },

  balanceIndicator: { overflow: "hidden", flexDirection: "row", alignItems: "center", gap: 8, borderRadius: RADIUS.xl, borderWidth: 1, padding: 12, marginTop: 12 },
  balanceText: { ...TYPE.small, fontFamily: "Satoshi-Medium" },

  splitBarWrap: { flexDirection: "row", height: 8, borderRadius: 4, overflow: "hidden", marginTop: 16, gap: 2 },
  splitBarSegment: { borderRadius: 4 },
  splitBarLabels: { flexDirection: "row", justifyContent: "space-around", marginTop: 6 },
  splitBarLabel: { ...TYPE.caption, textAlign: "center" },

  paymentMethods: { gap: 10 },
  paymentMethod: { overflow: "hidden", flexDirection: "row", alignItems: "center", gap: 12, borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", padding: 14 },
  paymentMethodActive: { borderColor: "rgba(100,67,244,0.4)" },
  paymentIconWrap: { width: 40, height: 40, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  paymentLabel: { ...TYPE.bodyMed, color: BRAND.textPrimary, flex: 1 },

  summaryCard: { overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", padding: 16, marginTop: 20, gap: 12 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { ...TYPE.body, color: BRAND.textSecondary },
  summaryValue: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  summaryTotal: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)", paddingTop: 12, marginTop: 4 },
  summaryTotalLabel: { ...TYPE.h4, color: BRAND.textPrimary },
  summaryTotalValue: { ...TYPE.h3, color: "#FFF", fontFamily: "Chillax-Bold" },

  payBtnWrap: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 16, alignItems: "center" },
  payBtn: { shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", width: "100%", borderRadius: RADIUS.xl, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 18 },
  payBtnText: { ...TYPE.button, color: "#FFF" },
  payDisclaimer: { ...TYPE.caption, color: BRAND.textMuted, marginTop: 8 },

  successOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: "center", justifyContent: "center", padding: 32 },
  successCard: { overflow: "hidden", width: "100%", borderRadius: 28, padding: 32, alignItems: "center", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  successIconWrap: { overflow: "hidden", width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  successTitle: { ...TYPE.h1, color: "#FFF", marginBottom: 12, textAlign: "center" },
  successBody: { ...TYPE.body, color: BRAND.textSecondary, textAlign: "center", lineHeight: 22, marginBottom: 28 },
  successBtn: { overflow: "hidden", width: "100%", borderRadius: RADIUS.xl, paddingVertical: 16, alignItems: "center" },
  successBtnText: { ...TYPE.button, color: "#FFF" },
});
