// @ts-nocheck
/**
 * TRAVI — Tinder Swipe for Attractions & Restaurants
 * Swipe right = add to trip + boost DNA score
 * Swipe left = skip + small negative signal
 * Hesitation time = strong learning signal
 *
 * Every interaction feeds the DNA engine.
 */

import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { recordSwipe, type InterestCategory } from "@/lib/dna-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirstSwipeTutorial } from "@/components/first-swipe-tutorial";
import { trackDnaSwipe, trackScreen } from "@/lib/analytics";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.35;
const ROTATION_FACTOR = 12;

interface Attraction {
  id: string;
  name: string;
  type: string;
  category: InterestCategory;
  location: string;
  destination: string; // destination code e.g. "dubai", "kyoto"
  rating: number;
  reviews: number;
  duration: string;
  price: string;
  priceLevel: "budget" | "mid" | "premium" | "luxury"; // for budget filtering
  tags: string[];
  image: any;
  description: string;
  color: string;
}

// Budget level ordering: budget < mid < premium < luxury
const BUDGET_LEVELS = ["budget", "mid", "premium", "luxury"] as const;
type BudgetLevel = typeof BUDGET_LEVELS[number];

function budgetAllows(itemLevel: BudgetLevel, userBudget: string): boolean {
  const userIdx = BUDGET_LEVELS.indexOf(userBudget as BudgetLevel);
  const itemIdx = BUDGET_LEVELS.indexOf(itemLevel);
  if (userIdx === -1) return true; // unknown budget = show all
  // Show items at or below user's budget level (luxury users see everything)
  return itemIdx <= userIdx + 1;
}

