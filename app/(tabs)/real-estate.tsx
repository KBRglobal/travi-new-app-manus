import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Image, Platform, FlatList
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

type City = "Dubai" | "Abu Dhabi";

interface Property {
  id: string;
  name: string;
  developer: string;
  location: string;
  price: string;
  roi: string;
  type: "Apartment" | "Villa" | "Studio" | "Penthouse";
  bedrooms: number;
  area: string;
  completion: string;
  image: number;
  badge?: string;
  badgeColor?: string;
}

const PROPERTIES: Record<City, Property[]> = {
  Dubai: [
    {
      id: "d1", name: "Burj Crown", developer: "Emaar", location: "Downtown Dubai",
      price: "AED 1.8M", roi: "7.2%", type: "Apartment", bedrooms: 2, area: "1,100 sqft",
      completion: "Q4 2026", image: require("@/assets/destinations/dubai.jpg"),
      badge: "Hot Deal", badgeColor: "#EF4444",
    },
    {
      id: "d2", name: "DAMAC Lagoons", developer: "DAMAC", location: "Dubailand",
      price: "AED 2.4M", roi: "8.1%", type: "Villa", bedrooms: 4, area: "2,800 sqft",
      completion: "Q2 2027", image: require("@/assets/destinations/maldives.jpg"),
      badge: "High ROI", badgeColor: "#22C55E",
    },
    {
      id: "d3", name: "Meraas Bluewaters", developer: "Meraas", location: "Bluewaters Island",
      price: "AED 3.2M", roi: "6.8%", type: "Penthouse", bedrooms: 3, area: "2,100 sqft",
      completion: "Ready", image: require("@/assets/destinations/santorini.jpg"),
      badge: "Ready Now", badgeColor: "#6443F4",
    },
    {
      id: "d4", name: "Creek Harbour Studio", developer: "Emaar", location: "Dubai Creek Harbour",
      price: "AED 850K", roi: "9.3%", type: "Studio", bedrooms: 0, area: "520 sqft",
      completion: "Q1 2027", image: require("@/assets/destinations/tokyo.jpg"),
      badge: "Best Value", badgeColor: "#F59E0B",
    },
    {
      id: "d5", name: "Marina Gate", developer: "Select Group", location: "Dubai Marina",
      price: "AED 1.5M", roi: "7.8%", type: "Apartment", bedrooms: 1, area: "780 sqft",
      completion: "Q3 2026", image: require("@/assets/destinations/barcelona.jpg"),
    },
  ],
  "Abu Dhabi": [
    {
      id: "a1", name: "Saadiyat Lagoons", developer: "Aldar", location: "Saadiyat Island",
      price: "AED 2.1M", roi: "6.5%", type: "Villa", bedrooms: 3, area: "2,400 sqft",
      completion: "Q2 2027", image: require("@/assets/destinations/bali.jpg"),
      badge: "Premium", badgeColor: "#FFD700",
    },
    {
      id: "a2", name: "Yas Acres", developer: "Aldar", location: "Yas Island",
      price: "AED 1.9M", roi: "7.1%", type: "Villa", bedrooms: 4, area: "2,600 sqft",
      completion: "Ready", image: require("@/assets/destinations/kyoto.jpg"),
      badge: "Ready Now", badgeColor: "#6443F4",
    },
    {
      id: "a3", name: "Reem Hills", developer: "Q Properties", location: "Al Reem Island",
      price: "AED 1.2M", roi: "8.4%", type: "Apartment", bedrooms: 2, area: "1,050 sqft",
      completion: "Q4 2026", image: require("@/assets/destinations/amsterdam.jpg"),
      badge: "High ROI", badgeColor: "#22C55E",
    },
  ],
};

