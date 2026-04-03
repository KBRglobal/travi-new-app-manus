// @ts-nocheck
import { useState, useRef, useEffect, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  TextInput, KeyboardAvoidingView, Platform, Image
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BRAND, TYPE, RADIUS } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";
import { connectSocket, disconnectSocket } from "@/lib/socket";

interface ChatMessage {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
  status?: "sent" | "delivered" | "read";
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: "1", fromMe: false, time: "10:32 AM", text: "Hey! I saw your DNA profile - we're both Explorers! Are you planning Tokyo in March?" },
  { id: "2", fromMe: true, time: "10:35 AM", status: "read", text: "Yes! I'm going March 15-30. Would be amazing to meet up there" },
  { id: "3", fromMe: false, time: "10:36 AM", text: "That's exactly my dates! I'm staying in Shinjuku. What about you?" },
  { id: "4", fromMe: true, time: "10:38 AM", status: "read", text: "Shibuya area. Super close! We should definitely explore together. I have a list of hidden ramen spots" },
  { id: "5", fromMe: false, time: "10:40 AM", text: "Omg yes please! Also found this amazing hidden shrine that's not on any tourist map" },
  { id: "6", fromMe: true, time: "10:42 AM", status: "delivered", text: "That sounds incredible. Let's plan a full day together!" },
];

