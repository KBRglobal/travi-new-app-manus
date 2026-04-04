// Screen 20 — Plan a Trip Entry
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const DS = { bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)", border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)", purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327", error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8", muted: "#A79FB2", placeholder: "#7B6A94" };

const TRIP_TYPES = [
  { label: "Beach & Relax", icon: "beach-access", color: DS.info },
  { label: "City Explorer", icon: "location-city", color: DS.purple },
  { label: "Adventure", icon: "terrain", color: DS.error },
  { label: "Culture & Art", icon: "museum", color: DS.warning },
  { label: "Food & Wine", icon: "restaurant", color: DS.pink },
  { label: "Nature", icon: "forest", color: DS.success },
];

export default function PlanScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [selectedType, setSelectedType] = useState("");

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <Pressable style={s.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={22} color={DS.white} />
        </Pressable>
        <Text style={s.title}>Plan a Trip</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {/* AI Suggestion banner */}
        <View style={s.aiBanner}>
          <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.aiBannerGrad}>
            <MaterialIcons name="auto-awesome" size={18} color={DS.purple} />
            <Text style={s.aiBannerText}>AI will personalize your trip based on your DNA</Text>
          </LinearGradient>
        </View>

        {/* Destination input */}
        <Text style={s.label}>Where to?</Text>
        <View style={s.inputWrap}>
          <MaterialIcons name="search" size={20} color={DS.placeholder} />
          <TextInput
            style={s.input}
            placeholder="City, country, or region..."
            placeholderTextColor={DS.placeholder}
            value={destination}
            onChangeText={setDestination}
            returnKeyType="done"
          />
        </View>

        {/* Trip type */}
        <Text style={[s.label, { marginTop: 24 }]}>What kind of trip?</Text>
        <View style={s.typesGrid}>
          {TRIP_TYPES.map(t => (
            <Pressable key={t.label} style={[s.typeCard, selectedType === t.label && { borderColor: t.color, backgroundColor: t.color + "18" }]} onPress={() => setSelectedType(t.label)}>
              <View style={[s.typeIcon, { backgroundColor: t.color + "22" }]}>
                <MaterialIcons name={t.icon as any} size={22} color={t.color} />
              </View>
              <Text style={[s.typeLabel, selectedType === t.label && { color: t.color }]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Surprise me */}
        <Pressable style={s.surpriseBtn} onPress={() => router.push("/(trip)/surprise" as any)}>
          <MaterialIcons name="auto-awesome" size={18} color={DS.pink} style={{ marginRight: 8 }} />
          <Text style={s.surpriseText}>Surprise Me with AI Pick</Text>
        </Pressable>

        {/* CTA */}
        <Pressable style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]} onPress={() => router.push("/(trip)/destination-select" as any)}>
          <LinearGradient colors={[DS.purple, DS.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.ctaGrad}>
            <Text style={s.ctaText}>Continue</Text>
            <MaterialIcons name="arrow-forward" size={18} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DS.bg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontFamily: "Chillax-Bold", color: DS.white },
  aiBanner: { marginBottom: 24, borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  aiBannerGrad: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  aiBannerText: { flex: 1, fontSize: 13, fontFamily: "Satoshi-Medium", color: DS.secondary },
  label: { fontSize: 16, fontFamily: "Chillax-Bold", color: DS.white, marginBottom: 10 },
  inputWrap: { flexDirection: "row", alignItems: "center", backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 14, paddingHorizontal: 14, height: 52, gap: 10 },
  input: { flex: 1, fontSize: 15, fontFamily: "Satoshi-Regular", color: DS.white },
  typesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  typeCard: { width: "30%", alignItems: "center", padding: 14, backgroundColor: DS.surface, borderWidth: 1, borderColor: DS.border, borderRadius: 16, gap: 8 },
  typeIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  typeLabel: { fontSize: 12, fontFamily: "Satoshi-Medium", color: DS.muted, textAlign: "center" },
  surpriseBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 48, borderRadius: 24, borderWidth: 1, borderColor: "rgba(249,68,152,0.3)", backgroundColor: "rgba(249,68,152,0.08)", marginBottom: 16 },
  surpriseText: { fontSize: 14, fontFamily: "Satoshi-Medium", color: DS.pink },
  ctaBtn: { height: 56, borderRadius: 28, overflow: "hidden", shadowColor: DS.pink, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  ctaGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  ctaText: { fontSize: 16, fontFamily: "Satoshi-Bold", color: DS.white },
});
