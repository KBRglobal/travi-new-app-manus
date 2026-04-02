import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import type { SymbolViewProps } from "expo-symbols";

interface EmptyStateProps {
  icon?: SymbolViewProps["name"];
  emoji?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, emoji, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={S.container}>
      {/* Icon or Emoji */}
      <View style={S.iconWrap}>
        <LinearGradient colors={["rgba(100,67,244,0.15)", "rgba(249,68,152,0.08)"]} style={StyleSheet.absoluteFillObject} />
        {emoji ? (
          <Text style={{ fontSize: 48 }}>{emoji}</Text>
        ) : icon ? (
          <IconSymbol name={icon} size={40} color="#A78BFA" />
        ) : null}
      </View>

      {/* Text */}
      <Text style={S.title}>{title}</Text>
      <Text style={S.message}>{message}</Text>

      {/* Action Button */}
      {actionLabel && onAction && (
        <TouchableOpacity style={S.actionBtn} onPress={onAction} activeOpacity={0.85}>
          <LinearGradient colors={["#6443F4", "#F94498"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          <Text style={S.actionBtnText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 12 },
  iconWrap: { width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center", overflow: "hidden", borderWidth: 1, borderColor: "rgba(167,139,250,0.2)", marginBottom: 8 },
  title: { color: "#ECEDEE", fontSize: 20, fontWeight: "800", textAlign: "center" },
  message: { color: "#9BA1A6", fontSize: 14, textAlign: "center", lineHeight: 20 },
  actionBtn: { borderRadius: 14, overflow: "hidden", paddingHorizontal: 24, paddingVertical: 12, marginTop: 8 },
  actionBtnText: { color: "#FFF", fontSize: 15, fontWeight: "700" },
});
