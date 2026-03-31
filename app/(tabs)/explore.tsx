import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Dimensions, FlatList } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";

const { width } = Dimensions.get("window");

const DESTINATIONS = [
  { id: "1", city: "Paris", country: "France", emoji: "🗼", temp: "18°C", rating: 4.9, price: 1200, tag: "Trending", tagColor: "#E91E8C", desc: "City of love & lights", bg: ["#2D1B69", "#4A1942"] },
  { id: "2", city: "Tokyo", country: "Japan", emoji: "⛩️", temp: "22°C", rating: 4.8, price: 1800, tag: "Popular", tagColor: "#FF9800", desc: "Ancient meets futuristic", bg: ["#1A3A5C", "#2D1B69"] },
  { id: "3", city: "Bali", country: "Indonesia", emoji: "🌴", temp: "30°C", rating: 4.7, price: 950, tag: "Best Value", tagColor: "#4CAF50", desc: "Paradise island vibes", bg: ["#1B4D1E", "#2D3A1B"] },
  { id: "4", city: "New York", country: "USA", emoji: "🗽", temp: "15°C", rating: 4.6, price: 1400, tag: "City Life", tagColor: "#2196F3", desc: "The city that never sleeps", bg: ["#1A2A4A", "#2D1B69"] },
  { id: "5", city: "Santorini", country: "Greece", emoji: "🏛️", temp: "24°C", rating: 4.9, price: 1600, tag: "Romantic", tagColor: "#E91E8C", desc: "Iconic white & blue", bg: ["#1A3A5C", "#2D1B69"] },
  { id: "6", city: "Dubai", country: "UAE", emoji: "🌆", temp: "35°C", rating: 4.7, price: 1100, tag: "Luxury", tagColor: "#FFD700", desc: "Opulence redefined", bg: ["#3A2A1A", "#2D1B69"] },
];

const CATEGORIES = [
  { id: "all", label: "All", icon: "🌍" },
  { id: "beach", label: "Beach", icon: "🏖️" },
  { id: "city", label: "City", icon: "🏙️" },
  { id: "nature", label: "Nature", icon: "🏔️" },
  { id: "culture", label: "Culture", icon: "🎭" },
  { id: "food", label: "Foodie", icon: "🍜" },
  { id: "adventure", label: "Adventure", icon: "🧗" },
];

const TRENDING_EXPERIENCES = [
  { id: "e1", title: "Northern Lights Tour", location: "Iceland", price: 299, emoji: "🌌", rating: 5.0 },
  { id: "e2", title: "Sushi Masterclass", location: "Tokyo", price: 89, emoji: "🍣", rating: 4.9 },
  { id: "e3", title: "Eiffel Tower Dinner", location: "Paris", price: 149, emoji: "🗼", rating: 4.8 },
  { id: "e4", title: "Sunrise Yoga Bali", location: "Bali", price: 45, emoji: "🧘", rating: 4.9 },
];

