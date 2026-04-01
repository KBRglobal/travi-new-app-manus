import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView, Image, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const CATEGORIES = ["All", "Concerts", "Sports", "Festivals", "Food & Wine", "Art", "Nightlife"];

interface EventItem {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  price: string;
  category: string;
  image: number;
  badge?: string;
  badgeColor?: string;
  attending: number;
  featured?: boolean;
}

const EVENTS: EventItem[] = [
  {
    id: "e1", title: "Dubai Jazz Festival", venue: "Dubai Media City Amphitheatre", city: "Dubai",
    date: "Apr 12–14, 2026", time: "7:00 PM", price: "AED 250–850", category: "Concerts",
    image: require("@/assets/destinations/dubai.jpg"), badge: "Featured", badgeColor: "#6443F4",
    attending: 4200, featured: true,
  },
  {
    id: "e2", title: "Formula E Abu Dhabi", venue: "Yas Marina Circuit", city: "Abu Dhabi",
    date: "Apr 19, 2026", time: "3:00 PM", price: "AED 350–2,200", category: "Sports",
    image: require("@/assets/destinations/barcelona.jpg"), badge: "Selling Fast", badgeColor: "#EF4444",
    attending: 18000,
  },
  {
    id: "e3", title: "Kyoto Cherry Blossom Festival", venue: "Maruyama Park", city: "Kyoto",
    date: "Apr 1–15, 2026", time: "All Day", price: "Free", category: "Festivals",
    image: require("@/assets/destinations/kyoto.jpg"), badge: "Free Entry", badgeColor: "#22C55E",
    attending: 35000, featured: true,
  },
  {
    id: "e4", title: "Barcelona Beer Festival", venue: "Parc de la Ciutadella", city: "Barcelona",
    date: "Apr 25–27, 2026", time: "12:00 PM", price: "€15–45", category: "Food & Wine",
    image: require("@/assets/destinations/barcelona.jpg"),
    attending: 8500,
  },
  {
    id: "e5", title: "Tokyo Anime Expo", venue: "Tokyo Big Sight", city: "Tokyo",
    date: "May 3–5, 2026", time: "10:00 AM", price: "¥3,500–12,000", category: "Art",
    image: require("@/assets/destinations/tokyo.jpg"), badge: "New", badgeColor: "#06B6D4",
    attending: 22000,
  },
  {
    id: "e6", title: "Bali Spirit Festival", venue: "Ubud, Bali", city: "Bali",
    date: "May 10–17, 2026", time: "8:00 AM", price: "$180–450", category: "Festivals",
    image: require("@/assets/destinations/bali.jpg"), badge: "Wellness", badgeColor: "#22C55E",
    attending: 3800,
  },
  {
    id: "e7", title: "Dubai Nightlife Week", venue: "Various Venues", city: "Dubai",
    date: "Apr 22–28, 2026", time: "10:00 PM", price: "AED 100–500", category: "Nightlife",
    image: require("@/assets/destinations/dubai.jpg"),
    attending: 12000,
  },
  {
    id: "e8", title: "Santorini Wine Festival", venue: "Pyrgos Village", city: "Santorini",
    date: "May 20–22, 2026", time: "5:00 PM", price: "€35–120", category: "Food & Wine",
    image: require("@/assets/destinations/santorini.jpg"), badge: "Exclusive", badgeColor: "#FFD700",
    attending: 1200,
  },
];

const FEATURED = EVENTS.filter((e) => e.featured);

