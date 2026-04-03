// Screen 50 — Transaction History — STATIC WIREFRAME
// Summary row 80px, Filter chips, Month-grouped rows 96px
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const FILTERS = ["All", "Cashback", "Payments", "Transfers", "Refunds"];

const TRANSACTIONS = [
  { month: "April 2026", items: [
    { title: "Bali Trip Cashback", type: "Cashback", amount: "+E417", date: "Apr 21" },
    { title: "Hotel Payment", type: "Payment", amount: "-E1,400", date: "Apr 15" },
    { title: "Flight Booking", type: "Payment", amount: "-E1,200", date: "Apr 10" },
  ]},
  { month: "March 2026", items: [
    { title: "Added Funds", type: "Transfer", amount: "+E2,000", date: "Mar 28" },
    { title: "Subscription", type: "Payment", amount: "-E9.99", date: "Mar 15" },
    { title: "Referral Bonus", type: "Cashback", amount: "+E25", date: "Mar 10" },
  ]},
];

export default function TransactionHistoryScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Transactions</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Summary row — 80px */}
        <View style={s.summaryRow}>
          <View style={s.summaryItem}><Text style={s.summaryLabel}>Income</Text><Text style={[s.summaryNum, { color: "#4ADE80" }]}>+E2,442</Text></View>
          <View style={s.summaryItem}><Text style={s.summaryLabel}>Spent</Text><Text style={[s.summaryNum, { color: "#F87171" }]}>-E2,609.99</Text></View>
          <View style={s.summaryItem}><Text style={s.summaryLabel}>Net</Text><Text style={s.summaryNum}>-E167.99</Text></View>
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filtersRow}>
          {FILTERS.map((f, i) => (
            <Pressable key={f} style={[s.filterChip, i === 0 && s.filterActive]}>
              <Text style={[s.filterText, i === 0 && s.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Month-grouped rows — 96px */}
        {TRANSACTIONS.map((group) => (
          <View key={group.month} style={s.monthGroup}>
            <Text style={s.monthHeader}>{group.month}</Text>
            {group.items.map((item, i) => (
              <Pressable key={i} style={s.txRow}>
                <View style={s.txIcon}><Text style={s.txIconText}>{item.type[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.txTitle}>{item.title}</Text>
                  <Text style={s.txType}>{item.type} | {item.date}</Text>
                </View>
                <Text style={[s.txAmount, item.amount.startsWith("+") && { color: "#4ADE80" }]}>{item.amount}</Text>
              </Pressable>
            ))}
          </View>
        ))}

        <Pressable style={s.loadMore}><Text style={s.loadMoreText}>Load More</Text></Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  summaryRow: { flexDirection: "row", margin: 20, padding: 16, height: 80, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  summaryItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  summaryLabel: { color: "#888", fontSize: 11 },
  summaryNum: { color: "#FFF", fontSize: 16, fontWeight: "800", marginTop: 2 },
  filtersRow: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  filterActive: { backgroundColor: "#333", borderColor: "#555" },
  filterText: { color: "#888", fontSize: 13 },
  filterTextActive: { color: "#FFF" },
  monthGroup: { paddingHorizontal: 20, marginTop: 16 },
  monthHeader: { color: "#888", fontSize: 13, fontWeight: "600", marginBottom: 8 },
  txRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, height: 72, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  txIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  txIconText: { color: "#888", fontSize: 14, fontWeight: "700" },
  txTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  txType: { color: "#888", fontSize: 12, marginTop: 2 },
  txAmount: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  loadMore: { alignSelf: "center", marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: "#333" },
  loadMoreText: { color: "#888", fontSize: 13 },
});
