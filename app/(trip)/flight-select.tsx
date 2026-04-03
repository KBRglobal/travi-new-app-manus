// Screen 22 — Flight Select — STATIC WIREFRAME
// Route: /(trip)/flight-select | Mode: Planning
// Spec: Flight type tabs, Origin/Dest swap, Class chips, Flight cards 160px, Skip link

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const FLIGHT_TYPES = ["Round Trip", "One Way", "Multi-City"];
const CLASSES = ["Economy", "Premium", "Business", "First"];

const FLIGHTS = [
  { id: "1", airline: "Emirates", depart: "14:30", arrive: "22:45", duration: "8h 15m", stops: "Direct", price: "€420", best: true },
  { id: "2", airline: "Turkish Airlines", depart: "08:00", arrive: "17:30", duration: "9h 30m", stops: "1 stop", price: "€350", best: false },
  { id: "3", airline: "Qatar Airways", depart: "23:15", arrive: "08:45+1", duration: "9h 30m", stops: "1 stop", price: "€380", best: false },
  { id: "4", airline: "Lufthansa", depart: "11:00", arrive: "21:15", duration: "10h 15m", stops: "1 stop", price: "€310", best: false },
];

export default function FlightSelectScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>‹</Text></Pressable>
        <Text style={s.headerTitle}>Select Flights</Text>
        <Pressable><Text style={s.skipText}>Skip</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Flight type tabs */}
        <View style={s.tabRow}>
          {FLIGHT_TYPES.map((t, i) => (
            <Pressable key={t} style={[s.tab, i === 0 && s.tabActive]}>
              <Text style={[s.tabText, i === 0 && s.tabTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        {/* Origin/Dest swap */}
        <View style={s.routeCard}>
          <View style={s.routePoint}>
            <Text style={s.routeCode}>TLV</Text>
            <Text style={s.routeCity}>Tel Aviv</Text>
          </View>
          <Pressable style={s.swapBtn}><Text style={s.swapText}>⇄</Text></Pressable>
          <View style={s.routePoint}>
            <Text style={s.routeCode}>DPS</Text>
            <Text style={s.routeCity}>Bali</Text>
          </View>
        </View>

        {/* Date */}
        <View style={s.dateRow}>
          <Text style={s.dateLabel}>Apr 15 → Apr 22 · 2 Adults</Text>
        </View>

        {/* Class chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.classRow}>
          {CLASSES.map((c, i) => (
            <Pressable key={c} style={[s.classChip, i === 0 && s.classActive]}>
              <Text style={[s.classText, i === 0 && s.classTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Flight cards — 160px each */}
        <View style={s.section}>
          <Text style={s.resultsText}>{FLIGHTS.length} flights found</Text>
          {FLIGHTS.map((f) => (
            <Pressable key={f.id} style={[s.flightCard, f.best && s.flightCardBest]}>
              {f.best && <View style={s.bestBadge}><Text style={s.bestText}>Best Value</Text></View>}
              <View style={s.flightTop}>
                <Text style={s.airline}>{f.airline}</Text>
                <Text style={s.flightPrice}>{f.price}</Text>
              </View>
              <View style={s.flightMiddle}>
                <View style={s.timeBlock}>
                  <Text style={s.time}>{f.depart}</Text>
                  <Text style={s.airport}>TLV</Text>
                </View>
                <View style={s.flightLine}>
                  <View style={s.lineDot} />
                  <View style={s.line} />
                  <Text style={s.duration}>{f.duration}</Text>
                  <View style={s.line} />
                  <View style={s.lineDot} />
                </View>
                <View style={s.timeBlock}>
                  <Text style={s.time}>{f.arrive}</Text>
                  <Text style={s.airport}>DPS</Text>
                </View>
              </View>
              <Text style={s.stops}>{f.stops}</Text>
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
  skipText: { color: "#888", fontSize: 14 },
  tabRow: { flexDirection: "row", paddingHorizontal: 20, paddingTop: 16, gap: 8 },
  tab: { flex: 1, height: 40, borderRadius: 10, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  tabActive: { backgroundColor: "#333", borderColor: "#666" },
  tabText: { color: "#888", fontSize: 13 },
  tabTextActive: { color: "#FFF", fontWeight: "600" },
  routeCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 20, marginTop: 16, padding: 20, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  routePoint: { alignItems: "center" },
  routeCode: { color: "#FFF", fontSize: 24, fontWeight: "800" },
  routeCity: { color: "#888", fontSize: 12, marginTop: 2 },
  swapBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#222", borderWidth: 1, borderColor: "#444", justifyContent: "center", alignItems: "center" },
  swapText: { color: "#FFF", fontSize: 18 },
  dateRow: { paddingHorizontal: 20, paddingTop: 12 },
  dateLabel: { color: "#888", fontSize: 13, textAlign: "center" },
  classRow: { paddingHorizontal: 20, paddingTop: 16, gap: 8 },
  classChip: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 16, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  classActive: { backgroundColor: "#333", borderColor: "#666" },
  classText: { color: "#888", fontSize: 13 },
  classTextActive: { color: "#FFF", fontWeight: "600" },
  section: { paddingHorizontal: 20, marginTop: 20 },
  resultsText: { color: "#888", fontSize: 13, marginBottom: 12 },
  flightCard: { borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 16, marginBottom: 10, minHeight: 140 },
  flightCardBest: { borderColor: "#555" },
  bestBadge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, backgroundColor: "#333", marginBottom: 8 },
  bestText: { color: "#FFF", fontSize: 11, fontWeight: "600" },
  flightTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  airline: { color: "#CCC", fontSize: 14, fontWeight: "600" },
  flightPrice: { color: "#FFF", fontSize: 18, fontWeight: "800" },
  flightMiddle: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 8 },
  timeBlock: { alignItems: "center" },
  time: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  airport: { color: "#888", fontSize: 11, marginTop: 2 },
  flightLine: { flex: 1, flexDirection: "row", alignItems: "center", gap: 4 },
  lineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#555" },
  line: { flex: 1, height: 1, backgroundColor: "#333" },
  duration: { color: "#888", fontSize: 11 },
  stops: { color: "#888", fontSize: 12, marginTop: 8 },
});
