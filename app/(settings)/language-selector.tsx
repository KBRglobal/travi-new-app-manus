/**
 * TRAVI — Language Selector Screen
 * Dark mode: #1A0B2E bg, #24103E surface, purple->pink gradients
 */
import React, { useState } from "react";
import { useAppTranslation } from "@/hooks/use-translation";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const C = {
  bg: "#1A0B2E", surface: "#24103E", glassStroke: "rgba(123,68,230,0.3)",
  purple: "#6443F4", pink: "#F94498",
  white: "#FFFFFF", textPrimary: "#FFFFFF", textSecondary: "#D3CFD8",
  textMuted: "#A79FB2",
};

const LANGUAGES = [
  { code: "en", name: "English",    native: "English",    flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "he", name: "Hebrew",     native: "\u05E2\u05D1\u05E8\u05D9\u05EA",       flag: "\u{1F1EE}\u{1F1F1}" },
  { code: "ar", name: "Arabic",     native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",     flag: "\u{1F1F8}\u{1F1E6}" },
  { code: "es", name: "Spanish",    native: "Espa\u00F1ol",     flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "fr", name: "French",     native: "Fran\u00E7ais",    flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "de", name: "German",     native: "Deutsch",     flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "it", name: "Italian",    native: "Italiano",    flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "pt", name: "Portuguese", native: "Portugu\u00EAs",   flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "ru", name: "Russian",    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",     flag: "\u{1F1F7}\u{1F1FA}" },
  { code: "zh", name: "Chinese",    native: "\u4E2D\u6587",         flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "ja", name: "Japanese",   native: "\u65E5\u672C\u8A9E",       flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "ko", name: "Korean",     native: "\ud55c\uad6d\uc5b4",       flag: "\u{1F1F0}\u{1F1F7}" },
];

export default function LanguageSelectorScreen() {
  const insets = useSafeAreaInsets();
  const { changeLanguage, language } = useAppTranslation();
  type LangCode = "en" | "he" | "es" | "fr" | "de" | "it" | "pt" | "ja" | "zh" | "ko" | "ar" | "ru";
  const [selected, setSelected] = useState<LangCode>((language as LangCode) || "en");

  const handleSelect = (code: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(code as LangCode);
    changeLanguage(code as any);
  };

  return (
    <View style={S.root}>
      <LinearGradient
        colors={[C.purple, "#9B3FD4", C.pink]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={[S.header, { paddingTop: insets.top + 12 }]}
      >
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn} activeOpacity={0.8}>
          <IconSymbol name="chevron.left" size={22} color={C.white} />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Language</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <FlatList
        data={LANGUAGES}
        keyExtractor={(item) => item.code}
        contentContainerStyle={[S.list, { paddingBottom: insets.bottom + 32 }]}
        renderItem={({ item }) => {
          const isSelected = selected === item.code;
          return (
            <TouchableOpacity
              style={[S.row, isSelected && S.rowActive]}
              onPress={() => handleSelect(item.code)}
              activeOpacity={0.8}
            >
              {isSelected && (
                <LinearGradient
                  colors={[C.purple + "22", C.pink + "11"]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFillObject}
                />
              )}
              <Text style={S.flag}>{item.flag}</Text>
              <View style={S.rowText}>
                <Text style={[S.langName, isSelected && { color: C.white }]}>{item.name}</Text>
                <Text style={S.langNative}>{item.native}</Text>
              </View>
              {isSelected && (
                <View style={S.checkBadge}>
                  <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
                  <IconSymbol name="checkmark" size={14} color={C.white} />
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingBottom: 20,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: C.white, fontSize: 20, fontWeight: "800", fontFamily: "Chillax-Bold" },
  list: { paddingTop: 16, paddingHorizontal: 20, gap: 8 },
  row: {
    flexDirection: "row", alignItems: "center", gap: 14,
    backgroundColor: C.surface, borderRadius: 16,
    paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: C.glassStroke, overflow: "hidden",
  },
  rowActive: { borderColor: "rgba(100,67,244,0.5)" },
  flag: { fontSize: 24 },
  rowText: { flex: 1, gap: 2 },
  langName: { color: C.textSecondary, fontSize: 15, fontWeight: "600", fontFamily: "Satoshi-Medium" },
  langNative: { color: C.textMuted, fontSize: 13, fontFamily: "Satoshi-Regular" },
  checkBadge: {
    width: 28, height: 28, borderRadius: 14, overflow: "hidden",
    alignItems: "center", justifyContent: "center",
  },
});
