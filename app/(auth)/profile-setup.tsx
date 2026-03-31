import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions
} from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const { width } = Dimensions.get("window");

export default function ProfileSetupScreen() {
  const { state, dispatch } = useStore();
  const [name, setName] = useState(state.profile?.name || "");
  const [photoSelected, setPhotoSelected] = useState(false);

  const handleContinue = () => {
    if (!name.trim()) return;
    dispatch({ type: "UPDATE_PROFILE", payload: { name: name.trim() } });
    router.push("/(auth)/welcome" as never);
  };

  const handlePhotoSelect = () => {
    // Simulate photo selection
    setPhotoSelected(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1A0533", "#2D1B69", "#1A0533"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <View style={styles.content}>
        <Text style={styles.stepLabel}>Step 1 of 2</Text>
        <Text style={styles.title}>Set up your profile</Text>
        <Text style={styles.subtitle}>This is how other travelers will see you</Text>

        {/* Avatar Picker */}
        <TouchableOpacity style={styles.avatarContainer} onPress={handlePhotoSelect} activeOpacity={0.8}>
          {photoSelected ? (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{name ? name[0].toUpperCase() : "?"}</Text>
            </View>
          ) : (
            <View style={styles.avatarPlaceholder}>
              <IconSymbol name="person.fill" size={40} color="#A78BCA" />
            </View>
          )}
          <View style={styles.cameraBtn}>
            <IconSymbol name="camera.fill" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <Text style={styles.photoHint}>Tap to add a photo</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <IconSymbol name="person.fill" size={18} color="#A78BCA" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor="#A78BCA"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />
        </View>

        {/* Email display */}
        {state.profile?.email ? (
          <View style={styles.emailRow}>
            <IconSymbol name="checkmark.circle.fill" size={16} color="#4CAF50" />
            <Text style={styles.emailText}>{state.profile.email}</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        ) : null}

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.ctaWrapper, !name.trim() && styles.ctaDisabled]}
          onPress={handleContinue}
          activeOpacity={0.85}
          disabled={!name.trim()}
        >
          <LinearGradient
            colors={name.trim() ? ["#7B2FBE", "#E91E8C"] : ["#4A3080", "#4A3080"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Continue</Text>
            <IconSymbol name="arrow.right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A0533" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  stepLabel: { color: "#7B2FBE", fontSize: 13, fontWeight: "600", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" },
  title: { color: "#FFFFFF", fontSize: 26, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  subtitle: { color: "#A78BCA", fontSize: 15, textAlign: "center", marginBottom: 36 },
  avatarContainer: { position: "relative", marginBottom: 8 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2D1B69",
    borderWidth: 2,
    borderColor: "#7B2FBE",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: { color: "#FFFFFF", fontSize: 40, fontWeight: "700" },
  cameraBtn: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E91E8C",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1A0533",
  },
  photoHint: { color: "#A78BCA", fontSize: 13, marginBottom: 32 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D1B69",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#4A3080",
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: "100%",
    marginBottom: 16,
  },
  input: { flex: 1, color: "#FFFFFF", fontSize: 16, paddingVertical: 12 },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
    backgroundColor: "#2D1B69",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
  },
  emailText: { color: "#A78BCA", fontSize: 14, flex: 1 },
  verifiedBadge: {
    backgroundColor: "#1B4D1E",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedText: { color: "#4CAF50", fontSize: 11, fontWeight: "600" },
  ctaWrapper: { borderRadius: 28, overflow: "hidden", width: "100%" },
  ctaDisabled: { opacity: 0.5 },
  ctaGradient: { paddingVertical: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
});
