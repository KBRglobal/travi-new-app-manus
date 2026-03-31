import { useState, useRef, useCallback, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  FlatList, TextInput, Animated, Platform, KeyboardAvoidingView, Keyboard
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

interface ChatMessage {
  id: string;
  role: "user" | "travi";
  text: string;
  time: string;
  cards?: SuggestionCard[];
}

interface SuggestionCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  gradient: [string, string];
}

const SMART_RESPONSES: { keywords: string[]; response: string; cards?: SuggestionCard[] }[] = [
  {
    keywords: ["restaurant", "eat", "food", "hungry", "dinner", "lunch", "breakfast"],
    response: "Based on your Culinary Nomad DNA, here are 3 spots I'd personally pick for you right now:",
    cards: [
      { id: "r1", title: "Narisawa", subtitle: "Innovative Japanese · ★ 4.9 · 8 min walk", iconName: "fork.knife", gradient: ["#7C2D12", "#DC2626"] },
      { id: "r2", title: "Sushi Saito", subtitle: "Omakase · ★ 4.8 · Book ahead", iconName: "star.fill", gradient: ["#1E3A5F", "#2563EB"] },
      { id: "r3", title: "Ichiran Ramen", subtitle: "Solo booth ramen · ★ 4.7 · Open now", iconName: "flame.fill", gradient: ["#7C3AED", "#A855F7"] },
    ],
  },
  {
    keywords: ["weather", "rain", "sunny", "temperature", "forecast"],
    response: "Current conditions in your destination: 22°C, partly cloudy. Perfect for exploring! Tomorrow brings light rain in the afternoon — I'd suggest moving your outdoor activities to the morning.",
  },
  {
    keywords: ["hotel", "room", "check in", "checkout", "accommodation"],
    response: "Your hotel is The Peninsula Tokyo, Marunouchi. Check-in was yesterday at 3pm. You're in room 1204 — a Deluxe Room with city views. Checkout is in 4 days at 12pm. Need anything from the concierge?",
    cards: [
      { id: "h1", title: "Room Service", subtitle: "Available 24/7", iconName: "bell.fill", gradient: ["#292524", "#57534E"] },
      { id: "h2", title: "Spa Booking", subtitle: "Slots available today", iconName: "sparkles", gradient: ["#0E7490", "#06B6D4"] },
    ],
  },
  {
    keywords: ["transport", "taxi", "uber", "train", "metro", "bus", "get to", "how to get"],
    response: "Best options from your current location:\n\nMetro — 12 min, very affordable\nTaxi — 18 min, ~$12\nWalk — 45 min (great route through the old quarter)\n\nI'd take the metro — it's an experience in itself.",
  },
  {
    keywords: ["itinerary", "today", "plan", "schedule", "what should"],
    response: "Here's your day at a glance:",
    cards: [
      { id: "i1", title: "Morning Market", subtitle: "9:00 AM · Fresh local breakfast", iconName: "cart.fill", gradient: ["#B45309", "#F59E0B"] },
      { id: "i2", title: "Digital Art Museum", subtitle: "2:00 PM · Immersive experience", iconName: "sparkles", gradient: ["#6B21A8", "#EC4899"] },
      { id: "i3", title: "Sunset Viewpoint", subtitle: "6:00 PM · Golden hour magic", iconName: "sun.max.fill", gradient: ["#1E3A5F", "#2563EB"] },
    ],
  },
  {
    keywords: ["money", "currency", "exchange", "atm", "cash"],
    response: "You've spent approximately $340 so far on this trip. Best ATMs: 7-Eleven and local bank branches — no foreign fees. Avoid airport exchange booths, rates are 15% worse.",
  },
  {
    keywords: ["emergency", "hospital", "doctor", "sick", "help", "police"],
    response: "Emergency contacts:\n\nPolice: 110\nAmbulance: 119\nNearest hospital: 12 min away\nYour country's embassy: saved in your profile\n\nStay safe — I'm here if you need anything.",
  },
  {
    keywords: ["points", "travi", "reward", "earn"],
    response: "You've earned 340 TRAVI Points on this trip so far!\n\n200 pts for booking through TRAVI\n100 pts for completing Day 1 activities\n40 pts for leaving a review\n\nYou're 160 pts away from unlocking Adventurer tier.",
  },
  {
    keywords: ["souvenir", "shop", "buy", "gift", "shopping"],
    response: "Best shopping based on your Cultural Explorer DNA:",
    cards: [
      { id: "s1", title: "Traditional Crafts Market", subtitle: "Authentic local souvenirs", iconName: "bag.fill", gradient: ["#C2410C", "#EA580C"] },
      { id: "s2", title: "Design District", subtitle: "Unique modern goods", iconName: "sparkles", gradient: ["#1E3A5F", "#2563EB"] },
      { id: "s3", title: "Food Market", subtitle: "Edible gifts & local products", iconName: "cart.fill", gradient: ["#065F46", "#10B981"] },
    ],
  },
];

