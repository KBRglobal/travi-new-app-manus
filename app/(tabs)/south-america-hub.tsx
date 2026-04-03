/**
 * TRAVI — South America Travel Hub
 */
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const COUNTRIES = [
  { id: "brazil", label: "Brazil", emoji: "🇧🇷", color: "#22C55E", tagline: "Carnival, Amazon & Beaches" },
  { id: "argentina", label: "Argentina", emoji: "🇦🇷", color: "#6443F4", tagline: "Tango, Patagonia & Wine" },
  { id: "colombia", label: "Colombia", emoji: "🇨🇴", color: "#F59E0B", tagline: "Coffee, Culture & Coast" },
  { id: "peru", label: "Peru", emoji: "🇵🇪", color: "#F94498", tagline: "Machu Picchu & Cuisine" },
  { id: "chile", label: "Chile", emoji: "🇨🇱", color: "#06B6D4", tagline: "Atacama & Patagonia" },
  { id: "ecuador", label: "Ecuador", emoji: "🇪🇨", color: "#EF4444", tagline: "Galapagos & Andes" },
];

type CountryId = "brazil" | "argentina" | "colombia" | "peru" | "chile" | "ecuador";

const COUNTRY_DATA: Record<CountryId, {
  capital: string; bestTime: string; currency: string; language: string; visa: string;
  highlights: { emoji: string; title: string; desc: string }[];
  tips: string[];
  budget: { level: string; daily: string; color: string }[];
}> = {
  brazil: {
    capital: "Brasília", bestTime: "Apr–Oct", currency: "BRL (R$)", language: "Portuguese", visa: "Visa-free for Israelis",
    highlights: [
      { emoji: "🏖️", title: "Rio de Janeiro", desc: "Copacabana, Ipanema, Christ the Redeemer, Sugarloaf Mountain" },
      { emoji: "🌿", title: "Amazon Rainforest", desc: "Manaus gateway, river cruises, wildlife, indigenous villages" },
      { emoji: "🎭", title: "Carnival (Feb)", desc: "World's largest festival — Rio & Salvador samba parades" },
      { emoji: "💧", title: "Iguazu Falls", desc: "275 waterfalls straddling Brazil-Argentina border" },
      { emoji: "🏙️", title: "São Paulo", desc: "South America's largest city — food, art, nightlife" },
    ],
    tips: ["Book Carnival accommodation 6+ months ahead", "Learn basic Portuguese — English is limited outside cities", "Use Uber everywhere — safer than taxis", "Yellow fever vaccine required for Amazon regions"],
    budget: [
      { level: "Budget", daily: "$40–60", color: "#22C55E" },
      { level: "Mid-range", daily: "$80–150", color: "#F59E0B" },
      { level: "Luxury", daily: "$200+", color: "#F94498" },
    ],
  },
  argentina: {
    capital: "Buenos Aires", bestTime: "Oct–Apr", currency: "ARS (peso)", language: "Spanish", visa: "Visa-free for Israelis",
    highlights: [
      { emoji: "💃", title: "Buenos Aires", desc: "Tango shows, La Boca, Palermo, world-class steakhouses" },
      { emoji: "🏔️", title: "Patagonia", desc: "Bariloche, El Calafate, Perito Moreno Glacier, Torres del Paine" },
      { emoji: "🍷", title: "Mendoza Wine Region", desc: "Malbec vineyards, wine tours, Andes backdrop" },
      { emoji: "🌊", title: "Iguazu Falls", desc: "Argentine side offers the most dramatic viewpoints" },
      { emoji: "🐧", title: "Peninsula Valdés", desc: "Whales, penguins, sea lions — UNESCO World Heritage" },
    ],
    tips: ["Use blue dollar exchange rate (legal via banks) for better value", "Book Patagonia lodges 3+ months ahead in peak season", "Steakhouses (parrillas) are the must-eat experience", "Buenos Aires has a large, welcoming Israeli community"],
    budget: [
      { level: "Budget", daily: "$35–55", color: "#22C55E" },
      { level: "Mid-range", daily: "$70–130", color: "#F59E0B" },
      { level: "Luxury", daily: "$180+", color: "#F94498" },
    ],
  },
  colombia: {
    capital: "Bogotá", bestTime: "Dec–Mar", currency: "COP (peso)", language: "Spanish", visa: "Visa-free for Israelis",
    highlights: [
      { emoji: "🌺", title: "Cartagena", desc: "Colonial walled city, Caribbean beaches, colorful streets" },
      { emoji: "☕", title: "Coffee Region", desc: "Salento, Cocora Valley, coffee farm tours" },
      { emoji: "🏙️", title: "Medellín", desc: "Transformed city — cable cars, street art, innovation hub" },
      { emoji: "🐦", title: "Amazon & Wildlife", desc: "Leticia, pink dolphins, jungle lodges" },
      { emoji: "🌊", title: "Tayrona National Park", desc: "Caribbean coast, jungle-to-beach hikes" },
    ],
    tips: ["Colombia has transformed dramatically — very safe for tourists now", "Try arepas, bandeja paisa, and fresh fruit juices everywhere", "Medellín has excellent digital nomad infrastructure", "Book Cartagena in advance for December-January peak season"],
    budget: [
      { level: "Budget", daily: "$30–50", color: "#22C55E" },
      { level: "Mid-range", daily: "$60–110", color: "#F59E0B" },
      { level: "Luxury", daily: "$150+", color: "#F94498" },
    ],
  },
  peru: {
    capital: "Lima", bestTime: "May–Oct", currency: "PEN (sol)", language: "Spanish", visa: "Visa-free for Israelis",
    highlights: [
      { emoji: "🏛️", title: "Machu Picchu", desc: "Inca citadel — book Huayna Picchu sunrise tickets months ahead" },
      { emoji: "🍽️", title: "Lima Food Scene", desc: "World's best restaurant (Central) — Peru has the world's best cuisine" },
      { emoji: "🌊", title: "Lake Titicaca", desc: "World's highest navigable lake, floating Uros islands" },
      { emoji: "🏜️", title: "Nazca Lines", desc: "Mysterious geoglyphs visible only from the air" },
      { emoji: "🌿", title: "Amazon Basin", desc: "Iquitos, Manu National Park, wildlife lodges" },
    ],
    tips: ["Acclimatize in Cusco for 2 days before Machu Picchu", "Book Machu Picchu entry tickets online months in advance", "Lima's Miraflores district is the best base", "Ceviche for breakfast is a local tradition — try it"],
    budget: [
      { level: "Budget", daily: "$35–55", color: "#22C55E" },
      { level: "Mid-range", daily: "$70–120", color: "#F59E0B" },
      { level: "Luxury", daily: "$160+", color: "#F94498" },
    ],
  },
  chile: {
    capital: "Santiago", bestTime: "Oct–Apr", currency: "CLP (peso)", language: "Spanish", visa: "Visa-free for Israelis",
    highlights: [
      { emoji: "🏜️", title: "Atacama Desert", desc: "World's driest desert — salt flats, geysers, stargazing" },
      { emoji: "🏔️", title: "Torres del Paine", desc: "Patagonia's crown jewel — trekking, glaciers, condors" },
      { emoji: "🍷", title: "Wine Valleys", desc: "Casablanca, Colchagua — world-class Carménère and Cabernet" },
      { emoji: "🏙️", title: "Santiago", desc: "Modern, safe capital with great food and nightlife" },
      { emoji: "🌊", title: "Easter Island", desc: "Remote Pacific island with mysterious moai statues" },
    ],
    tips: ["Chile is the most developed and safest country in South America", "Book Torres del Paine W Trek huts 6+ months ahead", "Atacama is best visited April-November (avoid summer heat)", "Santiago has a significant Israeli expat community"],
    budget: [
      { level: "Budget", daily: "$45–70", color: "#22C55E" },
      { level: "Mid-range", daily: "$90–160", color: "#F59E0B" },
      { level: "Luxury", daily: "$220+", color: "#F94498" },
    ],
  },
  ecuador: {
    capital: "Quito", bestTime: "Jun–Sep", currency: "USD", language: "Spanish", visa: "Visa-free for Israelis",
    highlights: [
      { emoji: "🦎", title: "Galápagos Islands", desc: "Darwin's living laboratory — giant tortoises, marine iguanas, blue-footed boobies" },
      { emoji: "🌋", title: "Avenue of Volcanoes", desc: "Cotopaxi, Chimborazo — world's highest active volcanoes" },
      { emoji: "🌿", title: "Amazon Rainforest", desc: "Napo River lodges, most biodiverse region on Earth" },
      { emoji: "🏙️", title: "Quito Old Town", desc: "UNESCO World Heritage — best-preserved colonial center in Latin America" },
      { emoji: "🌊", title: "Cloud Forest", desc: "Mindo — hummingbirds, orchids, zip-lining" },
    ],
    tips: ["Galápagos requires advance booking — limited visitor quotas", "Ecuador uses USD — no currency exchange needed", "Quito sits at 2,850m — acclimatize before hiking", "Best value destination in South America"],
    budget: [
      { level: "Budget", daily: "$30–45", color: "#22C55E" },
      { level: "Mid-range", daily: "$60–100", color: "#F59E0B" },
      { level: "Luxury", daily: "$140+", color: "#F94498" },
    ],
  },
};

