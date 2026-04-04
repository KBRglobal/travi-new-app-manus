import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
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
            <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.contactBtnGrad}>
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
