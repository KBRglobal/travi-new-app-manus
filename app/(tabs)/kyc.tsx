import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const STEPS = [
  { num: 1, title: "Personal Info", status: "done" },
  { num: 2, title: "ID Document", status: "current" },
  { num: 3, title: "Selfie Verification", status: "pending" },
  { num: 4, title: "Review", status: "pending" },
];

export default function KYCScreen() {
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);

  return (
    <ScreenWrapper title="Verify Identity" scrollable bottomPad={100}>
      {/* Why verify card */}
      <BlurView intensity={20} tint="dark" style={s.infoCard}>
        <View style={s.infoInner}>
          <MaterialIcons name="verified-user" size={24} color={DS.purple} />
          <View style={{ flex: 1 }}>
            <Text style={s.infoTitle}>Why Verify?</Text>
            <Text style={s.infoText}>Identity verification is required to add funds, make payments, and access premium wallet features. Your data is encrypted and secure.</Text>
          </View>
        </View>
      </BlurView>

      {/* Steps */}
      <View style={s.stepsContainer}>
        {STEPS.map((step, i) => (
          <View key={step.num} style={s.stepRow}>
            <View style={s.stepLeft}>
              <View style={[s.stepCircle,
                step.status === "done" && { backgroundColor: DS.success, borderColor: DS.success },
                step.status === "current" && { backgroundColor: DS.purple, borderColor: DS.purple },
                step.status === "pending" && { backgroundColor: "transparent", borderColor: DS.border },
              ]}>
                {step.status === "done"
                  ? <MaterialIcons name="check" size={16} color="#FFF" />
                  : <Text style={[s.stepNum, step.status === "pending" && { color: DS.muted }]}>{step.num}</Text>
                }
              </View>
              {i < STEPS.length - 1 && <View style={[s.stepLine, step.status === "done" && { backgroundColor: DS.success }]} />}
            </View>
            <View style={s.stepContent}>
              <Text style={[s.stepTitle, step.status === "pending" && { color: DS.muted }]}>{step.title}</Text>
              <Text style={s.stepStatus}>{step.status === "done" ? "Completed" : step.status === "current" ? "In Progress" : "Pending"}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Upload area */}
      <Text style={s.sectionTitle}>Upload ID Document</Text>
      <Pressable style={[s.uploadArea, uploaded && { borderColor: DS.success, borderStyle: "solid" }]} onPress={() => setUploaded(true)}>
        <MaterialIcons name={uploaded ? "check-circle" : "cloud-upload"} size={40} color={uploaded ? DS.success : DS.purple} />
        <Text style={s.uploadTitle}>{uploaded ? "Document Uploaded" : "Tap to Upload"}</Text>
        <Text style={s.uploadSub}>{uploaded ? "ID document ready for review" : "Passport, ID card, or driver's license"}</Text>
      </Pressable>

      {/* CTA */}
      <Pressable onPress={() => router.back()}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.cta}>
          <Text style={s.ctaText}>Continue</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
        </LinearGradient>
      </Pressable>
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  infoCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 24 },
  infoInner: { flexDirection: "row", gap: 12, padding: 16, backgroundColor: DS.surface, alignItems: "flex-start" },
  infoTitle: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold", marginBottom: 6 },
  infoText: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular", lineHeight: 20 },
  stepsContainer: { marginBottom: 24 },
  stepRow: { flexDirection: "row", gap: 16, marginBottom: 4 },
  stepLeft: { alignItems: "center", width: 36 },
  stepCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  stepLine: { width: 2, flex: 1, backgroundColor: DS.border, marginVertical: 4, minHeight: 24 },
  stepNum: { color: DS.white, fontSize: 14, fontFamily: "Chillax-Bold" },
  stepContent: { flex: 1, paddingTop: 6, paddingBottom: 20 },
  stepTitle: { color: DS.white, fontSize: 15, fontFamily: "Satoshi-Medium" },
  stepStatus: { color: DS.muted, fontSize: 12, fontFamily: "Satoshi-Regular", marginTop: 2 },
  sectionTitle: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold", marginBottom: 12 },
  uploadArea: { borderRadius: 16, borderWidth: 2, borderColor: DS.purple + "66", borderStyle: "dashed", padding: 40, alignItems: "center", gap: 8, backgroundColor: DS.purple + "11", marginBottom: 24 },
  uploadTitle: { color: DS.white, fontSize: 16, fontFamily: "Satoshi-Medium" },
  uploadSub: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  cta: { height: 56, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  ctaText: { color: DS.white, fontSize: 16, fontFamily: "Chillax-Bold" },
});
