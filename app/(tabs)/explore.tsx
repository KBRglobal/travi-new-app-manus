import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, TextInput } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";

const { width } = Dimensions.get("window");

const CATEGORIES = [
  { id: "all", label: "All", icon: "safari.fill" as const },
  { id: "beach", label: "Beach", icon: "beach.umbrella" as const },
  { id: "city", label: "City", icon: "building.2.fill" as const },
  { id: "nature", label: "Nature", icon: "leaf.fill" as const },
  { id: "culture", label: "Culture", icon: "building.columns.fill" as const },
  { id: "adventure", label: "Adventure", icon: "figure.run" as const },
];

const FEATURED = [
  { id: "f1", city: "Santorini", country: "Greece", tag: "Trending", tagColor: "#E91E8C", temp: "24°C", desc: "Iconic white-washed cliffs and sapphire seas", gradient: ["#1a1a4e", "#2d1b69", "#4a1942"] as const },
  { id: "f2", city: "Kyoto", country: "Japan", tag: "Editor's Pick", tagColor: "#FF9800", temp: "18°C", desc: "Ancient temples, cherry blossoms & zen gardens", gradient: ["#1a0533", "#3d1a3d", "#2d1b69"] as const },
  { id: "f3", city: "Bali", country: "Indonesia", tag: "Most Booked", tagColor: "#4CAF50", temp: "29°C", desc: "Tropical paradise with rice terraces and temples", gradient: ["#0d3320", "#1a4a2e", "#0d2d1a"] as const },
];

const DESTINATIONS = [
  { id: "d1", city: "Paris", country: "France", icon: "building.columns.fill" as const, iconColor: "#7B2FBE", price: "from $899", rating: 4.9, category: "city", tag: "Hot" },
  { id: "d2", city: "Maldives", country: "Maldives", icon: "beach.umbrella" as const, iconColor: "#0D9488", price: "from $2,199", rating: 4.9, category: "beach", tag: "Luxury" },
  { id: "d3", city: "New York", country: "USA", icon: "building.2.fill" as const, iconColor: "#E91E8C", price: "from $699", rating: 4.7, category: "city", tag: "Popular" },
  { id: "d4", city: "Machu Picchu", country: "Peru", icon: "mountain.2.fill" as const, iconColor: "#4CAF50", price: "from $1,299", rating: 4.8, category: "adventure", tag: "Epic" },
  { id: "d5", city: "Amsterdam", country: "Netherlands", icon: "building.2.fill" as const, iconColor: "#FF9800", price: "from $749", rating: 4.6, category: "city", tag: "Charming" },
  { id: "d6", city: "Phuket", country: "Thailand", icon: "beach.umbrella" as const, iconColor: "#06B6D4", price: "from $599", rating: 4.7, category: "beach", tag: "Tropical" },
  { id: "d7", city: "Rome", country: "Italy", icon: "building.columns.fill" as const, iconColor: "#F59E0B", price: "from $849", rating: 4.8, category: "culture", tag: "Historic" },
  { id: "d8", city: "Patagonia", country: "Argentina", icon: "mountain.2.fill" as const, iconColor: "#10B981", price: "from $1,599", rating: 4.9, category: "nature", tag: "Wild" },
];

const STORIES = [
  { id: "s1", user: "Sofia M.", dest: "Tokyo", text: "3 weeks in Japan changed my perspective on everything. The food, the people, the culture — absolutely magical!", likes: 847, time: "2h ago", color: "#7B2FBE" },
  { id: "s2", user: "Marco R.", dest: "Bali", text: "Sunrise at Mount Batur was worth every step of the 3am hike. TRAVI's itinerary was spot on!", likes: 1203, time: "5h ago", color: "#E91E8C" },
  { id: "s3", user: "Aisha K.", dest: "Morocco", text: "Lost in the Marrakech medina was the best thing that happened to me. Found a hidden riad that wasn't in any guide.", likes: 562, time: "1d ago", color: "#FF9800" },
];

