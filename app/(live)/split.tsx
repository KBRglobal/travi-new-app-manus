import { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Animated,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import type { SplitBillExpense } from "@/lib/store";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

const TRIP_MEMBERS = [
  { id: "me", name: "You", avatar: "Y", color: "#6443F4" },
  { id: "sarah", name: "Sarah", avatar: "S", color: "#F94498" },
  { id: "mike", name: "Mike", avatar: "M", color: "#3B82F6" },
  { id: "anna", name: "Anna", avatar: "A", color: "#02A65C" },
];

const CATEGORIES = [
  { id: "food", label: "Food & Drinks", icon: "fork.knife" as const, color: "#F59E0B" },
  { id: "transport", label: "Transport", icon: "car.fill" as const, color: "#3B82F6" },
  { id: "accommodation", label: "Hotel", icon: "bed.double.fill" as const, color: "#9077EF" },
  { id: "activity", label: "Activity", icon: "figure.run" as const, color: "#02A65C" },
  { id: "other", label: "Other", icon: "ellipsis.circle" as const, color: "#6B7280" },
] as const;

const MOCK_EXPENSES: SplitBillExpense[] = [
  {
    id: "1",
    tripId: "active",
    title: "Dinner at Le Petit Bistro",
    totalAmount: 148,
    paidBy: "me",
    splitAmong: ["me", "sarah", "mike", "anna"],
    category: "food",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    settled: false,
  },
  {
    id: "2",
    tripId: "active",
    title: "Metro Day Pass × 4",
    totalAmount: 60,
    paidBy: "sarah",
    splitAmong: ["me", "sarah", "mike", "anna"],
    category: "transport",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    settled: false,
  },
  {
    id: "3",
    tripId: "active",
    title: "Louvre Museum Tickets",
    totalAmount: 72,
    paidBy: "mike",
    splitAmong: ["me", "sarah", "mike", "anna"],
    category: "activity",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    settled: true,
  },
];

export default function SplitBillScreen() {
  const { state, dispatch } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("me");
  const [selectedMembers, setSelectedMembers] = useState<string[]>(["me", "sarah", "mike", "anna"]);
  const [category, setCategory] = useState<SplitBillExpense["category"]>("food");
  const slideAnim = useRef(new Animated.Value(600)).current;

  // Combine store expenses with mock ones for demo
  const allExpenses: SplitBillExpense[] = [
    ...MOCK_EXPENSES,
    ...state.splitBillExpenses.filter((e) => e.tripId === "active"),
  ];

  const unsettledExpenses = allExpenses.filter((e) => !e.settled);
  const settledExpenses = allExpenses.filter((e) => e.settled);

  // Calculate balances
  const balances: Record<string, number> = {};
  TRIP_MEMBERS.forEach((m) => (balances[m.id] = 0));

  unsettledExpenses.forEach((expense) => {
    const perPerson = expense.totalAmount / expense.splitAmong.length;
    expense.splitAmong.forEach((memberId) => {
      if (memberId !== expense.paidBy) {
        balances[expense.paidBy] = (balances[expense.paidBy] || 0) + perPerson;
        balances[memberId] = (balances[memberId] || 0) - perPerson;
      }
    });
  });

  const totalSpent = allExpenses.reduce((sum, e) => sum + e.totalAmount, 0);
  const myShare = unsettledExpenses
    .filter((e) => e.splitAmong.includes("me"))
    .reduce((sum, e) => sum + e.totalAmount / e.splitAmong.length, 0);

  const openModal = () => {
    setShowModal(true);
    setTitle("");
    setAmount("");
    setPaidBy("me");
    setSelectedMembers(["me", "sarah", "mike", "anna"]);
    setCategory("food");
    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const closeModal = () => {
    Animated.timing(slideAnim, { toValue: 600, duration: 250, useNativeDriver: true }).start(() => {
      setShowModal(false);
    });
  };

  const handleAdd = () => {
    if (!title || !amount) return;
    const expense: SplitBillExpense = {
      id: Date.now().toString(),
      tripId: "active",
      title,
      totalAmount: parseFloat(amount),
      paidBy,
      splitAmong: selectedMembers,
      category,
      date: new Date().toISOString(),
      settled: false,
    };
    dispatch({ type: "ADD_EXPENSE", payload: expense });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    closeModal();
  };

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const getCategoryInfo = (cat: SplitBillExpense["category"]) =>
    CATEGORIES.find((c) => c.id === cat) ?? CATEGORIES[4];

  const getMember = (id: string) => TRIP_MEMBERS.find((m) => m.id === id);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffH = Math.floor((now.getTime() - d.getTime()) / 3600000);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const renderExpense = ({ item }: { item: SplitBillExpense }) => {
    const cat = getCategoryInfo(item.category);
    const payer = getMember(item.paidBy);
    const perPerson = item.totalAmount / item.splitAmong.length;
    const iOwed = item.paidBy !== "me" && item.splitAmong.includes("me");
    const theyOweMe = item.paidBy === "me" && item.splitAmong.some((m) => m !== "me");

    return (
      <View style={[styles.expenseCard, item.settled && styles.expenseCardSettled]}>
        <View style={styles.expenseHeader}>
          <View style={[styles.catIcon, { backgroundColor: cat.color + "22" }]}>
            <IconSymbol name={cat.icon} size={18} color={cat.color} />
          </View>
          <View style={styles.expenseInfo}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseMeta}>
              {payer?.avatar} {payer?.name} paid · {formatTime(item.date)}
            </Text>
          </View>
          <View style={styles.expenseAmountWrap}>
            <Text style={styles.expenseTotal}>${item.totalAmount}</Text>
            <Text style={styles.expensePerPerson}>${perPerson.toFixed(0)}/person</Text>
          </View>
        </View>

        <View style={styles.expenseSplit}>
          {item.splitAmong.map((memberId) => {
            const member = getMember(memberId);
            if (!member) return null;
            return (
              <View key={memberId} style={styles.memberChip}>
                <Text style={styles.memberChipAvatar}>{member.avatar}</Text>
                <Text style={styles.memberChipName}>{member.name}</Text>
              </View>
            );
          })}
        </View>

        {!item.settled && (
          <View style={[styles.owedBanner, iOwed ? styles.owedBannerRed : styles.owedBannerGreen]}>
            <IconSymbol
              name={iOwed ? "arrow.up.right.square.fill" : "arrow.left"}
              size={14}
              color={iOwed ? "#F87171" : "#34D399"}
            />
            <Text style={[styles.owedText, iOwed ? styles.owedTextRed : styles.owedTextGreen]}>
              {iOwed
                ? `You owe ${payer?.name} $${perPerson.toFixed(0)}`
                : theyOweMe
                ? `Others owe you $${((item.splitAmong.length - 1) * perPerson).toFixed(0)}`
                : "Equally split"}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer containerClassName="bg-[#0D0118]">
      <LinearGradient
        colors={["#1a0a2e", "#0D0118"]}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={22} color="#A78BFA" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Split Bill</Text>
            <Text style={styles.headerSubtitle}>Paris Trip · 4 travelers</Text>
          </View>
          <Pressable style={styles.addBtn} onPress={openModal}>
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              style={styles.addBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol name="plus" size={20} color="#fff" />
            </LinearGradient>
          </Pressable>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={["#6443F4", "#F94498"]}
            style={styles.summaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.summaryRow}>
              <View style={styles.summaryBlock}>
                <Text style={styles.summaryLabel}>Total Spent</Text>
                <Text style={styles.summaryValue}>${totalSpent}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryBlock}>
                <Text style={styles.summaryLabel}>My Share</Text>
                <Text style={styles.summaryValue}>${myShare.toFixed(0)}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryBlock}>
                <Text style={styles.summaryLabel}>Expenses</Text>
                <Text style={styles.summaryValue}>{allExpenses.length}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Balances */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who Owes What</Text>
          <View style={styles.balancesGrid}>
            {TRIP_MEMBERS.map((member) => {
              const balance = balances[member.id] ?? 0;
              const isPositive = balance > 0;
              const isNeutral = Math.abs(balance) < 0.5;
              return (
                <View key={member.id} style={styles.balanceCard}>
                  <LinearGradient
                    colors={isNeutral ? ["#1E0A3C", "#1E0A3C"] : isPositive ? ["#02A65C22", "#02A65C11"] : ["#EF444422", "#EF444411"]}
                    style={styles.balanceGradient}
                  >
                    <Text style={styles.balanceAvatar}>{member.avatar}</Text>
                    <Text style={styles.balanceName}>{member.name}</Text>
                    {isNeutral ? (
                      <View style={styles.settledBadge}>
                        <IconSymbol name="checkmark.circle.fill" size={12} color="#34D399" />
                        <Text style={styles.settledText}>Settled</Text>
                      </View>
                    ) : (
                      <Text style={[styles.balanceAmount, isPositive ? styles.positiveBalance : styles.negativeBalance]}>
                        {isPositive ? "+" : ""}${Math.abs(balance).toFixed(0)}
                      </Text>
                    )}
                  </LinearGradient>
                </View>
              );
            })}
          </View>
        </View>

        {/* Unsettled Expenses */}
        {unsettledExpenses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending</Text>
            <FlatList
              data={unsettledExpenses}
              renderItem={renderExpense}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Settled Expenses */}
        {settledExpenses.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: "#6B7280" }]}>Settled</Text>
            <FlatList
              data={settledExpenses}
              renderItem={renderExpense}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Settle Up Button */}
        {Object.values(balances).some((b) => Math.abs(b) > 0.5) && (
          <View style={styles.settleSection}>
            <Pressable
              style={styles.settleBtn}
              onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
            >
              <LinearGradient
                colors={["#02A65C", "#059669"]}
                style={styles.settleBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol name="checkmark.circle.fill" size={20} color="#fff" />
                <Text style={styles.settleBtnText}>Settle Up — Send Reminders</Text>
              </LinearGradient>
            </Pressable>
            <Text style={styles.settleNote}>
              TRAVI will send payment reminders to your travel companions
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Expense Modal */}
      <Modal visible={showModal} transparent animationType="none" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={closeModal} />
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.modalKAV}>
            <Animated.View style={[styles.modalSheet, { transform: [{ translateY: slideAnim }] }]}>
              <LinearGradient colors={["#1E0A3C", "#0D0118"]} style={styles.modalContent}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>Add Expense</Text>

                {/* Title Input */}
                <Text style={styles.fieldLabel}>What was it?</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="e.g. Dinner at the beach"
                    placeholderTextColor="#6B7280"
                    returnKeyType="next"
                  />
                </View>

                {/* Amount Input */}
                <Text style={styles.fieldLabel}>How much?</Text>
                <View style={styles.inputWrap}>
                  <Text style={styles.dollarSign}>$</Text>
                  <TextInput
                    style={[styles.input, styles.amountInput]}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor="#6B7280"
                    returnKeyType="done"
                  />
                </View>

                {/* Category */}
                <Text style={styles.fieldLabel}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat.id}
                      style={[styles.catChip, category === cat.id && { backgroundColor: cat.color + "33", borderColor: cat.color }]}
                      onPress={() => { setCategory(cat.id as SplitBillExpense["category"]); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                    >
                      <IconSymbol name={cat.icon} size={16} color={category === cat.id ? cat.color : "#9CA3AF"} />
                      <Text style={[styles.catChipText, category === cat.id && { color: cat.color }]}>{cat.label}</Text>
                    </Pressable>
                  ))}
                </ScrollView>

                {/* Paid By */}
                <Text style={styles.fieldLabel}>Paid by</Text>
                <View style={styles.membersRow}>
                  {TRIP_MEMBERS.map((member) => (
                    <Pressable
                      key={member.id}
                      style={[styles.paidByChip, paidBy === member.id && { backgroundColor: member.color + "33", borderColor: member.color }]}
                      onPress={() => { setPaidBy(member.id); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                    >
                      <Text style={styles.memberAvatar}>{member.avatar}</Text>
                      <Text style={[styles.memberName, paidBy === member.id && { color: member.color }]}>{member.name}</Text>
                    </Pressable>
                  ))}
                </View>

                {/* Split Among */}
                <Text style={styles.fieldLabel}>Split among</Text>
                <View style={styles.membersRow}>
                  {TRIP_MEMBERS.map((member) => (
                    <Pressable
                      key={member.id}
                      style={[styles.paidByChip, selectedMembers.includes(member.id) && { backgroundColor: "#6443F433", borderColor: "#6443F4" }]}
                      onPress={() => toggleMember(member.id)}
                    >
                      <Text style={styles.memberAvatar}>{member.avatar}</Text>
                      <Text style={[styles.memberName, selectedMembers.includes(member.id) && { color: "#A78BFA" }]}>{member.name}</Text>
                      {selectedMembers.includes(member.id) && (
                        <IconSymbol name="checkmark.circle.fill" size={14} color="#A78BFA" />
                      )}
                    </Pressable>
                  ))}
                </View>

                {/* Per person preview */}
                {amount && selectedMembers.length > 0 && (
                  <View style={styles.perPersonPreview}>
                    <IconSymbol name="person.2.fill" size={14} color="#A78BFA" />
                    <Text style={styles.perPersonText}>
                      ${(parseFloat(amount || "0") / selectedMembers.length).toFixed(2)} per person
                    </Text>
                  </View>
                )}

                <Pressable
                  style={[styles.addExpenseBtn, (!title || !amount) && styles.addExpenseBtnDisabled]}
                  onPress={handleAdd}
                  disabled={!title || !amount}
                >
                  <LinearGradient
                    colors={title && amount ? ["#6443F4", "#F94498"] : ["#374151", "#374151"]}
                    style={styles.addExpenseBtnGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <IconSymbol name="plus.circle.fill" size={18} color="#fff" />
                    <Text style={styles.addExpenseBtnText}>Add Expense</Text>
                  </LinearGradient>
                </Pressable>
              </LinearGradient>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#F9FAFB" },
  headerSubtitle: { fontSize: 13, color: "#9CA3AF", marginTop: 2 },
  addBtn: { borderRadius: 14, overflow: "hidden" },
  addBtnGradient: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  summaryCard: { marginHorizontal: 20, borderRadius: 20, overflow: "hidden", marginBottom: 24 },
  summaryGradient: { padding: 20 },
  summaryRow: { flexDirection: "row", alignItems: "center" },
  summaryBlock: { flex: 1, alignItems: "center" },
  summaryLabel: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 4 },
  summaryValue: { fontSize: 24, fontWeight: "800", color: "#fff" },
  summaryDivider: { width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.2)" },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#F9FAFB", marginBottom: 14 },
  balancesGrid: { flexDirection: "row", gap: 10 },
  balanceCard: { flex: 1, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#6443F422" },
  balanceGradient: { padding: 12, alignItems: "center", gap: 4 },
  balanceAvatar: { fontSize: 24 },
  balanceName: { fontSize: 12, color: "#E5E7EB", fontWeight: "600" },
  balanceAmount: { fontSize: 16, fontWeight: "800" },
  positiveBalance: { color: "#34D399" },
  negativeBalance: { color: "#F87171" },
  settledBadge: { flexDirection: "row", alignItems: "center", gap: 3 },
  settledText: { fontSize: 11, color: "#34D399", fontWeight: "600" },
  expenseCard: {
    backgroundColor: "#1E0A3C",
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#6443F422",
  },
  expenseCardSettled: { opacity: 0.6 },
  expenseHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  catIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  expenseInfo: { flex: 1 },
  expenseTitle: { fontSize: 15, fontWeight: "700", color: "#F9FAFB" },
  expenseMeta: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  expenseAmountWrap: { alignItems: "flex-end" },
  expenseTotal: { fontSize: 18, fontWeight: "800", color: "#F9FAFB" },
  expensePerPerson: { fontSize: 11, color: "#9CA3AF" },
  expenseSplit: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  memberChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#374151",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  memberChipAvatar: { fontSize: 12 },
  memberChipName: { fontSize: 11, color: "#D1D5DB" },
  owedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
    borderRadius: 10,
  },
  owedBannerRed: { backgroundColor: "#EF444422" },
  owedBannerGreen: { backgroundColor: "#02A65C22" },
  owedText: { fontSize: 13, fontWeight: "600" },
  owedTextRed: { color: "#F87171" },
  owedTextGreen: { color: "#34D399" },
  settleSection: { paddingHorizontal: 20, marginBottom: 20 },
  settleBtn: { borderRadius: 16, overflow: "hidden", marginBottom: 10 },
  settleBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
  },
  settleBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  settleNote: { fontSize: 12, color: "#9CA3AF", textAlign: "center" },
  // Modal
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.7)" },
  modalKAV: { justifyContent: "flex-end" },
  modalSheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden" },
  modalContent: { padding: 24, paddingBottom: 40 },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#374151",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: "800", color: "#F9FAFB", marginBottom: 20 },
  fieldLabel: { fontSize: 14, fontWeight: "600", color: "#9CA3AF", marginBottom: 8, marginTop: 16 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E0A3C",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#6443F444",
    paddingHorizontal: 14,
  },
  input: { flex: 1, fontSize: 16, color: "#F9FAFB", paddingVertical: 14 },
  dollarSign: { fontSize: 20, fontWeight: "800", color: "#A78BFA", marginRight: 6 },
  amountInput: { fontSize: 24, fontWeight: "800" },
  catScroll: { marginBottom: 4 },
  catChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#1E0A3C",
    marginRight: 8,
  },
  catChipText: { fontSize: 13, color: "#9CA3AF", fontWeight: "600" },
  membersRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  paidByChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#1E0A3C",
  },
  memberAvatar: { fontSize: 16 },
  memberName: { fontSize: 13, color: "#9CA3AF", fontWeight: "600" },
  perPersonPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#6443F422",
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  perPersonText: { fontSize: 14, color: "#A78BFA", fontWeight: "600" },
  addExpenseBtn: { borderRadius: 16, overflow: "hidden", marginTop: 20 },
  addExpenseBtnDisabled: { opacity: 0.5 },
  addExpenseBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
  },
  addExpenseBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
