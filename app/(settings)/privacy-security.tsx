import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Platform } from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export default function PrivacySecurityScreen() {
  const colors = useColors();
  const [privateAccount, setPrivateAccount] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);
  const [showTrips, setShowTrips] = useState(true);
  const [showDNA, setShowDNA] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometrics, setBiometrics] = useState(true);

  const toggle = (setter: (v: boolean) => void, val: boolean) => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(!val);
  };

  const Row = ({ label, desc, value, onToggle }: { label: string; desc?: string; value: boolean; onToggle: () => void }) => (
    <View style={[S.row, { borderBottomColor: colors.border }]}>
      <View style={S.rowLeft}>
        <Text style={[S.rowLabel, { color: colors.text }]}>{label}</Text>
        {desc ? <Text style={[S.rowDesc, { color: colors.muted }]}>{desc}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: "#6443F4" }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <ScreenContainer>
      <View style={[S.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[S.headerTitle, { color: colors.text }]}>Privacy & Security</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={S.scroll}>
        <Text style={[S.section, { color: colors.muted }]}>PRIVACY</Text>
        <View style={[S.card, { backgroundColor: colors.surface }]}>
          <Row label="Private Account" desc="Only approved followers see your trips" value={privateAccount} onToggle={() => toggle(setPrivateAccount, privateAccount)} />
          <Row label="Share Location" desc="Allow TRAVI to use your location" value={shareLocation} onToggle={() => toggle(setShareLocation, shareLocation)} />
          <Row label="Show My Trips" desc="Visible to community members" value={showTrips} onToggle={() => toggle(setShowTrips, showTrips)} />
          <Row label="Show Traveler DNA" desc="Visible on your public profile" value={showDNA} onToggle={() => toggle(setShowDNA, showDNA)} />
        </View>

        <Text style={[S.section, { color: colors.muted }]}>SECURITY</Text>
        <View style={[S.card, { backgroundColor: colors.surface }]}>
          <Row label="Two-Factor Authentication" desc="Extra layer of account security" value={twoFactor} onToggle={() => toggle(setTwoFactor, twoFactor)} />
          <Row label="Face ID / Biometrics" desc="Use biometrics to unlock app" value={biometrics} onToggle={() => toggle(setBiometrics, biometrics)} />
        </View>

        <TouchableOpacity style={[S.dangerBtn, { borderColor: "#F94498" }]} activeOpacity={0.8}>
          <Text style={S.dangerText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

const S = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  scroll: { padding: 20, paddingBottom: 100 },
  section: { fontSize: 12, fontWeight: "600", letterSpacing: 1, marginBottom: 8, marginTop: 20 },
  card: { borderRadius: 16, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 0.5 },
  rowLeft: { flex: 1, marginRight: 12 },
  rowLabel: { fontSize: 15, fontWeight: "500" },
  rowDesc: { fontSize: 12, marginTop: 2 },
  dangerBtn: { marginTop: 32, borderWidth: 1.5, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  dangerText: { color: "#F94498", fontSize: 15, fontWeight: "600" },
});