const DEFAULT_RESPONSES = [
  "Great question! As a Cultural Explorer, you'll love this: the best hidden gem near you right now is the old quarter — walk 2-3 streets away from the main tourist area and you'll find authentic local life.",
  "Absolutely! Given your DNA profile, I'd prioritize experiences over sightseeing. The local immersive art experiences are unmissable — book tickets now, they sell out fast.",
  "Perfect timing to ask! The local tip I always give: avoid tourist restaurants near major landmarks. Walk 2-3 streets away and prices drop 40% while quality goes up.",
  "I love that you're asking! Tokyo has so much to offer. Based on what I know about your travel style, I'd suggest exploring the less-touristy neighborhoods first thing in the morning.",
];

const SUGGESTION_CHIPS = [
  { id: "c1", text: "Best food nearby", iconName: "fork.knife" },
  { id: "c2", text: "Today's plan", iconName: "calendar" },
  { id: "c3", text: "Weather today", iconName: "sun.max.fill" },
  { id: "c4", text: "How to get around", iconName: "tram.fill" },
  { id: "c5", text: "My points", iconName: "star.fill" },
  { id: "c6", text: "Emergency info", iconName: "cross.fill" },
];

function getSmartResponse(input: string): { text: string; cards?: SuggestionCard[] } {
  const lower = input.toLowerCase();
  for (const item of SMART_RESPONSES) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return { text: item.response, cards: item.cards };
    }
  }
  return { text: DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)] };
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatScreen() {
  const { state } = useStore();
  const activeTrip = state.activeTrip || state.trips[0];
  const profile = state.profile;
  const firstName = profile?.name?.split(" ")[0] || "Traveler";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "travi",
      time: nowTime(),
      text: `Hey ${firstName}! I'm TRAVI, your personal travel companion. I know your itinerary, your location, and your travel style. Ask me anything — restaurants, transport, weather, or just what to do next. I'm here 24/7.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isTyping) return;
    const anim = Animated.loop(
      Animated.stagger(160, [
        Animated.sequence([Animated.timing(dot1, { toValue: -5, duration: 300, useNativeDriver: true }), Animated.timing(dot1, { toValue: 0, duration: 300, useNativeDriver: true })]),
        Animated.sequence([Animated.timing(dot2, { toValue: -5, duration: 300, useNativeDriver: true }), Animated.timing(dot2, { toValue: 0, duration: 300, useNativeDriver: true })]),
        Animated.sequence([Animated.timing(dot3, { toValue: -5, duration: 300, useNativeDriver: true }), Animated.timing(dot3, { toValue: 0, duration: 300, useNativeDriver: true })]),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [isTyping]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text: text.trim(), time: nowTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    Keyboard.dismiss();
    setTimeout(() => {
      const { text: responseText, cards } = getSmartResponse(text);
      const traviMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: "travi", text: responseText, time: nowTime(), cards };
      setIsTyping(false);
      setMessages((prev) => [...prev, traviMsg]);
      if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200 + Math.random() * 600);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const renderMessage = useCallback(({ item }: { item: ChatMessage }) => {
    const isTravi = item.role === "travi";
    return (
      <View style={[S.msgRow, isTravi ? S.msgRowTravi : S.msgRowUser]}>
        {isTravi && (
          <View style={S.traviAvatar}>
            <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={S.traviAvatarGrad}>
              <Text style={S.traviAvatarEmoji}>🦆</Text>
            </LinearGradient>
          </View>
        )}
        <View style={[S.bubble, isTravi ? S.bubbleTravi : S.bubbleUser]}>
          {isTravi
            ? <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.15)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
            : <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          }
          <Text style={[S.bubbleText, isTravi ? S.bubbleTextTravi : S.bubbleTextUser]}>{item.text}</Text>
          {item.cards && item.cards.length > 0 && (
            <View style={S.cardsWrap}>
              {item.cards.map((card) => (
                <TouchableOpacity key={card.id} style={S.suggCard} activeOpacity={0.85}>
                  <LinearGradient colors={card.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
                  <View style={S.suggCardIcon}>
                    <IconSymbol name={card.iconName as never} size={16} color="rgba(255,255,255,0.9)" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={S.suggCardTitle}>{card.title}</Text>
                    <Text style={S.suggCardSub}>{card.subtitle}</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={14} color="rgba(255,255,255,0.4)" />
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={S.msgTime}>{item.time}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={S.container}>
      <LinearGradient colors={["#040010", "#0D0520", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <View style={S.headerAvatar}>
            <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={S.headerAvatarGrad}>
              <Text style={S.headerAvatarEmoji}>🦆</Text>
            </LinearGradient>
          </View>
          <View>
            <Text style={S.headerName}>TRAVI</Text>
            <View style={S.headerStatus}>
              <View style={S.onlineDot} />
              <Text style={S.headerStatusText}>{activeTrip ? `In ${activeTrip.destination}` : "Always online"}</Text>
            </View>
          </View>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Trip context banner */}
      {activeTrip && (
        <View style={S.contextBanner}>
          <LinearGradient colors={["rgba(123,47,190,0.25)", "rgba(233,30,140,0.12)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <IconSymbol name="location.fill" size={13} color="#C084FC" />
          <Text style={S.contextText}>{activeTrip.destination}, {activeTrip.country}</Text>
          <View style={S.contextDot} />
          <Text style={S.contextPoints}>{profile?.points || 0} pts</Text>
        </View>
      )}

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={S.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={
            isTyping ? (
              <View style={[S.msgRow, S.msgRowTravi]}>
                <View style={S.traviAvatar}>
                  <LinearGradient colors={["#7B2FBE", "#E91E8C"]} style={S.traviAvatarGrad}>
                    <Text style={S.traviAvatarEmoji}>🦆</Text>
                  </LinearGradient>
                </View>
                <View style={[S.bubble, S.bubbleTravi, { paddingVertical: 16 }]}>
                  <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.15)"]} style={StyleSheet.absoluteFillObject} />
                  <View style={S.typingDots}>
                    {[dot1, dot2, dot3].map((d, i) => (
                      <Animated.View key={i} style={[S.typingDot, { transform: [{ translateY: d }] }]} />
                    ))}
                  </View>
                </View>
              </View>
            ) : null
          }
        />

        {/* Suggestion chips */}
        <FlatList
          data={SUGGESTION_CHIPS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={S.chipsList}
          style={S.chipsWrap}
          renderItem={({ item }) => (
            <TouchableOpacity style={S.chip} onPress={() => sendMessage(item.text)} activeOpacity={0.8}>
              <LinearGradient colors={["rgba(123,47,190,0.3)", "rgba(233,30,140,0.15)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <IconSymbol name={item.iconName as never} size={13} color="#C084FC" />
              <Text style={S.chipText}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Input bar */}
        <View style={S.inputBar}>
          <LinearGradient colors={["rgba(4,0,16,0.98)", "rgba(13,5,32,0.99)"]} style={StyleSheet.absoluteFillObject} />
          <View style={S.inputWrap}>
            <LinearGradient colors={["rgba(123,47,190,0.2)", "rgba(233,30,140,0.1)"]} style={StyleSheet.absoluteFillObject} />
            <TextInput
              style={S.input}
              placeholder="Ask TRAVI anything..."
              placeholderTextColor="rgba(255,255,255,0.25)"
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage(input)}
            />
            <TouchableOpacity
              style={S.sendBtn}
              onPress={() => sendMessage(input)}
              activeOpacity={0.8}
              disabled={!input.trim() || isTyping}
            >
              {input.trim() ? (
                <LinearGradient colors={["#7B2FBE", "#E91E8C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.sendBtnGrad}>
                  <IconSymbol name="arrow.up" size={18} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={[S.sendBtnGrad, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
                  <IconSymbol name="arrow.up" size={18} color="rgba(255,255,255,0.2)" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040010" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  headerAvatarGrad: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerAvatarEmoji: { fontSize: 22 },
  headerName: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  headerStatus: { flexDirection: "row", alignItems: "center", gap: 5 },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#10B981" },
  headerStatusText: { color: "rgba(255,255,255,0.45)", fontSize: 12 },
  contextBanner: { flexDirection: "row", alignItems: "center", gap: 6, marginHorizontal: 16, borderRadius: 12, overflow: "hidden", paddingHorizontal: 12, paddingVertical: 8, marginBottom: 8, borderWidth: 1, borderColor: "rgba(123,47,190,0.3)" },
  contextText: { flex: 1, color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: "600" },
  contextDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)" },
  contextPoints: { color: "#FFD700", fontSize: 12, fontWeight: "700" },
  messagesList: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16, gap: 16 },
  msgRow: { flexDirection: "row", gap: 10 },
  msgRowTravi: { alignSelf: "flex-start", maxWidth: width * 0.85 },
  msgRowUser: { alignSelf: "flex-end", flexDirection: "row-reverse", maxWidth: width * 0.75 },
  traviAvatar: { width: 32, height: 32, borderRadius: 16, overflow: "hidden", flexShrink: 0, marginTop: 4 },
  traviAvatarGrad: { flex: 1, alignItems: "center", justifyContent: "center" },
  traviAvatarEmoji: { fontSize: 18 },
  bubble: { borderRadius: 20, overflow: "hidden", padding: 14, gap: 10 },
  bubbleTravi: { borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(123,47,190,0.35)" },
  bubbleUser: { borderBottomRightRadius: 4 },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextTravi: { color: "rgba(255,255,255,0.88)" },
  bubbleTextUser: { color: "#FFFFFF" },
  msgTime: { color: "rgba(255,255,255,0.25)", fontSize: 11, alignSelf: "flex-end" },
  cardsWrap: { gap: 8, marginTop: 4 },
  suggCard: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 14, overflow: "hidden", padding: 10 },
  suggCardIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.25)", alignItems: "center", justifyContent: "center" },
  suggCardTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  suggCardSub: { color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 1 },
  typingDots: { flexDirection: "row", gap: 5, alignItems: "center" },
  typingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#C084FC" },
  chipsWrap: { maxHeight: 46 },
  chipsList: { paddingHorizontal: 16, gap: 8, paddingVertical: 6 },
  chip: { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 20, overflow: "hidden", paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(123,47,190,0.35)" },
  chipText: { color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: "600" },
  inputBar: { paddingHorizontal: 12, paddingVertical: 10, paddingBottom: Platform.OS === "ios" ? 28 : 12 },
  inputWrap: { flexDirection: "row", alignItems: "flex-end", gap: 10, borderRadius: 24, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(123,47,190,0.35)" },
  input: { flex: 1, color: "#FFFFFF", fontSize: 15, maxHeight: 100, lineHeight: 22 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, overflow: "hidden", flexShrink: 0 },
  sendBtnGrad: { flex: 1, alignItems: "center", justifyContent: "center" },
});
