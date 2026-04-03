import React, { useState } from "react";
import { useAppTranslation } from "@/hooks/use-translation";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "he", name: "Hebrew", native: "עברית" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "it", name: "Italian", native: "Italiano" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "zh", name: "Chinese", native: "中文" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
];

export default function LanguageSelectorScreen() {
  const colors = useColors();
  const [selected, setSelected] = useState("en");

  const { changeLanguage } = useAppTranslation();
  const handleSelect = (code: string) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(code);
    changeLanguage(code as any);
  };

  return (
    <ScreenContainer>
      <View style={[S.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[S.headerTitle, { color: colors.text }]}>Language</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={LANGUAGES}
        keyExtractor={(item) => item.code}
        contentContainerStyle={S.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[S.row, { borderBottomColor: colors.border }]}
            onPress={() => handleSelect(item.code)}
            activeOpacity={0.7}
          >
            <View style={S.rowLeft}>
              <Text style={[S.name, { color: colors.text }]}>{item.name}</Text>
              <Text style={[S.native, { color: colors.muted }]}>{item.native}</Text>
            </View>
            {selected === item.code ? (
              <IconSymbol name="checkmark.circle.fill" size={24} color="#6443F4" />
            ) : null}
          </TouchableOpacity>
        )}
      />
    </ScreenContainer>
  );
}

const S = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 18, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  list: { paddingBottom: 130 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 0.5 },
  rowLeft: { flex: 1, marginRight: 12 },
  name: { fontSize: 16, fontFamily: "Satoshi-Regular", fontWeight: "500" },
  native: { fontSize: 14, fontFamily: "Satoshi-Regular", marginTop: 2 },
});
