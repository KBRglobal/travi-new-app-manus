import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Platform
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
interface VisaInfo {
  destination: string;
  country: string;
  flag: string;
  visaType: "visa-free" | "visa-on-arrival" | "e-visa" | "visa-required";
  stayDuration: string;
  processingTime: string;
  cost: string;
  requirements: string[];
  tips: string[];
  healthRequirements: string[];
  currency: string;
  exchangeRate: string;
  emergencyNumbers: { label: string; number: string }[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const VISA_DATA: Record<string, VisaInfo> = {
  Japan: {
    destination: "Tokyo", country: "Japan", flag: "🇯🇵",
    visaType: "visa-free",
    stayDuration: "90 days",
    processingTime: "N/A — visa-free",
    cost: "Free",
    requirements: ["Valid passport (6+ months validity)", "Return flight ticket", "Proof of accommodation", "Sufficient funds (~$100/day)"],
    tips: ["Register at your embassy upon arrival", "IC card (Suica/Pasmo) for transit", "Cash is king — many places don't accept cards", "Download Google Translate with Japanese offline pack"],
    healthRequirements: ["No vaccinations required", "Travel insurance recommended"],
    currency: "Japanese Yen (¥)",
    exchangeRate: "1 USD ≈ 149 ¥",
    emergencyNumbers: [{ label: "Police", number: "110" }, { label: "Ambulance", number: "119" }, { label: "Embassy", number: "+81-3-3224-5000" }],
  },
  UAE: {
    destination: "Dubai", country: "UAE", flag: "🇦🇪",
    visaType: "visa-on-arrival",
    stayDuration: "30 days (extendable)",
    processingTime: "On arrival",
    cost: "Free for most nationalities",
    requirements: ["Valid passport (6+ months validity)", "Return flight ticket", "Hotel booking confirmation", "Travel insurance"],
    tips: ["Dress modestly in public areas", "Ramadan hours affect restaurants", "Uber & Careem are the best transport", "Download Nol card app for metro"],
    healthRequirements: ["No vaccinations required", "Travel insurance mandatory"],
    currency: "UAE Dirham (AED)",
    exchangeRate: "1 USD ≈ 3.67 AED",
    emergencyNumbers: [{ label: "Police", number: "999" }, { label: "Ambulance", number: "998" }, { label: "Embassy", number: "+971-4-309-4000" }],
  },
  France: {
    destination: "Paris", country: "France", flag: "🇫🇷",
    visaType: "visa-free",
    stayDuration: "90 days (Schengen)",
    processingTime: "N/A — visa-free",
    cost: "Free",
    requirements: ["Valid passport or EU ID", "Proof of funds", "Travel insurance (Schengen requirement)", "Return ticket"],
    tips: ["Validate metro tickets before boarding", "Many museums free on first Sunday", "Tipping is optional (service included)", "Pharmacies (green cross) are very helpful"],
    healthRequirements: ["No vaccinations required", "EHIC card if EU citizen"],
    currency: "Euro (€)",
    exchangeRate: "1 USD ≈ 0.92 €",
    emergencyNumbers: [{ label: "Police", number: "17" }, { label: "Ambulance", number: "15" }, { label: "General Emergency", number: "112" }],
  },
};

const VISA_TYPE_CONFIG = {
  "visa-free": { label: "Visa Free", color: "#22C55E", icon: "✅" },
  "visa-on-arrival": { label: "Visa on Arrival", color: "#F59E0B", icon: "🛬" },
  "e-visa": { label: "e-Visa Required", color: "#3B82F6", icon: "💻" },
  "visa-required": { label: "Visa Required", color: "#EF4444", icon: "📋" },
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function VisaInfoScreen() {
  const insets = useSafeAreaInsets();
  const { destination = "Japan" } = useLocalSearchParams<{ destination: string }>();
  const info = VISA_DATA[destination as string] ?? VISA_DATA["Japan"];
  const visaConfig = VISA_TYPE_CONFIG[info.visaType];
  const [activeTab, setActiveTab] = useState<"visa" | "health" | "money" | "emergency">("visa");

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D1B2A", "#0D1B2A"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={22} color="#FFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={S.headerTitle}>{info.flag} {info.country}</Text>
          <Text style={S.headerSub}>Entry Requirements</Text>
        </View>
      </View>

      {/* Visa Status Hero */}
      <View style={S.visaHero}>
        <LinearGradient colors={[visaConfig.color + "20", visaConfig.color + "08"]} style={StyleSheet.absoluteFillObject} />
        <View style={[S.visaStatusBadge, { borderColor: visaConfig.color + "50" }]}>
          <Text style={{ fontSize: 28 }}>{visaConfig.icon}</Text>
          <View>
            <Text style={[S.visaStatusLabel, { color: visaConfig.color }]}>{visaConfig.label}</Text>
            <Text style={S.visaStatusSub}>Stay up to {info.stayDuration}</Text>
          </View>
        </View>
        <View style={S.visaMetaRow}>
          <View style={S.visaMetaItem}>
            <Text style={S.visaMetaLabel}>Processing</Text>
            <Text style={S.visaMetaValue}>{info.processingTime}</Text>
          </View>
          <View style={S.visaMetaDivider} />
          <View style={S.visaMetaItem}>
            <Text style={S.visaMetaLabel}>Cost</Text>
            <Text style={S.visaMetaValue}>{info.cost}</Text>
          </View>
          <View style={S.visaMetaDivider} />
          <View style={S.visaMetaItem}>
            <Text style={S.visaMetaLabel}>Currency</Text>
            <Text style={S.visaMetaValue}>{info.exchangeRate}</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={S.tabRow}>
        {(["visa", "health", "money", "emergency"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[S.tab, activeTab === tab && S.tabActive]}
            onPress={() => {
              setActiveTab(tab);
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.8}
          >
            <Text style={[S.tabText, activeTab === tab && S.tabTextActive]}>
              {tab === "visa" ? "📋 Visa" : tab === "health" ? "🏥 Health" : tab === "money" ? "💰 Money" : "🆘 SOS"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}>
        {activeTab === "visa" && (
          <>
            <InfoCard title="Requirements" items={info.requirements} color="#6443F4" />
            <InfoCard title="Local Tips" items={info.tips} color="#F59E0B" />
          </>
        )}
        {activeTab === "health" && (
          <InfoCard title="Health Requirements" items={info.healthRequirements} color="#22C55E" />
        )}
        {activeTab === "money" && (
          <View style={S.moneyCard}>
            <LinearGradient colors={["rgba(16,185,129,0.15)", "rgba(16,185,129,0.05)"]} style={StyleSheet.absoluteFillObject} />
            <Text style={S.moneyTitle}>{info.currency}</Text>
            <Text style={S.moneyRate}>{info.exchangeRate}</Text>
            <Text style={S.moneyTip}>💡 Use ATMs at banks for best rates. Avoid airport exchange booths.</Text>
          </View>
        )}
        {activeTab === "emergency" && (
          <View style={S.emergencyCard}>
            {info.emergencyNumbers.map((e, i) => (
              <View key={i} style={S.emergencyRow}>
                <Text style={S.emergencyLabel}>{e.label}</Text>
                <Text style={S.emergencyNumber}>{e.number}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function InfoCard({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <View style={[S.infoCard, { borderColor: color + "30" }]}>
      <LinearGradient colors={[color + "15", color + "05"]} style={StyleSheet.absoluteFillObject} />
      <Text style={[S.infoCardTitle, { color }]}>{title}</Text>
      {items.map((item, i) => (
        <View key={i} style={S.infoRow}>
          <View style={[S.infoDot, { backgroundColor: color }]} />
          <Text style={S.infoText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1B2A" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4, gap: 8 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  headerSub: { color: "#5A4D72", fontSize: 12 },

  visaHero: { marginHorizontal: 16, borderRadius: 20, padding: 16, gap: 14, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", marginBottom: 16 },
  visaStatusBadge: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 14, borderWidth: 1, padding: 14, backgroundColor: "rgba(255,255,255,0.03)" },
  visaStatusLabel: { fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  visaStatusSub: { color: "#9BA1A6", fontSize: 13, marginTop: 2 },
  visaMetaRow: { flexDirection: "row", alignItems: "center" },
  visaMetaItem: { flex: 1, alignItems: "center", gap: 3 },
  visaMetaDivider: { width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.1)" },
  visaMetaLabel: { color: "#5A4D72", fontSize: 11, fontWeight: "600", textTransform: "uppercase" },
  visaMetaValue: { color: "#FFF", fontSize: 12, fontWeight: "700", textAlign: "center" },

  tabRow: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center", backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  tabActive: { backgroundColor: "rgba(100,67,244,0.2)", borderColor: "rgba(100,67,244,0.5)" },
  tabText: { color: "#5A4D72", fontSize: 11, fontWeight: "700" },
  tabTextActive: { color: "#A78BFA" },

  infoCard: { borderRadius: 16, padding: 16, gap: 10, overflow: "hidden", borderWidth: 1 },
  infoCardTitle: { fontSize: 14, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, fontFamily: "Chillax-Bold" },
  infoRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  infoDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  infoText: { color: "#ECEDEE", fontSize: 14, flex: 1, lineHeight: 20 },

  moneyCard: { borderRadius: 16, padding: 20, gap: 8, overflow: "hidden", borderWidth: 1, borderColor: "rgba(16,185,129,0.3)", alignItems: "center" },
  moneyTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", fontFamily: "Chillax-Bold" },
  moneyRate: { color: "#10B981", fontSize: 28, fontWeight: "900", fontFamily: "Chillax-Bold" },
  moneyTip: { color: "#9BA1A6", fontSize: 13, textAlign: "center", lineHeight: 20, marginTop: 8 },

  emergencyCard: { borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.05)" },
  emergencyRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.06)" },
  emergencyLabel: { color: "#9BA1A6", fontSize: 14 },
  emergencyNumber: { color: "#EF4444", fontSize: 16, fontWeight: "800", fontFamily: "Chillax-Bold" },
});
