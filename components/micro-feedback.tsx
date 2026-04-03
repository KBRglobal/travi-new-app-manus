/**
 * TRAVI — Micro-Feedback During Trip
 * Design Bible v3.0 — Part 11 (Live Mode)
 *
 * Small contextual feedback prompts that appear during an active trip.
 * Examples:
 *   - "How was Le Comptoir du Relais?" (after visiting a saved restaurant)
 *   - "Rate your hotel check-in" (after check-in time)
 *   - "How's the weather today?" (morning prompt)
 *
 * Design:
 *   - Bottom sheet style, 120px tall
 *   - Glassmorphism card with purple glow
 *   - 5 emoji reaction buttons (😍 😊 😐 😕 😤)
 *   - Auto-dismiss after 8s
 *   - Haptic on tap
 */

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { track } from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FeedbackContext =
  | "restaurant"
  | "hotel"
  | "attraction"
  | "weather"
  | "transport"
  | "general";

export interface MicroFeedbackProps {
  visible: boolean;
  context: FeedbackContext;
  itemName?: string;
  onDismiss?: () => void;
  onRate?: (rating: 1 | 2 | 3 | 4 | 5) => void;
}

const CONTEXT_PROMPTS: Record<FeedbackContext, string> = {
  restaurant: "How was the food?",
  hotel: "How's your hotel?",
  attraction: "Worth the visit?",
  weather: "How's the weather today?",
  transport: "How was getting around?",
  general: "How's your trip going?",
};

const REACTIONS: { emoji: string; label: string; rating: 1 | 2 | 3 | 4 | 5 }[] = [
  { emoji: "😍", label: "Amazing", rating: 5 },
  { emoji: "😊", label: "Good", rating: 4 },
  { emoji: "😐", label: "OK", rating: 3 },
  { emoji: "😕", label: "Meh", rating: 2 },
  { emoji: "😤", label: "Bad", rating: 1 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function MicroFeedback({
  visible,
  context,
  itemName,
  onDismiss,
  onRate,
}: MicroFeedbackProps) {
  const slideAnim = useRef(new Animated.Value(200)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (visible) {
      setSelectedRating(null);
      animateIn();
      autoTimer.current = setTimeout(() => dismiss(), 8000);
    } else {
      animateOut();
    }
    return () => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, [visible]);

  const animateIn = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = () => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 200,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss?.());
  };

  const dismiss = () => {
    animateOut();
  };

  const handleRate = (reaction: typeof REACTIONS[0]) => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setSelectedRating(reaction.rating);
    track("ai_suggestion_accept", {
      context,
      item_name: itemName,
      rating: reaction.rating,
      emoji: reaction.emoji,
    });
    onRate?.(reaction.rating);
    // Auto-dismiss after selection
    setTimeout(() => dismiss(), 800);
  };

  if (!visible) return null;

  const prompt = itemName
    ? `How was ${itemName}?`
    : CONTEXT_PROMPTS[context];

  return (
    <Animated.View
      style={[
        s.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <LinearGradient
        colors={["rgba(36,16,62,0.96)", "rgba(26,11,46,0.98)"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Glow border */}
      <View style={s.glowBorder} />

      <View style={s.content}>
        {/* Prompt */}
        <View style={s.promptRow}>
          <Text style={s.promptText}>{prompt}</Text>
          <TouchableOpacity style={s.dismissBtn} onPress={dismiss} activeOpacity={0.7}>
            <Text style={s.dismissText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Reactions */}
        <View style={s.reactions}>
          {REACTIONS.map((r) => (
            <TouchableOpacity
              key={r.rating}
              style={[
                s.reactionBtn,
                selectedRating === r.rating && s.reactionBtnSelected,
              ]}
              onPress={() => handleRate(r)}
              activeOpacity={0.75}
            >
              <Text style={s.reactionEmoji}>{r.emoji}</Text>
              <Text style={s.reactionLabel}>{r.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Hook for easy usage ──────────────────────────────────────────────────────

export function useMicroFeedback() {
  const [state, setState] = useState<{
    visible: boolean;
    context: FeedbackContext;
    itemName?: string;
  }>({ visible: false, context: "general" });

  const show = (context: FeedbackContext, itemName?: string) => {
    setState({ visible: true, context, itemName });
  };

  const hide = () => {
    setState((s) => ({ ...s, visible: false }));
  };

  return { feedbackState: state, showFeedback: show, hideFeedback: hide };
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 90,
    left: 16,
    right: 16,
    borderRadius: 20,
    overflow: "hidden",
    zIndex: 100,
  },
  glowBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.35)",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  promptRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promptText: {
    fontSize: 15,
    fontFamily: "Satoshi-Bold",
    color: "#FFFFFF",
    flex: 1,
  },
  dismissBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  dismissText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  reactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  reactionBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 2,
  },
  reactionBtnSelected: {
    backgroundColor: "rgba(100,67,244,0.25)",
    borderColor: "#6443F4",
  },
  reactionEmoji: {
    fontSize: 22,
  },
  reactionLabel: {
    fontSize: 9,
    fontFamily: "Satoshi-Regular",
    color: "rgba(255,255,255,0.5)",
  },
});
