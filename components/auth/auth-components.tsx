/**
 * TRAVI Auth Components
 * Reusable building blocks for all Auth screens.
 * Uses design-system tokens — never override with inline styles.
 */
import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardTypeOptions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Brand, Gradients, Text as DS, Border, Typography, Radius, Spacing, LogoAssets } from "@/lib/design-system";

// ─── Auth Screen Background ───────────────────────────────────────────────────
export function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={s.container}>
      <LinearGradient
        colors={Gradients.authBg}
        locations={[0, 0.35, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Ambient orbs — positioned at corners, never center */}
      <View style={s.orbTopRight} />
      <View style={s.orbBottomLeft} />
      {children}
    </View>
  );
}

// ─── Logotype (white, for Auth screens) ──────────────────────────────────────
export function AuthLogotype({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const heights = { sm: 28, md: 40, lg: 56 };
  const h = heights[size];
  return (
    <Image
      source={LogoAssets.logotypeWhite}
      style={{ height: h, width: h * 3.5, resizeMode: "contain" }}
    />
  );
}

// ─── Step Badge ───────────────────────────────────────────────────────────────
export function StepBadge({ current, total }: { current: number; total: number }) {
  return (
    <View style={s.stepBadge}>
      <LinearGradient colors={Gradients.badge} style={s.stepGradient}>
        <Text style={s.stepText}>Step {current} of {total}</Text>
      </LinearGradient>
    </View>
  );
}

// ─── Auth Heading ─────────────────────────────────────────────────────────────
export function AuthHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ gap: Spacing.xs }}>
      <Text style={s.title}>{title}</Text>
      {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: string }) {
  return <Text style={s.sectionLabel}>{children}</Text>;
}

// ─── Auth Text Input ──────────────────────────────────────────────────────────
type AuthInputProps = {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  iconName: Parameters<typeof IconSymbol>[0]["name"];
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  returnKeyType?: "done" | "next" | "go" | "search" | "send";
  onSubmitEditing?: () => void;
  secureTextEntry?: boolean;
};

export function AuthInput({
  value, onChangeText, placeholder, iconName,
  keyboardType, autoCapitalize, returnKeyType, onSubmitEditing, secureTextEntry,
}: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[s.inputWrap, focused && s.inputWrapFocused]}>
      <LinearGradient
        colors={focused ? Gradients.inputFocus : Gradients.inputIdle}
        style={s.inputGradient}
      >
        <IconSymbol name={iconName} size={18} color={focused ? DS.accent : DS.muted} />
        <TextInput
          style={s.input}
          placeholder={placeholder}
          placeholderTextColor={DS.placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secureTextEntry}
        />
      </LinearGradient>
    </View>
  );
}

// ─── Primary CTA Button ───────────────────────────────────────────────────────
export function AuthCTA({
  label, onPress, disabled, loading,
}: {
  label: string; onPress: () => void; disabled?: boolean; loading?: boolean;
}) {
  return (
    <TouchableOpacity
      style={s.cta}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
    >
      <LinearGradient
        colors={disabled ? ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.03)"] : Gradients.cta}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={s.ctaGradient}
      >
        <Text style={[s.ctaText, disabled && s.ctaTextDim]}>
          {loading ? "Loading…" : label}
        </Text>
        {!loading && (
          <IconSymbol
            name="arrow.right"
            size={18}
            color={disabled ? DS.disabled : DS.primary}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Social Auth Button (Google / Apple) ─────────────────────────────────────
export function SocialButton({
  provider, onPress,
}: {
  provider: "google" | "apple"; onPress: () => void;
}) {
  const isGoogle = provider === "google";
  return (
    <TouchableOpacity style={s.socialBtn} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.06)"]}
        style={s.socialGradient}
      >
        {isGoogle ? (
          // Google "G" rendered as white text with brand colors
          <Text style={s.googleG}>
            <Text style={{ color: "#4285F4" }}>G</Text>
            <Text style={{ color: "#EA4335" }}>o</Text>
            <Text style={{ color: "#FBBC05" }}>o</Text>
            <Text style={{ color: "#4285F4" }}>g</Text>
            <Text style={{ color: "#34A853" }}>l</Text>
            <Text style={{ color: "#EA4335" }}>e</Text>
          </Text>
        ) : (
          <IconSymbol name="apple.logo" size={18} color="#FFFFFF" />
        )}
        <Text style={s.socialText}>{isGoogle ? "Google" : "Apple"}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Divider with label ───────────────────────────────────────────────────────
export function AuthDivider({ label = "or continue with" }: { label?: string }) {
  return (
    <View style={s.divider}>
      <View style={s.dividerLine} />
      <Text style={s.dividerText}>{label}</Text>
      <View style={s.dividerLine} />
    </View>
  );
}

// ─── Guest link ───────────────────────────────────────────────────────────────
export function GuestLink({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={s.guestCard} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.02)"]}
        style={s.guestGradient}
      >
        <Text style={s.guestTitle}>Continue as Guest</Text>
        <Text style={s.guestSub}>Explore without an account</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Legal footer ─────────────────────────────────────────────────────────────
export function LegalFooter() {
  return (
    <Text style={s.legal}>
      By continuing, you agree to our{" "}
      <Text style={s.legalLink}>Terms</Text>
      {" "}and{" "}
      <Text style={s.legalLink}>Privacy Policy</Text>
    </Text>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Brand.deepPurple },
  orbTopRight: {
    position: "absolute", width: 300, height: 300, borderRadius: 150,
    top: -80, right: -100, backgroundColor: "rgba(100,67,244,0.12)",
  },
  orbBottomLeft: {
    position: "absolute", width: 260, height: 260, borderRadius: 130,
    bottom: 40, left: -100, backgroundColor: "rgba(249,68,152,0.08)",
  },

  stepBadge: { alignSelf: "flex-start" },
  stepGradient: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: Radius.pill,
    borderWidth: 1, borderColor: Border.badge,
  },
  stepText: { ...Typography.label, color: DS.secondary },

  title:    { ...Typography.h2 },
  subtitle: { ...Typography.body, color: DS.muted },
  sectionLabel: { ...Typography.label },

  inputWrap: {
    borderRadius: Radius.lg, overflow: "hidden",
    borderWidth: 1.5, borderColor: Border.idle,
  },
  inputWrapFocused: { borderColor: Border.focused },
  inputGradient: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  input: { flex: 1, color: DS.primary, fontSize: 16, fontWeight: "500" },

  cta: { borderRadius: Radius.lg, overflow: "hidden" },
  ctaGradient: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 17, gap: 10,
  },
  ctaText: { ...Typography.cta },
  ctaTextDim: { color: DS.disabled },

  socialBtn: { flex: 1, borderRadius: Radius.lg, overflow: "hidden" },
  socialGradient: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 14, gap: 8,
    borderWidth: 1, borderColor: Border.idle, borderRadius: Radius.lg,
  },
  googleG: { fontSize: 16, fontWeight: "700" },
  socialText: { color: DS.primary, fontSize: 15, fontWeight: "600" },

  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Border.subtle },
  dividerText: { ...Typography.small, color: DS.muted },

  guestCard: { borderRadius: Radius.xl, overflow: "hidden", borderWidth: 1, borderColor: Border.subtle },
  guestGradient: { alignItems: "center", paddingVertical: 18, gap: 4 },
  guestTitle: { ...Typography.h4, fontSize: 16 },
  guestSub: { ...Typography.small, color: DS.muted },

  legal: { textAlign: "center", fontSize: 12, color: DS.muted },
  legalLink: { color: Brand.pink, fontWeight: "600" },
});
