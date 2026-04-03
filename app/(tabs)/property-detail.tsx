/**
 * TRAVI — Property Detail Screen
 * Full immersive property view with gallery, specs, ROI calculator, and contact agent
 */
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const PROPERTY = {
  title: "Luxury 2BR in Downtown Dubai",
  address: "Burj Khalifa District, Downtown Dubai",
  price: "AED 2,850,000",
  pricePerSqft: "AED 2,200/sqft",
  size: "1,295 sqft",
  bedrooms: 2,
  bathrooms: 2,
  floor: 32,
  developer: "Emaar Properties",
  handover: "Q4 2026",
  paymentPlan: "60/40",
  roi: 7.2,
  annualRent: 165000,
  type: "Off-Plan",
  amenities: ["Infinity Pool", "Gym", "Concierge", "Valet", "Kids Club", "Spa", "Business Lounge", "Private Beach"],
  highlights: [
    { icon: "📍", label: "Location", value: "5 min walk to Dubai Mall" },
    { icon: "🏗️", label: "Developer", value: "Emaar — AAA rated" },
    { icon: "📅", label: "Handover", value: "Q4 2026" },
    { icon: "💳", label: "Payment Plan", value: "60/40" },
    { icon: "🏢", label: "Floor", value: "32 of 55 — High floor" },
    { icon: "👁️", label: "Views", value: "Burj Khalifa + Fountain" },
  ],
};

const SIMILAR = [
  { id: "s1", title: "1BR in DIFC", price: "AED 1,650,000", roi: 8.1 },
  { id: "s2", title: "3BR in Palm", price: "AED 5,200,000", roi: 6.4 },
];

