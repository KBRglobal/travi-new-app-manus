import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const PLANS = [
  {
    id: "free", name: "Explorer", price: "Free", period: "",
    color: DS.muted, gradient: [DS.surface, DS.surfaceHigh] as [string, string],
    features: ["5 AI trip plans/month", "Basic DNA quiz", "Standard cashback", "Community access"],
    current: true,
  },
  {
    id: "pro", name: "Voyager", price: "€9.99", period: "/month",
    color: DS.purple, gradient: [DS.purple + "33", DS.pink + "22"] as [string, string],
    features: ["Unlimited AI trip plans", "Advanced DNA insights", "2x cashback", "Priority support", "Exclusive deals"],
    current: false,
  },
  {
    id: "elite", name: "Nomad Elite", price: "€24.99", period: "/month",
    color: DS.warning, gradient: [DS.warning + "22", DS.pink + "11"] as [string, string],
    features: ["Everything in Voyager", "Personal travel concierge", "Airport lounge access", "5x cashback", "VIP experiences"],
    current: false,
  },
];

export default function MembershipScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper title="Membership" scrollable bottomPad={40}>
      {/* Current badge */}
      <BlurView intensity={20} tint="dark" style={s.currentBadge}>
        <LinearGradient colors={[DS.purple + "33", DS.pink + "22"]} style={s.currentInner}>
          <MaterialIcons name="star" size={20} color={DS.purple} />
          <Text style={s.currentText}>Current Plan: <Text style={{ color: DS.purple }}>Explorer</Text></Text>
        </LinearGradient>
      </BlurView>

      {/* Plans */}
      {PLANS.map(plan => (
        <BlurView key={plan.id} intensity={15} tint="dark" style={[s.planCard, plan.current && { borderColor: DS.purple }]}>
          <LinearGradient colors={plan.gradient} style={s.planInner}>
            {plan.current && (
              <View style={s.currentPill}>
                <Text style={s.currentPillText}>Current</Text>
              </View>
            )}
            <View style={s.planHeader}>
              <Text style={[s.planName, { color: plan.color }]}>{plan.name}</Text>
              <View style={s.planPriceRow}>
                <Text style={s.planPrice}>{plan.price}</Text>
                <Text style={s.planPeriod}>{plan.period}</Text>
              </View>
            </View>
            {plan.features.map(f => (
              <View key={f} style={s.featureRow}>
                <MaterialIcons name="check-circle" size={16} color={plan.color} />
                <Text style={s.featureText}>{f}</Text>
              </View>
            ))}
            {!plan.current && (
              <Pressable style={{ marginTop: 16 }} onPress={() => router.push('/(trip)/checkout' as any)}>
                <LinearGradient colors={[DS.purple, DS.pink] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.upgradeBtn}>
                  <Text style={s.upgradeBtnText}>Upgrade to {plan.name}</Text>
                </LinearGradient>
              </Pressable>
            )}
          </LinearGradient>
        </BlurView>
      ))}
    </ScreenWrapper>
  );
}

const s = StyleSheet.create({
  currentBadge: { borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: DS.purple + "44", marginBottom: 20 },
  currentInner: { flexDirection: "row", alignItems: "center", gap: 8, padding: 14 },
  currentText: { color: DS.white, fontSize: 14, fontFamily: "Satoshi-Medium" },
  planCard: { borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: DS.border, marginBottom: 16 },
  planInner: { padding: 20 },
  currentPill: { alignSelf: "flex-start", backgroundColor: DS.purple, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginBottom: 10 },
  currentPillText: { color: DS.white, fontSize: 11, fontFamily: "Satoshi-Medium" },
  planHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 },
  planName: { fontSize: 22, fontFamily: "Chillax-Bold" },
  planPriceRow: { flexDirection: "row", alignItems: "baseline", gap: 2 },
  planPrice: { color: DS.white, fontSize: 24, fontFamily: "Chillax-Bold" },
  planPeriod: { color: DS.muted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  featureText: { color: DS.secondary, fontSize: 14, fontFamily: "Satoshi-Regular" },
  upgradeBtn: { height: 48, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  upgradeBtnText: { color: DS.white, fontSize: 15, fontFamily: "Chillax-Bold" },
});
