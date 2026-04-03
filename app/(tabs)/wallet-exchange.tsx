/**
 * TRAVI — Wallet Currency Exchange
 */
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", rate: 1.0 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: 0.79 },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", rate: 3.67 },
  { code: "ILS", name: "Israeli Shekel", flag: "🇮🇱", rate: 3.71 },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rate: 149.5 },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", rate: 35.2 },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩", rate: 15750 },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", rate: 17.1 },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", rate: 5.05 },
];

export default function WalletExchangeScreen() {
  const insets = useSafeAreaInsets();
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("AED");
  const [amount, setAmount] = useState("100");
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const fromRate = CURRENCIES.find((c) => c.code === fromCur)?.rate ?? 1;
  const toRate = CURRENCIES.find((c) => c.code === toCur)?.rate ?? 1;
  const converted = ((parseFloat(amount) || 0) / fromRate) * toRate;
  const exchangeRate = toRate / fromRate;

  const swap = () => { setFromCur(toCur); setToCur(fromCur); };

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <Text style={S.backText}>←</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>Currency Exchange</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Rate card */}
        <View style={S.rateCard}>
          <Text style={S.rateLabel}>Live Exchange Rate</Text>
          <Text style={S.rateValue}>1 {fromCur} = {exchangeRate.toFixed(4)} {toCur}</Text>
          <Text style={S.rateNote}>Rates updated every 5 minutes · 0.5% conversion fee</Text>
        </View>

        {/* From */}
        <View style={S.section}>
          <Text style={S.fieldLabel}>You Send</Text>
          <View style={S.inputRow}>
            <TouchableOpacity style={S.currencyPicker} onPress={() => { setShowFromPicker(!showFromPicker); setShowToPicker(false); }} activeOpacity={0.8}>
              <Text style={S.currencyFlag}>{CURRENCIES.find((c) => c.code === fromCur)?.flag}</Text>
              <Text style={S.currencyCode}>{fromCur}</Text>
              <Text style={S.chevron}>▾</Text>
            </TouchableOpacity>
            <TextInput
              style={S.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="rgba(255,255,255,0.35)"
            />
          </View>
          {showFromPicker && (
            <View style={S.picker}>
              {CURRENCIES.filter((c) => c.code !== toCur).map((c) => (
                <TouchableOpacity key={c.code} style={[S.pickerItem, fromCur === c.code && S.pickerItemActive]} onPress={() => { setFromCur(c.code); setShowFromPicker(false); }} activeOpacity={0.8}>
                  <Text style={S.pickerFlag}>{c.flag}</Text>
                  <Text style={S.pickerCode}>{c.code}</Text>
                  <Text style={S.pickerName}>{c.name}</Text>
                  <Text style={S.pickerRate}>1 USD = {c.rate}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Swap button */}
        <View style={S.swapRow}>
          <View style={S.swapLine} />
          <TouchableOpacity style={S.swapBtn} onPress={swap} activeOpacity={0.8}>
            <Text style={S.swapBtnText}>⇅</Text>
          </TouchableOpacity>
          <View style={S.swapLine} />
        </View>

        {/* To */}
        <View style={S.section}>
          <Text style={S.fieldLabel}>You Receive</Text>
          <View style={S.inputRow}>
            <TouchableOpacity style={S.currencyPicker} onPress={() => { setShowToPicker(!showToPicker); setShowFromPicker(false); }} activeOpacity={0.8}>
              <Text style={S.currencyFlag}>{CURRENCIES.find((c) => c.code === toCur)?.flag}</Text>
              <Text style={S.currencyCode}>{toCur}</Text>
              <Text style={S.chevron}>▾</Text>
            </TouchableOpacity>
            <View style={[S.amountInput, S.amountDisplay]}>
              <Text style={S.amountDisplayText}>{converted.toFixed(2)}</Text>
            </View>
          </View>
          {showToPicker && (
            <View style={S.picker}>
              {CURRENCIES.filter((c) => c.code !== fromCur).map((c) => (
                <TouchableOpacity key={c.code} style={[S.pickerItem, toCur === c.code && S.pickerItemActive]} onPress={() => { setToCur(c.code); setShowToPicker(false); }} activeOpacity={0.8}>
                  <Text style={S.pickerFlag}>{c.flag}</Text>
                  <Text style={S.pickerCode}>{c.code}</Text>
                  <Text style={S.pickerName}>{c.name}</Text>
                  <Text style={S.pickerRate}>1 USD = {c.rate}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Summary */}
        <View style={S.summaryCard}>
          <View style={S.summaryRow}>
            <Text style={S.summaryLabel}>You send</Text>
            <Text style={S.summaryValue}>{parseFloat(amount) || 0} {fromCur}</Text>
          </View>
          <View style={S.summaryRow}>
            <Text style={S.summaryLabel}>Exchange fee (0.5%)</Text>
            <Text style={S.summaryValue}>-{((parseFloat(amount) || 0) * 0.005).toFixed(2)} {fromCur}</Text>
          </View>
          <View style={S.summaryRow}>
            <Text style={S.summaryLabel}>Rate</Text>
            <Text style={S.summaryValue}>1 {fromCur} = {exchangeRate.toFixed(4)} {toCur}</Text>
          </View>
          <View style={[S.summaryRow, S.summaryTotal]}>
            <Text style={S.summaryTotalLabel}>Recipient gets</Text>
            <Text style={S.summaryTotalValue}>{converted.toFixed(2)} {toCur}</Text>
          </View>
        </View>

        <View style={S.section}>
          <TouchableOpacity style={S.exchangeBtn} activeOpacity={0.88}>
            <Text style={S.exchangeBtnText}>Exchange Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerTitle: { flex: 1, color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold", textAlign: "center" },
  rateCard: { marginHorizontal: 20, marginBottom: 24, borderRadius: 16, backgroundColor: "rgba(100,67,244,0.12)", borderWidth: 1, borderColor: "rgba(100,67,244,0.25)", padding: 16, alignItems: "center", gap: 4 },
  rateLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 },
  rateValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  rateNote: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
  section: { paddingHorizontal: 20, marginBottom: 16 },
  fieldLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 },
  inputRow: { flexDirection: "row", gap: 10 },
  currencyPicker: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 14, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  currencyFlag: { fontSize: 20 },
  currencyCode: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", fontFamily: "Chillax-Bold" },
  chevron: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  amountInput: { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", paddingHorizontal: 14, paddingVertical: 14, color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  amountDisplay: { justifyContent: "center" },
  amountDisplayText: { color: "#22C55E", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  swapRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginBottom: 16, gap: 12 },
  swapLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  swapBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(100,67,244,0.2)", borderWidth: 1, borderColor: "rgba(100,67,244,0.4)", alignItems: "center", justifyContent: "center" },
  swapBtnText: { color: "#A78BFA", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  picker: { marginTop: 8, borderRadius: 12, backgroundColor: "#1A0A3D", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", overflow: "hidden" },
  pickerItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.12)" },
  pickerItemActive: { backgroundColor: "rgba(100,67,244,0.15)" },
  pickerFlag: { fontSize: 18 },
  pickerCode: { color: "#FFFFFF", fontSize: 13, fontWeight: "900", fontFamily: "Chillax-Bold", width: 40 },
  pickerName: { flex: 1, color: "rgba(255,255,255,0.5)", fontSize: 12 },
  pickerRate: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
  summaryCard: { marginHorizontal: 20, marginBottom: 20, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", padding: 16, gap: 10 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  summaryValue: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "700" },
  summaryTotal: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)", paddingTop: 10, marginTop: 4 },
  summaryTotalLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  summaryTotalValue: { color: "#22C55E", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  exchangeBtn: { borderRadius: 14, backgroundColor: "#6443F4", paddingVertical: 16, alignItems: "center" },
  exchangeBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
});