export default function PropertyDetailScreen() {
  const insets = useSafeAreaInsets();
  const [investAmount, setInvestAmount] = useState("2850000");
  const [roiYears, setRoiYears] = useState(5);

  const inv = parseFloat(investAmount) || 2850000;
  const totalReturn = (PROPERTY.annualRent * roiYears) + (inv * Math.pow(1.05, roiYears) - inv);
  const netROI = (totalReturn / inv) * 100;

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <View style={S.header}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <Text style={S.backText}>←</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle} numberOfLines={1}>{PROPERTY.title}</Text>
        <TouchableOpacity style={S.saveBtn} activeOpacity={0.8}>
          <Text style={S.saveBtnText}>♡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Hero image */}
        <View style={S.gallery}>
          <Image source={require("@/assets/destinations/dubai.jpg")} style={S.galleryMain} resizeMode="cover" />
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.6)"]} style={S.galleryOverlay} />
          <View style={S.galleryBadges}>
            <View style={S.badge}><Text style={S.badgeText}>{PROPERTY.type}</Text></View>
            <View style={[S.badge, S.badgeGreen]}><Text style={S.badgeText}>ROI {PROPERTY.roi}%</Text></View>
          </View>
        </View>

        {/* Price */}
        <View style={S.priceRow}>
          <View>
            <Text style={S.price}>{PROPERTY.price}</Text>
            <Text style={S.pricePerSqft}>{PROPERTY.pricePerSqft} · {PROPERTY.size}</Text>
          </View>
          <View style={S.statsRow}>
            <View style={S.stat}><Text style={S.statVal}>{PROPERTY.bedrooms}</Text><Text style={S.statLbl}>Beds</Text></View>
            <View style={S.statDiv} />
            <View style={S.stat}><Text style={S.statVal}>{PROPERTY.bathrooms}</Text><Text style={S.statLbl}>Baths</Text></View>
            <View style={S.statDiv} />
            <View style={S.stat}><Text style={S.statVal}>{PROPERTY.size.split(" ")[0]}</Text><Text style={S.statLbl}>sqft</Text></View>
          </View>
        </View>

        {/* Address */}
        <View style={S.addressRow}>
          <Text style={S.addressEmoji}>📍</Text>
          <Text style={S.addressText}>{PROPERTY.address}</Text>
        </View>

        {/* Highlights */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Property Highlights</Text>
          <View style={S.highlightGrid}>
            {PROPERTY.highlights.map((h, i) => (
              <View key={i} style={S.highlightCard}>
                <Text style={S.highlightIcon}>{h.icon}</Text>
                <Text style={S.highlightLabel}>{h.label}</Text>
                <Text style={S.highlightValue}>{h.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Amenities */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Amenities</Text>
          <View style={S.amenityWrap}>
            {PROPERTY.amenities.map((a, i) => (
              <View key={i} style={S.amenityChip}>
                <Text style={S.amenityText}>{a}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ROI Calculator */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>ROI Calculator</Text>
          <View style={S.roiCard}>
            <LinearGradient colors={["rgba(100,67,244,0.12)", "rgba(34,197,94,0.06)"]} style={StyleSheet.absoluteFillObject} />
            <View style={S.roiInputRow}>
              <View style={S.roiField}>
                <Text style={S.roiFieldLabel}>Investment (AED)</Text>
                <TextInput
                  style={S.roiInput}
                  value={investAmount}
                  onChangeText={setInvestAmount}
                  keyboardType="numeric"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                />
              </View>
              <View style={S.roiField}>
                <Text style={S.roiFieldLabel}>Hold Period</Text>
                <View style={S.roiYearsRow}>
                  {[3, 5, 7, 10].map((y) => (
                    <TouchableOpacity key={y} style={[S.roiYearBtn, roiYears === y && S.roiYearBtnActive]} onPress={() => setRoiYears(y)} activeOpacity={0.8}>
                      <Text style={[S.roiYearText, roiYears === y && S.roiYearTextActive]}>{y}y</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            <View style={S.roiResults}>
              <View style={S.roiResult}>
                <Text style={S.roiResultVal}>AED {(PROPERTY.annualRent * roiYears / 1000).toFixed(0)}K</Text>
                <Text style={S.roiResultLbl}>Rental Income</Text>
              </View>
              <View style={S.roiResultDiv} />
              <View style={S.roiResult}>
                <Text style={S.roiResultVal}>AED {(inv * Math.pow(1.05, roiYears) / 1000000).toFixed(2)}M</Text>
                <Text style={S.roiResultLbl}>Projected Value</Text>
              </View>
              <View style={S.roiResultDiv} />
              <View style={S.roiResult}>
                <Text style={[S.roiResultVal, { color: "#22C55E" }]}>{netROI.toFixed(1)}%</Text>
                <Text style={S.roiResultLbl}>Total ROI</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Similar */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Similar Properties</Text>
          <View style={S.similarRow}>
            {SIMILAR.map((p) => (
              <TouchableOpacity key={p.id} style={S.similarCard} activeOpacity={0.88}>
                <Image source={require("@/assets/destinations/dubai.jpg")} style={S.similarImg} resizeMode="cover" />
                <View style={S.similarInfo}>
                  <Text style={S.similarTitle}>{p.title}</Text>
                  <Text style={S.similarPrice}>{p.price}</Text>
                  <Text style={S.similarRoi}>ROI {p.roi}%</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View style={S.ctaRow}>
          <TouchableOpacity style={S.ctaSecondary} activeOpacity={0.85}>
            <Text style={S.ctaSecondaryText}>Schedule Viewing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={S.ctaPrimary} activeOpacity={0.88}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.ctaGradient}>
              <Text style={S.ctaPrimaryText}>Contact Agent</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerTitle: { flex: 1, color: "#FFFFFF", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  saveBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  saveBtnText: { color: "#FFFFFF", fontSize: 18 },
  gallery: { height: 260, position: "relative" },
  galleryMain: { width: "100%", height: "100%" },
  galleryOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: 120 },
  galleryBadges: { position: "absolute", top: 12, left: 12, flexDirection: "row", gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: "rgba(100,67,244,0.8)" },
  badgeGreen: { backgroundColor: "rgba(34,197,94,0.8)" },
  badgeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800", fontFamily: "Chillax-Bold" },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16 },
  price: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", fontFamily: "Chillax-Bold" },
  pricePerSqft: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  statsRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  stat: { alignItems: "center", gap: 2 },
  statVal: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  statLbl: { color: "rgba(255,255,255,0.5)", fontSize: 10 },
  statDiv: { width: 1, height: 24, backgroundColor: "rgba(255,255,255,0.06)" },
  addressRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, marginBottom: 20 },
  addressEmoji: { fontSize: 14 },
  addressText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular" },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 },
  highlightGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  highlightCard: { width: (width - 50) / 2, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", padding: 12, gap: 4 },
  highlightIcon: { fontSize: 18 },
  highlightLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700" },
  highlightValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  amenityWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  amenityChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: "rgba(100,67,244,0.12)", borderWidth: 1, borderColor: "rgba(100,67,244,0.25)" },
  amenityText: { color: "#A78BFA", fontSize: 12, fontWeight: "700" },
  roiCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(100,67,244,0.2)", padding: 16, gap: 16 },
  roiInputRow: { flexDirection: "row", gap: 12 },
  roiField: { flex: 1, gap: 8 },
  roiFieldLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700" },
  roiInput: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", paddingHorizontal: 12, paddingVertical: 10, color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  roiYearsRow: { flexDirection: "row", gap: 6 },
  roiYearBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center" },
  roiYearBtnActive: { backgroundColor: "rgba(100,67,244,0.3)", borderWidth: 1, borderColor: "rgba(100,67,244,0.5)" },
  roiYearText: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  roiYearTextActive: { color: "#FFFFFF" },
  roiResults: { flexDirection: "row", alignItems: "center" },
  roiResult: { flex: 1, alignItems: "center", gap: 4 },
  roiResultVal: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", fontFamily: "Chillax-Bold" },
  roiResultLbl: { color: "rgba(255,255,255,0.5)", fontSize: 10, textAlign: "center" },
  roiResultDiv: { width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.06)" },
  similarRow: { flexDirection: "row", gap: 12 },
  similarCard: { flex: 1, borderRadius: 14, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  similarImg: { width: "100%", height: 90 },
  similarInfo: { padding: 10, gap: 2 },
  similarTitle: { color: "#FFFFFF", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  similarPrice: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
  similarRoi: { color: "#22C55E", fontSize: 11, fontWeight: "700" },
  ctaRow: { flexDirection: "row", gap: 12, paddingHorizontal: 20, marginTop: 8 },
  ctaSecondary: { flex: 1, borderRadius: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", paddingVertical: 16, alignItems: "center" },
  ctaSecondaryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  ctaPrimary: { flex: 1, borderRadius: 14, overflow: "hidden" },
  ctaGradient: { paddingVertical: 16, alignItems: "center" },
  ctaPrimaryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", fontFamily: "Chillax-Bold" },
});
