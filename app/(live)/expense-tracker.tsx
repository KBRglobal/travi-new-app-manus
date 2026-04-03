import { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  TextInput, Modal, Animated, Platform, Dimensions, ScrollView
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  paidBy: string;
  splitWith: string[];
  date: string;
  note?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "food", label: "Food", icon: "🍜", color: "#F59E0B" },
  { id: "transport", label: "Transport", icon: "🚕", color: "#3B82F6" },
  { id: "activity", label: "Activity", icon: "🎡", color: "#8B5CF6" },
  { id: "hotel", label: "Hotel", icon: "🏨", color: "#EC4899" },
  { id: "shopping", label: "Shopping", icon: "🛍️", color: "#10B981" },
  { id: "other", label: "Other", icon: "💳", color: "#6B7280" },
];

const COMPANIONS = ["You", "Maya R.", "Lior K."];

const MOCK_EXPENSES: Expense[] = [
  { id: "e1", title: "Sushi Saito Dinner", amount: 180, category: "food", paidBy: "You", splitWith: ["Maya R.", "Lior K."], date: "Today", note: "Best meal of the trip" },
  { id: "e2", title: "TeamLab Planets", amount: 75, category: "activity", paidBy: "Maya R.", splitWith: ["You", "Lior K."], date: "Today" },
  { id: "e3", title: "Taxi from airport", amount: 42, category: "transport", paidBy: "You", splitWith: ["Maya R.", "Lior K."], date: "Yesterday" },
  { id: "e4", title: "Hotel Night 1", amount: 320, category: "hotel", paidBy: "Lior K.", splitWith: ["You", "Maya R."], date: "Yesterday" },
  { id: "e5", title: "Convenience store", amount: 28, category: "shopping", paidBy: "You", splitWith: [], date: "Yesterday" },
];

function getCategoryMeta(id: string) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[5];
}

