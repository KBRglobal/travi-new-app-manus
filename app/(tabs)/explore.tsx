import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, TextInput, Platform } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const CARD_W = (width - 48) / 2;

const CATEGORIES = [
  { id: "all", label: "All", icon: "safari.fill" as const },
  { id: "beach", label: "Beach", icon: "beach.umbrella" as const },
  { id: "city", label: "City", icon: "building.2.fill" as const },
  { id: "nature", label: "Nature", icon: "leaf.fill" as const },
  { id: "culture", label: "Culture", icon: "building.columns.fill" as const },
  { id: "adventure", label: "Adventure", icon: "figure.run" as const },
];

const FEATURED = [
  {
    id: "f1", city: "Santorini", country: "Greece", tag: "Trending", tagColor: "#E91E8C",
    temp: "24°C", desc: "Iconic white-washed cliffs and sapphire seas",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
  },
  {
    id: "f2", city: "Kyoto", country: "Japan", tag: "Editor's Pick", tagColor: "#FF9800",
    temp: "18°C", desc: "Ancient temples, cherry blossoms & zen gardens",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  },
  {
    id: "f3", city: "Bali", country: "Indonesia", tag: "Most Booked", tagColor: "#4CAF50",
    temp: "29°C", desc: "Tropical paradise with rice terraces and temples",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
];

const DESTINATIONS = [
  { id: "d1", city: "Paris", country: "France", price: "from $899", rating: 4.9, category: "city", tag: "Hot", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80" },
  { id: "d2", city: "Maldives", country: "Maldives", price: "from $2,199", rating: 4.9, category: "beach", tag: "Luxury", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80" },
  { id: "d3", city: "New York", country: "USA", price: "from $699", rating: 4.7, category: "city", tag: "Popular", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&q=80" },
  { id: "d4", city: "Machu Picchu", country: "Peru", price: "from $1,299", rating: 4.8, category: "adventure", tag: "Epic", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&q=80" },
  { id: "d5", city: "Amsterdam", country: "Netherlands", price: "from $749", rating: 4.6, category: "city", tag: "Charming", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80" },
  { id: "d6", city: "Phuket", country: "Thailand", price: "from $599", rating: 4.7, category: "beach", tag: "Tropical", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&q=80" },
  { id: "d7", city: "Rome", country: "Italy", price: "from $849", rating: 4.8, category: "culture", tag: "Historic", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80" },
  { id: "d8", city: "Patagonia", country: "Argentina", price: "from $1,599", rating: 4.9, category: "nature", tag: "Wild", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80" },
  { id: "d9", city: "Tokyo", country: "Japan", price: "from $1,100", rating: 4.9, category: "city", tag: "Iconic", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80" },
  { id: "d10", city: "Iceland", country: "Iceland", price: "from $1,450", rating: 4.9, category: "nature", tag: "Magical", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&q=80" },
];

const STORIES = [
  { id: "s1", user: "Sofia M.", dest: "Tokyo", text: "3 weeks in Japan changed my perspective on everything. The food, the people, the culture — absolutely magical!", likes: 847, time: "2h ago", color: "#7B2FBE" },
  { id: "s2", user: "Marco R.", dest: "Bali", text: "Sunrise at Mount Batur was worth every step of the 3am hike. TRAVI's itinerary was spot on!", likes: 1203, time: "5h ago", color: "#E91E8C" },
  { id: "s3", user: "Aisha K.", dest: "Morocco", text: "Lost in the Marrakech medina was the best thing that happened to me. Found a hidden riad that wasn't in any guide.", likes: 562, time: "1d ago", color: "#FF9800" },
];

const EXPERIENCES = [
  { id: "e1", title: "Northern Lights Tour", location: "Iceland", price: 299, icon: "sparkles" as const, rating: 5.0, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80" },
  { id: "e2", title: "Sushi Masterclass", location: "Tokyo", price: 89, icon: "fork.knife" as const, rating: 4.9, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80" },
  { id: "e3", title: "Eiffel Tower Dinner", location: "Paris", price: 149, icon: "star.fill" as const, rating: 4.8, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80" },
  { id: "e4", title: "Sunrise Yoga Bali", location: "Bali", price: 45, icon: "figure.yoga" as const, rating: 4.9, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" },
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
  const toggleSave = (id: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSavedDests((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]);
  };

  return (
    <View style={S.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />
      <View style={S.orb1} />
      <View style={S.orb2} />

      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={S.header}>
          <View>
            <Text style={S.headerTitle}>Explore</Text>
            <Text style={S.headerSub}>Discover your next adventure</Text>
          </View>
          <TouchableOpacity style={S.filterBtn} activeOpacity={0.7}>
            <LinearGradient colors={["rgba(123,47,190,0.4)", "rgba(233,30,140,0.3)"]} style={S.filterGradient}>
              <IconSymbol name="slider.horizontal.3" size={20} color="#C4B5D9" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={S.searchWrap}>
          <LinearGradient colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.04)"]} style={S.searchGradient}>
            <IconSymbol name="magnifyingglass" size={18} color="#5A4D72" />
            <TextInput
              style={S.searchInput}
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

        {/* Featured Destination — Full Photo Hero */}
        <TouchableOpacity style={S.featuredCard} activeOpacity={0.92} onPress={() => router.push("/(trip)/plan" as never)}>
          <Image source={{ uri: featured.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
          <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]} locations={[0, 0.4, 1]} style={StyleSheet.absoluteFillObject} />
          {/* Tag */}
          <View style={[S.featuredTag, { backgroundColor: featured.tagColor + "CC" }]}>
            <IconSymbol name="flame.fill" size={11} color="#FFFFFF" />
            <Text style={S.featuredTagText}>{featured.tag}</Text>
          </View>
          {/* Content */}
          <View style={S.featuredContent}>
            <View style={S.featuredLeft}>
              <Text style={S.featuredCity}>{featured.city}</Text>
              <View style={S.featuredMeta}>
                <IconSymbol name="location.fill" size={12} color="rgba(255,255,255,0.7)" />
                <Text style={S.featuredCountry}>{featured.country}</Text>
                <View style={S.featuredTempBadge}>
                  <Text style={S.featuredTemp}>{featured.temp}</Text>
                </View>
              </View>
              <Text style={S.featuredDesc}>{featured.desc}</Text>
            </View>
            <TouchableOpacity style={S.featuredBtn} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.85}>
              <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.featuredBtnGradient}>
                <Text style={S.featuredBtnText}>Plan Trip</Text>
                <IconSymbol name="arrow.right" size={14} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* Dots */}
          <View style={S.featuredDots}>
            {FEATURED.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setFeaturedIndex(i)} activeOpacity={0.7}>
                <View style={[S.dot, i === featuredIndex && S.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={S.categoriesScroll} contentContainerStyle={S.categoriesContent}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={[S.categoryChip, activeCategory === cat.id && S.categoryChipActive]} onPress={() => setActiveCategory(cat.id)} activeOpacity={0.8}>
              {activeCategory === cat.id && (
                <LinearGradient colors={["rgba(123,47,190,0.5)", "rgba(233,30,140,0.3)"]} style={StyleSheet.absoluteFillObject} />
              )}
              <IconSymbol name={cat.icon} size={15} color={activeCategory === cat.id ? "#C084FC" : "#5A4D72"} />
              <Text style={[S.categoryLabel, activeCategory === cat.id && S.categoryLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Destinations Photo Grid */}
        <View style={S.sectionHeader}>
          <Text style={S.sectionTitle}>
            {activeCategory === "all" ? "All Destinations" : CATEGORIES.find((c) => c.id === activeCategory)?.label}
          </Text>
          <Text style={S.countBadge}>{filtered.length}</Text>
        </View>
        <View style={S.destGrid}>
          {filtered.map((dest) => (
            <TouchableOpacity key={dest.id} style={S.destCard} onPress={() => router.push("/(trip)/plan" as never)} activeOpacity={0.88}>
              {/* Full photo background */}
              <Image source={{ uri: dest.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
              {/* Gradient overlay */}
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.75)"]} locations={[0.3, 1]} style={StyleSheet.absoluteFillObject} />
              {/* Save button */}
              <TouchableOpacity style={S.saveBtn} onPress={() => toggleSave(dest.id)} activeOpacity={0.7}>
                <IconSymbol name={savedDests.includes(dest.id) ? "heart.fill" : "heart"} size={16} color={savedDests.includes(dest.id) ? "#E91E8C" : "rgba(255,255,255,0.8)"} />
              </TouchableOpacity>
              {/* Tag */}
              <View style={S.destTagWrap}>
                <Text style={S.destTagText}>{dest.tag}</Text>
              </View>
              {/* Bottom info */}
              <View style={S.destBottom}>
                <Text style={S.destCity}>{dest.city}</Text>
                <Text style={S.destCountry}>{dest.country}</Text>
                <View style={S.destPriceRow}>
                  <Text style={S.destPrice}>{dest.price}</Text>
                  <View style={S.destRating}>
                    <IconSymbol name="star.fill" size={10} color="#FFD700" />
                    <Text style={S.destRatingText}>{dest.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trending Experiences */}
        <View style={S.sectionHeader}>
          <Text style={S.sectionTitle}>Trending Experiences</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={S.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.expScroll}>
          {EXPERIENCES.map((exp) => (
            <TouchableOpacity key={exp.id} style={S.expCard} activeOpacity={0.88}
              onPress={() => { if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}>
              <Image source={{ uri: exp.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} locations={[0.3, 1]} style={StyleSheet.absoluteFillObject} />
              <View style={S.expBottom}>
                <Text style={S.expTitle}>{exp.title}</Text>
                <View style={S.expMeta}>
                  <IconSymbol name="location.fill" size={11} color="rgba(255,255,255,0.6)" />
                  <Text style={S.expLocation}>{exp.location}</Text>
                </View>
                <View style={S.expPriceRow}>
                  <Text style={S.expPrice}>from ${exp.price}</Text>
                  <View style={S.expRating}>
                    <IconSymbol name="star.fill" size={10} color="#FFD700" />
                    <Text style={S.expRatingText}>{exp.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Community Stories */}
        <View style={S.sectionHeader}>
          <Text style={S.sectionTitle}>Traveler Stories</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={S.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {STORIES.map((story) => (
          <TouchableOpacity key={story.id} style={S.storyCard} activeOpacity={0.85}>
            <LinearGradient colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]} style={StyleSheet.absoluteFillObject} />
            <View style={S.storyCardBorder} />
            <View style={[S.storyAvatar, { backgroundColor: story.color }]}>
              <Text style={S.storyAvatarText}>{story.user[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={S.storyHeader}>
                <Text style={S.storyUser}>{story.user}</Text>
                <View style={S.storyDestPill}>
                  <IconSymbol name="location.fill" size={10} color="#C084FC" />
                  <Text style={S.storyDestText}>{story.dest}</Text>
                </View>
              </View>
              <Text style={S.storyText} numberOfLines={2}>{story.text}</Text>
              <View style={S.storyFooter}>
                <View style={S.storyLikes}>
                  <IconSymbol name="heart.fill" size={12} color="#E91E8C" />
                  <Text style={S.storyLikesText}>{story.likes.toLocaleString()}</Text>
                </View>
                <Text style={S.storyTime}>{story.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  orb1: { position: "absolute", width: width * 1.4, height: width * 1.4, borderRadius: width * 0.7, top: -width * 0.5, left: -width * 0.3, backgroundColor: "rgba(123,47,190,0.1)" },
  orb2: { position: "absolute", width: width, height: width, borderRadius: width / 2, bottom: -width * 0.3, right: -width * 0.3, backgroundColor: "rgba(233,30,140,0.07)" },
  scroll: { paddingBottom: 40 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", letterSpacing: -0.5 },
  headerSub: { color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 14, overflow: "hidden" },
  filterGradient: { flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(123,47,190,0.4)", borderRadius: 14 },
  searchWrap: { marginHorizontal: 20, marginBottom: 20, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  searchGradient: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 14 },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 15 },
  // Featured hero — full photo
  featuredCard: { marginHorizontal: 20, height: 240, borderRadius: 24, overflow: "hidden", marginBottom: 20, justifyContent: "flex-end" },
  featuredTag: { position: "absolute", top: 14, left: 14, flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  featuredTagText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  featuredContent: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", padding: 16 },
  featuredLeft: { flex: 1, gap: 4 },
  featuredCity: { color: "#FFFFFF", fontSize: 26, fontWeight: "900", letterSpacing: -0.5 },
  featuredMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  featuredCountry: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "600" },
  featuredTempBadge: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  featuredTemp: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  featuredDesc: { color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 17 },
  featuredBtn: { borderRadius: 14, overflow: "hidden", marginLeft: 12 },
  featuredBtnGradient: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 10 },
  featuredBtnText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  featuredDots: { flexDirection: "row", gap: 6, justifyContent: "center", paddingBottom: 14 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.3)" },
  dotActive: { width: 18, backgroundColor: "#FFFFFF" },
  categoriesScroll: { marginBottom: 20 },
  categoriesContent: { paddingHorizontal: 20, gap: 8 },
  categoryChip: { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 20, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" },
  categoryChipActive: { borderColor: "rgba(123,47,190,0.5)" },
  categoryLabel: { color: "#5A4D72", fontSize: 13, fontWeight: "600" },
  categoryLabelActive: { color: "#C084FC" },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { color: "#FFFFFF", fontSize: 19, fontWeight: "900", letterSpacing: -0.3 },
  countBadge: { color: "rgba(255,255,255,0.35)", fontSize: 14, fontWeight: "600" },
  seeAll: { color: "#C084FC", fontSize: 14, fontWeight: "700" },
  // Destination photo grid
  destGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 12, marginBottom: 28 },
  destCard: { width: CARD_W, height: 200, borderRadius: 20, overflow: "hidden", justifyContent: "flex-end" },
  saveBtn: { position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  destTagWrap: { position: "absolute", top: 10, left: 10, backgroundColor: "rgba(233,30,140,0.85)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  destTagText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
  destBottom: { padding: 10, gap: 2 },
  destCity: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", letterSpacing: -0.3 },
  destCountry: { color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: "600" },
  destPriceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  destPrice: { color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: "700" },
  destRating: { flexDirection: "row", alignItems: "center", gap: 3 },
  destRatingText: { color: "#FFD700", fontSize: 11, fontWeight: "700" },
  // Experiences
  expScroll: { paddingHorizontal: 20, gap: 12, marginBottom: 28 },
  expCard: { width: 200, height: 160, borderRadius: 20, overflow: "hidden", justifyContent: "flex-end" },
  expBottom: { padding: 12, gap: 3 },
  expTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800", lineHeight: 18 },
  expMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  expLocation: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
  expPriceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  expPrice: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  expRating: { flexDirection: "row", alignItems: "center", gap: 3 },
  expRatingText: { color: "#FFD700", fontSize: 11, fontWeight: "700" },
  // Stories
  storyCard: { marginHorizontal: 20, borderRadius: 18, overflow: "hidden", flexDirection: "row", gap: 12, padding: 14, marginBottom: 10 },
  storyCardBorder: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  storyAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  storyAvatarText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  storyHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  storyUser: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  storyDestPill: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(123,47,190,0.25)", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  storyDestText: { color: "#C084FC", fontSize: 11, fontWeight: "600" },
  storyText: { color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 19 },
  storyFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  storyLikes: { flexDirection: "row", alignItems: "center", gap: 5 },
  storyLikesText: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "600" },
  storyTime: { color: "rgba(255,255,255,0.3)", fontSize: 12 },
});
