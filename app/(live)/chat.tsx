import { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, KeyboardAvoidingView, Platform, Dimensions
} from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ScreenContainer } from "@/components/screen-container";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

const QUICK_PROMPTS = [
  "Best restaurant nearby?",
  "What's the weather today?",
  "Translate 'thank you'",
  "Change tomorrow's plan",
  "Book a taxi",
  "Emergency contacts",
];

const TRAVI_RESPONSES: Record<string, { text: string; suggestions?: string[] }> = {
  default: {
    text: "I'm TRAVI, your AI travel agent! I can help you find restaurants, translate phrases, change your itinerary, book transportation, and much more. What do you need?",
    suggestions: ["Find food nearby", "Change my plan", "Translate something"],
  },
  restaurant: {
    text: "🍽️ Based on your location and taste profile, I recommend:\n\n1. **Le Comptoir du Relais** — Classic French bistro, 5 min walk. ~$45/person\n2. **Breizh Café** — Best crêpes in Paris, 8 min walk. ~$25/person\n3. **Septime** — Modern French, Michelin-starred. ~$120/person\n\nShall I book a table?",
    suggestions: ["Book Le Comptoir", "Book Septime", "Show more options"],
  },
  weather: {
    text: "⛅ Today in Paris: 22°C, partly cloudy. Perfect for outdoor sightseeing!\n\nTomorrow: 18°C with light rain in the afternoon. I'd suggest moving your outdoor activities to the morning.",
    suggestions: ["Update my itinerary", "What to pack?"],
  },
  translate: {
    text: "🌍 Common French phrases:\n\n• **Thank you** → Merci (mehr-see)\n• **Please** → S'il vous plaît (seel voo play)\n• **Excuse me** → Excusez-moi (ex-kyoo-zay mwa)\n• **Where is...?** → Où est...? (oo ay)\n• **How much?** → Combien? (com-bee-en)\n\nNeed more translations?",
    suggestions: ["More phrases", "Restaurant French", "Emergency phrases"],
  },
  taxi: {
    text: "🚕 I can help you get a taxi! Options:\n\n• **Uber** — 3 min away, ~€12\n• **G7 Taxi** — Local taxi, ~€15\n• **Bolt** — 5 min away, ~€10\n\nShall I open the Uber app for you?",
    suggestions: ["Open Uber", "Call G7 Taxi", "Walk directions instead"],
  },
};

