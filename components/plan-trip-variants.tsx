// Plan a Trip — 3 Reference Designs from user
// Boarding Pass | Globe Route Arc | Typographic Split

import { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Platform,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Svg, { Ellipse, Path, Circle, G, Text as SvgText, Line } from "react-native-svg";
import * as Haptics from "expo-haptics";

const { width: W } = Dimensions.get("window");

const C = {
  purple: "#6443F4",
  purpleLight: "#9B7EFF",
  pink: "#F94498",
  white: "#FFFFFF",
  dark: "#140930",
  darkBg: "#0D0820",
  muted: "rgba(255,255,255,0.3)",
  frosted: "rgba(255,255,255,0.12)",
};

function haptic() {
  if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

// ═══════════════════════════════════════════════════
// 1 — BOARDING PASS
// Dark top: YOU → ??? with plane + AI MATCHED badge
// Perforated line divider
// Light bottom: passenger fields + barcode + CTA
// ═══════════════════════════════════════════════════
function BoardingPass({ onPress }: { onPress: () => void }) {
  const planeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(planeX, { toValue: 6, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(planeX, { toValue: -6, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Generate barcode heights
  const barHeights = [28,20,28,16,24,28,14,28,20,16,28,24,20,28,16,28,14,24,28,20,16,28];

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <View style={bp.card}>
        {/* ── DARK TOP ── */}
        <View style={bp.darkSection}>
          <View style={bp.header}>
            <Text style={bp.brand}>TR<Text style={bp.brandAccent}>AVI</Text></Text>
            <Text style={bp.type}>BOARDING PASS</Text>
          </View>
          <View style={bp.route}>
            {/* Origin */}
            <View style={bp.cityBlock}>
              <Text style={bp.iata}>YOU</Text>
              <Text style={bp.cityName}>RIGHT HERE</Text>
            </View>
            {/* Middle: line + plane + badge */}
            <View style={bp.mid}>
              <View style={bp.flightLine}>
                <View style={bp.lineSeg} />
                <Animated.View style={{ transform: [{ translateX: planeX }] }}>
                  <MaterialIcons name="flight" size={18} color="rgba(255,255,255,0.4)" style={{ transform: [{ rotate: "90deg" }] }} />
                </Animated.View>
                <View style={bp.lineSeg} />
              </View>
              <View style={bp.aiBadge}>
                <Text style={bp.aiBadgeText}>✦ AI MATCHED</Text>
              </View>
            </View>
            {/* Destination */}
            <View style={bp.cityBlock}>
              <Text style={[bp.iata, bp.iataDest]}>???</Text>
              <Text style={bp.cityName}>YOUR DREAM</Text>
            </View>
          </View>
        </View>

        {/* ── PERFORATION ── */}
        <View style={bp.perforation}>
          <View style={bp.perfLeft} />
          <View style={bp.perfLine} />
          <View style={bp.perfRight} />
        </View>

        {/* ── LIGHT BOTTOM ── */}
        <View style={bp.lightSection}>
          <View style={bp.fields}>
            <View style={bp.field}>
              <Text style={bp.fieldLabel}>PASSENGER</Text>
              <Text style={bp.fieldValue}>David ✦</Text>
            </View>
            <View style={bp.field}>
              <Text style={bp.fieldLabel}>CLASS</Text>
              <Text style={bp.fieldValue}>Explorer DNA</Text>
            </View>
            <View style={bp.field}>
              <Text style={bp.fieldLabel}>DEPARTS</Text>
              <Text style={bp.fieldValue}>Anytime</Text>
            </View>
          </View>
          <View style={bp.bottomRow}>
            {/* Barcode */}
            <View style={bp.barcode}>
              {barHeights.map((h, i) => (
                <View key={i} style={[bp.bar, { height: h }]} />
              ))}
            </View>
            {/* CTA */}
            <Pressable
              onPress={() => { haptic(); onPress(); }}
              style={({ pressed }) => [bp.cta, pressed && { opacity: 0.85 }]}
            >
              <Text style={bp.ctaText}>Plan Trip</Text>
              <MaterialIcons name="arrow-forward" size={14} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const bp = StyleSheet.create({
  card: {
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 60,
    elevation: 16,
  },
  darkSection: {
    backgroundColor: C.dark,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  brand: { fontSize: 13, fontFamily: "Chillax-Bold", color: C.white, letterSpacing: -0.5 },
  brandAccent: { color: C.purpleLight },
  type: { fontSize: 9, fontFamily: "Satoshi-Bold", letterSpacing: 3, color: "rgba(255,255,255,0.25)" },
  route: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cityBlock: { alignItems: "center", width: 80 },
  iata: { fontSize: 36, fontFamily: "Chillax-Bold", color: C.white, letterSpacing: -2, lineHeight: 40 },
  iataDest: { color: C.pink },
  cityName: { fontSize: 9, fontFamily: "Satoshi-Medium", color: "rgba(255,255,255,0.3)", marginTop: 3, letterSpacing: 0.8 },
  mid: { flex: 1, alignItems: "center", gap: 6 },
  flightLine: { flexDirection: "row", alignItems: "center", width: "100%" as any },
  lineSeg: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.15)" },
  aiBadge: {
    backgroundColor: "rgba(100,67,244,0.2)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.4)",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  aiBadgeText: { fontSize: 9, fontFamily: "Satoshi-Bold", color: C.purpleLight, letterSpacing: 0.5 },
  // Perforation
  perforation: {
    flexDirection: "row",
    alignItems: "center",
    height: 1,
    backgroundColor: "#F7F4FF",
    position: "relative",
  },
  perfLeft: {
    position: "absolute",
    left: -8,
    top: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#08030F",
    zIndex: 2,
  },
  perfRight: {
    position: "absolute",
    right: -8,
    top: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#08030F",
    zIndex: 2,
  },
  perfLine: {
    flex: 1,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    marginHorizontal: 12,
  },
  // Light section
  lightSection: {
    backgroundColor: "#F7F4FF",
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 18,
  },
  fields: { flexDirection: "row", gap: 20, marginBottom: 14 },
  field: {},
  fieldLabel: { fontSize: 9, fontFamily: "Satoshi-Bold", letterSpacing: 1.5, color: C.purpleLight, marginBottom: 3 },
  fieldValue: { fontSize: 14, fontFamily: "Chillax-Bold", color: "#1A0B32" },
  bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  barcode: { flexDirection: "row", gap: 2, alignItems: "flex-end", height: 28 },
  bar: { width: 2, backgroundColor: "#1A0B32", borderRadius: 1 },
  cta: {
    backgroundColor: C.purple,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ctaText: { fontSize: 13, fontFamily: "Satoshi-Bold", color: C.white },
});

// ═══════════════════════════════════════════════════
// 2 — GLOBE / ROUTE ARC
// SVG globe lines + flight arc + DNA stats footer
// ═══════════════════════════════════════════════════
function GlobeRouteArc({ onPress }: { onPress: () => void }) {
  const dotPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotPulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(dotPulse, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <View style={gc.card}>
        {/* Header */}
        <View style={gc.head}>
          <View>
            <Text style={gc.label}>WHERE NEXT?</Text>
            <Text style={gc.title}>Plan a Trip</Text>
            <Text style={gc.sub}>AI-matched to your DNA</Text>
          </View>
          <Animated.View style={[gc.pill, { opacity: dotPulse.interpolate({ inputRange: [0.3, 1], outputRange: [0.7, 1] }) }]}>
            <View style={gc.pillDot} />
            <Text style={gc.pillText}>DNA Active</Text>
          </Animated.View>
        </View>

        {/* SVG Map */}
        <View style={gc.map}>
          <Svg width="100%" height={130} viewBox="0 0 380 130">
            {/* Globe ellipses */}
            <Ellipse cx={190} cy={155} rx={195} ry={105} stroke="rgba(100,67,244,0.07)" strokeWidth={1} fill="none" />
            <Ellipse cx={190} cy={155} rx={155} ry={83} stroke="rgba(100,67,244,0.07)" strokeWidth={1} fill="none" />
            <Ellipse cx={190} cy={155} rx={115} ry={62} stroke="rgba(100,67,244,0.07)" strokeWidth={1} fill="none" />
            {/* Flight arc */}
            <Path d="M 55 108 C 90 30, 290 30, 325 88" stroke="rgba(100,67,244,0.3)" strokeWidth={1} fill="none" strokeDasharray="6 4" />
            {/* Origin dot */}
            <Circle cx={55} cy={108} r={17} fill="rgba(100,67,244,0.08)" />
            <Circle cx={55} cy={108} r={11} fill="rgba(100,67,244,0.2)" />
            <Circle cx={55} cy={108} r={6} fill={C.purple} />
            <SvgText x={55} y={132} fill="rgba(255,255,255,0.4)" fontSize={9} textAnchor="middle" fontWeight="700">YOU</SvgText>
            {/* Destination dot */}
            <Circle cx={325} cy={88} r={17} fill="rgba(249,68,152,0.08)" />
            <Circle cx={325} cy={88} r={11} fill="rgba(249,68,152,0.2)" />
            <Circle cx={325} cy={88} r={6} fill={C.pink} />
            <SvgText x={325} y={112} fill="rgba(255,255,255,0.4)" fontSize={9} textAnchor="middle" fontWeight="700">???</SvgText>
            {/* Star midpoint */}
            <G transform="translate(186,38) rotate(-8)">
              <Path d="M12 2L15.5 8.5L22 9.3L17 14.2L18.2 21L12 17.7L5.8 21L7 14.2L2 9.3L8.5 8.5Z" fill="rgba(255,255,255,0.7)" />
            </G>
          </Svg>
        </View>

        {/* Footer */}
        <View style={gc.footer}>
          <View style={gc.info}>
            <View>
              <Text style={gc.statNum}>96%</Text>
              <Text style={gc.statLbl}>DNA Match</Text>
            </View>
            <View>
              <Text style={gc.statNum}>2 min</Text>
              <Text style={gc.statLbl}>To build</Text>
            </View>
            <View>
              <Text style={gc.statNum}>AI ✦</Text>
              <Text style={gc.statLbl}>Powered</Text>
            </View>
          </View>
          <Pressable
            onPress={() => { haptic(); onPress(); }}
            style={({ pressed }) => [gc.goBtn, pressed && { opacity: 0.85 }]}
          >
            <MaterialIcons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const gc = StyleSheet.create({
  card: {
    backgroundColor: C.darkBg,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.18)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 16,
  },
  head: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  label: { fontSize: 10, fontFamily: "Satoshi-Bold", letterSpacing: 2.5, color: "rgba(155,126,255,0.45)", marginBottom: 6 },
  title: { fontSize: 28, fontFamily: "Chillax-Bold", color: C.white, letterSpacing: -1, lineHeight: 32 },
  sub: { fontSize: 12, fontFamily: "Satoshi-Regular", color: "rgba(155,126,255,0.55)", marginTop: 4 },
  pill: {
    backgroundColor: "rgba(249,68,152,0.12)",
    borderWidth: 1,
    borderColor: "rgba(249,68,152,0.25)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  pillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.pink },
  pillText: { fontSize: 10, fontFamily: "Satoshi-Bold", color: C.pink },
  map: { height: 130 },
  footer: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: { flexDirection: "row", gap: 16 },
  statNum: { fontSize: 18, fontFamily: "Chillax-Bold", color: C.white, letterSpacing: -0.5 },
  statLbl: { fontSize: 10, fontFamily: "Satoshi-Regular", color: "rgba(255,255,255,0.3)", marginTop: 1 },
  goBtn: {
    width: 44,
    height: 44,
    backgroundColor: C.purple,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
});

// ═══════════════════════════════════════════════════
// 3 — TYPOGRAPHIC SPLIT
// White left: "WHERE TO?" + CTA
// Dark right: rotating IATA codes + DNA badge + dots
// ═══════════════════════════════════════════════════
const IATA_CODES = ["DXB", "BKK", "CDG", "NRT", "LHR", "SYD", "JFK", "MXP", "IST"];

function TypographicSplit({ onPress }: { onPress: () => void }) {
  const [codeIdx, setCodeIdx] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out + slide up
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -8, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        setCodeIdx((prev) => (prev + 1) % IATA_CODES.length);
        slideAnim.setValue(8);
        // Fade in + slide down
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Pressable
      onPress={() => { haptic(); onPress(); }}
      style={({ pressed }) => [pressed && { opacity: 0.93, transform: [{ scale: 0.985 }] }]}
    >
      <View style={tc.card}>
        {/* ── LEFT (white) ── */}
        <View style={tc.left}>
          <View>
            <Text style={tc.question}>WHERE{"\n"}TO<Text style={tc.questionAccent}>?</Text></Text>
            <View style={tc.rule} />
            <Text style={tc.sub}>Your DNA picks the destination. AI builds the plan.</Text>
          </View>
          <Pressable
            onPress={() => { haptic(); onPress(); }}
            style={({ pressed }) => [tc.btn, pressed && { opacity: 0.85 }]}
          >
            <Text style={tc.btnText}>Plan a Trip</Text>
            <MaterialIcons name="arrow-forward" size={14} color="#fff" />
          </Pressable>
        </View>

        {/* ── RIGHT (dark) ── */}
        <View style={tc.right}>
          <View style={tc.destWrap}>
            <Animated.Text style={[tc.destCode, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              {IATA_CODES[codeIdx]}
            </Animated.Text>
            <Text style={tc.destLabel}>NEXT STOP</Text>
          </View>
          <View style={tc.dnaBadge}>
            <Text style={tc.dnaText}>Explorer DNA</Text>
            <Text style={tc.dnaSub}>96% match</Text>
          </View>
          <View style={tc.dots}>
            <View style={[tc.dot, { backgroundColor: C.purple }]} />
            <View style={[tc.dot, { backgroundColor: C.pink }]} />
            <View style={[tc.dot, { backgroundColor: "#FF9327", opacity: 0.5 }]} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const tc = StyleSheet.create({
  card: {
    borderRadius: 22,
    overflow: "hidden",
    flexDirection: "row",
    minHeight: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 16,
  },
  left: {
    flex: 1.1,
    backgroundColor: C.white,
    padding: 22,
    justifyContent: "space-between",
  },
  question: {
    fontSize: 38,
    fontFamily: "Chillax-Bold",
    color: "#0E0618",
    letterSpacing: -2,
    lineHeight: 38,
  },
  questionAccent: { color: C.purple },
  rule: {
    width: 32,
    height: 4,
    backgroundColor: C.purple,
    borderRadius: 2,
    marginTop: 12,
    marginBottom: 10,
  },
  sub: {
    fontSize: 11,
    fontFamily: "Satoshi-Regular",
    color: "#999",
    lineHeight: 16,
    maxWidth: 150,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#0E0618",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: "flex-start",
    marginTop: 14,
  },
  btnText: { fontSize: 12, fontFamily: "Satoshi-Bold", color: C.white },
  right: {
    width: 130,
    backgroundColor: "#1A0B32",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  destWrap: { alignItems: "center" },
  destCode: {
    fontSize: 28,
    fontFamily: "Chillax-Bold",
    color: C.white,
    letterSpacing: -2,
    lineHeight: 32,
  },
  destLabel: {
    fontSize: 8,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 2,
    color: "rgba(255,255,255,0.25)",
    marginTop: 2,
  },
  dnaBadge: {
    backgroundColor: "rgba(100,67,244,0.2)",
    borderWidth: 1,
    borderColor: "rgba(100,67,244,0.35)",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
  dnaText: { fontSize: 10, fontFamily: "Satoshi-Bold", color: C.purpleLight },
  dnaSub: { fontSize: 9, fontFamily: "Satoshi-Regular", color: "rgba(155,126,255,0.5)", marginTop: 1 },
  dots: { flexDirection: "row", gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 3.5 },
});

// ═══════════════════════════════════════════════════
// VARIANT SELECTOR — arrows + dots + label
// ═══════════════════════════════════════════════════
const VARIANT_NAMES = [
  "Boarding Pass",
  "Route Arc",
  "Typographic Split",
];

const VARIANTS = [BoardingPass, GlobeRouteArc, TypographicSplit];

export function PlanTripVariantSelector({ onPress }: { onPress: () => void }) {
  const [idx, setIdx] = useState(0);
  const Variant = VARIANTS[idx];

  const prev = () => {
    haptic();
    setIdx((i) => (i - 1 + VARIANTS.length) % VARIANTS.length);
  };
  const next = () => {
    haptic();
    setIdx((i) => (i + 1) % VARIANTS.length);
  };

  return (
    <View>
      <Variant onPress={onPress} />
      <View style={ns.navRow}>
        <Pressable onPress={prev} style={({ pressed }) => [ns.arrow, pressed && { opacity: 0.6 }]}>
          <MaterialIcons name="chevron-left" size={24} color={C.white} />
        </Pressable>
        <View style={ns.dotsRow}>
          {VARIANTS.map((_, i) => (
            <View key={i} style={[ns.dot, i === idx && ns.dotActive]} />
          ))}
        </View>
        <Pressable onPress={next} style={({ pressed }) => [ns.arrow, pressed && { opacity: 0.6 }]}>
          <MaterialIcons name="chevron-right" size={24} color={C.white} />
        </Pressable>
      </View>
      <Text style={ns.variantLabel}>{idx + 1}/3 — {VARIANT_NAMES[idx]}</Text>
    </View>
  );
}

const ns = StyleSheet.create({
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 16,
  },
  arrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(100,67,244,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  dotActive: {
    backgroundColor: C.pink,
    width: 20,
    shadowColor: C.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  variantLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    fontFamily: "Satoshi-Medium",
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 0.3,
  },
});
