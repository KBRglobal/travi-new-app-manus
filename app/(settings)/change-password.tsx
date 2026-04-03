import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export default function ChangePasswordScreen() {
  const colors = useColors();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!current || !newPass || !confirm) { setError("All fields are required."); return; }
    if (newPass !== confirm) { setError("New passwords don't match."); return; }
    if (newPass.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError("");
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  const PasswordField = ({
    label, value, onChange, show, onToggle,
  }: { label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void }) => (
    <View style={S.field}>
      <Text style={[S.label, { color: colors.muted }]}>{label}</Text>
      <View style={[S.inputWrap, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TextInput
          value={value}
          onChangeText={onChange}
          secureTextEntry={!show}
          style={[S.input, { color: colors.text }]}
          placeholderTextColor={colors.muted}
          placeholder="••••••••"
          returnKeyType="done"
        />
        <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={S.eyeBtn}>
          <IconSymbol name={show ? "eye.slash.fill" : "eye.fill"} size={18} color={colors.muted} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenContainer>
      <View style={[S.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[S.headerTitle, { color: colors.text }]}>Change Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={S.scroll}>
        <Text style={[S.subtitle, { color: colors.muted }]}>
          Choose a strong password with at least 8 characters.
        </Text>

        <View style={S.form}>
          <PasswordField label="Current Password" value={current} onChange={setCurrent} show={showCurrent} onToggle={() => setShowCurrent(!showCurrent)} />
          <PasswordField label="New Password" value={newPass} onChange={setNewPass} show={showNew} onToggle={() => setShowNew(!showNew)} />
          <PasswordField label="Confirm New Password" value={confirm} onChange={setConfirm} show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
        </View>

        {error ? <Text style={S.error}>{error}</Text> : null}

        <TouchableOpacity style={S.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={S.saveBtnText}>Update Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={S.forgotBtn} activeOpacity={0.7}>
          <Text style={[S.forgotText, { color: "#6443F4" }]}>Forgot current password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

const S = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 18, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  scroll: { padding: 20, paddingBottom: 130 },
  subtitle: { fontSize: 14, fontFamily: "Satoshi-Regular", marginBottom: 28, lineHeight: 20 },
  form: { gap: 20 },
  field: { gap: 8 },
  label: { fontSize: 14, fontFamily: "Satoshi-Regular", fontWeight: "500" },
  inputWrap: { flexDirection: "row", alignItems: "center", borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, height: 50 },
  input: { flex: 1, fontSize: 16, fontFamily: "Satoshi-Regular" },
  eyeBtn: { padding: 4 },
  error: { color: "#F94498", fontSize: 14, fontFamily: "Satoshi-Regular", marginTop: 12 },
  saveBtn: { marginTop: 32, backgroundColor: "#6443F4", borderRadius: 14, paddingVertical: 16, alignItems: "center", shadowColor: "#F94498", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 24, elevation: 10 },
  saveBtnText: { color: "#fff", fontSize: 16, fontFamily: "Chillax-Semibold", fontWeight: "700" },
  forgotBtn: { marginTop: 16, alignItems: "center" },
  forgotText: { fontSize: 14, fontFamily: "Satoshi-Regular", fontWeight: "500" },
});
