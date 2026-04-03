import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, TextInput, Platform, Animated
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const TABS = ["FAQ", "Contact", "Tickets"];

const FAQS = [
  {
    q: "How do TRAVI Points work?",
    a: "TRAVI Points are earned every time you book through TRAVI. We return 100% of our commissions to you as points. 100 points = $1 travel credit. Points never expire as long as your account is active.",
    category: "Points & Rewards",
  },
  {
    q: "What is the DNA Quiz?",
    a: "The DNA Quiz is a 10-question personality assessment that determines your unique traveler type. Based on your answers, TRAVI creates a personalized travel profile and recommends destinations that match your style.",
    category: "Features",
  },
  {
    q: "How does TRAVI make money?",
    a: "TRAVI earns commissions from hotels, airlines, and tour operators — exactly like traditional travel agents. The difference: we return 100% of those commissions to you as TRAVI Points instead of keeping them.",
    category: "Business Model",
  },
  {
    q: "Can I cancel or change my booking?",
    a: "Yes. All bookings made through TRAVI follow the cancellation policy of the provider (hotel/airline). You can view and manage all bookings in the Trips section. TRAVI charges no cancellation fees.",
    category: "Bookings",
  },
  {
    q: "Is TRAVI available in my country?",
    a: "TRAVI currently serves travelers from Israel, UAE, and Europe. We're expanding rapidly. If your country isn't supported yet, join the waitlist and we'll notify you when we launch.",
    category: "Availability",
  },
  {
    q: "How do I redeem my TRAVI Points?",
    a: "Go to Wallet → Redeem. You can apply points to any booking as a discount, transfer them to airline miles, or use them for hotel upgrades. Minimum redemption is 500 points ($5).",
    category: "Points & Rewards",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. TRAVI uses bank-grade 256-bit SSL encryption. We never store your full card details — payments are processed through PCI-DSS certified providers. Your data is never sold to third parties.",
    category: "Security",
  },
  {
    q: "How does the AI trip planner work?",
    a: "Our AI analyzes your DNA profile, budget, dates, and preferences to build a complete itinerary in under 90 seconds. It includes flights, hotels, activities, and restaurant recommendations — all bookable in one tap.",
    category: "Features",
  },
];

const TICKET_STATUSES = [
  { id: "TKT-2847", subject: "Flight booking confirmation not received", status: "resolved", date: "Mar 28, 2026", category: "Booking" },
  { id: "TKT-2901", subject: "Points not credited after hotel stay", status: "in_progress", date: "Apr 1, 2026", category: "Points" },
  { id: "TKT-3012", subject: "Question about cancellation policy", status: "open", date: "Apr 2, 2026", category: "Policy" },
];

const STATUS_CONFIG = {
  open: { label: "Open", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  in_progress: { label: "In Progress", color: "#6443F4", bg: "rgba(100,67,244,0.15)" },
  resolved: { label: "Resolved", color: "#22C55E", bg: "rgba(34,197,94,0.15)" },
};

export default function SupportScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [category, setCategory] = useState<"booking" | "payment" | "account" | "technical" | "feedback" | "other">("booking");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [submitted, setSubmitted] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch real tickets from DB when authenticated
  const ticketsQuery = trpc.support.list.useQuery(undefined, { enabled: isAuthenticated });
  const createTicketMutation = trpc.support.create.useMutation({
    onSuccess: () => ticketsQuery.refetch(),
  });

  // Use real DB tickets if available, otherwise fall back to mock data
  const dbTickets = ticketsQuery.data ?? [];
  const displayTickets = dbTickets.length > 0
    ? dbTickets.map((t: any) => ({
        id: `TKT-${String(t.id).padStart(4, "0")}`,
        subject: t.subject,
        status: t.status as keyof typeof STATUS_CONFIG,
        date: new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        category: t.category,
      }))
    : TICKET_STATUSES;

  const handleTab = (i: number) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(i);
  };

  const handleSubmit = () => {
    if (!subject.trim() || !description.trim()) return;
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Submit to real DB if authenticated
    if (isAuthenticated) {
      createTicketMutation.mutate({ subject, description, category });
    }
    setSubmitted(true);
  };

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.8}>
          <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={S.headerTitle}>Help & Support</Text>
          <Text style={S.headerSub}>We're here to help</Text>
        </View>
        <View style={S.headerBadge}>
          <Text style={S.headerBadgeText}>24/7</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={S.tabsRow}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[S.tab, activeTab === i && S.tabActive]}
            onPress={() => handleTab(i)}
            activeOpacity={0.8}
          >
            {activeTab === i && (
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            )}
            <Text style={[S.tabText, activeTab === i && S.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.content}>
        {activeTab === 0 && (
          <FAQTab faqs={FAQS} expanded={expandedFaq} onToggle={(i) => setExpandedFaq(expandedFaq === i ? null : i)} />
        )}
        {activeTab === 1 && (
          <ContactTab
            category={category}
            subject={subject}
            description={description}
            priority={priority}
            submitted={submitted}
            onCategory={setCategory}
            onSubject={setSubject}
            onDescription={setDescription}
            onPriority={setPriority}
            onSubmit={handleSubmit}
          />
        )}
        {activeTab === 2 && <TicketsTab tickets={displayTickets} />}
      </ScrollView>
    </View>
  );
}

