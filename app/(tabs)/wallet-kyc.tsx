// @ts-nocheck
/**
 * TRAVI — Wallet KYC Verification Screen
 * Identity verification flow: personal info, ID document, selfie, review.
 */

import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const STEPS = [
  { id: 1, title: "Personal Info", icon: "👤", desc: "Full name, date of birth, nationality" },
  { id: 2, title: "ID Document", icon: "🪪", desc: "Passport, national ID, or driver's license" },
  { id: 3, title: "Selfie Check", icon: "🤳", desc: "Live photo to match your document" },
  { id: 4, title: "Review", icon: "✅", desc: "Confirm and submit for verification" },
];

const DOC_TYPES = ["Passport", "National ID", "Driver's License", "Residence Permit"];

export default function WalletKYCScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [docType, setDocType] = useState("Passport");
  const [docUploaded, setDocUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (step < 4) setStep(step + 1);
    else {
      setSubmitted(true);
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  if (submitted) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />
        <View style={styles.successScreen}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Verification Submitted!</Text>
          <Text style={styles.successDesc}>Your identity verification is under review. This typically takes 1–2 business days. You'll receive a notification once approved.</Text>
          <View style={styles.successSteps}>
            {["Documents received", "Identity check in progress", "Approval pending"].map((s, i) => (
              <View key={i} style={styles.successStep}>
                <View style={[styles.successStepDot, i === 0 && { backgroundColor: "#22C55E" }]} />
                <Text style={[styles.successStepText, i === 0 && { color: "#22C55E" }]}>{s}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()} activeOpacity={0.85}>
            <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.doneBtnGradient}>
              <Text style={styles.doneBtnText}>Back to Wallet</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Identity Verification</Text>
          <Text style={styles.headerSub}>Step {step} of {STEPS.length}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(step / STEPS.length) * 100}%` as any }]} />
      </View>

      {/* Step indicators */}
      <View style={styles.stepsRow}>
        {STEPS.map((s) => (
          <View key={s.id} style={styles.stepItem}>
            <View style={[styles.stepCircle, step >= s.id && styles.stepCircleActive, step > s.id && styles.stepCircleDone]}>
              <Text style={styles.stepCircleText}>{step > s.id ? "✓" : s.id}</Text>
            </View>
            <Text style={[styles.stepLabel, step >= s.id && styles.stepLabelActive]}>{s.title}</Text>
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* ── STEP 1: Personal Info ── */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepEmoji}>👤</Text>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <Text style={styles.stepDesc}>Please provide your legal name and details exactly as they appear on your official ID document.</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={firstName}
                onChangeText={setFirstName}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={lastName}
                onChangeText={setLastName}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={dob}
                onChangeText={setDob}
                keyboardType="numeric"
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nationality</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Israeli, American, British"
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={nationality}
                onChangeText={setNationality}
                returnKeyType="done"
              />
            </View>
          </View>
        )}

        {/* ── STEP 2: ID Document ── */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepEmoji}>🪪</Text>
            <Text style={styles.stepTitle}>Upload ID Document</Text>
            <Text style={styles.stepDesc}>Select your document type and upload a clear photo of both sides.</Text>
            <Text style={styles.inputLabel}>Document Type</Text>
            <View style={styles.docTypeGrid}>
              {DOC_TYPES.map((dt) => (
                <TouchableOpacity
                  key={dt}
                  style={[styles.docTypeChip, docType === dt && styles.docTypeChipActive]}
                  onPress={() => setDocType(dt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.docTypeText, docType === dt && styles.docTypeTextActive]}>{dt}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.uploadBox, docUploaded && styles.uploadBoxDone]}
              onPress={() => { setDocUploaded(true); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.85}
            >
              <Text style={styles.uploadEmoji}>{docUploaded ? "✅" : "📄"}</Text>
              <Text style={styles.uploadTitle}>{docUploaded ? "Document Uploaded" : "Front Side"}</Text>
              <Text style={styles.uploadSub}>{docUploaded ? "Clear photo received" : "Tap to upload or take photo"}</Text>
            </TouchableOpacity>
            {docUploaded && (
              <TouchableOpacity style={[styles.uploadBox, styles.uploadBoxDone]} activeOpacity={0.85}>
                <Text style={styles.uploadEmoji}>✅</Text>
                <Text style={styles.uploadTitle}>Back Side Uploaded</Text>
                <Text style={styles.uploadSub}>Clear photo received</Text>
              </TouchableOpacity>
            )}
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>📋 Tips for a good photo</Text>
              {["Ensure all text is clearly readable", "No glare or shadows on the document", "All four corners must be visible", "Photo must be in color"].map((tip, i) => (
                <Text key={i} style={styles.tipItem}>• {tip}</Text>
              ))}
            </View>
          </View>
        )}

        {/* ── STEP 3: Selfie ── */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepEmoji}>🤳</Text>
            <Text style={styles.stepTitle}>Take a Selfie</Text>
            <Text style={styles.stepDesc}>We need a live photo to verify your identity matches your document. Please look directly at the camera.</Text>
            <TouchableOpacity
              style={[styles.selfieBox, selfieUploaded && styles.uploadBoxDone]}
              onPress={() => { setSelfieUploaded(true); if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              activeOpacity={0.85}
            >
              {selfieUploaded ? (
                <>
                  <Text style={styles.selfieEmoji}>✅</Text>
                  <Text style={styles.selfieTitle}>Selfie Captured</Text>
                  <Text style={styles.selfieSub}>Face detected and matched</Text>
                </>
              ) : (
                <>
                  <View style={styles.selfieFrame}>
                    <Text style={styles.selfieIcon}>👤</Text>
                  </View>
                  <Text style={styles.selfieTitle}>Tap to open camera</Text>
                  <Text style={styles.selfieSub}>Position your face within the frame</Text>
                </>
              )}
            </TouchableOpacity>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>📋 Selfie requirements</Text>
              {["Good lighting on your face", "Remove sunglasses or hat", "Neutral expression", "Face must match your ID document"].map((tip, i) => (
                <Text key={i} style={styles.tipItem}>• {tip}</Text>
              ))}
            </View>
          </View>
        )}

        {/* ── STEP 4: Review ── */}
        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepEmoji}>✅</Text>
            <Text style={styles.stepTitle}>Review & Submit</Text>
            <Text style={styles.stepDesc}>Please review your information before submitting. Once submitted, verification typically takes 1–2 business days.</Text>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewSectionTitle}>Personal Information</Text>
              {[
                { label: "First Name", value: firstName || "Alex" },
                { label: "Last Name", value: lastName || "Johnson" },
                { label: "Date of Birth", value: dob || "15/03/1990" },
                { label: "Nationality", value: nationality || "Israeli" },
              ].map((item, i) => (
                <View key={i} style={styles.reviewRow}>
                  <Text style={styles.reviewLabel}>{item.label}</Text>
                  <Text style={styles.reviewValue}>{item.value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewSectionTitle}>Documents</Text>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Document Type</Text>
                <Text style={styles.reviewValue}>{docType}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>ID Document</Text>
                <Text style={[styles.reviewValue, { color: "#22C55E" }]}>✓ Uploaded</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Selfie</Text>
                <Text style={[styles.reviewValue, { color: "#22C55E" }]}>✓ Captured</Text>
              </View>
            </View>
            <View style={styles.consentCard}>
              <Text style={styles.consentText}>By submitting, you agree to TRAVI's <Text style={{ color: "#A78BFA" }}>Privacy Policy</Text> and <Text style={{ color: "#A78BFA" }}>Terms of Service</Text>. Your data is encrypted and used solely for identity verification purposes.</Text>
            </View>
          </View>
        )}

        {/* Next button */}
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.85}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.nextBtnGradient}>
            <Text style={styles.nextBtnText}>
              {step === 4 ? "Submit Verification" : "Continue →"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0628" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backText: { color: "#1A0B2E", fontSize: 18, fontWeight: "700", fontFamily: "Chillax-Semibold" },
  headerCenter: { flex: 1 },
  headerTitle: { color: "#1A0B2E", fontSize: 20, fontWeight: "900", fontFamily: "Chillax-Bold" },
  headerSub: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
  progressBar: { height: 3, backgroundColor: "rgba(255,255,255,0.06)", marginHorizontal: 20, borderRadius: 2, overflow: "hidden", marginBottom: 16 },
  progressFill: { height: 3, borderRadius: 2, backgroundColor: "#6443F4" },
  stepsRow: { flexDirection: "row", paddingHorizontal: 20, marginBottom: 20, justifyContent: "space-between" },
  stepItem: { alignItems: "center", gap: 4, flex: 1 },
  stepCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  stepCircleActive: { backgroundColor: "rgba(100,67,244,0.3)", borderColor: "#6443F4" },
  stepCircleDone: { backgroundColor: "rgba(34,197,94,0.3)", borderColor: "#22C55E" },
  stepCircleText: { color: "#1A0B2E", fontSize: 12, fontWeight: "800", fontFamily: "Chillax-Bold" },
  stepLabel: { color: "rgba(255,255,255,0.55)", fontSize: 9, fontWeight: "700", textAlign: "center" },
  stepLabelActive: { color: "#1A0B2E" },
  content: { paddingHorizontal: 20, paddingBottom: 130 },
  stepContent: { gap: 16 },
  stepEmoji: { fontSize: 48, textAlign: "center" },
  stepTitle: { color: "#1A0B2E", fontSize: 22, fontWeight: "900", textAlign: "center", fontFamily: "Chillax-Bold" },
  stepDesc: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", lineHeight: 22, fontFamily: "Satoshi-Regular" },
  inputGroup: { gap: 8 },
  inputLabel: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "700" },
  input: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, color: "#1A0B2E", fontSize: 15, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)", fontFamily: "Satoshi-Regular" },
  docTypeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  docTypeChip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  docTypeChipActive: { backgroundColor: "rgba(100,67,244,0.3)", borderColor: "#6443F4" },
  docTypeText: { color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: "700" },
  docTypeTextActive: { color: "#1A0B2E" },
  uploadBox: { borderRadius: 16, borderWidth: 2, borderColor: "rgba(255,255,255,0.12)", borderStyle: "dashed", padding: 24, alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.06)" },
  uploadBoxDone: { borderColor: "#22C55E", borderStyle: "solid", backgroundColor: "rgba(34,197,94,0.08)" },
  uploadEmoji: { fontSize: 36 },
  uploadTitle: { color: "#1A0B2E", fontSize: 15, fontWeight: "800", fontFamily: "Chillax-Bold" },
  uploadSub: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  selfieBox: { borderRadius: 16, borderWidth: 2, borderColor: "rgba(255,255,255,0.12)", borderStyle: "dashed", padding: 40, alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.06)" },
  selfieFrame: { width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.12)" },
  selfieIcon: { fontSize: 48 },
  selfieEmoji: { fontSize: 48 },
  selfieTitle: { color: "#1A0B2E", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
  selfieSub: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  tipCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, gap: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  tipTitle: { color: "#1A0B2E", fontSize: 14, fontWeight: "800", fontFamily: "Chillax-Bold" },
  tipItem: { color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 20 },
  reviewCard: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 16, gap: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  reviewSectionTitle: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "800", textTransform: "uppercase", letterSpacing: 1, fontFamily: "Chillax-Bold" },
  reviewRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewLabel: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  reviewValue: { color: "#1A0B2E", fontSize: 14, fontWeight: "700" },
  consentCard: { backgroundColor: "rgba(100,67,244,0.08)", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "rgba(100,67,244,0.2)" },
  consentText: { color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 20 },
  nextBtn: { borderRadius: 16, overflow: "hidden", marginTop: 20 },
  nextBtnGradient: { paddingVertical: 16, alignItems: "center" },
  nextBtnText: { color: "#1A0B2E", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
  // Success screen
  successScreen: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40, gap: 16 },
  successEmoji: { fontSize: 64 },
  successTitle: { color: "#1A0B2E", fontSize: 24, fontWeight: "900", textAlign: "center", fontFamily: "Chillax-Bold" },
  successDesc: { color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center", lineHeight: 22, fontFamily: "Satoshi-Regular" },
  successSteps: { width: "100%", gap: 12, marginTop: 8 },
  successStep: { flexDirection: "row", alignItems: "center", gap: 12 },
  successStepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.06)" },
  successStepText: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "Satoshi-Regular" },
  doneBtn: { borderRadius: 16, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", width: "100%", marginTop: 12 },
  doneBtnGradient: { paddingVertical: 16, alignItems: "center" },
  doneBtnText: { color: "#1A0B2E", fontSize: 16, fontWeight: "900", fontFamily: "Chillax-Bold" },
});
