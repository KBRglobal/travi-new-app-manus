import { useState, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  TextInput, Platform, FlatList
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

// ─── Currency Data ────────────────────────────────────────────────────────────
interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToUSD: number; // how many of this currency = 1 USD
}

const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar",       symbol: "$",  flag: "🇺🇸", rateToUSD: 1 },
  { code: "EUR", name: "Euro",            symbol: "€",  flag: "🇪🇺", rateToUSD: 0.92 },
  { code: "GBP", name: "British Pound",   symbol: "£",  flag: "🇬🇧", rateToUSD: 0.79 },
  { code: "JPY", name: "Japanese Yen",    symbol: "¥",  flag: "🇯🇵", rateToUSD: 149.5 },
  { code: "AED", name: "UAE Dirham",      symbol: "د.إ",flag: "🇦🇪", rateToUSD: 3.67 },
  { code: "ILS", name: "Israeli Shekel",  symbol: "₪",  flag: "🇮🇱", rateToUSD: 3.72 },
  { code: "THB", name: "Thai Baht",       symbol: "฿",  flag: "🇹🇭", rateToUSD: 35.1 },
  { code: "IDR", name: "Indonesian Rupiah",symbol: "Rp",flag: "🇮🇩", rateToUSD: 15800 },
  { code: "INR", name: "Indian Rupee",    symbol: "₹",  flag: "🇮🇳", rateToUSD: 83.2 },
  { code: "MXN", name: "Mexican Peso",    symbol: "$",  flag: "🇲🇽", rateToUSD: 17.1 },
  { code: "BRL", name: "Brazilian Real",  symbol: "R$", flag: "🇧🇷", rateToUSD: 4.97 },
  { code: "AUD", name: "Australian Dollar",symbol: "A$",flag: "🇦🇺", rateToUSD: 1.53 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", rateToUSD: 1.36 },
  { code: "CHF", name: "Swiss Franc",     symbol: "Fr", flag: "🇨🇭", rateToUSD: 0.90 },
  { code: "SGD", name: "Singapore Dollar",symbol: "S$", flag: "🇸🇬", rateToUSD: 1.34 },
  { code: "KRW", name: "South Korean Won",symbol: "₩",  flag: "🇰🇷", rateToUSD: 1325 },
];

function convert(amount: number, from: Currency, to: Currency): number {
  const usd = amount / from.rateToUSD;
  return usd * to.rateToUSD;
}

