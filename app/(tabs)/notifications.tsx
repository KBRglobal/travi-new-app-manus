// @ts-nocheck
import { useRef, useState, useCallback, useMemo } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
  FlatList, StatusBar, Platform
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import { BRAND, TYPE, LOGOS, RADIUS, SPACING } from "@/constants/brand";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";
import { SkeletonBlock } from "@/components/skeleton-loader";

// ─── Types ────────────────────────────────────────────────────────────────────
type NotifType = "price_drop" | "trip_reminder" | "friend_joined" | "points" | "tip" | "booking";

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  meta?: {
    destination?: string;
    drop?: string;
    amount?: number;
    avatar?: string;
    name?: string;
    daysLeft?: number;
    image?: string;
  };
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_NOTIFS: Notif[] = [
  {
    id: "1", type: "price_drop", read: false, time: "2m ago",
    title: "Price Drop Alert 🔥",
    body: "Barcelona flights dropped 31% — now from $289",
    meta: { destination: "Barcelona", drop: "-31%", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200" },
  },
  {
    id: "2", type: "trip_reminder", read: false, time: "1h ago",
    title: "Tokyo in 3 days!",
    body: "Your adventure starts soon. Check your itinerary and pack your bags.",
    meta: { destination: "Tokyo", daysLeft: 3, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200" },
  },
  {
    id: "3", type: "points", read: false, time: "3h ago",
    title: "+500 TRAVI Points",
    body: "You earned 500 points for referring Maya R. to TRAVI!",
    meta: { amount: 500 },
  },
  {
    id: "4", type: "friend_joined", read: true, time: "Yesterday",
    title: "Sarah joined your trip!",
    body: "Sarah accepted your invite to the Bali trip. Time to plan together!",
    meta: { name: "Sarah", avatar: "S" },
  },
  {
    id: "5", type: "price_drop", read: true, time: "Yesterday",
    title: "Amsterdam deal ending soon",
    body: "Flights from TLV → AMS are $342 — 18% below average. Expires in 6h.",
    meta: { destination: "Amsterdam", drop: "-18%", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=200" },
  },
  {
    id: "6", type: "booking", read: true, time: "2 days ago",
    title: "Booking Confirmed ✅",
    body: "Your Paris trip is confirmed. Flight EK 123 + Le Bristol Hotel.",
    meta: { destination: "Paris" },
  },
  {
    id: "7", type: "tip", read: true, time: "3 days ago",
    title: "TRAVI Tip for Kyoto",
    body: "Visit Fushimi Inari at 5am to beat the crowds. Trust us — it's magical.",
    meta: { destination: "Kyoto" },
  },
  {
    id: "8", type: "points", read: true, time: "4 days ago",
    title: "+250 Welcome Points",
    body: "Welcome to TRAVI! You've earned 250 points for completing your profile.",
    meta: { amount: 250 },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getNotifStyle(type: NotifType) {
  switch (type) {
    case "price_drop":    return { icon: "tag.fill" as const,             color: "#F94498", bg: "rgba(249,68,152,0.15)" };
    case "trip_reminder": return { icon: "airplane" as const,             color: "#6443F4", bg: "rgba(100,67,244,0.15)" };
    case "friend_joined": return { icon: "person.badge.plus" as const,    color: "#02A65C", bg: "rgba(2,166,92,0.15)" };
    case "points":        return { icon: "star.fill" as const,            color: "#FFD112", bg: "rgba(255,209,18,0.15)" };
    case "tip":           return { icon: "lightbulb.fill" as const,       color: "#01BEFF", bg: "rgba(1,190,255,0.15)" };
    case "booking":       return { icon: "checkmark.seal.fill" as const,  color: "#02A65C", bg: "rgba(2,166,92,0.15)" };
  }
}

// ─── Notification Card ────────────────────────────────────────────────────────
function NotifCard({ item, onPress, onDismiss }: { item: Notif; onPress: () => void; onDismiss: () => void }) {
  const style = getNotifStyle(item.type);
  const slideX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handleDismiss = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.parallel([
      Animated.timing(slideX, { toValue: 400, duration: 280, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 280, useNativeDriver: true }),
    ]).start(onDismiss);
  };

  return (
    <Animated.View style={[S.notifWrap, { transform: [{ translateX: slideX }], opacity }]}>
      <TouchableOpacity style={S.notifCard} onPress={onPress} activeOpacity={0.85}>
        {/* Unread indicator */}
        {!item.read && <View style={S.unreadBar} />}

        {/* Glass background */}
        <LinearGradient
          colors={item.read
            ? ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"]
            : ["rgba(100,67,244,0.12)", "rgba(249,68,152,0.06)"]}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={S.notifRow}>
          {/* Icon or Image */}
          {item.meta?.image ? (
            <View style={[S.notifImgWrap, { borderColor: style.color + "40" }]}>
              <Image source={{ uri: item.meta.image }} style={S.notifImg} resizeMode="cover" />
              <View style={[S.notifImgBadge, { backgroundColor: style.bg }]}>
                <IconSymbol name={style.icon} size={10} color={style.color} />
              </View>
            </View>
          ) : item.meta?.avatar ? (
            <View style={[S.notifAvatar, { backgroundColor: style.bg, borderColor: style.color + "40" }]}>
              <Text style={[S.notifAvatarText, { color: style.color }]}>{item.meta.avatar}</Text>
            </View>
          ) : (
            <View style={[S.notifIconWrap, { backgroundColor: style.bg, borderColor: style.color + "30" }]}>
              <IconSymbol name={style.icon} size={20} color={style.color} />
            </View>
          )}

          {/* Content */}
          <View style={S.notifContent}>
            <View style={S.notifTitleRow}>
              <Text style={[S.notifTitle, !item.read && S.notifTitleUnread]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={S.notifTime}>{item.time}</Text>
            </View>
            <Text style={S.notifBody} numberOfLines={2}>{item.body}</Text>

            {/* CTA for price drops */}
            {item.type === "price_drop" && (
              <View style={S.notifCta}>
                <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={S.notifCtaGradient}>
                  <Text style={S.notifCtaText}>Book Now {item.meta?.drop}</Text>
                </LinearGradient>
              </View>
            )}

            {/* Points badge */}
            {item.type === "points" && item.meta?.amount && (
              <View style={S.pointsBadge}>
                <IconSymbol name="star.fill" size={11} color="#FFD112" />
                <Text style={S.pointsBadgeText}>+{item.meta.amount} pts</Text>
              </View>
            )}
          </View>

          {/* Dismiss */}
          <TouchableOpacity style={S.dismissBtn} onPress={handleDismiss} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <IconSymbol name="xmark" size={12} color="rgba(255,255,255,0.06)" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Notification Skeleton ────────────────────────────────────────────────────
function NotifSkeleton() {
  return (
    <View style={S.notifWrap}>
      <View style={[S.notifCard, { borderColor: "rgba(255,255,255,0.12)" }]}>
        <View style={S.notifRow}>
          <SkeletonBlock width={52} height={52} borderRadius={14} />
          <View style={{ flex: 1, gap: 6 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <SkeletonBlock width="60%" height={15} />
              <SkeletonBlock width={40} height={12} />
            </View>
            <SkeletonBlock width="80%" height={12} />
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Helpers: derive notifications from real data ─────────────────────────────
function timeAgo(dateStr: string | Date | null | undefined): string {
  if (!dateStr) return "Recently";
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useStore();
  const { isAuthenticated } = useAuth({ autoFetch: false });

  // Fetch real data from backend
  const { data: priceAlerts, isLoading: loadingAlerts } = trpc.priceAlerts.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: tripsList, isLoading: loadingTrips } = trpc.trips.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: connections, isLoading: loadingConnections } = trpc.social.connections.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const isLoading = isAuthenticated && (loadingAlerts || loadingTrips || loadingConnections);
  const hasRealData = isAuthenticated && (priceAlerts || tripsList || connections);

  // Derive notifications from real data
  const realNotifs = useMemo<Notif[]>(() => {
    if (!hasRealData) return [];

    const derived: Notif[] = [];

    // Price alert notifications
    type DbPriceAlert = NonNullable<typeof priceAlerts>[number];
    (priceAlerts ?? []).forEach((alert: DbPriceAlert) => {
      derived.push({
        id: `pa-${alert.id}`,
        type: "price_drop",
        read: false,
        time: timeAgo(alert.createdAt),
        title: `Price Alert: ${alert.destination}`,
        body: `${alert.type === "flight" ? "Flights" : alert.type === "hotel" ? "Hotels" : "Packages"} to ${alert.destination} — target $${alert.targetPrice}${alert.currentPrice ? `, now $${alert.currentPrice}` : ""}`,
        meta: {
          destination: alert.destination,
          drop: alert.currentPrice && alert.targetPrice
            ? `-${Math.round(((alert.targetPrice - (alert.currentPrice ?? alert.targetPrice)) / alert.targetPrice) * 100)}%`
            : undefined,
        },
      });
    });

    // Trip reminder notifications
    type DbTrip = NonNullable<typeof tripsList>[number];
    (tripsList ?? []).forEach((trip: DbTrip) => {
      if (!trip.startDate) return;
      const start = new Date(trip.startDate);
      const now = new Date();
      const daysUntil = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (daysUntil > 0 && daysUntil <= 14) {
        derived.push({
          id: `trip-${trip.id}`,
          type: "trip_reminder",
          read: daysUntil > 7,
          time: timeAgo(trip.createdAt),
          title: `${trip.destination} in ${daysUntil} day${daysUntil !== 1 ? "s" : ""}!`,
          body: `Your ${trip.destination}${trip.country ? `, ${trip.country}` : ""} trip starts soon. Check your itinerary and pack your bags.`,
          meta: { destination: trip.destination, daysLeft: daysUntil },
        });
      } else if (trip.status === "completed") {
        derived.push({
          id: `trip-done-${trip.id}`,
          type: "booking",
          read: true,
          time: timeAgo(trip.updatedAt ?? trip.createdAt),
          title: `${trip.destination} Trip Completed`,
          body: `Your trip to ${trip.destination} is complete. Don't forget to leave a reflection!`,
          meta: { destination: trip.destination },
        });
      }
    });

    // Social connection notifications
    type DbConnection = NonNullable<typeof connections>[number];
    (connections ?? []).forEach((conn: DbConnection) => {
      if (conn.status === "pending") {
        derived.push({
          id: `conn-${conn.id}`,
          type: "friend_joined",
          read: false,
          time: timeAgo(conn.createdAt),
          title: "New Travel Connection",
          body: `You have a pending travel buddy connection request${conn.compatibilityScore ? ` (${conn.compatibilityScore}% match)` : ""}.`,
          meta: { name: "Traveler", avatar: "T" },
        });
      } else if (conn.status === "accepted") {
        derived.push({
          id: `conn-${conn.id}`,
          type: "friend_joined",
          read: true,
          time: timeAgo(conn.updatedAt ?? conn.createdAt),
          title: "Connection Accepted!",
          body: "A travel buddy accepted your connection. Start planning together!",
          meta: { name: "Traveler", avatar: "T" },
        });
      }
    });

    return derived;
  }, [priceAlerts, tripsList, connections, hasRealData]);

  // Local state for dismiss/read operations, seeded with mock data
  const [notifs, setNotifs] = useState<Notif[]>(MOCK_NOTIFS);

  // Sync real data into local state when it arrives (for dismiss/read operations)
  const [syncKey, setSyncKey] = useState("");
  const currentKey = realNotifs.map((n) => n.id).join(",");
  if (hasRealData && realNotifs.length > 0 && currentKey !== syncKey) {
    setNotifs(realNotifs);
    setSyncKey(currentKey);
  }

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifs.filter((n) => !n.read).length;
  const filtered = filter === "unread" ? notifs.filter((n) => !n.read) : notifs;

  // Group by time
  const today = filtered.filter((n) => n.time.includes("m ago") || n.time.includes("h ago"));
  const yesterday = filtered.filter((n) => n.time === "Yesterday");
  const earlier = filtered.filter((n) => !n.time.includes("m ago") && !n.time.includes("h ago") && n.time !== "Yesterday");

  const markAllRead = useCallback(() => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismissNotif = useCallback((id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }, []);

  const renderSection = (title: string, items: Notif[]) => {
    if (items.length === 0) return null;
    return (
      <View>
        <Text style={S.sectionLabel}>{title}</Text>
        {items.map((item) => (
          <NotifCard
            key={item.id}
            item={item}
            onPress={() => markRead(item.id)}
            onDismiss={() => dismissNotif(item.id)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#24103E", "#1A0A30", "#1A0A3D"]} style={StyleSheet.absoluteFillObject} />

      {/* Ambient orbs */}
      <View style={S.orb1} />
      <View style={S.orb2} />

      {/* Header */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <View style={S.backBtnInner}>
            <IconSymbol name="chevron.left" size={20} color="#1A0B2E" />
          </View>
        </TouchableOpacity>

        <View style={S.headerCenter}>
          <Text style={S.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={S.unreadBadge}>
              <Text style={S.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {unreadCount > 0 && (
          <TouchableOpacity style={S.markAllBtn} onPress={markAllRead} activeOpacity={0.7}>
            <Text style={S.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter tabs */}
      <View style={S.filterRow}>
        {(["all", "unread"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[S.filterTab, filter === f && S.filterTabActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setFilter(f);
            }}
            activeOpacity={0.8}
          >
            {filter === f && (
              <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
            )}
            <Text style={[S.filterTabText, filter === f && S.filterTabTextActive]}>
              {f === "all" ? "All" : `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications list */}
      {isLoading ? (
        <View style={{ paddingHorizontal: 16, paddingTop: 8, gap: 4 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <NotifSkeleton key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          data={[1]}
          keyExtractor={() => "list"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 130, paddingHorizontal: 16 }}
          renderItem={() => (
            <View>
              {renderSection("Today", today)}
              {renderSection("Yesterday", yesterday)}
              {renderSection("Earlier", earlier)}
              {filtered.length === 0 && (
                <View style={S.emptyState}>
                  <View style={S.emptyIconWrap}>
                    <LinearGradient colors={["rgba(100,67,244,0.2)", "rgba(249,68,152,0.1)"]} style={StyleSheet.absoluteFillObject} />
                    <Image source={LOGOS.mascotDark} style={S.emptyMascot} resizeMode="contain" />
                  </View>
                  <Text style={S.emptyTitle}>All caught up!</Text>
                  <Text style={S.emptyBody}>No {filter === "unread" ? "unread " : ""}notifications right now. We'll let you know when something exciting happens.</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRAND.bgDeep },
  orb1: { position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: "rgba(100,67,244,0.12)" },
  orb2: { position: "absolute", bottom: 200, left: -80, width: 180, height: 180, borderRadius: 90, backgroundColor: "rgba(249,68,152,0.08)" },

  // Header
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, paddingTop: 4 },
  backBtn: { marginRight: 8 },
  backBtnInner: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { ...TYPE.h2, color: BRAND.textPrimary },
  unreadBadge: { backgroundColor: BRAND.pink, borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 },
  unreadBadgeText: { ...TYPE.caption, color: "#1A0B2E", fontFamily: "Satoshi-Bold" },
  markAllBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full, backgroundColor: "rgba(100,67,244,0.15)", borderWidth: 1, borderColor: "rgba(100,67,244,0.3)" },
  markAllText: { ...TYPE.caption, color: BRAND.purpleLight },

  // Filter
  filterRow: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 16, gap: 8 },
  filterTab: { overflow: "hidden", borderRadius: RADIUS.full, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  filterTabActive: { borderColor: "transparent" },
  filterTabText: { ...TYPE.label, color: BRAND.textSecondary },
  filterTabTextActive: { color: "#1A0B2E" },

  // Section
  sectionLabel: { ...TYPE.caption, color: BRAND.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, marginTop: 4 },

  // Notif card
  notifWrap: { marginBottom: 10 },
  notifCard: { overflow: "hidden", borderRadius: RADIUS.xl, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  unreadBar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundColor: BRAND.purple, zIndex: 1 },
  notifRow: { flexDirection: "row", alignItems: "flex-start", padding: 14, gap: 12 },

  notifImgWrap: { width: 52, height: 52, borderRadius: RADIUS.md, overflow: "hidden", borderWidth: 1.5, position: "relative" },
  notifImg: { width: "100%", height: "100%" },
  notifImgBadge: { position: "absolute", bottom: 2, right: 2, width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center" },

  notifAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", borderWidth: 1.5 },
  notifAvatarText: { ...TYPE.h3, fontFamily: "Chillax-Bold" },

  notifIconWrap: { width: 52, height: 52, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center", borderWidth: 1 },

  notifContent: { flex: 1 },
  notifTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  notifTitle: { ...TYPE.bodyMed, color: "rgba(255,255,255,0.7)", flex: 1, marginRight: 8 },
  notifTitleUnread: { color: BRAND.textPrimary },
  notifTime: { ...TYPE.caption, color: BRAND.textMuted },
  notifBody: { ...TYPE.small, color: BRAND.textSecondary, lineHeight: 18 },

  notifCta: { marginTop: 8, overflow: "hidden", borderRadius: RADIUS.full, alignSelf: "flex-start" },
  notifCtaGradient: { paddingHorizontal: 14, paddingVertical: 6 },
  notifCtaText: { ...TYPE.label, color: "#1A0B2E" },

  pointsBadge: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6, backgroundColor: "rgba(255,209,18,0.12)", borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 4, alignSelf: "flex-start" },
  pointsBadgeText: { ...TYPE.label, color: "#FFD112" },

  dismissBtn: { padding: 4, marginTop: 2 },

  // Empty state
  emptyState: { alignItems: "center", paddingTop: 60, paddingHorizontal: 32 },
  emptyIconWrap: { width: 120, height: 120, borderRadius: 60, overflow: "hidden", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  emptyMascot: { width: 90, height: 90 },
  emptyTitle: { ...TYPE.h3, color: BRAND.textPrimary, marginBottom: 8 },
  emptyBody: { ...TYPE.body, color: BRAND.textSecondary, textAlign: "center", lineHeight: 22 },
});
