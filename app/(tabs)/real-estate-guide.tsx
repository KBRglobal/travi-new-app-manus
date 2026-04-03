/**
 * TRAVI — Real Estate Guide for Israeli Investors
 */
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CHAPTERS = [
  {
    id: "why-uae", emoji: "🇦🇪", title: "Why UAE for Israeli Investors", color: "#F59E0B",
    sections: [
      { title: "Abraham Accords Impact", content: "Since the Abraham Accords (2020), Israeli citizens can invest in UAE real estate with the same rights as other foreign nationals. Direct flights from Tel Aviv to Dubai/Abu Dhabi make property visits seamless." },
      { title: "Tax Advantages", content: "UAE has NO income tax, NO capital gains tax, and NO inheritance tax. For Israeli investors, rental income earned in UAE is subject to Israeli tax reporting but benefits from the Israel-UAE tax treaty." },
      { title: "Currency Stability", content: "The UAE Dirham (AED) is pegged to the USD at 3.67, providing currency stability. For Israeli investors, the NIS/USD exchange rate is the primary currency risk." },
      { title: "Residency Benefits", content: "Investing AED 750K+ qualifies for a 2-year renewable UAE residency visa. AED 2M+ qualifies for a 10-year Golden Visa — allowing you to live, work, and bring family." },
    ],
  },
  {
    id: "buying-process", emoji: "📋", title: "The Buying Process", color: "#6443F4",
    sections: [
      { title: "Step 1: Choose Property Type", content: "Decide between off-plan (under construction, lower price, higher risk) vs ready (immediate possession, rental income from day 1). Off-plan typically offers 20-30% lower entry price with 2-4 year delivery." },
      { title: "Step 2: Due Diligence", content: "Verify the developer is registered with RERA (Real Estate Regulatory Agency). Check the project escrow account. Review the Sales Purchase Agreement (SPA) with a UAE-licensed lawyer." },
      { title: "Step 3: Payment & Registration", content: "Pay 4% DLD (Dubai Land Department) transfer fee. Register with DLD within 60 days. For mortgages, non-residents can borrow up to 50% LTV. Israeli passports are accepted." },
      { title: "Step 4: Title Deed", content: "Receive your Title Deed (Tabu) from DLD. This is your proof of ownership. For off-plan, you receive an Oqood (interim registration) until handover." },
    ],
  },
  {
    id: "off-plan", emoji: "🏗️", title: "Off-Plan Explained", color: "#F94498",
    sections: [
      { title: "What is Off-Plan?", content: "Off-plan means buying a property before it's built. You pay in installments (typically 10-20% on booking, then quarterly payments). Handover is usually 2-4 years from launch." },
      { title: "Typical Payment Plan", content: "Example: 10% on booking → 10% on construction start → 40% during construction (quarterly) → 40% on handover. Some developers offer 60/40 post-handover plans." },
      { title: "Risks to Know", content: "Developer delays are common — build in 6-12 months buffer. Check developer track record. Ensure funds go into RERA-regulated escrow. Have an exit strategy if you need to sell before handover." },
      { title: "Profit Potential", content: "Off-plan properties typically appreciate 15-30% from launch to handover in a rising market. You can often resell (flip) before handover, paying only the installments made so far." },
    ],
  },
  {
    id: "legal", emoji: "⚖️", title: "UAE Property Law", color: "#22C55E",
    sections: [
      { title: "Freehold vs Leasehold", content: "Foreigners can only buy in designated Freehold zones (Downtown, Marina, Palm, JVC, etc.). In these zones, you own the property outright with no time limit. Leasehold gives 99-year ownership." },
      { title: "Strata Law", content: "Dubai's Strata Law (2007) governs jointly-owned properties (apartments). Service charges (AED 10-25/sqft/year) cover maintenance, security, and amenities. Review service charge history before buying." },
      { title: "Rental Law", content: "Dubai Law No. 26 of 2007 governs tenancy. Landlords can increase rent only once per year, capped by RERA's Rental Index. Eviction requires 12 months notice for personal use." },
      { title: "Israeli-Specific Notes", content: "Israeli passport holders are fully welcome. Some UAE banks require additional documentation for Israeli nationals. Use a UAE-licensed lawyer familiar with Israeli clients. TRAVI's legal partners specialize in this." },
    ],
  },
  {
    id: "mortgage", emoji: "🏦", title: "Mortgage for Non-Residents", color: "#06B6D4",
    sections: [
      { title: "Who Can Get a Mortgage?", content: "Non-UAE residents (including Israelis) can get mortgages from UAE banks. Maximum LTV is 50% for non-residents (vs 80% for residents). Minimum property value: AED 1M." },
      { title: "Interest Rates", content: "Current rates: 4.5-5.5% fixed for 3-5 years, then EIBOR + 1.5-2%. EIBOR (Emirates Interbank Offered Rate) is currently ~5.2%, so variable rates are ~6.7-7.2%." },
      { title: "Required Documents", content: "Passport, 6-month bank statements, salary slips or company financials (if self-employed), credit report, property details. Israeli documents accepted — some banks require apostille." },
      { title: "Best Banks for Israelis", content: "Emirates NBD, ADCB, and Mashreq have experience with Israeli clients. Expect 2-4 weeks for approval. TRAVI's mortgage partners can pre-qualify you before you visit Dubai." },
    ],
  },
];

