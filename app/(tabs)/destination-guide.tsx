import React, { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Image, Animated, Platform, FlatList
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

interface DestinationData {
  id: string;
  name: string;
  country: string;
  flag: string;
  heroImage: number;
  tagline: string;
  stats: { temp: string; currency: string; language: string; timezone: string };
  overview: string;
  regions: { name: string; type: string; desc: string; icon: string; highlight: string }[];
  culture: { title: string; desc: string; icon: string }[];
  food: { name: string; type: string; price: string; area: string; desc: string }[];
  budget: {
    backpacker: { daily: string; hotel: string; food: string; transport: string };
    midrange: { daily: string; hotel: string; food: string; transport: string };
    luxury: { daily: string; hotel: string; food: string; transport: string };
  };
  israeliTips: string[];
  halal: boolean;
  kosher: boolean;
}

const DESTINATIONS: Record<string, DestinationData> = {
  dubai: {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    heroImage: require("@/assets/destinations/dubai.jpg"),
    tagline: "Where the future is already here",
    stats: { temp: "28°C", currency: "AED", language: "Arabic", timezone: "GMT+4" },
    overview: "Dubai is a city of superlatives — the tallest buildings, the largest malls, and the most ambitious vision. A seamless blend of ultramodern architecture and traditional Emirati culture.",
    regions: [
      { name: "Downtown Dubai", type: "Urban", desc: "Burj Khalifa, Dubai Mall, Dubai Fountain. The heart of modern Dubai.", icon: "🏙️", highlight: "Burj Khalifa at sunset" },
      { name: "Dubai Marina", type: "Coastal", desc: "Waterfront dining, yacht clubs, JBR Beach. Vibrant and cosmopolitan.", icon: "⛵", highlight: "Marina Walk at night" },
      { name: "Old Dubai", type: "Cultural", desc: "Gold Souk, Spice Souk, Al Fahidi. Authentic Emirati heritage.", icon: "🕌", highlight: "Abra boat ride on the Creek" },
      { name: "Palm Jumeirah", type: "Luxury", desc: "Atlantis, luxury hotels, private beaches. The iconic palm island.", icon: "🌴", highlight: "Atlantis Aquaventure" },
    ],
    culture: [
      { title: "Dress Code", desc: "Cover shoulders and knees in public areas, malls, and souks. Swimwear only at beaches/pools.", icon: "👗" },
      { title: "Prayer Times", desc: "5 daily prayers. Some shops close briefly. Respect quiet during Adhan.", icon: "🕌" },
      { title: "Ramadan", desc: "No eating/drinking in public during daylight hours. Restaurants open after sunset.", icon: "🌙" },
      { title: "Alcohol", desc: "Available in licensed hotels and restaurants. Not sold in public spaces.", icon: "🍷" },
    ],
    food: [
      { name: "Shawarma Palace", type: "Street Food", price: "$", area: "Deira", desc: "Best shawarma in the city. Open 24/7." },
      { name: "Pierchic", type: "Fine Dining", price: "$$$", area: "Madinat Jumeirah", desc: "Seafood over the water. Stunning views." },
      { name: "Al Ustad Special Kabab", type: "Local", price: "$$", area: "Satwa", desc: "Legendary Iranian kebabs since 1978." },
      { name: "Ravi Restaurant", type: "Budget", price: "$", area: "Satwa", desc: "Iconic Pakistani curry. Expat favorite." },
    ],
    budget: {
      backpacker: { daily: "$60-90", hotel: "Hostel $25-40", food: "Street food $5-10", transport: "Metro $2-5" },
      midrange: { daily: "$150-250", hotel: "3-star $80-150", food: "Restaurant $20-40", transport: "Taxi $10-20" },
      luxury: { daily: "$500+", hotel: "5-star $300+", food: "Fine dining $80+", transport: "Private car $50+" },
    },
    israeliTips: [
      "Direct flights from TLV to DXB — 3.5 hours",
      "Kosher restaurants available in several hotels",
      "Hebrew-speaking guides available on request",
      "Shabbat services at the Jewish community center",
      "Israel-UAE peace deal (Abraham Accords) — Israelis very welcome",
    ],
    halal: true,
    kosher: true,
  },
  kyoto: {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    flag: "🇯🇵",
    heroImage: require("@/assets/destinations/kyoto.jpg"),
    tagline: "Ancient temples, eternal beauty",
    stats: { temp: "16°C", currency: "JPY", language: "Japanese", timezone: "GMT+9" },
    overview: "Japan's ancient capital, home to over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage Sites. Kyoto is where Japanese tradition is most alive.",
    regions: [
      { name: "Higashiyama", type: "Cultural", desc: "Kiyomizudera, Gion district, traditional machiya townhouses.", icon: "⛩️", highlight: "Kiyomizudera at dawn" },
      { name: "Arashiyama", type: "Nature", desc: "Bamboo grove, Tenryuji garden, monkey park. Serene and beautiful.", icon: "🎋", highlight: "Bamboo grove at sunrise" },
      { name: "Downtown Kyoto", type: "Urban", desc: "Nishiki Market, Pontocho alley, modern shopping.", icon: "🏮", highlight: "Pontocho at night" },
      { name: "Fushimi", type: "Spiritual", desc: "Fushimi Inari — thousands of torii gates winding up the mountain.", icon: "🦊", highlight: "Inari gates at 5am" },
    ],
    culture: [
      { title: "Bowing", desc: "A slight bow is a respectful greeting. Deeper bow = more respect.", icon: "🙇" },
      { title: "Shoes Off", desc: "Remove shoes when entering homes, temples, and traditional restaurants.", icon: "👟" },
      { title: "Quiet Spaces", desc: "Speak softly in temples and on public transport.", icon: "🤫" },
      { title: "Cash Culture", desc: "Many places are cash-only. Always carry yen.", icon: "💴" },
    ],
    food: [
      { name: "Nishiki Market", type: "Street Food", price: "$", area: "Downtown", desc: "Kyoto's 'Kitchen'. 100+ stalls of local specialties." },
      { name: "Kikunoi", type: "Fine Dining", price: "$$$$", area: "Higashiyama", desc: "3 Michelin stars. Traditional kaiseki cuisine." },
      { name: "Ippudo Ramen", type: "Casual", price: "$", area: "Downtown", desc: "Legendary tonkotsu ramen. Always a queue." },
      { name: "Tofu Kaiseki", type: "Vegetarian", price: "$$", area: "Arashiyama", desc: "Buddhist temple cuisine. Peaceful setting." },
    ],
    budget: {
      backpacker: { daily: "$50-80", hotel: "Hostel $20-35", food: "Convenience store $5-8", transport: "Bus $2-4" },
      midrange: { daily: "$120-200", hotel: "Ryokan $80-150", food: "Restaurant $15-30", transport: "Taxi $8-15" },
      luxury: { daily: "$400+", hotel: "Luxury ryokan $250+", food: "Kaiseki $100+", transport: "Private car $40+" },
    },
    israeliTips: [
      "Flights via Tokyo — 12-14 hours total",
      "Very few kosher options — bring snacks",
      "Google Translate camera works great for menus",
      "Pocket WiFi essential — rent at airport",
      "Israelis very welcome — Japan loves tourists",
    ],
    halal: false,
    kosher: false,
  },
  barcelona: {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    flag: "🇪🇸",
    heroImage: require("@/assets/destinations/barcelona.jpg"),
    tagline: "Gaudí, tapas, and eternal sunshine",
    stats: { temp: "21°C", currency: "EUR", language: "Catalan/Spanish", timezone: "GMT+1" },
    overview: "Barcelona is a city that seduces every sense — Gaudí's surreal architecture, world-class food, electric nightlife, and beaches that stretch for miles.",
    regions: [
      { name: "Gothic Quarter", type: "Cultural", desc: "Medieval streets, Barcelona Cathedral, Picasso Museum.", icon: "🏛️", highlight: "Gothic Quarter at night" },
      { name: "Eixample", type: "Urban", desc: "Sagrada Família, Casa Batlló, upscale dining and shopping.", icon: "🏗️", highlight: "Sagrada Família at sunrise" },
      { name: "Barceloneta", type: "Coastal", desc: "City beach, seafood restaurants, beach bars.", icon: "🏖️", highlight: "Sunset from the beach" },
      { name: "Gràcia", type: "Local", desc: "Bohemian neighborhood, local bars, Park Güell.", icon: "🌺", highlight: "Park Güell terraces" },
    ],
    culture: [
      { title: "Siesta Culture", desc: "Many shops close 2-5pm. Lunch is the main meal, often 2-4pm.", icon: "😴" },
      { title: "Late Dining", desc: "Dinner starts at 9-10pm. Restaurants empty before 9pm.", icon: "🍽️" },
      { title: "Catalan Pride", desc: "Say 'Gràcies' (Catalan) not just 'Gracias'. Locals appreciate it.", icon: "🏴" },
      { title: "Pickpockets", desc: "Las Ramblas is notorious. Use money belt, keep bags in front.", icon: "👜" },
    ],
    food: [
      { name: "La Boqueria", type: "Market", price: "$", area: "Las Ramblas", desc: "Iconic covered market. Fresh produce, jamón, seafood." },
      { name: "Bar del Pla", type: "Tapas", price: "$$", area: "Gothic Quarter", desc: "Best patatas bravas in the city." },
      { name: "Tickets", type: "Fine Dining", price: "$$$", area: "Eixample", desc: "Albert Adrià's tapas bar. Book 2 months ahead." },
      { name: "La Cova Fumada", type: "Local", price: "$$", area: "Barceloneta", desc: "Invented the bombas. Cash only, no reservations." },
    ],
    budget: {
      backpacker: { daily: "$50-80", hotel: "Hostel $20-35", food: "Tapas $8-15", transport: "Metro $2" },
      midrange: { daily: "$120-180", hotel: "Hotel $70-120", food: "Restaurant $20-35", transport: "Taxi $8-15" },
      luxury: { daily: "$350+", hotel: "Boutique hotel $200+", food: "Fine dining $70+", transport: "Private car $40+" },
    },
    israeliTips: [
      "Direct flights from TLV — 4 hours",
      "Kosher restaurants in Eixample neighborhood",
      "Many Israeli tourists — Hebrew widely understood",
      "Shabbat services at the synagogue on Avenir St",
      "Very safe for Israeli tourists",
    ],
    halal: true,
    kosher: true,
  },
};

// DestinationData interface defined above

const TABS = ["Overview", "Culture", "Food", "Budget", "Tips"];

export default function DestinationGuideScreen() {
  const params = useLocalSearchParams();
  const destId = (params.id as string) || "dubai";
  const dest = DESTINATIONS[destId] || DESTINATIONS.dubai;

  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleTab = (i: number) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(i);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Hero */}
      <View style={S.hero}>
        <Image source={dest.heroImage} style={S.heroImg} resizeMode="cover" />
        <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(13,6,40,0.95)"]} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <View style={S.backBtnInner}>
            <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <View style={S.heroContent}>
          <Text style={S.heroFlag}>{dest.flag}</Text>
          <Text style={S.heroName}>{dest.name}</Text>
          <Text style={S.heroCountry}>{dest.country}</Text>
          <Text style={S.heroTagline}>{dest.tagline}</Text>
          {/* Quick stats */}
          <View style={S.statsRow}>
            {[
              { icon: "🌡️", label: dest.stats.temp },
              { icon: "💱", label: dest.stats.currency },
              { icon: "🗣️", label: dest.stats.language },
              { icon: "🕐", label: dest.stats.timezone },
            ].map((s, i) => (
              <View key={i} style={S.statChip}>
                <Text style={S.statIcon}>{s.icon}</Text>
                <Text style={S.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={S.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.tabsRow}>
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
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={S.content}>
        {activeTab === 0 && <OverviewTab dest={dest} />}
        {activeTab === 1 && <CultureTab dest={dest} />}
        {activeTab === 2 && <FoodTab dest={dest} />}
        {activeTab === 3 && <BudgetTab dest={dest} />}
        {activeTab === 4 && <TipsTab dest={dest} />}
      </ScrollView>

      {/* CTA */}
      <View style={S.ctaWrap}>
        <LinearGradient colors={["rgba(13,6,40,0)", "rgba(13,6,40,0.98)"]} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity
          style={S.ctaBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/(trip)/plan" as never);
          }}
          activeOpacity={0.88}
        >
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.ctaGradient}>
            <Text style={S.ctaText}>Plan Trip to {dest.name}  →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OverviewTab({ dest }: { dest: DestinationData }) {
  return (
    <View style={T.wrap}>
      <Text style={T.bodyText}>{dest.overview}</Text>
      <Text style={T.sectionTitle}>Regions & Areas</Text>
      {dest.regions.map((r: { name: string; type: string; desc: string; icon: string; highlight: string }, i: number) => (
        <View key={i} style={T.regionCard}>
          <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
          <View style={T.regionTop}>
            <Text style={T.regionIcon}>{r.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={T.regionName}>{r.name}</Text>
              <View style={T.regionTypeBadge}>
                <Text style={T.regionTypeText}>{r.type}</Text>
              </View>
            </View>
          </View>
          <Text style={T.regionDesc}>{r.desc}</Text>
          <View style={T.highlightRow}>
            <Text style={T.highlightIcon}>⭐</Text>
            <Text style={T.highlightText}>{r.highlight}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function CultureTab({ dest }: { dest: DestinationData }) {
  return (
    <View style={T.wrap}>
      <Text style={T.sectionTitle}>Cultural Guidelines</Text>
      {dest.culture.map((c: { title: string; desc: string; icon: string }, i: number) => (
        <View key={i} style={T.cultureCard}>
          <Text style={T.cultureIcon}>{c.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={T.cultureName}>{c.title}</Text>
            <Text style={T.cultureDesc}>{c.desc}</Text>
          </View>
        </View>
      ))}
      {(dest.halal || dest.kosher) && (
        <View style={T.dietRow}>
          {dest.halal && (
            <View style={[T.dietBadge, { borderColor: "#22C55E44", backgroundColor: "#22C55E11" }]}>
              <Text style={[T.dietText, { color: "#22C55E" }]}>🥩 Halal Available</Text>
            </View>
          )}
          {dest.kosher && (
            <View style={[T.dietBadge, { borderColor: "#6443F444", backgroundColor: "#6443F411" }]}>
              <Text style={[T.dietText, { color: "#C084FC" }]}>✡️ Kosher Available</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

function FoodTab({ dest }: { dest: DestinationData }) {
  return (
    <View style={T.wrap}>
      <Text style={T.sectionTitle}>Where to Eat</Text>
      {dest.food.map((f: { name: string; type: string; price: string; area: string; desc: string }, i: number) => (
        <View key={i} style={T.foodCard}>
          <View style={T.foodTop}>
            <Text style={T.foodName}>{f.name}</Text>
            <Text style={T.foodPrice}>{f.price}</Text>
          </View>
          <View style={T.foodMeta}>
            <Text style={T.foodType}>{f.type}</Text>
            <Text style={T.foodArea}>📍 {f.area}</Text>
          </View>
          <Text style={T.foodDesc}>{f.desc}</Text>
        </View>
      ))}
    </View>
  );
}

function BudgetTab({ dest }: { dest: DestinationData }) {
  const tiers = [
    { key: "backpacker", label: "Backpacker", icon: "🎒", color: "#22C55E", data: dest.budget.backpacker },
    { key: "midrange", label: "Mid-Range", icon: "🏨", color: "#6443F4", data: dest.budget.midrange },
    { key: "luxury", label: "Luxury", icon: "💎", color: "#FFD700", data: dest.budget.luxury },
  ];
  return (
    <View style={T.wrap}>
      <Text style={T.sectionTitle}>Budget Guide</Text>
      {tiers.map((tier) => (
        <View key={tier.key} style={[T.budgetCard, { borderColor: tier.color + "33" }]}>
          <LinearGradient colors={[tier.color + "18", tier.color + "08"]} style={StyleSheet.absoluteFillObject} />
          <View style={T.budgetHeader}>
            <Text style={T.budgetIcon}>{tier.icon}</Text>
            <Text style={[T.budgetLabel, { color: tier.color }]}>{tier.label}</Text>
            <Text style={[T.budgetDaily, { color: tier.color }]}>{tier.data.daily}/day</Text>
          </View>
          {[
            { label: "Hotel", value: tier.data.hotel },
            { label: "Food", value: tier.data.food },
            { label: "Transport", value: tier.data.transport },
          ].map((row) => (
            <View key={row.label} style={T.budgetRow}>
              <Text style={T.budgetRowLabel}>{row.label}</Text>
              <Text style={T.budgetRowValue}>{row.value}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function TipsTab({ dest }: { dest: DestinationData }) {
  return (
    <View style={T.wrap}>
      <Text style={T.sectionTitle}>Tips for Israeli Travelers</Text>
      <View style={T.tipsCard}>
        <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
        {dest.israeliTips.map((tip: string, i: number) => (
          <View key={i} style={T.tipRow}>
            <View style={T.tipNum}>
              <Text style={T.tipNumText}>{i + 1}</Text>
            </View>
            <Text style={T.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const T = StyleSheet.create({
  wrap: { gap: 12 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginTop: 4, marginBottom: 4, fontFamily: "Chillax-Bold" },
  bodyText: { color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 22, fontFamily: "Satoshi-Regular" },

  regionCard: { borderRadius: 16, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", gap: 8 },
  regionTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  regionIcon: { fontSize: 24 },
  regionName: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  regionTypeBadge: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, alignSelf: "flex-start", marginTop: 2 },
  regionTypeText: { color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: "600" },
  regionDesc: { color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 19, fontFamily: "Satoshi-Regular" },
  highlightRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  highlightIcon: { fontSize: 12 },
  highlightText: { color: "#FFD700", fontSize: 12, fontWeight: "600" },

  cultureCard: { flexDirection: "row", gap: 12, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  cultureIcon: { fontSize: 26 },
  cultureName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", marginBottom: 3, fontFamily: "Chillax-Semibold" },
  cultureDesc: { color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 18, fontFamily: "Satoshi-Regular" },
  dietRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  dietBadge: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  dietText: { fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Medium" },

  foodCard: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)", gap: 4 },
  foodTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  foodName: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  foodPrice: { color: "#FFD700", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  foodMeta: { flexDirection: "row", gap: 10 },
  foodType: { color: "#C084FC", fontSize: 12, fontWeight: "600" },
  foodArea: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  foodDesc: { color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 18, fontFamily: "Satoshi-Regular" },

  budgetCard: { borderRadius: 16, overflow: "hidden", padding: 14, borderWidth: 1, gap: 8 },
  budgetHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  budgetIcon: { fontSize: 20 },
  budgetLabel: { fontSize: 15, fontWeight: "800", flex: 1, fontFamily: "Chillax-Bold" },
  budgetDaily: { fontSize: 14, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  budgetRow: { flexDirection: "row", justifyContent: "space-between" },
  budgetRowLabel: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  budgetRowValue: { color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },

  tipsCard: { borderRadius: 16, overflow: "hidden", padding: 16, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", gap: 10 },
  tipRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  tipNum: { width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(100,67,244,0.4)", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 },
  tipNumText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800", fontFamily: "Chillax-Bold" },
  tipText: { color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 19, flex: 1, fontFamily: "Satoshi-Regular" },
});

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  hero: { height: 280, justifyContent: "flex-end" },
  heroImg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  backBtn: { position: "absolute", top: 52, left: 16, zIndex: 10 },
  backBtnInner: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  heroContent: { padding: 16, gap: 4 },
  heroFlag: { fontSize: 28 },
  heroName: { color: "#FFFFFF", fontSize: 34, fontWeight: "900", lineHeight: 38, fontFamily: "Chillax-Bold" },
  heroCountry: { color: "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  heroTagline: { color: "rgba(255,255,255,0.45)", fontSize: 13, fontStyle: "italic", marginBottom: 8, fontFamily: "Satoshi-Regular" },
  statsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  statChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  statIcon: { fontSize: 12 },
  statLabel: { color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: "600" },

  tabsContainer: { backgroundColor: "rgba(13,6,40,0.95)", borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.06)" },
  tabsRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  tab: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 16, paddingVertical: 7, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  tabActive: { borderColor: "transparent" },
  tabText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },

  content: { padding: 16, paddingBottom: 100, gap: 16 },

  ctaWrap: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 32 },
  ctaBtn: { borderRadius: 18, overflow: "hidden" },
  ctaGradient: { alignItems: "center", justifyContent: "center", paddingVertical: 16 },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
