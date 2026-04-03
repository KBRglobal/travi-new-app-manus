/**
 * TRAVI Activity Booking Modal
 * Book Now → Travelers → Payment → Cashback Confirmation
 */

import { useState, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
  Dimensions, Animated, Image, ScrollView, Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useStore } from "@/lib/store";

const { width, height } = Dimensions.get("window");

export type BookableActivity = {
  id: string;
  title: string;
  desc: string;
  price: number;
  cashback: number;
  rating: number;
  reviews: number;
  duration: string;
  image: number;
  url: string;
};

type BookingStep = "detail" | "travelers" | "payment" | "confirmation";

const PAYMENT_METHODS = [
  { id: "apple", label: "Apple Pay", icon: "apple.logo", color: "#000000" },
  { id: "card", label: "Credit Card", icon: "creditcard.fill", color: "#6443F4" },
  { id: "points", label: "TRAVI Points", icon: "star.fill", color: "#FBBF24" },
];

interface Props {
  activity: BookableActivity | null;
  visible: boolean;
  onClose: () => void;
}

export function ActivityBookingModal({ activity, visible, onClose }: Props) {
  const { state, dispatch } = useStore();
  const [step, setStep] = useState<BookingStep>("detail");
  const [travelers, setTravelers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("apple");
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const haptic = (style = Haptics.ImpactFeedbackStyle.Light) => {
    if (Platform.OS !== "web") Haptics.impactAsync(style);
  };

  useEffect(() => {
    if (visible) {
      setStep("detail");
      setTravelers(1);
      setPaymentMethod("apple");
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, tension: 65, friction: 11, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: height, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!activity) return null;

  const totalPrice = activity.price * travelers;
  const totalCashback = activity.cashback * travelers;
  const userPoints = state.profile?.points ?? 0;
  const pointsValue = Math.min(userPoints * 0.01, totalPrice * 0.3); // max 30% discount

  const handleNext = () => {
    haptic(Haptics.ImpactFeedbackStyle.Medium);
    if (step === "detail") setStep("travelers");
    else if (step === "travelers") setStep("payment");
    else if (step === "payment") {
      // Confirm booking
      setStep("confirmation");
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.parallel([
        Animated.spring(successAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      ]).start();
      // Award cashback points
      dispatch({
        type: "ADD_POINTS",
        payload: { amount: totalCashback, description: `Cashback: ${activity.title}` },
      });
    }
  };

  const handleClose = () => {
    haptic();
    onClose();
  };

  const stepProgress = { detail: 0.25, travelers: 0.5, payment: 0.75, confirmation: 1 }[step];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <Animated.View style={[S.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={step !== "confirmation" ? handleClose : undefined} activeOpacity={1} />
        <Animated.View style={[S.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <LinearGradient colors={["#1A0A3D", "#0D0628"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.orb1} />
          <View style={S.orb2} />

          {/* Handle */}
          <View style={S.handle} />

          {/* Progress bar */}
          {step !== "confirmation" && (
            <View style={S.progressTrack}>
              <Animated.View style={[S.progressFill, { width: `${stepProgress * 100}%` }]}>
                <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              </Animated.View>
            </View>
          )}

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.content}>

            {/* ── Step: Detail ─────────────────────────────────────────────── */}
            {step === "detail" && (
              <>
                <Image source={activity.image} style={S.actImage} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(13,6,40,0.95)"]} locations={[0.5, 1]} style={S.actImageGradient} />
                <View style={S.detailContent}>
                  <Text style={S.actTitle}>{activity.title}</Text>
                  <View style={S.metaRow}>
                    <Text style={S.metaStar}>⭐ {activity.rating}</Text>
                    <Text style={S.metaReviews}>({activity.reviews.toLocaleString()} reviews)</Text>
                    <Text style={S.metaDuration}>· {activity.duration}</Text>
                  </View>
                  <Text style={S.actDesc}>{activity.desc}</Text>

                  <View style={S.priceRow}>
                    <View>
                      <Text style={S.priceLabel}>From</Text>
                      <Text style={S.priceValue}>${activity.price} <Text style={S.pricePer}>/ person</Text></Text>
                    </View>
                    {activity.cashback > 0 && (
                      <View style={S.cashbackBadge}>
                        <LinearGradient colors={["rgba(255,215,0,0.2)", "rgba(255,215,0,0.1)"]} style={StyleSheet.absoluteFillObject} />
                        <IconSymbol name="star.fill" size={14} color="#FBBF24" />
                        <Text style={S.cashbackText}>${activity.cashback} cashback / person</Text>
                      </View>
                    )}
                  </View>

                  <View style={S.highlights}>
                    {["Instant confirmation", "Free cancellation 24h", "Mobile voucher"].map((h) => (
                      <View key={h} style={S.highlightRow}>
                        <IconSymbol name="checkmark.circle.fill" size={16} color="#22C55E" />
                        <Text style={S.highlightText}>{h}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}

            {/* ── Step: Travelers ──────────────────────────────────────────── */}
            {step === "travelers" && (
              <View style={S.stepContent}>
                <Text style={S.stepTitle}>How many travelers?</Text>
                <Text style={S.stepSubtitle}>Price and cashback will update automatically.</Text>

                <View style={S.travelerCounter}>
                  <TouchableOpacity
                    style={[S.counterBtn, travelers <= 1 && S.counterBtnDisabled]}
                    onPress={() => { if (travelers > 1) { haptic(); setTravelers(t => t - 1); } }}
                    activeOpacity={0.8}
                  >
                    <Text style={S.counterBtnText}>−</Text>
                  </TouchableOpacity>
                  <View style={S.counterValue}>
                    <Text style={S.counterNum}>{travelers}</Text>
                    <Text style={S.counterLabel}>{travelers === 1 ? "traveler" : "travelers"}</Text>
                  </View>
                  <TouchableOpacity
                    style={[S.counterBtn, travelers >= 10 && S.counterBtnDisabled]}
                    onPress={() => { if (travelers < 10) { haptic(); setTravelers(t => t + 1); } }}
                    activeOpacity={0.8}
                  >
                    <Text style={S.counterBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                <View style={S.summaryCard}>
                  <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
                  <View style={S.summaryRow}>
                    <Text style={S.summaryLabel}>{travelers} × ${activity.price}</Text>
                    <Text style={S.summaryValue}>${totalPrice}</Text>
                  </View>
                  {totalCashback > 0 && (
                    <View style={S.summaryRow}>
                      <Text style={S.summaryLabel}>Cashback earned</Text>
                      <Text style={[S.summaryValue, { color: "#FBBF24" }]}>+${totalCashback}</Text>
                    </View>
                  )}
                  <View style={[S.summaryRow, S.summaryTotal]}>
                    <Text style={S.summaryTotalLabel}>Total</Text>
                    <Text style={S.summaryTotalValue}>${totalPrice}</Text>
                  </View>
                </View>
              </View>
            )}

            {/* ── Step: Payment ────────────────────────────────────────────── */}
            {step === "payment" && (
              <View style={S.stepContent}>
                <Text style={S.stepTitle}>Choose payment</Text>
                <Text style={S.stepSubtitle}>Your booking is secure and encrypted.</Text>

                {PAYMENT_METHODS.map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  const isPoints = pm.id === "points";
                  return (
                    <TouchableOpacity
                      key={pm.id}
                      style={[S.paymentCard, isSelected && S.paymentCardSelected]}
                      onPress={() => { haptic(); setPaymentMethod(pm.id); }}
                      activeOpacity={0.85}
                    >
                      {isSelected && (
                        <LinearGradient colors={["rgba(100,67,244,0.25)", "rgba(249,68,152,0.15)"]} style={StyleSheet.absoluteFillObject} />
                      )}
                      <View style={[S.paymentIcon, { backgroundColor: pm.color + "22" }]}>
                        <IconSymbol name={pm.icon as never} size={22} color={pm.color === "#000000" ? "#FFFFFF" : pm.color} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={S.paymentLabel}>{pm.label}</Text>
                        {isPoints && (
                          <Text style={S.paymentSub}>You have {userPoints.toLocaleString()} pts · saves ${pointsValue.toFixed(0)}</Text>
                        )}
                      </View>
                      {isSelected && (
                        <View style={S.paymentCheck}>
                          <IconSymbol name="checkmark" size={12} color="#FFFFFF" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}

                <View style={S.summaryCard}>
                  <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
                  <View style={S.summaryRow}>
                    <Text style={S.summaryLabel}>{activity.title}</Text>
                    <Text style={S.summaryValue}>${totalPrice}</Text>
                  </View>
                  {paymentMethod === "points" && (
                    <View style={S.summaryRow}>
                      <Text style={S.summaryLabel}>Points discount</Text>
                      <Text style={[S.summaryValue, { color: "#FBBF24" }]}>−${pointsValue.toFixed(0)}</Text>
                    </View>
                  )}
                  <View style={[S.summaryRow, S.summaryTotal]}>
                    <Text style={S.summaryTotalLabel}>You pay</Text>
                    <Text style={S.summaryTotalValue}>
                      ${paymentMethod === "points" ? (totalPrice - pointsValue).toFixed(0) : totalPrice}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* ── Step: Confirmation ───────────────────────────────────────── */}
            {step === "confirmation" && (
              <Animated.View style={[S.confirmContent, { opacity: successAnim, transform: [{ scale: scaleAnim }] }]}>
                <View style={S.successCircle}>
                  <LinearGradient colors={["#22C55E", "#16A34A"]} style={StyleSheet.absoluteFillObject} />
                  <IconSymbol name="checkmark" size={48} color="#FFFFFF" />
                </View>
                <Text style={S.confirmTitle}>Booking Confirmed!</Text>
                <Text style={S.confirmSubtitle}>{activity.title}</Text>
                <Text style={S.confirmSub}>{travelers} traveler{travelers > 1 ? "s" : ""} · ${totalPrice} paid</Text>

                {totalCashback > 0 && (
                  <View style={S.cashbackConfirm}>
                    <LinearGradient colors={["rgba(255,215,0,0.2)", "rgba(255,215,0,0.08)"]} style={StyleSheet.absoluteFillObject} />
                    <Text style={S.cashbackConfirmEmoji}>🎉</Text>
                    <View>
                      <Text style={S.cashbackConfirmTitle}>+${totalCashback} cashback earned!</Text>
                      <Text style={S.cashbackConfirmSub}>Added to your TRAVI Points balance</Text>
                    </View>
                  </View>
                )}

                <View style={S.confirmDetails}>
                  {[
                    { label: "Confirmation #", value: `TRV-${Date.now().toString().slice(-6)}` },
                    { label: "Voucher", value: "Sent to your email" },
                    { label: "Cancellation", value: "Free until 24h before" },
                  ].map((d) => (
                    <View key={d.label} style={S.confirmDetailRow}>
                      <Text style={S.confirmDetailLabel}>{d.label}</Text>
                      <Text style={S.confirmDetailValue}>{d.value}</Text>
                    </View>
                  ))}
                </View>
              </Animated.View>
            )}

          </ScrollView>

          {/* CTA button */}
          <View style={S.ctaWrap}>
            <TouchableOpacity style={S.ctaBtn} onPress={step === "confirmation" ? handleClose : handleNext} activeOpacity={0.88}>
              <LinearGradient
                colors={step === "confirmation" ? ["#22C55E", "#16A34A"] : ["#6443F4", "#F94498"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={S.ctaBtnText}>
                {step === "detail" ? `Book Now · $${activity.price}/person` :
                  step === "travelers" ? `Continue · $${totalPrice} total` :
                  step === "payment" ? `Confirm & Pay $${paymentMethod === "points" ? (totalPrice - pointsValue).toFixed(0) : totalPrice}` :
                  "Done"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const S = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  sheet: { maxHeight: height * 0.92, borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden", backgroundColor: "#0D0628" },
  orb1: { position: "absolute", width: 300, height: 300, borderRadius: 150, top: -100, right: -80, backgroundColor: "rgba(100,67,244,0.08)" },
  orb2: { position: "absolute", width: 200, height: 200, borderRadius: 100, bottom: 50, left: -60, backgroundColor: "rgba(249,68,152,0.06)" },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.55)", alignSelf: "center", marginTop: 12, marginBottom: 8 },
  progressTrack: { height: 3, marginHorizontal: 20, marginBottom: 4, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2 },
  content: { paddingBottom: 130 },

  // Detail step
  actImage: { width: "100%", height: 220 },
  actImageGradient: { position: "absolute", top: 0, left: 0, right: "100%", height: 220, width: "100%" },
  detailContent: { padding: 20, gap: 12 },
  actTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900",
      fontFamily: "Chillax-Bold", lineHeight: 28 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaStar: { color: "#FBBF24", fontSize: 14, fontWeight: "700" },
  metaReviews: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  metaDuration: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  actDesc: { color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 21 },
  priceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  priceLabel: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: "600" },
  priceValue: { color: "#FFFFFF", fontSize: 28, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
  pricePer: { color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: "500",
      fontFamily: "Satoshi-Medium" },
  cashbackBadge: { borderRadius: 14, overflow: "hidden", flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(255,215,0,0.3)" },
  cashbackText: { color: "#FBBF24", fontSize: 13, fontWeight: "700" },
  highlights: { gap: 8 },
  highlightRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  highlightText: { color: "rgba(255,255,255,0.6)", fontSize: 13 },

  // Travelers step
  stepContent: { padding: 24, gap: 20 },
  stepTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
  stepSubtitle: { color: "rgba(255,255,255,0.5)", fontSize: 14 },
  travelerCounter: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 24 },
  counterBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(100,67,244,0.3)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(100,67,244,0.6)" },
  counterBtnDisabled: { opacity: 0.3 },
  counterBtnText: { color: "#FFFFFF", fontSize: 28, fontWeight: "300" },
  counterValue: { alignItems: "center", minWidth: 80 },
  counterNum: { color: "#FFFFFF", fontSize: 52, fontWeight: "900",
      fontFamily: "Chillax-Bold", lineHeight: 58 },
  counterLabel: { color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 2 },
  summaryCard: { borderRadius: 18, overflow: "hidden", padding: 16, gap: 10, borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summaryLabel: { color: "rgba(255,255,255,0.5)", fontSize: 14 },
  summaryValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  summaryTotal: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.55)", paddingTop: 10, marginTop: 4 },
  summaryTotalLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  summaryTotalValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "900",
      fontFamily: "Chillax-Bold" },

  // Payment step
  paymentCard: { borderRadius: 16, overflow: "hidden", padding: 16, flexDirection: "row", alignItems: "center", gap: 14, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.55)", backgroundColor: "rgba(255,255,255,0.55)" },
  paymentCardSelected: { borderColor: "rgba(100,67,244,0.7)" },
  paymentIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  paymentLabel: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  paymentSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  paymentCheck: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#6443F4", alignItems: "center", justifyContent: "center" },

  // Confirmation
  confirmContent: { padding: 24, alignItems: "center", gap: 16 },
  successCircle: { width: 100, height: 100, borderRadius: 50, overflow: "hidden", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  confirmTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "900",
      fontFamily: "Chillax-Bold" },
  confirmSubtitle: { color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: "700",
      fontFamily: "Chillax-Semibold", textAlign: "center" },
  confirmSub: { color: "rgba(255,255,255,0.5)", fontSize: 14 },
  cashbackConfirm: { borderRadius: 18, overflow: "hidden", padding: 16, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "rgba(255,215,0,0.3)", width: "100%" },
  cashbackConfirmEmoji: { fontSize: 28 },
  cashbackConfirmTitle: { color: "#FBBF24", fontSize: 16, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
  cashbackConfirmSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 },
  confirmDetails: { width: "100%", backgroundColor: "rgba(255,255,255,0.55)", borderRadius: 16, padding: 16, gap: 12 },
  confirmDetailRow: { flexDirection: "row", justifyContent: "space-between" },
  confirmDetailLabel: { color: "rgba(255,255,255,0.5)", fontSize: 13 },
  confirmDetailValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },

  // CTA
  ctaWrap: { paddingHorizontal: 20, paddingBottom: 130, paddingTop: 8 },
  ctaBtn: { borderRadius: 20, shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
    overflow: "hidden", paddingVertical: 18, alignItems: "center", justifyContent: "center" },
  ctaBtnText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800",
      fontFamily: "Chillax-Bold" },
});
