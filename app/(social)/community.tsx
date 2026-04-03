import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  Image, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PostCategory = "all" | "tips" | "stories" | "questions" | "photos";

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  authorDNA: string;
  authorDNAColor: string;
  category: Exclude<PostCategory, "all">;
  destination: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
  liked: boolean;
  tags: string[];
}

const POSTS: Post[] = [
  {
    id: "1", author: "Maya Rosen", authorDNA: "Explorer", authorDNAColor: BRAND.purple,
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    category: "tips", destination: "Tokyo", time: "2h ago",
    content: "Pro tip for Tokyo: The best ramen is NOT in the tourist areas. Head to Shimokitazawa for the real deal. Look for places with a line of locals - that's your sign!",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    likes: 47, comments: 12, liked: false,
    tags: ["Tokyo", "Food", "Local Tips"],
  },
  {
    id: "2", author: "Lior Cohen", authorDNA: "Adventurer", authorDNAColor: BRAND.orange,
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    category: "stories", destination: "Kyoto", time: "5h ago",
    content: "Just hiked the Fushimi Inari trail at 5am before the crowds arrived. Had the entire path to myself for 20 minutes. One of the most magical experiences of my life. Worth every early alarm!",
    image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400",
    likes: 89, comments: 23, liked: true,
    tags: ["Kyoto", "Hiking", "Sunrise"],
  },
  {
    id: "3", author: "Noa Levy", authorDNA: "Culturalist", authorDNAColor: BRAND.cyan,
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    category: "questions", destination: "Istanbul", time: "1d ago",
    content: "Planning 5 days in Istanbul next month. Beyond Hagia Sophia and Blue Mosque - what are the hidden gems that most tourists miss? Looking for authentic local experiences!",
    likes: 31, comments: 18, liked: false,
    tags: ["Istanbul", "History", "Question"],
  },
  {
    id: "4", author: "Avi Shapiro", authorDNA: "Foodie", authorDNAColor: BRAND.pink,
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    category: "photos", destination: "Bangkok", time: "2d ago",
    content: "Street food paradise. This pad thai from a 70-year-old family stall near Khao San Road changed my life. The secret? They still use the original recipe from 1952.",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    likes: 124, comments: 34, liked: false,
    tags: ["Bangkok", "Street Food", "Thailand"],
  },
];

const CATEGORIES: { key: PostCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "tips", label: "Tips" },
  { key: "stories", label: "Stories" },
  { key: "questions", label: "Questions" },
  { key: "photos", label: "Photos" },
];

function PostCard({ post, onLike }: { post: Post; onLike: (id: string) => void }) {
  const categoryColor = post.category === "tips" ? BRAND.green
    : post.category === "stories" ? BRAND.purple
    : post.category === "questions" ? BRAND.orange
    : BRAND.pink;

  return (
    <View style={styles.postCard}>
      <LinearGradient
        colors={["rgba(58,31,92,0.85)", "rgba(26,10,48,0.92)"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.authorRow}>
        <Image source={{ uri: post.authorAvatar }} style={styles.authorAvatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author}</Text>
          <View style={styles.authorMeta}>
            <View style={[styles.dnaPill, { borderColor: post.authorDNAColor + "50" }]}>
              <Text style={[styles.dnaText, { color: post.authorDNAColor }]}>{post.authorDNA}</Text>
            </View>
            <Text style={styles.timeText}>{post.time}</Text>
          </View>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: categoryColor + "20", borderColor: categoryColor + "40" }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.destinationRow}>
        <IconSymbol name="location.fill" size={12} color={BRAND.textMuted} />
        <Text style={styles.destinationText}>{post.destination}</Text>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      {post.image ? (
        <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
      ) : null}
      <View style={styles.tagsRow}>
        {post.tags.map((tag, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onLike(post.id);
          }}
        >
          <IconSymbol
            name={post.liked ? "heart.fill" : "heart"}
            size={18}
            color={post.liked ? BRAND.pink : BRAND.textSecondary}
          />
          <Text style={[styles.actionText, post.liked ? { color: BRAND.pink } : undefined]}>
            {post.likes + (post.liked ? 1 : 0)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <IconSymbol name="bubble.left.fill" size={18} color={BRAND.textSecondary} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <IconSymbol name="paperplane.fill" size={18} color={BRAND.textSecondary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<PostCategory>("all");
  const [posts, setPosts] = useState(POSTS);

  const filtered = activeCategory === "all"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[BRAND.bgDeep, BRAND.bgOverlay]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color={BRAND.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Community</Text>
          <Text style={styles.headerSub}>Travel stories and tips</Text>
        </View>
        <TouchableOpacity style={styles.writeBtn}>
          <IconSymbol name="plus.circle.fill" size={22} color={BRAND.purple} />
        </TouchableOpacity>
      </View>
      <View style={styles.filterRow}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.filterChip, activeCategory === cat.key && styles.filterChipActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveCategory(cat.key);
            }}
          >
            <Text style={[styles.filterText, activeCategory === cat.key && styles.filterTextActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostCard post={item} onLike={handleLike} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 20, paddingVertical: 16 },
  backBtn: { padding: 4 },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary },
  headerSub: { ...TYPE.small, color: BRAND.textSecondary, marginTop: 1 },
  writeBtn: { marginLeft: "auto", width: 40, height: 40, borderRadius: 20, backgroundColor: BRAND.purple + "20", alignItems: "center", justifyContent: "center" },
  filterRow: { flexDirection: "row", gap: 8, paddingHorizontal: 20, marginBottom: 16 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: BRAND.border },
  filterChipActive: { backgroundColor: BRAND.purple, borderColor: BRAND.purple },
  filterText: { ...TYPE.small, color: BRAND.textSecondary },
  filterTextActive: { color: "#fff", fontFamily: "Satoshi-Bold" },
  listContent: { paddingHorizontal: 20, paddingBottom: 130 },
  postCard: { borderRadius: RADIUS.lg, overflow: "hidden", borderWidth: 1, borderColor: BRAND.border, padding: 16, gap: 10 },
  authorRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  authorAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: BRAND.bgCard },
  authorInfo: { flex: 1, gap: 4 },
  authorName: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  authorMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  dnaPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 1 },
  dnaText: { ...TYPE.caption },
  timeText: { ...TYPE.caption, color: BRAND.textMuted },
  categoryBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  categoryText: { ...TYPE.caption, fontFamily: "Satoshi-Bold" },
  destinationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  destinationText: { ...TYPE.caption, color: BRAND.textMuted },
  postContent: { ...TYPE.body, color: BRAND.textSecondary },
  postImage: { width: "100%", height: 200, borderRadius: RADIUS.md, backgroundColor: BRAND.bgCard },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)" },
  tagText: { ...TYPE.caption, color: BRAND.textMuted },
  actionsRow: { flexDirection: "row", gap: 20, paddingTop: 4, borderTopWidth: 1, borderTopColor: BRAND.border },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  actionText: { ...TYPE.small, color: BRAND.textSecondary },
});
