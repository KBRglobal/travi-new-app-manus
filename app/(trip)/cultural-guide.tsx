import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Dimensions, Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Types ────────────────────────────────────────────────────────────────────
interface CulturalSection {
  id: string;
  icon: string;
  title: string;
  color: string;
  gradient: [string, string];
  items: CulturalItem[];
}

interface CulturalItem {
  label: string;
  value: string;
  type: "do" | "dont" | "info" | "tip";
}

// ─── Cultural Data per Destination ───────────────────────────────────────────
const CULTURAL_DATA: Record<string, { headline: string; emoji: string; sections: CulturalSection[] }> = {
  dubai: {
    headline: "Islamic culture with modern cosmopolitan flair",
    emoji: "🇦🇪",
    sections: [
      {
        id: "religion", icon: "moon.stars.fill", title: "Religion & Customs", color: "#8B5CF6", gradient: ["#8B5CF6", "#6D28D9"],
        items: [
          { label: "Prayer Times", value: "5 times daily — shops may briefly close. Respect the call to prayer.", type: "info" },
          { label: "Ramadan", value: "No eating, drinking, or smoking in public during daylight hours.", type: "dont" },
          { label: "Mosques", value: "Remove shoes, cover arms & legs. Women cover hair. Non-Muslims welcome in many mosques.", type: "do" },
          { label: "Friday", value: "Holy day — many businesses open late or close. Plan accordingly.", type: "tip" },
        ],
      },
      {
        id: "dress", icon: "tshirt.fill", title: "Dress Code", color: "#EC4899", gradient: ["#EC4899", "#BE185D"],
        items: [
          { label: "Public Areas", value: "Cover shoulders and knees. Swimwear only at beaches/pools.", type: "do" },
          { label: "Malls & Souks", value: "Modest clothing required. Avoid very short shorts or revealing tops.", type: "do" },
          { label: "Couples", value: "Public displays of affection are frowned upon.", type: "dont" },
          { label: "Beaches", value: "Swimwear acceptable at designated beach areas only.", type: "info" },
        ],
      },
      {
        id: "food", icon: "fork.knife", title: "Food & Drink", color: "#F59E0B", gradient: ["#F59E0B", "#D97706"],
        items: [
          { label: "Halal Only", value: "All food is halal. Pork is rare and only in licensed international hotels.", type: "info" },
          { label: "Alcohol", value: "Only served in licensed hotels, restaurants, and bars. Illegal in public.", type: "dont" },
          { label: "Kosher", value: "Limited kosher options available — check with your hotel concierge.", type: "tip" },
          { label: "Tap Water", value: "Safe to drink but most locals prefer bottled water.", type: "info" },
        ],
      },
      {
        id: "laws", icon: "shield.fill", title: "Laws & Rules", color: "#EF4444", gradient: ["#EF4444", "#B91C1C"],
        items: [
          { label: "Photography", value: "Never photograph government buildings, military, or people without consent.", type: "dont" },
          { label: "Drugs", value: "Zero tolerance. Even trace amounts can lead to imprisonment.", type: "dont" },
          { label: "VPN", value: "VoIP calls (WhatsApp, FaceTime) may be restricted. Use local SIM.", type: "tip" },
          { label: "Currency", value: "UAE Dirham (AED). Cards widely accepted. ATMs everywhere.", type: "info" },
        ],
      },
      {
        id: "etiquette", icon: "hand.raised.fill", title: "Etiquette & Tips", color: "#10B981", gradient: ["#10B981", "#059669"],
        items: [
          { label: "Greetings", value: "\"As-salamu alaykum\" is warmly received. Handshakes common between same genders.", type: "tip" },
          { label: "Left Hand", value: "Avoid using left hand for eating or giving/receiving items.", type: "dont" },
          { label: "Bargaining", value: "Expected in souks. Not appropriate in malls.", type: "tip" },
          { label: "Tipping", value: "10–15% in restaurants. Not mandatory but appreciated.", type: "info" },
        ],
      },
    ],
  },
  tokyo: {
    headline: "Deep respect, harmony, and ancient traditions",
    emoji: "🇯🇵",
    sections: [
      {
        id: "religion", icon: "moon.stars.fill", title: "Religion & Customs", color: "#8B5CF6", gradient: ["#8B5CF6", "#6D28D9"],
        items: [
          { label: "Shrines & Temples", value: "Bow at the torii gate. Wash hands at the purification fountain before entering.", type: "do" },
          { label: "Shoes", value: "Remove shoes when entering homes, traditional restaurants, and some temples.", type: "do" },
          { label: "Silence", value: "Speak quietly in public spaces, trains, and temples.", type: "do" },
          { label: "Gifts", value: "Giving gifts is a meaningful gesture. Present with both hands.", type: "tip" },
        ],
      },
      {
        id: "dress", icon: "tshirt.fill", title: "Dress Code", color: "#EC4899", gradient: ["#EC4899", "#BE185D"],
        items: [
          { label: "General", value: "Smart casual is the norm. Japanese dress neatly in public.", type: "info" },
          { label: "Tattoos", value: "Cover tattoos in onsen (hot springs) and some gyms — they may deny entry.", type: "dont" },
          { label: "Temples", value: "No specific dress code but modest clothing is respectful.", type: "info" },
          { label: "Shoes", value: "Wear easy slip-on shoes — you'll remove them often.", type: "tip" },
        ],
      },
      {
        id: "food", icon: "fork.knife", title: "Food & Drink", color: "#F59E0B", gradient: ["#F59E0B", "#D97706"],
        items: [
          { label: "Chopsticks", value: "Never stick chopsticks upright in rice — it's a funeral symbol.", type: "dont" },
          { label: "Slurping", value: "Slurping noodles is a compliment to the chef.", type: "do" },
          { label: "Tipping", value: "Tipping is considered rude — never leave a tip.", type: "dont" },
          { label: "Eating While Walking", value: "Generally frowned upon except at festivals.", type: "dont" },
        ],
      },
      {
        id: "laws", icon: "shield.fill", title: "Laws & Rules", color: "#EF4444", gradient: ["#EF4444", "#B91C1C"],
        items: [
          { label: "Smoking", value: "Only in designated smoking areas. Heavy fines for smoking on streets.", type: "dont" },
          { label: "Trash", value: "Almost no public bins — carry your trash until you find one.", type: "tip" },
          { label: "Drugs", value: "Zero tolerance. Even cannabis from legal countries can lead to arrest.", type: "dont" },
          { label: "Currency", value: "Japan is still largely cash-based. Carry yen.", type: "tip" },
        ],
      },
      {
        id: "etiquette", icon: "hand.raised.fill", title: "Etiquette & Tips", color: "#10B981", gradient: ["#10B981", "#059669"],
        items: [
          { label: "Bowing", value: "A slight bow is the standard greeting. The deeper the bow, the more respect.", type: "do" },
          { label: "Trains", value: "No phone calls. Quiet mode. Give up seats for elderly and pregnant.", type: "do" },
          { label: "Queuing", value: "Always queue — pushing or cutting is extremely rude.", type: "do" },
          { label: "Business Cards", value: "Receive with both hands and study it before putting away.", type: "tip" },
        ],
      },
    ],
  },
  paris: {
    headline: "Elegance, art, and refined social etiquette",
    emoji: "🇫🇷",
    sections: [
      {
        id: "religion", icon: "moon.stars.fill", title: "Culture & Society", color: "#8B5CF6", gradient: ["#8B5CF6", "#6D28D9"],
        items: [
          { label: "Secularism", value: "France is strictly secular. Religion is a private matter.", type: "info" },
          { label: "Churches", value: "Dress modestly when visiting cathedrals and churches.", type: "do" },
          { label: "Politics", value: "Avoid discussing politics with strangers — it can get heated.", type: "tip" },
          { label: "Sundays", value: "Many shops close on Sunday. Plan grocery shopping in advance.", type: "info" },
        ],
      },
      {
        id: "dress", icon: "tshirt.fill", title: "Dress Code", color: "#EC4899", gradient: ["#EC4899", "#BE185D"],
        items: [
          { label: "General", value: "Parisians dress elegantly. Avoid overly casual tourist looks.", type: "tip" },
          { label: "Restaurants", value: "Smart casual for most restaurants. Formal for fine dining.", type: "do" },
          { label: "Beaches", value: "Topless sunbathing is legal but becoming less common.", type: "info" },
          { label: "Sneakers", value: "Fashionable sneakers are fine — clean and stylish is the rule.", type: "info" },
        ],
      },
      {
        id: "food", icon: "fork.knife", title: "Food & Drink", color: "#F59E0B", gradient: ["#F59E0B", "#D97706"],
        items: [
          { label: "Greetings First", value: "Always say \"Bonjour\" before ordering or asking for anything.", type: "do" },
          { label: "Tipping", value: "Service is included. A small extra tip (€1–2) is appreciated but not required.", type: "info" },
          { label: "Lunch Hours", value: "12–2pm is sacred. Many restaurants only serve during this window.", type: "tip" },
          { label: "Bread", value: "Bread is served with every meal. It's free and refilled.", type: "info" },
        ],
      },
      {
        id: "laws", icon: "shield.fill", title: "Laws & Rules", color: "#EF4444", gradient: ["#EF4444", "#B91C1C"],
        items: [
          { label: "Pickpockets", value: "Very common near Eiffel Tower, Metro, and tourist areas. Use a money belt.", type: "dont" },
          { label: "Photography", value: "Eiffel Tower at night is copyrighted — commercial use requires permission.", type: "info" },
          { label: "Scooters", value: "Rental e-scooters banned in Paris since 2023.", type: "info" },
          { label: "Currency", value: "Euro (€). Cards widely accepted everywhere.", type: "info" },
        ],
      },
      {
        id: "etiquette", icon: "hand.raised.fill", title: "Etiquette & Tips", color: "#10B981", gradient: ["#10B981", "#059669"],
        items: [
          { label: "La Bise", value: "Cheek kisses (1–2 depending on region) are the standard greeting between friends.", type: "info" },
          { label: "Bonjour!", value: "Always greet shopkeepers when entering and say \"Au revoir\" when leaving.", type: "do" },
          { label: "Patience", value: "Service can be slow — it's intentional. Rushing is considered rude.", type: "tip" },
          { label: "Noise", value: "Keep voices low in restaurants and public spaces.", type: "do" },
        ],
      },
    ],
  },
  // Generic fallback for any other destination
  default: {
    headline: "Local culture, customs, and travel tips",
    emoji: "🌍",
    sections: [
      {
        id: "religion", icon: "moon.stars.fill", title: "Religion & Customs", color: "#8B5CF6", gradient: ["#8B5CF6", "#6D28D9"],
        items: [
          { label: "Research Local Religion", value: "Check the dominant religion and its customs before visiting places of worship.", type: "tip" },
          { label: "Places of Worship", value: "Dress modestly, remove shoes if required, and speak quietly.", type: "do" },
          { label: "Local Holidays", value: "Check if your trip coincides with religious holidays — services may change.", type: "tip" },
        ],
      },
      {
        id: "dress", icon: "tshirt.fill", title: "Dress Code", color: "#EC4899", gradient: ["#EC4899", "#BE185D"],
        items: [
          { label: "General Rule", value: "When in doubt, dress modestly. Locals will appreciate the respect.", type: "do" },
          { label: "Beaches", value: "Check local norms — some beaches require more coverage than others.", type: "info" },
          { label: "Religious Sites", value: "Cover shoulders and knees at most religious sites worldwide.", type: "do" },
        ],
      },
      {
        id: "food", icon: "fork.knife", title: "Food & Drink", color: "#F59E0B", gradient: ["#F59E0B", "#D97706"],
        items: [
          { label: "Tap Water", value: "Check if tap water is safe to drink at your destination.", type: "tip" },
          { label: "Dietary Needs", value: "Research halal, kosher, vegetarian, or vegan options in advance.", type: "tip" },
          { label: "Tipping", value: "Tipping customs vary widely — research local norms before you go.", type: "info" },
          { label: "Street Food", value: "Often the best local experience — look for busy stalls with high turnover.", type: "do" },
        ],
      },
      {
        id: "laws", icon: "shield.fill", title: "Laws & Rules", color: "#EF4444", gradient: ["#EF4444", "#B91C1C"],
        items: [
          { label: "Photography", value: "Always ask before photographing people, military sites, or government buildings.", type: "do" },
          { label: "Drugs", value: "Laws vary drastically. Research before assuming anything is legal.", type: "dont" },
          { label: "Currency", value: "Check the local currency and whether cards are widely accepted.", type: "tip" },
          { label: "Emergency Number", value: "Save the local emergency number before you arrive.", type: "do" },
        ],
      },
      {
        id: "etiquette", icon: "hand.raised.fill", title: "Etiquette & Tips", color: "#10B981", gradient: ["#10B981", "#059669"],
        items: [
          { label: "Learn a Few Words", value: "\"Hello\", \"Thank you\", and \"Sorry\" in the local language go a long way.", type: "do" },
          { label: "Bargaining", value: "Common in markets in many countries — but not in shops or restaurants.", type: "tip" },
          { label: "Personal Space", value: "Varies by culture — observe locals and follow their lead.", type: "info" },
          { label: "Patience", value: "Things move at different paces in different cultures. Embrace it.", type: "tip" },
        ],
      },
    ],
  },
};

