// Screen 48 — Wallet
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const TRANSACTIONS = [
  { id: "1", label: "Bali Hotel", type: "debit", amount: -425.00, date: "Mar 12", icon: "hotel", color: DS.purple },
  { id: "2", label: "Cashback Reward", type: "credit", amount: +12.75, date: "Mar 10", icon: "card-giftcard", color: DS.success },
  { id: "3", label: "Flight TLV→DPS", type: "debit", amount: -890.00, date: "Mar 8", icon: "flight", color: DS.pink },
  { id: "4", label: "Added Funds", type: "credit", amount: +500.00, date: "Mar 5", icon: "account-balance", color: DS.success },
  { id: "5", label: "Tokyo Activity", type: "debit", amount: -65.00, date: "Mar 3", icon: "local-activity", color: DS.warning },
];

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DS.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.title}>Wallet</Text>
        <Pressable style={s.historyBtn} onPress={() => router.push("/(tabs)/transaction-history" as any)}>
          <MaterialIcons name="receipt-long" size={20} color={DS.white} />
        </Pressable>
      </View>

      {/* Balance card */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.balanceCard}>
          <View style={s.balanceTop}>
            <Text style={s.balanceLabel}>TRAVI Balance</Text>
            <View style={s.balanceBadge}>
              <MaterialIcons name="verified" size={12} color={DS.white} />
              <Text style={s.balanceBadgeText}>Verified</Text>
            </View>
          </View>
          <Text style={s.balanceAmount}>$1,247.50</Text>
          <Text style={s.balanceSub}>Available for travel</Text>
          <View style={s.balanceActions}>
            <Pressable style={s.balanceAction} onPress={() => router.push("/(tabs)/add-funds" as any)}>
              <MaterialIcons name="add" size={18} color={DS.white} />
              <Text style={s.balanceActionText}>Add Funds</Text>
            </Pressable>
            <View style={s.actionDivider} />
            <Pressable style={s.balanceAction} onPress={() => router.push("/(tabs)/wallet-withdraw" as any)}>
              <MaterialIcons name="arrow-upward" size={18} color={DS.white} />
              <Text style={s.balanceActionText}>Withdraw</Text>
            </Pressable>
            <View style={s.actionDivider} />
            <Pressable style={s.balanceAction} onPress={() => router.push("/(tabs)/split-payment" as any)}>
              <MaterialIcons name="call-split" size={18} color={DS.white} />
              <Text style={s.balanceActionText}>Split</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      {/* Stats row */}
      <View style={s.statsRow}>
        <View style={s.statCard}>
          <MaterialIcons name="card-giftcard" size={20} color={DS.success} />
          <Text style={s.statAmount}>$47.25</Text>
          <Text style={s.statLabel}>Cashback</Text>
        </View>
        <View style={s.statCard}>
          <MaterialIcons name="star" size={20} color={DS.warning} />
          <Text style={s.statAmount}>2,840</Text>
          <Text style={s.statLabel}>Points</Text>
        </View>
        <View style={s.statCard}>
          <MaterialIcons name="currency-exchange" size={20} color={DS.info} />
          <Text style={s.statAmount}>12</Text>
          <Text style={s.statLabel}>Currencies</Text>
        </View>
      </View>

      {/* Recent transactions */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Recent Transactions</Text>
          <Pressable onPress={() => router.push("/(tabs)/transaction-history" as any)}>
            <Text style={s.seeAll}>See All</Text>
          </Pressable>
        </View>
        <View style={s.txCard}>
          {TRANSACTIONS.map((tx, idx) => (
            <View key={tx.id} style={[s.txRow, idx < TRANSACTIONS.length - 1 && s.txRowBorder]}>
              <View style={[s.txIcon, { backgroundColor: tx.color + "22", borderColor: tx.color + "44" }]}>
                <MaterialIcons name={tx.icon as any} size={18} color={tx.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.txLabel}>{tx.label}</Text>
                <Text style={s.txDate}>{tx.date}</Text>
              </View>
              <Text style={[s.txAmount, { color: tx.type === "credit" ? DS.success : DS.white }]}>
                {tx.type === "credit" ? "+" : ""}{tx.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: DS.white },
  historyBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  balanceCard: { borderRadius: 24, padding: 24 },
  balanceTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  balanceLabel: { fontSize: 13, fontFamily: "Satoshi-Medium", color: "rgba(255,255,255,0.8)" },
  balanceBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.15)" },
  balanceBadgeText: { fontSize: 11, fontFamily: "Satoshi-Medium", color: DS.white },
  balanceAmount: { fontSize: 40, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 4 },
  balanceSub: { fontSize: 13, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.7)", marginBottom: 20 },
  balanceActions: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 14, padding: 4 },
  balanceAction: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 10, gap: 6 },
  balanceActionText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.white },
  actionDivider: { width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.2)" },
  statsRow: { flexDirection: "row", paddingHorizontal: 16, gap: 10, marginBottom: 24 },
  statCard: { flex: 1, alignItems: "center", padding: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, gap: 4 },
  statAmount: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white },
  statLabel: { fontSize: 11, fontFamily: "Satoshi-Regular", color: DS.muted },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: DS.white },
  seeAll: { fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.purple },
  txCard: { backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, overflow: "hidden" },
  txRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  txRowBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  txIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  txLabel: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.white, marginBottom: 2 },
  txDate: { fontSize: 12, fontFamily: "Satoshi-Regular", color: DS.muted },
  txAmount: { fontSize: 15, fontFamily: "Satoshi-Bold" },
});
