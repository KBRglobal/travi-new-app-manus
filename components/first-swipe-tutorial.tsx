/**
 * TRAVI — First Swipe Tutorial Overlay
 * Design Bible v3.0 — Part 2 (First-Time User Experience)
 *
 * Shows on first visit to the Swipe/DNA screen.
 * Persisted via AsyncStorage — shown only once.
 *
 * Spec:
 *   - Semi-transparent overlay: rgba(13,6,40,0.92)
 *   - Animated hand icon with swipe gesture
 *   - 3 tutorial steps: Swipe Right (Love), Swipe Left (Skip), Swipe Up (Save)
 *   - CTA: "Got it!" gradient button
 *   - Auto-dismiss after 8s
 */

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width: W, height: H } = Dimensions.get("window");
const STORAGE_KEY = "@travi_swipe_tutorial_shown";

interface FirstSwipeTutorialProps {
  onDismiss?: () => void;
}

const STEPS = [
  {
    icon: "👉",
    direction: "Swipe Right",
    description: "Love this destination",
    color: "#02A65C",
    gradient: ["rgba(2,166,92,0.20)", "rgba(2,166,92,0.05)"] as const,
  },
  {
    icon: "👈",
    direction: "Swipe Left",
    description: "Not your vibe",
    color: "#F94498",
    gradient: ["rgba(249,68,152,0.20)", "rgba(249,68,152,0.05)"] as const,
  },
  {
    icon: "👆",
    direction: "Swipe Up",
    description: "Save for later",
    color: "#6443F4",
    gradient: ["rgba(100,67,244,0.20)", "rgba(100,67,244,0.05)"] as const,
  },
];

export function FirstSwipeTutorial({ onDismiss }: FirstSwipeTutorialProps) {
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const autoTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    checkIfShouldShow();
    return () => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, []);

  const checkIfShouldShow = async () => {
    try {
      const shown = await AsyncStorage.getItem(STORAGE_KEY);
      if (!shown) {
        setVisible(true);
        animateIn();
        // Auto-dismiss after 10s
        autoTimer.current = setTimeout(() => dismiss(), 10000);
      }
    } catch {
      // Fail silently
    }
  };

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate hand gesture
    Animated.loop(
      Animated.sequence([
        Animated.timing(handAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(handAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const dismiss = async () => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onDismiss?.();
    });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Fail silently
    }
  };

  const handleGotIt = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    dismiss();
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } else {
      handleGotIt();
    }
  };

  if (!visible) return null;

  const step = STEPS[currentStep];
  const handTranslateX = handAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, currentStep === 0 ? 30 : currentStep === 1 ? -30 : 0],
  });
  const handTranslateY = handAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, currentStep === 2 ? -30 : 0],
  });

  return (
    <Animated.View style={[s.overlay, { opacity: fadeAnim }]}>
      <Animated.View
        style={[s.card, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Background gradient */}
        <LinearGradient
          colors={["#1A0B2E", "#24103E"]}
          style={StyleSheet.absoluteFillObject}
        />
        {/* Border glow */}
        <View style={s.glowBorder} />

        {/* Header */}
        <View style={s.header}>
          <Text style={s.title}>How to Swipe</Text>
          <Text style={s.subtitle}>Discover your perfect destinations</Text>
        </View>

        {/* Step indicator */}
        <View style={s.stepDots}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[
                s.dot,
                i === currentStep && s.dotActive,
                i < currentStep && s.dotDone,
              ]}
            />
          ))}
        </View>

        {/* Current step */}
        <View style={s.stepContainer}>
          <LinearGradient
            colors={step.gradient}
            style={s.stepGradient}
          />

          {/* Animated hand */}
          <Animated.Text
            style={[
              s.handIcon,
              {
                transform: [
                  { translateX: handTranslateX },
                  { translateY: handTranslateY },
                ],
              },
            ]}
          >
            {step.icon}
          </Animated.Text>

          <View style={s.stepInfo}>
            <Text style={[s.stepDirection, { color: step.color }]}>
              {step.direction}
            </Text>
            <Text style={s.stepDescription}>{step.description}</Text>
          </View>
        </View>

        {/* Navigation */}
        <View style={s.actions}>
          {currentStep < STEPS.length - 1 ? (
            <>
              <TouchableOpacity
                style={s.skipBtn}
                onPress={handleGotIt}
                activeOpacity={0.7}
              >
                <Text style={s.skipText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.nextBtn}
                onPress={handleNextStep}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#6443F4", "#F94498"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={s.nextGradient}
                >
                  <Text style={s.nextText}>Next →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={s.gotItBtn}
              onPress={handleGotIt}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#6443F4", "#C2185B", "#F94498"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={s.gotItGradient}
              >
                <Text style={s.gotItText}>Got it! Let's go 🚀</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13,6,40,0.92)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },
  card: {
    width: W * 0.88,
    borderRadius: 28,
    overflow: "hidden",
    padding: 28,
  },
  glowBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.4)",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Chillax-Bold",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    color: "rgba(255,255,255,0.55)",
    textAlign: "center",
  },
  stepDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  dotActive: {
    width: 20,
    backgroundColor: "#6443F4",
  },
  dotDone: {
    backgroundColor: "#F94498",
  },
  stepContainer: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 24,
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  stepGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  handIcon: {
    fontSize: 56,
  },
  stepInfo: {
    alignItems: "center",
    gap: 6,
  },
  stepDirection: {
    fontSize: 20,
    fontFamily: "Chillax-Bold",
    letterSpacing: -0.3,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    color: "rgba(255,255,255,0.65)",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  skipBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  skipText: {
    fontSize: 15,
    fontFamily: "Satoshi-Medium",
    color: "rgba(255,255,255,0.55)",
  },
  nextBtn: {
    flex: 2,
    borderRadius: 14,
    overflow: "hidden",
  },
  nextGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },
  nextText: {
    fontSize: 15,
    fontFamily: "Satoshi-Bold",
    color: "#FFFFFF",
  },
  gotItBtn: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  gotItGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  gotItText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
});
