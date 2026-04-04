// Screen 37 — Live Map — STATIC 
// Full screen map placeholder, Floating header, Map pins legend, Draggable bottom sheet
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const NEARBY = [
  { title: "Ubud Rice Terraces", dist: "1.2 km", type: "Activity" },
  { title: "Locavore Restaurant", dist: "800 m", type: "Food" },
  { title: "Monkey Forest", dist: "2.5 km", type: "Activity" },
  { title: "Ubud Palace", dist: "1.8 km", type: "Landmark" },
];

export default function LiveMapScreen() {
  return (
    <View style={s.root}>
      {/* Map placeholder — full screen */}
      <View style={s.mapPlaceholder}>
        <Text style={s.mapText}>[MAP VIEW]</Text>
        <Text style={s.mapSub}>Full-screen interactive map</Text>

        {/* Pin legend */}
        <View style={s.legend}>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: "#60A5FA" }]} /><Text style={s.legendLabel}>You</Text></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: "#4ADE80" }]} /><Text style={s.legendLabel}>Activities</Text></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: "#FBBF24" }]} /><Text style={s.legendLabel}>Food</Text></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: "#888" }]} /><Text style={s.legendLabel}>Landmarks</Text></View>
        </View>
      </View>

      {/* Floating header */}
      <View style={s.floatingHeader}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Live Map</Text>
        <Pressable style={s.filterBtn}><Text style={s.filterText}>Filter</Text></Pressable>
      </View>

      {/* Bottom sheet — collapsed 120px */}
      <View style={s.bottomSheet}>
        <View style={s.handle} />
        <Text style={s.sheetTitle}>Nearby</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {NEARBY.map((item, i) => (
            <Pressable key={i} style={s.nearbyCard}>
              <View style={s.nearbyIcon}><Text style={s.nearbyIconText}>{item.type[0]}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.nearbyTitle}>{item.title}</Text>
                <Text style={s.nearbyDist}>{item.dist} | {item.type}</Text>
              </View>
              <Text style={s.nearbyArrow}>{">"}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  mapPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1A1A1A" },
  mapText: { color: "#555", fontSize: 24, fontWeight: "700" },
  mapSub: { color: "#444", fontSize: 13, marginTop: 4 },
  legend: { position: "absolute", bottom: 180, left: 16, flexDirection: "row", gap: 12, padding: 8, borderRadius: 8, backgroundColor: "#111" },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { color: "#888", fontSize: 10 },
  floatingHeader: { position: "absolute", top: 48, left: 0, right: 0, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#111", justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 20 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600" },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: "#111" },
  filterText: { color: "#FFF", fontSize: 13 },
  bottomSheet: { position: "absolute", bottom: 0, left: 0, right: 0, height: 240, backgroundColor: "#151515", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, paddingBottom: 36 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#444", alignSelf: "center", marginBottom: 12 },
  sheetTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  nearbyCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", marginBottom: 8 },
  nearbyIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  nearbyIconText: { color: "#888", fontSize: 14, fontWeight: "700" },
  nearbyTitle: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  nearbyDist: { color: "#888", fontSize: 12, marginTop: 2 },
  nearbyArrow: { color: "#555", fontSize: 14 },
});
