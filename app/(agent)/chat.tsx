import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { trpc } from "@/lib/trpc";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: Date;
}

// ─── Quick Action Chips ───────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { id: "plan", label: "✈️  תכנן טיול", prompt: "אני רוצה לתכנן טיול חדש" },
  { id: "budget", label: "💰  טיפים לתקציב", prompt: "תן לי טיפים לטיול בתקציב" },
  { id: "visa", label: "🛂  מידע ויזה", prompt: "איזה ויזה אני צריך ליעד הבא שלי?" },
  { id: "pack", label: "🎒  רשימת אריזה", prompt: "עזור לי ליצור רשימת אריזה לטיול" },
  { id: "hotel", label: "🏨  מצא מלונות", prompt: "עזור לי למצוא את המלונות הטובים ביותר" },
  { id: "food", label: "🍜  אוכל מקומי", prompt: "איזה אוכל מקומי כדאי לנסות?" },
];

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.delay(600 - delay),
        ])
      ).start();

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, [dot1, dot2, dot3]);

  const dotStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) }],
  });

  return (
    <View style={styles.typingWrap}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>T</Text>
      </View>
      <View style={styles.typingBubble}>
        <Animated.View style={[styles.typingDot, dotStyle(dot1)]} />
        <Animated.View style={[styles.typingDot, dotStyle(dot2)]} />
        <Animated.View style={[styles.typingDot, dotStyle(dot3)]} />
      </View>
    </View>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <View style={styles.userRow}>
        <LinearGradient
          colors={["#9333EA", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userBubble}
        >
          <Text style={styles.userText}>{message.text}</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.agentRow}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>T</Text>
      </View>
      <View style={styles.agentBubble}>
        <Text style={styles.agentText}>{message.text}</Text>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function AgentChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      text: "שלום! אני TRAVI, הסוכן הנסיעות האישי שלך 🌍\n\nאני כאן כדי לעזור לך לתכנן את הטיול המושלם, למצוא עסקאות, לענות על שאלות ויזה, ועוד.\n\nמה תרצה לעשות היום?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const agentChatMutation = trpc.agent.chat.useMutation();

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        text: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setIsTyping(true);
      scrollToBottom();

      try {
        // Build conversation history for context (last 10 messages)
        const history = messages.slice(-10).map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        }));

        const result = await agentChatMutation.mutateAsync({
          message: trimmed,
          history,
        });

        const agentMsg: Message = {
          id: `agent-${Date.now()}`,
          role: "agent",
          text: result.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, agentMsg]);
      } catch {
        const errorMsg: Message = {
          id: `error-${Date.now()}`,
          role: "agent",
          text: "מצטער, נתקלתי בבעיה. נסה שוב בעוד רגע 🙏",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsTyping(false);
        scrollToBottom();
      }
    },
    [isTyping, messages, agentChatMutation, scrollToBottom]
  );

  const handleQuickAction = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
    },
    [sendMessage]
  );

  const showQuickActions = messages.length <= 1;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient
        colors={["#1A0533", "#0D0221"]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerAvatarWrap}>
            <LinearGradient
              colors={["#9333EA", "#7C3AED"]}
              style={styles.headerAvatar}
            >
              <Text style={styles.headerAvatarText}>T</Text>
            </LinearGradient>
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.headerName}>TRAVI Agent</Text>
            <Text style={styles.headerStatus}>
              {isTyping ? "מקליד..." : "מחובר • תמיד זמין"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.headerAction}
          onPress={() => {
            setMessages([
              {
                id: `welcome-${Date.now()}`,
                role: "agent",
                text: "שיחה חדשה! במה אוכל לעזור לך? 🌍",
                timestamp: new Date(),
              },
            ]);
          }}
        >
          <Text style={styles.headerActionText}>חדש</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={[
            styles.messageList,
            { paddingBottom: showQuickActions ? 180 : 100 },
          ]}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
          onContentSizeChange={scrollToBottom}
          showsVerticalScrollIndicator={false}
        />

        {/* Quick Actions */}
        {showQuickActions && (
          <View style={styles.quickActionsWrap}>
            <Text style={styles.quickActionsLabel}>פעולות מהירות</Text>
            <View style={styles.quickActionsRow}>
              {QUICK_ACTIONS.map((action) => (
                <Pressable
                  key={action.id}
                  style={({ pressed }) => [
                    styles.quickChip,
                    pressed && { opacity: 0.7, transform: [{ scale: 0.97 }] },
                  ]}
                  onPress={() => handleQuickAction(action.prompt)}
                >
                  <Text style={styles.quickChipText}>{action.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Input Bar */}
        <View
          style={[
            styles.inputBar,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="שאל אותי כל דבר על הטיול שלך..."
              placeholderTextColor="rgba(255,255,255,0.3)"
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage(inputText)}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                (!inputText.trim() || isTyping) && styles.sendBtnDisabled,
              ]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
            >
              {isTyping ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.sendIcon}>↑</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0118",
  },
  flex: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(147,51,234,0.25)",
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 22,
    color: "#C084FC",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 4,
  },
  headerAvatarWrap: {
    position: "relative",
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22C55E",
    borderWidth: 2,
    borderColor: "#0A0118",
  },
  headerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  headerStatus: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    marginTop: 1,
  },
  headerAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(147,51,234,0.2)",
    borderWidth: 0.5,
    borderColor: "rgba(147,51,234,0.4)",
  },
  headerActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C084FC",
  },
  // Messages
  messageList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  // User message
  userRow: {
    alignItems: "flex-end",
    marginBottom: 4,
  },
  userBubble: {
    maxWidth: "78%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomRightRadius: 4,
  },
  userText: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 22,
  },
  // Agent message
  agentRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 4,
  },
  agentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  agentAvatarText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
  },
  agentBubble: {
    maxWidth: "78%",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  agentText: {
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 22,
  },
  // Typing indicator
  typingWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#C084FC",
  },
  // Quick actions
  quickActionsWrap: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  quickActionsLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    marginBottom: 8,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  quickActionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(147,51,234,0.15)",
    borderWidth: 0.5,
    borderColor: "rgba(147,51,234,0.4)",
  },
  quickChipText: {
    fontSize: 13,
    color: "#C084FC",
    fontWeight: "500",
  },
  // Input bar
  inputBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "rgba(10,1,24,0.95)",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(147,51,234,0.2)",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: "rgba(147,51,234,0.3)",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
    maxHeight: 120,
    paddingVertical: 4,
    textAlign: "right",
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  sendBtnDisabled: {
    backgroundColor: "rgba(124,58,237,0.3)",
  },
  sendIcon: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});