const EXPERIENCES = [
  { id: "e1", title: "Northern Lights Tour", location: "Iceland", price: 299, icon: "sparkles" as const, iconColor: "#7B2FBE", rating: 5.0 },
  { id: "e2", title: "Sushi Masterclass", location: "Tokyo", price: 89, icon: "fork.knife" as const, iconColor: "#E91E8C", rating: 4.9 },
  { id: "e3", title: "Eiffel Tower Dinner", location: "Paris", price: 149, icon: "star.fill" as const, iconColor: "#FF9800", rating: 4.8 },
  { id: "e4", title: "Sunrise Yoga Bali", location: "Bali", price: 45, icon: "figure.yoga" as const, iconColor: "#4CAF50", rating: 4.9 },
];

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [savedDests, setSavedDests] = useState<string[]>([]);

  const filtered = DESTINATIONS.filter((d) => {
    const matchCat = activeCategory === "all" || d.category === activeCategory;
    const matchSearch = !searchQuery || d.city.toLowerCase().includes(searchQuery.toLowerCase()) || d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = FEATURED[featuredIndex];
  const toggleSave = (id: string) => setSavedDests((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Explore</Text>
            <Text style={styles.headerSub}>Discover your next adventure</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
            <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.3)"]} style={styles.filterGradient}>
              <IconSymbol name="slider.horizontal.3" size={20} color="#C4B5D9" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrap}>
          <LinearGradient colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.04)"]} style={styles.searchGradient}>
            <IconSymbol name="magnifyingglass" size={18} color="#5A4D72" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search destinations..."
              placeholderTextColor="#5A4D72"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} activeOpacity={0.7}>
                <IconSymbol name="xmark.circle.fill" size={18} color="#5A4D72" />
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>

        {/* Featured Destination */}
        <View style={styles.featuredCard}>
          <LinearGradient colors={featured.gradient} style={styles.featuredGradient}>
            <View style={styles.featuredCircle1} />
            <View style={styles.featuredCircle2} />
            <View style={[styles.featuredTag, { backgroundColor: featured.tagColor + "33", borderColor: featured.tagColor + "66" }]}>
              <IconSymbol name="flame.fill" size={11} color={featured.tagColor} />
              <Text style={[styles.featuredTagText, { color: featured.tagColor }]}>{featured.tag}</Text>
            </View>
            <View style={styles.featuredContent}>
              <View style={styles.featuredLeft}>
                <Text style={styles.featuredCity}>{featured.city}</Text>
                <View style={styles.featuredMeta}>
                  <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.6)" />
                  <Text style={styles.featuredCountry}>{featured.country}</Text>
                  <View style={styles.featuredTempBadge}>
                    <IconSymbol name="thermometer" size={11} color="rgba(255,255,255,0.7)" />
                    <Text style={styles.featuredTemp}>{featured.temp}</Text>
                  </View>
                </View>
                <Text style={styles.featuredDesc}>{featured.desc}</Text>
              </View>
              <TouchableOpacity style={styles.featuredBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
                <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.featuredBtnGradient}>
                  <Text style={styles.featuredBtnText}>Plan Trip</Text>
                  <IconSymbol name="arrow.right" size={14} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.featuredDots}>
              {FEATURED.map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setFeaturedIndex(i)} activeOpacity={0.7}>
                  <View style={[styles.dot, i === featuredIndex && styles.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll} contentContainerStyle={styles.categoriesContent}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryChip, activeCategory === cat.id && styles.categoryChipActive]} onPress={() => setActiveCategory(cat.id)} activeOpacity={0.8}>
              {activeCategory === cat.id && (
                <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)"]} style={StyleSheet.absoluteFillObject} />
              )}
              <IconSymbol name={cat.icon} size={15} color={activeCategory === cat.id ? "#C084FC" : "#5A4D72"} />
              <Text style={[styles.categoryLabel, activeCategory === cat.id && styles.categoryLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Destinations Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeCategory === "all" ? "All Destinations" : CATEGORIES.find((c) => c.id === activeCategory)?.label}
          </Text>
          <Text style={styles.countBadge}>{filtered.length}</Text>
        </View>
        <View style={styles.destGrid}>
          {filtered.map((dest) => (
            <TouchableOpacity key={dest.id} style={styles.destCard} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["rgba(255,255,255,0.07)", "rgba(255,255,255,0.03)"]} style={styles.destGradient}>
                <View style={styles.destTop}>
                  <View style={[styles.destIconWrap, { backgroundColor: dest.iconColor + "22" }]}>
                    <IconSymbol name={dest.icon} size={24} color={dest.iconColor} />
                  </View>
                  <TouchableOpacity onPress={() => toggleSave(dest.id)} activeOpacity={0.7}>
                    <IconSymbol name={savedDests.includes(dest.id) ? "heart.fill" : "heart"} size={18} color={savedDests.includes(dest.id) ? "#E91E8C" : "#5A4D72"} />
                  </TouchableOpacity>
                </View>
                <View style={styles.destTagWrap}>
                  <IconSymbol name="flame.fill" size={10} color="#E91E8C" />
                  <Text style={styles.destTagText}>{dest.tag}</Text>
                </View>
                <Text style={styles.destCity}>{dest.city}</Text>
                <Text style={styles.destCountry}>{dest.country}</Text>
                <View style={styles.destBottom}>
                  <Text style={styles.destPrice}>{dest.price}</Text>
                  <View style={styles.destRating}>
                    <IconSymbol name="star.fill" size={10} color="#FFD700" />
                    <Text style={styles.destRatingText}>{dest.rating}</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trending Experiences */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Experiences</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {EXPERIENCES.map((exp) => (
          <TouchableOpacity key={exp.id} style={styles.expCard} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
            <LinearGradient colors={["rgba(255,255,255,0.07)", "rgba(255,255,255,0.03)"]} style={StyleSheet.absoluteFillObject} />
            <View style={[styles.expIconWrap, { backgroundColor: exp.iconColor + "22" }]}>
              <IconSymbol name={exp.icon} size={24} color={exp.iconColor} />
            </View>
            <View style={styles.expInfo}>
              <Text style={styles.expTitle}>{exp.title}</Text>
              <View style={styles.expMeta}>
                <IconSymbol name="location.fill" size={11} color="#5A4D72" />
                <Text style={styles.expLocation}>{exp.location}</Text>
                <IconSymbol name="star.fill" size={11} color="#FFD700" />
                <Text style={styles.expRating}>{exp.rating}</Text>
              </View>
            </View>
            <View style={styles.expPriceCol}>
              <Text style={styles.expPrice}>${exp.price}</Text>
              <Text style={styles.expPriceSub}>per person</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Community Stories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Community Stories</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {STORIES.map((story) => (
          <View key={story.id} style={styles.storyCard}>
            <LinearGradient colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.03)"]} style={StyleSheet.absoluteFillObject} />
            <View style={styles.storyHeader}>
              <View style={[styles.storyAvatar, { backgroundColor: story.color + "22", borderColor: story.color + "66" }]}>
                <IconSymbol name="person.fill" size={22} color={story.color} />
              </View>
              <View style={styles.storyUserInfo}>
                <Text style={styles.storyName}>{story.user}</Text>
                <View style={styles.storyDestRow}>
                  <IconSymbol name="location.fill" size={11} color="#5A4D72" />
                  <Text style={styles.storyDest}>{story.dest}</Text>
                  <Text style={styles.storyTime}>{story.time}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.storyLikeBtn} activeOpacity={0.7}>
                <IconSymbol name="heart" size={18} color="#E91E8C" />
                <Text style={styles.storyLikes}>{story.likes.toLocaleString()}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.storyText}>{story.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const DEST_W = (width - 44 - 12) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width, height: width, borderRadius: width / 2, top: -width * 0.4, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.09)" },
  orb2: { position: "absolute", width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35, bottom: 0, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.06)" },
  scroll: { paddingHorizontal: 22, paddingTop: 60, paddingBottom: 110, gap: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "800" },
  headerSub: { color: "#5A4D72", fontSize: 13, marginTop: 2 },
  filterBtn: {},
  filterGradient: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  searchWrap: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  searchGradient: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 10 },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 15 },
  featuredCard: { borderRadius: 24, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(123,47,190,0.4)" },
  featuredGradient: { padding: 24, minHeight: 220, justifyContent: "space-between" },
  featuredCircle1: { position: "absolute", width: 180, height: 180, borderRadius: 90, top: -50, right: -30, backgroundColor: "rgba(255,255,255,0.05)" },
  featuredCircle2: { position: "absolute", width: 100, height: 100, borderRadius: 50, bottom: 20, left: -20, backgroundColor: "rgba(255,255,255,0.04)" },
  featuredTag: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4 },
  featuredTagText: { fontSize: 11, fontWeight: "700" },
  featuredContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 8 },
  featuredLeft: { flex: 1 },
  featuredCity: { color: "#FFFFFF", fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  featuredMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  featuredCountry: { color: "rgba(255,255,255,0.7)", fontSize: 13 },
  featuredTempBadge: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  featuredTemp: { color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600" },
  featuredDesc: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 8, maxWidth: width * 0.5, lineHeight: 18 },
  featuredBtn: { borderRadius: 14, overflow: "hidden" },
  featuredBtnGradient: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 16, paddingVertical: 12 },
  featuredBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  featuredDots: { flexDirection: "row", gap: 6, alignSelf: "center", marginTop: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.3)" },
  dotActive: { width: 18, backgroundColor: "#E91E8C" },
  categoriesScroll: { marginHorizontal: -22 },
  categoriesContent: { paddingHorizontal: 22, gap: 10 },
  categoryChip: { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)", overflow: "hidden" },
  categoryChipActive: { borderColor: "rgba(192,132,252,0.5)" },
  categoryLabel: { color: "#5A4D72", fontSize: 13, fontWeight: "600" },
  categoryLabelActive: { color: "#C084FC" },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  countBadge: { backgroundColor: "rgba(192,132,252,0.2)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, color: "#C084FC", fontSize: 12, fontWeight: "700" },
  seeAll: { color: "#C084FC", fontSize: 13, fontWeight: "600" },
  destGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  destCard: { width: DEST_W, borderRadius: 20, overflow: "hidden", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)" },
  destGradient: { padding: 16, gap: 6 },
  destTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  destIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  destTagWrap: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(233,30,140,0.15)", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3, alignSelf: "flex-start" },
  destTagText: { color: "#E91E8C", fontSize: 10, fontWeight: "700" },
  destCity: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", marginTop: 2 },
  destCountry: { color: "#5A4D72", fontSize: 12 },
  destBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  destPrice: { color: "#E91E8C", fontSize: 12, fontWeight: "700" },
  destRating: { flexDirection: "row", alignItems: "center", gap: 3 },
  destRatingText: { color: "#FFD700", fontSize: 11, fontWeight: "700" },
  expCard: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 16, padding: 14, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  expIconWrap: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  expInfo: { flex: 1, gap: 4 },
  expTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  expMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  expLocation: { color: "#5A4D72", fontSize: 12, flex: 1 },
  expRating: { color: "#FFD700", fontSize: 11, fontWeight: "700" },
  expPriceCol: { alignItems: "flex-end" },
  expPrice: { color: "#E91E8C", fontSize: 16, fontWeight: "800" },
  expPriceSub: { color: "#5A4D72", fontSize: 10 },
  storyCard: { borderRadius: 20, padding: 18, gap: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  storyHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  storyAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 2 },
  storyUserInfo: { flex: 1 },
  storyName: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  storyDestRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  storyDest: { color: "#5A4D72", fontSize: 12 },
  storyTime: { color: "#3A2D4E", fontSize: 11, marginLeft: 4 },
  storyLikeBtn: { alignItems: "center", gap: 3 },
  storyLikes: { color: "#8B7AAA", fontSize: 11 },
  storyText: { color: "#C4B5D9", fontSize: 14, lineHeight: 22 },
});
