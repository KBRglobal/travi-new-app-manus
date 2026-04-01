"use client";
import React, { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Platform, Dimensions, Animated
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Plan Data ────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "free",
    name: "Explorer",
    price: "Free",
    priceNum: 0,
    period: "forever",
    tagline: "Start your journey",
    gradient: ["#1A1A2E", "#16213E"] as [string, string],
    accentColor: "#9BA1A6",
    borderColor: "rgba(155,161,166,0.3)",
    badge: null,
    features: [
      { label: "3 trips per year", included: true },
      { label: "Basic AI trip planning", included: true },
      { label: "TRAVI Points (1x)", included: true },
      { label: "Community access", included: true },
      { label: "Price alerts (2 max)", included: true },
      { label: "Split bill basic", included: true },
      { label: "Priority support", included: false },
      { label: "Unlimited trips", included: false },
      { label: "Advanced AI (GPT-4)", included: false },
      { label: "Exclusive deals", included: false },
      { label: "Lounge access", included: false },
      { label: "Concierge service", included: false },
    ],
  },
  {
    id: "plus",
    name: "Adventurer",
    price: "$9.99",
    priceNum: 9.99,
    period: "/ month",
    tagline: "Most popular choice",
    gradient: ["#2D1B69", "#4A1E9E"] as [string, string],
    accentColor: "#6443F4",
    borderColor: "rgba(123,47,190,0.6)",
    badge: "MOST POPULAR",
    features: [
      { label: "Unlimited trips", included: true },
      { label: "Advanced AI trip planning", included: true },
      { label: "TRAVI Points (2x)", included: true },
      { label: "Community access", included: true },
      { label: "Unlimited price alerts", included: true },
      { label: "Full split bill + expenses", included: true },
      { label: "Priority support", included: true },
      { label: "Exclusive deals (up to 30%)", included: true },
      { label: "Advanced AI (GPT-4)", included: false },
      { label: "Lounge access", included: false },
      { label: "Concierge service", included: false },
      { label: "Travel insurance", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite Nomad",
    price: "$24.99",
    priceNum: 24.99,
    period: "/ month",
    tagline: "The ultimate experience",
    gradient: ["#1A0A00", "#3D1A00"] as [string, string],
    accentColor: "#FFD112",
    borderColor: "rgba(255,209,18,0.5)",
    badge: "BEST VALUE",
    features: [
      { label: "Everything in Adventurer", included: true },
      { label: "Advanced AI (GPT-4 Turbo)", included: true },
      { label: "TRAVI Points (5x)", included: true },
      { label: "Exclusive deals (up to 60%)", included: true },
      { label: "Airport lounge access", included: true },
      { label: "24/7 Concierge service", included: true },
      { label: "Travel insurance included", included: true },
      { label: "Priority flight changes", included: true },
      { label: "Private group trips", included: true },
      { label: "DNA-matched partners", included: true },
      { label: "Custom trip branding", included: true },
      { label: "Annual trip report", included: true },
    ],
  },
];

const PERKS = [
  { icon: "sparkles", label: "AI-Powered", sub: "Smart trip building", color: "#6443F4" },
  { icon: "star.fill", label: "5x Points", sub: "On Elite plan", color: "#FFD112" },
  { icon: "shield.fill", label: "Insurance", sub: "Travel coverage", color: "#02A65C" },
  { icon: "person.2.fill", label: "Matching", sub: "DNA-matched friends", color: "#F94498" },
];

export default function SubscriptionScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState("plus");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const scaleAnims = useRef(PLANS.map(() => new Animated.Value(1))).current;

  const handleSelect = (planId: string, index: number) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedPlan(planId);
    Animated.sequence([
      Animated.timing(scaleAnims[index], { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnims[index], { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const getPrice = (plan: typeof PLANS[0]) => {
    if (plan.priceNum === 0) return "Free";
    const price = billing === "annual" ? (plan.priceNum * 0.8).toFixed(2) : plan.priceNum.toFixed(2);
    return `$${price}`;
  };

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={[S.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.7}>
          <View style={S.backBtnInner}>
            <IconSymbol name="chevron.left" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>TRAVI Premium</Text>
          <Text style={S.headerSub}>Unlock your full potential</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        {/* Hero */}
        <View style={S.hero}>
          <LinearGradient colors={["rgba(123,47,190,0.2)", "rgba(233,30,140,0.1)", "transparent"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.heroIconWrap}>
            <LinearGradient colors={["#6443F4", "#F94498"]} style={S.heroIconGrad}>
              <IconSymbol name="crown.fill" size={32} color="#FFD112" />
            </LinearGradient>
          </View>
          <Text style={S.heroTitle}>Travel Without Limits</Text>
          <Text style={S.heroSub}>Join 2M+ travelers who upgraded their experience</Text>
        </View>

        {/* Perks row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.perksRow}>
          {PERKS.map((perk) => (
            <View key={perk.label} style={S.perkCard}>
              <LinearGradient colors={[perk.color + "22", perk.color + "11"]} style={StyleSheet.absoluteFillObject} />
              <View style={[S.perkIconWrap, { backgroundColor: perk.color + "22" }]}>
                <IconSymbol name={perk.icon as never} size={20} color={perk.color} />
              </View>
              <Text style={S.perkLabel}>{perk.label}</Text>
              <Text style={S.perkSub}>{perk.sub}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Billing toggle */}
        <View style={S.billingToggle}>
          <TouchableOpacity
            style={[S.billingBtn, billing === "monthly" && S.billingBtnActive]}
            onPress={() => { setBilling("monthly"); if (Platform.OS !== "web") Haptics.selectionAsync(); }}
            activeOpacity={0.8}
          >
            <Text style={[S.billingBtnText, billing === "monthly" && S.billingBtnTextActive]}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[S.billingBtn, billing === "annual" && S.billingBtnActive]}
            onPress={() => { setBilling("annual"); if (Platform.OS !== "web") Haptics.selectionAsync(); }}
            activeOpacity={0.8}
          >
            <Text style={[S.billingBtnText, billing === "annual" && S.billingBtnTextActive]}>Annual</Text>
            <View style={S.saveBadge}>
              <Text style={S.saveBadgeText}>Save 20%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Plan cards */}
        <View style={S.plansContainer}>
          {PLANS.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <Animated.View key={plan.id} style={[S.planCardWrap, { transform: [{ scale: scaleAnims[index] }] }]}>
                <TouchableOpacity
                  style={[S.planCard, { borderColor: isSelected ? plan.accentColor : plan.borderColor }]}
                  onPress={() => handleSelect(plan.id, index)}
                  activeOpacity={0.9}
                >
                  <LinearGradient colors={plan.gradient} style={StyleSheet.absoluteFillObject} />
                  {isSelected && (
                    <LinearGradient
                      colors={[plan.accentColor + "15", "transparent"]}
                      style={StyleSheet.absoluteFillObject}
                    />
                  )}

                  {/* Badge */}
                  {plan.badge && (
                    <View style={[S.planBadge, { backgroundColor: plan.accentColor }]}>
                      <Text style={S.planBadgeText}>{plan.badge}</Text>
                    </View>
                  )}

                  {/* Plan header */}
                  <View style={S.planHeader}>
                    <View style={S.planNameRow}>
                      <View style={[S.planDot, { backgroundColor: plan.accentColor }]} />
                      <Text style={[S.planName, { color: plan.accentColor }]}>{plan.name}</Text>
                    </View>
                    <View style={S.planPriceRow}>
                      <Text style={[S.planPrice, { color: plan.accentColor }]}>{getPrice(plan)}</Text>
                      {plan.priceNum > 0 && (
                        <Text style={S.planPeriod}>{plan.period}</Text>
                      )}
                    </View>
                    <Text style={S.planTagline}>{plan.tagline}</Text>
                  </View>

                  {/* Divider */}
                  <View style={[S.planDivider, { backgroundColor: plan.accentColor + "30" }]} />

                  {/* Features */}
                  <View style={S.planFeatures}>
                    {plan.features.map((feat) => (
                      <View key={feat.label} style={S.featRow}>
                        <View style={[S.featIcon, { backgroundColor: feat.included ? plan.accentColor + "20" : "rgba(255,255,255,0.05)" }]}>
                          <IconSymbol
                            name={feat.included ? "checkmark" : "xmark"}
                            size={10}
                            color={feat.included ? plan.accentColor : "rgba(255,255,255,0.25)"}
                          />
                        </View>
                        <Text style={[S.featLabel, !feat.included && S.featLabelDim]}>{feat.label}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Select button */}
                  <TouchableOpacity
                    style={[S.selectBtn, isSelected && { backgroundColor: plan.accentColor }]}
                    onPress={() => handleSelect(plan.id, index)}
                    activeOpacity={0.85}
                  >
                    {isSelected ? (
                      <LinearGradient
                        colors={plan.id === "elite" ? ["#FFD112", "#FF8C00"] : ["#6443F4", "#F94498"]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFillObject}
                      />
                    ) : null}
                    <Text style={[S.selectBtnText, isSelected && { color: plan.id === "elite" ? "#000" : "#FFF" }]}>
                      {isSelected ? (plan.priceNum === 0 ? "Current Plan" : "Get Started") : "Select Plan"}
                    </Text>
                    {isSelected && plan.priceNum > 0 && (
                      <IconSymbol name="arrow.right" size={16} color={plan.id === "elite" ? "#000" : "#FFF"} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Footer note */}
        <View style={S.footer}>
          <IconSymbol name="lock.fill" size={12} color="rgba(255,255,255,0.3)" />
          <Text style={S.footerText}>Secure payment · Cancel anytime · No hidden fees</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: W * 1.2, height: W * 1.2, borderRadius: W * 0.6, top: -W * 0.5, left: -W * 0.3, backgroundColor: "rgba(123,47,190,0.1)" },
  orb2: { position: "absolute", width: W * 0.8, height: W * 0.8, borderRadius: W * 0.4, bottom: 100, right: -W * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12 },
  backBtn: {},
  backBtnInner: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  headerCenter: { alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  hero: { alignItems: "center", paddingVertical: 24, paddingHorizontal: 24, gap: 10, overflow: "hidden" },
  heroIconWrap: { marginBottom: 4 },
  heroIconGrad: { width: 72, height: 72, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  heroTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "900", textAlign: "center", letterSpacing: -0.5 },
  heroSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", lineHeight: 20 },
  perksRow: { gap: 10, paddingHorizontal: 20, paddingVertical: 4 },
  perkCard: { width: 100, borderRadius: 16, padding: 14, gap: 6, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", overflow: "hidden", alignItems: "center" },
  perkIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  perkLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "700", textAlign: "center" },
  perkSub: { color: "rgba(255,255,255,0.4)", fontSize: 10, textAlign: "center" },
  billingToggle: { flexDirection: "row", marginHorizontal: 20, marginVertical: 16, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  billingBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 6 },
  billingBtnActive: { backgroundColor: "rgba(123,47,190,0.5)" },
  billingBtnText: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: "600" },
  billingBtnTextActive: { color: "#FFFFFF" },
  saveBadge: { backgroundColor: "#02A65C", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  saveBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
  plansContainer: { paddingHorizontal: 20, gap: 16 },
  planCardWrap: {},
  planCard: { borderRadius: 24, borderWidth: 1.5, overflow: "hidden", padding: 20 },
  planBadge: { position: "absolute", top: 16, right: 16, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  planBadgeText: { color: "#000", fontSize: 10, fontWeight: "900", letterSpacing: 0.5 },
  planHeader: { gap: 6, marginBottom: 16 },
  planNameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  planDot: { width: 8, height: 8, borderRadius: 4 },
  planName: { fontSize: 14, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  planPriceRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  planPrice: { fontSize: 36, fontWeight: "900", letterSpacing: -1 },
  planPeriod: { color: "rgba(255,255,255,0.4)", fontSize: 14 },
  planTagline: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  planDivider: { height: 1, marginBottom: 16 },
  planFeatures: { gap: 10, marginBottom: 20 },
  featRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featIcon: { width: 20, height: 20, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  featLabel: { color: "rgba(255,255,255,0.85)", fontSize: 13, flex: 1 },
  featLabelDim: { color: "rgba(255,255,255,0.3)" },
  selectBtn: { borderRadius: 14, paddingVertical: 14, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", overflow: "hidden" },
  selectBtnText: { color: "rgba(255,255,255,0.6)", fontSize: 15, fontWeight: "700" },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 20, paddingHorizontal: 20 },
  footerText: { color: "rgba(255,255,255,0.3)", fontSize: 12 },
});
