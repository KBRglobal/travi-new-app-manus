// Screen 39 — Expenses Tracker — STATIC 
// Summary 140px + budget bar, Filter tabs, Date-grouped rows 88px, Add expense modal, Split button
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const FILTERS = ["All", "Food", "Transport", "Activities", "Shopping"];

const EXPENSES = [
  { date: "Apr 16", items: [
    { title: "Lunch at Locavore", category: "Food", amount: "E35", time: "13:00" },
    { title: "Grab to Ubud", category: "Transport", amount: "E8", time: "09:30" },
    { title: "Rice Terraces Entry", category: "Activities", amount: "E15", time: "10:00" },
  ]},
  { date: "Apr 15", items: [
    { title: "Airport Transfer", category: "Transport", amount: "E25", time: "14:30" },
    { title: "Dinner at Sardine", category: "Food", amount: "E55", time: "19:00" },
    { title: "Minimart Supplies", category: "Shopping", amount: "E12", time: "16:00" },
  ]},
];

export default function ExpensesScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Expenses</Text>
        <Pressable><Text style={s.splitText}>Split</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Summary — 140px */}
        <View style={s.summaryCard}>
          <View style={s.summaryRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.summaryLabel}>Total Spent</Text>
              <Text style={s.summaryAmount}>E150</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={s.summaryLabel}>Budget</Text>
              <Text style={s.summaryBudget}>E500</Text>
            </View>
          </View>
          <View style={s.budgetBar}><View style={[s.budgetFill, { width: "30%" }]} /></View>
          <Text style={s.budgetText}>E350 remaining (70%)</Text>
        </View>

        {/* Filter tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filtersRow}>
          {FILTERS.map((f, i) => (
            <Pressable key={f} style={[s.filterChip, i === 0 && s.filterActive]}>
              <Text style={[s.filterText, i === 0 && s.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Date-grouped expenses */}
        {EXPENSES.map((group) => (
          <View key={group.date} style={s.dateGroup}>
            <Text style={s.dateHeader}>{group.date}</Text>
            {group.items.map((item, i) => (
              <Pressable key={i} style={s.expenseRow}>
                <View style={s.catIcon}><Text style={s.catText}>{item.category[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.expTitle}>{item.title}</Text>
                  <Text style={s.expCat}>{item.category} | {item.time}</Text>
                </View>
                <Text style={s.expAmount}>{item.amount}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Add expense FAB */}
      <Pressable style={s.fab}><Text style={s.fabText}>+</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  splitText: { color: "#888", fontSize: 14 },
  summaryCard: { margin: 20, padding: 16, height: 140, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center" },
  summaryRow: { flexDirection: "row", marginBottom: 12 },
  summaryLabel: { color: "#888", fontSize: 12 },
  summaryAmount: { color: "#FFF", fontSize: 28, fontWeight: "800", marginTop: 2 },
  summaryBudget: { color: "#FFF", fontSize: 20, fontWeight: "700", marginTop: 2 },
  budgetBar: { height: 8, borderRadius: 4, backgroundColor: "#222" },
  budgetFill: { height: 8, borderRadius: 4, backgroundColor: "#555" },
  budgetText: { color: "#888", fontSize: 11, marginTop: 6 },
  filtersRow: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  filterActive: { backgroundColor: "#333", borderColor: "#555" },
  filterText: { color: "#888", fontSize: 13 },
  filterTextActive: { color: "#FFF" },
  dateGroup: { paddingHorizontal: 20, marginTop: 16 },
  dateHeader: { color: "#888", fontSize: 13, fontWeight: "600", marginBottom: 8 },
  expenseRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, height: 88, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  catIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  catText: { color: "#888", fontSize: 14, fontWeight: "700" },
  expTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  expCat: { color: "#888", fontSize: 12, marginTop: 2 },
  expAmount: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  fab: { position: "absolute", bottom: 36, right: 20, width: 56, height: 56, borderRadius: 16, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  fabText: { color: "#FFF", fontSize: 28, fontWeight: "300" },
});
