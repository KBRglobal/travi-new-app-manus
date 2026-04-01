import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Animated,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";
import type { PriceAlert } from "@/lib/store";
import * as Haptics from "expo-haptics";

const DESTINATIONS = [
  { code: "TLV", city: "Tel Aviv", country: "Israel", emoji: "IL", gradient: ["#1a0a2e", "#6B21A8"] as const },
  { code: "CDG", city: "Paris", country: "France", emoji: "FR", gradient: ["#1a0a2e", "#6443F4"] as const },
  { code: "JFK", city: "New York", country: "USA", emoji: "US", gradient: ["#1a0a2e", "#6443F4"] as const },
  { code: "NRT", city: "Tokyo", country: "Japan", emoji: "JP", gradient: ["#1a0a2e", "#DB2777"] as const },
  { code: "DXB", city: "Dubai", country: "UAE", emoji: "AE", gradient: ["#1a0a2e", "#D97706"] as const },
  { code: "BCN", city: "Barcelona", country: "Spain", emoji: "ES", gradient: ["#1a0a2e", "#DC2626"] as const },
  { code: "BKK", city: "Bangkok", country: "Thailand", emoji: "TH", gradient: ["#1a0a2e", "#059669"] as const },
  { code: "LHR", city: "London", country: "UK", emoji: "UK", gradient: ["#1a0a2e", "#4B5563"] as const },
  { code: "FCO", city: "Rome", country: "Italy", emoji: "IT", gradient: ["#1a0a2e", "#16A34A"] as const },
  { code: "SYD", city: "Sydney", country: "Australia", emoji: "AU", gradient: ["#1a0a2e", "#0891B2"] as const },
];

const MOCK_PRICES: Record<string, number> = {
  TLV: 320, CDG: 890, JFK: 1150, NRT: 1420, DXB: 780,
  BCN: 820, BKK: 1100, LHR: 950, FCO: 860, SYD: 1680,
};