function formatAmount(val: number, currency: Currency): string {
  if (val >= 1000) return `${currency.symbol}${val.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `${currency.symbol}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ─── Currency Picker Modal ────────────────────────────────────────────────────
function CurrencyPicker({ selected, onSelect, onClose }: { selected: string; onSelect: (c: Currency) => void; onClose: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = CURRENCIES.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={P.overlay}>
      <View style={P.sheet}>
        <LinearGradient colors={["#1A0A3D", "#0D0628"]} style={StyleSheet.absoluteFillObject} />
        <View style={P.handle} />
        <Text style={P.title}>Select Currency</Text>
        <View style={P.searchWrap}>
          <IconSymbol name="magnifyingglass" size={16} color="#9BA1A6" />
          <TextInput
            style={P.searchInput}
            placeholder="Search..."
            placeholderTextColor="#5A4D72"
            value={search}
            onChangeText={setSearch}
            autoFocus
          />
        </View>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.code}
          style={{ maxHeight: 360 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[P.currencyRow, item.code === selected && P.currencyRowSelected]}
              onPress={() => { onSelect(item); onClose(); }}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 24, fontFamily: "Satoshi-Regular" }}>{item.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={P.currencyCode}>{item.code}</Text>
                <Text style={P.currencyName}>{item.name}</Text>
              </View>
              {item.code === selected && <IconSymbol name="checkmark" size={16} color="#6443F4" />}
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={P.closeBtn} onPress={onClose} activeOpacity={0.8}>
          <Text style={P.closeBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CurrencyConverterScreen() {
  const insets = useSafeAreaInsets();
  const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES.find((c) => c.code === "USD")!);
  const [toCurrency, setToCurrency] = useState<Currency>(CURRENCIES.find((c) => c.code === "JPY")!);
  const [amount, setAmount] = useState("100");
  const [showPicker, setShowPicker] = useState<"from" | "to" | null>(null);

  const numAmount = parseFloat(amount) || 0;
  const converted = convert(numAmount, fromCurrency, toCurrency);

  const handleSwap = useCallback(() => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const QUICK_AMOUNTS = [10, 50, 100, 500, 1000];

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#1A0A3D", "#0D0628", "#0D1B2A"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Currency Converter</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 130 }}>
        {/* Converter Card */}
        <View style={S.converterCard}>
          <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />

          {/* From */}
          <Text style={S.converterLabel}>From</Text>
          <View style={S.converterRow}>
            <TouchableOpacity style={S.currencyBtn} onPress={() => setShowPicker("from")} activeOpacity={0.8}>
              <Text style={{ fontSize: 22, fontFamily: "Satoshi-Regular" }}>{fromCurrency.flag}</Text>
              <Text style={S.currencyBtnCode}>{fromCurrency.code}</Text>
              <IconSymbol name="chevron.down" size={14} color="#9BA1A6" />
            </TouchableOpacity>
            <TextInput
              style={S.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#5A4D72"
              returnKeyType="done"
            />
          </View>

          {/* Swap button */}
          <View style={S.swapRow}>
            <View style={S.dividerLine} />
            <TouchableOpacity style={S.swapBtn} onPress={handleSwap} activeOpacity={0.8}>
              <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
              <Text style={{ fontSize: 16, fontFamily: "Satoshi-Regular" }}>⇅</Text>
            </TouchableOpacity>
            <View style={S.dividerLine} />
          </View>

          {/* To */}
          <Text style={S.converterLabel}>To</Text>
          <View style={S.converterRow}>
            <TouchableOpacity style={S.currencyBtn} onPress={() => setShowPicker("to")} activeOpacity={0.8}>
              <Text style={{ fontSize: 22, fontFamily: "Satoshi-Regular" }}>{toCurrency.flag}</Text>
              <Text style={S.currencyBtnCode}>{toCurrency.code}</Text>
              <IconSymbol name="chevron.down" size={14} color="#9BA1A6" />
            </TouchableOpacity>
            <View style={S.resultWrap}>
              <Text style={S.resultAmount}>{formatAmount(converted, toCurrency)}</Text>
            </View>
          </View>

          {/* Rate info */}
          <View style={S.rateRow}>
            <View style={S.rateDot} />
            <Text style={S.rateText}>
              1 {fromCurrency.code} = {formatAmount(convert(1, fromCurrency, toCurrency), toCurrency)} {toCurrency.code}
            </Text>
            <Text style={S.rateUpdated}>Live rate</Text>
          </View>
        </View>

        {/* Quick amounts */}
        <Text style={S.sectionLabel}>Quick Convert</Text>
        <View style={S.quickGrid}>
          {QUICK_AMOUNTS.map((q) => (
            <TouchableOpacity
              key={q}
              style={[S.quickChip, amount === String(q) && S.quickChipActive]}
              onPress={() => {
                setAmount(String(q));
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              activeOpacity={0.8}
            >
              <Text style={[S.quickChipText, amount === String(q) && S.quickChipTextActive]}>
                {fromCurrency.symbol}{q}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* All rates */}
        <Text style={S.sectionLabel}>All Rates vs {fromCurrency.code}</Text>
        <View style={S.ratesCard}>
          {CURRENCIES.filter((c) => c.code !== fromCurrency.code).map((c, i) => {
            const rate = convert(1, fromCurrency, c);
            return (
              <View key={c.code} style={[S.rateItem, i > 0 && S.rateItemBorder]}>
                <Text style={{ fontSize: 20, fontFamily: "Satoshi-Regular" }}>{c.flag}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.rateItemCode}>{c.code}</Text>
                  <Text style={S.rateItemName}>{c.name}</Text>
                </View>
                <Text style={S.rateItemValue}>{formatAmount(rate, c)}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Currency Picker Modal */}
      {showPicker && (
        <CurrencyPicker
          selected={showPicker === "from" ? fromCurrency.code : toCurrency.code}
          onSelect={(c) => showPicker === "from" ? setFromCurrency(c) : setToCurrency(c)}
          onClose={() => setShowPicker(null)}
        />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 130, paddingTop: 4 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontFamily: "Chillax-Bold", fontWeight: "800" },

  converterCard: { borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)", padding: 20, gap: 8, marginBottom: 24 },
  converterLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  converterRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  currencyBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  currencyBtnCode: { color: "#FFF", fontSize: 15, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  amountInput: { flex: 1, color: "#FFF", fontSize: 28, fontFamily: "Chillax-Bold", fontWeight: "800", textAlign: "right" },
  resultWrap: { flex: 1, alignItems: "flex-end" },
  resultAmount: { color: "#A78BFA", fontSize: 28, fontFamily: "Chillax-Bold", fontWeight: "800" },

  swapRow: { flexDirection: "row", alignItems: "center", gap: 12, marginVertical: 4 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.55)" },
  swapBtn: { width: 40, height: 40, borderRadius: 20, overflow: "hidden", alignItems: "center", justifyContent: "center" },

  rateRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  rateDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#22C55E" },
  rateText: { color: "#9BA1A6", fontSize: 12, fontFamily: "Satoshi-Regular", flex: 1 },
  rateUpdated: { color: "#22C55E", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700" },

  sectionLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  quickChip: { borderRadius: 12, paddingHorizontal: 16, paddingVertical: 9, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)", backgroundColor: "rgba(255,255,255,0.55)" },
  quickChipActive: { borderColor: "#6443F4", backgroundColor: "rgba(100,67,244,0.2)" },
  quickChipText: { color: "#9BA1A6", fontSize: 14, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  quickChipTextActive: { color: "#A78BFA" },

  ratesCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)", backgroundColor: "rgba(255,255,255,0.55)" },
  rateItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 12 },
  rateItemBorder: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.55)" },
  rateItemCode: { color: "#FFF", fontSize: 14, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  rateItemName: { color: "#9BA1A6", fontSize: 11, fontFamily: "Satoshi-Regular" },
  rateItemValue: { color: "#ECEDEE", fontSize: 15, fontFamily: "Chillax-Semibold", fontWeight: "700" },
});

const P = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end", zIndex: 100 },
  sheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden", padding: 20, paddingBottom: 130 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.55)", alignSelf: "center", marginBottom: 16 },
  title: { color: "#FFF", fontSize: 18, fontFamily: "Chillax-Bold", fontWeight: "800", marginBottom: 12 },
  searchWrap: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  searchInput: { flex: 1, color: "#FFF", fontSize: 15, fontFamily: "Satoshi-Regular" },
  currencyRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 4, borderRadius: 12 },
  currencyRowSelected: { backgroundColor: "rgba(100,67,244,0.15)" },
  currencyCode: { color: "#FFF", fontSize: 15, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  currencyName: { color: "#9BA1A6", fontSize: 12, fontFamily: "Satoshi-Regular" },
  closeBtn: { marginTop: 12, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 14, paddingVertical: 14, alignItems: "center" },
  closeBtnText: { color: "#9BA1A6", fontSize: 16, fontFamily: "Chillax-Semibold", fontWeight: "700" },
});