function FAQTab({ faqs, expanded, onToggle }: { faqs: typeof FAQS; expanded: number | null; onToggle: (i: number) => void }) {
  return (
    <View style={F.wrap}>
      <Text style={F.sectionTitle}>Frequently Asked Questions</Text>
      {faqs.map((faq, i) => (
        <TouchableOpacity
          key={i}
          style={[F.faqCard, expanded === i && F.faqCardOpen]}
          onPress={() => onToggle(i)}
          activeOpacity={0.85}
        >
          <View style={F.faqHeader}>
            <Text style={F.faqQ}>{faq.q}</Text>
            <View style={[F.faqChevron, expanded === i && F.faqChevronOpen]}>
              <IconSymbol name="chevron.right" size={14} color="rgba(255,255,255,0.5)" />
            </View>
          </View>
          {expanded === i && (
            <View style={F.faqBody}>
              <View style={F.faqDivider} />
              <Text style={F.faqA}>{faq.a}</Text>
              <View style={F.faqCategoryBadge}>
                <Text style={F.faqCategoryText}>{faq.category}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <View style={F.emailRow}>
        <Text style={F.emailLabel}>Can't find your answer?</Text>
        <TouchableOpacity style={F.emailBtn} activeOpacity={0.8}>
          <LinearGradient colors={["rgba(100,67,244,0.3)", "rgba(249,68,152,0.2)"]} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="envelope.fill" size={16} color="#C084FC" />
          <Text style={F.emailBtnText}>support@travi.world</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const F = StyleSheet.create({
  wrap: { gap: 10 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginBottom: 4, fontFamily: "Chillax-Bold" },
  faqCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  faqCardOpen: { borderColor: "rgba(100,67,244,0.35)", backgroundColor: "rgba(100,67,244,0.08)" },
  faqHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  faqQ: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", flex: 1, lineHeight: 20, fontFamily: "Satoshi-Medium" },
  faqChevron: { transform: [{ rotate: "0deg" }] },
  faqChevronOpen: { transform: [{ rotate: "90deg" }] },
  faqBody: { marginTop: 10, gap: 8 },
  faqDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.06)" },
  faqA: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 20, fontFamily: "Satoshi-Regular" },
  faqCategoryBadge: { backgroundColor: "rgba(100,67,244,0.2)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: "flex-start" },
  faqCategoryText: { color: "#C084FC", fontSize: 11, fontWeight: "600" },
  emailRow: { marginTop: 8, alignItems: "center", gap: 8 },
  emailLabel: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  emailBtn: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 12, overflow: "hidden", paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  emailBtnText: { color: "#C084FC", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },
});

function ContactTab({
  category, subject, description, priority, submitted,
  onCategory, onSubject, onDescription, onPriority, onSubmit
}: any) {
  const CATEGORIES = ["Booking", "Points", "Technical", "Account", "Other"];
  const PRIORITIES = ["Low", "Normal", "High", "Urgent"];

  if (submitted) {
    return (
      <View style={C.successWrap}>
        <Text style={{ fontSize: 56 }}>✅</Text>
        <Text style={C.successTitle}>Request Submitted!</Text>
        <Text style={C.successDesc}>We'll get back to you within 24 hours. Check your email for a confirmation.</Text>
        <View style={C.ticketIdBox}>
          <Text style={C.ticketIdLabel}>Your ticket ID</Text>
          <Text style={C.ticketId}>TKT-{Math.floor(3000 + Math.random() * 1000)}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={C.wrap}>
      <Text style={C.sectionTitle}>Submit a Request</Text>

      <Text style={C.fieldLabel}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 130 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[C.catChip, category === cat && C.catChipActive]}
            onPress={() => onCategory(cat)}
            activeOpacity={0.8}
          >
            {category === cat && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
            <Text style={[C.catText, category === cat && C.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={C.fieldLabel}>Subject</Text>
      <TextInput
        style={C.input}
        value={subject}
        onChangeText={onSubject}
        placeholder="Briefly describe your issue..."
        placeholderTextColor="rgba(255,255,255,0.35)"
      />

      <Text style={C.fieldLabel}>Description</Text>
      <TextInput
        style={[C.input, C.textarea]}
        value={description}
        onChangeText={onDescription}
        placeholder="Provide as much detail as possible..."
        placeholderTextColor="rgba(255,255,255,0.35)"
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />

      <Text style={C.fieldLabel}>Priority</Text>
      <View style={C.priorityRow}>
        {PRIORITIES.map((p) => (
          <TouchableOpacity
            key={p}
            style={[C.priorityChip, priority === p && C.priorityChipActive]}
            onPress={() => onPriority(p)}
            activeOpacity={0.8}
          >
            <Text style={[C.priorityText, priority === p && C.priorityTextActive]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={C.submitBtn} onPress={onSubmit} activeOpacity={0.88}>
        <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={C.submitGradient}>
          <Text style={C.submitText}>Submit Request</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const C = StyleSheet.create({
  wrap: { gap: 12 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginBottom: 4, fontFamily: "Chillax-Bold" },
  fieldLabel: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: "700", letterSpacing: 0.5, marginBottom: -4, fontFamily: "Satoshi-Medium" },
  input: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", padding: 13, color: "#FFFFFF", fontSize: 14, fontFamily: "Satoshi-Regular" },
  textarea: { minHeight: 110 },
  catChip: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  catChipActive: { borderColor: "transparent" },
  catText: { color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  catTextActive: { color: "#FFFFFF" },
  priorityRow: { flexDirection: "row", gap: 8 },
  priorityChip: { flex: 1, borderRadius: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", paddingVertical: 8, alignItems: "center" },
  priorityChipActive: { borderColor: "#6443F4", backgroundColor: "rgba(100,67,244,0.2)" },
  priorityText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "600" },
  priorityTextActive: { color: "#C084FC" },
  submitBtn: { borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", marginTop: 4 },
  submitGradient: { alignItems: "center", paddingVertical: 15 },
  submitText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  successWrap: { alignItems: "center", gap: 16, paddingTop: 40 },
  successTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", fontFamily: "Chillax-Bold" },
  successDesc: { color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 21, textAlign: "center", fontFamily: "Satoshi-Regular" },
  ticketIdBox: { backgroundColor: "rgba(100,67,244,0.15)", borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)", width: "100%" },
  ticketIdLabel: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "600" },
  ticketId: { color: "#C084FC", fontSize: 22, fontWeight: "900", marginTop: 4, fontFamily: "Chillax-Bold" },
});

function TicketsTab({ tickets }: { tickets: typeof TICKET_STATUSES }) {
  return (
    <View style={TK.wrap}>
      <View style={TK.headerRow}>
        <Text style={TK.sectionTitle}>My Tickets</Text>
        <Text style={TK.count}>{tickets.length} total</Text>
      </View>
      {tickets.map((ticket) => {
        const status = STATUS_CONFIG[ticket.status as keyof typeof STATUS_CONFIG];
        return (
          <TouchableOpacity key={ticket.id} style={TK.ticketCard} activeOpacity={0.85}>
            <View style={TK.ticketTop}>
              <Text style={TK.ticketId}>{ticket.id}</Text>
              <View style={[TK.statusBadge, { backgroundColor: status.bg }]}>
                <Text style={[TK.statusText, { color: status.color }]}>{status.label}</Text>
              </View>
            </View>
            <Text style={TK.ticketSubject}>{ticket.subject}</Text>
            <View style={TK.ticketMeta}>
              <Text style={TK.ticketCategory}>{ticket.category}</Text>
              <Text style={TK.ticketDate}>{ticket.date}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      {tickets.length === 0 && (
        <View style={TK.empty}>
          <Text style={{ fontSize: 40 }}>🎉</Text>
          <Text style={TK.emptyTitle}>No open tickets</Text>
          <Text style={TK.emptyDesc}>Everything looks great! If you need help, use the Contact tab.</Text>
        </View>
      )}
    </View>
  );
}

const TK = StyleSheet.create({
  wrap: { gap: 10 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  count: { color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  ticketCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", gap: 6 },
  ticketTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ticketId: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
  statusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: 11, fontWeight: "700" },
  ticketSubject: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", lineHeight: 20, fontFamily: "Satoshi-Medium" },
  ticketMeta: { flexDirection: "row", justifyContent: "space-between" },
  ticketCategory: { color: "#C084FC", fontSize: 12, fontWeight: "600" },
  ticketDate: { color: "rgba(255,255,255,0.55)", fontSize: 12 },
  empty: { alignItems: "center", gap: 10, paddingTop: 40 },
  emptyTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  emptyDesc: { color: "rgba(255,255,255,0.45)", fontSize: 13, textAlign: "center", lineHeight: 19, fontFamily: "Satoshi-Regular" },
});

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 56, paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 1 },
  headerBadge: { backgroundColor: "rgba(34,197,94,0.2)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(34,197,94,0.3)" },
  headerBadgeText: { color: "#22C55E", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  tabsRow: { flexDirection: "row", paddingHorizontal: 16, paddingBottom: 130, gap: 8 },
  tab: { flex: 1, borderRadius: 20, overflow: "hidden", paddingVertical: 9, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  tabActive: { borderColor: "transparent" },
  tabText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Medium" },
  tabTextActive: { color: "#FFFFFF" },
  content: { padding: 16, paddingBottom: 130, gap: 16 },
});
