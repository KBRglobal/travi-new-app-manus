// Screen 12 — Explore Feed — REDESIGNED v2
import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Animated, Dimensions, Platform } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const { width: W, height: H } = Dimensions.get("window");
const HERO_H = Math.round(H * 0.50);
const CARD_W = (W - 48 - 10) / 2;
const CARD_H = Math.round(CARD_W * 1.3);

const C = {
  bg: "#0A0514", purple: "#6443F4", purpleLight: "#9B7BFF", pink: "#F94498",
  green: "#02A65C", greenLight: "#00D97E", gold: "#FFB800", white: "#FFFFFF",
  muted: "#A79FB2", placeholder: "#7B6A94",
  w06: "rgba(255,255,255,0.06)", w10: "rgba(255,255,255,0.10)",
  w40: "rgba(255,255,255,0.40)", w60: "rgba(255,255,255,0.60)",
};

const haptic = () => {
  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

const FILTERS = ["All", "Beach", "City", "Mountain", "Culture", "Adventure", "Food"];

type Destination = {
  id: string; name: string; country: string; match: number;
  img: string; tag: string; hook: string; dnaIcon: string; dnaLabel: string;
  badge?: "trending" | "pricedrop" | "newmatch"; visits: number;
};

const DESTINATIONS: Destination[] = [
  { id: "1", name: "Bali", country: "Indonesia", match: 96, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", tag: "Beach", hook: "Temples, rice terraces & yoga", dnaIcon: "museum", dnaLabel: "Culturalist", badge: "trending", visits: 84 },
  { id: "2", name: "Santorini", country: "Greece", match: 91, img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", tag: "City", hook: "Cliffside views & Aegean sunsets", dnaIcon: "wb-sunny", dnaLabel: "Relaxation", badge: "pricedrop", visits: 61 },
  { id: "3", name: "Kyoto", country: "Japan", match: 88, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", tag: "Culture", hook: "Ancient shrines & zen gardens", dnaIcon: "museum", dnaLabel: "Culturalist", visits: 47 },
  { id: "4", name: "Patagonia", country: "Argentina", match: 85, img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", tag: "Mountain", hook: "Raw wilderness & glacial peaks", dnaIcon: "terrain", dnaLabel: "Adventurer", badge: "newmatch", visits: 29 },
  { id: "5", name: "Tokyo", country: "Japan", match: 82, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", tag: "City", hook: "Neon streets & ramen culture", dnaIcon: "restaurant", dnaLabel: "Foodie", visits: 112 },
  { id: "6", name: "Maldives", country: "Maldives", match: 79, img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80", tag: "Beach", hook: "Overwater villas & crystal lagoons", dnaIcon: "pool", dnaLabel: "Relaxation", visits: 38 },
];

function matchColor(pct: number): [string, string] {
  if (pct >= 90) return [C.green, C.greenLight];
  if (pct >= 80) return [C.purple, C.purpleLight];
  return ["#FF9327", "#FFB347"];
}

function BadgePill({ badge }: { badge?: Destination["badge"] }) {
  if (!badge) return null;
  const cfg = {
    trending: { icon: "local-fire-department", label: "Trending", color: "#FF6B35" },
    pricedrop: { icon: "bolt", label: "Price Drop", color: C.gold },
    newmatch: { icon: "auto-awesome", label: "New Match", color: C.purpleLight },
  }[badge];
  return (
    <View style={[bs.pill, { backgroundColor: cfg.color + "22", borderColor: cfg.color + "55" }]}>
      <MaterialIcons name={cfg.icon as any} size={10} color={cfg.color} />
      <Text style={[bs.pillText, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}
const bs = StyleSheet.create({
  pill: { flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1 },
  pillText: { fontSize: 10, fontFamily: "Satoshi-Bold" },
});

function HeroCard({ dest, onPress }: { dest: Destination; onPress: () => void }) {
  const [c1, c2] = matchColor(dest.match);
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1.08, duration: 900, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
    ])).start();
  }, []);
  return (
    <Pressable onPress={() => { haptic(); onPress(); }} style={({ pressed }) => [hS.wrap, pressed && { transform: [{ scale: 0.98 }] }]}>
      <View style={hS.card}>
        <Image source={{ uri: dest.img }} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
        <LinearGradient colors={["rgba(10,5,20,0.05)", "rgba(10,5,20,0.4)", "rgba(10,5,20,0.97)"]} locations={[0, 0.45, 1]} style={StyleSheet.absoluteFill} />
        <View style={hS.topRow}>
          <BadgePill badge={dest.badge} />
          <View style={{ flex: 1 }} />
          <View style={hS.visitsBadge}>
            <MaterialIcons name="people" size={11} color={C.w60} />
            <Text style={hS.visitsText}>{dest.visits} TRAVIs</Text>
          </View>
        </View>
        <View style={hS.bottom}>
          <Animated.View style={[hS.matchWrap, { transform: [{ scale: pulse }] }]}>
            <LinearGradient colors={[c1, c2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={hS.matchGrad}>
              <Text style={hS.matchPct}>{dest.match}%</Text>
              <Text style={hS.matchLabel}>DNA MATCH</Text>
            </LinearGradient>
          </Animated.View>
          <Text style={hS.name}>{dest.name}</Text>
          <Text style={hS.country}>{dest.country}</Text>
          <View style={hS.dnaCard}>
            <View style={hS.dnaRow}>
              <MaterialIcons name="biotech" size={14} color={C.purpleLight} />
              <Text style={hS.dnaTitle}>Perfect for your <Text style={{ color: C.purpleLight }}>{dest.dnaLabel}</Text> soul</Text>
            </View>
            <View style={hS.divider} />
            <View style={hS.dnaRow}>
              <MaterialIcons name={dest.dnaIcon as any} size={13} color={C.w60} />
              <Text style={hS.dnaHook}>{dest.hook}</Text>
            </View>
            <View style={hS.loveRow}>
              {["Culture", "Food", "Wellness"].map((item) => (
                <View key={item} style={hS.lovePill}><Text style={hS.lovePillText}>{item}</Text></View>
              ))}
            </View>
          </View>
          <Pressable onPress={() => { haptic(); onPress(); }} style={({ pressed }) => [hS.ctaWrap, pressed && { opacity: 0.85 }]}>
            <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={hS.ctaGrad}>
              <MaterialIcons name="flight-takeoff" size={18} color={C.white} />
              <Text style={hS.ctaText}>Plan {dest.name} Trip</Text>
              <MaterialIcons name="arrow-forward" size={18} color={C.white} />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
const hS = StyleSheet.create({
  wrap: { marginHorizontal: 16, borderRadius: 24, overflow: "hidden" },
  card: { height: HERO_H, borderRadius: 24, overflow: "hidden" },
  topRow: { position: "absolute", top: 14, left: 14, right: 14, flexDirection: "row", alignItems: "center" },
  visitsBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(0,0,0,0.45)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  visitsText: { fontSize: 11, fontFamily: "Satoshi-Medium", color: C.w60 },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 16 },
  matchWrap: { alignSelf: "flex-start", marginBottom: 8, borderRadius: 12, overflow: "hidden" },
  matchGrad: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  matchPct: { fontSize: 20, fontFamily: "Chillax-Bold", color: C.white },
  matchLabel: { fontSize: 10, fontFamily: "Satoshi-Bold", color: "rgba(255,255,255,0.85)", letterSpacing: 1 },
  name: { fontSize: 28, fontFamily: "Chillax-Bold", color: C.white, lineHeight: 32 },
  country: { fontSize: 13, fontFamily: "Satoshi-Regular", color: C.w60, marginBottom: 10 },
  dnaCard: { backgroundColor: "rgba(10,5,20,0.75)", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)", borderRadius: 14, padding: 12, marginBottom: 12 },
  dnaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dnaTitle: { fontSize: 13, fontFamily: "Satoshi-Bold", color: C.white, flex: 1 },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.08)", marginVertical: 8 },
  dnaHook: { fontSize: 12, fontFamily: "Satoshi-Regular", color: C.w60, flex: 1 },
  loveRow: { flexDirection: "row", gap: 6, marginTop: 8, flexWrap: "wrap" },
  lovePill: { backgroundColor: "rgba(100,67,244,0.18)", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  lovePillText: { fontSize: 11, fontFamily: "Satoshi-Medium", color: C.purpleLight },
  ctaWrap: { borderRadius: 14, overflow: "hidden" },
  ctaGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 13, borderRadius: 14 },
  ctaText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: C.white, flex: 1, textAlign: "center" },
});

function GridCard({ dest, index, onPress }: { dest: Destination; index: number; onPress: () => void }) {
  const [c1, c2] = matchColor(dest.match);
  const anim = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 350, delay: index * 80, useNativeDriver: true }).start();
    if (index < 3) {
      Animated.loop(Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])).start();
    }
  }, []);
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });
  return (
    <Animated.View style={{ opacity: anim, transform: [{ translateY }] }}>
      <Pressable onPress={() => { haptic(); onPress(); }} style={({ pressed }) => [gS.card, pressed && { transform: [{ scale: 0.95 }], opacity: 0.9 }]}>
        <Image source={{ uri: dest.img }} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
        <LinearGradient colors={["rgba(10,5,20,0.0)", "rgba(10,5,20,0.5)", "rgba(10,5,20,0.95)"]} locations={[0.3, 0.6, 1]} style={StyleSheet.absoluteFill} />
        {dest.badge && <View style={gS.badgeWrap}><BadgePill badge={dest.badge} /></View>}
        <Animated.View style={[gS.matchWrap, { transform: [{ scale: pulse }] }]}>
          <LinearGradient colors={[c1, c2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={gS.matchGrad}>
            <Text style={gS.matchPct}>{dest.match}%</Text>
          </LinearGradient>
        </Animated.View>
        <View style={gS.bottom}>
          <Text style={gS.name}>{dest.name}</Text>
          <Text style={gS.country}>{dest.country}</Text>
          <View style={gS.dnaRow}>
            <MaterialIcons name={dest.dnaIcon as any} size={11} color={C.purpleLight} />
            <Text style={gS.dnaLabel}>{dest.dnaLabel}</Text>
          </View>
          <View style={gS.visitsRow}>
            <MaterialIcons name="people" size={10} color={C.w40} />
            <Text style={gS.visitsText}>{dest.visits} visits</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
const gS = StyleSheet.create({
  card: { width: CARD_W, height: CARD_H, borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "rgba(100,67,244,0.15)" },
  badgeWrap: { position: "absolute", top: 10, left: 10 },
  matchWrap: { position: "absolute", top: 10, right: 10, borderRadius: 10, overflow: "hidden" },
  matchGrad: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  matchPct: { fontSize: 14, fontFamily: "Chillax-Bold", color: C.white },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 12 },
  name: { fontSize: 16, fontFamily: "Chillax-Bold", color: C.white, lineHeight: 20 },
  country: { fontSize: 11, fontFamily: "Satoshi-Regular", color: C.w60, marginBottom: 4 },
  dnaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 3 },
  dnaLabel: { fontSize: 10, fontFamily: "Satoshi-Bold", color: C.purpleLight },
  visitsRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  visitsText: { fontSize: 10, fontFamily: "Satoshi-Regular", color: C.w40 },
});

function FilterTabs({ active, onSelect }: { active: string; onSelect: (f: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={fS.row}>
      {FILTERS.map((f) => {
        const isActive = f === active;
        return (
          <Pressable key={f} onPress={() => { haptic(); onSelect(f); }} style={({ pressed }) => [fS.chip, isActive && fS.chipActive, pressed && { opacity: 0.8 }]}>
            <Text style={[fS.chipText, isActive && fS.chipTextActive]}>{f}</Text>
            {isActive && <View style={fS.underline} />}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
const fS = StyleSheet.create({
  row: { paddingHorizontal: 16, gap: 8, paddingVertical: 4 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: C.w06, borderWidth: 1, borderColor: C.w10, position: "relative" },
  chipActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: C.purple },
  chipText: { fontSize: 13, fontFamily: "Satoshi-Medium", color: C.muted },
  chipTextActive: { color: C.white, fontFamily: "Satoshi-Bold", fontSize: 14 },
  underline: { position: "absolute", bottom: 0, left: 8, right: 8, height: 2, backgroundColor: C.pink, borderRadius: 1 },
});

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <View style={eS.wrap}>
      <Text style={eS.emoji}>🧬</Text>
      <Text style={eS.title}>No DNA matches here</Text>
      <Text style={eS.sub}>Try a different filter or explore all destinations</Text>
      <Pressable onPress={onReset} style={eS.btn}>
        <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={eS.btnGrad}>
          <Text style={eS.btnText}>Explore All</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}
const eS = StyleSheet.create({
  wrap: { alignItems: "center", paddingVertical: 60, paddingHorizontal: 32 },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 18, fontFamily: "Chillax-Bold", color: C.white, marginBottom: 8, textAlign: "center" },
  sub: { fontSize: 14, fontFamily: "Satoshi-Regular", color: C.muted, textAlign: "center", marginBottom: 24, lineHeight: 20 },
  btn: { borderRadius: 14, overflow: "hidden" },
  btnGrad: { paddingHorizontal: 28, paddingVertical: 12 },
  btnText: { fontSize: 15, fontFamily: "Satoshi-Bold", color: C.white },
});

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = DESTINATIONS.filter((d) =>
    (activeFilter === "All" || d.tag === activeFilter) &&
    (query === "" || d.name.toLowerCase().includes(query.toLowerCase()))
  );
  const hero = filtered[0];
  const rest = filtered.slice(1);
  const handleDestPress = useCallback((dest: Destination) => {
    router.push({ pathname: "/(tabs)/destination-guide", params: { id: dest.id } } as any);
  }, [router]);
  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <View style={s.searchRow}>
          <View style={s.searchBar}>
            <MaterialIcons name="search" size={18} color={C.placeholder} />
            <TextInput
              style={s.searchInput}
              placeholder="Where does your DNA want to go?"
              placeholderTextColor={C.placeholder}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery("")}>
                <MaterialIcons name="close" size={16} color={C.muted} />
              </Pressable>
            )}
          </View>
          <Pressable style={s.filterBtn} onPress={() => haptic()}>
            <MaterialIcons name="tune" size={20} color={C.purpleLight} />
          </Pressable>
        </View>
      </View>
      <View style={s.filtersWrap}>
        <FilterTabs active={activeFilter} onSelect={setActiveFilter} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setActiveFilter("All"); setQuery(""); }} />
        ) : (
          <>
            <View style={s.sectionHeader}>
              <Text style={s.sectionIcon}>🎯</Text>
              <Text style={s.sectionTitle}>Your Top Match</Text>
            </View>
            {hero && <HeroCard dest={hero} onPress={() => handleDestPress(hero)} />}
            {rest.length > 0 && (
              <>
                <View style={[s.sectionHeader, { marginTop: 28 }]}>
                  <Text style={s.sectionIcon}>✨</Text>
                  <Text style={s.sectionTitle}>More For You</Text>
                  <Text style={s.matchCount}>{filtered.length} matches</Text>
                </View>
                <View style={s.grid}>
                  {rest.map((dest, i) => (
                    <GridCard key={dest.id} dest={dest} index={i} onPress={() => handleDestPress(dest)} />
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 16, paddingBottom: 10 },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: C.w06, borderWidth: 1, borderColor: C.w10, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11 },
  searchInput: { flex: 1, fontSize: 13, fontFamily: "Satoshi-Regular", color: C.white },
  filterBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: "rgba(100,67,244,0.15)", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)", justifyContent: "center", alignItems: "center" },
  filtersWrap: { marginBottom: 16 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, marginBottom: 14 },
  sectionIcon: { fontSize: 16 },
  sectionTitle: { fontSize: 18, fontFamily: "Chillax-Bold", color: C.white, flex: 1 },
  matchCount: { fontSize: 12, fontFamily: "Satoshi-Medium", color: C.muted },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: 16 },
});
