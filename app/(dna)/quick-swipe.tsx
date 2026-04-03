/**
 * TRAVI — Quick DNA Swipe Mode
 * Tinder-style swipe through 116 items across 11 categories.
 * Scores 8 dimensions: Explorer, Relaxer, Adventurer, Culturalist,
 * Foodie, Photographer, Historian, Naturalist (0–100 each).
 * ~2 minutes to complete. Awards 250 XP on finish.
 */
import { useState, useRef, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
  Dimensions, PanResponder, Platform, ScrollView,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useStore } from "@/lib/store";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

const { width: W, height: H } = Dimensions.get("window");
const SWIPE_THRESHOLD = W * 0.32;

// ─── 8 DNA Dimensions ────────────────────────────────────────────────────────
export type DNADimension =
  | "explorer" | "relaxer" | "adventurer" | "culturalist"
  | "foodie" | "photographer" | "historian" | "naturalist";

export interface DNADimensionScores {
  explorer: number;
  relaxer: number;
  adventurer: number;
  culturalist: number;
  foodie: number;
  photographer: number;
  historian: number;
  naturalist: number;
}

// ─── Swipe Items (116 across 11 categories) ──────────────────────────────────
interface SwipeItem {
  id: string;
  label: string;
  icon: string;
  category: string;
  gradient: [string, string];
  dimensions: Partial<DNADimensionScores>; // which dimensions this item scores
}

