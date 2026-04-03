/**
 * TRAVI — Wallet Withdrawal Screen
 * Withdraw cashback to bank, PayPal, or crypto wallet.
 */

import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const METHODS = [
  { id: "bank", emoji: "🏦", title: "Bank Transfer", desc: "3–5 business days", fee: "Free", color: "#6443F4" },
  { id: "paypal", emoji: "🅿️", title: "PayPal", desc: "Instant", fee: "1.5%", color: "#0070BA" },
  { id: "crypto", emoji: "₿", title: "Crypto Wallet", desc: "10–30 minutes", fee: "Network fee", color: "#F7931A" },
  { id: "card", emoji: "💳", title: "Debit Card", desc: "1–2 business days", fee: "Free", color: "#22C55E" },
];

const QUICK_AMOUNTS = [25, 50, 100, 200, 500];

export default function WalletWithdrawScreen() {
  const insets = useSafeAreaInsets();
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"amount" | "confirm" | "success">("amount");
  const availableBalance = 2240;

  const selectedMethod = METHODS.find((m) => m.id === method)!;
  const numAmount = parseFloat(amount) || 0;
  const fee = method === "paypal" ? numAmount * 0.015 : 0;
  const youReceive = numAmount - fee;

  const handleConfirm = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setStep("confirm");
  };

  const handleSubmit = () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setStep("success");
  };

  if (step === "success") {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.successScreen}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Withdrawal Initiated!</Text>
          <Text style={styles.successAmount}>${numAmount.toFixed(2)}</Text>
          <Text style={styles.successDesc}>Your withdrawal to {selectedMethod.title} has been initiated. {selectedMethod.desc} to arrive.</Text>
          <View style={styles.successDetails}>
            {[
              { label: "Method", value: selectedMethod.title },
              { label: "Amount", value: `$${numAmount.toFixed(2)}` },
              { label: "Fee", value: fee > 0 ? `$${fee.toFixed(2)}` : "Free" },
              { label: "You receive", value: `$${youReceive.toFixed(2)}` },
              { label: "Reference", value: `TRV-${Date.now().toString().slice(-8)}` },
            ].map((item, i) => (
              <View key={i} style={styles.successDetailRow}>
                <Text style={styles.successDetailLabel}>{item.label}</Text>
                <Text style={styles.successDetailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()} activeOpacity={0.85}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.doneBtnGradient}>
              <Text style={styles.doneBtnText}>Back to Wallet</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (step === "confirm") {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStep("amount")} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Withdrawal</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.confirmCard}>
            <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.confirmEmoji}>{selectedMethod.emoji}</Text>
            <Text style={styles.confirmAmount}>${numAmount.toFixed(2)}</Text>
            <Text style={styles.confirmMethod}>via {selectedMethod.title}</Text>
          </View>
          <View style={styles.reviewCard}>
            {[
              { label: "Withdrawal amount", value: `$${numAmount.toFixed(2)}` },
              { label: "Processing fee", value: fee > 0 ? `$${fee.toFixed(2)}` : "Free" },
              { label: "You will receive", value: `$${youReceive.toFixed(2)}`, highlight: true },
              { label: "Arrival time", value: selectedMethod.desc },
            ].map((item, i) => (
              <View key={i} style={[styles.reviewRow, i < 3 && styles.reviewRowBorder]}>
                <Text style={styles.reviewLabel}>{item.label}</Text>
                <Text style={[styles.reviewValue, item.highlight && { color: "#22C55E", fontSize: 16 }]}>{item.value}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.nextBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.nextBtnGradient}>
              <Text style={styles.nextBtnText}>Confirm Withdrawal</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdraw Cashback</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Balance */}
        <View style={styles.balanceCard}>
          <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.15)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>${availableBalance.toLocaleString()}</Text>
          <Text style={styles.balanceSub}>≈ {(availableBalance * 100).toLocaleString()} TRAVI points</Text>
        </View>

        {/* Amount input */}
        <View style={styles.amountSection}>
          <Text style={styles.sectionTitle}>Withdrawal Amount</Text>
          <View style={styles.amountInputWrap}>
            <Text style={styles.amountCurrency}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="rgba(255,255,255,0.2)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>
          <View style={styles.quickAmounts}>
            {QUICK_AMOUNTS.map((a) => (
              <TouchableOpacity
                key={a}
                style={[styles.quickAmountChip, amount === String(a) && styles.quickAmountChipActive]}
                onPress={() => setAmount(String(a))}
                activeOpacity={0.8}
              >
                <Text style={[styles.quickAmountText, amount === String(a) && styles.quickAmountTextActive]}>${a}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.quickAmountChip}
              onPress={() => setAmount(String(availableBalance))}
              activeOpacity={0.8}
            >
              <Text style={styles.quickAmountText}>Max</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Method selection */}
        <Text style={styles.sectionTitle}>Withdrawal Method</Text>
        <View style={styles.methodsGrid}>
          {METHODS.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.methodCard, method === m.id && styles.methodCardActive]}
              onPress={() => { setMethod(m.id); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.85}
            >
              {method === m.id && (
                <LinearGradient colors={[m.color + "22", m.color + "11"]} style={StyleSheet.absoluteFillObject} />
              )}
              <Text style={styles.methodEmoji}>{m.emoji}</Text>
              <Text style={[styles.methodTitle, method === m.id && { color: "#FFFFFF" }]}>{m.title}</Text>
              <Text style={styles.methodDesc}>{m.desc}</Text>
              <View style={[styles.methodFee, { backgroundColor: m.color + "22" }]}>
                <Text style={[styles.methodFeeText, { color: m.color }]}>{m.fee}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        {numAmount > 0 && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>${numAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Fee</Text>
              <Text style={styles.summaryValue}>{fee > 0 ? `$${fee.toFixed(2)}` : "Free"}</Text>
            </View>
            <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.08)", paddingTop: 10, marginTop: 4 }]}>
              <Text style={[styles.summaryLabel, { color: "#FFFFFF" }]}>You receive</Text>
              <Text style={[styles.summaryValue, { color: "#22C55E", fontSize: 18, fontWeight: "900" }]}>${youReceive.toFixed(2)}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.nextBtn, (!numAmount || numAmount > availableBalance) && styles.nextBtnDisabled]}
          onPress={handleConfirm}
          activeOpacity={0.85}
          disabled={!numAmount || numAmount > availableBalance}
        >
          <LinearGradient
            colors={(!numAmount || numAmount > availableBalance) ? ["#333", "#333"] : ["#6443F4", "#F94498"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.nextBtnGradient}
          >
            <Text style={styles.nextBtnText}>
              {numAmount > availableBalance ? "Insufficient Balance" : "Continue →"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 14 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  content: { paddingHorizontal: 20, gap: 20, paddingBottom: 20 },
  balanceCard: { borderRadius: 20, overflow: "hidden", padding: 20, alignItems: "center", gap: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  balanceLabel: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 },
  balanceAmount: { color: "#FFFFFF", fontSize: 36, fontWeight: "900", fontFamily: "Chillax-Bold" },
  balanceSub: { color: "rgba(255,255,255,0.4)", fontSize: 13 },
  amountSection: { gap: 12 },
  sectionTitle: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "800", textTransform: "uppercase", letterSpacing: 1, fontFamily: "Chillax-Bold" },
  amountInputWrap: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", paddingHorizontal: 16 },
  amountCurrency: { color: "rgba(255,255,255,0.5)", fontSize: 24, fontWeight: "700", marginRight: 4, fontFamily: "Chillax-Semibold" },
  amountInput: { flex: 1, color: "#FFFFFF", fontSize: 32, fontWeight: "900", paddingVertical: 16, fontFamily: "Chillax-Bold" },
  quickAmounts: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  quickAmountChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  quickAmountChipActive: { backgroundColor: "rgba(100,67,244,0.3)", borderColor: "#6443F4" },
  quickAmountText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700" },
  quickAmountTextActive: { color: "#FFFFFF" },
  methodsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  methodCard: { width: (width - 50) / 2, borderRadius: 16, overflow: "hidden", padding: 14, gap: 6, backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  methodCardActive: { borderColor: "rgba(100,67,244,0.5)" },
  methodEmoji: { fontSize: 28 },
  methodTitle: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  methodDesc: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  methodFee: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  methodFeeText: { fontSize: 11, fontWeight: "800", fontFamily: "Chillax-Bold" },
  summaryCard: { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16, gap: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summaryLabel: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  summaryValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  nextBtn: { borderRadius: 16, overflow: "hidden" },
  nextBtnDisabled: { opacity: 0.5 },
  nextBtnGradient: { paddingVertical: 16, alignItems: "center" },
  nextBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  // Confirm screen
  confirmCard: { borderRadius: 20, overflow: "hidden", padding: 32, alignItems: "center", gap: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  confirmEmoji: { fontSize: 48 },
  confirmAmount: { color: "#FFFFFF", fontSize: 40, fontWeight: "900", fontFamily: "Chillax-Bold" },
  confirmMethod: { color: "rgba(255,255,255,0.5)", fontSize: 15, fontFamily: "Satoshi-Regular" },
  reviewCard: { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  reviewRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  reviewRowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.06)" },
  reviewLabel: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  reviewValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  // Success screen
  successScreen: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 12 },
  successEmoji: { fontSize: 64 },
  successTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", textAlign: "center", fontFamily: "Chillax-Bold" },
  successAmount: { color: "#22C55E", fontSize: 40, fontWeight: "900", fontFamily: "Chillax-Bold" },
  successDesc: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", lineHeight: 22, fontFamily: "Satoshi-Regular" },
  successDetails: { width: "100%", backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16, gap: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  successDetailRow: { flexDirection: "row", justifyContent: "space-between" },
  successDetailLabel: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  successDetailValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  doneBtn: { borderRadius: 16, overflow: "hidden", width: "100%", marginTop: 8 },
  doneBtnGradient: { paddingVertical: 16, alignItems: "center" },
  doneBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
});
