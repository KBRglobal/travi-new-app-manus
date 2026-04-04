import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { useRouter } from "expo-router";

const RECENT = ["Bali, Indonesia", "Santorini, Greece", "Tokyo, Japan", "Paris, France"];
const TRENDING = [
  { name: "Kyoto", country: "Japan", emoji: "🏯", match: 97 },
  { name: "Amalfi Coast", country: "Italy", emoji: "🌊", match: 94 },
  { name: "Marrakech", country: "Morocco", emoji: "🕌", match: 91 },
  { name: "Queenstown", country: "New Zealand", emoji: "🏔️", match: 89 },
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <ScreenWrapper title="Search" scrollable bottomPad={40}>
      {/* Search bar */}
      <BlurView intensity={20} tint="dark" style={s.searchBar}>
        <MaterialIcons name="search" size={22} color={DS.purple} />
        <TextInput
          style={s.searchInput}
          placeholder="Where do you want to go?"
          placeholderTextColor={DS.placeholder}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <MaterialIcons name="close" size={18} color={DS.muted} />
          </Pressable>
        )}
      </BlurView>

      {/* Recent */}
      {query.length === 0 && (
        <>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Recent Searches</Text>
            <Pressable><Text style={s.clearText}>Clear</Text></Pressable>
          </View>
          {RECENT.map(r => (
            <Pressable key={r} style={s.recentRow}>
              <MaterialIcons name="history" size={18} color={DS.muted} />
              <Text style={s.recentText}>{r}</Text>
              <MaterialIcons name="north-west" size={16} color={DS.placeholder} />
            </Pressable>
          ))}

          <Text style={[s.sectionTitle, { marginTop: 24 }]}>Trending Destinations</Text>
          {TRENDING.map(d => (
            <BlurView key={d.name} intensity={15} tint="dark" style={s.trendCard}>
              <View style={s.trendEmoji}>
                <Text style={{ fontSize: 24 }}>{d.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.trendName}>{d.name}</Text>
                <Text style={s.trendCountry}>{d.country}</Text>
              </View>
              <View style={s.matchBadge}>
                <Text style={s.matchText}>{d.match}% match</Text>
              </View>
            </BlurView>
          ))}
        </>
      )}
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  searchBar: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.purple + "66", flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, height: 54, backgroundColor: DS.surface, marginBottom: 24 },
  searchInput: { flex: 1, color: DS.white, fontSize: 16, fontFamily: "Satoshi-Regular" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
  clearText: { color: DS.purple, fontSize: 13, fontFamily: "Satoshi-Medium" },
  recentRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: DS.border },
  recentText: { flex: 1, color: DS.secondary, fontSize: 14, fontFamily: "Satoshi-Regular" },
  trendCard: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.border, flexDirection: "row", alignItems: "center", gap: 12, padding: 14, backgroundColor: DS.surface, marginBottom: 10 },
  trendEmoji: { width: 48, height: 48, borderRadius: 12, backgroundColor: DS.surface, justifyContent: "center", alignItems: "center" },
  trendName: { color: DS.white, fontSize: 15, fontFamily: "Satoshi-Medium" },
  trendCountry: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  matchBadge: { backgroundColor: DS.success + "22", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: DS.success + "44" },
  matchText: { color: DS.success, fontSize: 11, fontFamily: "Satoshi-Medium" },
});
