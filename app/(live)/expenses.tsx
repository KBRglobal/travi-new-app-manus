import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  FlatList, Platform, Dimensions, TextInput, Modal
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "all" | "food" | "transport" | "hotel" | "activity" | "shopping" | "other";

interface Expense {
  id: string;
  title: string;
  category: Exclude<Category, "all">;
  amount: number;
  currency: string;
  paidBy: string;
  date: string;
  splitWith: string[];
  note?: string;
  icon: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const EXPENSES: Expense[] = [
  { id: "1", title: "Sushi Saito Dinner", category: "food", amount: 180, currency: "USD", paidBy: "You", date: "Today", splitWith: ["Maya", "Lior"], icon: "fork.knife" },
  { id: "2", title: "Shinkansen Tokyo → Kyoto", category: "transport", amount: 140, currency: "USD", paidBy: "Maya", date: "Today", splitWith: ["You", "Lior"], icon: "tram.fill" },
  { id: "3", title: "Airbnb Night 4", category: "hotel", amount: 210, currency: "USD", paidBy: "Lior", date: "Yesterday", splitWith: ["You", "Maya"], icon: "house.fill" },
  { id: "4", title: "TeamLab Planets", category: "activity", amount: 90, currency: "USD", paidBy: "You", date: "Yesterday", splitWith: ["Maya", "Lior"], icon: "ticket.fill" },
  { id: "5", title: "Convenience Store", category: "food", amount: 32, currency: "USD", paidBy: "You", date: "Yesterday", splitWith: [], icon: "cart.fill" },
  { id: "6", title: "Taxi to Shibuya", category: "transport", amount: 18, currency: "USD", paidBy: "Maya", date: "Mar 18", splitWith: ["You"], icon: "car.fill" },
  { id: "7", title: "Souvenir Shopping", category: "shopping", amount: 85, currency: "USD", paidBy: "You", date: "Mar 18", splitWith: [], icon: "bag.fill" },
  { id: "8", title: "Ramen Ichiran", category: "food", amount: 45, currency: "USD", paidBy: "Lior", date: "Mar 17", splitWith: ["You", "Maya"], icon: "fork.knife" },
];

const CATEGORIES: { key: Category; label: string; icon: string; color: string }[] = [
  { key: "all",       label: "All",       icon: "square.grid.2x2.fill", color: BRAND.purple },
  { key: "food",      label: "Food",      icon: "fork.knife",           color: BRAND.orange },
  { key: "transport", label: "Transport", icon: "car.fill",             color: BRAND.cyan },
  { key: "hotel",     label: "Hotel",     icon: "house.fill",           color: "#01BEFF" },
  { key: "activity",  label: "Activity",  icon: "ticket.fill",          color: BRAND.pink },
  { key: "shopping",  label: "Shopping",  icon: "bag.fill",             color: BRAND.green },
];

const CATEGORY_TOTALS: Record<Exclude<Category,"all">, number> = {
  food: 257, transport: 158, hotel: 210, activity: 90, shopping: 85, other: 0,
};
const TOTAL = Object.values(CATEGORY_TOTALS).reduce((a, b) => a + b, 0);

// ─── Donut Chart (simple) ─────────────────────────────────────────────────────
function DonutChart() {
  const slices = [
    { pct: 32, color: BRAND.orange, label: "Food" },
    { pct: 20, color: BRAND.cyan,   label: "Transport" },
    { pct: 26, color: "#01BEFF",    label: "Hotel" },
    { pct: 11, color: BRAND.pink,   label: "Activity" },
    { pct: 11, color: BRAND.green,  label: "Shopping" },
  ];
  return (
    <View style={S.donutWrap}>
      {/* Simple visual donut using colored arcs */}
      <View style={S.donut}>
        <LinearGradient colors={["rgba(100,67,244,0.3)", "rgba(249,68,152,0.2)"]} style={StyleSheet.absoluteFillObject} />
        <View style={S.donutCenter}>
          <Text style={S.donutTotal}>${TOTAL}</Text>
          <Text style={S.donutSub}>Total</Text>
        </View>
      </View>
      <View style={S.donutLegend}>
        {slices.map((s, i) => (
          <View key={i} style={S.legendRow}>
            <View style={[S.legendDot, { backgroundColor: s.color }]} />
            <Text style={S.legendLabel}>{s.label}</Text>
            <Text style={[S.legendPct, { color: s.color }]}>{s.pct}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Expense Card ─────────────────────────────────────────────────────────────
function ExpenseCard({ item }: { item: Expense }) {
  const catColor = CATEGORIES.find((c) => c.key === item.category)?.color ?? BRAND.purple;
  const myShare = item.splitWith.length > 0 ? item.amount / (item.splitWith.length + 1) : item.amount;
  const iOwed = item.paidBy !== "You" && item.splitWith.includes("You");
  const theyOwe = item.paidBy === "You" && item.splitWith.length > 0;

  return (
    <TouchableOpacity style={S.expCard} activeOpacity={0.85}>
      <LinearGradient colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]} style={StyleSheet.absoluteFillObject} />
      <View style={[S.expIconWrap, { backgroundColor: catColor + "20" }]}>
        <IconSymbol name={item.icon as any} size={18} color={catColor} />
      </View>
      <View style={S.expContent}>
        <View style={S.expTitleRow}>
          <Text style={S.expTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={S.expAmount}>${item.amount}</Text>
        </View>
        <View style={S.expMetaRow}>
          <Text style={S.expMeta}>Paid by {item.paidBy}</Text>
          {item.splitWith.length > 0 && (
            <View style={S.splitBadge}>
              <IconSymbol name="person.2.fill" size={10} color={BRAND.purple} />
              <Text style={S.splitBadgeText}>Split {item.splitWith.length + 1}</Text>
            </View>
          )}
          <Text style={S.expDate}>{item.date}</Text>
        </View>
        {(iOwed || theyOwe) && (
          <View style={[S.balancePill, { backgroundColor: iOwed ? "rgba(249,68,152,0.12)" : "rgba(2,166,92,0.12)" }]}>
            <Text style={[S.balancePillText, { color: iOwed ? BRAND.pink : BRAND.green }]}>
              {iOwed ? `You owe $${myShare.toFixed(0)}` : `They owe you $${(item.amount - myShare).toFixed(0)}`}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── Add Expense Modal ────────────────────────────────────────────────────────
function AddExpenseModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [cat, setCat] = useState<Exclude<Category,"all">>("food");

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={S.modalOverlay}>
        <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={onClose} />
        <View style={S.modalSheet}>
          <LinearGradient colors={["#3A1F5C", "#24103E"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.modalHandle} />
          <Text style={S.modalTitle}>Add Expense</Text>

          <TextInput
            style={S.input}
            placeholder="What did you spend on?"
            placeholderTextColor={BRAND.textMuted}
            value={title}
            onChangeText={setTitle}
          />
          <View style={S.amountRow}>
            <Text style={S.currencySymbol}>$</Text>
            <TextInput
              style={[S.input, S.amountInput]}
              placeholder="0.00"
              placeholderTextColor={BRAND.textMuted}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <Text style={S.inputLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.catRow}>
            {CATEGORIES.filter((c) => c.key !== "all").map((c) => (
              <TouchableOpacity
                key={c.key}
                style={[S.catChip, cat === c.key && { borderColor: c.color }]}
                onPress={() => setCat(c.key as any)}
                activeOpacity={0.8}
              >
                {cat === c.key && <LinearGradient colors={[c.color + "30", c.color + "15"]} style={StyleSheet.absoluteFillObject} />}
                <IconSymbol name={c.icon as any} size={14} color={cat === c.key ? c.color : BRAND.textMuted} />
                <Text style={[S.catChipText, cat === c.key && { color: c.color }]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={S.addBtn} activeOpacity={0.85} onPress={onClose}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.addBtnText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ExpensesScreen() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<Category>("all");
  const [tab, setTab] = useState<"expenses" | "balances" | "chart">("expenses");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = category === "all" ? EXPENSES : EXPENSES.filter((e) => e.category === category);

  // Balance calculations
  const myTotal = EXPENSES.filter((e) => e.paidBy === "You").reduce((a, e) => a + e.amount, 0);
  const iOwe = EXPENSES.filter((e) => e.paidBy !== "You" && e.splitWith.includes("You"))
    .reduce((a, e) => a + e.amount / (e.splitWith.length + 1), 0);
  const theyOwe = EXPENSES.filter((e) => e.paidBy === "You" && e.splitWith.length > 0)
    .reduce((a, e) => a + e.amount - e.amount / (e.splitWith.length + 1), 0);

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#24103E", "#1A0A30", "#0D0520"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtnInner} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Expenses</Text>
        <TouchableOpacity
          style={S.addIconBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowAdd(true);
          }}
          activeOpacity={0.8}
        >
          <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="plus" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Balance summary cards */}
      <View style={S.balanceRow}>
        <View style={[S.balanceCard, { borderColor: "rgba(100,67,244,0.3)" }]}>
          <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(100,67,244,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.balanceCardLabel}>Total Trip</Text>
          <Text style={[S.balanceCardAmount, { color: BRAND.purple }]}>${TOTAL}</Text>
        </View>
        <View style={[S.balanceCard, { borderColor: "rgba(2,166,92,0.3)" }]}>
          <LinearGradient colors={["rgba(2,166,92,0.2)", "rgba(2,166,92,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.balanceCardLabel}>They Owe You</Text>
          <Text style={[S.balanceCardAmount, { color: BRAND.green }]}>${theyOwe.toFixed(0)}</Text>
        </View>
        <View style={[S.balanceCard, { borderColor: "rgba(249,68,152,0.3)" }]}>
          <LinearGradient colors={["rgba(249,68,152,0.2)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.balanceCardLabel}>You Owe</Text>
          <Text style={[S.balanceCardAmount, { color: BRAND.pink }]}>${iOwe.toFixed(0)}</Text>
        </View>
      </View>

      {/* Tab switcher */}
      <View style={S.tabRow}>
        {(["expenses", "balances", "chart"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[S.tabBtn, tab === t && S.tabBtnActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setTab(t);
            }}
            activeOpacity={0.8}
          >
            {tab === t && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
            <Text style={[S.tabBtnText, tab === t && S.tabBtnTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category filter (only for expenses tab) */}
      {tab === "expenses" && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.catFilterRow}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={[S.catFilter, category === c.key && { borderColor: c.color }]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setCategory(c.key);
              }}
              activeOpacity={0.8}
            >
              {category === c.key && <LinearGradient colors={[c.color + "30", c.color + "15"]} style={StyleSheet.absoluteFillObject} />}
              <IconSymbol name={c.icon as any} size={14} color={category === c.key ? c.color : BRAND.textMuted} />
              <Text style={[S.catFilterText, category === c.key && { color: c.color }]}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}>
        {tab === "expenses" && (
          <View style={{ gap: 10, marginTop: 8 }}>
            {filtered.map((item) => <ExpenseCard key={item.id} item={item} />)}
          </View>
        )}

        {tab === "balances" && (
          <View style={{ marginTop: 8, gap: 12 }}>
            {["Maya R.", "Lior K."].map((person, i) => {
              const owes = i === 0 ? 47 : -23;
              return (
                <View key={i} style={S.personCard}>
                  <LinearGradient colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]} style={StyleSheet.absoluteFillObject} />
                  <View style={S.personAvatar}>
                    <LinearGradient colors={["#6443F4", "#F94498"]} style={StyleSheet.absoluteFillObject} />
                    <Text style={S.personAvatarText}>{person[0]}</Text>
                  </View>
                  <View style={S.personInfo}>
                    <Text style={S.personName}>{person}</Text>
                    <Text style={[S.personBalance, { color: owes > 0 ? BRAND.green : BRAND.pink }]}>
                      {owes > 0 ? `Owes you $${owes}` : `You owe $${Math.abs(owes)}`}
                    </Text>
                  </View>
                  <TouchableOpacity style={[S.settleBtn, { borderColor: owes > 0 ? BRAND.green : BRAND.pink }]} activeOpacity={0.8}>
                    <Text style={[S.settleBtnText, { color: owes > 0 ? BRAND.green : BRAND.pink }]}>
                      {owes > 0 ? "Remind" : "Pay"}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {tab === "chart" && (
          <View style={{ marginTop: 8 }}>
            <DonutChart />
            <View style={S.catBreakdown}>
              {CATEGORIES.filter((c) => c.key !== "all").map((c) => {
                const total = CATEGORY_TOTALS[c.key as Exclude<Category,"all">];
                const pct = Math.round((total / TOTAL) * 100);
                return (
                  <View key={c.key} style={S.catBreakdownRow}>
                    <View style={[S.catBreakdownIcon, { backgroundColor: c.color + "20" }]}>
                      <IconSymbol name={c.icon as any} size={14} color={c.color} />
                    </View>
                    <Text style={S.catBreakdownLabel}>{c.label}</Text>
                    <View style={S.catBreakdownBar}>
                      <View style={[S.catBreakdownFill, { width: `${pct}%` as any, backgroundColor: c.color }]} />
                    </View>
                    <Text style={[S.catBreakdownAmt, { color: c.color }]}>${total}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <AddExpenseModal visible={showAdd} onClose={() => setShowAdd(false)} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  orb1: { position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(100,67,244,0.1)" },
  orb2: { position: "absolute", bottom: 200, left: -80, width: 160, height: 160, borderRadius: 80, backgroundColor: "rgba(249,68,152,0.07)" },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4 },
  backBtnInner: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center", marginRight: 8 },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary, flex: 1 },
  addIconBtn: { overflow: "hidden", width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },

  balanceRow: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 16 },
  balanceCard: { flex: 1, overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, padding: 12, alignItems: "center" },
  balanceCardLabel: { ...TYPE.caption, color: BRAND.textMuted, marginBottom: 4 },
  balanceCardAmount: { ...TYPE.h3, fontFamily: "Chillax-Bold" },

  tabRow: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  tabBtn: { overflow: "hidden", flex: 1, borderRadius: RADIUS.full, paddingVertical: 9, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  tabBtnActive: { borderColor: "transparent" },
  tabBtnText: { ...TYPE.label, color: BRAND.textSecondary },
  tabBtnTextActive: { color: "#FFF" },

  catFilterRow: { paddingHorizontal: 16, gap: 8, marginBottom: 12, paddingBottom: 4 },
  catFilter: { overflow: "hidden", flexDirection: "row", alignItems: "center", gap: 5, borderRadius: RADIUS.full, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  catFilterText: { ...TYPE.caption, color: BRAND.textMuted },

  expCard: { overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", flexDirection: "row", alignItems: "flex-start", padding: 14, gap: 12 },
  expIconWrap: { width: 40, height: 40, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  expContent: { flex: 1 },
  expTitleRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  expTitle: { ...TYPE.bodyMed, color: BRAND.textPrimary, flex: 1, marginRight: 8 },
  expAmount: { ...TYPE.bodyMed, color: BRAND.textPrimary, fontFamily: "Chillax-Semibold" },
  expMetaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  expMeta: { ...TYPE.caption, color: BRAND.textMuted },
  expDate: { ...TYPE.caption, color: BRAND.textMuted, marginLeft: "auto" },
  splitBadge: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(100,67,244,0.15)", borderRadius: RADIUS.full, paddingHorizontal: 7, paddingVertical: 2 },
  splitBadgeText: { ...TYPE.caption, color: BRAND.purple },
  balancePill: { marginTop: 6, alignSelf: "flex-start", borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 3 },
  balancePillText: { ...TYPE.caption, fontFamily: "Satoshi-Bold" },

  personCard: { overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  personAvatar: { overflow: "hidden", width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  personAvatarText: { ...TYPE.h3, color: "#FFF", fontFamily: "Chillax-Bold" },
  personInfo: { flex: 1 },
  personName: { ...TYPE.bodyMed, color: BRAND.textPrimary, marginBottom: 2 },
  personBalance: { ...TYPE.small },
  settleBtn: { borderRadius: RADIUS.full, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1 },
  settleBtnText: { ...TYPE.label },

  donutWrap: { flexDirection: "row", alignItems: "center", padding: 20, gap: 20 },
  donut: { overflow: "hidden", width: 140, height: 140, borderRadius: 70, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(100,67,244,0.3)" },
  donutCenter: { alignItems: "center" },
  donutTotal: { ...TYPE.h2, color: "#FFF", fontFamily: "Chillax-Bold" },
  donutSub: { ...TYPE.caption, color: BRAND.textMuted },
  donutLegend: { flex: 1, gap: 8 },
  legendRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { ...TYPE.small, color: BRAND.textSecondary, flex: 1 },
  legendPct: { ...TYPE.small, fontFamily: "Satoshi-Bold" },

  catBreakdown: { gap: 12, marginTop: 8 },
  catBreakdownRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  catBreakdownIcon: { width: 32, height: 32, borderRadius: RADIUS.sm, alignItems: "center", justifyContent: "center" },
  catBreakdownLabel: { ...TYPE.small, color: BRAND.textPrimary, width: 70 },
  catBreakdownBar: { flex: 1, height: 6, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" },
  catBreakdownFill: { height: "100%", borderRadius: 3 },
  catBreakdownAmt: { ...TYPE.small, fontFamily: "Satoshi-Bold", width: 40, textAlign: "right" },

  // Modal
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.6)" },
  modalSheet: { overflow: "hidden", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)", alignSelf: "center", marginBottom: 20 },
  modalTitle: { ...TYPE.h2, color: BRAND.textPrimary, marginBottom: 20 },
  input: { backgroundColor: "rgba(255,255,255,0.07)", borderRadius: RADIUS.xl, paddingHorizontal: 16, paddingVertical: 14, ...TYPE.body, color: BRAND.textPrimary, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", marginBottom: 12 },
  amountRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  currencySymbol: { ...TYPE.h2, color: BRAND.textSecondary },
  amountInput: { flex: 1, marginBottom: 0 },
  inputLabel: { ...TYPE.label, color: BRAND.textSecondary, marginBottom: 8 },
  catRow: { gap: 8, marginBottom: 20 },
  catChip: { overflow: "hidden", flexDirection: "row", alignItems: "center", gap: 6, borderRadius: RADIUS.full, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  catChipText: { ...TYPE.label, color: BRAND.textMuted },
  addBtn: { overflow: "hidden", borderRadius: RADIUS.xl, paddingVertical: 16, alignItems: "center" },
  addBtnText: { ...TYPE.button, color: "#FFF" },
});