const TRAVEL_STORIES = [
  { id: "s1", user: "Sarah K.", avatar: "👩", dest: "Santorini", text: "Most magical sunset of my life! TRAVI planned everything perfectly 🌅", likes: 234, time: "2h ago" },
  { id: "s2", user: "James M.", avatar: "👨", dest: "Tokyo", text: "3 weeks in Japan and TRAVI's AI found hidden gems I'd never have discovered alone 🏯", likes: 189, time: "5h ago" },
  { id: "s3", user: "Priya R.", avatar: "👩🏽", dest: "Bali", text: "The villa TRAVI recommended was pure paradise. Already planning my return! 🌴", likes: 312, time: "1d ago" },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedDests, setSavedDests] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedDests((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]);
  };

  const filtered = DESTINATIONS.filter((d) =>
    search === "" || d.city.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerGreeting}>Discover</Text>
              <Text style={styles.headerSub}>Where will you go next?</Text>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
              <IconSymbol name="slider.horizontal.3" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <IconSymbol name="magnifyingglass" size={18} color="#A78BCA" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search destinations, experiences..."
              placeholderTextColor="#A78BCA"
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <IconSymbol name="xmark.circle.fill" size={18} color="#A78BCA" />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryPill, selectedCategory === cat.id && styles.categoryPillActive]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={[styles.categoryLabel, selectedCategory === cat.id && styles.categoryLabelActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>✨ Featured Destinations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filtered}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 14, paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.destCard}
                onPress={() => router.push({ pathname: "/(trip)/plan" as never })}
                activeOpacity={0.9}
              >
                <LinearGradient colors={item.bg as [string, string]} style={styles.destCardGradient}>
                  {/* Tag */}
                  <View style={[styles.destTag, { backgroundColor: item.tagColor + "30", borderColor: item.tagColor }]}>
                    <Text style={[styles.destTagText, { color: item.tagColor }]}>{item.tag}</Text>
                  </View>

                  {/* Save Button */}
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => toggleSave(item.id)}
                  >
                    <IconSymbol
                      name={savedDests.includes(item.id) ? "heart.fill" : "heart"}
                      size={20}
                      color={savedDests.includes(item.id) ? "#E91E8C" : "#FFFFFF"}
                    />
                  </TouchableOpacity>

                  {/* Emoji */}
                  <Text style={styles.destEmoji}>{item.emoji}</Text>

                  {/* Info */}
                  <View style={styles.destInfo}>
                    <Text style={styles.destCity}>{item.city}</Text>
                    <Text style={styles.destCountry}>{item.country}</Text>
                    <Text style={styles.destDesc}>{item.desc}</Text>

                    <View style={styles.destMeta}>
                      <View style={styles.destRating}>
                        <IconSymbol name="star.fill" size={12} color="#FFD700" />
                        <Text style={styles.destRatingText}>{item.rating}</Text>
                      </View>
                      <Text style={styles.destTemp}>{item.temp}</Text>
                      <Text style={styles.destPrice}>from ${item.price}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Trending Experiences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Trending Experiences</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {TRENDING_EXPERIENCES.map((exp) => (
            <TouchableOpacity key={exp.id} style={styles.expCard} activeOpacity={0.85}>
              <LinearGradient colors={["#2D1B69", "#3D2580"]} style={styles.expCardGradient}>
                <Text style={styles.expEmoji}>{exp.emoji}</Text>
                <View style={styles.expInfo}>
                  <Text style={styles.expTitle}>{exp.title}</Text>
                  <View style={styles.expMeta}>
                    <IconSymbol name="location.fill" size={12} color="#A78BCA" />
                    <Text style={styles.expLocation}>{exp.location}</Text>
                    <View style={styles.expRating}>
                      <IconSymbol name="star.fill" size={11} color="#FFD700" />
                      <Text style={styles.expRatingText}>{exp.rating}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.expPriceCol}>
                  <Text style={styles.expPrice}>${exp.price}</Text>
                  <Text style={styles.expPriceSub}>per person</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Travel Stories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💬 Travel Stories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {TRAVEL_STORIES.map((story) => (
            <View key={story.id} style={styles.storyCard}>
              <View style={styles.storyHeader}>
                <View style={styles.storyAvatar}>
                  <Text style={styles.storyAvatarText}>{story.avatar}</Text>
                </View>
                <View style={styles.storyUserInfo}>
                  <Text style={styles.storyUser}>{story.user}</Text>
                  <View style={styles.storyMeta}>
                    <IconSymbol name="location.fill" size={11} color="#A78BCA" />
                    <Text style={styles.storyDest}>{story.dest}</Text>
                    <Text style={styles.storyTime}>{story.time}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.storyFollow}>
                  <Text style={styles.storyFollowText}>Follow</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.storyText}>{story.text}</Text>
              <View style={styles.storyActions}>
                <TouchableOpacity style={styles.storyAction}>
                  <IconSymbol name="heart" size={16} color="#A78BCA" />
                  <Text style={styles.storyActionText}>{story.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.storyAction}>
                  <IconSymbol name="bubble.left.fill" size={16} color="#A78BCA" />
                  <Text style={styles.storyActionText}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.storyAction}>
                  <IconSymbol name="square.and.arrow.up" size={16} color="#A78BCA" />
                  <Text style={styles.storyActionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Plan CTA */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            onPress={() => router.push("/(trip)/plan" as never)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#7B2FBE", "#E91E8C"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaCard}
            >
              <Text style={styles.ctaEmoji}>🚀</Text>
              <View style={styles.ctaText}>
                <Text style={styles.ctaTitle}>Ready to explore?</Text>
                <Text style={styles.ctaSub}>Let TRAVI plan your perfect trip</Text>
              </View>
              <IconSymbol name="arrow.right" size={22} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, paddingBottom: 16, gap: 14 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  headerGreeting: { color: "#FFFFFF", fontSize: 28, fontWeight: "800" },
  headerSub: { color: "#A78BCA", fontSize: 14, marginTop: 2 },
  filterBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center", justifyContent: "center",
  },
  searchBar: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: "#4A3080", gap: 10,
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 15 },
  categories: { gap: 8, paddingHorizontal: 20, paddingVertical: 14 },
  categoryPill: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "#2D1B69", borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: "#4A3080",
  },
  categoryPillActive: { backgroundColor: "#7B2FBE", borderColor: "#7B2FBE" },
  categoryIcon: { fontSize: 15 },
  categoryLabel: { color: "#A78BCA", fontSize: 13, fontWeight: "600" },
  categoryLabelActive: { color: "#FFFFFF" },
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, marginBottom: 14,
  },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  seeAll: { color: "#7B2FBE", fontSize: 14, fontWeight: "600" },
  destCard: { width: 220, borderRadius: 20, overflow: "hidden" },
  destCardGradient: { padding: 16, height: 260, justifyContent: "space-between" },
  destTag: {
    alignSelf: "flex-start", borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  destTagText: { fontSize: 11, fontWeight: "700" },
  saveBtn: {
    position: "absolute", top: 14, right: 14,
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center", justifyContent: "center",
  },
  destEmoji: { fontSize: 52, textAlign: "center", marginTop: 8 },
  destInfo: { gap: 4 },
  destCity: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },
  destCountry: { color: "#A78BCA", fontSize: 13 },
  destDesc: { color: "#C4B5D4", fontSize: 12, marginTop: 2 },
  destMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
  destRating: { flexDirection: "row", alignItems: "center", gap: 3 },
  destRatingText: { color: "#FFD700", fontSize: 12, fontWeight: "700" },
  destTemp: { color: "#A78BCA", fontSize: 12 },
  destPrice: { color: "#4CAF50", fontSize: 12, fontWeight: "700", marginLeft: "auto" },
  expCard: { marginHorizontal: 20, marginBottom: 10, borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "#4A3080" },
  expCardGradient: { flexDirection: "row", alignItems: "center", padding: 14, gap: 14 },
  expEmoji: { fontSize: 32, width: 40, textAlign: "center" },
  expInfo: { flex: 1, gap: 4 },
  expTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  expMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  expLocation: { color: "#A78BCA", fontSize: 12, flex: 1 },
  expRating: { flexDirection: "row", alignItems: "center", gap: 3 },
  expRatingText: { color: "#FFD700", fontSize: 11, fontWeight: "700" },
  expPriceCol: { alignItems: "flex-end" },
  expPrice: { color: "#4CAF50", fontSize: 16, fontWeight: "800" },
  expPriceSub: { color: "#A78BCA", fontSize: 10 },
  storyCard: {
    marginHorizontal: 20, marginBottom: 12,
    backgroundColor: "#2D1B69", borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: "#4A3080", gap: 10,
  },
  storyHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  storyAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#3D2580", alignItems: "center", justifyContent: "center",
    borderWidth: 1.5, borderColor: "#7B2FBE",
  },
  storyAvatarText: { fontSize: 20 },
  storyUserInfo: { flex: 1 },
  storyUser: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  storyMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  storyDest: { color: "#A78BCA", fontSize: 12 },
  storyTime: { color: "#6B5A8A", fontSize: 11, marginLeft: 4 },
  storyFollow: {
    borderWidth: 1, borderColor: "#7B2FBE",
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
  },
  storyFollowText: { color: "#7B2FBE", fontSize: 12, fontWeight: "600" },
  storyText: { color: "#C4B5D4", fontSize: 14, lineHeight: 20 },
  storyActions: { flexDirection: "row", gap: 20 },
  storyAction: { flexDirection: "row", alignItems: "center", gap: 5 },
  storyActionText: { color: "#A78BCA", fontSize: 13 },
  ctaSection: { paddingHorizontal: 20, marginBottom: 20 },
  ctaCard: {
    flexDirection: "row", alignItems: "center",
    borderRadius: 18, padding: 18, gap: 12,
  },
  ctaEmoji: { fontSize: 28 },
  ctaText: { flex: 1 },
  ctaTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  ctaSub: { color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 2 },
});