// ─── Expense Card ─────────────────────────────────────────────────────────────
function ExpenseCard({ item }: { item: Expense }) {
  const cat = getCategoryMeta(item.category);
  const perPerson = item.splitWith.length > 0
    ? (item.amount / (item.splitWith.length + 1)).toFixed(0)
    : item.amount.toFixed(0);
  const youOwe = item.paidBy !== "You" && item.splitWith.includes("You");
  const theyOweYou = item.paidBy === "You" && item.splitWith.length > 0;

  return (
    <View style={S.expenseCard}>
      <View style={[S.expenseCatDot, { backgroundColor: cat.color + "25", borderColor: cat.color + "50" }]}>
        <Text style={{ fontSize: 18, fontFamily: "Satoshi-Regular" }}>{cat.icon}</Text>
      </View>
      <View style={S.expenseInfo}>
        <Text style={S.expenseTitle}>{item.title}</Text>
        <Text style={S.expenseMeta}>
          {item.date} · Paid by {item.paidBy}
          {item.splitWith.length > 0 ? ` · Split ${item.splitWith.length + 1} ways` : ""}
        </Text>
        {item.note ? <Text style={S.expenseNote}>{item.note}</Text> : null}
      </View>
      <View style={S.expenseRight}>
        <Text style={S.expenseAmount}>${item.amount}</Text>
        {youOwe && <Text style={S.expenseYouOwe}>You owe ${perPerson}</Text>}
        {theyOweYou && <Text style={S.expenseTheyOwe}>+${perPerson}/person</Text>}
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ExpenseTrackerScreen() {
  const insets = useSafeAreaInsets();
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCat, setSelectedCat] = useState("food");
  const [paidBy, setPaidBy] = useState("You");
  const [splitWith, setSplitWith] = useState<string[]>(["Maya R.", "Lior K."]);
  const slideAnim = useRef(new Animated.Value(600)).current;

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const youOwed = expenses
    .filter((e) => e.paidBy !== "You" && e.splitWith.includes("You"))
    .reduce((s, e) => s + e.amount / (e.splitWith.length + 1), 0);
  const owedToYou = expenses
    .filter((e) => e.paidBy === "You" && e.splitWith.length > 0)
    .reduce((s, e) => s + (e.amount / (e.splitWith.length + 1)) * e.splitWith.length, 0);

  const openModal = () => {
    setShowModal(true);
    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }).start();
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const closeModal = () => {
    Animated.timing(slideAnim, { toValue: 600, duration: 250, useNativeDriver: true }).start(() => setShowModal(false));
  };

  const handleAdd = () => {
    if (!title || !amount) return;
    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category: selectedCat,
      paidBy,
      splitWith: splitWith.filter((c) => c !== paidBy),
      date: "Today",
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setTitle(""); setAmount(""); setSelectedCat("food"); setPaidBy("You"); setSplitWith(["Maya R.", "Lior K."]);
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    closeModal();
  };

  const toggleSplit = (name: string) => {
    setSplitWith((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
  };

  // Group by date
  const grouped: { date: string; items: Expense[] }[] = [];
  expenses.forEach((e) => {
    const g = grouped.find((g) => g.date === e.date);
    if (g) g.items.push(e); else grouped.push({ date: e.date, items: [e] });
  });

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D1B2A", "#0D1B2A", "#0D1B2A"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Trip Expenses</Text>
        <TouchableOpacity style={S.addBtn} onPress={openModal} activeOpacity={0.8}>
          <LinearGradient colors={["#6443F4", "#F94498"]} style={S.addBtnGrad}>
            <IconSymbol name="plus" size={18} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.summaryRow}>
        <View style={S.summaryCard}>
          <LinearGradient colors={["#6443F420", "#F9449810"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.summaryLabel}>Total Spent</Text>
          <Text style={S.summaryValue}>${totalSpent.toFixed(0)}</Text>
          <Text style={S.summaryMeta}>{expenses.length} expenses</Text>
        </View>
        <View style={[S.summaryCard, { borderColor: "#EF444430" }]}>
          <LinearGradient colors={["#EF444420", "#EF444408"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.summaryLabel}>You Owe</Text>
          <Text style={[S.summaryValue, { color: "#EF4444" }]}>${youOwed.toFixed(0)}</Text>
          <Text style={S.summaryMeta}>to companions</Text>
        </View>
        <View style={[S.summaryCard, { borderColor: "#22C55E30" }]}>
          <LinearGradient colors={["#22C55E20", "#22C55E08"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.summaryLabel}>Owed to You</Text>
          <Text style={[S.summaryValue, { color: "#22C55E" }]}>${owedToYou.toFixed(0)}</Text>
          <Text style={S.summaryMeta}>from companions</Text>
        </View>
      </ScrollView>

      {/* Category Breakdown */}
      <View style={S.breakdownRow}>
        {CATEGORIES.map((cat) => {
          const total = expenses.filter((e) => e.category === cat.id).reduce((s, e) => s + e.amount, 0);
          if (total === 0) return null;
          return (
            <View key={cat.id} style={S.breakdownPill}>
              <Text style={{ fontSize: 14, fontFamily: "Satoshi-Regular" }}>{cat.icon}</Text>
              <Text style={[S.breakdownAmt, { color: cat.color }]}>${total}</Text>
            </View>
          );
        })}
      </View>

      {/* Expense List */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, gap: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ExpenseCard item={item} />}
      />

      {/* Add Expense Modal */}
      <Modal visible={showModal} transparent animationType="none" onRequestClose={closeModal}>
        <TouchableOpacity style={S.overlay} activeOpacity={1} onPress={closeModal} />
        <Animated.View style={[S.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <LinearGradient colors={["#1A0A3D", "#0D0628"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.sheetHandle} />
          <Text style={S.sheetTitle}>Add Expense</Text>

          <TextInput
            style={S.input}
            placeholder="What did you spend on?"
            placeholderTextColor="#5A4D72"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={S.input}
            placeholder="Amount ($)"
            placeholderTextColor="#5A4D72"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />

          {/* Category */}
          <Text style={S.sheetLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[S.catChip, selectedCat === cat.id && { borderColor: cat.color, backgroundColor: cat.color + "20" }]}
                onPress={() => setSelectedCat(cat.id)}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 16, fontFamily: "Satoshi-Regular" }}>{cat.icon}</Text>
                <Text style={[S.catChipText, selectedCat === cat.id && { color: cat.color }]}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Paid By */}
          <Text style={S.sheetLabel}>Paid By</Text>
          <View style={S.paidByRow}>
            {COMPANIONS.map((name) => (
              <TouchableOpacity
                key={name}
                style={[S.paidByChip, paidBy === name && S.paidByChipActive]}
                onPress={() => setPaidBy(name)}
                activeOpacity={0.8}
              >
                <Text style={[S.paidByText, paidBy === name && S.paidByTextActive]}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Split With */}
          <Text style={S.sheetLabel}>Split With</Text>
          <View style={S.paidByRow}>
            {COMPANIONS.filter((n) => n !== paidBy).map((name) => (
              <TouchableOpacity
                key={name}
                style={[S.paidByChip, splitWith.includes(name) && S.paidByChipActive]}
                onPress={() => toggleSplit(name)}
                activeOpacity={0.8}
              >
                <Text style={[S.paidByText, splitWith.includes(name) && S.paidByTextActive]}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={S.addExpenseBtn} onPress={handleAdd} activeOpacity={0.85}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.addExpenseBtnGrad}>
              <Text style={S.addExpenseBtnText}>Add Expense</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1B2A" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontFamily: "Chillax-Bold", fontWeight: "800", flex: 1, textAlign: "center" },
  addBtn: { width: 40, height: 40, borderRadius: 12, overflow: "hidden" },
  addBtnGrad: { flex: 1, alignItems: "center", justifyContent: "center" },

  summaryRow: { paddingHorizontal: 16, gap: 10, paddingBottom: 12 },
  summaryCard: { width: 140, borderRadius: 16, padding: 14, gap: 4, overflow: "hidden", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  summaryLabel: { color: "#9BA1A6", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "600", textTransform: "uppercase" },
  summaryValue: { color: "#FFF", fontSize: 24, fontFamily: "Chillax-Bold", fontWeight: "800" },
  summaryMeta: { color: "#5A4D72", fontSize: 11, fontFamily: "Satoshi-Regular" },

  breakdownRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 16, paddingBottom: 12 },
  breakdownPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  breakdownAmt: { fontSize: 13, fontFamily: "Chillax-Semibold", fontWeight: "700" },

  expenseCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  expenseCatDot: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  expenseInfo: { flex: 1, gap: 3 },
  expenseTitle: { color: "#FFF", fontSize: 14, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  expenseMeta: { color: "#5A4D72", fontSize: 11, fontFamily: "Satoshi-Regular", lineHeight: 16 },
  expenseNote: { color: "#9BA1A6", fontSize: 11, fontFamily: "Satoshi-Regular", fontStyle: "italic" },
  expenseRight: { alignItems: "flex-end", gap: 3 },
  expenseAmount: { color: "#FFF", fontSize: 16, fontFamily: "Chillax-Bold", fontWeight: "800" },
  expenseYouOwe: { color: "#EF4444", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  expenseTheyOwe: { color: "#22C55E", fontSize: 11, fontFamily: "Chillax-Semibold", fontWeight: "600" },

  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  sheet: { position: "absolute", bottom: 0, left: 0, right: 0, borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden", padding: 20, paddingBottom: 40, gap: 14 },
  sheetHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)", alignSelf: "center", marginBottom: 4 },
  sheetTitle: { color: "#FFF", fontSize: 18, fontFamily: "Chillax-Bold", fontWeight: "800" },
  sheetLabel: { color: "#9BA1A6", fontSize: 12, fontFamily: "Chillax-Semibold", fontWeight: "700", textTransform: "uppercase", marginTop: 4 },
  input: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, color: "#FFF", fontSize: 15, fontFamily: "Satoshi-Regular", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  catChip: { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" },
  catChipText: { color: "#9BA1A6", fontSize: 13, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  paidByRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  paidByChip: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" },
  paidByChipActive: { borderColor: "#6443F4", backgroundColor: "rgba(100,67,244,0.2)" },
  paidByText: { color: "#9BA1A6", fontSize: 13, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  paidByTextActive: { color: "#A78BFA" },
  addExpenseBtn: { borderRadius: 16, overflow: "hidden", marginTop: 8 },
  addExpenseBtnGrad: { padding: 16, alignItems: "center" },
  addExpenseBtnText: { color: "#FFF", fontSize: 16, fontFamily: "Chillax-Bold", fontWeight: "800" },
});