function MessageBubble({ message }: { message: ChatMessage }) {
  return (
    <View style={[styles.bubbleRow, message.fromMe && styles.bubbleRowMe]}>
      {!message.fromMe && (
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" }}
          style={styles.bubbleAvatar}
        />
      )}
      <View style={[styles.bubble, message.fromMe ? styles.bubbleMe : styles.bubbleThem]}>
        {message.fromMe && (
          <LinearGradient
            colors={[BRAND.purple, BRAND.purpleDark]}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
        <Text style={[styles.bubbleText, message.fromMe && styles.bubbleTextMe]}>
          {message.text}
        </Text>
        <View style={styles.bubbleMeta}>
          <Text style={[styles.bubbleTime, message.fromMe && styles.bubbleTimeMe]}>
            {message.time}
          </Text>
          {message.fromMe && message.status === "read" && (
            <IconSymbol name="checkmark" size={10} color="rgba(255,255,255,0.7)" />
          )}
        </View>
      </View>
    </View>
  );
}

export default function MessageChatScreen() {
  const insets = useSafeAreaInsets();
  const { name = "Maya Rosen", partnerId } = useLocalSearchParams<{ name?: string; conversationId?: string; partnerId?: string }>();
  const { isAuthenticated, user } = useAuth({ autoFetch: false });
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isPartnerOnline, setIsPartnerOnline] = useState(false);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const listRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingEmitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // tRPC — real DB messages (when authenticated and partnerId provided)
  const numericPartnerId = partnerId ? Number(partnerId) : null;
  const { data: dbMessages, refetch: refetchMessages } = trpc.social.messages.useQuery(
    { partnerId: numericPartnerId! },
    { enabled: isAuthenticated && !!numericPartnerId }
  );
  const sendMessageMutation = trpc.social.sendMessage.useMutation({
    onSuccess: () => refetchMessages(),
  });

  // Convert DB messages to local format
  type DbMsg = NonNullable<typeof dbMessages>[number];
  const dbConverted: ChatMessage[] = (dbMessages ?? []).map((m: DbMsg) => ({
    id: String(m.id),
    fromMe: m.senderId !== numericPartnerId,
    text: m.content,
    time: new Date(m.createdAt ?? Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    status: "read" as const,
  }));
  const messages = isAuthenticated && numericPartnerId && dbMessages ? dbConverted : localMessages;

  // ─── Socket.IO: real-time messaging ────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated || !user?.id || !numericPartnerId) return;

    const socket = connectSocket(user.id);
    const room = `chat:${numericPartnerId}`;

    socket.emit("room:join", room);

    // Listen for incoming messages
    socket.on("message:received", (msg: { id: number; senderId: number; content: string; createdAt: string }) => {
      if (msg.senderId === numericPartnerId) {
        const newMsg: ChatMessage = {
          id: String(msg.id),
          fromMe: false,
          text: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "read",
        };
        setLocalMessages(prev => {
          // Avoid duplicates
          if (prev.some(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        // Also refetch to keep tRPC cache in sync
        refetchMessages();
      }
    });

    // Online / offline presence
    socket.on("user:online", (data: { userId: number }) => {
      if (data.userId === numericPartnerId) setIsPartnerOnline(true);
    });
    socket.on("user:offline", (data: { userId: number }) => {
      if (data.userId === numericPartnerId) setIsPartnerOnline(false);
    });

    // Typing indicator from partner
    socket.on("typing:start", (data: { userId: number }) => {
      if (data.userId === numericPartnerId) {
        setIsPartnerTyping(true);
        // Auto-clear after 3 seconds
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsPartnerTyping(false), 3000);
      }
    });

    return () => {
      socket.emit("room:leave", room);
      socket.off("message:received");
      socket.off("user:online");
      socket.off("user:offline");
      socket.off("typing:start");
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (typingEmitTimeoutRef.current) clearTimeout(typingEmitTimeoutRef.current);
      disconnectSocket();
    };
  }, [isAuthenticated, user?.id, numericPartnerId]);

  // ─── Typing indicator: emit on input change (debounced 500ms) ──────────────
  const emitTyping = useCallback(() => {
    if (!isAuthenticated || !user?.id || !numericPartnerId) return;
    if (typingEmitTimeoutRef.current) return; // already debounced

    const socket = connectSocket(user.id);
    socket.emit("typing:start", { room: `chat:${numericPartnerId}`, userId: user.id });

    typingEmitTimeoutRef.current = setTimeout(() => {
      typingEmitTimeoutRef.current = null;
    }, 500);
  }, [isAuthenticated, user?.id, numericPartnerId]);

  const handleInputChange = useCallback((text: string) => {
    setInputText(text);
    if (text.trim()) emitTyping();
  }, [emitTyping]);

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: false }), 200);
  }, [messages.length]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isAuthenticated && numericPartnerId) {
      // Dual-write: emit via socket AND persist via tRPC
      const socket = connectSocket(user!.id);
      socket.emit("message:send", {
        room: `chat:${numericPartnerId}`,
        receiverId: numericPartnerId,
        content: inputText.trim(),
      });
      await sendMessageMutation.mutateAsync({ receiverId: numericPartnerId, content: inputText.trim() });
    } else {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        fromMe: true,
        text: inputText.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      };
      setLocalMessages(prev => [...prev, newMsg]);
    }
    setInputText("");
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[BRAND.bgDeep, BRAND.bgOverlay]} style={StyleSheet.absoluteFillObject} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="chevron.left" size={24} color={BRAND.textPrimary} />
        </TouchableOpacity>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" }}
          style={styles.headerAvatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{name}</Text>
          <View style={styles.onlineRow}>
            <View style={[styles.onlineDot, !isPartnerOnline && styles.offlineDot]} />
            <Text style={[styles.onlineText, !isPartnerOnline && styles.offlineText]}>
              {isPartnerOnline ? "Online now" : "Offline"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => router.push({ pathname: "/(social)/compatibility", params: { travelerId: "1" } })}
        >
          <IconSymbol name="person.crop.circle.fill" size={22} color={BRAND.purple} />
        </TouchableOpacity>
      </View>
      <View style={styles.matchBanner}>
        <LinearGradient
          colors={[BRAND.purple + "20", BRAND.pink + "10"]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <IconSymbol name="star.fill" size={14} color={BRAND.gold} />
        <Text style={styles.matchBannerText}>94% DNA Match - Both Explorers</Text>
        <TouchableOpacity onPress={() => router.push({ pathname: "/(social)/compatibility", params: { travelerId: "1" } })}>
          <Text style={styles.matchBannerLink}>View</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
      />
      {isPartnerTyping && (
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>{name} is typing...</Text>
        </View>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Message..."
              placeholderTextColor={BRAND.textMuted}
              value={inputText}
              onChangeText={handleInputChange}
              multiline
              maxLength={500}
              returnKeyType="default"
            />
            <TouchableOpacity
              style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <LinearGradient
                colors={inputText.trim() ? BRAND.gradientPrimary : ["#333", "#333"]}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <IconSymbol name="paperplane.fill" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  header: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: BRAND.border },
  backBtn: { padding: 4 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: BRAND.bgCard },
  headerInfo: { flex: 1 },
  headerName: { ...TYPE.bodyMed, color: BRAND.textPrimary },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: BRAND.green },
  offlineDot: { backgroundColor: BRAND.textMuted },
  onlineText: { ...TYPE.caption, color: BRAND.green },
  offlineText: { color: BRAND.textMuted },
  profileBtn: { padding: 4 },
  matchBanner: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: BRAND.border, overflow: "hidden" },
  matchBannerText: { flex: 1, ...TYPE.caption, color: BRAND.textSecondary },
  matchBannerLink: { ...TYPE.label, color: BRAND.purple },
  messagesList: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  bubbleRow: { flexDirection: "row", alignItems: "flex-end", gap: 8, marginBottom: 8 },
  bubbleRowMe: { flexDirection: "row-reverse" },
  bubbleAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: BRAND.bgCard },
  bubble: { maxWidth: "75%", borderRadius: RADIUS.md, padding: 12, overflow: "hidden" },
  bubbleMe: { borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: "rgba(255,255,255,0.06)", borderBottomLeftRadius: 4, borderWidth: 1, borderColor: BRAND.border },
  bubbleText: { ...TYPE.body, color: BRAND.textSecondary },
  bubbleTextMe: { color: "#fff" },
  bubbleMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4, justifyContent: "flex-end" },
  bubbleTime: { ...TYPE.caption, color: BRAND.textMuted },
  bubbleTimeMe: { color: "rgba(255,255,255,0.6)" },
  inputContainer: { paddingHorizontal: 16, paddingTop: 10, borderTopWidth: 1, borderTopColor: BRAND.border, backgroundColor: BRAND.bgDeep },
  inputRow: { flexDirection: "row", alignItems: "flex-end", gap: 10 },
  input: { flex: 1, minHeight: 44, maxHeight: 120, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: RADIUS.md, paddingHorizontal: 14, paddingVertical: 10, ...TYPE.body, color: BRAND.textPrimary, borderWidth: 1, borderColor: BRAND.border },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  sendBtnDisabled: { opacity: 0.4 },
  typingContainer: { paddingHorizontal: 16, paddingVertical: 6 },
  typingText: { ...TYPE.caption, color: BRAND.textMuted, fontStyle: "italic" },
});
