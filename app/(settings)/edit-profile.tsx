import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Image } from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export default function EditProfileScreen() {
  const colors = useColors();
  const [name, setName] = useState("Traveler");
  const [email, setEmail] = useState("traveler@example.com");
  const [phone, setPhone] = useState("+1 555-0123");
  const [birthday, setBirthday] = useState("1990-01-01");

  const handleSave = () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <ScreenContainer>
      <View style={[S.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[S.headerTitle, { color: colors.text }]}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.7}>
          <Text style={[S.saveBtn, { color: "#6443F4" }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={S.scroll}>
        {/* Avatar */}
        <View style={S.avatarSection}>
          <View style={[S.avatarCircle, { backgroundColor: colors.surface }]}>
            <Image source={require("@/assets/images/icon.png")} style={S.avatarImg} />
          </View>
          <TouchableOpacity style={S.changePhotoBtn} activeOpacity={0.8}>
            <Text style={S.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={S.form}>
          <View style={S.field}>
            <Text style={[S.label, { color: colors.muted }]}>Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={[S.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholderTextColor={colors.muted}
            />
          </View>

          <View style={S.field}>
            <Text style={[S.label, { color: colors.muted }]}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[S.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholderTextColor={colors.muted}
            />
          </View>

          <View style={S.field}>
            <Text style={[S.label, { color: colors.muted }]}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={[S.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholderTextColor={colors.muted}
            />
          </View>

          <View style={S.field}>
            <Text style={[S.label, { color: colors.muted }]}>Birthday</Text>
            <TextInput
              value={birthday}
              onChangeText={setBirthday}
              placeholder="YYYY-MM-DD"
              style={[S.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              placeholderTextColor={colors.muted}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const S = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 18, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  saveBtn: { fontSize: 16, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  scroll: { padding: 20, paddingBottom: 100 },
  avatarSection: { alignItems: "center", marginBottom: 32 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarImg: { width: 60, height: 60, resizeMode: "contain" },
  changePhotoBtn: { paddingHorizontal: 16, paddingVertical: 8 },
  changePhotoText: { color: "#6443F4", fontSize: 15, fontFamily: "Chillax-Semibold", fontWeight: "600" },
  form: { gap: 20 },
  field: { gap: 8 },
  label: { fontSize: 14, fontFamily: "Satoshi-Regular", fontWeight: "500" },
  input: { height: 50, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 16, fontFamily: "Satoshi-Regular" },
});