export default function EventsScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = EVENTS.filter((e) => activeCategory === "All" || e.category === activeCategory);

  const toggleSave = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSaved((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
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
          <Text style={S.headerTitle}>Events & Experiences</Text>
          <Text style={S.headerSub}>Worldwide events, curated for you</Text>
        </View>
        <View style={S.savedBadge}>
          <Text style={S.savedBadgeText}>{saved.length} saved</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.content}>
        {/* Featured events */}
        {FEATURED.length > 0 && (
          <View style={S.featuredSection}>
            <Text style={S.sectionTitle}>Featured Events</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.featuredRow}>
              {FEATURED.map((event) => (
                <TouchableOpacity key={event.id} style={S.featuredCard} activeOpacity={0.88}>
                  <Image source={event.image} style={S.featuredImg} resizeMode="cover" />
                  <LinearGradient colors={["transparent", "rgba(0,0,0,0.85)"]} style={StyleSheet.absoluteFillObject} />
                  {event.badge && (
                    <View style={[S.eventBadge, { backgroundColor: event.badgeColor }]}>
                      <Text style={S.eventBadgeText}>{event.badge}</Text>
                    </View>
                  )}
                  <View style={S.featuredContent}>
                    <Text style={S.featuredTitle}>{event.title}</Text>
                    <Text style={S.featuredVenue}>📍 {event.city}</Text>
                    <View style={S.featuredMeta}>
                      <Text style={S.featuredDate}>📅 {event.date}</Text>
                      <Text style={S.featuredPrice}>{event.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Category filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[S.catChip, activeCategory === cat && S.catChipActive]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveCategory(cat);
              }}
              activeOpacity={0.8}
            >
              {activeCategory === cat && (
                <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              )}
              <Text style={[S.catText, activeCategory === cat && S.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Event list */}
        <View style={S.listSection}>
          <View style={S.listHeader}>
            <Text style={S.sectionTitle}>All Events</Text>
            <Text style={S.listCount}>{filtered.length} events</Text>
          </View>
          {filtered.map((event) => (
            <TouchableOpacity key={event.id} style={S.eventCard} activeOpacity={0.88}>
              <View style={S.eventImageWrap}>
                <Image source={event.image} style={S.eventImg} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.5)"]} style={StyleSheet.absoluteFillObject} />
                {event.badge && (
                  <View style={[S.eventBadge, { backgroundColor: event.badgeColor }]}>
                    <Text style={S.eventBadgeText}>{event.badge}</Text>
                  </View>
                )}
              </View>
              <View style={S.eventBody}>
                <View style={S.eventTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={S.eventTitle}>{event.title}</Text>
                    <Text style={S.eventVenue}>{event.venue}</Text>
                  </View>
                  <TouchableOpacity
                    style={[S.saveBtn, saved.includes(event.id) && S.saveBtnActive]}
                    onPress={() => toggleSave(event.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={{ fontSize: 16 }}>{saved.includes(event.id) ? "❤️" : "🤍"}</Text>
                  </TouchableOpacity>
                </View>
                <View style={S.eventMeta}>
                  <View style={S.eventMetaItem}>
                    <Text style={S.eventMetaIcon}>📅</Text>
                    <Text style={S.eventMetaText}>{event.date}</Text>
                  </View>
                  <View style={S.eventMetaItem}>
                    <Text style={S.eventMetaIcon}>📍</Text>
                    <Text style={S.eventMetaText}>{event.city}</Text>
                  </View>
                </View>
                <View style={S.eventBottom}>
                  <View style={S.attendingRow}>
                    <Text style={S.attendingText}>👥 {event.attending.toLocaleString()} attending</Text>
                  </View>
                  <Text style={S.eventPrice}>{event.price}</Text>
                </View>
                <TouchableOpacity style={S.bookBtn} activeOpacity={0.88}>
                  <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                  <Text style={S.bookBtnText}>Get Tickets</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 56, paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 1 },
  savedBadge: { backgroundColor: "rgba(100,67,244,0.2)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  savedBadgeText: { color: "#C084FC", fontSize: 12, fontWeight: "800" },
  content: { paddingBottom: 48, gap: 20 },

  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },

  featuredSection: { gap: 12, paddingHorizontal: 16 },
  featuredRow: { gap: 12 },
  featuredCard: { width: width * 0.75, height: 200, borderRadius: 20, overflow: "hidden", justifyContent: "flex-end" },
  featuredImg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  featuredContent: { padding: 14, gap: 4 },
  featuredTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", lineHeight: 20 },
  featuredVenue: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  featuredMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  featuredDate: { color: "rgba(255,255,255,0.55)", fontSize: 12 },
  featuredPrice: { color: "#FFD700", fontSize: 13, fontWeight: "800" },

  categoriesRow: { paddingHorizontal: 16, gap: 8 },
  catChip: { borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  catChipActive: { borderColor: "transparent" },
  catText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "600" },
  catTextActive: { color: "#FFFFFF" },

  listSection: { paddingHorizontal: 16, gap: 12 },
  listHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  listCount: { color: "rgba(255,255,255,0.35)", fontSize: 13 },

  eventCard: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  eventImageWrap: { height: 140, position: "relative" },
  eventImg: { width: "100%", height: "100%" },
  eventBadge: { position: "absolute", top: 10, left: 10, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  eventBadgeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  eventBody: { padding: 14, gap: 8 },
  eventTop: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  eventTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", lineHeight: 20 },
  eventVenue: { color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 },
  saveBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.07)", alignItems: "center", justifyContent: "center" },
  saveBtnActive: { backgroundColor: "rgba(249,68,152,0.15)" },
  eventMeta: { flexDirection: "row", gap: 14 },
  eventMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  eventMetaIcon: { fontSize: 12 },
  eventMetaText: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  eventBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  attendingRow: {},
  attendingText: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  eventPrice: { color: "#FFD700", fontSize: 14, fontWeight: "800" },
  bookBtn: { borderRadius: 12, overflow: "hidden", paddingVertical: 11, alignItems: "center" },
  bookBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
});
