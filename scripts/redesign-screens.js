#!/usr/bin/env node
/**
 * Batch redesign script — replaces all undesigned screens with TRAVI Design DNA
 * Targets screens that still use old "#111", "#1A1A1A", backgroundColor: "#000" patterns
 */

const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");

// Design System tokens
const DS_IMPORT = `import { ScreenWrapper, DS } from "@/components/ScreenWrapper";`;

// Screens to redesign with their content
const SCREENS = {
  // ── (tabs) ──────────────────────────────────────────────────────────────
  "(tabs)/split-payment.tsx": `import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const PEOPLE = [
  { name: "You", avatar: "Y", amount: "€695", status: "Your share", color: DS.purple },
  { name: "Sarah M.", avatar: "S", amount: "€695", status: "Pending", color: DS.pink },
  { name: "David K.", avatar: "D", amount: "€695", status: "Pending", color: DS.warning },
];

export default function SplitPaymentScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<"equal" | "custom">("equal");

  return (
    <ScreenWrapper title="Split Payment" scrollable bottomPad={100}>
      {/* Total Card */}
      <BlurView intensity={20} tint="dark" style={s.totalCard}>
        <View style={s.totalInner}>
          <Text style={s.totalLabel}>Total Amount</Text>
          <Text style={s.totalAmount}>€2,085</Text>
          <Text style={s.totalSub}>Bali Trip — Hotel + Activities</Text>
        </View>
      </BlurView>

      {/* Toggle */}
      <View style={s.toggleRow}>
        <Pressable style={[s.toggleBtn, mode === "equal" && s.toggleActive]} onPress={() => setMode("equal")}>
          <Text style={[s.toggleText, mode === "equal" && s.toggleTextActive]}>Equal Split</Text>
        </Pressable>
        <Pressable style={[s.toggleBtn, mode === "custom" && s.toggleActive]} onPress={() => setMode("custom")}>
          <Text style={[s.toggleText, mode === "custom" && s.toggleTextActive]}>Custom</Text>
        </Pressable>
      </View>

      {/* People */}
      <Text style={s.sectionTitle}>Split Between</Text>
      {PEOPLE.map((p) => (
        <BlurView key={p.name} intensity={15} tint="dark" style={s.personCard}>
          <View style={[s.avatar, { backgroundColor: p.color + "33", borderColor: p.color + "66" }]}>
            <Text style={[s.avatarText, { color: p.color }]}>{p.avatar}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.personName}>{p.name}</Text>
            <Text style={s.personStatus}>{p.status}</Text>
          </View>
          <Text style={s.personAmount}>{p.amount}</Text>
        </BlurView>
      ))}
      <Pressable style={s.addPerson}>
        <MaterialIcons name="add" size={16} color={DS.purple} />
        <Text style={s.addPersonText}>Add Person</Text>
      </Pressable>

      {/* Summary */}
      <BlurView intensity={20} tint="dark" style={s.summaryCard}>
        {[
          { label: "Your share", value: "€695" },
          { label: "Others owe you", value: "€1,390" },
          { label: "Requests to send", value: "2" },
        ].map((row, i) => (
          <View key={i} style={[s.summaryRow, i < 2 && { borderBottomWidth: 1, borderBottomColor: DS.border }]}>
            <Text style={s.summaryLabel}>{row.label}</Text>
            <Text style={s.summaryValue}>{row.value}</Text>
          </View>
        ))}
      </BlurView>

      {/* CTA */}
      <Pressable onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.sendBtn}>
          <MaterialIcons name="send" size={20} color="#FFF" />
          <Text style={s.sendText}>Send Requests</Text>
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  totalCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 16 },
  totalInner: { alignItems: "center", padding: 24, backgroundColor: DS.surface },
  totalLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  totalAmount: { color: DS.white, fontSize: 40, fontFamily: "Chillax-Bold", marginTop: 4 },
  totalSub: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular", marginTop: 4 },
  toggleRow: { flexDirection: "row", borderRadius: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, overflow: "hidden", marginBottom: 24 },
  toggleBtn: { flex: 1, paddingVertical: 13, alignItems: "center" },
  toggleActive: { backgroundColor: DS.purple + "33" },
  toggleText: { color: DS.muted, fontSize: 14, fontFamily: "Satoshi-Medium" },
  toggleTextActive: { color: DS.white },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 12 },
  personCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 10, flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 16, fontFamily: "Chillax-Bold" },
  personName: { color: DS.white, fontSize: 15, fontFamily: "Satoshi-Medium" },
  personStatus: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  personAmount: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
  addPerson: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "center", marginVertical: 8, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: DS.purple + "66" },
  addPersonText: { color: DS.purple, fontSize: 13, fontFamily: "Satoshi-Medium" },
  summaryCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginVertical: 16, backgroundColor: DS.surface },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 16 },
  summaryLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  summaryValue: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  sendBtn: { height: 56, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 },
  sendText: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
});
`,

  "(tabs)/profile-edit.tsx": `import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const SECTIONS = [
  {
    title: "Personal Information",
    icon: "person",
    fields: [
      { label: "First Name", value: "Amit", key: "firstName" },
      { label: "Last Name", value: "Cohen", key: "lastName" },
      { label: "Email", value: "amit@example.com", key: "email" },
      { label: "Phone", value: "+972 50 123 4567", key: "phone" },
      { label: "Date of Birth", value: "Jan 15, 1990", key: "dob" },
    ],
  },
  {
    title: "Location",
    icon: "location-on",
    fields: [
      { label: "Country", value: "Israel", key: "country" },
      { label: "City", value: "Tel Aviv", key: "city" },
      { label: "Timezone", value: "GMT+3", key: "timezone" },
    ],
  },
  {
    title: "Travel Preferences",
    icon: "flight",
    fields: [
      { label: "Preferred Currency", value: "EUR (€)", key: "currency" },
      { label: "Seat Preference", value: "Window", key: "seat" },
      { label: "Meal Preference", value: "No preference", key: "meal" },
    ],
  },
];

export default function ProfileEditScreen() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <ScreenWrapper
      title="Edit Profile"
      scrollable
      bottomPad={100}
      headerRight={
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: DS.pink, fontFamily: "Satoshi-Medium", fontSize: 15 }}>Save</Text>
        </Pressable>
      }
    >
      {/* Avatar */}
      <View style={s.avatarSection}>
        <LinearGradient colors={[DS.purple, DS.pink]} style={s.avatarRing}>
          <View style={s.avatarInner}>
            <Text style={s.avatarInitials}>AC</Text>
          </View>
        </LinearGradient>
        <Pressable style={s.changePhotoBtn}>
          <MaterialIcons name="camera-alt" size={14} color={DS.white} />
          <Text style={s.changePhotoText}>Change Photo</Text>
        </Pressable>
      </View>

      {/* Sections */}
      {SECTIONS.map((section) => (
        <View key={section.title} style={s.section}>
          <View style={s.sectionHeader}>
            <MaterialIcons name={section.icon as any} size={18} color={DS.purple} />
            <Text style={s.sectionTitle}>{section.title}</Text>
          </View>
          <BlurView intensity={15} tint="dark" style={s.card}>
            {section.fields.map((field, i) => (
              <View key={field.key} style={[s.fieldRow, i < section.fields.length - 1 && s.fieldBorder]}>
                <Text style={s.fieldLabel}>{field.label}</Text>
                <Text style={s.fieldValue}>{values[field.key] ?? field.value}</Text>
                <MaterialIcons name="chevron-right" size={18} color={DS.placeholder} />
              </View>
            ))}
          </BlurView>
        </View>
      ))}

      {/* Danger zone */}
      <BlurView intensity={15} tint="dark" style={[s.card, { marginTop: 8, borderColor: DS.error + "44" }]}>
        <Pressable style={s.fieldRow}>
          <MaterialIcons name="delete-outline" size={20} color={DS.error} />
          <Text style={[s.fieldLabel, { color: DS.error, flex: 1, marginLeft: 8 }]}>Delete Account</Text>
          <MaterialIcons name="chevron-right" size={18} color={DS.error + "88"} />
        </Pressable>
      </BlurView>

      {/* Save CTA */}
      <Pressable onPress={() => router.back()} style={{ marginTop: 24 }}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.saveBtn}>
          <Text style={s.saveBtnText}>Save Changes</Text>
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  avatarSection: { alignItems: "center", paddingVertical: 24, gap: 12 },
  avatarRing: { width: 96, height: 96, borderRadius: 48, padding: 3, justifyContent: "center", alignItems: "center" },
  avatarInner: { width: 90, height: 90, borderRadius: 45, backgroundColor: DS.surfaceHigh, justifyContent: "center", alignItems: "center" },
  avatarInitials: { color: DS.white, fontSize: 32, fontFamily: "Chillax-Bold" },
  changePhotoBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  changePhotoText: { color: DS.white, fontSize: 13, fontFamily: "Satoshi-Medium" },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sectionTitle: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold" },
  card: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, backgroundColor: DS.surface },
  fieldRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  fieldBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  fieldLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular", width: 120 },
  fieldValue: { flex: 1, color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium", textAlign: "right", marginRight: 8 },
  saveBtn: { height: 56, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  saveBtnText: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
});
`,

  "(tabs)/kyc.tsx": `import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const STEPS = [
  { num: 1, title: "Personal Info", status: "done" },
  { num: 2, title: "ID Document", status: "current" },
  { num: 3, title: "Selfie Verification", status: "pending" },
  { num: 4, title: "Review", status: "pending" },
];

export default function KYCScreen() {
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);

  return (
    <ScreenWrapper title="Verify Identity" scrollable bottomPad={100}>
      {/* Why verify card */}
      <BlurView intensity={20} tint="dark" style={s.infoCard}>
        <View style={s.infoInner}>
          <MaterialIcons name="verified-user" size={24} color={DS.purple} />
          <View style={{ flex: 1 }}>
            <Text style={s.infoTitle}>Why Verify?</Text>
            <Text style={s.infoText}>Identity verification is required to add funds, make payments, and access premium wallet features. Your data is encrypted and secure.</Text>
          </View>
        </View>
      </BlurView>

      {/* Steps */}
      <View style={s.stepsContainer}>
        {STEPS.map((step, i) => (
          <View key={step.num} style={s.stepRow}>
            <View style={s.stepLeft}>
              <View style={[s.stepCircle,
                step.status === "done" && { backgroundColor: DS.success, borderColor: DS.success },
                step.status === "current" && { backgroundColor: DS.purple, borderColor: DS.purple },
                step.status === "pending" && { backgroundColor: "transparent", borderColor: DS.border },
              ]}>
                {step.status === "done"
                  ? <MaterialIcons name="check" size={16} color="#FFF" />
                  : <Text style={[s.stepNum, step.status === "pending" && { color: DS.muted }]}>{step.num}</Text>
                }
              </View>
              {i < STEPS.length - 1 && <View style={[s.stepLine, step.status === "done" && { backgroundColor: DS.success }]} />}
            </View>
            <View style={s.stepContent}>
              <Text style={[s.stepTitle, step.status === "pending" && { color: DS.muted }]}>{step.title}</Text>
              <Text style={s.stepStatus}>{step.status === "done" ? "Completed" : step.status === "current" ? "In Progress" : "Pending"}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Upload area */}
      <Text style={s.sectionTitle}>Upload ID Document</Text>
      <Pressable style={[s.uploadArea, uploaded && { borderColor: DS.success, borderStyle: "solid" }]} onPress={() => setUploaded(true)}>
        <MaterialIcons name={uploaded ? "check-circle" : "cloud-upload"} size={40} color={uploaded ? DS.success : DS.purple} />
        <Text style={s.uploadTitle}>{uploaded ? "Document Uploaded" : "Tap to Upload"}</Text>
        <Text style={s.uploadSub}>{uploaded ? "ID document ready for review" : "Passport, ID card, or driver's license"}</Text>
      </Pressable>

      {/* CTA */}
      <Pressable onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.cta}>
          <Text style={s.ctaText}>Continue</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  infoCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 24 },
  infoInner: { flexDirection: "row", gap: 12, padding: 16, backgroundColor: DS.surface, alignItems: "flex-start" },
  infoTitle: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold", marginBottom: 6 },
  infoText: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular", lineHeight: 20 },
  stepsContainer: { marginBottom: 24 },
  stepRow: { flexDirection: "row", gap: 16, marginBottom: 4 },
  stepLeft: { alignItems: "center", width: 36 },
  stepCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  stepLine: { width: 2, flex: 1, backgroundColor: DS.border, marginVertical: 4, minHeight: 24 },
  stepNum: { color: DS.white, fontSize: 14, fontFamily: "Chillax-Bold" },
  stepContent: { flex: 1, paddingTop: 6, paddingBottom: 20 },
  stepTitle: { color: DS.white, fontSize: 15, fontFamily: "Satoshi-Medium" },
  stepStatus: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 12 },
  uploadArea: { borderRadius: 16, borderWidth: 2, borderColor: DS.purple + "66", borderStyle: "dashed", padding: 40, alignItems: "center", gap: 8, backgroundColor: DS.purple + "11", marginBottom: 24 },
  uploadTitle: { color: DS.white, fontSize: 16, fontFamily: "Satoshi-Medium" },
  uploadSub: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  cta: { height: 56, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  ctaText: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
});
`,

  "(tabs)/transaction-history.tsx": `import { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";

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
`,

  "(tabs)/add-funds.tsx": `import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const AMOUNTS = ["50", "100", "250", "500", "1000"];
const METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: "credit-card", last4: "4242" },
  { id: "bank", label: "Bank Transfer", icon: "account-balance", last4: null },
  { id: "apple", label: "Apple Pay", icon: "phone-iphone", last4: null },
];

export default function AddFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("100");
  const [method, setMethod] = useState("card");

  return (
    <ScreenWrapper title="Add Funds" scrollable bottomPad={100}>
      {/* Balance */}
      <BlurView intensity={20} tint="dark" style={s.balanceCard}>
        <LinearGradient colors={[DS.purple + "33", DS.pink + "22"]} style={s.balanceInner}>
          <Text style={s.balanceLabel}>Current Balance</Text>
          <Text style={s.balanceAmount}>€1,247.50</Text>
        </LinearGradient>
      </BlurView>

      {/* Amount input */}
      <Text style={s.sectionTitle}>Amount</Text>
      <BlurView intensity={15} tint="dark" style={s.inputCard}>
        <Text style={s.currencySymbol}>€</Text>
        <TextInput
          style={s.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor={DS.muted}
        />
      </BlurView>

      {/* Quick amounts */}
      <View style={s.quickAmounts}>
        {AMOUNTS.map(a => (
          <Pressable key={a} style={[s.quickBtn, amount === a && s.quickBtnActive]} onPress={() => setAmount(a)}>
            <Text style={[s.quickText, amount === a && s.quickTextActive]}>€{a}</Text>
          </Pressable>
        ))}
      </View>

      {/* Payment method */}
      <Text style={s.sectionTitle}>Payment Method</Text>
      {METHODS.map(m => (
        <Pressable key={m.id} onPress={() => setMethod(m.id)}>
          <BlurView intensity={15} tint="dark" style={[s.methodCard, method === m.id && { borderColor: DS.purple }]}>
            <View style={[s.methodIcon, method === m.id && { backgroundColor: DS.purple + "33", borderColor: DS.purple + "66" }]}>
              <MaterialIcons name={m.icon as any} size={20} color={method === m.id ? DS.purple : DS.muted} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.methodLabel}>{m.label}</Text>
              {m.last4 && <Text style={s.methodSub}>•••• {m.last4}</Text>}
            </View>
            {method === m.id && <MaterialIcons name="check-circle" size={20} color={DS.purple} />}
          </BlurView>
        </Pressable>
      ))}

      {/* CTA */}
      <Pressable onPress={() => router.back()} style={{ marginTop: 8 }}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.cta}>
          <MaterialIcons name="add" size={20} color="#FFF" />
          <Text style={s.ctaText}>Add €{amount || "0"}</Text>
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  balanceCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 24 },
  balanceInner: { alignItems: "center", padding: 24 },
  balanceLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  balanceAmount: { color: DS.white, fontSize: 40, fontFamily: "Chillax-Bold", marginTop: 4 },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 12 },
  inputCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.purple, flexDirection: "row", alignItems: "center", paddingHorizontal: 20, height: 64, backgroundColor: DS.surface, marginBottom: 12 },
  currencySymbol: { color: DS.purple, fontSize: 28, fontFamily: "Chillax-Bold", marginRight: 8 },
  amountInput: { flex: 1, color: DS.white, fontSize: 32, fontFamily: "Chillax-Bold" },
  quickAmounts: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 24 },
  quickBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border },
  quickBtnActive: { backgroundColor: DS.purple + "33", borderColor: DS.purple },
  quickText: { color: DS.muted, fontSize: 14, fontFamily: "Satoshi-Medium" },
  quickTextActive: { color: DS.white },
  methodCard: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.border, flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface, marginBottom: 10 },
  methodIcon: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  methodLabel: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  methodSub: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  cta: { height: 56, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  ctaText: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
});
`,

  "(tabs)/settings.tsx": `import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { useState } from "react";

const SECTIONS = [
  {
    title: "Account",
    items: [
      { icon: "person", label: "Edit Profile", route: "/(tabs)/profile-edit", hasArrow: true },
      { icon: "verified-user", label: "Verify Identity", route: "/(tabs)/kyc", hasArrow: true },
      { icon: "lock", label: "Privacy & Security", route: "/(settings)/privacy-security", hasArrow: true },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "notifications", label: "Notifications", route: "/(settings)/notifications", hasArrow: true },
      { icon: "language", label: "Language", route: "/(settings)/language-selector", hasArrow: true },
      { icon: "health-and-safety", label: "Health & Activity", route: "/(settings)/health-activity", hasArrow: true },
    ],
  },
  {
    title: "Travel",
    items: [
      { icon: "flight", label: "DNA Management", route: "/(tabs)/dna-management", hasArrow: true },
      { icon: "card-membership", label: "Membership", route: "/(tabs)/membership", hasArrow: true },
      { icon: "people", label: "Invite Partner", route: "/(tabs)/invite-partner", hasArrow: true },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "help-outline", label: "Help Center", route: "/(tabs)/help", hasArrow: true },
      { icon: "emergency", label: "Emergency Contacts", route: "/(settings)/emergency", hasArrow: true },
      { icon: "info-outline", label: "About TRAVI", route: null, hasArrow: true },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  return (
    <ScreenWrapper title="Settings" scrollable bottomPad={40}>
      {/* Toggles */}
      <BlurView intensity={15} tint="dark" style={s.card}>
        <View style={[s.row, s.rowBorder]}>
          <View style={s.rowLeft}>
            <View style={[s.iconBox, { backgroundColor: DS.purple + "22" }]}>
              <MaterialIcons name="dark-mode" size={18} color={DS.purple} />
            </View>
            <Text style={s.rowLabel}>Dark Mode</Text>
          </View>
          <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: DS.border, true: DS.purple }} thumbColor={DS.white} />
        </View>
        <View style={s.row}>
          <View style={s.rowLeft}>
            <View style={[s.iconBox, { backgroundColor: DS.success + "22" }]}>
              <MaterialIcons name="fingerprint" size={18} color={DS.success} />
            </View>
            <Text style={s.rowLabel}>Biometric Login</Text>
          </View>
          <Switch value={biometrics} onValueChange={setBiometrics} trackColor={{ false: DS.border, true: DS.success }} thumbColor={DS.white} />
        </View>
      </BlurView>

      {/* Sections */}
      {SECTIONS.map(section => (
        <View key={section.title} style={s.section}>
          <Text style={s.sectionTitle}>{section.title}</Text>
          <BlurView intensity={15} tint="dark" style={s.card}>
            {section.items.map((item, i) => (
              <Pressable
                key={item.label}
                style={[s.row, i < section.items.length - 1 && s.rowBorder]}
                onPress={() => item.route && router.push(item.route as any)}
              >
                <View style={s.rowLeft}>
                  <View style={[s.iconBox, { backgroundColor: DS.surface }]}>
                    <MaterialIcons name={item.icon as any} size={18} color={DS.muted} />
                  </View>
                  <Text style={s.rowLabel}>{item.label}</Text>
                </View>
                {item.hasArrow && <MaterialIcons name="chevron-right" size={20} color={DS.placeholder} />}
              </Pressable>
            ))}
          </BlurView>
        </View>
      ))}

      {/* Sign out */}
      <Pressable style={s.signOutBtn} onPress={() => router.replace("/(auth)/splash" as any)}>
        <MaterialIcons name="logout" size={20} color={DS.error} />
        <Text style={s.signOutText}>Sign Out</Text>
      </Pressable>

      {/* Version */}
      <Text style={s.version}>TRAVI v1.0.0 · Made with ♥</Text>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  section: { marginBottom: 20 },
  sectionTitle: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Medium", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, marginLeft: 4 },
  card: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, backgroundColor: DS.surface },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: DS.border },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  rowLabel: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  signOutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 16, borderRadius: 14, borderWidth: 1, borderColor: DS.error + "44", backgroundColor: DS.error + "11", marginBottom: 16 },
  signOutText: { color: DS.error, fontSize: 15, fontFamily: "Satoshi-Medium" },
  version: { color: DS.placeholder, fontSize: 12, fontFamily: "Satoshi-Regular", textAlign: "center" },
});
`,

  "(tabs)/help.tsx": `import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";

const FAQS = [
  { q: "How does the DNA quiz work?", a: "The DNA quiz analyzes your travel personality across 8 dimensions to match you with perfect destinations and experiences." },
  { q: "How do TRAVI Points work?", a: "You earn TRAVI Points on every booking. Points can be redeemed for discounts, upgrades, and exclusive experiences." },
  { q: "Can I change my trip after booking?", a: "Yes! You can modify most bookings up to 48 hours before departure through the Trip Hub." },
  { q: "How does cashback work?", a: "TRAVI returns 100% of commissions earned from your bookings directly to your wallet as cashback." },
  { q: "Is my payment information secure?", a: "All payments are processed with bank-level encryption. We never store your full card details." },
];

const CATEGORIES = [
  { icon: "flight", label: "Flights", color: DS.purple },
  { icon: "hotel", label: "Hotels", color: DS.pink },
  { icon: "account-balance-wallet", label: "Payments", color: DS.success },
  { icon: "psychology", label: "DNA Quiz", color: DS.warning },
];

export default function HelpScreen() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const filtered = FAQS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <ScreenWrapper title="Help Center" scrollable bottomPad={40}>
      {/* Search */}
      <BlurView intensity={15} tint="dark" style={s.searchCard}>
        <MaterialIcons name="search" size={20} color={DS.muted} />
        <TextInput
          style={s.searchInput}
          placeholder="Search help articles..."
          placeholderTextColor={DS.placeholder}
          value={search}
          onChangeText={setSearch}
        />
      </BlurView>

      {/* Categories */}
      <Text style={s.sectionTitle}>Browse by Topic</Text>
      <View style={s.categories}>
        {CATEGORIES.map(c => (
          <Pressable key={c.label} style={s.catBtn}>
            <BlurView intensity={15} tint="dark" style={[s.catInner, { borderColor: c.color + "44" }]}>
              <View style={[s.catIcon, { backgroundColor: c.color + "22" }]}>
                <MaterialIcons name={c.icon as any} size={22} color={c.color} />
              </View>
              <Text style={s.catLabel}>{c.label}</Text>
            </BlurView>
          </Pressable>
        ))}
      </View>

      {/* FAQs */}
      <Text style={s.sectionTitle}>Frequently Asked</Text>
      {filtered.map((faq, i) => (
        <Pressable key={i} onPress={() => setExpanded(expanded === i ? null : i)}>
          <BlurView intensity={15} tint="dark" style={[s.faqCard, { marginBottom: 8 }]}>
            <View style={s.faqHeader}>
              <Text style={s.faqQ}>{faq.q}</Text>
              <MaterialIcons name={expanded === i ? "expand-less" : "expand-more"} size={20} color={DS.muted} />
            </View>
            {expanded === i && <Text style={s.faqA}>{faq.a}</Text>}
          </BlurView>
        </Pressable>
      ))}

      {/* Contact */}
      <BlurView intensity={20} tint="dark" style={s.contactCard}>
        <LinearGradient colors={[DS.purple + "22", DS.pink + "11"]} style={s.contactInner}>
          <MaterialIcons name="support-agent" size={32} color={DS.purple} />
          <Text style={s.contactTitle}>Still need help?</Text>
          <Text style={s.contactSub}>Our team is available 24/7</Text>
          <Pressable style={s.contactBtn}>
            <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.contactBtnGrad}>
              <Text style={s.contactBtnText}>Chat with Support</Text>
            </LinearGradient>
          </Pressable>
        </LinearGradient>
      </BlurView>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  searchCard: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.border, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, height: 50, backgroundColor: DS.surface, marginBottom: 24 },
  searchInput: { flex: 1, color: DS.white, fontSize: 14, fontFamily: "Satoshi-Regular" },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 12 },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  catBtn: { width: "47%" },
  catInner: { borderRadius: 14, overflow: "hidden", borderWidth: 1, padding: 14, alignItems: "center", gap: 8, backgroundColor: DS.surface },
  catIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  catLabel: { color: DS.white, fontSize: 13, fontFamily: "Satoshi-Medium" },
  faqCard: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.border, padding: 14, backgroundColor: DS.surface },
  faqHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  faqQ: { flex: 1, color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  faqA: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular", lineHeight: 20, marginTop: 10 },
  contactCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginTop: 8 },
  contactInner: { alignItems: "center", padding: 24, gap: 8 },
  contactTitle: { color: DS.white, fontSize: 18, fontFamily: "Chillax-Bold" },
  contactSub: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  contactBtn: { marginTop: 8, width: "100%" },
  contactBtnGrad: { height: 48, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  contactBtnText: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold" },
});
`,

  "(tabs)/membership.tsx": `import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const PLANS = [
  {
    id: "free", name: "Explorer", price: "Free", period: "",
    color: DS.muted, gradient: [DS.surface, DS.surfaceHigh] as [string, string],
    features: ["5 AI trip plans/month", "Basic DNA quiz", "Standard cashback", "Community access"],
    current: true,
  },
  {
    id: "pro", name: "Voyager", price: "€9.99", period: "/month",
    color: DS.purple, gradient: [DS.purple + "33", DS.pink + "22"] as [string, string],
    features: ["Unlimited AI trip plans", "Advanced DNA insights", "2x cashback", "Priority support", "Exclusive deals"],
    current: false,
  },
  {
    id: "elite", name: "Nomad Elite", price: "€24.99", period: "/month",
    color: DS.warning, gradient: [DS.warning + "22", DS.pink + "11"] as [string, string],
    features: ["Everything in Voyager", "Personal travel concierge", "Airport lounge access", "5x cashback", "VIP experiences"],
    current: false,
  },
];

export default function MembershipScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper title="Membership" scrollable bottomPad={40}>
      {/* Current badge */}
      <BlurView intensity={20} tint="dark" style={s.currentBadge}>
        <LinearGradient colors={[DS.purple + "33", DS.pink + "22"]} style={s.currentInner}>
          <MaterialIcons name="star" size={20} color={DS.purple} />
          <Text style={s.currentText}>Current Plan: <Text style={{ color: DS.purple }}>Explorer</Text></Text>
        </LinearGradient>
      </BlurView>

      {/* Plans */}
      {PLANS.map(plan => (
        <BlurView key={plan.id} intensity={15} tint="dark" style={[s.planCard, plan.current && { borderColor: DS.purple }]}>
          <LinearGradient colors={plan.gradient} style={s.planInner}>
            {plan.current && (
              <View style={s.currentPill}>
                <Text style={s.currentPillText}>Current</Text>
              </View>
            )}
            <View style={s.planHeader}>
              <Text style={[s.planName, { color: plan.color }]}>{plan.name}</Text>
              <View style={s.planPriceRow}>
                <Text style={s.planPrice}>{plan.price}</Text>
                <Text style={s.planPeriod}>{plan.period}</Text>
              </View>
            </View>
            {plan.features.map(f => (
              <View key={f} style={s.featureRow}>
                <MaterialIcons name="check-circle" size={16} color={plan.color} />
                <Text style={s.featureText}>{f}</Text>
              </View>
            ))}
            {!plan.current && (
              <Pressable style={{ marginTop: 16 }}>
                <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.upgradeBtn}>
                  <Text style={s.upgradeBtnText}>Upgrade to {plan.name}</Text>
                </LinearGradient>
              </Pressable>
            )}
          </LinearGradient>
        </BlurView>
      ))}
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  currentBadge: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.purple + "44", marginBottom: 20 },
  currentInner: { flexDirection: "row", alignItems: "center", gap: 8, padding: 14 },
  currentText: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  planCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 16 },
  planInner: { padding: 20 },
  currentPill: { alignSelf: "flex-start", backgroundColor: DS.purple, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginBottom: 10 },
  currentPillText: { color: DS.white, fontSize: 11, fontFamily: "Satoshi-Medium" },
  planHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 },
  planName: { fontSize: 22, fontFamily: "Chillax-Bold" },
  planPriceRow: { flexDirection: "row", alignItems: "baseline", gap: 2 },
  planPrice: { color: DS.white, fontSize: 24, fontFamily: "Chillax-Bold" },
  planPeriod: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  featureText: { color: DS.secondary, fontSize: 14, fontFamily: "Satoshi-Regular" },
  upgradeBtn: { height: 48, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  upgradeBtnText: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold" },
});
`,

  "(tabs)/search.tsx": `import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";

const RECENT = ["Bali, Indonesia", "Santorini, Greece", "Tokyo, Japan", "Paris, France"];
const TRENDING = [
  { name: "Kyoto", country: "Japan", emoji: "🏯", match: 97 },
  { name: "Amalfi Coast", country: "Italy", emoji: "🌊", match: 94 },
  { name: "Marrakech", country: "Morocco", emoji: "🕌", match: 91 },
  { name: "Queenstown", country: "New Zealand", emoji: "🏔️", match: 89 },
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <ScreenWrapper title="Search" scrollable bottomPad={40}>
      {/* Search bar */}
      <BlurView intensity={20} tint="dark" style={s.searchBar}>
        <MaterialIcons name="search" size={22} color={DS.purple} />
        <TextInput
          style={s.searchInput}
          placeholder="Where do you want to go?"
          placeholderTextColor={DS.placeholder}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <MaterialIcons name="close" size={18} color={DS.muted} />
          </Pressable>
        )}
      </BlurView>

      {/* Recent */}
      {query.length === 0 && (
        <>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Recent Searches</Text>
            <Pressable><Text style={s.clearText}>Clear</Text></Pressable>
          </View>
          {RECENT.map(r => (
            <Pressable key={r} style={s.recentRow}>
              <MaterialIcons name="history" size={18} color={DS.muted} />
              <Text style={s.recentText}>{r}</Text>
              <MaterialIcons name="north-west" size={16} color={DS.placeholder} />
            </Pressable>
          ))}

          <Text style={[s.sectionTitle, { marginTop: 24 }]}>Trending Destinations</Text>
          {TRENDING.map(d => (
            <BlurView key={d.name} intensity={15} tint="dark" style={s.trendCard}>
              <View style={s.trendEmoji}>
                <Text style={{ fontSize: 24 }}>{d.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.trendName}>{d.name}</Text>
                <Text style={s.trendCountry}>{d.country}</Text>
              </View>
              <View style={s.matchBadge}>
                <Text style={s.matchText}>{d.match}% match</Text>
              </View>
            </BlurView>
          ))}
        </>
      )}
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  searchBar: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.purple + "66", flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, height: 54, backgroundColor: DS.surface, marginBottom: 24 },
  searchInput: { flex: 1, color: DS.white, fontSize: 16, fontFamily: "Satoshi-Regular" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
  clearText: { color: DS.purple, fontSize: 13, fontFamily: "Satoshi-Medium" },
  recentRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: DS.border },
  recentText: { flex: 1, color: DS.secondary, fontSize: 14, fontFamily: "Satoshi-Regular" },
  trendCard: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.border, flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface, marginBottom: 10 },
  trendEmoji: { width: 48, height: 48, borderRadius: 12, backgroundColor: DS.surface, justifyContent: "center", alignItems: "center" },
  trendName: { color: DS.white, fontSize: 15, fontFamily: "Satoshi-Medium" },
  trendCountry: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  matchBadge: { backgroundColor: DS.success + "22", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: DS.success + "44" },
  matchText: { color: DS.success, fontSize: 11, fontFamily: "Satoshi-Medium" },
});
`,

  "(tabs)/dna-management.tsx": `import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const DNA_DIMS = [
  { label: "Adventure", value: 85, icon: "terrain", color: DS.purple },
  { label: "Culture", value: 72, icon: "museum", color: DS.pink },
  { label: "Relaxation", value: 60, icon: "spa", color: DS.success },
  { label: "Gastronomy", value: 90, icon: "restaurant", color: DS.warning },
  { label: "Social", value: 45, icon: "people", color: DS.info },
  { label: "Budget", value: 65, icon: "savings", color: DS.secondary },
  { label: "Luxury", value: 55, icon: "diamond", color: DS.pink },
  { label: "Nature", value: 78, icon: "park", color: DS.success },
];

export default function DNAManagementScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper title="Travel DNA" scrollable bottomPad={40}>
      {/* DNA Type */}
      <BlurView intensity={20} tint="dark" style={s.typeCard}>
        <LinearGradient colors={[DS.purple + "33", DS.pink + "22"]} style={s.typeInner}>
          <View style={s.typeIcon}>
            <MaterialIcons name="psychology" size={32} color={DS.purple} />
          </View>
          <Text style={s.typeLabel}>Your DNA Type</Text>
          <Text style={s.typeName}>Adventure Explorer</Text>
          <Text style={s.typeDesc}>You crave new experiences, local culture, and off-the-beaten-path adventures.</Text>
          <Pressable style={s.retakeBtn} onPress={() => router.push("/(dna)/categories" as any)}>
            <Text style={s.retakeText}>Retake Quiz</Text>
          </Pressable>
        </LinearGradient>
      </BlurView>

      {/* Dimensions */}
      <Text style={s.sectionTitle}>DNA Dimensions</Text>
      {DNA_DIMS.map(dim => (
        <View key={dim.label} style={s.dimRow}>
          <View style={[s.dimIcon, { backgroundColor: dim.color + "22" }]}>
            <MaterialIcons name={dim.icon as any} size={18} color={dim.color} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={s.dimHeader}>
              <Text style={s.dimLabel}>{dim.label}</Text>
              <Text style={[s.dimValue, { color: dim.color }]}>{dim.value}%</Text>
            </View>
            <View style={s.dimBarBg}>
              <View style={[s.dimBarFill, { width: \`\${dim.value}%\`, backgroundColor: dim.color }]} />
            </View>
          </View>
        </View>
      ))}

      {/* Update CTA */}
      <Pressable style={{ marginTop: 16 }}>
        <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.updateBtn}>
          <MaterialIcons name="edit" size={18} color="#FFF" />
          <Text style={s.updateBtnText}>Update Preferences</Text>
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  typeCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 24 },
  typeInner: { alignItems: "center", padding: 24, gap: 8 },
  typeIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: DS.purple + "22", justifyContent: "center", alignItems: "center", marginBottom: 4 },
  typeLabel: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  typeName: { color: DS.white, fontSize: 24, fontFamily: "Chillax-Bold" },
  typeDesc: { color: DS.secondary, fontSize: 14, fontFamily: "Satoshi-Regular", textAlign: "center", lineHeight: 20 },
  retakeBtn: { marginTop: 8, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: DS.purple + "66" },
  retakeText: { color: DS.purple, fontSize: 13, fontFamily: "Satoshi-Medium" },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 16 },
  dimRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  dimIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  dimHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  dimLabel: { color: DS.white, fontSize: 13, fontFamily: "Satoshi-Medium" },
  dimValue: { fontSize: 13, fontFamily: "Chillax-Bold" },
  dimBarBg: { height: 6, borderRadius: 3, backgroundColor: DS.surface },
  dimBarFill: { height: 6, borderRadius: 3 },
  updateBtn: { height: 52, borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  updateBtnText: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold" },
});
`,
};

// Write all screens
let count = 0;
for (const [relPath, content] of Object.entries(SCREENS)) {
  const fullPath = path.join(APP_DIR, relPath);
  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`✅ ${relPath}`);
  count++;
}

console.log('\n🎉 Redesigned ' + count + ' screens');