const SWIPE_ITEMS: SwipeItem[] = [
  // ── 1. Beaches & Water (10) ──
  { id: "b1",  label: "Sunrise on an empty beach",      icon: "sun.horizon.fill",      category: "Beaches & Water",    gradient: ["#0EA5E9","#0284C7"], dimensions: { relaxer: 3, photographer: 2, naturalist: 2 } },
  { id: "b2",  label: "Snorkeling in a coral reef",     icon: "figure.open.water.swim", category: "Beaches & Water",   gradient: ["#06B6D4","#0891B2"], dimensions: { adventurer: 3, naturalist: 3, explorer: 1 } },
  { id: "b3",  label: "Beach bar at golden hour",       icon: "wineglass.fill",         category: "Beaches & Water",   gradient: ["#F59E0B","#D97706"], dimensions: { relaxer: 3, foodie: 2 } },
  { id: "b4",  label: "Surfing big waves",              icon: "figure.surfing",         category: "Beaches & Water",   gradient: ["#2563EB","#1D4ED8"], dimensions: { adventurer: 4, explorer: 1 } },
  { id: "b5",  label: "Kayaking through sea caves",     icon: "figure.rowing",          category: "Beaches & Water",   gradient: ["#0D9488","#0F766E"], dimensions: { adventurer: 3, naturalist: 2, photographer: 2 } },
  { id: "b6",  label: "Floating in a saltwater lagoon", icon: "water.waves",            category: "Beaches & Water",   gradient: ["#38BDF8","#0EA5E9"], dimensions: { relaxer: 4, naturalist: 2 } },
  { id: "b7",  label: "Cliff jumping into the ocean",   icon: "arrow.down.to.line",     category: "Beaches & Water",   gradient: ["#EF4444","#DC2626"], dimensions: { adventurer: 5, explorer: 1 } },
  { id: "b8",  label: "Watching dolphins from a boat",  icon: "fish.fill",              category: "Beaches & Water",   gradient: ["#3B82F6","#2563EB"], dimensions: { naturalist: 4, photographer: 2, relaxer: 1 } },
  { id: "b9",  label: "Beachside yoga at dawn",         icon: "figure.yoga",            category: "Beaches & Water",   gradient: ["#8B5CF6","#7C3AED"], dimensions: { relaxer: 4, naturalist: 2 } },
  { id: "b10", label: "Night swim under the stars",     icon: "moon.stars.fill",        category: "Beaches & Water",   gradient: ["#1E3A5F","#1D4ED8"], dimensions: { adventurer: 2, relaxer: 2, photographer: 2 } },

  // ── 2. Mountains & Hiking (10) ──
  { id: "m1",  label: "Summit sunrise hike",            icon: "mountain.2.fill",        category: "Mountains & Hiking", gradient: ["#16A34A","#15803D"], dimensions: { adventurer: 4, naturalist: 3, photographer: 2 } },
  { id: "m2",  label: "Camping under the Milky Way",    icon: "tent.fill",              category: "Mountains & Hiking", gradient: ["#1E3A5F","#6443F4"], dimensions: { naturalist: 4, adventurer: 2, photographer: 3 } },
  { id: "m3",  label: "Via ferrata on a cliff face",    icon: "figure.climbing",        category: "Mountains & Hiking", gradient: ["#DC2626","#B91C1C"], dimensions: { adventurer: 5, explorer: 2 } },
  { id: "m4",  label: "Hot springs in the mountains",   icon: "thermometer.medium",     category: "Mountains & Hiking", gradient: ["#F97316","#EA580C"], dimensions: { relaxer: 4, naturalist: 3 } },
  { id: "m5",  label: "Multi-day trekking route",       icon: "figure.hiking",          category: "Mountains & Hiking", gradient: ["#065F46","#047857"], dimensions: { adventurer: 4, naturalist: 3, explorer: 3 } },
  { id: "m6",  label: "Mountain village homestay",      icon: "house.fill",             category: "Mountains & Hiking", gradient: ["#78350F","#92400E"], dimensions: { culturalist: 3, explorer: 3, relaxer: 2 } },
  { id: "m7",  label: "Glacier walk with crampons",     icon: "snowflake",              category: "Mountains & Hiking", gradient: ["#BAE6FD","#7DD3FC"], dimensions: { adventurer: 4, naturalist: 3, photographer: 3 } },
  { id: "m8",  label: "Paragliding over valleys",       icon: "wind",                   category: "Mountains & Hiking", gradient: ["#7C3AED","#6D28D9"], dimensions: { adventurer: 5, photographer: 3 } },
  { id: "m9",  label: "Waterfall hidden in the forest", icon: "drop.fill",              category: "Mountains & Hiking", gradient: ["#059669","#047857"], dimensions: { naturalist: 4, photographer: 3, explorer: 2 } },
  { id: "m10", label: "Scenic cable car ride",          icon: "cablecar",               category: "Mountains & Hiking", gradient: ["#64748B","#475569"], dimensions: { photographer: 3, relaxer: 2, naturalist: 2 } },

  // ── 3. Food & Dining (11) ──
  { id: "f1",  label: "Street food market at night",    icon: "fork.knife",             category: "Food & Dining",      gradient: ["#F97316","#EA580C"], dimensions: { foodie: 5, explorer: 2, culturalist: 2 } },
  { id: "f2",  label: "Michelin-star tasting menu",     icon: "star.fill",              category: "Food & Dining",      gradient: ["#FBBF24","#F59E0B"], dimensions: { foodie: 5, relaxer: 2 } },
  { id: "f3",  label: "Cooking class with a local chef",icon: "flame.fill",             category: "Food & Dining",      gradient: ["#DC2626","#B91C1C"], dimensions: { foodie: 4, culturalist: 3, explorer: 2 } },
  { id: "f4",  label: "Wine tasting in a vineyard",     icon: "wineglass",              category: "Food & Dining",      gradient: ["#7C2D12","#9A3412"], dimensions: { foodie: 4, relaxer: 3, photographer: 2 } },
  { id: "f5",  label: "Breakfast at a local bakery",    icon: "cup.and.saucer.fill",    category: "Food & Dining",      gradient: ["#D97706","#B45309"], dimensions: { foodie: 3, relaxer: 3, culturalist: 2 } },
  { id: "f6",  label: "Rooftop dinner with city views", icon: "building.2.fill",        category: "Food & Dining",      gradient: ["#1E3A5F","#2563EB"], dimensions: { foodie: 3, photographer: 3, relaxer: 2 } },
  { id: "f7",  label: "Foraging tour in the wild",      icon: "leaf.fill",              category: "Food & Dining",      gradient: ["#166534","#15803D"], dimensions: { foodie: 3, naturalist: 4, adventurer: 2 } },
  { id: "f8",  label: "Fish market at 5am",             icon: "fish.fill",              category: "Food & Dining",      gradient: ["#0369A1","#0284C7"], dimensions: { foodie: 4, explorer: 3, culturalist: 2 } },
  { id: "f9",  label: "Dessert tasting tour",           icon: "birthday.cake.fill",     category: "Food & Dining",      gradient: ["#EC4899","#DB2777"], dimensions: { foodie: 4, relaxer: 2 } },
  { id: "f10", label: "Spice market exploration",       icon: "cart.fill",              category: "Food & Dining",      gradient: ["#B45309","#92400E"], dimensions: { foodie: 3, culturalist: 3, explorer: 3 } },
  { id: "f11", label: "Farm-to-table dinner",           icon: "sun.max.fill",           category: "Food & Dining",      gradient: ["#65A30D","#4D7C0F"], dimensions: { foodie: 4, naturalist: 3, relaxer: 2 } },

  // ── 4. Culture & History (11) ──
  { id: "c1",  label: "Ancient ruins at dawn",          icon: "building.columns.fill",  category: "Culture & History",  gradient: ["#78350F","#92400E"], dimensions: { historian: 5, photographer: 3, culturalist: 3 } },
  { id: "c2",  label: "Local festival or carnival",     icon: "music.note.list",        category: "Culture & History",  gradient: ["#F94498","#C2185B"], dimensions: { culturalist: 5, explorer: 3, photographer: 2 } },
  { id: "c3",  label: "Museum with a local guide",      icon: "building.2.fill",        category: "Culture & History",  gradient: ["#6443F4","#4F46E5"], dimensions: { historian: 4, culturalist: 4 } },
  { id: "c4",  label: "Traditional craft workshop",     icon: "paintbrush.fill",        category: "Culture & History",  gradient: ["#D97706","#B45309"], dimensions: { culturalist: 5, historian: 2, explorer: 2 } },
  { id: "c5",  label: "Religious site at sunrise",      icon: "building.fill",          category: "Culture & History",  gradient: ["#F59E0B","#D97706"], dimensions: { historian: 4, photographer: 4, culturalist: 3 } },
  { id: "c6",  label: "Underground city tour",          icon: "arrow.down.circle.fill", category: "Culture & History",  gradient: ["#374151","#1F2937"], dimensions: { historian: 5, adventurer: 2, explorer: 3 } },
  { id: "c7",  label: "Watching a traditional dance",   icon: "figure.dance",           category: "Culture & History",  gradient: ["#7C3AED","#6D28D9"], dimensions: { culturalist: 5, photographer: 2 } },
  { id: "c8",  label: "Visiting a royal palace",        icon: "crown.fill",             category: "Culture & History",  gradient: ["#B45309","#92400E"], dimensions: { historian: 5, photographer: 3, culturalist: 2 } },
  { id: "c9",  label: "Street art neighbourhood walk",  icon: "paintpalette.fill",      category: "Culture & History",  gradient: ["#EC4899","#BE185D"], dimensions: { culturalist: 3, photographer: 4, explorer: 3 } },
  { id: "c10", label: "WWII or war memorial site",      icon: "flag.fill",              category: "Culture & History",  gradient: ["#374151","#4B5563"], dimensions: { historian: 5, culturalist: 3 } },
  { id: "c11", label: "Living with a local family",     icon: "house.fill",             category: "Culture & History",  gradient: ["#0D9488","#0F766E"], dimensions: { culturalist: 5, explorer: 4, relaxer: 1 } },

  // ── 5. Adventure & Extreme (10) ──
  { id: "a1",  label: "Skydiving from 15,000 feet",     icon: "figure.fall",            category: "Adventure & Extreme", gradient: ["#DC2626","#B91C1C"], dimensions: { adventurer: 5, explorer: 2 } },
  { id: "a2",  label: "White-water rafting class 5",    icon: "figure.water.fitness",   category: "Adventure & Extreme", gradient: ["#2563EB","#1D4ED8"], dimensions: { adventurer: 5, naturalist: 2 } },
  { id: "a3",  label: "Bungee jump over a gorge",       icon: "arrow.down.to.line",     category: "Adventure & Extreme", gradient: ["#EF4444","#DC2626"], dimensions: { adventurer: 5 } },
  { id: "a4",  label: "Desert dune bashing",            icon: "car.fill",               category: "Adventure & Extreme", gradient: ["#D97706","#B45309"], dimensions: { adventurer: 4, explorer: 3 } },
  { id: "a5",  label: "Caving in a stalactite cave",    icon: "flashlight.on.fill",     category: "Adventure & Extreme", gradient: ["#374151","#1F2937"], dimensions: { adventurer: 4, naturalist: 3, explorer: 3 } },
  { id: "a6",  label: "Zip-lining through jungle",      icon: "figure.climbing",        category: "Adventure & Extreme", gradient: ["#166534","#15803D"], dimensions: { adventurer: 4, naturalist: 3 } },
  { id: "a7",  label: "Ice climbing a frozen waterfall", icon: "snowflake",             category: "Adventure & Extreme", gradient: ["#BAE6FD","#7DD3FC"], dimensions: { adventurer: 5, naturalist: 2 } },
  { id: "a8",  label: "Night safari in the wild",       icon: "moon.fill",              category: "Adventure & Extreme", gradient: ["#1E3A5F","#1D4ED8"], dimensions: { adventurer: 3, naturalist: 5, photographer: 3 } },
  { id: "a9",  label: "Motorbike road trip",            icon: "car.fill",               category: "Adventure & Extreme", gradient: ["#374151","#DC2626"], dimensions: { adventurer: 4, explorer: 4 } },
  { id: "a10", label: "Volcano hike at night",          icon: "flame.fill",             category: "Adventure & Extreme", gradient: ["#DC2626","#F97316"], dimensions: { adventurer: 5, naturalist: 3, photographer: 3 } },

  // ── 6. Wellness & Relaxation (10) ──
  { id: "w1",  label: "Luxury spa day",                 icon: "sparkles",               category: "Wellness & Relaxation", gradient: ["#8B5CF6","#7C3AED"], dimensions: { relaxer: 5 } },
  { id: "w2",  label: "Silent meditation retreat",      icon: "moon.stars.fill",        category: "Wellness & Relaxation", gradient: ["#1E3A5F","#4338CA"], dimensions: { relaxer: 5, naturalist: 2 } },
  { id: "w3",  label: "Hammam in a historic bathhouse", icon: "drop.fill",              category: "Wellness & Relaxation", gradient: ["#0D9488","#0F766E"], dimensions: { relaxer: 4, culturalist: 3, historian: 2 } },
  { id: "w4",  label: "Sunrise yoga on a rooftop",      icon: "figure.yoga",            category: "Wellness & Relaxation", gradient: ["#F59E0B","#D97706"], dimensions: { relaxer: 4, photographer: 2 } },
  { id: "w5",  label: "Floating in a sensory tank",     icon: "water.waves",            category: "Wellness & Relaxation", gradient: ["#7C3AED","#6D28D9"], dimensions: { relaxer: 5 } },
  { id: "w6",  label: "Slow morning in a café",         icon: "cup.and.saucer.fill",    category: "Wellness & Relaxation", gradient: ["#92400E","#78350F"], dimensions: { relaxer: 4, foodie: 2 } },
  { id: "w7",  label: "Hammock between palm trees",     icon: "leaf.fill",              category: "Wellness & Relaxation", gradient: ["#065F46","#047857"], dimensions: { relaxer: 5, naturalist: 2 } },
  { id: "w8",  label: "Thermal baths in Iceland",       icon: "thermometer.medium",     category: "Wellness & Relaxation", gradient: ["#38BDF8","#0EA5E9"], dimensions: { relaxer: 4, naturalist: 3 } },
  { id: "w9",  label: "Digital detox weekend",          icon: "wifi.slash",             category: "Wellness & Relaxation", gradient: ["#374151","#1F2937"], dimensions: { relaxer: 5, naturalist: 3 } },
  { id: "w10", label: "Ayurvedic treatment in Kerala",  icon: "heart.fill",             category: "Wellness & Relaxation", gradient: ["#166534","#15803D"], dimensions: { relaxer: 4, culturalist: 3 } },

  // ── 7. Photography & Art (10) ──
  { id: "p1",  label: "Golden hour in a desert",        icon: "camera.fill",            category: "Photography & Art",  gradient: ["#D97706","#B45309"], dimensions: { photographer: 5, naturalist: 3 } },
  { id: "p2",  label: "Street photography in a medina", icon: "camera.aperture",        category: "Photography & Art",  gradient: ["#B45309","#92400E"], dimensions: { photographer: 5, culturalist: 3, explorer: 2 } },
  { id: "p3",  label: "Northern Lights photography",    icon: "moon.stars.fill",        category: "Photography & Art",  gradient: ["#1E3A5F","#6443F4"], dimensions: { photographer: 5, naturalist: 4 } },
  { id: "p4",  label: "Visiting a contemporary art gallery", icon: "paintpalette.fill", category: "Photography & Art",  gradient: ["#EC4899","#BE185D"], dimensions: { photographer: 3, culturalist: 4 } },
  { id: "p5",  label: "Drone shot over a city",         icon: "airplane",               category: "Photography & Art",  gradient: ["#374151","#1F2937"], dimensions: { photographer: 5, explorer: 2 } },
  { id: "p6",  label: "Underwater photography",         icon: "camera.fill",            category: "Photography & Art",  gradient: ["#0369A1","#0284C7"], dimensions: { photographer: 5, adventurer: 2, naturalist: 3 } },
  { id: "p7",  label: "Mural hunting in a city",        icon: "paintbrush.fill",        category: "Photography & Art",  gradient: ["#7C3AED","#6D28D9"], dimensions: { photographer: 4, culturalist: 3, explorer: 3 } },
  { id: "p8",  label: "Long exposure waterfall shot",   icon: "drop.fill",              category: "Photography & Art",  gradient: ["#059669","#047857"], dimensions: { photographer: 5, naturalist: 3 } },
  { id: "p9",  label: "Portrait of a local elder",      icon: "person.fill",            category: "Photography & Art",  gradient: ["#78350F","#92400E"], dimensions: { photographer: 4, culturalist: 4 } },
  { id: "p10", label: "Architecture photography tour",  icon: "building.columns.fill",  category: "Photography & Art",  gradient: ["#1E3A5F","#2563EB"], dimensions: { photographer: 5, historian: 2 } },

  // ── 8. Nature & Wildlife (11) ──
  { id: "n1",  label: "Safari in the Serengeti",        icon: "binoculars.fill",        category: "Nature & Wildlife",  gradient: ["#D97706","#B45309"], dimensions: { naturalist: 5, photographer: 4, adventurer: 2 } },
  { id: "n2",  label: "Whale watching at sea",          icon: "fish.fill",              category: "Nature & Wildlife",  gradient: ["#0369A1","#0284C7"], dimensions: { naturalist: 5, photographer: 3, relaxer: 2 } },
  { id: "n3",  label: "Birdwatching at dawn",           icon: "bird.fill",              category: "Nature & Wildlife",  gradient: ["#65A30D","#4D7C0F"], dimensions: { naturalist: 5, relaxer: 2, photographer: 3 } },
  { id: "n4",  label: "Swimming with sea turtles",      icon: "figure.open.water.swim", category: "Nature & Wildlife",  gradient: ["#0D9488","#0F766E"], dimensions: { naturalist: 5, adventurer: 2, photographer: 3 } },
  { id: "n5",  label: "Amazon rainforest trek",         icon: "leaf.fill",              category: "Nature & Wildlife",  gradient: ["#166534","#15803D"], dimensions: { naturalist: 5, adventurer: 4, explorer: 3 } },
  { id: "n6",  label: "Gorilla trekking in Uganda",     icon: "figure.hiking",          category: "Nature & Wildlife",  gradient: ["#374151","#166534"], dimensions: { naturalist: 5, adventurer: 4, photographer: 3 } },
  { id: "n7",  label: "Firefly forest at night",        icon: "sparkles",               category: "Nature & Wildlife",  gradient: ["#065F46","#6443F4"], dimensions: { naturalist: 5, photographer: 4, relaxer: 2 } },
  { id: "n8",  label: "Chasing a storm with a guide",   icon: "cloud.bolt.fill",        category: "Nature & Wildlife",  gradient: ["#374151","#1E3A5F"], dimensions: { naturalist: 3, adventurer: 5, photographer: 3 } },
  { id: "n9",  label: "Sea kayaking with orcas",        icon: "figure.rowing",          category: "Nature & Wildlife",  gradient: ["#0369A1","#1E3A5F"], dimensions: { naturalist: 5, adventurer: 3, photographer: 3 } },
  { id: "n10", label: "Desert stargazing night",        icon: "star.fill",              category: "Nature & Wildlife",  gradient: ["#1E3A5F","#4338CA"], dimensions: { naturalist: 4, photographer: 4, relaxer: 3 } },
  { id: "n11", label: "Visiting a wildlife sanctuary",  icon: "heart.fill",             category: "Nature & Wildlife",  gradient: ["#166534","#15803D"], dimensions: { naturalist: 5, culturalist: 2 } },

  // ── 9. Nightlife & Social (10) ──
  { id: "nl1", label: "Rooftop bar with city skyline",  icon: "building.2.fill",        category: "Nightlife & Social", gradient: ["#1E3A5F","#6443F4"], dimensions: { explorer: 3, relaxer: 2, photographer: 2 } },
  { id: "nl2", label: "Underground techno club",        icon: "music.note",             category: "Nightlife & Social", gradient: ["#374151","#7C3AED"], dimensions: { adventurer: 2, explorer: 3 } },
  { id: "nl3", label: "Jazz bar in New Orleans",        icon: "music.mic",              category: "Nightlife & Social", gradient: ["#78350F","#92400E"], dimensions: { culturalist: 4, foodie: 2, relaxer: 2 } },
  { id: "nl4", label: "Beach bonfire with strangers",   icon: "flame.fill",             category: "Nightlife & Social", gradient: ["#DC2626","#F97316"], dimensions: { adventurer: 2, explorer: 3, relaxer: 2 } },
  { id: "nl5", label: "Karaoke night in Tokyo",         icon: "music.note.list",        category: "Nightlife & Social", gradient: ["#EC4899","#BE185D"], dimensions: { culturalist: 3, explorer: 3 } },
  { id: "nl6", label: "Flamenco show in Seville",       icon: "figure.dance",           category: "Nightlife & Social", gradient: ["#DC2626","#B91C1C"], dimensions: { culturalist: 5, photographer: 2 } },
  { id: "nl7", label: "Night market street food crawl", icon: "fork.knife",             category: "Nightlife & Social", gradient: ["#F97316","#EA580C"], dimensions: { foodie: 4, explorer: 3, culturalist: 2 } },
  { id: "nl8", label: "Sunset cruise with live music",  icon: "music.note",             category: "Nightlife & Social", gradient: ["#F59E0B","#D97706"], dimensions: { relaxer: 3, photographer: 3 } },
  { id: "nl9", label: "Pub crawl with locals",          icon: "wineglass.fill",         category: "Nightlife & Social", gradient: ["#166534","#15803D"], dimensions: { explorer: 4, culturalist: 3 } },
  { id: "nl10",label: "Watching the sunrise after a night out", icon: "sun.horizon.fill", category: "Nightlife & Social", gradient: ["#F59E0B","#EC4899"], dimensions: { adventurer: 2, photographer: 3 } },

  // ── 10. Architecture & Cities (12) ──
  { id: "ar1", label: "Exploring a medieval old town",  icon: "building.columns.fill",  category: "Architecture & Cities", gradient: ["#78350F","#92400E"], dimensions: { historian: 5, culturalist: 3, photographer: 3 } },
  { id: "ar2", label: "Futuristic skyline at night",    icon: "building.2.fill",        category: "Architecture & Cities", gradient: ["#1E3A5F","#6443F4"], dimensions: { photographer: 4, explorer: 3 } },
  { id: "ar3", label: "Hidden alleyways and courtyards",icon: "map.fill",               category: "Architecture & Cities", gradient: ["#374151","#4B5563"], dimensions: { explorer: 5, photographer: 3, historian: 2 } },
  { id: "ar4", label: "Brutalist architecture tour",    icon: "building.fill",          category: "Architecture & Cities", gradient: ["#374151","#1F2937"], dimensions: { historian: 3, photographer: 4, culturalist: 2 } },
  { id: "ar5", label: "Rooftop garden in a megacity",   icon: "leaf.fill",              category: "Architecture & Cities", gradient: ["#065F46","#047857"], dimensions: { naturalist: 3, photographer: 3, relaxer: 2 } },
  { id: "ar6", label: "Abandoned factory turned gallery",icon: "paintpalette.fill",     category: "Architecture & Cities", gradient: ["#374151","#7C3AED"], dimensions: { culturalist: 4, photographer: 4, historian: 2 } },
  { id: "ar7", label: "Floating market by boat",        icon: "ferry.fill",             category: "Architecture & Cities", gradient: ["#0369A1","#0284C7"], dimensions: { culturalist: 4, foodie: 3, photographer: 3 } },
  { id: "ar8", label: "Sunrise over a canal city",      icon: "water.waves",            category: "Architecture & Cities", gradient: ["#0D9488","#0F766E"], dimensions: { photographer: 5, relaxer: 3, historian: 2 } },
  { id: "ar9", label: "Favela or medina walking tour",  icon: "figure.walk",            category: "Architecture & Cities", gradient: ["#F97316","#EA580C"], dimensions: { explorer: 5, culturalist: 4, photographer: 3 } },
  { id: "ar10",label: "Visiting an iconic bridge",      icon: "arrow.left.and.right",   category: "Architecture & Cities", gradient: ["#374151","#1F2937"], dimensions: { photographer: 4, historian: 3 } },
  { id: "ar11",label: "Sleeping in a cave hotel",       icon: "moon.fill",              category: "Architecture & Cities", gradient: ["#78350F","#1E3A5F"], dimensions: { adventurer: 3, historian: 3, photographer: 3 } },
  { id: "ar12",label: "Gondola through a historic city",icon: "ferry.fill",             category: "Architecture & Cities", gradient: ["#1E3A5F","#2563EB"], dimensions: { historian: 4, relaxer: 3, photographer: 3 } },

  // ── 11. Unique Experiences (11) ──
  { id: "u1",  label: "Sleeping under the stars",       icon: "moon.stars.fill",        category: "Unique Experiences", gradient: ["#1E3A5F","#4338CA"], dimensions: { naturalist: 4, adventurer: 3, relaxer: 2 } },
  { id: "u2",  label: "Overwater bungalow in Maldives", icon: "water.waves",            category: "Unique Experiences", gradient: ["#0EA5E9","#0284C7"], dimensions: { relaxer: 5, photographer: 4 } },
  { id: "u3",  label: "Trans-Siberian Railway journey", icon: "tram.fill",              category: "Unique Experiences", gradient: ["#374151","#1E3A5F"], dimensions: { explorer: 5, historian: 3, relaxer: 2 } },
  { id: "u4",  label: "Volunteering in a local school", icon: "person.2.fill",          category: "Unique Experiences", gradient: ["#065F46","#047857"], dimensions: { culturalist: 5, explorer: 3 } },
  { id: "u5",  label: "Midnight train to nowhere",      icon: "tram.fill",              category: "Unique Experiences", gradient: ["#374151","#6443F4"], dimensions: { adventurer: 3, explorer: 4 } },
  { id: "u6",  label: "Truffle hunting in Tuscany",     icon: "leaf.fill",              category: "Unique Experiences", gradient: ["#78350F","#92400E"], dimensions: { foodie: 5, naturalist: 3, culturalist: 2 } },
  { id: "u7",  label: "Ice hotel in Scandinavia",       icon: "snowflake",              category: "Unique Experiences", gradient: ["#BAE6FD","#1E3A5F"], dimensions: { adventurer: 3, photographer: 4, explorer: 3 } },
  { id: "u8",  label: "Pilgrimage route on foot",       icon: "figure.walk",            category: "Unique Experiences", gradient: ["#78350F","#D97706"], dimensions: { historian: 4, culturalist: 4, adventurer: 3 } },
  { id: "u9",  label: "Floating market at 4am",         icon: "cart.fill",              category: "Unique Experiences", gradient: ["#F97316","#0369A1"], dimensions: { explorer: 5, foodie: 3, culturalist: 3 } },
  { id: "u10", label: "Submarine dive to a shipwreck",  icon: "arrow.down.circle.fill", category: "Unique Experiences", gradient: ["#1E3A5F","#374151"], dimensions: { adventurer: 5, historian: 3, photographer: 3 } },
  { id: "u11", label: "Living off-grid for a week",     icon: "leaf.fill",              category: "Unique Experiences", gradient: ["#166534","#374151"], dimensions: { naturalist: 5, adventurer: 4, relaxer: 2 } },
];

