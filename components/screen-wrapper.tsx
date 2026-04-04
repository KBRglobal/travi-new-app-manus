/**
 * TRAVI ScreenWrapper
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared wrapper for ALL screens. Provides:
 *  - Background: #0A0514 solid
 *  - SafeArea handling
 *  - Optional scrollable content
 *  - Optional back button header
 *  - Optional title header
 *
 * Usage:
 *   <ScreenWrapper title="Explore" onBack={() => router.back()}>
 *     ...content...
 *   </ScreenWrapper>
 */

import { View, Text, StyleSheet, Pressable, ScrollView, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ReactNode } from "react";

export const DS = {
  bg: "#0A0514",
  surface: "rgba(36,16,62,0.55)",
  surfaceHigh: "rgba(50,20,80,0.7)",
  border: "rgba(123,68,230,0.22)",
  borderStrong: "rgba(100,67,244,0.4)",
  purple: "#6443F4",
  pink: "#F94498",
  success: "#02A65C",
  warning: "#FF9327",
  error: "#FF6B6B",
  info: "#01BEFF",
  white: "#FFFFFF",
  secondary: "#D3CFD8",
  muted: "#A79FB2",
  placeholder: "#7B6A94",
  gradient: ["#6443F4", "#F94498"] as [string, string],
};

interface ScreenWrapperProps {
  children: ReactNode;
  /** Screen title shown in header */
  title?: string;
  /** Show back button (defaults to true if title is provided) */
  showBack?: boolean;
  /** Custom back handler (defaults to router.back()) */
  onBack?: () => void;
  /** Right side header element */
  headerRight?: ReactNode;
  /** Scrollable content (default: false) */
  scrollable?: boolean;
  /** Extra padding at bottom of scroll */
  bottomPad?: number;
  /** Additional style for content area */
  contentStyle?: ViewStyle;
  /** Hide header entirely */
  noHeader?: boolean;
}

export function ScreenWrapper({
  children,
  title,
  showBack = !!title,
  onBack,
  headerRight,
  scrollable = false,
  bottomPad = 24,
  contentStyle,
  noHeader = false,
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = onBack ?? (() => router.back());

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {!noHeader && (
        <View style={s.header}>
          {showBack ? (
            <Pressable
              style={({ pressed }) => [s.iconBtn, pressed && { opacity: 0.6 }]}
              onPress={handleBack}
            >
              <View style={s.iconCircle}>
                <MaterialIcons name="arrow-back" size={20} color={DS.white} />
              </View>
            </Pressable>
          ) : (
            <View style={{ width: 44 }} />
          )}

          {title ? (
            <Text style={s.headerTitle} numberOfLines={1}>
              {title}
            </Text>
          ) : (
            <View style={{ flex: 1 }} />
          )}

          {headerRight ? (
            <View style={s.headerRightWrap}>{headerRight}</View>
          ) : (
            <View style={{ width: 44 }} />
          )}
        </View>
      )}

      {scrollable ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            s.scrollContent,
            { paddingBottom: insets.bottom + bottomPad },
            contentStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[s.content, contentStyle]}>{children}</View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DS.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 56,
  },
  iconBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: DS.surface,
    borderWidth: 1,
    borderColor: DS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Chillax-Bold",
    color: DS.white,
    textAlign: "center",
    marginHorizontal: 8,
  },
  headerRightWrap: {
    width: 44,
    alignItems: "flex-end",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
});
