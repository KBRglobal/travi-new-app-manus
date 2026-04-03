import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
];

export default function CurrencySelectorScreen() {
  const colors = useColors();
  const [selected, setSelected] = useState("USD");

  const handleSelect = (code: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(code);
  };

  return (
    <ScreenContainer>
      <View style={[S.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[S.headerTitle, { color: colors.text }]}>Currency</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={CURRENCIES}
        keyExtractor={(item) => item.code}
        contentContainerStyle={S.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[S.row, { borderBottomColor: colors.border }]}
            onPress={() => handleSelect(item.code)}
            activeOpacity={0.7}
          >
            <View style={S.rowLeft}>
              <Text style={[S.name, { color: colors.text }]}>{item.name}</Text>
              <Text style={[S.code, { color: colors.muted }]}>{item.code} · {item.symbol}</Text>
            </View>
            {selected === item.code ? (
              <IconSymbol name="checkmark.circle.fill" size={24} color="#6443F4" />
            ) : null}
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}

const S = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 18, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  list: { paddingBottom: 100 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 0.5 },
  rowLeft: { flex: 1, marginRight: 12 },
  name: { fontSize: 16, fontFamily: "Satoshi-Regular", fontWeight: "500" },
  code: { fontSize: 14, fontFamily: "Satoshi-Regular", marginTop: 2 },
});
