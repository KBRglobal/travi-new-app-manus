import { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";

const FILTERS = ["All", "Debit", "Credit", "Cashback"];
const TRANSACTIONS = [
  { id: "1", label: "Bali Hotel", type: "debit", amount: -425.00, date: "Mar 12", icon: "hotel", color: DS.purple, category: "Accommodation" },
  { id: "2", label: "Cashback Reward", type: "credit", amount: +12.75, date: "Mar 10", icon: "card-giftcard", color: DS.success, category: "Rewards" },
  { id: "3", label: "Flight TLV→DPS", type: "debit", amount: -890.00, date: "Mar 8", icon: "flight", color: DS.pink, category: "Flights" },
  { id: "4", label: "Added Funds", type: "credit", amount: +500.00, date: "Mar 5", icon: "account-balance", color: DS.success, category: "Top-up" },
  { id: "5", label: "Tokyo Activity", type: "debit", amount: -65.00, date: "Mar 3", icon: "local-activity", color: DS.warning, category: "Activities" },
  { id: "6", label: "Santorini Hotel", type: "debit", amount: -320.00, date: "Feb 28", icon: "hotel", color: DS.purple, category: "Accommodation" },
  { id: "7", label: "Cashback Reward", type: "credit", amount: +9.60, date: "Feb 25", icon: "card-giftcard", color: DS.success, category: "Rewards" },
  { id: "8", label: "Restaurant Bali", type: "debit", amount: -28.00, date: "Feb 22", icon: "restaurant", color: DS.warning, category: "Food" },
];

export default function TransactionHistoryScreen() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? TRANSACTIONS : TRANSACTIONS.filter(t =>
    filter === "Debit" ? t.type === "debit" : filter === "Credit" ? t.type === "credit" : t.category === "Rewards"
  );

  return (
    <ScreenWrapper title="Transactions" scrollable={false}>
      {/* Filters */}
      <View style={s.filters}>
        {FILTERS.map(f => (
          <Pressable key={f} style={[s.filterBtn, filter === f && s.filterActive]} onPress={() => setFilter(f)}>
            <Text style={[s.filterText, filter === f && s.filterTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BlurView intensity={15} tint="dark" style={s.txCard}>
            <View style={[s.txIcon, { backgroundColor: item.color + "22", borderColor: item.color + "44" }]}>
              <MaterialIcons name={item.icon as any} size={20} color={item.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.txLabel}>{item.label}</Text>
              <Text style={s.txCategory}>{item.category} · {item.date}</Text>
            </View>
            <Text style={[s.txAmount, { color: item.amount > 0 ? DS.success : DS.white }]}>
              {item.amount > 0 ? "+" : ""}€{Math.abs(item.amount).toFixed(2)}
            </Text>
          </BlurView>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  filters: { flexDirection: "row", gap: 8, paddingHorizontal: 20, paddingVertical: 12 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  filterActive: { backgroundColor: DS.purple + "33", borderColor: DS.purple },
  filterText: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Medium" },
  filterTextActive: { color: DS.white },
  txCard: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.border, flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface },
  txIcon: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, justifyContent: "center", alignItems: "center" },
  txLabel: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  txCategory: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  txAmount: { fontSize: 15, fontFamily: "Chillax-Bold" },
});
