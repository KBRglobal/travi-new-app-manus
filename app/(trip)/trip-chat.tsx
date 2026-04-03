/**
 * Trip Chat — AI Concierge
 * Context-aware chat assistant during the trip.
 * Knows your location, itinerary, DNA, and preferences.
 */

import { useState, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  TextInput, KeyboardAvoidingView, Platform, Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

type Message = {
  id: string;
  role: "user" | "travi";
  text: string;
  time: string;
};

const QUICK_SUGGESTIONS = [
  { id: "q1", icon: "🍽️", label: "Find a restaurant nearby", query: "Find me a great restaurant near where I am right now" },
  { id: "q2", icon: "🗺️", label: "Change tomorrow's plan", query: "I want to change tomorrow's itinerary — what do you suggest?" },
  { id: "q3", icon: "🚕", label: "Book a taxi", query: "I need a taxi to get to my next stop" },
  { id: "q4", icon: "🌧️", label: "What's the weather?", query: "What's the weather like today and tomorrow?" },
  { id: "q5", icon: "💊", label: "Find a pharmacy", query: "Where's the nearest pharmacy?" },
  { id: "q6", icon: "📸", label: "Best photo spots", query: "What are the best photo spots near me right now?" },
];

const TRAVI_RESPONSES: Record<string, string[]> = {
  restaurant: [
    "Based on your Foodie Soul score and love of local cuisine, I'd recommend **Al Fanar Restaurant** — authentic Emirati food, 8 min walk. Rating 4.8 ⭐. They have a great lamb machboos. Want me to make a reservation?",
    "Given your food preferences, **Nobu Dubai** is 12 min away — Japanese-Peruvian fusion, perfect for your palate. Dinner for 2 starts at $120. Shall I book a table for tonight?",
  ],
  tomorrow: [
    "Tomorrow you have the Gold Souk at 10am and Dubai Frame at 2pm. Want to swap the order? The Frame is less crowded in the morning. I can also add a desert safari at sunset — you'd love it based on your Adventure Spirit score.",
    "I see tomorrow is a bit packed. Want me to remove the Gold Souk and replace it with a cooking class? It matches your Foodie Soul perfectly and you'd get a cashback of $12.",
  ],
  taxi: [
    "I've found a Careem taxi 3 min away — AED 25 to your next stop (Dubai Frame). Want me to book it? You'll get $2 cashback through TRAVI.",
    "Uber is available — 2 min away, AED 22 to your hotel. Booking through TRAVI gives you $1.50 cashback. Confirm?",
  ],
  weather: [
    "Today in Dubai: ☀️ 34°C, sunny. Tomorrow: 🌤️ 32°C, partly cloudy — perfect for outdoor activities. Humidity is 45%, so stay hydrated! I've added sunscreen to your packing reminder.",
    "It's 34°C and sunny right now — great for the beach! Tomorrow afternoon might have some clouds, ideal for the Gold Souk visit. No rain expected this week.",
  ],
  pharmacy: [
    "Nearest pharmacy: **Al Manara Pharmacy** — 4 min walk, open 24/7. Address: Sheikh Zayed Rd, near your hotel. They carry international brands.",
    "**Boots Pharmacy** is 6 min away in the Dubai Mall. Open until 11pm. They have a wide selection including international medications.",
  ],
  photo: [
    "Top photo spots near you right now:\n1. 📍 **Burj Khalifa base** — best at golden hour (6:30pm)\n2. 📍 **Dubai Frame** — city panorama\n3. 📍 **Al Seef waterfront** — traditional boats at sunset\n\nWant me to add these to your itinerary?",
    "For Instagram-worthy shots: the **Dubai Marina at night** is stunning (15 min away), and the **Museum of the Future** exterior is iconic. Both match your Culture Vulture personality!",
  ],
  default: [
    "I'm on it! Give me a moment to check that for you... Based on your travel DNA and current location, here's what I found. Would you like more details?",
    "Great question! As your personal TRAVI concierge, I'm checking the best options for you right now. I'll factor in your preferences and current location.",
  ],
};

function getResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("restaurant") || q.includes("food") || q.includes("eat")) {
    return TRAVI_RESPONSES.restaurant[Math.floor(Math.random() * 2)];
  }
  if (q.includes("tomorrow") || q.includes("plan") || q.includes("itinerary") || q.includes("change")) {
    return TRAVI_RESPONSES.tomorrow[Math.floor(Math.random() * 2)];
  }
  if (q.includes("taxi") || q.includes("uber") || q.includes("careem") || q.includes("ride")) {
    return TRAVI_RESPONSES.taxi[Math.floor(Math.random() * 2)];
  }
  if (q.includes("weather") || q.includes("rain") || q.includes("temperature")) {
    return TRAVI_RESPONSES.weather[Math.floor(Math.random() * 2)];
  }
  if (q.includes("pharmacy") || q.includes("medicine") || q.includes("doctor")) {
    return TRAVI_RESPONSES.pharmacy[Math.floor(Math.random() * 2)];
  }
  if (q.includes("photo") || q.includes("instagram") || q.includes("picture") || q.includes("spot")) {
    return TRAVI_RESPONSES.photo[Math.floor(Math.random() * 2)];
  }
  return TRAVI_RESPONSES.default[Math.floor(Math.random() * 2)];
}

function formatTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

