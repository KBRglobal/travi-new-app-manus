// Screen 21 — Dates & Travelers — STATIC 
// Route: /(trip)/dates-travelers | Mode: Planning
// Spec: Destination summary 80px, Date cards side-by-side 120px, Travelers card 72px, Flexible toggle

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function DatesTravelersScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>‹</Text></Pressable>
        <Text style={s.headerTitle}>Dates & Travelers</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Destination summary — 80px */}
        <View style={s.destSummary}>
          <View style={s.destIcon}><Text style={{ fontSize: 24 }}>🏝️</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={s.destCity}>Bali, Indonesia</Text>
            <Text style={s.destMatch}>96% DNA Match</Text>
          </View>
          <Pressable><Text style={s.changeText}>Change</Text></Pressable>
        </View>

        {/* Date cards side-by-side — 120px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Travel Dates</Text>
          <View style={s.dateRow}>
            <Pressable style={s.dateCard}>
              <Text style={s.dateLabel}>Check-in</Text>
              <Text style={s.dateValue}>Apr 15</Text>
              <Text style={s.dateDay}>Tuesday</Text>
            </Pressable>
            <View style={s.dateDivider}><Text style={s.dateArrow}>→</Text></View>
            <Pressable style={s.dateCard}>
              <Text style={s.dateLabel}>Check-out</Text>
              <Text style={s.dateValue}>Apr 22</Text>
              <Text style={s.dateDay}>Tuesday</Text>
            </Pressable>
          </View>
          <Text style={s.duration}>7 nights</Text>
        </View>

        {/* Flexible toggle */}
        <View style={s.flexRow}>
          <Text style={s.flexLabel}>My dates are flexible (±3 days)</Text>
          <View style={s.toggleTrack}><View style={s.toggleThumb} /></View>
        </View>

        {/* Travelers card — 72px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Travelers</Text>
          <View style={s.travelersCard}>
            <View style={s.travelerRow}>
              <View>
                <Text style={s.travelerType}>Adults</Text>
                <Text style={s.travelerAge}>Ages 13+</Text>
              </View>
              <View style={s.stepper}>
                <Pressable style={s.stepBtn}><Text style={s.stepText}>−</Text></Pressable>
                <Text style={s.stepValue}>2</Text>
                <Pressable style={s.stepBtn}><Text style={s.stepText}>+</Text></Pressable>
              </View>
            </View>
            <View style={s.divider} />
            <View style={s.travelerRow}>
              <View>
                <Text style={s.travelerType}>Children</Text>
                <Text style={s.travelerAge}>Ages 2–12</Text>
              </View>
              <View style={s.stepper}>
                <Pressable style={s.stepBtn}><Text style={s.stepText}>−</Text></Pressable>
                <Text style={s.stepValue}>0</Text>
                <Pressable style={s.stepBtn}><Text style={s.stepText}>+</Text></Pressable>
              </View>
            </View>
            <View style={s.divider} />
            <View style={s.travelerRow}>
              <View>
                <Text style={s.travelerType}>Infants</Text>
                <Text style={s.travelerAge}>Under 2</Text>
              </View>
              <View style={s.stepper}>
                <Pressable style={s.stepBtn}><Text style={s.stepText}>−</Text></Pressable>
                <Text style={s.stepValue}>0</Text>
                <Pressable style={s.stepBtn}><Text style={s.stepText}>+</Text></Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom CTA */}
      <View style={s.bottomBar}>
        <Pressable style={s.ctaBtn}><Text style={s.ctaText}>Continue to Flights</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  destSummary: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 20, paddingVertical: 16, height: 80, borderBottomWidth: 1, borderBottomColor: "#222" },
  destIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#1A1A1A", justifyContent: "center", alignItems: "center" },
  destCity: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  destMatch: { color: "#888", fontSize: 12, marginTop: 2 },
  changeText: { color: "#888", fontSize: 13 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dateCard: { flex: 1, height: 100, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 14, justifyContent: "center" },
  dateLabel: { color: "#888", fontSize: 11 },
  dateValue: { color: "#FFF", fontSize: 22, fontWeight: "700", marginTop: 4 },
  dateDay: { color: "#888", fontSize: 12, marginTop: 2 },
  dateDivider: { width: 32, alignItems: "center" },
  dateArrow: { color: "#555", fontSize: 18 },
  duration: { color: "#888", fontSize: 13, textAlign: "center", marginTop: 8 },
  flexRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 16 },
  flexLabel: { color: "#CCC", fontSize: 14 },
  toggleTrack: { width: 48, height: 28, borderRadius: 14, backgroundColor: "#333", justifyContent: "center", paddingHorizontal: 3 },
  toggleThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: "#888" },
  travelersCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", overflow: "hidden" },
  travelerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, height: 72 },
  travelerType: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  travelerAge: { color: "#888", fontSize: 12, marginTop: 2 },
  stepper: { flexDirection: "row", alignItems: "center", gap: 16 },
  stepBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#222", borderWidth: 1, borderColor: "#444", justifyContent: "center", alignItems: "center" },
  stepText: { color: "#FFF", fontSize: 18 },
  stepValue: { color: "#FFF", fontSize: 18, fontWeight: "700", width: 24, textAlign: "center" },
  divider: { height: 1, backgroundColor: "#222" },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  ctaBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  ctaText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