export default function AlertsScreen() {
  const { state, dispatch } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedDest, setSelectedDest] = useState<typeof DESTINATIONS[0] | null>(null);
  const [maxPrice, setMaxPrice] = useState("");
  const [step, setStep] = useState<"destination" | "price">("destination");
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  const alerts = state.priceAlerts;
  const triggeredAlerts = alerts.filter((a) => a.triggered);
  const activeAlerts = alerts.filter((a) => !a.triggered);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const openModal = () => {
    setShowModal(true);
    setStep("destination");
    setSelectedDest(null);
    setMaxPrice("");
    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const closeModal = () => {
    Animated.timing(slideAnim, { toValue: 600, duration: 250, useNativeDriver: true }).start(() => {
      setShowModal(false);
    });
  };

  const handleSelectDest = (dest: typeof DESTINATIONS[0]) => {
    setSelectedDest(dest);
    setStep("price");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleCreateAlert = () => {
    if (!selectedDest || !maxPrice) return;
    const currentPrice = MOCK_PRICES[selectedDest.code] ?? 999;
    const alert: PriceAlert = {
      id: Date.now().toString(),
      destination: `${selectedDest.city}, ${selectedDest.country}`,
      destinationCode: selectedDest.code,
      maxPrice: parseInt(maxPrice),
      currentPrice,
      triggered: parseInt(maxPrice) >= currentPrice,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_PRICE_ALERT", payload: alert });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    closeModal();
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "REMOVE_PRICE_ALERT", payload: id });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const renderAlert = ({ item }: { item: PriceAlert }) => {
    const dest = DESTINATIONS.find((d) => d.code === item.destinationCode);
    const savings = item.currentPrice - item.maxPrice;
    const isTriggered = item.triggered;
    const progress = Math.min(1, item.maxPrice / item.currentPrice);

    return (
      <View style={[styles.alertCard, isTriggered && styles.alertCardTriggered]}>
        {isTriggered && (
          <LinearGradient
            colors={["#6443F422", "#F9449822"]}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
        <View style={styles.alertHeader}>
          <View style={styles.alertLeft}>
            <Text style={styles.alertEmoji}>{dest?.emoji ?? "?"}</Text>
            <View>
              <Text style={styles.alertCity}>{item.destination}</Text>
              <Text style={styles.alertCode}>{item.destinationCode} · Round trip</Text>
            </View>
          </View>
          {isTriggered ? (
            <Animated.View style={[styles.triggeredBadge, { transform: [{ scale: pulseAnim }] }]}>
              <IconSymbol name="bell.fill" size={12} color="#fff" />
              <Text style={styles.triggeredText}>ALERT!</Text>
            </Animated.View>
          ) : (
            <View style={styles.watchingBadge}>
              <IconSymbol name="eye.fill" size={12} color="#A78BFA" />
              <Text style={styles.watchingText}>Watching</Text>
            </View>
          )}
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceBlock}>
            <Text style={styles.priceLabel}>Current Price</Text>
            <Text style={[styles.priceValue, isTriggered && styles.priceValueGreen]}>
              ${item.currentPrice}
            </Text>
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceBlock}>
            <Text style={styles.priceLabel}>Your Target</Text>
            <Text style={styles.priceValueTarget}>${item.maxPrice}</Text>
          </View>
          {isTriggered && (
            <>
              <View style={styles.priceDivider} />
              <View style={styles.priceBlock}>
                <Text style={styles.priceLabel}>You Save</Text>
                <Text style={styles.priceValueSavings}>-${Math.abs(savings)}</Text>
              </View>
            </>
          )}
        </View>

        {!isTriggered && (
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={["#6443F4", "#F94498"]}
                style={[styles.progressFill, { width: `${progress * 100}%` }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={styles.progressText}>
              ${item.currentPrice - item.maxPrice} above your target
            </Text>
          </View>
        )}

        {isTriggered && (
          <Pressable
            style={styles.bookNowBtn}
            onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
          >
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              style={styles.bookNowGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="airplane" size={16} color="#fff" />
              <Text style={styles.bookNowText}>Book Now — ${item.currentPrice}</Text>
            </LinearGradient>
          </Pressable>
        )}

        <Pressable style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
          <IconSymbol name="trash.fill" size={16} color="#6B7280" />
        </Pressable>
      </View>
    );
  };

  return (
    <ScreenContainer containerClassName="bg-[#0D0118]">
      <LinearGradient
        colors={["#1a0a2e", "#0D0118"]}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Price Alerts</Text>
            <Text style={styles.headerSubtitle}>TRAVI watches prices while you sleep</Text>
          </View>
          <Pressable style={styles.addBtn} onPress={openModal}>
            <LinearGradient
              colors={["#6443F4", "#F94498"]}
              style={styles.addBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol name="plus" size={22} color="#fff" />
            </LinearGradient>
          </Pressable>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <LinearGradient colors={["#6443F422", "#6443F411"]} style={styles.statGradient}>
              <IconSymbol name="bell.fill" size={20} color="#A78BFA" />
              <Text style={styles.statNum}>{alerts.length}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient colors={["#F9449822", "#F9449811"]} style={styles.statGradient}>
              <IconSymbol name="bolt.fill" size={20} color="#F472B6" />
              <Text style={styles.statNum}>{triggeredAlerts.length}</Text>
              <Text style={styles.statLabel}>Triggered</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient colors={["#02A65C22", "#02A65C11"]} style={styles.statGradient}>
              <IconSymbol name="dollarsign.circle.fill" size={20} color="#34D399" />
              <Text style={styles.statNum}>
                ${triggeredAlerts.reduce((sum, a) => sum + Math.max(0, a.currentPrice - a.maxPrice), 0)}
              </Text>
              <Text style={styles.statLabel}>Saved</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Triggered Alerts */}
        {triggeredAlerts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <IconSymbol name="bolt.fill" size={18} color="#F472B6" />
              </Animated.View>
              <Text style={styles.sectionTitle}>Price Dropped!</Text>
            </View>
            <FlatList
              data={triggeredAlerts}
              renderItem={renderAlert}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="eye.fill" size={18} color="#A78BFA" />
              <Text style={styles.sectionTitle}>Watching</Text>
            </View>
            <FlatList
              data={activeAlerts}
              renderItem={renderAlert}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Empty State */}
        {alerts.length === 0 && (
          <View style={styles.emptyState}>
            <LinearGradient
              colors={["#6443F422", "#F9449822"]}
              style={styles.emptyIcon}
            >
              <IconSymbol name="bell.fill" size={40} color="#A78BFA" />
            </LinearGradient>
            <Text style={styles.emptyTitle}>No alerts yet</Text>
            <Text style={styles.emptySubtitle}>
              Tell TRAVI where you want to go and your max budget. We'll notify you the moment prices drop.
            </Text>
            <Pressable style={styles.emptyBtn} onPress={openModal}>
              <LinearGradient
                colors={["#6443F4", "#F94498"]}
                style={styles.emptyBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol name="plus" size={18} color="#fff" />
                <Text style={styles.emptyBtnText}>Set My First Alert</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        {/* How it works */}
        <View style={styles.howItWorks}>
          <Text style={styles.howTitle}>How Price Alerts Work</Text>
          {[
            { icon: "magnifyingglass" as const, title: "TRAVI monitors prices 24/7", desc: "We check flight prices every hour across all airlines" },
            { icon: "bell.fill" as const, title: "Instant notification", desc: "The moment your target price is hit, we alert you immediately" },
            { icon: "airplane" as const, title: "One-tap booking", desc: "Book directly from the alert before prices go back up" },
          ].map((item, i) => (
            <View key={i} style={styles.howItem}>
              <View style={styles.howIconWrap}>
                <LinearGradient colors={["#6443F433", "#F9449833"]} style={styles.howIconBg}>
                  <IconSymbol name={item.icon} size={18} color="#A78BFA" />
                </LinearGradient>
              </View>
              <View style={styles.howText}>
                <Text style={styles.howItemTitle}>{item.title}</Text>
                <Text style={styles.howItemDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Alert Modal */}
      <Modal visible={showModal} transparent animationType="none" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={closeModal} />
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.modalKAV}>
            <Animated.View style={[styles.modalSheet, { transform: [{ translateY: slideAnim }] }]}>
              <LinearGradient colors={["#1E0A3C", "#0D0118"]} style={styles.modalGradient}>
                {/* Handle */}
                <View style={styles.modalHandle} />

                {step === "destination" ? (
                  <>
                    <Text style={styles.modalTitle}>Where do you want to go?</Text>
                    <Text style={styles.modalSubtitle}>Select a destination to track</Text>
                    <View style={styles.destGrid}>
                      {DESTINATIONS.map((dest) => (
                        <Pressable
                          key={dest.code}
                          style={styles.destCard}
                          onPress={() => handleSelectDest(dest)}
                        >
                          <LinearGradient
                            colors={dest.gradient}
                            style={styles.destCardGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                          >
                            <Text style={styles.destEmoji}>{dest.emoji}</Text>
                            <Text style={styles.destCity}>{dest.city}</Text>
                            <Text style={styles.destPrice}>${MOCK_PRICES[dest.code]}</Text>
                          </LinearGradient>
                        </Pressable>
                      ))}
                    </View>
                  </>
                ) : (
                  <>
                    <Pressable style={styles.backBtn} onPress={() => setStep("destination")}>
                      <IconSymbol name="chevron.left" size={20} color="#A78BFA" />
                      <Text style={styles.backText}>Back</Text>
                    </Pressable>
                    <Text style={styles.modalTitle}>
                      {selectedDest?.emoji} {selectedDest?.city}
                    </Text>
                    <Text style={styles.modalSubtitle}>
                      Current price: <Text style={styles.currentPriceText}>${MOCK_PRICES[selectedDest?.code ?? ""] ?? 999}</Text>
                    </Text>

                    <View style={styles.priceInputSection}>
                      <Text style={styles.priceInputLabel}>Alert me when price drops below:</Text>
                      <View style={styles.priceInputWrap}>
                        <Text style={styles.dollarSign}>$</Text>
                        <TextInput
                          style={styles.priceInput}
                          value={maxPrice}
                          onChangeText={setMaxPrice}
                          keyboardType="number-pad"
                          placeholder="Enter max price"
                          placeholderTextColor="#6B7280"
                          returnKeyType="done"
                          autoFocus
                        />
                      </View>
                      {maxPrice && parseInt(maxPrice) >= (MOCK_PRICES[selectedDest?.code ?? ""] ?? 999) && (
                        <View style={styles.alertNowBanner}>
                          <IconSymbol name="bolt.fill" size={14} color="#34D399" />
                          <Text style={styles.alertNowText}>
                            Great news! Current price is already within your budget!
                          </Text>
                        </View>
                      )}
                    </View>

                    <Pressable
                      style={[styles.createBtn, !maxPrice && styles.createBtnDisabled]}
                      onPress={handleCreateAlert}
                      disabled={!maxPrice}
                    >
                      <LinearGradient
                        colors={maxPrice ? ["#6443F4", "#F94498"] : ["#374151", "#374151"]}
                        style={styles.createBtnGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <IconSymbol name="bell.fill" size={18} color="#fff" />
                        <Text style={styles.createBtnText}>Set Price Alert</Text>
                      </LinearGradient>
                    </Pressable>
                  </>
                )}
              </LinearGradient>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 120 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#F9FAFB", letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, color: "#9CA3AF", marginTop: 2 },
  addBtn: { borderRadius: 16, overflow: "hidden" },
  addBtnGradient: { width: 48, height: 48, alignItems: "center", justifyContent: "center" },
  statsRow: { flexDirection: "row", paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#6443F433" },
  statGradient: { padding: 14, alignItems: "center", gap: 4 },
  statNum: { fontSize: 20, fontWeight: "800", color: "#F9FAFB" },
  statLabel: { fontSize: 11, color: "#9CA3AF" },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#F9FAFB" },
  alertCard: {
    backgroundColor: "#1E0A3C",
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#6443F433",
    overflow: "hidden",
    position: "relative",
  },
  alertCardTriggered: { borderColor: "#F94498" },
  alertHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  alertLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  alertEmoji: { fontSize: 32 },
  alertCity: { fontSize: 16, fontWeight: "700", color: "#F9FAFB" },
  alertCode: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  triggeredBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F94498",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  triggeredText: { fontSize: 11, fontWeight: "800", color: "#fff" },
  watchingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#6443F422",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#6443F444",
  },
  watchingText: { fontSize: 11, fontWeight: "600", color: "#A78BFA" },
  priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  priceBlock: { flex: 1, alignItems: "center" },
  priceLabel: { fontSize: 11, color: "#9CA3AF", marginBottom: 4 },
  priceValue: { fontSize: 22, fontWeight: "800", color: "#F9FAFB" },
  priceValueGreen: { color: "#34D399" },
  priceValueTarget: { fontSize: 22, fontWeight: "800", color: "#A78BFA" },
  priceValueSavings: { fontSize: 22, fontWeight: "800", color: "#34D399" },
  priceDivider: { width: 1, height: 40, backgroundColor: "#374151" },
  progressSection: { marginBottom: 4 },
  progressBar: {
    height: 6,
    backgroundColor: "#374151",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: { height: "100%", borderRadius: 3 },
  progressText: { fontSize: 12, color: "#9CA3AF", textAlign: "center" },
  bookNowBtn: { borderRadius: 14, overflow: "hidden", marginTop: 4 },
  bookNowGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  bookNowText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  deleteBtn: { position: "absolute", top: 14, right: 14, padding: 4 },
  emptyState: { alignItems: "center", paddingHorizontal: 40, paddingVertical: 40 },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: { fontSize: 22, fontWeight: "800", color: "#F9FAFB", marginBottom: 10 },
  emptySubtitle: { fontSize: 14, color: "#9CA3AF", textAlign: "center", lineHeight: 22, marginBottom: 28 },
  emptyBtn: { borderRadius: 16, overflow: "hidden" },
  emptyBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  emptyBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  howItWorks: { marginHorizontal: 20, marginTop: 8 },
  howTitle: { fontSize: 16, fontWeight: "700", color: "#F9FAFB", marginBottom: 16 },
  howItem: { flexDirection: "row", alignItems: "flex-start", gap: 14, marginBottom: 16 },
  howIconWrap: {},
  howIconBg: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  howText: { flex: 1 },
  howItemTitle: { fontSize: 14, fontWeight: "600", color: "#E5E7EB", marginBottom: 3 },
  howItemDesc: { fontSize: 12, color: "#9CA3AF", lineHeight: 18 },
  // Modal
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.7)" },
  modalKAV: { justifyContent: "flex-end" },
  modalSheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden", maxHeight: "90%" },
  modalGradient: { padding: 24, paddingBottom: 40 },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#374151",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  modalTitle: { fontSize: 24, fontWeight: "800", color: "#F9FAFB", marginBottom: 6 },
  modalSubtitle: { fontSize: 14, color: "#9CA3AF", marginBottom: 20 },
  destGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  destCard: { width: "47%", borderRadius: 16, overflow: "hidden" },
  destCardGradient: { padding: 16, gap: 4 },
  destEmoji: { fontSize: 28 },
  destCity: { fontSize: 15, fontWeight: "700", color: "#F9FAFB" },
  destPrice: { fontSize: 13, color: "#A78BFA", fontWeight: "600" },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16 },
  backText: { fontSize: 15, color: "#A78BFA", fontWeight: "600" },
  currentPriceText: { color: "#F9FAFB", fontWeight: "700" },
  priceInputSection: { marginBottom: 24 },
  priceInputLabel: { fontSize: 15, color: "#E5E7EB", fontWeight: "600", marginBottom: 12 },
  priceInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E0A3C",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#6443F4",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  dollarSign: { fontSize: 24, fontWeight: "800", color: "#A78BFA", marginRight: 8 },
  priceInput: { flex: 1, fontSize: 32, fontWeight: "800", color: "#F9FAFB", paddingVertical: 12 },
  alertNowBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#02A65C22",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#02A65C44",
  },
  alertNowText: { flex: 1, fontSize: 13, color: "#34D399", lineHeight: 18 },
  createBtn: { borderRadius: 16, overflow: "hidden" },
  createBtnDisabled: { opacity: 0.5 },
  createBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
  },
  createBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