export default function TripChatScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ destination?: string }>();
  const destination = params.destination ?? "Dubai";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "travi",
      text: `Hey! I'm your TRAVI concierge for ${destination} 🌟\n\nI know your itinerary, your DNA profile, and I'm tracking the best local tips for you. Ask me anything — restaurants, weather, taxis, photo spots, or changes to your plan!`,
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const typingDot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingDot, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(typingDot, { toValue: 0, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      typingDot.setValue(0);
    }
  }, [isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const userMsg: Message = { id: Date.now().toString(), role: "travi" as const, text, time: formatTime() };
    // Actually it's user
    const userMessage: Message = { id: Date.now().toString(), role: "user", text, time: formatTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getResponse(text);
      const traviMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "travi",
        text: response,
        time: formatTime(),
      };
      setMessages((prev) => [...prev, traviMsg]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200 + Math.random() * 800);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={["#0D0628", "#1A0A3D", "#0D0628"]} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={S.headerCenter}>
          <LinearGradient colors={["#6443F4", "#F94498"]} style={S.avatarGradient}>
            <Text style={S.avatarEmoji}>✨</Text>
          </LinearGradient>
          <View>
            <Text style={S.headerTitle}>TRAVI Concierge</Text>
            <View style={S.onlineRow}>
              <View style={S.onlineDot} />
              <Text style={S.onlineText}>Online · {destination}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={S.itineraryBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="calendar" size={18} color="#C4B5D9" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          style={S.messages}
          contentContainerStyle={S.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={[S.msgRow, msg.role === "user" && S.msgRowUser]}>
              {msg.role === "travi" && (
                <LinearGradient colors={["#6443F4", "#F94498"]} style={S.msgAvatar}>
                  <Text style={{ fontSize: 12, fontFamily: "Satoshi-Regular" }}>✨</Text>
                </LinearGradient>
              )}
              <View style={[S.bubble, msg.role === "user" ? S.bubbleUser : S.bubbleTravi]}>
                <Text style={[S.bubbleText, msg.role === "user" && S.bubbleTextUser]}>
                  {msg.text}
                </Text>
                <Text style={[S.bubbleTime, msg.role === "user" && S.bubbleTimeUser]}>{msg.time}</Text>
              </View>
            </View>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <View style={S.msgRow}>
              <LinearGradient colors={["#6443F4", "#F94498"]} style={S.msgAvatar}>
                <Text style={{ fontSize: 12, fontFamily: "Satoshi-Regular" }}>✨</Text>
              </LinearGradient>
              <View style={S.bubbleTravi}>
                <View style={S.typingDots}>
                  {[0, 1, 2].map((i) => (
                    <Animated.View
                      key={i}
                      style={[
                        S.typingDot,
                        {
                          opacity: typingDot,
                          transform: [{ translateY: typingDot.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) }],
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Suggestions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={S.suggestionsScroll}
          contentContainerStyle={S.suggestionsContent}
        >
          {QUICK_SUGGESTIONS.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={S.suggestionChip}
              onPress={() => sendMessage(s.query)}
              activeOpacity={0.8}
            >
              <Text style={S.suggestionIcon}>{s.icon}</Text>
              <Text style={S.suggestionLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={[S.inputRow, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={S.inputWrap}>
            <TextInput
              style={S.input}
              placeholder="Ask TRAVI anything..."
              placeholderTextColor="rgba(196,181,217,0.5)"
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage(input)}
            />
          </View>
          <TouchableOpacity
            style={[S.sendBtn, !input.trim() && S.sendBtnDisabled]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={input.trim() ? ["#6443F4", "#F94498"] : ["#2A1F3D", "#2A1F3D"]}
              style={S.sendGradient}
            >
              <IconSymbol name="arrow.up" size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 12,
  },
  avatarGradient: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: { fontSize: 18, fontFamily: "Satoshi-Regular" },
  headerTitle: { color: "#FFFFFF", fontSize: 15, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#4ADE80" },
  onlineText: { color: "#9BA1A6", fontSize: 12, fontFamily: "Satoshi-Regular" },
  itineraryBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 12 },
  msgRow: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  msgRowUser: { flexDirection: "row-reverse" },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  bubble: {
    maxWidth: width * 0.72,
    borderRadius: 18,
    padding: 12,
  },
  bubbleTravi: {
    backgroundColor: "rgba(100,67,244,0.15)",
    borderWidth: 0.5,
    borderColor: "rgba(100,67,244,0.3)",
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: "#6443F4",
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    color: "#E8E0F5",
    fontSize: 14, fontFamily: "Satoshi-Regular",
    lineHeight: 20,
  },
  bubbleTextUser: { color: "#FFFFFF" },
  bubbleTime: {
    color: "rgba(196,181,217,0.5)",
    fontSize: 10, fontFamily: "Satoshi-Regular",
    marginTop: 4,
    textAlign: "right",
  },
  bubbleTimeUser: { color: "rgba(255,255,255,0.6)" },
  typingDots: { flexDirection: "row", gap: 4, padding: 4 },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#6443F4",
  },
  suggestionsScroll: {
    maxHeight: 48,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.06)",
  },
  suggestionsContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    alignItems: "center",
  },
  suggestionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(100,67,244,0.15)",
    borderWidth: 0.5,
    borderColor: "rgba(100,67,244,0.4)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  suggestionIcon: { fontSize: 14, fontFamily: "Satoshi-Regular" },
  suggestionLabel: { color: "#C4B5D9", fontSize: 12, fontFamily: "Satoshi-Regular", fontWeight: "500" },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(13,6,40,0.95)",
  },
  inputWrap: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 44,
    justifyContent: "center",
  },
  input: {
    color: "#FFFFFF",
    fontSize: 15, fontFamily: "Satoshi-Regular",
    maxHeight: 100,
  },
  sendBtn: { marginBottom: 0 },
  sendBtnDisabled: { opacity: 0.4 },
  sendGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