export default function RealEstateGuideScreen() {
  const insets = useSafeAreaInsets();
  const [expandedChapter, setExpandedChapter] = useState<string | null>("why-uae");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0A0A1A", "#0D1628", "#0A0A1A"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}><Text style={S.backText}>←</Text></TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>📚 Investor Guide</Text>
          <Text style={S.headerSub}>UAE Real Estate for Israelis</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={S.introBanner}>
          <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.15)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.introTitle}>Everything You Need to Know</Text>
          <Text style={S.introDesc}>A complete guide to buying UAE property as an Israeli investor — from the Abraham Accords to your Title Deed.</Text>
          <View style={S.introStats}>
            {[{ v: "0%", l: "Capital gains tax" }, { v: "50%", l: "Max LTV mortgage" }, { v: "4%", l: "DLD transfer fee" }, { v: "AED 750K", l: "Residency threshold" }].map((s, i) => (
              <View key={i} style={S.introStat}>
                <Text style={S.introStatV}>{s.v}</Text>
                <Text style={S.introStatL}>{s.l}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={S.section}>
          {CHAPTERS.map((chapter) => (
            <View key={chapter.id} style={[S.chapterCard, { borderColor: chapter.color + "33" }]}>
              <TouchableOpacity style={S.chapterHeader} onPress={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)} activeOpacity={0.85}>
                <LinearGradient colors={[chapter.color + "18", chapter.color + "08"]} style={StyleSheet.absoluteFillObject} />
                <Text style={S.chapterEmoji}>{chapter.emoji}</Text>
                <Text style={[S.chapterTitle, { color: chapter.color }]}>{chapter.title}</Text>
                <Text style={S.chapterArrow}>{expandedChapter === chapter.id ? "▲" : "▼"}</Text>
              </TouchableOpacity>
              {expandedChapter === chapter.id && (
                <View style={S.chapterContent}>
                  {chapter.sections.map((sec, si) => (
                    <TouchableOpacity key={si} style={S.sectionItem} onPress={() => setExpandedSection(expandedSection === `${chapter.id}-${si}` ? null : `${chapter.id}-${si}`)} activeOpacity={0.85}>
                      <View style={S.sectionItemHeader}>
                        <Text style={S.sectionItemTitle}>{sec.title}</Text>
                        <Text style={S.sectionItemArrow}>{expandedSection === `${chapter.id}-${si}` ? "−" : "+"}</Text>
                      </View>
                      {expandedSection === `${chapter.id}-${si}` && (
                        <Text style={S.sectionItemContent}>{sec.content}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        <View style={[S.section, { paddingBottom: 130 }]}>
          <TouchableOpacity style={S.ctaCard} onPress={() => router.push("/(tabs)/real-estate-contacts" as never)} activeOpacity={0.88}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.ctaTitle}>Ready to invest?</Text>
            <Text style={S.ctaDesc}>Talk to our UAE property experts who specialize in Israeli investors.</Text>
            <View style={S.ctaBtn}><Text style={S.ctaBtnText}>Book Free Consultation →</Text></View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A1A" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 130, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  introBanner: { marginHorizontal: 20, borderRadius: 20, overflow: "hidden", padding: 20, gap: 10, marginBottom: 20, borderWidth: 1, borderColor: "rgba(100,67,244,0.25)" },
  introTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  introDesc: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 20 },
  introStats: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  introStat: { width: "45%" },
  introStatV: { color: "#6443F4", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold" },
  introStatL: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  section: { paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  chapterCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1 },
  chapterHeader: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  chapterEmoji: { fontSize: 24 },
  chapterTitle: { flex: 1, fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
  chapterArrow: { color: "rgba(255,255,255,0.55)", fontSize: 12 },
  chapterContent: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.55)", padding: 16, gap: 8 },
  sectionItem: { borderRadius: 10, backgroundColor: "rgba(255,255,255,0.55)", padding: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  sectionItemHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionItemTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", flex: 1 },
  sectionItemArrow: { color: "rgba(255,255,255,0.5)", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  sectionItemContent: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 22, marginTop: 10 },
  ctaCard: { borderRadius: 20, overflow: "hidden", padding: 24, gap: 10, alignItems: "center" },
  ctaTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  ctaDesc: { color: "rgba(255,255,255,0.8)", fontSize: 14, textAlign: "center", lineHeight: 22 },
  ctaBtn: { backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, marginTop: 4 },
  ctaBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", fontFamily: "Chillax-Bold" },
});
