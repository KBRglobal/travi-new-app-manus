// Screen 78 — Community Feed (Static Wireframe)
// Route: /social/feed | Mode: Discovery (Social tab)
// Zones: Header 80px, Stories Row 100px, Tabs 48px, Body (posts scroll)

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const STORIES = [
  { id: "you", name: "Your Story", hasStory: false },
  { id: "1", name: "Sarah M.", hasStory: true },
  { id: "2", name: "Marco R.", hasStory: true },
  { id: "3", name: "Yuki T.", hasStory: true },
  { id: "4", name: "Elena K.", hasStory: true },
  { id: "5", name: "James L.", hasStory: true },
];

const POSTS = [
  {
    id: "1",
    author: "Sarah Mitchell",
    location: "Barcelona, Spain",
    dnaMatch: 92,
    caption: "Found the most amazing hidden tapas bar in El Born! The patatas bravas here are unreal.",
    likes: 47,
    comments: 12,
    timeAgo: "2h ago",
    category: "Food & Culture",
  },
  {
    id: "2",
    author: "Marco Rossi",
    location: "Kyoto, Japan",
    dnaMatch: 78,
    caption: "Golden hour at Fushimi Inari. Arrived at 5am to have the gates all to myself.",
    likes: 123,
    comments: 34,
    timeAgo: "5h ago",
    category: "Adventure",
  },
  {
    id: "3",
    author: "Elena Kowalski",
    location: "Santorini, Greece",
    dnaMatch: 85,
    caption: "Sunset from Oia never gets old. Third visit and still speechless every time.",
    likes: 89,
    comments: 21,
    timeAgo: "1d ago",
    category: "Relaxation",
  },
];

export default function CommunityFeedScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        {/* Header — 80px */}
        <View style={s.header}>
          <Text style={s.headerTitle}>TRAVI Community</Text>
          <View style={s.iconBtn}>
            <Text style={s.iconText}>🔔</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stories Row — 100px */}
          <View style={s.storiesSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.storiesRow}>
              {STORIES.map((story) => (
                <View key={story.id} style={s.storyItem}>
                  <View style={[s.storyAvatar, story.hasStory && s.storyAvatarActive]}>
                    {story.id === "you" ? (
                      <Text style={s.storyPlus}>+</Text>
                    ) : (
                      <Text style={s.storyInitial}>{story.name[0]}</Text>
                    )}
                  </View>
                  <Text style={s.storyName} numberOfLines={1}>{story.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Tabs — 48px */}
          <View style={s.tabsRow}>
            <View style={[s.tab, s.tabActive]}>
              <Text style={[s.tabText, s.tabTextActive]}>Traveler Network</Text>
            </View>
            <View style={s.tab}>
              <Text style={s.tabText}>Travel Buddies</Text>
            </View>
          </View>

          {/* Posts */}
          {POSTS.map((post) => (
            <View key={post.id} style={s.postCard}>
              {/* Author Row */}
              <View style={s.postAuthorRow}>
                <View style={s.postAvatar}>
                  <Text style={s.postAvatarText}>{post.author[0]}</Text>
                </View>
                <View style={s.postAuthorInfo}>
                  <Text style={s.postAuthorName}>{post.author}</Text>
                  <Text style={s.postAuthorLocation}>{post.location}</Text>
                </View>
                <View style={s.dnaBadge}>
                  <Text style={s.dnaBadgeText}>{post.dnaMatch}% Match</Text>
                </View>
              </View>

              {/* Image Placeholder */}
              <View style={s.postImage}>
                <View style={s.categoryTag}>
                  <Text style={s.categoryTagText}>{post.category}</Text>
                </View>
                <View style={s.postLocationBadge}>
                  <Text style={s.postLocationText}>{post.location}</Text>
                </View>
              </View>

              {/* Caption */}
              <Text style={s.postCaption}>{post.caption}</Text>

              {/* Actions Row */}
              <View style={s.postActions}>
                <View style={s.actionBtn}>
                  <Text style={s.actionIcon}>♡</Text>
                  <Text style={s.actionCount}>{post.likes}</Text>
                </View>
                <View style={s.actionBtn}>
                  <Text style={s.actionIcon}>💬</Text>
                  <Text style={s.actionCount}>{post.comments}</Text>
                </View>
                <View style={s.actionBtn}>
                  <Text style={s.actionIcon}>↗</Text>
                </View>
                <View style={s.actionBtn}>
                  <Text style={s.actionIcon}>🔖</Text>
                </View>
                <View style={{ flex: 1 }} />
                <Text style={s.postTime}>{post.timeAgo}</Text>
              </View>
            </View>
          ))}

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const N = "#111";
const N2 = "#1a1a1a";
const N3 = "#222";
const W = "#fff";
const G = "#888";
const ACCENT = "#666";

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: N },
  header: { height: 80, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 12 },
  headerTitle: { fontSize: 28, fontWeight: "700", color: W },
  iconBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: N2, alignItems: "center", justifyContent: "center" },
  iconText: { fontSize: 20 },

  storiesSection: { height: 100, borderBottomWidth: 1, borderBottomColor: N3 },
  storiesRow: { paddingHorizontal: 16, gap: 16, alignItems: "center", height: 100 },
  storyItem: { alignItems: "center", width: 64 },
  storyAvatar: { width: 56, height: 56, borderRadius: 14, backgroundColor: N2, borderWidth: 2, borderColor: N3, alignItems: "center", justifyContent: "center" },
  storyAvatarActive: { borderColor: ACCENT, borderWidth: 3 },
  storyPlus: { fontSize: 24, color: ACCENT, fontWeight: "600" },
  storyInitial: { fontSize: 20, fontWeight: "600", color: W },
  storyName: { fontSize: 11, color: G, marginTop: 4 },

  tabsRow: { flexDirection: "row", paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: N2 },
  tabActive: { backgroundColor: "#333" },
  tabText: { fontSize: 14, color: G, fontWeight: "500" },
  tabTextActive: { color: W },

  postCard: { marginHorizontal: 16, marginTop: 16, backgroundColor: N2, borderRadius: 20, borderWidth: 1, borderColor: N3, overflow: "hidden" },
  postAuthorRow: { flexDirection: "row", alignItems: "center", padding: 12, gap: 10 },
  postAvatar: { width: 40, height: 40, borderRadius: 10, backgroundColor: N3, alignItems: "center", justifyContent: "center" },
  postAvatarText: { fontSize: 16, fontWeight: "600", color: W },
  postAuthorInfo: { flex: 1 },
  postAuthorName: { fontSize: 16, fontWeight: "600", color: W },
  postAuthorLocation: { fontSize: 12, color: G },
  dnaBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: "#1a3a1a" },
  dnaBadgeText: { fontSize: 12, fontWeight: "600", color: "#4a4" },

  postImage: { height: 240, backgroundColor: N3, justifyContent: "flex-end", padding: 12 },
  categoryTag: { position: "absolute", top: 12, left: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.15)" },
  categoryTagText: { fontSize: 12, color: W, fontWeight: "500" },
  postLocationBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.5)" },
  postLocationText: { fontSize: 12, color: W },

  postCaption: { fontSize: 14, color: "#ccc", lineHeight: 20, paddingHorizontal: 12, paddingTop: 12 },

  postActions: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 12, gap: 16 },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionIcon: { fontSize: 20 },
  actionCount: { fontSize: 14, color: G },
  postTime: { fontSize: 12, color: G },
});
