import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

interface OfflineBannerProps {
  /** Called when user taps "View Cached Itinerary" */
  onViewCached?: () => void;
  /** Show the cached itinerary CTA button */
  showCachedCta?: boolean;
}

/**
 * OfflineBanner — shows a dismissible banner when the device is offline.
 * Also shows a "Cached" badge when online to indicate offline access is available.
 */
export function OfflineBanner({ onViewCached, showCachedCta = false }: OfflineBannerProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const slideAnim = useRef(new Animated.Value(-80)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const online = state.isConnected ?? true;
      if (!online && isOnline) {
        // Just went offline
        setIsOnline(false);
        setDismissed(false);
        Animated.parallel([
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }),
          Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
        if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } else if (online && !isOnline) {
        // Back online
        setIsOnline(true);
        Animated.parallel([
          Animated.timing(slideAnim, { toValue: -80, duration: 300, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
      }
    });
    return () => unsubscribe();
  }, [isOnline]);

  const handleDismiss = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -80, duration: 250, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => setDismissed(true));
  };

  if (isOnline || dismissed) return null;

  return (
    <Animated.View style={[S.banner, { transform: [{ translateY: slideAnim }], opacity: opacityAnim }]}>
      <LinearGradient colors={["#1A0A3D", "#0D0628"]} style={StyleSheet.absoluteFillObject} />
      <View style={S.bannerBorder} />
      <View style={S.bannerContent}>
        <View style={S.bannerLeft}>
          <View style={S.offlineIcon}>
            <Text style={{ fontSize: 16 }}>📡</Text>
          </View>
          <View>
            <Text style={S.bannerTitle}>You're offline</Text>
            <Text style={S.bannerSub}>Your saved itinerary is still available</Text>
          </View>
        </View>
        <View style={S.bannerRight}>
          {showCachedCta && onViewCached && (
            <TouchableOpacity style={S.cachedBtn} onPress={onViewCached} activeOpacity={0.8}>
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <Text style={S.cachedBtnText}>View</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={S.dismissBtn} onPress={handleDismiss} activeOpacity={0.8}>
            <IconSymbol name="xmark" size={12} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

/**
 * CachedBadge — small inline badge showing itinerary is cached for offline use.
 */
export function CachedBadge() {
  return (
    <View style={S.cachedBadge}>
      <View style={S.cachedDot} />
      <Text style={S.cachedBadgeText}>Available offline</Text>
    </View>
  );
}

const S = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    overflow: "hidden",
  },
  bannerBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(249,68,152,0.3)",
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50, // account for status bar
  },
  bannerLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  offlineIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(249,68,152,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(249,68,152,0.3)" },
  bannerTitle: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  bannerSub: { color: "#9BA1A6", fontSize: 12, marginTop: 1 },
  bannerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  cachedBtn: { borderRadius: 10, overflow: "hidden", paddingHorizontal: 14, paddingVertical: 7 },
  cachedBtnText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  dismissBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },

  cachedBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(34,197,94,0.1)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(34,197,94,0.25)" },
  cachedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#22C55E" },
  cachedBadgeText: { color: "#22C55E", fontSize: 11, fontWeight: "700" },
});
