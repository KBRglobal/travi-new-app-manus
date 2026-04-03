/**
 * Destination Detail — 3-layer content system
 *
 * Tab 1 — Must-See: universal highlights everyone should do
 * Tab 2 — For You: filtered by user's DNA activity categories
 * Tab 3 — Full List: all activities grouped by category
 *
 * Smart pace tip: based on tripPace, suggests how many activities per day
 */

import { useState, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Animated, Image, FlatList, Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { useStore } from "@/lib/store";
import type { ActivityCategory } from "@/lib/store";
import { ActivityBookingModal, type BookableActivity } from "@/components/activity-booking";

const { width, height } = Dimensions.get("window");

// ── Activity category metadata ────────────────────────────────────────────────

const CATEGORY_META: Record<ActivityCategory, { label: string; emoji: string; color: string }> = {
  beaches:      { label: "Beaches",       emoji: "🏖️", color: "#0EA5E9" },
  hiking:       { label: "Hiking",         emoji: "🥾", color: "#22C55E" },
  food:         { label: "Food",           emoji: "🍜", color: "#F97316" },
  nightlife:    { label: "Nightlife",      emoji: "🎉", color: "#A855F7" },
  culture:      { label: "Culture",        emoji: "🏛️", color: "#6443F4" },
  adventure:    { label: "Adventure",      emoji: "🪂", color: "#EF4444" },
  wellness:     { label: "Wellness",       emoji: "🧘", color: "#06B6D4" },
  shopping:     { label: "Shopping",       emoji: "🛍️", color: "#EC4899" },
  nature:       { label: "Nature",         emoji: "🌿", color: "#16A34A" },
  art:          { label: "Art",            emoji: "🎨", color: "#F59E0B" },
  music:        { label: "Music",          emoji: "🎵", color: "#8B5CF6" },
  architecture: { label: "Architecture",   emoji: "🏗️", color: "#64748B" },
};

// ── Activity item type ────────────────────────────────────────────────────────

type ActivityItem = {
  id: string;
  title: string;
  desc: string;
  price: number;
  cashback: number;
  rating: number;
  reviews: number;
  duration: string;
  image: number;
  url: string;
  categories: ActivityCategory[];
  mustSee: boolean;
  mustSeeReason?: string;
};

// ── Destination data ──────────────────────────────────────────────────────────

const DESTINATIONS: Record<string, {
  name: string; country: string; tagline: string; match: number; dnaType: string;
  hero: number[];
  neighborhoods: { id: string; name: string; desc: string; match: number; image: number }[];
  activities: ActivityItem[];
  food: { id: string; name: string; cuisine: string; price: string; match: number; image: number; url: string }[];
}> = {
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "Where luxury meets the desert",
    match: 98,
    dnaType: "The Luxury Connoisseur",
    hero: [
      require("@/assets/destinations/dubai.jpg"),
      require("@/assets/destinations/dubai.jpg"),
      require("@/assets/destinations/dubai.jpg"),
    ],
    neighborhoods: [
      { id: "n1", name: "Downtown", desc: "Burj Khalifa & Dubai Mall", match: 99, image: require("@/assets/destinations/dubai.jpg") },
      { id: "n2", name: "Dubai Marina", desc: "Waterfront luxury living", match: 96, image: require("@/assets/destinations/dubai.jpg") },
      { id: "n3", name: "Old Dubai", desc: "Souks & heritage", match: 88, image: require("@/assets/destinations/dubai.jpg") },
      { id: "n4", name: "Palm Jumeirah", desc: "Iconic island resort strip", match: 94, image: require("@/assets/destinations/dubai.jpg") },
    ],
    activities: [
      {
        id: "a1", title: "Burj Khalifa — At the Top", desc: "Floor 148 observation deck. Arrive 15 min early for sunrise.", price: 400, cashback: 32, rating: 4.9, reviews: 52000, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://www.burjkhalifa.ae", categories: ["architecture", "culture"], mustSee: true, mustSeeReason: "The world's tallest building — non-negotiable.",
      },
      {
        id: "a2", title: "Dubai Fountain Show", desc: "World's largest choreographed fountain. Free to watch from the boardwalk.", price: 0, cashback: 0, rating: 4.8, reviews: 38000, duration: "30min", image: require("@/assets/destinations/dubai.jpg"), url: "https://www.thedubaimall.com", categories: ["culture", "architecture"], mustSee: true, mustSeeReason: "Free, unmissable, runs every 30 min after sunset.",
      },
      {
        id: "a3", title: "Desert Safari with BBQ Dinner", desc: "Dune bashing, camel ride, henna, and a Bedouin camp dinner under the stars.", price: 120, cashback: 10, rating: 4.8, reviews: 18000, duration: "6h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["adventure", "culture", "food"], mustSee: false,
      },
      {
        id: "a4", title: "Dubai Aquarium & Underwater Zoo", desc: "Walk-through tunnel with 33,000 aquatic animals. Inside Dubai Mall.", price: 85, cashback: 7, rating: 4.7, reviews: 9500, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["nature", "culture"], mustSee: false,
      },
      {
        id: "a5", title: "La Mer Beach", desc: "Trendy beachfront district with cafes, water sports, and a relaxed vibe.", price: 0, cashback: 0, rating: 4.6, reviews: 7200, duration: "Half day", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["beaches", "food", "shopping"], mustSee: false,
      },
      {
        id: "a6", title: "Gold & Spice Souks", desc: "Old Dubai's legendary markets. Haggle for gold, spices, and perfumes.", price: 0, cashback: 0, rating: 4.7, reviews: 14000, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["shopping", "culture"], mustSee: false,
      },
      {
        id: "a7", title: "Alserkal Avenue Art Walk", desc: "Dubai's creative district — galleries, studios, and indie coffee.", price: 0, cashback: 0, rating: 4.5, reviews: 2800, duration: "2h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["art", "culture"], mustSee: false,
      },
      {
        id: "a8", title: "Skydive Dubai — Palm Drop Zone", desc: "Tandem skydive over the Palm Jumeirah. The view is insane.", price: 850, cashback: 68, rating: 4.9, reviews: 3100, duration: "3h", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["adventure"], mustSee: false,
      },
      {
        id: "a9", title: "Talise Ottoman Spa", desc: "Award-winning spa at Jumeirah Zabeel Saray. Full day of pure restoration.", price: 280, cashback: 22, rating: 4.9, reviews: 1400, duration: "3h+", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["wellness"], mustSee: false,
      },
      {
        id: "a10", title: "Dubai Opera — Live Show", desc: "World-class venue in the heart of Downtown. Check current program.", price: 150, cashback: 12, rating: 4.8, reviews: 4200, duration: "2-3h", image: require("@/assets/destinations/dubai.jpg"), url: "https://www.dubaiopera.com", categories: ["music", "art", "culture"], mustSee: false,
      },
      {
        id: "a11", title: "Dubai Mall — Full Day", desc: "200+ restaurants, ice rink, VR park, and 1,200+ stores. A day in itself.", price: 0, cashback: 0, rating: 4.6, reviews: 62000, duration: "Full day", image: require("@/assets/destinations/dubai.jpg"), url: "https://www.thedubaimall.com", categories: ["shopping", "food"], mustSee: false,
      },
      {
        id: "a12", title: "Kite Beach Watersports", desc: "Kitesurfing, paddleboarding, and beach volleyball. The local's beach.", price: 60, cashback: 5, rating: 4.6, reviews: 5600, duration: "Half day", image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com", categories: ["beaches", "adventure"], mustSee: false,
      },
    ],
    food: [
      { id: "f1", name: "Pierchic", cuisine: "Seafood", price: "$$$", match: 97, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
      { id: "f2", name: "Al Hadheerah", cuisine: "Arabic", price: "$$", match: 94, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
      { id: "f3", name: "Zuma", cuisine: "Japanese", price: "$$$", match: 92, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
      { id: "f4", name: "Ravi Restaurant", cuisine: "Pakistani Street Food", price: "$", match: 88, image: require("@/assets/destinations/dubai.jpg"), url: "https://example.com" },
    ],
  },
  paris: {
    name: "Paris",
    country: "France",
    tagline: "The city of eternal light",
    match: 96,
    dnaType: "The Culture Connoisseur",
    hero: [require("@/assets/destinations/paris.jpg"), require("@/assets/destinations/paris.jpg"), require("@/assets/destinations/paris.jpg")],
    neighborhoods: [
      { id: "n1", name: "Le Marais", desc: "Art galleries & trendy cafés", match: 97, image: require("@/assets/destinations/paris.jpg") },
      { id: "n2", name: "Montmartre", desc: "Bohemian hilltop village", match: 94, image: require("@/assets/destinations/paris.jpg") },
      { id: "n3", name: "Saint-Germain", desc: "Intellectual Left Bank", match: 91, image: require("@/assets/destinations/paris.jpg") },
    ],
    activities: [
      { id: "a1", title: "Eiffel Tower — Summit", desc: "Skip the queue with a timed ticket. Sunrise is magical.", price: 29, cashback: 2, rating: 4.8, reviews: 180000, duration: "2h", image: require("@/assets/destinations/paris.jpg"), url: "https://www.toureiffel.paris", categories: ["architecture", "culture"], mustSee: true, mustSeeReason: "The most iconic structure in the world." },
      { id: "a2", title: "Louvre Museum", desc: "Mona Lisa, Venus de Milo, and 35,000 works of art.", price: 22, cashback: 2, rating: 4.8, reviews: 95000, duration: "4h", image: require("@/assets/destinations/paris.jpg"), url: "https://www.louvre.fr", categories: ["culture", "art"], mustSee: true, mustSeeReason: "The world's largest art museum." },
      { id: "a3", title: "Seine River Cruise", desc: "Bateaux Mouches evening cruise past illuminated monuments.", price: 18, cashback: 1, rating: 4.7, reviews: 42000, duration: "1.5h", image: require("@/assets/destinations/paris.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: false },
      { id: "a4", title: "Versailles Day Trip", desc: "Palace of Versailles and the Hall of Mirrors. Book early.", price: 20, cashback: 2, rating: 4.8, reviews: 55000, duration: "Full day", image: require("@/assets/destinations/paris.jpg"), url: "https://www.chateauversailles.fr", categories: ["culture", "architecture", "nature"], mustSee: false },
      { id: "a5", title: "Musée d'Orsay", desc: "Impressionist masterpieces — Monet, Renoir, Van Gogh.", price: 16, cashback: 1, rating: 4.9, reviews: 38000, duration: "3h", image: require("@/assets/destinations/paris.jpg"), url: "https://www.musee-orsay.fr", categories: ["art", "culture"], mustSee: false },
      { id: "a6", title: "Le Marais Food Walk", desc: "Falafel, pastries, and wine bars in Paris's coolest neighborhood.", price: 45, cashback: 4, rating: 4.8, reviews: 3200, duration: "3h", image: require("@/assets/destinations/paris.jpg"), url: "https://example.com", categories: ["food", "culture"], mustSee: false },
      { id: "a7", title: "Galeries Lafayette", desc: "Iconic department store with a stunning Art Nouveau dome.", price: 0, cashback: 0, rating: 4.6, reviews: 28000, duration: "2h", image: require("@/assets/destinations/paris.jpg"), url: "https://www.galerieslafayette.com", categories: ["shopping", "architecture"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Le Jules Verne", cuisine: "French Fine Dining", price: "$$$$", match: 97, image: require("@/assets/destinations/paris.jpg"), url: "https://example.com" },
      { id: "f2", name: "L'As du Fallafel", cuisine: "Street Food", price: "$", match: 94, image: require("@/assets/destinations/paris.jpg"), url: "https://example.com" },
      { id: "f3", name: "Café de Flore", cuisine: "French Café", price: "$$", match: 91, image: require("@/assets/destinations/paris.jpg"), url: "https://example.com" },
    ],
  },
  tokyo: {
    name: "Tokyo",
    country: "Japan",
    tagline: "Neon dreams that never sleep",
    match: 97,
    dnaType: "The Urban Explorer",
    hero: [require("@/assets/destinations/tokyo.jpg"), require("@/assets/destinations/tokyo.jpg"), require("@/assets/destinations/tokyo.jpg")],
    neighborhoods: [
      { id: "n1", name: "Shibuya", desc: "The world's busiest crossing", match: 98, image: require("@/assets/destinations/tokyo.jpg") },
      { id: "n2", name: "Shinjuku", desc: "Neon-lit entertainment district", match: 96, image: require("@/assets/destinations/tokyo.jpg") },
      { id: "n3", name: "Asakusa", desc: "Old Tokyo & Senso-ji Temple", match: 93, image: require("@/assets/destinations/tokyo.jpg") },
    ],
    activities: [
      { id: "a1", title: "Shibuya Crossing at Night", desc: "The iconic scramble crossing. Most impressive after dark.", price: 0, cashback: 0, rating: 4.9, reviews: 95000, duration: "1h", image: require("@/assets/destinations/tokyo.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: true, mustSeeReason: "The most famous intersection in the world." },
      { id: "a2", title: "Senso-ji Temple & Nakamise", desc: "Tokyo's oldest temple with a 250m shopping street leading to it.", price: 0, cashback: 0, rating: 4.8, reviews: 72000, duration: "2h", image: require("@/assets/destinations/tokyo.jpg"), url: "https://example.com", categories: ["culture", "architecture", "shopping"], mustSee: true, mustSeeReason: "The soul of old Tokyo." },
      { id: "a3", title: "Tsukiji Outer Market", desc: "Fresh sushi breakfast at 6am. The best meal of your trip.", price: 30, cashback: 2, rating: 4.9, reviews: 28000, duration: "2h", image: require("@/assets/destinations/tokyo.jpg"), url: "https://example.com", categories: ["food"], mustSee: false },
      { id: "a4", title: "teamLab Borderless", desc: "Immersive digital art museum. Book weeks in advance.", price: 32, cashback: 3, rating: 4.9, reviews: 18000, duration: "3h", image: require("@/assets/destinations/tokyo.jpg"), url: "https://borderless.teamlab.art", categories: ["art", "culture"], mustSee: false },
      { id: "a5", title: "Shinjuku Gyoen Garden", desc: "3 distinct garden styles in one park. Cherry blossoms in spring.", price: 5, cashback: 0, rating: 4.8, reviews: 22000, duration: "2h", image: require("@/assets/destinations/tokyo.jpg"), url: "https://example.com", categories: ["nature"], mustSee: false },
      { id: "a6", title: "Akihabara Electronics & Anime", desc: "Multi-floor electronics stores and anime culture hub.", price: 0, cashback: 0, rating: 4.6, reviews: 31000, duration: "3h", image: require("@/assets/destinations/tokyo.jpg"), url: "https://example.com", categories: ["shopping", "culture"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Sukiyabashi Jiro", cuisine: "Sushi", price: "$$$$", match: 99, image: require("@/assets/destinations/tokyo.jpg"), url: "https://example.com" },
      { id: "f2", name: "Ichiran Ramen", cuisine: "Ramen", price: "$", match: 96, image: require("@/assets/destinations/tokyo.jpg"), url: "https://example.com" },
      { id: "f3", name: "Gonpachi Nishi-Azabu", cuisine: "Izakaya", price: "$$", match: 92, image: require("@/assets/destinations/tokyo.jpg"), url: "https://example.com" },
    ],
  },
  bali: {
    name: "Bali",
    country: "Indonesia",
    tagline: "Find your inner peace",
    match: 94,
    dnaType: "The Mindful Wanderer",
    hero: [require("@/assets/destinations/bali.jpg"), require("@/assets/destinations/bali.jpg"), require("@/assets/destinations/bali.jpg")],
    neighborhoods: [
      { id: "n1", name: "Ubud", desc: "Spiritual heart & rice terraces", match: 97, image: require("@/assets/destinations/bali.jpg") },
      { id: "n2", name: "Seminyak", desc: "Beach clubs & sunset cocktails", match: 94, image: require("@/assets/destinations/bali.jpg") },
      { id: "n3", name: "Uluwatu", desc: "Clifftop temples & surf", match: 92, image: require("@/assets/destinations/bali.jpg") },
    ],
    activities: [
      { id: "a1", title: "Tegallalang Rice Terraces", desc: "UNESCO-listed terraces. Best light at 8am before the crowds.", price: 2, cashback: 0, rating: 4.7, reviews: 38000, duration: "2h", image: require("@/assets/destinations/bali.jpg"), url: "https://example.com", categories: ["nature", "culture"], mustSee: true, mustSeeReason: "The most iconic landscape in Bali." },
      { id: "a2", title: "Uluwatu Temple Sunset & Kecak", desc: "Clifftop temple at sunset followed by a fire Kecak dance.", price: 15, cashback: 1, rating: 4.9, reviews: 22000, duration: "3h", image: require("@/assets/destinations/bali.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: true, mustSeeReason: "The most spiritual experience in Bali." },
      { id: "a3", title: "Mount Batur Sunrise Trek", desc: "2-hour hike to the active volcano rim. Sunrise at 5am.", price: 65, cashback: 5, rating: 4.8, reviews: 12000, duration: "5h", image: require("@/assets/destinations/bali.jpg"), url: "https://example.com", categories: ["hiking", "adventure", "nature"], mustSee: false },
      { id: "a4", title: "Balinese Cooking Class", desc: "Morning market tour + cook 7 dishes + eat everything.", price: 45, cashback: 4, rating: 4.9, reviews: 5600, duration: "4h", image: require("@/assets/destinations/bali.jpg"), url: "https://example.com", categories: ["food", "culture"], mustSee: false },
      { id: "a5", title: "Tirta Empul Holy Spring", desc: "Sacred purification ritual in a 1,000-year-old temple.", price: 3, cashback: 0, rating: 4.7, reviews: 18000, duration: "2h", image: require("@/assets/destinations/bali.jpg"), url: "https://example.com", categories: ["culture", "wellness"], mustSee: false },
      { id: "a6", title: "Seminyak Beach Club Sunset", desc: "Potato Head or Ku De Ta — cocktails, pool, DJ, sunset.", price: 0, cashback: 0, rating: 4.6, reviews: 14000, duration: "4h", image: require("@/assets/destinations/bali.jpg"), url: "https://example.com", categories: ["beaches", "nightlife"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Locavore", cuisine: "Modern Indonesian", price: "$$$", match: 97, image: require("@/assets/destinations/bali.jpg"), url: "https://example.com" },
      { id: "f2", name: "Warung Babi Guling", cuisine: "Balinese Street Food", price: "$", match: 95, image: require("@/assets/destinations/bali.jpg"), url: "https://example.com" },
      { id: "f3", name: "Mozaic", cuisine: "French-Indonesian Fusion", price: "$$$$", match: 91, image: require("@/assets/destinations/bali.jpg"), url: "https://example.com" },
    ],
  },
  kyoto: {
    name: "Kyoto",
    country: "Japan",
    tagline: "Ancient beauty, modern soul",
    match: 95,
    dnaType: "The Zen Seeker",
    hero: [require("@/assets/destinations/kyoto.jpg"), require("@/assets/destinations/kyoto.jpg"), require("@/assets/destinations/kyoto.jpg")],
    neighborhoods: [
      { id: "n1", name: "Gion", desc: "Geisha district & lantern streets", match: 98, image: require("@/assets/destinations/kyoto.jpg") },
      { id: "n2", name: "Arashiyama", desc: "Bamboo grove & temples", match: 96, image: require("@/assets/destinations/kyoto.jpg") },
      { id: "n3", name: "Fushimi", desc: "Sake breweries & Inari shrine", match: 93, image: require("@/assets/destinations/kyoto.jpg") },
    ],
    activities: [
      { id: "a1", title: "Fushimi Inari — 10,000 Torii Gates", desc: "Hike through thousands of vermilion gates. Go at dawn.", price: 0, cashback: 0, rating: 4.9, reviews: 65000, duration: "3h", image: require("@/assets/destinations/kyoto.jpg"), url: "https://example.com", categories: ["culture", "hiking", "architecture"], mustSee: true, mustSeeReason: "The most photographed shrine in Japan." },
      { id: "a2", title: "Arashiyama Bamboo Grove", desc: "Walk through towering bamboo at sunrise before the crowds.", price: 0, cashback: 0, rating: 4.8, reviews: 48000, duration: "1h", image: require("@/assets/destinations/kyoto.jpg"), url: "https://example.com", categories: ["nature", "culture"], mustSee: true, mustSeeReason: "One of the most surreal natural experiences in Asia." },
      { id: "a3", title: "Tea Ceremony in Gion", desc: "Traditional matcha ceremony in a 200-year-old machiya townhouse.", price: 55, cashback: 4, rating: 4.9, reviews: 3800, duration: "1.5h", image: require("@/assets/destinations/kyoto.jpg"), url: "https://example.com", categories: ["culture", "food"], mustSee: false },
      { id: "a4", title: "Kinkaku-ji (Golden Pavilion)", desc: "The gold-leaf Zen temple reflected in a mirror pond.", price: 5, cashback: 0, rating: 4.8, reviews: 52000, duration: "1h", image: require("@/assets/destinations/kyoto.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: false },
      { id: "a5", title: "Nishiki Market Food Walk", desc: "Kyoto's 'Kitchen' — 100+ stalls of pickles, tofu, and street snacks.", price: 0, cashback: 0, rating: 4.7, reviews: 18000, duration: "2h", image: require("@/assets/destinations/kyoto.jpg"), url: "https://example.com", categories: ["food", "culture"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Kikunoi", cuisine: "Kaiseki", price: "$$$$", match: 98, image: require("@/assets/destinations/kyoto.jpg"), url: "https://example.com" },
      { id: "f2", name: "Nishiki Market Stalls", cuisine: "Street Food", price: "$", match: 95, image: require("@/assets/destinations/kyoto.jpg"), url: "https://example.com" },
    ],
  },
  barcelona: {
    name: "Barcelona",
    country: "Spain",
    tagline: "Art, sun, and Gaudí magic",
    match: 96,
    dnaType: "The Creative Soul",
    hero: [require("@/assets/destinations/barcelona.jpg"), require("@/assets/destinations/barcelona.jpg"), require("@/assets/destinations/barcelona.jpg")],
    neighborhoods: [
      { id: "n1", name: "Gothic Quarter", desc: "Medieval streets & tapas bars", match: 97, image: require("@/assets/destinations/barcelona.jpg") },
      { id: "n2", name: "Eixample", desc: "Gaudí architecture & boutiques", match: 95, image: require("@/assets/destinations/barcelona.jpg") },
      { id: "n3", name: "Barceloneta", desc: "Beach & seafood", match: 92, image: require("@/assets/destinations/barcelona.jpg") },
    ],
    activities: [
      { id: "a1", title: "Sagrada Família", desc: "Gaudí's unfinished masterpiece. Book skip-the-line + tower access.", price: 35, cashback: 3, rating: 4.9, reviews: 88000, duration: "2h", image: require("@/assets/destinations/barcelona.jpg"), url: "https://www.sagradafamilia.org", categories: ["architecture", "culture", "art"], mustSee: true, mustSeeReason: "The most extraordinary church ever built." },
      { id: "a2", title: "Park Güell", desc: "Mosaic terraces and dragon staircase. Book timed entry.", price: 13, cashback: 1, rating: 4.7, reviews: 52000, duration: "2h", image: require("@/assets/destinations/barcelona.jpg"), url: "https://www.parkguell.barcelona", categories: ["art", "architecture", "nature"], mustSee: true, mustSeeReason: "Gaudí's outdoor fantasy world." },
      { id: "a3", title: "La Boqueria Market", desc: "Barcelona's famous food market. Go early, skip the tourist stalls.", price: 0, cashback: 0, rating: 4.6, reviews: 42000, duration: "1.5h", image: require("@/assets/destinations/barcelona.jpg"), url: "https://example.com", categories: ["food", "culture"], mustSee: false },
      { id: "a4", title: "Flamenco Show in El Born", desc: "Intimate tablao flamenco with dinner. Authentic, not touristy.", price: 75, cashback: 6, rating: 4.8, reviews: 2800, duration: "2h", image: require("@/assets/destinations/barcelona.jpg"), url: "https://example.com", categories: ["music", "culture"], mustSee: false },
      { id: "a5", title: "Barceloneta Beach Day", desc: "City beach with volleyball, chiringuitos, and clear water.", price: 0, cashback: 0, rating: 4.5, reviews: 35000, duration: "Half day", image: require("@/assets/destinations/barcelona.jpg"), url: "https://example.com", categories: ["beaches"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Tickets", cuisine: "Avant-garde Tapas", price: "$$$", match: 98, image: require("@/assets/destinations/barcelona.jpg"), url: "https://example.com" },
      { id: "f2", name: "Bar del Pla", cuisine: "Catalan Tapas", price: "$$", match: 95, image: require("@/assets/destinations/barcelona.jpg"), url: "https://example.com" },
    ],
  },
  rome: {
    name: "Rome",
    country: "Italy",
    tagline: "The eternal city never gets old",
    match: 95,
    dnaType: "The History Buff",
    hero: [require("@/assets/destinations/rome.jpg"), require("@/assets/destinations/rome.jpg"), require("@/assets/destinations/rome.jpg")],
    neighborhoods: [
      { id: "n1", name: "Trastevere", desc: "Cobblestones & authentic trattorias", match: 97, image: require("@/assets/destinations/rome.jpg") },
      { id: "n2", name: "Centro Storico", desc: "Pantheon & Piazza Navona", match: 96, image: require("@/assets/destinations/rome.jpg") },
      { id: "n3", name: "Prati", desc: "Vatican neighborhood", match: 90, image: require("@/assets/destinations/rome.jpg") },
    ],
    activities: [
      { id: "a1", title: "Colosseum & Roman Forum", desc: "Walk through 2,000 years of history. Book skip-the-line.", price: 18, cashback: 1, rating: 4.8, reviews: 95000, duration: "3h", image: require("@/assets/destinations/rome.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: true, mustSeeReason: "The greatest amphitheater ever built." },
      { id: "a2", title: "Vatican Museums & Sistine Chapel", desc: "Michelangelo's ceiling. Book early morning entry.", price: 22, cashback: 2, rating: 4.8, reviews: 78000, duration: "4h", image: require("@/assets/destinations/rome.jpg"), url: "https://www.museivaticani.va", categories: ["culture", "art", "architecture"], mustSee: true, mustSeeReason: "The most important art collection in the world." },
      { id: "a3", title: "Trevi Fountain at Dawn", desc: "Toss a coin at 6am before the crowds arrive.", price: 0, cashback: 0, rating: 4.7, reviews: 62000, duration: "30min", image: require("@/assets/destinations/rome.jpg"), url: "https://example.com", categories: ["architecture", "culture"], mustSee: false },
      { id: "a4", title: "Trastevere Food Tour", desc: "Pasta, supplì, and gelato in Rome's most charming neighborhood.", price: 65, cashback: 5, rating: 4.9, reviews: 2400, duration: "3h", image: require("@/assets/destinations/rome.jpg"), url: "https://example.com", categories: ["food", "culture"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Da Enzo al 29", cuisine: "Roman Trattoria", price: "$$", match: 97, image: require("@/assets/destinations/rome.jpg"), url: "https://example.com" },
      { id: "f2", name: "Supplì Roma", cuisine: "Street Food", price: "$", match: 95, image: require("@/assets/destinations/rome.jpg"), url: "https://example.com" },
    ],
  },
  maldives: {
    name: "Maldives",
    country: "Maldives",
    tagline: "Overwater bliss at the edge of the world",
    match: 93,
    dnaType: "The Luxury Escapist",
    hero: [require("@/assets/destinations/maldives.jpg"), require("@/assets/destinations/maldives.jpg"), require("@/assets/destinations/maldives.jpg")],
    neighborhoods: [
      { id: "n1", name: "North Malé Atoll", desc: "Most accessible resorts", match: 96, image: require("@/assets/destinations/maldives.jpg") },
      { id: "n2", name: "South Malé Atoll", desc: "Pristine diving sites", match: 94, image: require("@/assets/destinations/maldives.jpg") },
    ],
    activities: [
      { id: "a1", title: "Overwater Bungalow Stay", desc: "Glass-floor villa above the Indian Ocean. Sunrise from your deck.", price: 800, cashback: 64, rating: 4.9, reviews: 12000, duration: "Overnight", image: require("@/assets/destinations/maldives.jpg"), url: "https://example.com", categories: ["wellness", "beaches"], mustSee: true, mustSeeReason: "The quintessential Maldives experience." },
      { id: "a2", title: "Manta Ray Snorkeling", desc: "Swim with giant manta rays at Hanifaru Bay. UNESCO Biosphere.", price: 120, cashback: 10, rating: 4.9, reviews: 3800, duration: "4h", image: require("@/assets/destinations/maldives.jpg"), url: "https://example.com", categories: ["adventure", "nature", "beaches"], mustSee: true, mustSeeReason: "One of the best snorkeling experiences on Earth." },
      { id: "a3", title: "Sunset Dolphin Cruise", desc: "Spinner dolphins leap alongside the boat at golden hour.", price: 80, cashback: 6, rating: 4.8, reviews: 5200, duration: "2h", image: require("@/assets/destinations/maldives.jpg"), url: "https://example.com", categories: ["nature", "beaches"], mustSee: false },
      { id: "a4", title: "Underwater Restaurant Dinner", desc: "Dine 5 meters below the ocean surface at Ithaa or Subsix.", price: 350, cashback: 28, rating: 4.9, reviews: 1800, duration: "2h", image: require("@/assets/destinations/maldives.jpg"), url: "https://example.com", categories: ["food", "culture"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Ithaa Undersea Restaurant", cuisine: "International", price: "$$$$", match: 99, image: require("@/assets/destinations/maldives.jpg"), url: "https://example.com" },
      { id: "f2", name: "Local Island Café", cuisine: "Maldivian", price: "$", match: 90, image: require("@/assets/destinations/maldives.jpg"), url: "https://example.com" },
    ],
  },
  newyork: {
    name: "New York",
    country: "USA",
    tagline: "The city that never sleeps",
    match: 94,
    dnaType: "The Urban Hustler",
    hero: [require("@/assets/destinations/newyork.jpg"), require("@/assets/destinations/newyork.jpg"), require("@/assets/destinations/newyork.jpg")],
    neighborhoods: [
      { id: "n1", name: "Manhattan", desc: "Times Square to Central Park", match: 98, image: require("@/assets/destinations/newyork.jpg") },
      { id: "n2", name: "Brooklyn", desc: "DUMBO, Williamsburg & food", match: 95, image: require("@/assets/destinations/newyork.jpg") },
      { id: "n3", name: "Queens", desc: "World's most diverse food scene", match: 91, image: require("@/assets/destinations/newyork.jpg") },
    ],
    activities: [
      { id: "a1", title: "Statue of Liberty & Ellis Island", desc: "Ferry to Liberty Island. Book crown access months in advance.", price: 25, cashback: 2, rating: 4.7, reviews: 72000, duration: "4h", image: require("@/assets/destinations/newyork.jpg"), url: "https://www.nps.gov/stli", categories: ["culture", "architecture"], mustSee: true, mustSeeReason: "The most iconic symbol of America." },
      { id: "a2", title: "Central Park Full Day", desc: "Rowboats, Bethesda Fountain, The Ramble, and Strawberry Fields.", price: 0, cashback: 0, rating: 4.8, reviews: 85000, duration: "Full day", image: require("@/assets/destinations/newyork.jpg"), url: "https://example.com", categories: ["nature", "culture"], mustSee: true, mustSeeReason: "843 acres of green in the middle of Manhattan." },
      { id: "a3", title: "Top of the Rock", desc: "360° views of Manhattan. Better than Empire State for photos.", price: 40, cashback: 3, rating: 4.8, reviews: 38000, duration: "1.5h", image: require("@/assets/destinations/newyork.jpg"), url: "https://www.topoftherocknyc.com", categories: ["architecture", "culture"], mustSee: false },
      { id: "a4", title: "Broadway Show", desc: "Hamilton, Lion King, or Chicago. Book 2-3 months ahead.", price: 150, cashback: 12, rating: 4.9, reviews: 28000, duration: "3h", image: require("@/assets/destinations/newyork.jpg"), url: "https://www.broadway.com", categories: ["music", "art", "culture"], mustSee: false },
      { id: "a5", title: "Brooklyn Bridge Walk", desc: "Walk from Manhattan to DUMBO. Best at sunrise.", price: 0, cashback: 0, rating: 4.7, reviews: 45000, duration: "1h", image: require("@/assets/destinations/newyork.jpg"), url: "https://example.com", categories: ["architecture", "culture"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Katz's Delicatessen", cuisine: "Jewish Deli", price: "$$", match: 97, image: require("@/assets/destinations/newyork.jpg"), url: "https://example.com" },
      { id: "f2", name: "Joe's Pizza", cuisine: "NYC Pizza", price: "$", match: 96, image: require("@/assets/destinations/newyork.jpg"), url: "https://example.com" },
      { id: "f3", name: "Le Bernardin", cuisine: "French Seafood", price: "$$$$", match: 93, image: require("@/assets/destinations/newyork.jpg"), url: "https://example.com" },
    ],
  },
  iceland: {
    name: "Iceland",
    country: "Iceland",
    tagline: "Fire, ice, and the northern lights",
    match: 92,
    dnaType: "The Wild Adventurer",
    hero: [require("@/assets/destinations/iceland.jpg"), require("@/assets/destinations/iceland.jpg"), require("@/assets/destinations/iceland.jpg")],
    neighborhoods: [
      { id: "n1", name: "Reykjavik", desc: "Colorful capital & nightlife", match: 95, image: require("@/assets/destinations/iceland.jpg") },
      { id: "n2", name: "Golden Circle", desc: "Geysers, waterfalls, tectonic plates", match: 98, image: require("@/assets/destinations/iceland.jpg") },
      { id: "n3", name: "South Coast", desc: "Black sand beaches & glaciers", match: 96, image: require("@/assets/destinations/iceland.jpg") },
    ],
    activities: [
      { id: "a1", title: "Northern Lights Hunt", desc: "Guided jeep tour away from city lights. Best Oct–Mar.", price: 95, cashback: 8, rating: 4.8, reviews: 18000, duration: "4h", image: require("@/assets/destinations/iceland.jpg"), url: "https://example.com", categories: ["nature", "adventure"], mustSee: true, mustSeeReason: "One of the most breathtaking natural phenomena on Earth." },
      { id: "a2", title: "Blue Lagoon Geothermal Spa", desc: "Milky blue geothermal waters. Book months in advance.", price: 85, cashback: 7, rating: 4.7, reviews: 42000, duration: "3h", image: require("@/assets/destinations/iceland.jpg"), url: "https://www.bluelagoon.com", categories: ["wellness", "nature"], mustSee: true, mustSeeReason: "Iceland's most iconic experience." },
      { id: "a3", title: "Glacier Hike — Sólheimajökull", desc: "Crampons on, ice axe in hand. A 3-hour guided glacier walk.", price: 75, cashback: 6, rating: 4.9, reviews: 5800, duration: "4h", image: require("@/assets/destinations/iceland.jpg"), url: "https://example.com", categories: ["hiking", "adventure", "nature"], mustSee: false },
      { id: "a4", title: "Golden Circle Day Tour", desc: "Þingvellir, Geysir, and Gullfoss waterfall in one day.", price: 80, cashback: 6, rating: 4.8, reviews: 28000, duration: "Full day", image: require("@/assets/destinations/iceland.jpg"), url: "https://example.com", categories: ["nature", "adventure", "culture"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Dill Restaurant", cuisine: "New Nordic", price: "$$$$", match: 96, image: require("@/assets/destinations/iceland.jpg"), url: "https://example.com" },
      { id: "f2", name: "Bæjarins Beztu Pylsur", cuisine: "Icelandic Hot Dog", price: "$", match: 94, image: require("@/assets/destinations/iceland.jpg"), url: "https://example.com" },
    ],
  },
  amsterdam: {
    name: "Amsterdam",
    country: "Netherlands",
    tagline: "Canals, culture, and freedom",
    match: 93,
    dnaType: "The Free Spirit",
    hero: [require("@/assets/destinations/amsterdam.jpg"), require("@/assets/destinations/amsterdam.jpg"), require("@/assets/destinations/amsterdam.jpg")],
    neighborhoods: [
      { id: "n1", name: "Jordaan", desc: "Canals, galleries & boutiques", match: 97, image: require("@/assets/destinations/amsterdam.jpg") },
      { id: "n2", name: "De Pijp", desc: "Albert Cuyp Market & cafés", match: 94, image: require("@/assets/destinations/amsterdam.jpg") },
    ],
    activities: [
      { id: "a1", title: "Anne Frank House", desc: "The secret annex where Anne Frank hid. Book weeks ahead.", price: 16, cashback: 1, rating: 4.8, reviews: 45000, duration: "2h", image: require("@/assets/destinations/amsterdam.jpg"), url: "https://www.annefrank.org", categories: ["culture", "architecture"], mustSee: true, mustSeeReason: "One of the most moving historical sites in Europe." },
      { id: "a2", title: "Rijksmuseum", desc: "Rembrandt, Vermeer, and Dutch Golden Age masterpieces.", price: 22, cashback: 2, rating: 4.9, reviews: 38000, duration: "3h", image: require("@/assets/destinations/amsterdam.jpg"), url: "https://www.rijksmuseum.nl", categories: ["art", "culture"], mustSee: true, mustSeeReason: "The greatest collection of Dutch art in the world." },
      { id: "a3", title: "Canal Boat Tour", desc: "1-hour cruise through the UNESCO canal ring. Best at sunset.", price: 18, cashback: 1, rating: 4.7, reviews: 32000, duration: "1h", image: require("@/assets/destinations/amsterdam.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: false },
      { id: "a4", title: "Bike Tour — Countryside", desc: "Cycle through tulip fields and windmills outside the city.", price: 35, cashback: 3, rating: 4.8, reviews: 8400, duration: "4h", image: require("@/assets/destinations/amsterdam.jpg"), url: "https://example.com", categories: ["nature", "adventure", "culture"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Brouwerij 't IJ", cuisine: "Dutch Craft Beer", price: "$", match: 95, image: require("@/assets/destinations/amsterdam.jpg"), url: "https://example.com" },
      { id: "f2", name: "Bakers & Roasters", cuisine: "Brunch", price: "$$", match: 93, image: require("@/assets/destinations/amsterdam.jpg"), url: "https://example.com" },
    ],
  },
  machupicchu: {
    name: "Machu Picchu",
    country: "Peru",
    tagline: "Lost city of the Incas",
    match: 91,
    dnaType: "The Epic Adventurer",
    hero: [require("@/assets/destinations/machupicchu.jpg"), require("@/assets/destinations/machupicchu.jpg"), require("@/assets/destinations/machupicchu.jpg")],
    neighborhoods: [
      { id: "n1", name: "Aguas Calientes", desc: "Gateway town to Machu Picchu", match: 94, image: require("@/assets/destinations/machupicchu.jpg") },
      { id: "n2", name: "Cusco", desc: "Inca capital & acclimatization base", match: 96, image: require("@/assets/destinations/machupicchu.jpg") },
    ],
    activities: [
      { id: "a1", title: "Machu Picchu Sunrise", desc: "Enter at 6am for sunrise over the ancient citadel. Book 3 months ahead.", price: 70, cashback: 6, rating: 4.9, reviews: 48000, duration: "Full day", image: require("@/assets/destinations/machupicchu.jpg"), url: "https://example.com", categories: ["hiking", "culture", "architecture"], mustSee: true, mustSeeReason: "One of the New Seven Wonders of the World." },
      { id: "a2", title: "Inca Trail 4-Day Trek", desc: "Classic trek through cloud forest to Machu Picchu. Permits sell out 6 months ahead.", price: 650, cashback: 52, rating: 4.9, reviews: 8200, duration: "4 days", image: require("@/assets/destinations/machupicchu.jpg"), url: "https://example.com", categories: ["hiking", "adventure", "nature"], mustSee: true, mustSeeReason: "The most legendary trek in South America." },
      { id: "a3", title: "Huayna Picchu Hike", desc: "Steep 1-hour climb to the peak behind Machu Picchu. Limited permits.", price: 20, cashback: 2, rating: 4.8, reviews: 12000, duration: "2h", image: require("@/assets/destinations/machupicchu.jpg"), url: "https://example.com", categories: ["hiking", "adventure"], mustSee: false },
      { id: "a4", title: "Rainbow Mountain Day Trek", desc: "Vinicunca — striped mountain at 5,200m. Stunning but altitude is brutal.", price: 45, cashback: 4, rating: 4.7, reviews: 18000, duration: "Full day", image: require("@/assets/destinations/machupicchu.jpg"), url: "https://example.com", categories: ["hiking", "adventure", "nature"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Indio Feliz", cuisine: "Peruvian Fusion", price: "$$", match: 95, image: require("@/assets/destinations/machupicchu.jpg"), url: "https://example.com" },
      { id: "f2", name: "Mercado Central", cuisine: "Street Food", price: "$", match: 92, image: require("@/assets/destinations/machupicchu.jpg"), url: "https://example.com" },
    ],
  },
  phuket: {
    name: "Phuket",
    country: "Thailand",
    tagline: "Beaches, boats, and island magic",
    match: 93,
    dnaType: "The Beach Lover",
    hero: [require("@/assets/destinations/phuket.jpg"), require("@/assets/destinations/phuket.jpg"), require("@/assets/destinations/phuket.jpg")],
    neighborhoods: [
      { id: "n1", name: "Patong", desc: "Nightlife & main beach", match: 92, image: require("@/assets/destinations/phuket.jpg") },
      { id: "n2", name: "Kata", desc: "Surf & chill vibes", match: 95, image: require("@/assets/destinations/phuket.jpg") },
      { id: "n3", name: "Old Town", desc: "Sino-Portuguese architecture", match: 90, image: require("@/assets/destinations/phuket.jpg") },
    ],
    activities: [
      { id: "a1", title: "Phi Phi Islands Day Trip", desc: "Speedboat to Maya Bay, snorkeling, and cliff jumping. The ultimate island day.", price: 95, cashback: 8, rating: 4.8, reviews: 32000, duration: "Full day", image: require("@/assets/destinations/phuket.jpg"), url: "https://example.com", categories: ["beaches", "adventure", "nature"], mustSee: true, mustSeeReason: "The most beautiful islands in Thailand." },
      { id: "a2", title: "James Bond Island & Phang Nga Bay", desc: "Limestone karsts rising from emerald water. Kayak through sea caves.", price: 75, cashback: 6, rating: 4.7, reviews: 28000, duration: "Full day", image: require("@/assets/destinations/phuket.jpg"), url: "https://example.com", categories: ["nature", "adventure", "beaches"], mustSee: true, mustSeeReason: "One of the most iconic seascapes in the world." },
      { id: "a3", title: "Big Buddha & Wat Chalong", desc: "45m white marble Buddha with panoramic views. Free entry.", price: 0, cashback: 0, rating: 4.6, reviews: 18000, duration: "2h", image: require("@/assets/destinations/phuket.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: false },
      { id: "a4", title: "Thai Cooking Class", desc: "Market tour + cook 6 dishes. Pad Thai, green curry, mango sticky rice.", price: 40, cashback: 3, rating: 4.9, reviews: 5200, duration: "4h", image: require("@/assets/destinations/phuket.jpg"), url: "https://example.com", categories: ["food", "culture"], mustSee: false },
      { id: "a5", title: "Patong Nightlife", desc: "Bangla Road — neon lights, rooftop bars, and beach clubs.", price: 0, cashback: 0, rating: 4.5, reviews: 22000, duration: "Evening", image: require("@/assets/destinations/phuket.jpg"), url: "https://example.com", categories: ["nightlife"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Baan Rim Pa", cuisine: "Thai Fine Dining", price: "$$$", match: 96, image: require("@/assets/destinations/phuket.jpg"), url: "https://example.com" },
      { id: "f2", name: "Raya Restaurant", cuisine: "Southern Thai", price: "$$", match: 94, image: require("@/assets/destinations/phuket.jpg"), url: "https://example.com" },
      { id: "f3", name: "Street Food Stalls", cuisine: "Street Food", price: "$", match: 93, image: require("@/assets/destinations/phuket.jpg"), url: "https://example.com" },
    ],
  },
  patagonia: {
    name: "Patagonia",
    country: "Argentina & Chile",
    tagline: "The end of the world",
    match: 90,
    dnaType: "The Wild Explorer",
    hero: [require("@/assets/destinations/patagonia.jpg"), require("@/assets/destinations/patagonia.jpg"), require("@/assets/destinations/patagonia.jpg")],
    neighborhoods: [
      { id: "n1", name: "El Chaltén", desc: "Trekking capital of Argentina", match: 97, image: require("@/assets/destinations/patagonia.jpg") },
      { id: "n2", name: "Torres del Paine", desc: "Chile's most famous national park", match: 98, image: require("@/assets/destinations/patagonia.jpg") },
    ],
    activities: [
      { id: "a1", title: "Torres del Paine W Trek", desc: "5-day trek through glaciers, lakes, and granite towers. Book refugios early.", price: 450, cashback: 36, rating: 4.9, reviews: 8200, duration: "5 days", image: require("@/assets/destinations/patagonia.jpg"), url: "https://example.com", categories: ["hiking", "adventure", "nature"], mustSee: true, mustSeeReason: "One of the greatest treks on Earth." },
      { id: "a2", title: "Perito Moreno Glacier", desc: "Walk on a 30,000-year-old glacier. Ice trekking with crampons.", price: 120, cashback: 10, rating: 4.9, reviews: 18000, duration: "Full day", image: require("@/assets/destinations/patagonia.jpg"), url: "https://example.com", categories: ["adventure", "nature", "hiking"], mustSee: true, mustSeeReason: "The most accessible advancing glacier in the world." },
      { id: "a3", title: "Fitz Roy Day Hike", desc: "Laguna de los Tres — 8-hour hike to the base of Fitz Roy.", price: 0, cashback: 0, rating: 4.9, reviews: 12000, duration: "Full day", image: require("@/assets/destinations/patagonia.jpg"), url: "https://example.com", categories: ["hiking", "nature"], mustSee: false },
    ],
    food: [
      { id: "f1", name: "Estancia Cristina", cuisine: "Patagonian Lamb", price: "$$$", match: 96, image: require("@/assets/destinations/patagonia.jpg"), url: "https://example.com" },
      { id: "f2", name: "El Muro", cuisine: "Argentine Grill", price: "$$", match: 94, image: require("@/assets/destinations/patagonia.jpg"), url: "https://example.com" },
    ],
  },
  santorini: {
    name: "Santorini",
    country: "Greece",
    tagline: "Where sunsets stop time",
    match: 95,
    dnaType: "The Mindful Traveler",
    hero: [
      require("@/assets/destinations/santorini.jpg"),
      require("@/assets/destinations/santorini.jpg"),
      require("@/assets/destinations/santorini.jpg"),
    ],
    neighborhoods: [
      { id: "n1", name: "Oia", desc: "Iconic sunset views", match: 98, image: require("@/assets/destinations/santorini.jpg") },
      { id: "n2", name: "Fira", desc: "Cliffside capital", match: 94, image: require("@/assets/destinations/santorini.jpg") },
      { id: "n3", name: "Akrotiri", desc: "Ancient ruins", match: 90, image: require("@/assets/destinations/santorini.jpg") },
    ],
    activities: [
      {
        id: "a1", title: "Oia Sunset — Kastro Viewpoint", desc: "The most photographed sunset in the world. Arrive 1h early for a spot.", price: 0, cashback: 0, rating: 4.9, reviews: 42000, duration: "2h", image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: true, mustSeeReason: "The reason people come to Santorini.",
      },
      {
        id: "a2", title: "Caldera Sailing Cruise", desc: "Catamaran tour with hot springs, snorkeling, and a BBQ dinner on board.", price: 180, cashback: 14, rating: 4.9, reviews: 3200, duration: "5h", image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com", categories: ["beaches", "adventure", "food"], mustSee: true, mustSeeReason: "The best way to see the caldera and volcanic islands.",
      },
      {
        id: "a3", title: "Wine Tasting Tour", desc: "Visit 3 wineries and taste Assyrtiko, the island's signature white wine.", price: 95, cashback: 8, rating: 4.8, reviews: 1800, duration: "4h", image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com", categories: ["food", "culture"], mustSee: false,
      },
      {
        id: "a4", title: "Volcano Hike — Nea Kameni", desc: "Guided hike to the active volcanic crater. Combine with hot springs swim.", price: 65, cashback: 5, rating: 4.7, reviews: 950, duration: "3h", image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com", categories: ["hiking", "adventure", "nature"], mustSee: false,
      },
      {
        id: "a5", title: "Red Beach", desc: "Dramatic volcanic red cliffs meet turquoise water. Unique in the world.", price: 0, cashback: 0, rating: 4.6, reviews: 8400, duration: "2h", image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com", categories: ["beaches", "nature"], mustSee: false,
      },
      {
        id: "a6", title: "Akrotiri Archaeological Site", desc: "A Bronze Age city preserved under volcanic ash — Greece's Pompeii.", price: 14, cashback: 1, rating: 4.7, reviews: 3600, duration: "2h", image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com", categories: ["culture", "architecture"], mustSee: false,
      },
      {
        id: "a7", title: "Caldera Spa — Vedema Resort", desc: "Infinity pool overlooking the caldera. Treatments with volcanic minerals.", price: 220, cashback: 18, rating: 4.9, reviews: 800, duration: "3h", image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com", categories: ["wellness"], mustSee: false,
      },
    ],
    food: [
      { id: "f1", name: "Ambrosia", cuisine: "Greek", price: "$$$", match: 96, image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com" },
      { id: "f2", name: "Metaxi Mas", cuisine: "Taverna", price: "$$", match: 93, image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com" },
      { id: "f3", name: "Lucky's Souvlakis", cuisine: "Street Food", price: "$", match: 89, image: require("@/assets/destinations/santorini.jpg"), url: "https://example.com" },
    ],
  },
};

// ── Pace tip helper ───────────────────────────────────────────────────────────

function getPaceTip(pace: string, total: number): string {
  if (pace === "slow") return `For your pace, we suggest 2–3 activities per day — pick your ${Math.min(total, 6)} favorites.`;
  if (pace === "full") return `You're Full Send — you can fit all ${total} activities if you plan smart.`;
  return `For a balanced trip, 4–5 activities per day works well — ${Math.min(total, 8)} total is ideal.`;
}

function getMaxActivities(pace: string): number {
  if (pace === "slow") return 6;
  if (pace === "full") return 999;
  return 8;
}

// ── Main screen ───────────────────────────────────────────────────────────────

type ContentTab = "mustSee" | "forYou" | "fullList";

export default function DestinationDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string }>();
  const { state } = useStore();
  const destId = params.id ?? "dubai";
  const dest = DESTINATIONS[destId] ?? DESTINATIONS.dubai;

  const [heroIndex, setHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<ContentTab>("mustSee");
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const userActivities = state.profile?.activityCategories ?? [];
  const userPace = state.profile?.tripPace ?? "balanced";

  const haptic = () => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); };

  const handleBack = () => { haptic(); router.back(); };
  const handlePlanTrip = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: "/(trip)/itinerary-builder", params: { destination: dest.name, days: "5" } } as never);
  };
  const handleMoreInfo = async (url: string) => {
    haptic();
    await WebBrowser.openBrowserAsync(url);
  };

  const headerOpacity = scrollY.interpolate({ inputRange: [0, 200], outputRange: [0, 1], extrapolate: "clamp" });

  // ── Filtered activity lists ───────────────────────────────────────────────

  const mustSeeActivities = dest.activities.filter((a) => a.mustSee);

  const forYouActivities = userActivities.length > 0
    ? dest.activities.filter((a) => a.categories.some((c) => userActivities.includes(c)))
    : dest.activities;

  const fullListCategories: ActivityCategory[] = [...new Set(dest.activities.flatMap((a) => a.categories))];
  const fullListFiltered = selectedCategory
    ? dest.activities.filter((a) => a.categories.includes(selectedCategory))
    : dest.activities;

  const maxActivities = getMaxActivities(userPace);

  // ── Booking modal state ───────────────────────────────────────────────────
  const [bookingActivity, setBookingActivity] = useState<BookableActivity | null>(null);
  const [bookingVisible, setBookingVisible] = useState(false);

  const handleBookActivity = (item: ActivityItem) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setBookingActivity({
      id: item.id,
      title: item.title,
      desc: item.desc,
      price: item.price,
      cashback: item.cashback,
      rating: item.rating,
      reviews: item.reviews,
      duration: item.duration,
      image: item.image,
      url: item.url,
    });
    setBookingVisible(true);
  };

  // ── Render helpers ────────────────────────────────────────────────────────

  const renderActivityCard = (item: ActivityItem, showMustSeeTag = false) => (
    <View key={item.id} style={S.actCard}>
      <Image source={item.image} style={S.actImage} resizeMode="cover" />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} locations={[0.5, 1]} style={S.actImageGradient} />

      {/* Category pills on image */}
      <View style={S.actCategoryRow}>
        {item.categories.slice(0, 2).map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <View key={cat} style={[S.actCategoryPill, { backgroundColor: meta.color + "CC" }]}>
              <Text style={S.actCategoryText}>{meta.emoji} {meta.label}</Text>
            </View>
          );
        })}
        {showMustSeeTag && item.mustSee && (
          <View style={S.mustSeeTag}>
            <Text style={S.mustSeeTagText}>⭐ Must-See</Text>
          </View>
        )}
      </View>

      <View style={S.actContent}>
        <Text style={S.actTitle}>{item.title}</Text>
        <View style={S.actMeta}>
          <Text style={S.actRating}>⭐ {item.rating}</Text>
          <Text style={S.actReviews}>({item.reviews.toLocaleString()})</Text>
          <Text style={S.actDuration}>· {item.duration}</Text>
        </View>

        {/* Must-see reason */}
        {item.mustSee && item.mustSeeReason && (
          <View style={S.mustSeeReason}>
            <Text style={S.mustSeeReasonText}>{item.mustSeeReason}</Text>
          </View>
        )}

        <View style={S.actPricing}>
          <View>
            <Text style={S.actPriceLabel}>{item.price === 0 ? "Free" : "From"}</Text>
            {item.price > 0 && <Text style={S.actPrice}>${item.price}</Text>}
          </View>
          {item.cashback > 0 && (
            <View style={S.actCashback}>
              <IconSymbol name="star.fill" size={14} color="#FBBF24" />
              <Text style={S.actCashbackText}>${item.cashback} back</Text>
            </View>
          )}
        </View>

        <Text style={S.actDesc} numberOfLines={2}>{item.desc}</Text>

        <View style={S.actActions}>
          <TouchableOpacity style={S.actMoreBtn} onPress={() => handleMoreInfo(item.url)} activeOpacity={0.8}>
            <Text style={S.actMoreText}>More Info</Text>
            <IconSymbol name="chevron.right" size={13} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
          {item.price > 0 && (
            <TouchableOpacity style={S.actBookBtn} onPress={() => handleBookActivity(item)} activeOpacity={0.85}>
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <Text style={S.actBookBtnText}>Book · ${item.price}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderMustSeeTab = () => (
    <View style={S.tabContent}>
      {/* Pace tip */}
      <View style={S.paceTipCard}>
        <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
        <Text style={S.paceTipEmoji}>{userPace === "slow" ? "🌿" : userPace === "full" ? "🔥" : "⚡"}</Text>
        <Text style={S.paceTipText}>{getPaceTip(userPace, dest.activities.length)}</Text>
      </View>

      <Text style={S.tabSectionLabel}>
        {mustSeeActivities.length} experiences everyone should do in {dest.name}
      </Text>
      {mustSeeActivities.map((a) => renderActivityCard(a, false))}
    </View>
  );

  const renderForYouTab = () => {
    const hasProfile = userActivities.length > 0;
    const capped = forYouActivities.slice(0, maxActivities);
    const remaining = forYouActivities.length - capped.length;

    return (
      <View style={S.tabContent}>
        {/* DNA match banner */}
        {hasProfile ? (
          <View style={S.dnaMatchBanner}>
            <LinearGradient colors={["rgba(100,67,244,0.25)", "rgba(249,68,152,0.15)"]} style={StyleSheet.absoluteFillObject} />
            <View style={S.dnaMatchLeft}>
              <Text style={S.dnaMatchTitle}>Filtered for your DNA</Text>
              <Text style={S.dnaMatchSub}>
                Based on: {userActivities.slice(0, 3).map((a) => CATEGORY_META[a]?.emoji + " " + CATEGORY_META[a]?.label).join(" · ")}
                {userActivities.length > 3 ? ` +${userActivities.length - 3} more` : ""}
              </Text>
            </View>
            <Text style={S.dnaMatchCount}>{forYouActivities.length}</Text>
          </View>
        ) : (
          <View style={S.noProfileBanner}>
            <Text style={S.noProfileText}>Complete your DNA quiz to see personalized picks.</Text>
          </View>
        )}

        {/* Pace tip */}
        {hasProfile && (
          <View style={S.paceTipCard}>
            <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
            <Text style={S.paceTipEmoji}>{userPace === "slow" ? "🌿" : userPace === "full" ? "🔥" : "⚡"}</Text>
            <Text style={S.paceTipText}>{getPaceTip(userPace, forYouActivities.length)}</Text>
          </View>
        )}

        {capped.map((a) => renderActivityCard(a, a.mustSee))}

        {remaining > 0 && (
          <View style={S.moreActivitiesNote}>
            <Text style={S.moreActivitiesText}>
              +{remaining} more match your profile — switch to Full List to see all.
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderFullListTab = () => (
    <View style={S.tabContent}>
      {/* Category filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.categoryFilterRow}>
        <TouchableOpacity
          style={[S.categoryChip, !selectedCategory && S.categoryChipActive]}
          onPress={() => { haptic(); setSelectedCategory(null); }}
        >
          <Text style={[S.categoryChipText, !selectedCategory && S.categoryChipTextActive]}>All</Text>
        </TouchableOpacity>
        {fullListCategories.map((cat) => {
          const meta = CATEGORY_META[cat];
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[S.categoryChip, isActive && { borderColor: meta.color, backgroundColor: meta.color + "22" }]}
              onPress={() => { haptic(); setSelectedCategory(isActive ? null : cat); }}
            >
              <Text style={S.categoryChipText}>{meta.emoji} {meta.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={S.tabSectionLabel}>
        {fullListFiltered.length} experience{fullListFiltered.length !== 1 ? "s" : ""}
        {selectedCategory ? ` in ${CATEGORY_META[selectedCategory]?.label}` : " in " + dest.name}
      </Text>

      {fullListFiltered.map((a) => renderActivityCard(a, a.mustSee))}
    </View>
  );

  // ── Main render ───────────────────────────────────────────────────────────

  return (
    <View style={S.container}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Hero slideshow */}
      <View style={S.heroWrap}>
        <FlatList
          data={dest.hero}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setHeroIndex(index);
          }}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={S.heroImage} resizeMode="cover" />
          )}
        />
        <LinearGradient colors={["transparent", "rgba(13,6,40,0.95)"]} locations={[0.5, 1]} style={S.heroGradient} />
        <View style={S.heroDots}>
          {dest.hero.map((_: any, i: number) => (
            <View key={i} style={[S.heroDot, i === heroIndex && S.heroDotActive]} />
          ))}
        </View>
        <Animated.View style={[S.header, { opacity: headerOpacity, paddingTop: insets.top + 8 }]}>
          <LinearGradient colors={["rgba(13,6,40,0.98)", "rgba(13,6,40,0.85)"]} style={StyleSheet.absoluteFillObject} />
          <TouchableOpacity style={S.backBtn} onPress={handleBack} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={S.headerTitle}>{dest.name}</Text>
          <View style={{ width: 40 }} />
        </Animated.View>
        <TouchableOpacity style={[S.floatingBack, { top: insets.top + 8 }]} onPress={handleBack} activeOpacity={0.8}>
          <LinearGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.2)"]} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Title card */}
        <View style={S.titleCard}>
          <Text style={S.destName}>{dest.name}</Text>
          <Text style={S.destCountry}>{dest.country}</Text>
          <Text style={S.destTagline}>{dest.tagline}</Text>
          <View style={S.matchCard}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            <View style={S.matchOrb1} />
            <View style={S.matchOrb2} />
            <Text style={S.matchPercent}>{dest.match}%</Text>
            <Text style={S.matchLabel}>Perfect match for</Text>
            <Text style={S.matchDna}>{dest.dnaType}</Text>
          </View>
        </View>

        {/* Neighborhoods */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Neighborhoods</Text>
          <FlatList
            data={dest.neighborhoods}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={S.neighborhoodCard} activeOpacity={0.88}>
                <Image source={item.image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]} locations={[0.4, 1]} style={StyleSheet.absoluteFillObject} />
                <View style={S.neighborhoodBadge}>
                  <Text style={S.neighborhoodMatch}>{item.match}% match</Text>
                </View>
                <View style={S.neighborhoodBottom}>
                  <Text style={S.neighborhoodName}>{item.name}</Text>
                  <Text style={S.neighborhoodDesc}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* 3-tab activity section */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Things to Do</Text>

          {/* Tab bar */}
          <View style={S.tabBar}>
            {([
              { id: "mustSee" as ContentTab, label: "⭐ Must-See" },
              { id: "forYou" as ContentTab, label: "✨ For You" },
              { id: "fullList" as ContentTab, label: "📋 Full List" },
            ]).map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[S.tabBtn, activeTab === tab.id && S.tabBtnActive]}
                onPress={() => { haptic(); setActiveTab(tab.id); }}
                activeOpacity={0.8}
              >
                {activeTab === tab.id && (
                  <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                )}
                <Text style={[S.tabBtnText, activeTab === tab.id && S.tabBtnTextActive]}>{tab.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === "mustSee" && renderMustSeeTab()}
          {activeTab === "forYou" && renderForYouTab()}
          {activeTab === "fullList" && renderFullListTab()}
        </View>

        {/* Food & Drink */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Food & Drink</Text>
          {dest.food.map((f) => (
            <TouchableOpacity key={f.id} style={S.foodCard} onPress={() => handleMoreInfo(f.url)} activeOpacity={0.88}>
              <Image source={f.image} style={S.foodImage} resizeMode="cover" />
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} locations={[0.3, 1]} style={StyleSheet.absoluteFillObject} />
              <View style={S.foodContent}>
                <Text style={S.foodName}>{f.name}</Text>
                <View style={S.foodMeta}>
                  <Text style={S.foodCuisine}>{f.cuisine}</Text>
                  <Text style={S.foodPrice}>{f.price}</Text>
                  <Text style={S.foodMatch}>{f.match}% match</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>

      {/* Floating CTA */}
      <View style={[S.floatingCta, { paddingBottom: insets.bottom + 12 }]}>
        <LinearGradient colors={["rgba(13,6,40,0)", "rgba(13,6,40,0.98)"]} locations={[0, 0.3]} style={S.floatingCtaGradient} />
        <TouchableOpacity style={S.planBtn} onPress={handlePlanTrip} activeOpacity={0.88}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <Text style={S.planBtnText}>Plan This Trip →</Text>
        </TouchableOpacity>
      </View>

      {/* Booking modal */}
      <ActivityBookingModal
        activity={bookingActivity}
        visible={bookingVisible}
        onClose={() => setBookingVisible(false)}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },

  heroWrap: { width, height: height * 0.5 },
  heroImage: { width, height: height * 0.5 },
  heroGradient: { position: "absolute", bottom: 0, left: 0, right: 0, height: 200 },
  heroDots: { position: "absolute", bottom: 20, left: 0, right: 0, flexDirection: "row", justifyContent: "center", gap: 6 },
  heroDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.55)" },
  heroDotActive: { width: 20, backgroundColor: "#FFFFFF" },

  header: { position: "absolute", top: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 130 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  floatingBack: { position: "absolute", left: 16, width: 40, height: 40, borderRadius: 20, overflow: "hidden", alignItems: "center", justifyContent: "center" },

  titleCard: { marginTop: -40, marginHorizontal: 20, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  destName: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", letterSpacing: -1, fontFamily: "Chillax-Bold" },
  destCountry: { color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 2 },
  destTagline: { color: "rgba(255,255,255,0.7)", fontSize: 15, fontStyle: "italic", marginTop: 8 },
  matchCard: { marginTop: 16, borderRadius: 18, overflow: "hidden", padding: 18, alignItems: "center" },
  matchOrb1: { position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.55)", top: -30, right: -20 },
  matchOrb2: { position: "absolute", width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.55)", bottom: -10, left: 10 },
  matchPercent: { color: "#FFFFFF", fontSize: 48, fontWeight: "900", letterSpacing: -2, fontFamily: "Chillax-Bold" },
  matchLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 },
  matchDna: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", marginTop: 2, fontFamily: "Chillax-Bold" },

  section: { marginTop: 28 },
  sectionTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", paddingHorizontal: 20, letterSpacing: -0.5, marginBottom: 12, fontFamily: "Chillax-Bold" },

  neighborhoodCard: { width: width * 0.42, height: 180, borderRadius: 18, overflow: "hidden", marginRight: 10, marginTop: 0 },
  neighborhoodBadge: { position: "absolute", top: 10, right: 10, backgroundColor: "rgba(100,67,244,0.9)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  neighborhoodMatch: { color: "#FFFFFF", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  neighborhoodBottom: { position: "absolute", bottom: 12, left: 12, right: 12 },
  neighborhoodName: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  neighborhoodDesc: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 },

  // Tab bar
  tabBar: { flexDirection: "row", marginHorizontal: 20, marginBottom: 16, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 16, padding: 4, gap: 2 },
  tabBtn: { flex: 1, borderRadius: 12, paddingVertical: 10, alignItems: "center", overflow: "hidden" },
  tabBtnActive: {},
  tabBtnText: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "700" },
  tabBtnTextActive: { color: "#FFFFFF" },

  // Tab content
  tabContent: { paddingHorizontal: 20, gap: 16 },
  tabSectionLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 },

  // Pace tip
  paceTipCard: { borderRadius: 16, overflow: "hidden", padding: 14, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  paceTipEmoji: { fontSize: 24 },
  paceTipText: { flex: 1, color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 19 },

  // DNA match banner
  dnaMatchBanner: { borderRadius: 16, overflow: "hidden", padding: 14, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  dnaMatchLeft: { flex: 1 },
  dnaMatchTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  dnaMatchSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 3, lineHeight: 17 },
  dnaMatchCount: { color: "#C084FC", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold" },
  noProfileBanner: { borderRadius: 16, padding: 14, backgroundColor: "rgba(255,255,255,0.55)", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  noProfileText: { color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 19 },
  moreActivitiesNote: { borderRadius: 14, padding: 14, backgroundColor: "rgba(100,67,244,0.1)", borderWidth: 1, borderColor: "rgba(100,67,244,0.25)", alignItems: "center" },
  moreActivitiesText: { color: "rgba(192,132,252,0.8)", fontSize: 13, fontWeight: "600", textAlign: "center" },

  // Category filter
  categoryFilterRow: { paddingHorizontal: 20, paddingBottom: 130, gap: 8 },
  categoryChip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.55)", backgroundColor: "rgba(255,255,255,0.55)" },
  categoryChipActive: { borderColor: "#6443F4", backgroundColor: "rgba(100,67,244,0.2)" },
  categoryChipText: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "700" },
  categoryChipTextActive: { color: "#FFFFFF" },

  // Activity card
  actCard: { borderRadius: 20, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.55)", borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  actImage: { width: "100%", height: 180 },
  actImageGradient: { position: "absolute", top: 0, left: 0, right: 0, height: 180 },
  actCategoryRow: { position: "absolute", top: 12, left: 12, flexDirection: "row", gap: 6, flexWrap: "wrap" },
  actCategoryPill: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  actCategoryText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  mustSeeTag: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: "rgba(255,215,0,0.85)" },
  mustSeeTagText: { color: "#000", fontSize: 11, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  actContent: { padding: 16, gap: 8 },
  actTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", lineHeight: 22, fontFamily: "Chillax-Bold" },
  actMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  actRating: { color: "#FBBF24", fontSize: 13, fontWeight: "700" },
  actReviews: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  actDuration: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  mustSeeReason: { backgroundColor: "rgba(255,215,0,0.1)", borderRadius: 10, padding: 10, borderWidth: 1, borderColor: "rgba(255,215,0,0.2)" },
  mustSeeReasonText: { color: "rgba(255,215,0,0.9)", fontSize: 12, lineHeight: 17 },
  actPricing: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  actPriceLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "600" },
  actPrice: { color: "#FFFFFF", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  actCashback: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,215,0,0.12)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
  actCashbackText: { color: "#FBBF24", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },
  actDesc: { color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 19 },
  actActions: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 4 },
  actMoreBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  actMoreText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "600" },
  actBookBtn: { borderRadius: 12, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 8 },
  actBookBtnText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", fontFamily: "Chillax-Bold" },

  // Food
  foodCard: { marginBottom: 12, borderRadius: 18, overflow: "hidden", height: 120 },
  foodImage: { width: "100%", height: 120 },
  foodContent: { position: "absolute", bottom: 12, left: 14, right: 14 },
  foodName: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  foodMeta: { flexDirection: "row", gap: 10, marginTop: 4 },
  foodCuisine: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  foodPrice: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  foodMatch: { color: "#C084FC", fontSize: 12, fontWeight: "700" },

  // Floating CTA
  floatingCta: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 20 },
  floatingCtaGradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  planBtn: { borderRadius: 20, overflow: "hidden", paddingVertical: 18, alignItems: "center", justifyContent: "center" },
  planBtnText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