// ─── XP Tiers (shared from lib) ──────────────────────────────────────────────
export { XP_TIERS, getTierForXP } from "@/lib/xp-tiers";

// ─── Compute 8-dimension scores from swipe history ───────────────────────────
function computeDNAScores(
  likes: string[],
  nopes: string[],
): DNADimensionScores {
  const raw: DNADimensionScores = {
    explorer: 0, relaxer: 0, adventurer: 0, culturalist: 0,
    foodie: 0, photographer: 0, historian: 0, naturalist: 0,
  };
  const max: DNADimensionScores = { ...raw };

  for (const item of SWIPE_ITEMS) {
    for (const [dim, pts] of Object.entries(item.dimensions) as [DNADimension, number][]) {
      max[dim] = (max[dim] ?? 0) + pts;
      if (likes.includes(item.id)) {
        raw[dim] = (raw[dim] ?? 0) + pts;
      }
    }
  }

  // Normalise to 0–100
  const result = { ...raw };
  for (const dim of Object.keys(raw) as DNADimension[]) {
    result[dim] = max[dim] > 0 ? Math.round((raw[dim] / max[dim]) * 100) : 0;
  }
  return result;
}

// ─── Swipe Card ───────────────────────────────────────────────────────────────
function SwipeCard({
  item, isTop, onSwipeLeft, onSwipeRight,
}: {
  item: SwipeItem; isTop: boolean;
  onSwipeLeft: () => void; onSwipeRight: () => void;
}) {
  const pos = useRef(new Animated.ValueXY()).current;
  const rotate = pos.x.interpolate({ inputRange: [-W, 0, W], outputRange: ["-12deg","0deg","12deg"] });
  const likeOp = pos.x.interpolate({ inputRange: [0, SWIPE_THRESHOLD / 2], outputRange: [0, 1], extrapolate: "clamp" });
  const nopeOp = pos.x.interpolate({ inputRange: [-SWIPE_THRESHOLD / 2, 0], outputRange: [1, 0], extrapolate: "clamp" });

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onPanResponderMove: (_, g) => pos.setValue({ x: g.dx, y: g.dy * 0.3 }),
      onPanResponderRelease: (_, g) => {
        if (g.dx > SWIPE_THRESHOLD) {
          Animated.timing(pos, { toValue: { x: W * 1.5, y: g.dy }, duration: 250, useNativeDriver: true }).start(onSwipeRight);
        } else if (g.dx < -SWIPE_THRESHOLD) {
          Animated.timing(pos, { toValue: { x: -W * 1.5, y: g.dy }, duration: 250, useNativeDriver: true }).start(onSwipeLeft);
        } else {
          Animated.spring(pos, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[styles.card, { transform: [{ translateX: pos.x }, { translateY: pos.y }, { rotate }] }]}
      {...pan.panHandlers}
    >
      <LinearGradient colors={item.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
      <LinearGradient colors={["rgba(0,0,0,0.0)","rgba(0,0,0,0.55)"]} style={StyleSheet.absoluteFillObject} />

      {/* LIKE badge */}
      <Animated.View style={[styles.badge, styles.likeBadge, { opacity: likeOp }]}>
        <Text style={styles.badgeText}>LOVE IT</Text>
      </Animated.View>
      {/* NOPE badge */}
      <Animated.View style={[styles.badge, styles.nopeBadge, { opacity: nopeOp }]}>
        <Text style={styles.badgeText}>SKIP</Text>
      </Animated.View>

      {/* Category pill */}
      <View style={styles.categoryPill}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>

      {/* Icon */}
      <View style={styles.cardIconWrap}>
        <IconSymbol name={item.icon as any} size={52} color="rgba(255,255,255,0.9)" />
      </View>

      {/* Label */}
      <View style={styles.cardBottom}>
        <Text style={styles.cardLabel}>{item.label}</Text>
      </View>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function QuickSwipeScreen() {
  const insets = useSafeAreaInsets();
  const { dispatch } = useStore();
  const { isAuthenticated } = useAuth();
  const profileSync = trpc.profile.sync.useMutation();
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<string[]>([]);
  const [nopes, setNopes] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [scores, setScores] = useState<DNADimensionScores | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const total = SWIPE_ITEMS.length;
  const current = SWIPE_ITEMS[index];
  const next = SWIPE_ITEMS[index + 1];

  const animateProgress = useCallback((newIndex: number) => {
    Animated.timing(progressAnim, {
      toValue: newIndex / total,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [total]);

  const handleSwipe = useCallback((liked: boolean) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const id = SWIPE_ITEMS[index].id;
    if (liked) setLikes(prev => [...prev, id]);
    else setNopes(prev => [...prev, id]);

    const newIndex = index + 1;
    animateProgress(newIndex);

    if (newIndex >= total) {
      const finalLikes = liked ? [...likes, id] : likes;
      const finalNopes = !liked ? [...nopes, id] : nopes;
      const computed = computeDNAScores(finalLikes, finalNopes);
      setScores(computed);
      setDone(true);
      // Award 250 XP
      dispatch({ type: "ADD_XP", payload: 250 });
      // Sync DNA scores to backend if authenticated
      if (isAuthenticated) {
        profileSync.mutate({
          explorerScore:     computed.explorer,
          relaxerScore:      computed.relaxer,
          adventurerScore:   computed.adventurer,
          culturalistScore:  computed.culturalist,
          foodieScore:       computed.foodie,
          photographerScore: computed.photographer,
          historianScore:    computed.historian,
          naturalistScore:   computed.naturalist,
          xp:                250,
          swipeCompleted:    1,
        });
      }
    } else {
      setIndex(newIndex);
    }
  }, [index, likes, nopes, total, animateProgress, dispatch]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1], outputRange: ["0%", "100%"],
  });

  const DIMS: { key: DNADimension; label: string; icon: string; color: string }[] = [
    { key: "explorer",    label: "Explorer",    icon: "map.fill",              color: "#6443F4" },
    { key: "relaxer",     label: "Relaxer",     icon: "sparkles",              color: "#06B6D4" },
    { key: "adventurer",  label: "Adventurer",  icon: "bolt.fill",             color: "#EF4444" },
    { key: "culturalist", label: "Culturalist", icon: "building.columns.fill", color: "#F59E0B" },
    { key: "foodie",      label: "Foodie",      icon: "fork.knife",            color: "#F97316" },
    { key: "photographer",label: "Photographer",icon: "camera.fill",           color: "#EC4899" },
    { key: "historian",   label: "Historian",   icon: "book.fill",             color: "#78350F" },
    { key: "naturalist",  label: "Naturalist",  icon: "leaf.fill",             color: "#16A34A" },
  ];

  // ── Results screen ──
  if (done && scores) {
    const topDim = DIMS.reduce((a, b) => scores[a.key] > scores[b.key] ? a : b);
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={["#0D0520","#1A0A3B","#0D0520"]} style={StyleSheet.absoluteFillObject} />
        <ScrollView contentContainerStyle={{ paddingBottom: 130, paddingHorizontal: 20 }}>
          {/* Header */}
          <View style={styles.resultHeader}>
            <View style={styles.resultIconWrap}>
              <LinearGradient colors={["#6443F4","#F94498"]} style={StyleSheet.absoluteFillObject} />
              <IconSymbol name={topDim.icon as any} size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.resultTitle}>Your Quick DNA</Text>
            <Text style={styles.resultSub}>Based on {likes.length} of {total} experiences you loved</Text>
          </View>

          {/* Top type */}
          <View style={styles.topTypeCard}>
            <LinearGradient colors={["rgba(100,67,244,0.3)","rgba(249,68,152,0.2)"]} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.topTypeLabel}>YOUR PRIMARY TYPE</Text>
            <Text style={styles.topTypeName}>{topDim.label}</Text>
            <Text style={styles.topTypeScore}>{scores[topDim.key]}% match</Text>
          </View>

          {/* 8 dimensions */}
          <Text style={styles.dimsTitle}>Your 8 Travel Dimensions</Text>
          {DIMS.map(dim => (
            <View key={dim.key} style={styles.dimRow}>
              <View style={styles.dimLeft}>
                <View style={[styles.dimIcon, { backgroundColor: dim.color + "22" }]}>
                  <IconSymbol name={dim.icon as any} size={16} color={dim.color} />
                </View>
                <Text style={styles.dimLabel}>{dim.label}</Text>
              </View>
              <View style={styles.dimBarWrap}>
                <View style={[styles.dimBarFill, { width: `${scores[dim.key]}%` as any, backgroundColor: dim.color }]} />
              </View>
              <Text style={styles.dimScore}>{scores[dim.key]}</Text>
            </View>
          ))}

          {/* XP reward */}
          <View style={styles.xpCard}>
            <LinearGradient colors={["#F59E0B","#D97706"]} style={StyleSheet.absoluteFillObject} />
            <IconSymbol name="star.fill" size={24} color="#FFFFFF" />
            <View style={{ flex: 1 }}>
              <Text style={styles.xpTitle}>+250 XP Earned</Text>
              <Text style={styles.xpSub}>Quick DNA complete — upgrade to First Class DNA for 580 signals</Text>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => router.replace("/(tabs)/index" as never)}
            activeOpacity={0.88}
          >
            <LinearGradient colors={["#6443F4","#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.ctaText}>Start Planning My Trip</Text>
            <IconSymbol name="chevron.right" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryCta}
            onPress={() => router.push("/(auth)/quiz" as never)}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryCtaText}>Take First Class DNA (15 min · 50% discount)</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ── Swipe screen ──
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0520","#1A0A3B","#0D0520"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.8}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>Quick DNA</Text>
          <Text style={styles.headerSub}>{index + 1} / {total}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      {/* Cards */}
      <View style={styles.cardsArea}>
        {next && (
          <View style={[styles.card, styles.cardBehind]}>
            <LinearGradient colors={next.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
          </View>
        )}
        {current && (
          <SwipeCard
            key={current.id}
            item={current}
            isTop
            onSwipeLeft={() => handleSwipe(false)}
            onSwipeRight={() => handleSwipe(true)}
          />
        )}
      </View>

      {/* Buttons */}
      <View style={[styles.buttons, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity style={[styles.actionBtn, styles.nopeBtn]} onPress={() => handleSwipe(false)} activeOpacity={0.85}>
          <IconSymbol name="xmark" size={28} color="#EF4444" />
        </TouchableOpacity>
        <View style={styles.swipeHint}>
          <Text style={styles.swipeHintText}>Swipe right to love · left to skip</Text>
        </View>
        <TouchableOpacity style={[styles.actionBtn, styles.likeBtn]} onPress={() => handleSwipe(true)} activeOpacity={0.85}>
          <IconSymbol name="heart.fill" size={28} color="#22C55E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  progressWrap: { height: 3, backgroundColor: "rgba(255,255,255,0.06)", marginHorizontal: 20, borderRadius: 2, overflow: "hidden" },
  progressFill: { height: 3, backgroundColor: "#6443F4", borderRadius: 2 },
  cardsArea: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 16 },
  card: {
    width: W - 40, height: H * 0.48, borderRadius: 24, overflow: "hidden",
    position: "absolute", alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 12,
  },
  cardBehind: { transform: [{ scale: 0.95 }], opacity: 0.7 },
  badge: { position: "absolute", top: 24, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 3 },
  likeBadge: { right: 20, borderColor: "#22C55E", backgroundColor: "rgba(34,197,94,0.15)" },
  nopeBadge: { left: 20, borderColor: "#EF4444", backgroundColor: "rgba(239,68,68,0.15)" },
  badgeText: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", fontFamily: "Chillax-Bold", letterSpacing: 2 },
  categoryPill: { position: "absolute", top: 20, alignSelf: "center", backgroundColor: "rgba(0,0,0,0.4)", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  categoryText: { color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: "600" },
  cardIconWrap: { alignItems: "center", justifyContent: "center", marginBottom: 16 },
  cardBottom: { position: "absolute", bottom: 28, left: 20, right: 20 },
  cardLabel: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", fontFamily: "Chillax-Bold", textAlign: "center", textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  buttons: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 24, paddingHorizontal: 40, paddingTop: 16 },
  actionBtn: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  nopeBtn: { backgroundColor: "rgba(239,68,68,0.15)", borderWidth: 2, borderColor: "rgba(239,68,68,0.4)" },
  likeBtn: { backgroundColor: "rgba(34,197,94,0.15)", borderWidth: 2, borderColor: "rgba(34,197,94,0.4)" },
  swipeHint: { flex: 1, alignItems: "center" },
  swipeHintText: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
  // Results
  resultHeader: { alignItems: "center", paddingTop: 24, paddingBottom: 16 },
  resultIconWrap: { width: 72, height: 72, borderRadius: 36, overflow: "hidden", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  resultTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold" },
  resultSub: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular", marginTop: 6, textAlign: "center" },
  topTypeCard: { borderRadius: 20, overflow: "hidden", padding: 24, alignItems: "center", marginBottom: 24, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  topTypeLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700", letterSpacing: 2, marginBottom: 8 },
  topTypeName: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", fontFamily: "Chillax-Bold" },
  topTypeScore: { color: "#6443F4", fontSize: 16, fontWeight: "700", fontFamily: "Satoshi-Bold", marginTop: 4 },
  dimsTitle: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "700", fontFamily: "Satoshi-Medium", letterSpacing: 1, marginBottom: 16 },
  dimRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  dimLeft: { flexDirection: "row", alignItems: "center", gap: 8, width: 120 },
  dimIcon: { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  dimLabel: { color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  dimBarWrap: { flex: 1, height: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" },
  dimBarFill: { height: 6, borderRadius: 3 },
  dimScore: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "700", fontFamily: "Satoshi-Bold", width: 28, textAlign: "right" },
  xpCard: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 16, overflow: "hidden", padding: 18, marginTop: 24, marginBottom: 16 },
  xpTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  xpSub: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 },
  ctaBtn: { borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 18, marginBottom: 12 },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  secondaryCta: { alignItems: "center", paddingVertical: 12 },
  secondaryCtaText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "Satoshi-Regular", textDecorationLine: "underline" },
});