export default function SouthAmericaHubScreen() {
  const insets = useSafeAreaInsets();
  const [activeCountry, setActiveCountry] = useState<CountryId>("brazil");
  const data = COUNTRY_DATA[activeCountry];
  const country = COUNTRIES.find((c) => c.id === activeCountry)!;

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0A1A0A", "#0D1A0D", "#0A1A0A"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}><Text style={S.backText}>←</Text></TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>🌎 South America</Text>
          <Text style={S.headerSub}>6 Countries · Infinite Adventures</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Country selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.countryRow}>
          {COUNTRIES.map((c) => (
            <TouchableOpacity key={c.id} style={[S.countryChip, activeCountry === c.id && { borderColor: c.color, backgroundColor: c.color + "22" }]} onPress={() => setActiveCountry(c.id as CountryId)} activeOpacity={0.8}>
              <Text style={S.countryEmoji}>{c.emoji}</Text>
              <Text style={[S.countryLabel, activeCountry === c.id && { color: "#FFFFFF" }]}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Country hero */}
        <View style={[S.heroCard, { borderColor: country.color + "44" }]}>
          <LinearGradient colors={[country.color + "25", country.color + "10"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.heroFlag}>{country.emoji}</Text>
          <Text style={[S.heroName, { color: country.color }]}>{country.label}</Text>
          <Text style={S.heroTagline}>{country.tagline}</Text>
          <View style={S.heroMeta}>
            {[
              { label: "Capital", value: data.capital },
              { label: "Best Time", value: data.bestTime },
              { label: "Currency", value: data.currency },
              { label: "Visa", value: data.visa },
            ].map((m, i) => (
              <View key={i} style={S.heroMetaItem}>
                <Text style={S.heroMetaLabel}>{m.label}</Text>
                <Text style={[S.heroMetaValue, m.label === "Visa" && { color: "#22C55E" }]}>{m.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Highlights */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Top Highlights</Text>
          {data.highlights.map((h, i) => (
            <View key={i} style={S.highlightRow}>
              <Text style={S.highlightEmoji}>{h.emoji}</Text>
              <View style={S.highlightContent}>
                <Text style={S.highlightTitle}>{h.title}</Text>
                <Text style={S.highlightDesc}>{h.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Budget */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Daily Budget Guide</Text>
          <View style={S.budgetRow}>
            {data.budget.map((b, i) => (
              <View key={i} style={[S.budgetCard, { borderColor: b.color + "44" }]}>
                <LinearGradient colors={[b.color + "22", b.color + "10"]} style={StyleSheet.absoluteFillObject} />
                <Text style={[S.budgetLevel, { color: b.color }]}>{b.level}</Text>
                <Text style={S.budgetDaily}>{b.daily}</Text>
                <Text style={S.budgetPer}>per day</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insider tips */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Insider Tips</Text>
          {data.tips.map((tip, i) => (
            <View key={i} style={S.tipRow}>
              <View style={[S.tipDot, { backgroundColor: country.color }]} />
              <Text style={S.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Plan trip CTA */}
        <View style={[S.section, { paddingBottom: 40 }]}>
          <TouchableOpacity style={S.planBtn} onPress={() => router.push("/(tabs)/plan" as never)} activeOpacity={0.88}>
            <LinearGradient colors={["#22C55E", "#16A34A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.planBtnText}>Plan My {country.label} Trip →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A1A0A" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 12, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900" },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  countryRow: { paddingHorizontal: 20, gap: 10, paddingBottom: 16 },
  countryChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", alignItems: "center", gap: 4 },
  countryEmoji: { fontSize: 22 },
  countryLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700" },
  heroCard: { marginHorizontal: 20, borderRadius: 20, overflow: "hidden", padding: 20, marginBottom: 24, borderWidth: 1, alignItems: "center" },
  heroFlag: { fontSize: 48 },
  heroName: { fontSize: 24, fontWeight: "900", marginTop: 8 },
  heroTagline: { color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4, textAlign: "center" },
  heroMeta: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 16, justifyContent: "center" },
  heroMetaItem: { alignItems: "center" },
  heroMetaLabel: { color: "rgba(255,255,255,0.4)", fontSize: 10 },
  heroMetaValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", marginBottom: 12 },
  highlightRow: { flexDirection: "row", gap: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  highlightEmoji: { fontSize: 28, marginTop: 2 },
  highlightContent: { flex: 1, gap: 2 },
  highlightTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  highlightDesc: { color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 18 },
  budgetRow: { flexDirection: "row", gap: 10 },
  budgetCard: { flex: 1, borderRadius: 14, overflow: "hidden", padding: 14, borderWidth: 1, alignItems: "center", gap: 2 },
  budgetLevel: { fontSize: 12, fontWeight: "800" },
  budgetDaily: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  budgetPer: { color: "rgba(255,255,255,0.4)", fontSize: 10 },
  tipRow: { flexDirection: "row", gap: 12, paddingVertical: 8, alignItems: "flex-start" },
  tipDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  tipText: { flex: 1, color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 20 },
  planBtn: { borderRadius: 16, overflow: "hidden", paddingVertical: 16, alignItems: "center" },
  planBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
});