const ALL_ATTRACTIONS: Attraction[] = [
  // ── DUBAI ──
  { id: "d1", name: "Burj Khalifa Observation Deck", type: "Landmark", category: "landmarks", destination: "dubai",
    location: "Downtown Dubai", rating: 4.8, reviews: 142000, duration: "2–3 hrs", price: "$40", priceLevel: "mid",
    tags: ["Views", "Architecture", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80" },
    description: "Stand at the top of the world's tallest building. 360° views that will leave you speechless.", color: "#F94498" },
  { id: "d2", name: "Dubai Mall & Aquarium", type: "Shopping & Experience", category: "shopping", destination: "dubai",
    location: "Downtown Dubai", rating: 4.7, reviews: 210000, duration: "3–5 hrs", price: "$30", priceLevel: "mid",
    tags: ["Shopping", "Aquarium", "Family"], image: { uri: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" },
    description: "The world's largest mall with an indoor aquarium, ice rink, and 1,200+ stores.", color: "#06B6D4" },
  { id: "d3", name: "Gold Souk & Spice Souk", type: "Shopping", category: "shopping", destination: "dubai",
    location: "Deira, Dubai", rating: 4.5, reviews: 89000, duration: "2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Gold", "Bargain", "Authentic"], image: { uri: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80" },
    description: "Narrow alleyways glittering with gold and fragrant with spices. Bargain hard.", color: "#D97706" },
  { id: "d4", name: "Desert Safari & BBQ Dinner", type: "Adventure", category: "adventure", destination: "dubai",
    location: "Dubai Desert", rating: 4.8, reviews: 67000, duration: "6 hrs", price: "$80", priceLevel: "mid",
    tags: ["Dunes", "Camel", "Sunset"], image: { uri: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" },
    description: "Dune bashing, camel rides, and a BBQ dinner under the stars in the Arabian desert.", color: "#F97316" },
  { id: "d5", name: "Atlantis Aquaventure Waterpark", type: "Water Park", category: "water_sports", destination: "dubai",
    location: "Palm Jumeirah", rating: 4.7, reviews: 45000, duration: "Full day", price: "$90", priceLevel: "premium",
    tags: ["Slides", "Beach", "Family"], image: { uri: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80" },
    description: "The Middle East's best waterpark with 105 rides, a private beach, and a marine habitat.", color: "#0EA5E9" },
  { id: "d6", name: "Burj Al Arab Afternoon Tea", type: "Luxury Dining", category: "food", destination: "dubai",
    location: "Jumeirah", rating: 4.9, reviews: 12000, duration: "2 hrs", price: "$150", priceLevel: "luxury",
    tags: ["Luxury", "Iconic", "Tea"], image: { uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
    description: "Afternoon tea in the world's most iconic hotel. Gold-plated everything.", color: "#F59E0B" },
  { id: "d7", name: "Dubai Frame", type: "Landmark", category: "landmarks", destination: "dubai",
    location: "Zabeel Park", rating: 4.4, reviews: 38000, duration: "1–2 hrs", price: "$15", priceLevel: "budget",
    tags: ["Views", "Architecture", "Instagram"], image: { uri: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
    description: "A 150m picture frame with old Dubai on one side and new Dubai on the other.", color: "#A855F7" },
  { id: "d8", name: "Dubai Marina Night Walk", type: "Nightlife", category: "nightlife", destination: "dubai",
    location: "Dubai Marina", rating: 4.6, reviews: 55000, duration: "2–3 hrs", price: "Free", priceLevel: "budget",
    tags: ["Yachts", "Restaurants", "Nightlife"], image: { uri: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" },
    description: "Yacht-lined waterfront with dozens of restaurants, bars, and a buzzing atmosphere.", color: "#8B5CF6" },

  // ── KYOTO ──
  { id: "k1", name: "Fushimi Inari Shrine", type: "Cultural Site", category: "history", destination: "kyoto",
    location: "Fushimi, Kyoto", rating: 4.9, reviews: 89000, duration: "2–4 hrs", price: "Free", priceLevel: "budget",
    tags: ["Torii Gates", "Spiritual", "Hiking"], image: { uri: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80" },
    description: "Thousands of vermillion torii gates winding up a sacred mountain. Pure magic at dawn.", color: "#F97316" },
  { id: "k2", name: "Arashiyama Bamboo Grove", type: "Nature", category: "nature", destination: "kyoto",
    location: "Arashiyama, Kyoto", rating: 4.7, reviews: 72000, duration: "1–2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Bamboo", "Photography", "Zen"], image: { uri: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80" },
    description: "Walk through towering bamboo stalks that creak and sway in the wind. Otherworldly.", color: "#22C55E" },
  { id: "k3", name: "Kinkaku-ji Golden Pavilion", type: "Temple", category: "art_culture", destination: "kyoto",
    location: "Kita, Kyoto", rating: 4.8, reviews: 115000, duration: "1 hr", price: "$5", priceLevel: "budget",
    tags: ["Gold", "Temple", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
    description: "A Zen temple covered in gold leaf, reflected perfectly in a mirror pond.", color: "#D97706" },
  { id: "k4", name: "Nishiki Market Food Tour", type: "Food Experience", category: "food", destination: "kyoto",
    location: "Central Kyoto", rating: 4.6, reviews: 43000, duration: "2 hrs", price: "$30", priceLevel: "mid",
    tags: ["Street Food", "Tofu", "Pickles"], image: { uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
    description: "'Kyoto's Kitchen' — 400-year-old covered market with 100+ stalls of local delicacies.", color: "#F59E0B" },
  { id: "k5", name: "Geisha District Night Walk", type: "Cultural Experience", category: "art_culture", destination: "kyoto",
    location: "Gion, Kyoto", rating: 4.7, reviews: 61000, duration: "2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Geisha", "Lanterns", "History"], image: { uri: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80" },
    description: "Cobblestone streets lined with ochaya teahouses. Spot a geiko if you're lucky.", color: "#EC4899" },

  // ── BALI ──
  { id: "b1", name: "Ubud Rice Terraces Trek", type: "Nature Walk", category: "nature", destination: "bali",
    location: "Ubud, Bali", rating: 4.7, reviews: 45000, duration: "3–4 hrs", price: "$15", priceLevel: "budget",
    tags: ["Hiking", "Nature", "Photography"], image: { uri: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
    description: "Walk through emerald-green rice terraces carved into hillsides over 2,000 years ago.", color: "#22C55E" },
  { id: "b2", name: "Tanah Lot Temple Sunset", type: "Temple", category: "landmarks", destination: "bali",
    location: "Tabanan, Bali", rating: 4.8, reviews: 78000, duration: "2 hrs", price: "$5", priceLevel: "budget",
    tags: ["Sunset", "Temple", "Ocean"], image: { uri: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80" },
    description: "A sea temple perched on a rock formation, silhouetted against a blazing sunset.", color: "#F97316" },
  { id: "b3", name: "Seminyak Beach Club Day", type: "Beach", category: "beaches", destination: "bali",
    location: "Seminyak, Bali", rating: 4.6, reviews: 52000, duration: "Full day", price: "$50", priceLevel: "premium",
    tags: ["Pool", "Beach", "Cocktails"], image: { uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
    description: "Bali's most stylish beach clubs with infinity pools, DJs, and ocean views.", color: "#06B6D4" },
  { id: "b4", name: "Balinese Cooking Class", type: "Food Experience", category: "food", destination: "bali",
    location: "Ubud, Bali", rating: 4.8, reviews: 23000, duration: "4 hrs", price: "$45", priceLevel: "mid",
    tags: ["Cooking", "Spices", "Local"], image: { uri: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80" },
    description: "Visit a local market, then cook 8 traditional dishes in an open-air kitchen.", color: "#F59E0B" },

  // ── BARCELONA ──
  { id: "bc1", name: "Sagrada Família", type: "Architecture", category: "art_culture", destination: "barcelona",
    location: "Eixample, Barcelona", rating: 4.8, reviews: 210000, duration: "1–2 hrs", price: "$30", priceLevel: "mid",
    tags: ["Gaudí", "Art", "Architecture"], image: { uri: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80" },
    description: "Gaudí's unfinished masterpiece — a cathedral that looks like it grew from the earth itself.", color: "#A855F7" },
  { id: "bc2", name: "La Boqueria Market", type: "Food Experience", category: "food", destination: "barcelona",
    location: "Las Ramblas, Barcelona", rating: 4.5, reviews: 145000, duration: "1–2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Market", "Tapas", "Fresh"], image: { uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    description: "Europe's most famous food market. Jamón, seafood, fresh fruit, and chaos.", color: "#F59E0B" },
  { id: "bc3", name: "Barceloneta Beach", type: "Beach", category: "beaches", destination: "barcelona",
    location: "Barceloneta, Barcelona", rating: 4.4, reviews: 98000, duration: "Half day", price: "Free", priceLevel: "budget",
    tags: ["Beach", "Sun", "City"], image: { uri: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80" },
    description: "City beach with golden sand, beach bars, and the Mediterranean at your feet.", color: "#06B6D4" },
  { id: "bc4", name: "Gothic Quarter Night Tour", type: "History Walk", category: "history", destination: "barcelona",
    location: "Barri Gòtic, Barcelona", rating: 4.7, reviews: 34000, duration: "2 hrs", price: "$20", priceLevel: "mid",
    tags: ["History", "Medieval", "Night"], image: { uri: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80" },
    description: "2,000 years of history in a labyrinth of narrow streets. Roman ruins under your feet.", color: "#D97706" },

  // ── PARIS ──
  { id: "p1", name: "Eiffel Tower at Sunset", type: "Landmark", category: "landmarks", destination: "paris",
    location: "Champ de Mars, Paris", rating: 4.9, reviews: 320000, duration: "2–3 hrs", price: "$30", priceLevel: "mid",
    tags: ["Iconic", "Views", "Romance"], image: { uri: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80" },
    description: "Watch the iron lady sparkle at night from the Trocadéro. The most romantic view on earth.", color: "#F94498" },
  { id: "p2", name: "Louvre Museum", type: "Museum", category: "art_culture", destination: "paris",
    location: "1st Arr., Paris", rating: 4.7, reviews: 280000, duration: "3–5 hrs", price: "$20", priceLevel: "mid",
    tags: ["Art", "Mona Lisa", "History"], image: { uri: "https://images.unsplash.com/photo-1565799557186-3c6c4b5a3a1e?w=600&q=80" },
    description: "The world's largest art museum. 35,000 works including the Mona Lisa and Venus de Milo.", color: "#D97706" },
  { id: "p3", name: "Montmartre & Sacré-Cœur", type: "Neighborhood", category: "history", destination: "paris",
    location: "18th Arr., Paris", rating: 4.8, reviews: 195000, duration: "2–3 hrs", price: "Free", priceLevel: "budget",
    tags: ["Artists", "Views", "Bohemian"], image: { uri: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" },
    description: "Cobblestone streets, street artists, and the white dome of Sacré-Cœur overlooking Paris.", color: "#8B5CF6" },
  { id: "p4", name: "Seine River Cruise", type: "Experience", category: "landmarks", destination: "paris",
    location: "Seine River, Paris", rating: 4.6, reviews: 87000, duration: "1 hr", price: "$18", priceLevel: "mid",
    tags: ["Cruise", "Views", "Romantic"], image: { uri: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600&q=80" },
    description: "Glide past Notre-Dame, the Louvre, and the Eiffel Tower from the water. Magical at night.", color: "#06B6D4" },
  { id: "p5", name: "Le Marais Food & Shopping", type: "Shopping & Food", category: "shopping", destination: "paris",
    location: "3rd & 4th Arr., Paris", rating: 4.7, reviews: 112000, duration: "3–4 hrs", price: "Free", priceLevel: "budget",
    tags: ["Falafel", "Boutiques", "Trendy"], image: { uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    description: "Paris's hippest neighborhood. World-famous falafel, vintage shops, and hidden courtyards.", color: "#F97316" },
  { id: "p6", name: "Versailles Palace & Gardens", type: "Palace", category: "history", destination: "paris",
    location: "Versailles (40 min)", rating: 4.8, reviews: 145000, duration: "Full day", price: "$22", priceLevel: "mid",
    tags: ["Royal", "Gardens", "History"], image: { uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
    description: "The Sun King's palace with 2,000 rooms and 800 hectares of manicured gardens.", color: "#D97706" },
  { id: "p7", name: "Café de Flore Breakfast", type: "Café", category: "food", destination: "paris",
    location: "Saint-Germain, Paris", rating: 4.5, reviews: 43000, duration: "1 hr", price: "$25", priceLevel: "mid",
    tags: ["Café", "Croissant", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
    description: "Breakfast at Paris's most legendary café. Croissants, café au lait, and intellectual history.", color: "#F59E0B" },
  { id: "p8", name: "Moulin Rouge Show", type: "Nightlife", category: "nightlife", destination: "paris",
    location: "Pigalle, Paris", rating: 4.7, reviews: 38000, duration: "2 hrs", price: "$120", priceLevel: "premium",
    tags: ["Cabaret", "Cancan", "Show"], image: { uri: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80" },
    description: "The world's most famous cabaret. Feathers, sequins, and the original cancan since 1889.", color: "#EC4899" },

  // ── NEW YORK ──
  { id: "ny1", name: "Central Park", type: "Park", category: "nature", destination: "new york",
    location: "Manhattan, NYC", rating: 4.8, reviews: 250000, duration: "2–4 hrs", price: "Free", priceLevel: "budget",
    tags: ["Park", "Skyline", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&q=80" },
    description: "843 acres of green in the heart of Manhattan. Rowboats, concerts, and the Bethesda Fountain.", color: "#22C55E" },
  { id: "ny2", name: "Top of the Rock", type: "Landmark", category: "landmarks", destination: "new york",
    location: "Midtown, NYC", rating: 4.8, reviews: 130000, duration: "1–2 hrs", price: "$40", priceLevel: "mid",
    tags: ["Views", "Skyline", "Empire State"], image: { uri: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=80" },
    description: "The best view of Manhattan — including the Empire State Building. Especially stunning at dusk.", color: "#6443F4" },
  { id: "ny3", name: "Brooklyn Bridge Walk", type: "Walk", category: "landmarks", destination: "new york",
    location: "Brooklyn, NYC", rating: 4.7, reviews: 98000, duration: "1 hr", price: "Free", priceLevel: "budget",
    tags: ["Bridge", "Views", "Photography"], image: { uri: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80" },
    description: "Walk across one of the world's most iconic bridges with stunning Manhattan skyline views.", color: "#D97706" },
  { id: "ny4", name: "Chelsea Market & High Line", type: "Food & Walk", category: "food", destination: "new york",
    location: "Chelsea, NYC", rating: 4.6, reviews: 75000, duration: "2–3 hrs", price: "Free", priceLevel: "budget",
    tags: ["Food Hall", "Park", "Art"], image: { uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    description: "NYC's best food hall then a walk on an elevated park built on old railway tracks.", color: "#F97316" },

  // ── MALDIVES ──
  { id: "mv1", name: "Overwater Villa Stay", type: "Accommodation", category: "beaches", destination: "maldives",
    location: "North Malé Atoll", rating: 4.9, reviews: 32000, duration: "Full day", price: "$500", priceLevel: "luxury",
    tags: ["Overwater", "Luxury", "Ocean"], image: { uri: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80" },
    description: "Wake up above turquoise water. Step off your deck into a private lagoon. Pure paradise.", color: "#06B6D4" },
  { id: "mv2", name: "Snorkeling with Manta Rays", type: "Water Sport", category: "water_sports", destination: "maldives",
    location: "Hanifaru Bay", rating: 4.9, reviews: 18000, duration: "3 hrs", price: "$80", priceLevel: "premium",
    tags: ["Manta Rays", "Snorkeling", "Wildlife"], image: { uri: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" },
    description: "Swim alongside dozens of manta rays in one of the world's best snorkeling spots.", color: "#0EA5E9" },
  { id: "mv3", name: "Sunset Dolphin Cruise", type: "Experience", category: "nature", destination: "maldives",
    location: "Indian Ocean", rating: 4.8, reviews: 24000, duration: "2 hrs", price: "$60", priceLevel: "premium",
    tags: ["Dolphins", "Sunset", "Cruise"], image: { uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
    description: "Watch spinner dolphins leap at sunset from a traditional dhoni boat.", color: "#F97316" },

  // ── SANTORINI ──
  { id: "s1", name: "Oia Sunset", type: "Experience", category: "landmarks", destination: "santorini",
    location: "Oia, Santorini", rating: 4.9, reviews: 145000, duration: "2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Sunset", "Blue Domes", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80" },
    description: "The most photographed sunset in the world. Blue domes, white walls, and a blazing sky.", color: "#F97316" },
  { id: "s2", name: "Caldera Boat Tour", type: "Cruise", category: "water_sports", destination: "santorini",
    location: "Fira, Santorini", rating: 4.8, reviews: 67000, duration: "6 hrs", price: "$90", priceLevel: "premium",
    tags: ["Volcano", "Hot Springs", "Cruise"], image: { uri: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80" },
    description: "Sail around the volcanic caldera, swim in hot springs, and snorkel in crystal-clear water.", color: "#06B6D4" },
  { id: "s3", name: "Wine Tasting at Sunset Winery", type: "Food & Drink", category: "food", destination: "santorini",
    location: "Pyrgos, Santorini", rating: 4.7, reviews: 28000, duration: "2 hrs", price: "$45", priceLevel: "mid",
    tags: ["Wine", "Volcano", "Views"], image: { uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
    description: "Assyrtiko wine grown in volcanic soil. Taste it with caldera views at a clifftop winery.", color: "#D97706" },

  // ── TOKYO ──
  { id: "t1", name: "Shibuya Crossing", type: "Landmark", category: "landmarks", destination: "tokyo",
    location: "Shibuya, Tokyo", rating: 4.7, reviews: 187000, duration: "30 min", price: "Free", priceLevel: "budget",
    tags: ["Iconic", "Crowds", "Photography"], image: { uri: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" },
    description: "The world's busiest pedestrian crossing. 3,000 people cross at once. Pure Tokyo energy.", color: "#F94498" },
  { id: "t2", name: "Tsukiji Outer Market", type: "Food Experience", category: "food", destination: "tokyo",
    location: "Chuo, Tokyo", rating: 4.7, reviews: 92000, duration: "2 hrs", price: "$20", priceLevel: "mid",
    tags: ["Sushi", "Seafood", "Morning"], image: { uri: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80" },
    description: "The world's freshest sushi at 6am. Tuna, sea urchin, and tamagoyaki straight from the source.", color: "#F59E0B" },
  { id: "t3", name: "Shinjuku Nightlife", type: "Nightlife", category: "nightlife", destination: "tokyo",
    location: "Shinjuku, Tokyo", rating: 4.6, reviews: 73000, duration: "4 hrs", price: "$30", priceLevel: "mid",
    tags: ["Bars", "Neon", "Izakaya"], image: { uri: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80" },
    description: "200 bars in one block. Golden Gai, Robot Restaurant, and izakayas that never close.", color: "#8B5CF6" },
  { id: "t4", name: "teamLab Planets", type: "Art Experience", category: "art_culture", destination: "tokyo",
    location: "Toyosu, Tokyo", rating: 4.9, reviews: 41000, duration: "2 hrs", price: "$35", priceLevel: "mid",
    tags: ["Digital Art", "Immersive", "Unique"], image: { uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
    description: "Walk through rooms of infinite mirrors, floating flowers, and digital waterfalls. Mind-bending.", color: "#EC4899" },
  { id: "t5", name: "Senso-ji Temple at Dawn", type: "Temple", category: "history", destination: "tokyo",
    location: "Asakusa, Tokyo", rating: 4.8, reviews: 88000, duration: "1.5 hrs", price: "Free", priceLevel: "budget",
    tags: ["Temple", "History", "Peaceful"], image: { uri: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80" },
    description: "Tokyo's oldest temple before the crowds arrive. Incense, lanterns, and centuries of history.", color: "#F59E0B" },
  { id: "t6", name: "Harajuku Takeshita Street", type: "Shopping", category: "shopping", destination: "tokyo",
    location: "Harajuku, Tokyo", rating: 4.5, reviews: 65000, duration: "2 hrs", price: "$50", priceLevel: "mid",
    tags: ["Fashion", "Crepes", "Youth Culture"], image: { uri: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80" },
    description: "Japan's fashion epicenter. Cosplay, kawaii crepes, and street style that defies reality.", color: "#EC4899" },
  { id: "t7", name: "Mount Fuji Day Trip", type: "Nature", category: "nature", destination: "tokyo",
    location: "Fuji Five Lakes", rating: 4.9, reviews: 120000, duration: "Full day", price: "$80", priceLevel: "mid",
    tags: ["Iconic", "Nature", "Photography"], image: { uri: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=600&q=80" },
    description: "Japan's sacred volcano. Climb to the summit or photograph from the lakes below at sunrise.", color: "#3B82F6" },
  { id: "t8", name: "Akihabara Electronics & Anime", type: "Shopping", category: "shopping", destination: "tokyo",
    location: "Akihabara, Tokyo", rating: 4.6, reviews: 55000, duration: "3 hrs", price: "$100", priceLevel: "mid",
    tags: ["Tech", "Anime", "Gaming"], image: { uri: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80" },
    description: "7 floors of electronics, anime figurines, and retro games. Nerd paradise in neon.", color: "#8B5CF6" },
  // ─── Rome ───────────────────────────────────────────────────────────────────
  { id: "r1", name: "Colosseum & Roman Forum", type: "Historical Site", category: "history", destination: "rome",
    location: "Rome, Italy", rating: 4.9, reviews: 210000, duration: "3 hrs", price: "$22", priceLevel: "mid",
    tags: ["Ancient", "History", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" },
    description: "Walk where gladiators fought. 2,000 years of history in one breathtaking arena.", color: "#F59E0B" },
  { id: "r2", name: "Vatican Museums & Sistine Chapel", type: "Museum", category: "art_culture", destination: "rome",
    location: "Vatican City", rating: 4.8, reviews: 180000, duration: "4 hrs", price: "$25", priceLevel: "mid",
    tags: ["Art", "History", "Michelangelo"], image: { uri: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&q=80" },
    description: "Michelangelo's ceiling will stop you in your tracks. The greatest art collection on Earth.", color: "#8B5CF6" },
  { id: "r3", name: "Trevi Fountain at Night", type: "Landmark", category: "landmarks", destination: "rome",
    location: "Trevi, Rome", rating: 4.7, reviews: 95000, duration: "30 min", price: "Free", priceLevel: "budget",
    tags: ["Romantic", "Iconic", "Photography"], image: { uri: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=600&q=80" },
    description: "Throw a coin, make a wish. The most beautiful fountain in the world glows at midnight.", color: "#3B82F6" },
  { id: "r4", name: "Trastevere Food Walk", type: "Food Experience", category: "food", destination: "rome",
    location: "Trastevere, Rome", rating: 4.8, reviews: 42000, duration: "3 hrs", price: "$45", priceLevel: "mid",
    tags: ["Pasta", "Wine", "Local"], image: { uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
    description: "Cobblestone alleys, cacio e pepe, and Aperol spritz. Rome's most authentic neighborhood.", color: "#EF4444" },
  { id: "r5", name: "Pantheon & Piazza Navona", type: "Historical Site", category: "history", destination: "rome",
    location: "Historic Center, Rome", rating: 4.8, reviews: 78000, duration: "2 hrs", price: "$5", priceLevel: "budget",
    tags: ["Ancient", "Architecture", "Piazza"], image: { uri: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=600&q=80" },
    description: "A 2,000-year-old temple still perfectly intact. Then gelato at Piazza Navona.", color: "#F59E0B" },
  { id: "r6", name: "Aperitivo at Campo de Fiori", type: "Nightlife", category: "nightlife", destination: "rome",
    location: "Campo de Fiori, Rome", rating: 4.6, reviews: 31000, duration: "2 hrs", price: "$20", priceLevel: "mid",
    tags: ["Wine", "Social", "Outdoor"], image: { uri: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&q=80" },
    description: "Romans gather here every evening. Wine, bruschetta, and the best people-watching in Italy.", color: "#EC4899" },
  // ─── London ─────────────────────────────────────────────────────────────────
  { id: "l1", name: "Tower of London & Crown Jewels", type: "Historical Site", category: "history", destination: "london",
    location: "Tower Hill, London", rating: 4.7, reviews: 145000, duration: "3 hrs", price: "30 GBP", priceLevel: "mid",
    tags: ["History", "Royalty", "Medieval"], image: { uri: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
    description: "900 years of royal history. The Crown Jewels, the ravens, and the ghost of Anne Boleyn.", color: "#F59E0B" },
  { id: "l2", name: "Borough Market Food Tour", type: "Food Experience", category: "food", destination: "london",
    location: "Southwark, London", rating: 4.8, reviews: 67000, duration: "2 hrs", price: "$40", priceLevel: "mid",
    tags: ["Street Food", "Local", "Artisan"], image: { uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    description: "London's oldest food market. Cheese, charcuterie, and street food from 100 countries.", color: "#EF4444" },
  { id: "l3", name: "Tate Modern & South Bank", type: "Museum", category: "art_culture", destination: "london",
    location: "Southwark, London", rating: 4.7, reviews: 89000, duration: "3 hrs", price: "Free", priceLevel: "budget",
    tags: ["Modern Art", "Architecture", "Free"], image: { uri: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&q=80" },
    description: "World-class modern art in a converted power station. Free entry, priceless views of the Thames.", color: "#8B5CF6" },
  { id: "l4", name: "Notting Hill & Portobello Market", type: "Shopping", category: "shopping", destination: "london",
    location: "Notting Hill, London", rating: 4.6, reviews: 52000, duration: "3 hrs", price: "$60", priceLevel: "mid",
    tags: ["Vintage", "Colorful", "Market"], image: { uri: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=80" },
    description: "Pastel houses, vintage records, and antique treasures. London's most photogenic neighborhood.", color: "#EC4899" },
  { id: "l5", name: "Shoreditch Street Art & Nightlife", type: "Nightlife", category: "nightlife", destination: "london",
    location: "Shoreditch, London", rating: 4.7, reviews: 38000, duration: "4 hrs", price: "$30", priceLevel: "mid",
    tags: ["Street Art", "Bars", "Creative"], image: { uri: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
    description: "Banksy's backyard. Street art, craft cocktails, and London's most creative crowd.", color: "#F94498" },
  // ─── Amsterdam ──────────────────────────────────────────────────────────────
  { id: "am1", name: "Rijksmuseum & Vermeer", type: "Museum", category: "art_culture", destination: "amsterdam",
    location: "Museum Quarter, Amsterdam", rating: 4.8, reviews: 92000, duration: "3 hrs", price: "22 EUR", priceLevel: "mid",
    tags: ["Rembrandt", "Dutch Masters", "Art"], image: { uri: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80" },
    description: "Rembrandt's Night Watch in real life. The greatest Dutch art collection in the world.", color: "#8B5CF6" },
  { id: "am2", name: "Canal Boat Tour at Sunset", type: "Experience", category: "landmarks", destination: "amsterdam",
    location: "Amsterdam Canals", rating: 4.8, reviews: 71000, duration: "2 hrs", price: "25 EUR", priceLevel: "mid",
    tags: ["Canals", "Romantic", "Photography"], image: { uri: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80" },
    description: "165 canals, 1,500 bridges. Glide through Amsterdam's UNESCO waterways at golden hour.", color: "#3B82F6" },
  { id: "am3", name: "Jordaan Neighborhood Walk", type: "Neighborhood", category: "history", destination: "amsterdam",
    location: "Jordaan, Amsterdam", rating: 4.7, reviews: 45000, duration: "2 hrs", price: "Free", priceLevel: "budget",
    tags: ["Charming", "Local", "Cafes"], image: { uri: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80" },
    description: "Amsterdam's most charming neighborhood. Boutiques, brown cafes, and hidden courtyards.", color: "#F59E0B" },
  { id: "am4", name: "Heineken Experience", type: "Brewery Tour", category: "food", destination: "amsterdam",
    location: "De Pijp, Amsterdam", rating: 4.5, reviews: 58000, duration: "2 hrs", price: "25 EUR", priceLevel: "mid",
    tags: ["Beer", "Interactive", "Fun"], image: { uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
    description: "The original Heineken brewery turned into an immersive experience. Brew your own beer.", color: "#22C55E" },
  // ─── Singapore ──────────────────────────────────────────────────────────────
  { id: "sg1", name: "Gardens by the Bay at Night", type: "Landmark", category: "landmarks", destination: "singapore",
    location: "Marina Bay, Singapore", rating: 4.9, reviews: 135000, duration: "2 hrs", price: "$28", priceLevel: "mid",
    tags: ["Futuristic", "Nature", "Light Show"], image: { uri: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80" },
    description: "Supertrees that glow in the dark. The most futuristic garden on Earth.", color: "#22C55E" },
  { id: "sg2", name: "Hawker Centre Food Crawl", type: "Food Experience", category: "food", destination: "singapore",
    location: "Maxwell, Singapore", rating: 4.9, reviews: 88000, duration: "2 hrs", price: "$15", priceLevel: "budget",
    tags: ["Hawker Food", "Cheap", "Authentic"], image: { uri: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80" },
    description: "Michelin-starred chicken rice for $3. Singapore's hawker culture is UNESCO-listed.", color: "#F59E0B" },
  { id: "sg3", name: "Marina Bay Sands Infinity Pool", type: "Luxury", category: "wellness", destination: "singapore",
    location: "Marina Bay, Singapore", rating: 4.8, reviews: 62000, duration: "Half day", price: "$30", priceLevel: "mid",
    tags: ["Infinity Pool", "Views", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80" },
    description: "57 floors up, the world's most famous rooftop pool. The Singapore skyline from above.", color: "#3B82F6" },
  { id: "sg4", name: "Chinatown & Little India", type: "Cultural Walk", category: "art_culture", destination: "singapore",
    location: "Central Singapore", rating: 4.6, reviews: 48000, duration: "3 hrs", price: "Free", priceLevel: "budget",
    tags: ["Culture", "Food", "Photography"], image: { uri: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80" },
    description: "Four cultures in one city. Temples, mosques, churches, and the best laksa you'll ever eat.", color: "#EC4899" },
  // ─── Marrakech ──────────────────────────────────────────────────────────────
  { id: "mk1", name: "Jemaa el-Fna Square at Night", type: "Cultural Experience", category: "art_culture", destination: "marrakech",
    location: "Medina, Marrakech", rating: 4.8, reviews: 73000, duration: "3 hrs", price: "$10", priceLevel: "budget",
    tags: ["Vibrant", "Food", "Entertainment"], image: { uri: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80" },
    description: "Snake charmers, storytellers, and 100 food stalls. The most alive square in Africa.", color: "#F59E0B" },
  { id: "mk2", name: "Majorelle Garden", type: "Garden", category: "nature", destination: "marrakech",
    location: "Gueliz, Marrakech", rating: 4.7, reviews: 55000, duration: "1.5 hrs", price: "$15", priceLevel: "budget",
    tags: ["Garden", "Yves Saint Laurent", "Photography"], image: { uri: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80" },
    description: "Yves Saint Laurent's electric blue garden. Cacti, fountains, and Moroccan tiles.", color: "#3B82F6" },
  { id: "mk3", name: "Medina Souk Shopping", type: "Shopping", category: "shopping", destination: "marrakech",
    location: "Medina, Marrakech", rating: 4.6, reviews: 41000, duration: "3 hrs", price: "$50", priceLevel: "budget",
    tags: ["Spices", "Leather", "Bargaining"], image: { uri: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80" },
    description: "Get lost in 9,000 alleys of spices, leather, and lanterns. Bargaining is mandatory.", color: "#EF4444" },
  { id: "mk4", name: "Sahara Desert Overnight", type: "Adventure", category: "adventure", destination: "marrakech",
    location: "Merzouga, Morocco", rating: 4.9, reviews: 28000, duration: "2 days", price: "$120", priceLevel: "mid",
    tags: ["Desert", "Camel", "Stars"], image: { uri: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" },
    description: "Camel trek at sunset, sleep in a Berber tent, wake up to the Sahara at dawn.", color: "#F59E0B" },
  // ─── Cape Town ──────────────────────────────────────────────────────────────
  { id: "ct1", name: "Table Mountain Cable Car", type: "Nature", category: "nature", destination: "cape town",
    location: "Table Mountain, Cape Town", rating: 4.9, reviews: 98000, duration: "3 hrs", price: "$25", priceLevel: "mid",
    tags: ["Views", "Hiking", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80" },
    description: "Flat-topped mountain above the ocean. The best views in Africa, full stop.", color: "#3B82F6" },
  { id: "ct2", name: "Cape Point & Boulders Beach Penguins", type: "Nature", category: "nature", destination: "cape town",
    location: "Cape Peninsula", rating: 4.8, reviews: 72000, duration: "Full day", price: "$30", priceLevel: "mid",
    tags: ["Penguins", "Scenic Drive", "Nature"], image: { uri: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80" },
    description: "African penguins on a white sand beach, then the dramatic cliffs where two oceans meet.", color: "#22C55E" },
  { id: "ct3", name: "V&A Waterfront & Wine Tasting", type: "Food & Drink", category: "food", destination: "cape town",
    location: "V&A Waterfront, Cape Town", rating: 4.7, reviews: 55000, duration: "3 hrs", price: "$40", priceLevel: "mid",
    tags: ["Wine", "Seafood", "Views"], image: { uri: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80" },
    description: "World-class Cape wines, fresh crayfish, and Table Mountain as your backdrop.", color: "#8B5CF6" },
  // ─── Wellness (global) ─────────────────────────────────────────────────────────
  { id: "w1", name: "Ubud Yoga & Meditation Retreat", type: "Wellness", category: "wellness", destination: "bali",
    location: "Ubud, Bali", rating: 4.9, reviews: 18000, duration: "Full day", price: "$80", priceLevel: "mid",
    tags: ["Yoga", "Meditation", "Jungle"], image: { uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80" },
    description: "Morning yoga in a jungle pavilion, followed by sound healing and a plant-based feast.", color: "#22C55E" },
  { id: "w2", name: "Turkish Hammam Experience", type: "Wellness", category: "wellness", destination: "istanbul",
    location: "Sultanahmet, Istanbul", rating: 4.8, reviews: 32000, duration: "2 hrs", price: "$50", priceLevel: "mid",
    tags: ["Hammam", "Relaxation", "Traditional"], image: { uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80" },
    description: "500-year-old marble hammam. Scrub, steam, and soap massage. You'll feel reborn.", color: "#3B82F6" },
  { id: "w3", name: "Blue Lagoon Geothermal Spa", type: "Wellness", category: "wellness", destination: "reykjavik",
    location: "Grindavik, Iceland", rating: 4.8, reviews: 85000, duration: "3 hrs", price: "$80", priceLevel: "mid",
    tags: ["Geothermal", "Relaxation", "Unique"], image: { uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80" },
    description: "Milky blue geothermal waters in a lava field. The most surreal spa on Earth.", color: "#3B82F6" },
  { id: "w4", name: "Onsen Ryokan Stay", type: "Wellness", category: "wellness", destination: "kyoto",
    location: "Arashiyama, Kyoto", rating: 4.9, reviews: 22000, duration: "Overnight", price: "$250", priceLevel: "premium",
    tags: ["Onsen", "Ryokan", "Traditional"], image: { uri: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80" },
    description: "Sleep in a traditional inn, soak in a private hot spring, and eat a 12-course kaiseki dinner.", color: "#F59E0B" },
  // ─── Adventure (global) ──────────────────────────────────────────────────────
  { id: "adv1", name: "Skydiving over Palm Jumeirah", type: "Adventure", category: "adventure", destination: "dubai",
    location: "Palm Jumeirah, Dubai", rating: 4.9, reviews: 12000, duration: "3 hrs", price: "$600", priceLevel: "luxury",
    tags: ["Skydiving", "Adrenaline", "Views"], image: { uri: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=600&q=80" },
    description: "Freefall at 13,000ft over the Palm. The most dramatic view of Dubai from above.", color: "#EF4444" },
  { id: "adv2", name: "Northern Lights Snowmobile", type: "Adventure", category: "adventure", destination: "reykjavik",
    location: "Reykjavik, Iceland", rating: 4.8, reviews: 22000, duration: "4 hrs", price: "$180", priceLevel: "mid",
    tags: ["Aurora", "Snowmobile", "Arctic"], image: { uri: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80" },
    description: "Race across a glacier at midnight under dancing green and purple auroras.", color: "#8B5CF6" },
  { id: "adv3", name: "Whitewater Rafting Bali", type: "Adventure", category: "adventure", destination: "bali",
    location: "Ayung River, Bali", rating: 4.7, reviews: 31000, duration: "3 hrs", price: "$35", priceLevel: "mid",
    tags: ["Rafting", "Jungle", "Adrenaline"], image: { uri: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
    description: "Paddle through jungle gorges and rice paddies on Bali's most thrilling river.", color: "#22C55E" },
  { id: "adv4", name: "Paragliding over Interlaken", type: "Adventure", category: "adventure", destination: "interlaken",
    location: "Interlaken, Switzerland", rating: 4.9, reviews: 19000, duration: "2 hrs", price: "$180", priceLevel: "mid",
    tags: ["Paragliding", "Alps", "Views"], image: { uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80" },
    description: "Soar over Swiss Alps and turquoise lakes. The most beautiful flight of your life.", color: "#3B82F6" },
  // ─── Luxury (global) ─────────────────────────────────────────────────────────
  { id: "lux1", name: "Overwater Bungalow Maldives", type: "Luxury Stay", category: "wellness", destination: "maldives",
    location: "North Male Atoll", rating: 5.0, reviews: 9800, duration: "3 nights", price: "$1,200/night", priceLevel: "luxury",
    tags: ["Overwater", "Private", "Snorkeling"], image: { uri: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80" },
    description: "Your own private villa above a turquoise lagoon. Glass floor, direct ocean access.", color: "#3B82F6" },
  { id: "lux2", name: "Private Yacht Charter Santorini", type: "Luxury", category: "wellness", destination: "santorini",
    location: "Santorini, Greece", rating: 4.9, reviews: 6200, duration: "Full day", price: "$800", priceLevel: "luxury",
    tags: ["Yacht", "Private", "Caldera"], image: { uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
    description: "Sail around the caldera, swim in volcanic hot springs, and watch the sunset from the sea.", color: "#F59E0B" },
  { id: "lux3", name: "Michelin Star Dinner Paris", type: "Luxury Dining", category: "wellness", destination: "paris",
    location: "8th Arrondissement, Paris", rating: 4.9, reviews: 4100, duration: "3 hrs", price: "$350", priceLevel: "luxury",
    tags: ["Michelin", "French Cuisine", "Wine"], image: { uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
    description: "A 3-Michelin-star experience. 12 courses, 6 wine pairings, and a memory that lasts forever.", color: "#EC4899" },
  // ─── Family (global) ─────────────────────────────────────────────────────────
  { id: "fam1", name: "Disneyland Tokyo", type: "Theme Park", category: "landmarks", destination: "tokyo",
    location: "Urayasu, Chiba", rating: 4.9, reviews: 145000, duration: "Full day", price: "$80", priceLevel: "mid",
    tags: ["Disney", "Family", "Rides"], image: { uri: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80" },
    description: "The cleanest, most magical Disney park in the world. Unique rides and Japanese hospitality.", color: "#EC4899" },
  { id: "fam2", name: "Singapore Zoo & Night Safari", type: "Zoo", category: "landmarks", destination: "singapore",
    location: "Mandai, Singapore", rating: 4.8, reviews: 68000, duration: "Full day", price: "$45", priceLevel: "mid",
    tags: ["Animals", "Kids", "Night Safari"], image: { uri: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80" },
    description: "The world's best open-concept zoo by day, then the only night safari on Earth after dark.", color: "#22C55E" },
  { id: "fam3", name: "LEGOLAND Dubai", type: "Theme Park", category: "landmarks", destination: "dubai",
    location: "Dubai Parks, Dubai", rating: 4.7, reviews: 35000, duration: "Full day", price: "$60", priceLevel: "mid",
    tags: ["LEGO", "Kids", "Rides"], image: { uri: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80" },
    description: "A world built entirely from LEGO bricks. Kids lose their minds. Parents too.", color: "#F59E0B" },
  // ─── Istanbul ─────────────────────────────────────────────────────────────────
  { id: "ist1", name: "Hagia Sophia & Blue Mosque", type: "Historical Site", category: "history", destination: "istanbul",
    location: "Sultanahmet, Istanbul", rating: 4.9, reviews: 185000, duration: "3 hrs", price: "Free", priceLevel: "budget",
    tags: ["Byzantine", "Ottoman", "Iconic"], image: { uri: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80" },
    description: "1,500 years of history in one building. The greatest architectural achievement of the ancient world.", color: "#8B5CF6" },
  { id: "ist2", name: "Grand Bazaar Shopping", type: "Shopping", category: "shopping", destination: "istanbul",
    location: "Fatih, Istanbul", rating: 4.5, reviews: 92000, duration: "3 hrs", price: "$50", priceLevel: "budget",
    tags: ["Spices", "Carpets", "Jewelry"], image: { uri: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80" },
    description: "4,000 shops in 61 covered streets. The world's oldest and largest covered market.", color: "#F59E0B" },
  { id: "ist3", name: "Bosphorus Sunset Cruise", type: "Experience", category: "landmarks", destination: "istanbul",
    location: "Bosphorus Strait", rating: 4.8, reviews: 67000, duration: "2 hrs", price: "$25", priceLevel: "mid",
    tags: ["Cruise", "Sunset", "Two Continents"], image: { uri: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80" },
    description: "Sail between Europe and Asia at sunset. Palaces, mosques, and the Bosphorus Bridge.", color: "#3B82F6" },
  { id: "ist4", name: "Karakoy Street Food Tour", type: "Food Experience", category: "food", destination: "istanbul",
    location: "Karakoy, Istanbul", rating: 4.7, reviews: 38000, duration: "3 hrs", price: "$30", priceLevel: "budget",
    tags: ["Baklava", "Kebab", "Tea"], image: { uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
    description: "Baklava dripping with honey, simit with cheese, and tea in a tulip glass. Istanbul on a plate.", color: "#EF4444" },
  // ─── New York (additional) ─────────────────────────────────────────────────────
  { id: "ny5", name: "Brooklyn Street Art & Food", type: "Cultural Walk", category: "art_culture", destination: "new york",
    location: "Williamsburg, Brooklyn", rating: 4.7, reviews: 42000, duration: "3 hrs", price: "$30", priceLevel: "mid",
    tags: ["Street Art", "Brunch", "Hipster"], image: { uri: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80" },
    description: "Murals, vintage shops, and the best brunch in the world. Brooklyn is cooler than Manhattan.", color: "#F94498" },
  { id: "ny6", name: "Jazz Club in Harlem", type: "Nightlife", category: "nightlife", destination: "new york",
    location: "Harlem, New York", rating: 4.8, reviews: 18000, duration: "3 hrs", price: "$40", priceLevel: "mid",
    tags: ["Jazz", "Live Music", "History"], image: { uri: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" },
    description: "Where jazz was born. Live music, cocktails, and a crowd that knows how to listen.", color: "#8B5CF6" },
  { id: "ny7", name: "Chelsea Market & High Line", type: "Food & Walk", category: "food", destination: "new york",
    location: "Chelsea, New York", rating: 4.7, reviews: 65000, duration: "3 hrs", price: "$25", priceLevel: "mid",
    tags: ["Food Hall", "Park", "Architecture"], image: { uri: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80" },
    description: "Artisan food market, then a walk on the elevated park built on old railway tracks.", color: "#22C55E" },
];

export default function SwipeScreen() {
  const insets = useSafeAreaInsets();
  const { tripId, interests, destination, budget, foodCuisines, foodAvoid, foodAllergies } = useLocalSearchParams<{ tripId: string; interests: string; destination: string; budget: string; foodCuisines?: string; foodAvoid?: string; foodAllergies?: string }>();

  // 1. Filter by destination (case-insensitive, also handle multi-word like "New York")
  const destKey = destination ? destination.toLowerCase().trim() : "";
  const destFiltered = destKey
    ? ALL_ATTRACTIONS.filter((a) => a.destination === destKey)
    : ALL_ATTRACTIONS;

  // 2. Filter by budget level
  const budgetFiltered = budget
    ? destFiltered.filter((a) => budgetAllows(a.priceLevel, budget))
    : destFiltered;

  // 3. Filter restaurants by food preferences (if provided)
  const cuisineList = foodCuisines ? foodCuisines.split(",").map((c) => c.toLowerCase()) : [];
  const avoidList = foodAvoid ? foodAvoid.split(",").map((a) => a.toLowerCase()) : [];
  const allergyList = foodAllergies ? foodAllergies.split(",").map((a) => a.toLowerCase()) : [];

  const foodFiltered = budgetFiltered.filter((a) => {
    if (a.category !== "food") return true; // non-food items always pass

    // If user has cuisine preferences, only show matching restaurants
    if (cuisineList.length > 0) {
      const matchesCuisine = cuisineList.some((c) =>
        a.name.toLowerCase().includes(c) || a.description.toLowerCase().includes(c) || a.tags.some((t) => t.toLowerCase().includes(c))
      );
      if (!matchesCuisine) return false;
    }

    // Filter out restaurants with avoid items or allergens
    const hasAvoidItem = avoidList.some((avoid) =>
      a.name.toLowerCase().includes(avoid) || a.description.toLowerCase().includes(avoid) || a.tags.some((t) => t.toLowerCase().includes(avoid))
    );
    const hasAllergen = allergyList.some((allergy) =>
      a.name.toLowerCase().includes(allergy) || a.description.toLowerCase().includes(allergy) || a.tags.some((t) => t.toLowerCase().includes(allergy))
    );

    return !hasAvoidItem && !hasAllergen;
  });

  // 4. Sort: selected interest categories first, then rest
  const selectedInterests = interests ? interests.split(",") : [];
  const filteredAttractions = selectedInterests.length > 0
    ? [
        ...foodFiltered.filter((a) => selectedInterests.includes(a.category)),
        ...foodFiltered.filter((a) => !selectedInterests.includes(a.category)),
      ]
    : foodFiltered;

  const [cards, setCards] = useState(filteredAttractions);
  const [liked, setLiked] = useState<Attraction[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const cardAppearTime = useRef<number>(Date.now());

  const position = useRef(new Animated.ValueXY()).current;
  const nextCardScale = useRef(new Animated.Value(0.92)).current;

  const rotate = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [`-${ROTATION_FACTOR}deg`, "0deg", `${ROTATION_FACTOR}deg`],
    extrapolate: "clamp",
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD / 2],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD / 2, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Reset card appearance timer when index changes
  useEffect(() => {
    cardAppearTime.current = Date.now();
    setSwipeDirection(null);
  }, [currentIndex]);

  const handleSwipe = useCallback(
    async (direction: "left" | "right") => {
      const card = cards[currentIndex];
      if (!card) return;

      const hesitationMs = Date.now() - cardAppearTime.current;
      const liked = direction === "right";

      if (Platform.OS !== "web") {
        if (liked) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      // Record to DNA store
      await recordSwipe(card.id, card.category, liked, hesitationMs);

      if (liked) {
        setLiked((prev) => [...prev, card]);
      }

      // Animate out
      const toX = direction === "right" ? width * 1.5 : -width * 1.5;
      Animated.parallel([
        Animated.timing(position, { toValue: { x: toX, y: 0 }, duration: 280, useNativeDriver: true }),
        Animated.timing(nextCardScale, { toValue: 1, duration: 280, useNativeDriver: true }),
      ]).start(() => {
        position.setValue({ x: 0, y: 0 });
        nextCardScale.setValue(0.92);
        setCurrentIndex((i) => i + 1);
      });
    },
    [cards, currentIndex, position, nextCardScale]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gs) => {
        position.setValue({ x: gs.dx, y: gs.dy * 0.3 });
        if (gs.dx > 30) setSwipeDirection("right");
        else if (gs.dx < -30) setSwipeDirection("left");
        else setSwipeDirection(null);

        // Scale up next card as current card moves
        const progress = Math.min(Math.abs(gs.dx) / SWIPE_THRESHOLD, 1);
        nextCardScale.setValue(0.92 + progress * 0.08);
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dx > SWIPE_THRESHOLD) {
          handleSwipe("right");
        } else if (gs.dx < -SWIPE_THRESHOLD) {
          handleSwipe("left");
        } else {
          // Snap back
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            tension: 40,
            friction: 6,
          }).start();
          Animated.spring(nextCardScale, {
            toValue: 0.92,
            useNativeDriver: true,
          }).start();
          setSwipeDirection(null);
        }
      },
    })
  ).current;

  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];
  const isDone = currentIndex >= cards.length;

  if (isDone) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#0D0628", "#1A0A3D", "#0D0628"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.doneWrap}>
          {/* Glow orbs */}
          <View style={[styles.glowOrb, { backgroundColor: "rgba(249,68,152,0.18)", top: height * 0.1, left: -60 }]} />
          <View style={[styles.glowOrb, { backgroundColor: "rgba(100,67,244,0.15)", bottom: height * 0.15, right: -80, width: 220, height: 220 }]} />

          <Text style={styles.doneEmoji}>✨</Text>
          <Text style={styles.doneTitle}>Your trip is taking shape!</Text>
          <Text style={styles.doneSub}>
            You picked {liked.length} highlight{liked.length !== 1 ? "s" : ""}. TRAVI is building your perfect itinerary.
          </Text>

          {/* Liked chips */}
          <View style={styles.likedGrid}>
            {liked.slice(0, 6).map((a) => (
              <View key={a.id} style={[styles.likedChip, { borderColor: a.color + "50", shadowColor: a.color }]}>
                <View style={[styles.likedDot, { backgroundColor: a.color }]} />
                <Text style={styles.likedChipText} numberOfLines={1}>{a.name}</Text>
              </View>
            ))}
            {liked.length > 6 && (
              <View style={[styles.likedChip, { borderColor: "rgba(255,255,255,0.12)" }]}>
                <Text style={styles.likedMore}>+{liked.length - 6} more</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={async () => {
              try {
                await AsyncStorage.setItem(`liked_activities_${tripId}`, JSON.stringify(liked));
                await AsyncStorage.setItem("travi_liked_activities", JSON.stringify(liked));
              } catch (_) {}
              router.push({ pathname: "/(trip)/dna-update", params: { tripId, destination: destination ?? "dubai", liked: liked.map((a) => a.id).join(","), interests } } as never);
            }}
            activeOpacity={0.88}
          >
            <LinearGradient colors={["#F94498", "#A855F7", "#6443F4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
              <Text style={styles.ctaText}>Build My Itinerary</Text>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Background */}
      <LinearGradient colors={["#0D0628", "#130A2E"]} style={StyleSheet.absoluteFillObject} />
      <View style={[styles.glowOrb, { backgroundColor: "rgba(100,67,244,0.12)", top: -80, right: -60, width: 260, height: 260 }]} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Pick your highlights</Text>
        </View>
        <View style={[styles.likedBadge, liked.length > 0 && styles.likedBadgeActive]}>
          <Text style={styles.likedBadgeHeart}>{liked.length > 0 ? "❤️" : "🤍"}</Text>
          <Text style={[styles.likedCount, liked.length > 0 && styles.likedCountActive]}>{liked.length}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={["#F94498", "#A855F7", "#6443F4"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${((currentIndex) / cards.length) * 100}%` as unknown as number }]}
          />
        </View>
        <Text style={styles.progressLabel}>{currentIndex + 1} / {cards.length}</Text>
      </View>

      {/* Cards stack — full screen height */}
      <View style={styles.cardsArea}>
        {/* Next card (behind, slightly scaled down) */}
        {nextCard && (
          <Animated.View style={[styles.card, styles.nextCard, { transform: [{ scale: nextCardScale }] }]}>
            <Image source={nextCard.image} style={styles.cardImage} resizeMode="cover" />
            <LinearGradient
              colors={["rgba(13,6,40,0.1)", "rgba(13,6,40,0.3)", "rgba(13,6,40,0.98)"]}
              locations={[0, 0.45, 1]}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        )}

        {/* Current card (front) */}
        {currentCard && (
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  { translateX: position.x },
                  { translateY: position.y },
                  { rotate },
                ],
                shadowColor: currentCard.color,
                shadowOpacity: 0.35,
                shadowRadius: 24,
                shadowOffset: { width: 0, height: 8 },
              },
            ]}
            {...panResponder.panHandlers}
          >
            <Image source={currentCard.image} style={styles.cardImage} resizeMode="cover" />

            {/* Multi-stop gradient for cinematic look */}
            <LinearGradient
              colors={["transparent", "transparent", "rgba(13,6,40,0.7)", "rgba(13,6,40,0.98)"]}
              locations={[0, 0.35, 0.65, 1]}
              style={StyleSheet.absoluteFillObject}
            />

            {/* Color tint overlay based on card color */}
            <View style={[styles.colorTint, { backgroundColor: currentCard.color + "18" }]} />

            {/* LIKE stamp */}
            <Animated.View style={[styles.stamp, styles.stampLike, { opacity: likeOpacity }]}>
              <LinearGradient colors={["rgba(34,197,94,0.9)", "rgba(34,197,94,0.7)"]} style={styles.stampGradient}>
                <Text style={styles.stampText}>LOVE IT</Text>
              </LinearGradient>
            </Animated.View>

            {/* NOPE stamp */}
            <Animated.View style={[styles.stamp, styles.stampNope, { opacity: nopeOpacity }]}>
              <LinearGradient colors={["rgba(239,68,68,0.9)", "rgba(239,68,68,0.7)"]} style={styles.stampGradient}>
                <Text style={[styles.stampText, styles.stampTextNope]}>SKIP</Text>
              </LinearGradient>
            </Animated.View>

            {/* Category badge top-right */}
            <View style={[styles.categoryBadge, { backgroundColor: currentCard.color + "22", borderColor: currentCard.color + "60" }]}>
              <View style={[styles.categoryDot, { backgroundColor: currentCard.color }]} />
              <Text style={[styles.categoryText, { color: currentCard.color }]}>{currentCard.type}</Text>
            </View>

            {/* Card info */}
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{currentCard.name}</Text>
              <Text style={styles.cardLocation}>📍 {currentCard.location}</Text>
              <Text style={styles.cardDesc}>{currentCard.description}</Text>

              {/* Meta row */}
              <View style={styles.cardMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaValue}>⭐ {currentCard.rating}</Text>
                  <Text style={styles.metaLabel}>{(currentCard.reviews / 1000).toFixed(0)}k reviews</Text>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                  <Text style={styles.metaValue}>⏱ {currentCard.duration}</Text>
                  <Text style={styles.metaLabel}>Duration</Text>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                  <Text style={styles.metaValue}>{currentCard.price}</Text>
                  <Text style={styles.metaLabel}>Per person</Text>
                </View>
              </View>

              {/* Tags */}
              <View style={styles.tags}>
                {currentCard.tags.map((tag) => (
                  <View key={tag} style={[styles.tag, { backgroundColor: currentCard.color + "18", borderColor: currentCard.color + "50" }]}>
                    <Text style={[styles.tagText, { color: currentCard.color }]}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}
      </View>

      {/* Action buttons */}
      <View style={[styles.actions, { paddingBottom: Math.max(insets.bottom + 8, 28) }]}>
        {/* Skip button */}
        <TouchableOpacity
          style={styles.actionBtnWrap}
          onPress={() => handleSwipe("left")}
          activeOpacity={0.85}
        >
          <View style={[styles.actionBtnInner, styles.actionBtnSkip]}>
            <Text style={styles.actionBtnSkipIcon}>✕</Text>
          </View>
          <Text style={styles.actionBtnLabel}>Skip</Text>
        </TouchableOpacity>

        {/* Center hint */}
        <View style={styles.actionCenter}>
          <Text style={styles.swipeHintEmoji}>👆</Text>
          <Text style={styles.swipeHint}>Swipe to decide</Text>
        </View>

        {/* Like button */}
        <TouchableOpacity
          style={styles.actionBtnWrap}
          onPress={() => handleSwipe("right")}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#F94498", "#A855F7"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={[styles.actionBtnInner, styles.actionBtnLike]}
          >
            <Text style={styles.actionBtnLikeIcon}>♥</Text>
          </LinearGradient>
          <Text style={[styles.actionBtnLabel, { color: "#F94498" }]}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* First Swipe Tutorial */}
      <FirstSwipeTutorial />
    </View>
  );
}

const CARD_HEIGHT = height * 0.66;

const styles = StyleSheet.create<any>({
  container: { flex: 1 },
  // Glow orb
  glowOrb: { position: "absolute", width: 200, height: 200, borderRadius: 100 },
  // Header
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700", letterSpacing: 0.3, fontFamily: "Chillax-Semibold" },
  likedBadge: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 13, paddingVertical: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)" },
  likedBadgeActive: { backgroundColor: "rgba(249,68,152,0.12)", borderColor: "rgba(249,68,152,0.35)" },
  likedBadgeHeart: { fontSize: 13 },
  likedCount: { color: "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  likedCountActive: { color: "#F94498" },
  // Progress
  progressWrap: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 130, gap: 10 },
  progressTrack: { flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%" as unknown as number, borderRadius: 2 },
  progressLabel: { color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: "700", minWidth: 36, textAlign: "right" },
  // Cards
  cardsArea: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 12 },
  card: {
    position: "absolute",
    width: width - 24,
    height: CARD_HEIGHT,
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: "#1A0A3D",
    elevation: 16,
  },
  nextCard: { top: 18 },
  cardImage: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
  colorTint: { ...StyleSheet.absoluteFillObject },
  // Stamps
  stamp: { position: "absolute", top: 44, overflow: "hidden", borderRadius: 12 },
  stampLike: { right: 20, transform: [{ rotate: "12deg" }] },
  stampNope: { left: 20, transform: [{ rotate: "-12deg" }] },
  stampGradient: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12 },
  stampText: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", letterSpacing: 3, fontFamily: "Chillax-Bold" },
  stampTextNope: { color: "#FFFFFF" },
  // Category badge
  // @ts-ignore - gap is valid in RN 0.71+
  categoryBadge: { position: "absolute", top: 20, left: 20, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  categoryDot: { width: 7, height: 7, borderRadius: 3.5 },
  categoryText: { fontSize: 12, fontWeight: "700", letterSpacing: 0.3 },
  // Card info
  cardInfo: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 22, gap: 10 },
  cardName: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", lineHeight: 30, letterSpacing: -0.3, fontFamily: "Chillax-Bold" },
  cardLocation: { color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: "500", fontFamily: "Satoshi-Medium" },
  cardDesc: { color: "rgba(255,255,255,0.75)", fontSize: 13.5, lineHeight: 20 },
  cardMeta: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.45)", borderRadius: 16, padding: 14, gap: 8 },
  metaItem: { flex: 1, alignItems: "center", gap: 3 },
  metaValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  metaLabel: { color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: "500" },
  metaDivider: { width: 1, height: 28, backgroundColor: "rgba(255,255,255,0.06)" },
  tags: { flexDirection: "row", gap: 7, flexWrap: "wrap" },
  tag: { borderRadius: 10, paddingHorizontal: 11, paddingVertical: 5, borderWidth: 1 },
  tagText: { fontSize: 11, fontWeight: "700" },
  // Action buttons
  actions: { flexDirection: "row", alignItems: "center", paddingHorizontal: 28, paddingTop: 14, gap: 12 },
  actionBtnWrap: { alignItems: "center", gap: 6 },
  actionBtnInner: { width: 68, height: 68, borderRadius: 34, alignItems: "center", justifyContent: "center" },
  actionBtnSkip: { backgroundColor: "rgba(239,68,68,0.12)", borderWidth: 2, borderColor: "rgba(239,68,68,0.3)" },
  actionBtnLike: {},
  actionBtnSkipIcon: { fontSize: 26, color: "#EF4444" },
  actionBtnLikeIcon: { fontSize: 26, color: "#FFFFFF" },
  actionBtnLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  actionCenter: { flex: 1, alignItems: "center", gap: 4 },
  swipeHintEmoji: { fontSize: 18 },
  swipeHint: { color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: "600" },
  // Done screen
  doneWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 28, gap: 18 },
  doneEmoji: { fontSize: 60 },
  doneTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", textAlign: "center", letterSpacing: -0.5, fontFamily: "Chillax-Bold" },
  doneSub: { color: "rgba(255,255,255,0.6)", fontSize: 15, textAlign: "center", lineHeight: 23 },
  likedGrid: { width: "100%", flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  likedChip: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, maxWidth: (width - 56 - 8) / 2, shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  likedDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  likedChipText: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "600", flex: 1 },
  likedMore: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "600" },
  ctaBtn: { width: "100%", borderRadius: 22, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", marginTop: 6 },
  ctaGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 10 },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "900", letterSpacing: 0.3, fontFamily: "Chillax-Bold" },
});
