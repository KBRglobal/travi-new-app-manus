// Screen 47 — Photo Gallery Post-Trip — STATIC WIREFRAME
// Album info 100px, Sorting tabs, 3-col grid, Highlight Video, Multi-select
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const SORT_TABS = ["All", "Favorites", "Activities", "Food", "Scenery"];
const PHOTOS = Array.from({ length: 24 }, (_, i) => i + 1);

export default function PostTripGalleryScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Photo Gallery</Text>
        <Pressable><Text style={s.selectText}>Select</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Album info — 100px */}
        <View style={s.albumInfo}>
          <View style={s.albumStat}><Text style={s.albumNum}>142</Text><Text style={s.albumLabel}>Photos</Text></View>
          <View style={s.albumStat}><Text style={s.albumNum}>8</Text><Text style={s.albumLabel}>Videos</Text></View>
          <View style={s.albumStat}><Text style={s.albumNum}>7</Text><Text style={s.albumLabel}>Days</Text></View>
          <View style={s.albumStat}><Text style={s.albumNum}>3.2GB</Text><Text style={s.albumLabel}>Size</Text></View>
        </View>

        {/* Highlight Video */}
        <Pressable style={s.videoCard}>
          <Text style={s.videoPlaceholder}>[HIGHLIGHT VIDEO]</Text>
          <View style={s.playBtn}><Text style={s.playText}>{">"}</Text></View>
          <Text style={s.videoTitle}>Trip Highlights — 2:30</Text>
        </Pressable>

        {/* Sorting tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabsRow}>
          {SORT_TABS.map((tab, i) => (
            <Pressable key={tab} style={[s.tab, i === 0 && s.tabActive]}>
              <Text style={[s.tabText, i === 0 && s.tabTextActive]}>{tab}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* 3-col grid */}
        <View style={s.grid}>
          {PHOTOS.map((p) => (
            <Pressable key={p} style={s.gridItem}>
              <Text style={s.gridText}>{p}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  selectText: { color: "#888", fontSize: 14 },
  albumInfo: { flexDirection: "row", margin: 20, padding: 16, height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  albumStat: { flex: 1, alignItems: "center", justifyContent: "center" },
  albumNum: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  albumLabel: { color: "#888", fontSize: 11, marginTop: 2 },
  videoCard: { marginHorizontal: 20, height: 180, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  videoPlaceholder: { color: "#444", fontSize: 14 },
  playBtn: { position: "absolute", width: 48, height: 48, borderRadius: 24, backgroundColor: "#333", justifyContent: "center", alignItems: "center" },
  playText: { color: "#FFF", fontSize: 20 },
  videoTitle: { position: "absolute", bottom: 12, color: "#888", fontSize: 12 },
  tabsRow: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  tab: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  tabActive: { backgroundColor: "#333", borderColor: "#555" },
  tabText: { color: "#888", fontSize: 13 },
  tabTextActive: { color: "#FFF" },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 18, gap: 4 },
  gridItem: { width: "31.5%", aspectRatio: 1, borderRadius: 8, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  gridText: { color: "#444", fontSize: 14 },
});
