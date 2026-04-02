import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, type ViewStyle } from "react-native";

// ─── Single Shimmer Block ─────────────────────────────────────────────────────
interface SkeletonBlockProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function SkeletonBlock({ width = "100%", height = 16, borderRadius = 8, style }: SkeletonBlockProps) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
    return () => shimmer.stopAnimation();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.55] });

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor: "rgba(255,255,255,0.15)" },
        { opacity },
        style,
      ]}
    />
  );
}

// ─── Destination Card Skeleton ────────────────────────────────────────────────
export function DestinationCardSkeleton() {
  return (
    <View style={SK.destCard}>
      <SkeletonBlock height={180} borderRadius={20} />
      <View style={{ padding: 14, gap: 8 }}>
        <SkeletonBlock width="60%" height={18} />
        <SkeletonBlock width="40%" height={13} />
        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
          <SkeletonBlock width={60} height={24} borderRadius={12} />
          <SkeletonBlock width={60} height={24} borderRadius={12} />
        </View>
      </View>
    </View>
  );
}

// ─── Activity Row Skeleton ────────────────────────────────────────────────────
export function ActivityRowSkeleton() {
  return (
    <View style={SK.activityRow}>
      <SkeletonBlock width={52} height={52} borderRadius={14} />
      <View style={{ flex: 1, gap: 6 }}>
        <SkeletonBlock width="70%" height={15} />
        <SkeletonBlock width="45%" height={12} />
      </View>
      <SkeletonBlock width={60} height={30} borderRadius={10} />
    </View>
  );
}

// ─── Trip Card Skeleton ───────────────────────────────────────────────────────
export function TripCardSkeleton() {
  return (
    <View style={SK.tripCard}>
      <SkeletonBlock height={120} borderRadius={16} />
      <View style={{ padding: 12, gap: 8 }}>
        <SkeletonBlock width="55%" height={16} />
        <SkeletonBlock width="35%" height={12} />
        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
          <SkeletonBlock width={80} height={28} borderRadius={10} />
          <SkeletonBlock width={80} height={28} borderRadius={10} />
        </View>
      </View>
    </View>
  );
}

// ─── Profile Skeleton ─────────────────────────────────────────────────────────
export function ProfileSkeleton() {
  return (
    <View style={{ gap: 16, padding: 20 }}>
      <View style={{ alignItems: "center", gap: 10 }}>
        <SkeletonBlock width={80} height={80} borderRadius={40} />
        <SkeletonBlock width="40%" height={20} />
        <SkeletonBlock width="60%" height={14} />
      </View>
      <SkeletonBlock height={80} borderRadius={16} />
      <SkeletonBlock height={120} borderRadius={16} />
    </View>
  );
}

// ─── Full Page Skeleton ───────────────────────────────────────────────────────
export function PageSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <View style={{ gap: 12, padding: 16 }}>
      <SkeletonBlock width="50%" height={24} />
      <SkeletonBlock width="80%" height={14} />
      {Array.from({ length: rows }).map((_, i) => (
        <ActivityRowSkeleton key={i} />
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const SK = StyleSheet.create({
  destCard: { borderRadius: 20, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  activityRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10 },
  tripCard: { borderRadius: 16, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
});
