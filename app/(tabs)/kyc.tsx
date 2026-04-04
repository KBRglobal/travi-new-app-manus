// Screen 52 — KYC Verification — STATIC 
// Why card 140px, 4-step timeline 200px, Upload area 180px with camera guide
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const STEPS = [
  { num: "1", title: "Personal Info", status: "Done" },
  { num: "2", title: "ID Document", status: "Current" },
  { num: "3", title: "Selfie Verification", status: "Pending" },
  { num: "4", title: "Review", status: "Pending" },
];

export default function KYCScreen() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Verify Identity</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Why card — 140px */}
        <View style={s.whyCard}>
          <Text style={s.whyTitle}>Why Verify?</Text>
          <Text style={s.whyText}>Identity verification is required to add funds, make payments, and access premium wallet features. Your data is encrypted and secure.</Text>
        </View>

        {/* 4-step timeline — 200px */}
        <View style={s.timeline}>
          {STEPS.map((step, i) => (
            <View key={i} style={s.timelineStep}>
              <View style={s.stepLeft}>
                <View style={[s.stepDot, step.status === "Done" && s.stepDone, step.status === "Current" && s.stepCurrent]}>
                  <Text style={s.stepNum}>{step.status === "Done" ? "✓" : step.num}</Text>
                </View>
                {i < STEPS.length - 1 && <View style={[s.stepLine, step.status === "Done" && s.stepLineDone]} />}
              </View>
              <View style={s.stepRight}>
                <Text style={[s.stepTitle, step.status === "Current" && { color: "#FFF" }]}>{step.title}</Text>
                <Text style={s.stepStatus}>{step.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Upload area — 180px */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Upload ID Document</Text>
          <Pressable style={s.uploadArea}>
            <Text style={s.uploadIcon}>+</Text>
            <Text style={s.uploadTitle}>Tap to upload</Text>
            <Text style={s.uploadSub}>Passport, National ID, or Driver's License</Text>
            <Text style={s.uploadHint}>JPG, PNG or PDF — Max 10MB</Text>
          </Pressable>
        </View>

        {/* Camera guide */}
        <View style={s.guideCard}>
          <Text style={s.guideTitle}>Photo Tips</Text>
          <Text style={s.guideText}>• Place document on a flat, well-lit surface</Text>
          <Text style={s.guideText}>• Ensure all corners are visible</Text>
          <Text style={s.guideText}>• Avoid glare and shadows</Text>
          <Text style={s.guideText}>• Text must be clearly readable</Text>
        </View>
      </ScrollView>

      <View style={s.bottom}>
        <Pressable style={s.continueBtn}><Text style={s.continueText}>Continue</Text></Pressable>
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
  whyCard: { margin: 20, padding: 16, height: 140, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", justifyContent: "center" },
  whyTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 8 },
  whyText: { color: "#888", fontSize: 13, lineHeight: 20 },
  timeline: { paddingHorizontal: 20, marginTop: 8 },
  timelineStep: { flexDirection: "row", gap: 12 },
  stepLeft: { alignItems: "center", width: 32 },
  stepDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#222", borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  stepDone: { backgroundColor: "#333", borderColor: "#555" },
  stepCurrent: { backgroundColor: "#444", borderColor: "#666" },
  stepNum: { color: "#888", fontSize: 13, fontWeight: "700" },
  stepLine: { width: 2, height: 24, backgroundColor: "#222" },
  stepLineDone: { backgroundColor: "#555" },
  stepRight: { flex: 1, paddingBottom: 16 },
  stepTitle: { color: "#888", fontSize: 14, fontWeight: "600" },
  stepStatus: { color: "#666", fontSize: 12, marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  uploadArea: { height: 180, borderRadius: 14, borderWidth: 2, borderColor: "#333", borderStyle: "dashed", justifyContent: "center", alignItems: "center", gap: 4 },
  uploadIcon: { color: "#555", fontSize: 36 },
  uploadTitle: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  uploadSub: { color: "#888", fontSize: 12 },
  uploadHint: { color: "#666", fontSize: 11, marginTop: 4 },
  guideCard: { margin: 20, padding: 16, borderRadius: 14, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333" },
  guideTitle: { color: "#FFF", fontSize: 14, fontWeight: "600", marginBottom: 8 },
  guideText: { color: "#888", fontSize: 12, lineHeight: 20 },
  bottom: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 36, backgroundColor: "#111", borderTopWidth: 1, borderTopColor: "#222" },
  continueBtn: { height: 52, borderRadius: 26, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  continueText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