function getTraviResponse(message: string): { text: string; suggestions?: string[] } {
  const lower = message.toLowerCase();
  if (lower.includes("restaurant") || lower.includes("food") || lower.includes("eat")) return TRAVI_RESPONSES.restaurant;
  if (lower.includes("weather") || lower.includes("rain") || lower.includes("temperature")) return TRAVI_RESPONSES.weather;
  if (lower.includes("translate") || lower.includes("french") || lower.includes("language")) return TRAVI_RESPONSES.translate;
  if (lower.includes("taxi") || lower.includes("uber") || lower.includes("transport")) return TRAVI_RESPONSES.taxi;
  return TRAVI_RESPONSES.default;
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <Image source={require("@/assets/images/icon.png")} style={styles.avatar} contentFit="contain" />
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
        <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>{message.text}</Text>
        <Text style={styles.timestamp}>
          {message.timestamp.getHours().toString().padStart(2, "0")}:{message.timestamp.getMinutes().toString().padStart(2, "0")}
        </Text>
        {message.suggestions && (
          <View style={styles.suggestions}>
            {message.suggestions.map((s, i) => (
              <TouchableOpacity key={i} style={styles.suggestionChip}>
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const { state } = useStore();
  const activeTrip = state.trips.find((t) => t.status === "active") || state.trips[0];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      text: `Hey ${state.profile?.name || "traveler"}! 👋 I'm TRAVI, your personal AI travel agent. You're in ${activeTrip?.destination || "your destination"} — how can I help you today?`,
      timestamp: new Date(),
      suggestions: ["Best restaurant nearby?", "What's the weather?", "Translate something"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getTraviResponse(messageText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: response.text,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  return (
    <ScreenContainer containerClassName="bg-background" edges={["top", "left", "right"]}>
      {/* Header */}
      <LinearGradient colors={["#2D1B69", "#1A0533"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.traviAvatar}>
            <Image source={require("@/assets/images/icon.png")} style={styles.traviAvatarImg} contentFit="contain" />
          </View>
          <View>
            <Text style={styles.headerTitle}>TRAVI Assistant</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online • AI-powered</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.clearBtn}>
          <IconSymbol name="trash" size={18} color="#A78BCA" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Quick Prompts */}
      <View style={styles.quickPromptsContainer}>
        <FlatList
          data={QUICK_PROMPTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.quickPromptChip}
              onPress={() => sendMessage(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.quickPromptText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          renderItem={({ item }) => <MessageBubble message={item} />}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.typingIndicator}>
                <View style={styles.avatarContainer}>
                  <Image source={require("@/assets/images/icon.png")} style={styles.avatar} contentFit="contain" />
                </View>
                <View style={styles.typingBubble}>
                  <Text style={styles.typingDots}>● ● ●</Text>
                </View>
              </View>
            ) : null
          }
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachBtn}>
              <IconSymbol name="camera.fill" size={20} color="#A78BCA" />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Ask TRAVI anything..."
              placeholderTextColor="#A78BCA"
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage()}
            />
            <TouchableOpacity
              style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
              onPress={() => sendMessage()}
              disabled={!input.trim()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={input.trim() ? ["#7B2FBE", "#E91E8C"] : ["#4A3080", "#4A3080"]}
                style={styles.sendGradient}
              >
                <IconSymbol name="paperplane.fill" size={18} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 12,
  },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerInfo: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  traviAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3D2580",
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#7B2FBE",
  },
  traviAvatarImg: { width: 40, height: 40 },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#4CAF50" },
  onlineText: { color: "#A78BCA", fontSize: 12 },
  clearBtn: { padding: 8 },
  quickPromptsContainer: { borderBottomWidth: 1, borderBottomColor: "#2D1B69" },
  quickPromptChip: {
    backgroundColor: "#2D1B69",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  quickPromptText: { color: "#A78BCA", fontSize: 13 },
  messagesList: { padding: 16, gap: 12, paddingBottom: 20 },
  messageRow: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  messageRowUser: { flexDirection: "row-reverse" },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3D2580",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#7B2FBE",
  },
  avatar: { width: 32, height: 32 },
  bubble: {
    maxWidth: width * 0.72,
    borderRadius: 18,
    padding: 12,
    gap: 4,
  },
  bubbleAssistant: {
    backgroundColor: "#2D1B69",
    borderWidth: 1,
    borderColor: "#4A3080",
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: "#7B2FBE",
    borderBottomRightRadius: 4,
  },
  bubbleText: { color: "#FFFFFF", fontSize: 15, lineHeight: 22 },
  bubbleTextUser: { color: "#FFFFFF" },
  timestamp: { color: "#6B5A8A", fontSize: 10, alignSelf: "flex-end" },
  suggestions: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  suggestionChip: {
    backgroundColor: "rgba(123,47,190,0.3)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#7B2FBE",
  },
  suggestionText: { color: "#A78BCA", fontSize: 12 },
  typingIndicator: { flexDirection: "row", alignItems: "flex-end", gap: 8, marginTop: 8 },
  typingBubble: {
    backgroundColor: "#2D1B69",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "#4A3080",
  },
  typingDots: { color: "#A78BCA", fontSize: 14, letterSpacing: 4 },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "#2D1B69",
    padding: 12,
    paddingBottom: Platform.OS === "ios" ? 28 : 12,
    backgroundColor: "#1A0533",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#2D1B69",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#4A3080",
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  attachBtn: { padding: 4, paddingBottom: 6 },
  textInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 6,
  },
  sendBtn: { borderRadius: 20, overflow: "hidden" },
  sendBtnDisabled: { opacity: 0.5 },
  sendGradient: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
});