const MARKET_INSIGHTS: Record<City, { label: string; value: string; trend: string; up: boolean }[]> = {
  Dubai: [
    { label: "Avg. ROI", value: "7.8%", trend: "+0.4%", up: true },
    { label: "Avg. Price/sqft", value: "AED 1,450", trend: "+12%", up: true },
    { label: "Transactions Q1", value: "14,200", trend: "+18%", up: true },
    { label: "Rental Yield", value: "6.2%", trend: "+0.2%", up: true },
  ],
  "Abu Dhabi": [
    { label: "Avg. ROI", value: "7.1%", trend: "+0.6%", up: true },
    { label: "Avg. Price/sqft", value: "AED 1,180", trend: "+9%", up: true },
    { label: "Transactions Q1", value: "5,400", trend: "+22%", up: true },
    { label: "Rental Yield", value: "5.8%", trend: "+0.3%", up: true },
  ],
};

const DEVELOPERS = ["All", "Emaar", "DAMAC", "Meraas", "Aldar", "Select Group"];
const TYPES = ["All", "Apartment", "Villa", "Studio", "Penthouse"];

export default function RealEstateScreen() {
  const [city, setCity] = useState<City>("Dubai");
  const [devFilter, setDevFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const insights = MARKET_INSIGHTS[city];
  const allProps = PROPERTIES[city];
  const filtered = allProps.filter((p) => {
    if (devFilter !== "All" && p.developer !== devFilter) return false;
    if (typeFilter !== "All" && p.type !== typeFilter) return false;
    return true;
  });

  if (selectedProperty) {
    return <PropertyDetailScreen property={selectedProperty} onBack={() => setSelectedProperty(null)} />;
  }

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.8}>
          <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={S.headerTitle}>UAE Real Estate</Text>
          <Text style={S.headerSub}>Invest in the world's fastest-growing market</Text>
        </View>
        <View style={S.headerBadge}>
          <Text style={S.headerBadgeText}>🏆 #1</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.content}>
        {/* City Toggle */}
        <View style={S.cityToggle}>
          {(["Dubai", "Abu Dhabi"] as City[]).map((c) => (
            <TouchableOpacity
              key={c}
              style={[S.cityBtn, city === c && S.cityBtnActive]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setCity(c);
              }}
              activeOpacity={0.8}
            >
              {city === c && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
              <Text style={[S.cityBtnText, city === c && S.cityBtnTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Market Insights */}
        <View style={S.insightsSection}>
          <Text style={S.sectionTitle}>Market Insights</Text>
          <View style={S.insightsGrid}>
            {insights.map((ins, i) => (
              <View key={i} style={S.insightCard}>
                <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
                <Text style={S.insightValue}>{ins.value}</Text>
                <Text style={S.insightLabel}>{ins.label}</Text>
                <Text style={[S.insightTrend, { color: ins.up ? "#22C55E" : "#EF4444" }]}>
                  {ins.up ? "↑" : "↓"} {ins.trend}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Filters */}
        <View style={S.filtersSection}>
          <Text style={S.filterLabel}>Developer</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
            {DEVELOPERS.map((d) => (
              <TouchableOpacity
                key={d}
                style={[S.filterChip, devFilter === d && S.filterChipActive]}
                onPress={() => setDevFilter(d)}
                activeOpacity={0.8}
              >
                {devFilter === d && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
                <Text style={[S.filterChipText, devFilter === d && S.filterChipTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={[S.filterLabel, { marginTop: 8 }]}>Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
            {TYPES.map((t) => (
              <TouchableOpacity
                key={t}
                style={[S.filterChip, typeFilter === t && S.filterChipActive]}
                onPress={() => setTypeFilter(t)}
                activeOpacity={0.8}
              >
                {typeFilter === t && <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />}
                <Text style={[S.filterChipText, typeFilter === t && S.filterChipTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Property listings */}
        <View style={S.listingsSection}>
          <View style={S.listingsHeader}>
            <Text style={S.sectionTitle}>Properties</Text>
            <Text style={S.listingsCount}>{filtered.length} found</Text>
          </View>
          {filtered.map((prop) => (
            <TouchableOpacity
              key={prop.id}
              style={S.propCard}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("/(tabs)/property-detail" as never);
              }}
              activeOpacity={0.88}
            >
              <View style={S.propImageWrap}>
                <Image source={prop.image} style={S.propImage} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.6)"]} style={StyleSheet.absoluteFillObject} />
                {prop.badge && (
                  <View style={[S.propBadge, { backgroundColor: prop.badgeColor }]}>
                    <Text style={S.propBadgeText}>{prop.badge}</Text>
                  </View>
                )}
                <View style={S.propRoiBadge}>
                  <Text style={S.propRoiText}>ROI {prop.roi}</Text>
                </View>
              </View>
              <View style={S.propBody}>
                <View style={S.propTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={S.propName}>{prop.name}</Text>
                    <Text style={S.propDev}>{prop.developer} · {prop.location}</Text>
                  </View>
                  <Text style={S.propPrice}>{prop.price}</Text>
                </View>
                <View style={S.propMeta}>
                  <View style={S.propMetaItem}>
                    <Text style={S.propMetaIcon}>🏠</Text>
                    <Text style={S.propMetaText}>{prop.type}</Text>
                  </View>
                  {prop.bedrooms > 0 && (
                    <View style={S.propMetaItem}>
                      <Text style={S.propMetaIcon}>🛏️</Text>
                      <Text style={S.propMetaText}>{prop.bedrooms} BR</Text>
                    </View>
                  )}
                  <View style={S.propMetaItem}>
                    <Text style={S.propMetaIcon}>📐</Text>
                    <Text style={S.propMetaText}>{prop.area}</Text>
                  </View>
                  <View style={S.propMetaItem}>
                    <Text style={S.propMetaIcon}>📅</Text>
                    <Text style={S.propMetaText}>{prop.completion}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick links to deep-dive screens */}
        <View style={S.quickLinksRow}>
          <TouchableOpacity style={S.quickLinkCard} onPress={() => router.push("/(tabs)/real-estate-analysis" as never)} activeOpacity={0.85}>
            <Text style={S.quickLinkEmoji}>📊</Text>
            <Text style={S.quickLinkLabel}>{"Market\nAnalysis"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={S.quickLinkCard} onPress={() => router.push("/(tabs)/real-estate-contacts" as never)} activeOpacity={0.85}>
            <Text style={S.quickLinkEmoji}>🤝</Text>
            <Text style={S.quickLinkLabel}>{"Expert\nContacts"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={S.quickLinkCard} onPress={() => router.push("/(tabs)/real-estate-guide" as never)} activeOpacity={0.85}>
            <Text style={S.quickLinkEmoji}>📚</Text>
            <Text style={S.quickLinkLabel}>{"Investor\nGuide"}</Text>
          </TouchableOpacity>
        </View>
        {/* CTA */}
        <TouchableOpacity style={S.consultBtn} activeOpacity={0.88}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.consultGradient}>
            <IconSymbol name="phone.fill" size={18} color="#FFFFFF" />
            <Text style={S.consultText}>Schedule Free Consultation</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function PropertyDetailScreen({ property, onBack }: { property: Property; onBack: () => void }) {
  const [roiYears, setRoiYears] = useState(5);
  const priceNum = parseFloat(property.price.replace(/[^0-9.]/g, "")) * 1000;
  const roiPct = parseFloat(property.roi) / 100;
  const annualRent = priceNum * roiPct;
  const totalReturn = annualRent * roiYears;

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.detailHero}>
        <Image source={property.image} style={S.detailHeroImg} resizeMode="cover" />
        <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(13,6,40,0.95)"]} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity style={S.backBtn} onPress={onBack} activeOpacity={0.8}>
          <View style={S.backBtnInner}>
            <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <View style={S.detailHeroContent}>
          <Text style={S.detailName}>{property.name}</Text>
          <Text style={S.detailDev}>{property.developer} · {property.location}</Text>
          <Text style={S.detailPrice}>{property.price}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.detailContent}>
        {/* Specs */}
        <View style={S.specsGrid}>
          {[
            { icon: "🏠", label: "Type", value: property.type },
            { icon: "🛏️", label: "Bedrooms", value: property.bedrooms > 0 ? `${property.bedrooms} BR` : "Studio" },
            { icon: "📐", label: "Area", value: property.area },
            { icon: "📅", label: "Completion", value: property.completion },
          ].map((spec, i) => (
            <View key={i} style={S.specCard}>
              <Text style={S.specIcon}>{spec.icon}</Text>
              <Text style={S.specValue}>{spec.value}</Text>
              <Text style={S.specLabel}>{spec.label}</Text>
            </View>
          ))}
        </View>

        {/* ROI Calculator */}
        <View style={S.roiCard}>
          <LinearGradient colors={["rgba(34,197,94,0.15)", "rgba(34,197,94,0.05)"]} style={StyleSheet.absoluteFillObject} />
          <Text style={S.roiTitle}>ROI Calculator</Text>
          <View style={S.roiRow}>
            <Text style={S.roiLabel}>Annual Rental Income</Text>
            <Text style={S.roiValue}>AED {Math.round(annualRent / 1000)}K</Text>
          </View>
          <View style={S.roiRow}>
            <Text style={S.roiLabel}>Annual Yield</Text>
            <Text style={[S.roiValue, { color: "#22C55E" }]}>{property.roi}</Text>
          </View>
          <View style={S.roiYearsRow}>
            {[3, 5, 10].map((y) => (
              <TouchableOpacity
                key={y}
                style={[S.roiYearBtn, roiYears === y && S.roiYearBtnActive]}
                onPress={() => setRoiYears(y)}
                activeOpacity={0.8}
              >
                <Text style={[S.roiYearText, roiYears === y && S.roiYearTextActive]}>{y}yr</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[S.roiRow, { marginTop: 4 }]}>
            <Text style={[S.roiLabel, { fontWeight: "700", color: "#FFFFFF" }]}>{roiYears}-Year Total Return</Text>
            <Text style={[S.roiValue, { color: "#22C55E", fontSize: 20 }]}>AED {Math.round(totalReturn / 1000)}K</Text>
          </View>
        </View>

        {/* Nearby */}
        <Text style={S.nearbyTitle}>Nearby Amenities</Text>
        <View style={S.nearbyRow}>
          {["🏫 School 0.8km", "🏥 Hospital 1.2km", "🛒 Mall 0.5km", "✈️ Airport 22km"].map((item, i) => (
            <View key={i} style={S.nearbyChip}>
              <Text style={S.nearbyText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* CTA buttons */}
        <View style={S.detailCtaRow}>
          <TouchableOpacity style={S.detailCtaSecondary} activeOpacity={0.8}>
            <Text style={S.detailCtaSecondaryText}>Request Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={S.detailCtaPrimary} activeOpacity={0.88}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={S.detailCtaPrimaryText}>Schedule Visit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 56, paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: { position: "absolute", top: 52, left: 16, zIndex: 10 },
  backBtnInner: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 1 },
  headerBadge: { backgroundColor: "rgba(255,215,0,0.15)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(255,215,0,0.3)" },
  headerBadgeText: { color: "#FFD700", fontSize: 12, fontWeight: "800" },
  content: { padding: 16, paddingBottom: 48, gap: 20 },

  cityToggle: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 4, gap: 4 },
  cityBtn: { flex: 1, borderRadius: 12, overflow: "hidden", paddingVertical: 10, alignItems: "center" },
  cityBtnActive: {},
  cityBtnText: { color: "rgba(255,255,255,0.45)", fontSize: 14, fontWeight: "700" },
  cityBtnTextActive: { color: "#FFFFFF" },

  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  insightsSection: { gap: 10 },
  insightsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  insightCard: { width: (width - 42) / 2, borderRadius: 14, overflow: "hidden", padding: 14, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", gap: 4 },
  insightValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  insightLabel: { color: "rgba(255,255,255,0.45)", fontSize: 12 },
  insightTrend: { fontSize: 12, fontWeight: "700" },

  filtersSection: { gap: 6 },
  filterLabel: { color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  filterChip: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  filterChipActive: { borderColor: "transparent" },
  filterChipText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "600" },
  filterChipTextActive: { color: "#FFFFFF" },

  listingsSection: { gap: 12 },
  listingsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  listingsCount: { color: "rgba(255,255,255,0.35)", fontSize: 13 },

  propCard: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  propImageWrap: { height: 180, position: "relative" },
  propImage: { width: "100%", height: "100%" },
  propBadge: { position: "absolute", top: 10, left: 10, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  propBadgeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  propRoiBadge: { position: "absolute", top: 10, right: 10, backgroundColor: "rgba(34,197,94,0.9)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  propRoiText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  propBody: { padding: 14, gap: 8 },
  propTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  propName: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  propDev: { color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 2 },
  propPrice: { color: "#FFD700", fontSize: 16, fontWeight: "900" },
  propMeta: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  propMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  propMetaIcon: { fontSize: 12 },
  propMetaText: { color: "rgba(255,255,255,0.55)", fontSize: 12 },

  consultBtn: { borderRadius: 18, overflow: "hidden" },
  consultGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 16 },
  consultText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  quickLinksRow: { flexDirection: "row", paddingHorizontal: 20, gap: 10, marginBottom: 16 },
  quickLinkCard: { flex: 1, borderRadius: 14, backgroundColor: "rgba(100,67,244,0.12)", borderWidth: 1, borderColor: "rgba(100,67,244,0.25)", paddingVertical: 14, alignItems: "center", gap: 6 },
  quickLinkEmoji: { fontSize: 24 },
  quickLinkLabel: { color: "#FFFFFF", fontSize: 11, fontWeight: "800", textAlign: "center", lineHeight: 16 },

  // Detail screen
  detailHero: { height: 280, justifyContent: "flex-end" },
  detailHeroImg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  detailHeroContent: { padding: 16, gap: 4 },
  detailName: { color: "#FFFFFF", fontSize: 28, fontWeight: "900" },
  detailDev: { color: "rgba(255,255,255,0.55)", fontSize: 14 },
  detailPrice: { color: "#FFD700", fontSize: 24, fontWeight: "900", marginTop: 4 },
  detailContent: { padding: 16, paddingBottom: 48, gap: 16 },

  specsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  specCard: { width: (width - 42) / 2, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 14, alignItems: "center", gap: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  specIcon: { fontSize: 22 },
  specValue: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  specLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11 },

  roiCard: { borderRadius: 18, overflow: "hidden", padding: 16, borderWidth: 1, borderColor: "rgba(34,197,94,0.25)", gap: 10 },
  roiTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", marginBottom: 4 },
  roiRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  roiLabel: { color: "rgba(255,255,255,0.55)", fontSize: 13 },
  roiValue: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  roiYearsRow: { flexDirection: "row", gap: 8 },
  roiYearBtn: { flex: 1, borderRadius: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", paddingVertical: 8, alignItems: "center" },
  roiYearBtnActive: { borderColor: "#22C55E", backgroundColor: "rgba(34,197,94,0.15)" },
  roiYearText: { color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: "700" },
  roiYearTextActive: { color: "#22C55E" },

  nearbyTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  nearbyRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  nearbyChip: { backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
  nearbyText: { color: "rgba(255,255,255,0.6)", fontSize: 12 },

  detailCtaRow: { flexDirection: "row", gap: 10 },
  detailCtaSecondary: { flex: 1, borderRadius: 14, borderWidth: 1, borderColor: "rgba(100,67,244,0.4)", paddingVertical: 14, alignItems: "center" },
  detailCtaSecondaryText: { color: "#C084FC", fontSize: 14, fontWeight: "700" },
  detailCtaPrimary: { flex: 1, borderRadius: 14, overflow: "hidden", paddingVertical: 14, alignItems: "center" },
  detailCtaPrimaryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
});