function getDestinationData(destination: string) {
  const key = destination?.toLowerCase().replace(/\s+/g, "");
  return CULTURAL_DATA[key] ?? { ...CULTURAL_DATA.default, headline: `Local culture and customs for ${destination}` };
}

// ─── Item Badge ───────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  do: { label: "DO", bg: "#10B98120", text: "#10B981", border: "#10B98140" },
  dont: { label: "DON'T", bg: "#EF444420", text: "#EF4444", border: "#EF444440" },
  info: { label: "INFO", bg: "#3B82F620", text: "#60A5FA", border: "#3B82F640" },
  tip: { label: "TIP", bg: "#F59E0B20", text: "#F59E0B", border: "#F59E0B40" },
};

function CulturalItemRow({ item }: { item: CulturalItem }) {
  const cfg = TYPE_CONFIG[item.type];
  return (
    <View style={S.itemRow}>
      <View style={[S.typeBadge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
        <Text style={[S.typeBadgeText, { color: cfg.text }]}>{cfg.label}</Text>
      </View>
      <View style={S.itemContent}>
        <Text style={S.itemLabel}>{item.label}</Text>
        <Text style={S.itemValue}>{item.value}</Text>
      </View>
    </View>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ section, expanded, onToggle }: { section: CulturalSection; expanded: boolean; onToggle: () => void }) {
  return (
    <View style={S.sectionCard}>
      <TouchableOpacity style={S.sectionHeader} onPress={onToggle} activeOpacity={0.8}>
        <LinearGradient colors={section.gradient} style={S.sectionIcon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <IconSymbol name={section.icon as never} size={18} color="#fff" />
        </LinearGradient>
        <Text style={S.sectionTitle}>{section.title}</Text>
        <View style={[S.sectionCount, { backgroundColor: section.color + "20" }]}>
          <Text style={[S.sectionCountText, { color: section.color }]}>{section.items.length}</Text>
        </View>
        <IconSymbol name={expanded ? "chevron.down" : "chevron.right"} size={16} color="#9BA1A6" />
      </TouchableOpacity>
      {expanded && (
        <View style={S.sectionBody}>
          {section.items.map((item, i) => (
            <CulturalItemRow key={i} item={item} />
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CulturalGuideScreen() {
  const { destination = "dubai" } = useLocalSearchParams<{ destination: string }>();
  const insets = useSafeAreaInsets();
  const data = getDestinationData(destination);
  const [expanded, setExpanded] = useState<string>("religion");

  function toggle(id: string) {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded((prev) => (prev === id ? "" : id));
  }

  const displayName = destination.charAt(0).toUpperCase() + destination.slice(1);

  return (
    <View style={[S.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient colors={["#1A0A2E", "#2D1B4E"]} style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <IconSymbol name="chevron.left" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <Text style={S.headerEmoji}>{data.emoji}</Text>
          <Text style={S.headerTitle}>{displayName}</Text>
          <Text style={S.headerSub}>Cultural Guide</Text>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      {/* Headline */}
      <View style={S.headlineBanner}>
        <IconSymbol name="info.circle.fill" size={16} color="#A78BFA" />
        <Text style={S.headlineText}>{data.headline}</Text>
      </View>

      {/* Sections */}
      <ScrollView style={S.scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        {data.sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            expanded={expanded === section.id}
            onToggle={() => toggle(section.id)}
          />
        ))}

        {/* Footer note */}
        <View style={S.footerNote}>
          <IconSymbol name="exclamationmark.triangle.fill" size={14} color="#F59E0B" />
          <Text style={S.footerNoteText}>
            Cultural norms evolve. Always verify current local guidelines before your trip.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0F0520" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center",
  },
  headerCenter: { alignItems: "center" },
  headerEmoji: { fontSize: 32, marginBottom: 4 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#fff", letterSpacing: 0.3 },
  headerSub: { fontSize: 13, color: "#A78BFA", marginTop: 2 },
  headlineBanner: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    marginHorizontal: 16, marginTop: 12, marginBottom: 4,
    backgroundColor: "rgba(167,139,250,0.1)", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(167,139,250,0.2)",
    padding: 12,
  },
  headlineText: { flex: 1, fontSize: 13, color: "#C4B5FD", lineHeight: 19 },
  scroll: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  sectionCard: {
    backgroundColor: "#1A0A2E", borderRadius: 16,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.07)",
    marginBottom: 10, overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row", alignItems: "center", gap: 12,
    padding: 16,
  },
  sectionIcon: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  sectionTitle: { flex: 1, fontSize: 15, fontWeight: "700", color: "#fff" },
  sectionCount: {
    width: 24, height: 24, borderRadius: 8,
    alignItems: "center", justifyContent: "center",
  },
  sectionCountText: { fontSize: 12, fontWeight: "700" },
  sectionBody: { paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  itemRow: {
    flexDirection: "row", gap: 10, alignItems: "flex-start",
    paddingTop: 10, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)",
  },
  typeBadge: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6,
    borderWidth: 1, alignSelf: "flex-start", marginTop: 2,
  },
  typeBadgeText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  itemContent: { flex: 1 },
  itemLabel: { fontSize: 13, fontWeight: "700", color: "#E2E8F0", marginBottom: 3 },
  itemValue: { fontSize: 12, color: "#94A3B8", lineHeight: 18 },
  footerNote: {
    flexDirection: "row", gap: 8, alignItems: "flex-start",
    backgroundColor: "rgba(245,158,11,0.08)", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(245,158,11,0.2)",
    padding: 12, marginTop: 8,
  },
  footerNoteText: { flex: 1, fontSize: 12, color: "#FCD34D", lineHeight: 18 },
});
