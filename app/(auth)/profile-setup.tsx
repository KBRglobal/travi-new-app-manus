/**
 * Profile Setup Screen — Neutral Wireframe
 * Spec: Step 2/3. Avatar photo, first name, last name, DOB picker,
 *       phone (optional), country picker, Continue button.
 */
import { useState, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Modal, FlatList, Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useStore } from "@/lib/store";

const N = {
  bg:       "#111111",
  surface:  "#1A1A1A",
  white:    "#FFFFFF",
  textSec:  "#ABABAB",
  textTer:  "#777777",
  accent:   "#007AFF",
  border:   "#333333",
  error:    "#FF6B6B",
  disabled: "#444444",
};

// Avatar options
type AvatarOption = {
  id: string;
  iconName: "flame.fill" | "bolt.fill" | "leaf.fill" | "mountain.2.fill" | "globe" | "star.fill" | "heart.fill" | "moon.fill" | "sun.max.fill" | "sparkles" | "crown.fill" | "trophy.fill";
  color: string;
  label: string;
};

const AVATARS: AvatarOption[] = [
  { id: "fire",     iconName: "flame.fill",      color: "#FF5722", label: "Fire" },
  { id: "bolt",     iconName: "bolt.fill",        color: "#FBBF24", label: "Bolt" },
  { id: "leaf",     iconName: "leaf.fill",        color: "#4CAF50", label: "Nature" },
  { id: "mountain", iconName: "mountain.2.fill",  color: "#78909C", label: "Explorer" },
  { id: "globe",    iconName: "globe",            color: "#2196F3", label: "Globetrotter" },
  { id: "star",     iconName: "star.fill",        color: "#FFC107", label: "Star" },
  { id: "heart",    iconName: "heart.fill",       color: "#F94498", label: "Romantic" },
  { id: "moon",     iconName: "moon.fill",        color: "#9C27B0", label: "Night Owl" },
  { id: "sun",      iconName: "sun.max.fill",     color: "#FF9800", label: "Sunny" },
  { id: "sparkles", iconName: "sparkles",         color: "#00BCD4", label: "Dreamer" },
  { id: "crown",    iconName: "crown.fill",       color: "#FBBF24", label: "Elite" },
  { id: "trophy",   iconName: "trophy.fill",      color: "#FF9800", label: "Champion" },
];

// Country list (top countries)
const COUNTRIES = [
  "Israel", "United States", "United Kingdom", "Germany", "France", "Spain",
  "Italy", "Netherlands", "Canada", "Australia", "Japan", "South Korea",
  "Brazil", "Mexico", "India", "Thailand", "Turkey", "Greece",
  "Portugal", "Switzerland", "Austria", "Sweden", "Norway", "Denmark",
  "Belgium", "Czech Republic", "Poland", "Ireland", "New Zealand", "Singapore",
  "Argentina", "Chile", "Colombia", "South Africa", "Egypt", "Morocco",
  "UAE", "Croatia", "Hungary", "Romania",
];

export default function ProfileSetupScreen() {
  const { state, dispatch } = useStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState(AVATARS[0].id);

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const lastNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const selectedAvatar = AVATARS.find((a) => a.id === selectedAvatarId) || AVATARS[0];

  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (firstName.trim().length < 2) errs.firstName = "Min 2 characters";
    if (lastName.trim().length < 2) errs.lastName = "Min 2 characters";
    if (!dob) errs.dob = "Required";
    if (!country) errs.country = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleDobConfirm = () => {
    const d = parseInt(dobDay, 10);
    const m = parseInt(dobMonth, 10);
    const y = parseInt(dobYear, 10);

    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1926 || y > 2008) {
      Alert.alert("Invalid Date", "Please enter a valid date. You must be 18 or older.");
      return;
    }

    const dateStr = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
    setDob(dateStr);
    setShowDobPicker(false);
    setErrors((e) => ({ ...e, dob: "" }));
  };

  const handleContinue = () => {
    if (!validate()) return;

    dispatch({
      type: "SET_PROFILE",
      payload: {
        ...(state.profile || {
          id: Date.now().toString(), email: (state.profile as any)?.email || "",
          quizCompleted: false, travelerDNA: {},
          activityCategories: [], tripPace: "balanced" as const,
          foodPreferences: { cuisines: [], avoid: [], allergies: [], dietary: [] },
          points: 0, xp: 0, lifetimeSavings: 0, subscriptionActive: false,
        }),
        name: `${firstName.trim()} ${lastName.trim()}`,
        photo: selectedAvatarId,
      },
    });
    router.replace("/(auth)/welcome" as never);
  };

  const canContinue = firstName.trim().length >= 2 && lastName.trim().length >= 2 && !!dob && !!country;

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top", "bottom"]} style={s.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

          {/* Header */}
          <View style={s.header}>
            <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
              <IconSymbol name="chevron.left" size={20} color={N.textSec} />
            </TouchableOpacity>
            <Text style={s.headerTitle}>Profile Setup</Text>
            <Text style={s.stepLabel}>Step 2/3</Text>
          </View>

          <ScrollView
            contentContainerStyle={s.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title */}
            <Text style={s.title}>Tell us about you</Text>

            {/* Avatar section */}
            <View style={s.avatarSection}>
              <View style={[s.avatarCircle, { backgroundColor: selectedAvatar.color + "22" }]}>
                <IconSymbol name={selectedAvatar.iconName} size={42} color={selectedAvatar.color} />
              </View>
              <Text style={s.avatarLabel}>Choose your avatar</Text>
              <View style={s.avatarGrid}>
                {AVATARS.map((av) => {
                  const active = selectedAvatarId === av.id;
                  return (
                    <TouchableOpacity
                      key={av.id}
                      style={[s.avatarItem, active && s.avatarItemActive]}
                      onPress={() => setSelectedAvatarId(av.id)}
                      activeOpacity={0.7}
                    >
                      <View style={[s.avatarIcon, { backgroundColor: av.color + "30" }]}>
                        <IconSymbol name={av.iconName} size={20} color={av.color} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* First Name */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>First Name *</Text>
              <View style={[s.inputWrap, errors.firstName ? s.inputError : null]}>
                <IconSymbol name="person.fill" size={18} color={N.textTer} />
                <TextInput
                  style={s.input}
                  placeholder="First name"
                  placeholderTextColor={N.textTer}
                  value={firstName}
                  onChangeText={(t) => { setFirstName(t); setErrors((e) => ({ ...e, firstName: "" })); }}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                />
              </View>
              {errors.firstName ? <Text style={s.errorText}>{errors.firstName}</Text> : null}
            </View>

            {/* Last Name */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Last Name *</Text>
              <View style={[s.inputWrap, errors.lastName ? s.inputError : null]}>
                <IconSymbol name="person.fill" size={18} color={N.textTer} />
                <TextInput
                  ref={lastNameRef}
                  style={s.input}
                  placeholder="Last name"
                  placeholderTextColor={N.textTer}
                  value={lastName}
                  onChangeText={(t) => { setLastName(t); setErrors((e) => ({ ...e, lastName: "" })); }}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                />
              </View>
              {errors.lastName ? <Text style={s.errorText}>{errors.lastName}</Text> : null}
            </View>

            {/* Date of Birth */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Date of Birth *</Text>
              <TouchableOpacity
                style={[s.inputWrap, errors.dob ? s.inputError : null]}
                onPress={() => setShowDobPicker(true)}
                activeOpacity={0.7}
              >
                <IconSymbol name="calendar" size={18} color={N.textTer} />
                <Text style={[s.inputText, !dob && s.inputPlaceholder]}>
                  {dob || "DD/MM/YYYY"}
                </Text>
              </TouchableOpacity>
              {errors.dob ? <Text style={s.errorText}>{errors.dob}</Text> : null}
            </View>

            {/* Phone (optional) */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Phone (optional)</Text>
              <View style={s.inputWrap}>
                <IconSymbol name="phone.fill" size={18} color={N.textTer} />
                <TextInput
                  ref={phoneRef}
                  style={s.input}
                  placeholder="Phone number"
                  placeholderTextColor={N.textTer}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                />
              </View>
            </View>

            {/* Country */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Country *</Text>
              <TouchableOpacity
                style={[s.inputWrap, errors.country ? s.inputError : null]}
                onPress={() => setShowCountryPicker(true)}
                activeOpacity={0.7}
              >
                <IconSymbol name="globe" size={18} color={N.textTer} />
                <Text style={[s.inputText, !country && s.inputPlaceholder]}>
                  {country || "Select country"}
                </Text>
                <IconSymbol name="chevron.down" size={16} color={N.textTer} />
              </TouchableOpacity>
              {errors.country ? <Text style={s.errorText}>{errors.country}</Text> : null}
            </View>

            {/* Continue button */}
            <TouchableOpacity
              style={[s.continueBtn, !canContinue && s.continueBtnDisabled]}
              onPress={handleContinue}
              activeOpacity={0.8}
              disabled={!canContinue}
            >
              <Text style={[s.continueText, !canContinue && s.continueTextDim]}>Continue</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>

        {/* DOB Picker Modal */}
        <Modal visible={showDobPicker} transparent animationType="slide">
          <View style={s.modalOverlay}>
            <View style={s.modalContent}>
              <Text style={s.modalTitle}>Date of Birth</Text>
              <Text style={s.modalSubtitle}>You must be 18 or older</Text>

              <View style={s.dobRow}>
                <View style={s.dobField}>
                  <Text style={s.dobLabel}>Day</Text>
                  <TextInput
                    style={s.dobInput}
                    placeholder="DD"
                    placeholderTextColor={N.textTer}
                    value={dobDay}
                    onChangeText={(t) => setDobDay(t.replace(/[^0-9]/g, "").slice(0, 2))}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>
                <View style={s.dobField}>
                  <Text style={s.dobLabel}>Month</Text>
                  <TextInput
                    style={s.dobInput}
                    placeholder="MM"
                    placeholderTextColor={N.textTer}
                    value={dobMonth}
                    onChangeText={(t) => setDobMonth(t.replace(/[^0-9]/g, "").slice(0, 2))}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                </View>
                <View style={s.dobField}>
                  <Text style={s.dobLabel}>Year</Text>
                  <TextInput
                    style={s.dobInput}
                    placeholder="YYYY"
                    placeholderTextColor={N.textTer}
                    value={dobYear}
                    onChangeText={(t) => setDobYear(t.replace(/[^0-9]/g, "").slice(0, 4))}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </View>
              </View>

              <View style={s.modalActions}>
                <TouchableOpacity style={s.modalCancel} onPress={() => setShowDobPicker(false)} activeOpacity={0.7}>
                  <Text style={s.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.modalConfirm} onPress={handleDobConfirm} activeOpacity={0.8}>
                  <Text style={s.modalConfirmText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Country Picker Modal */}
        <Modal visible={showCountryPicker} transparent animationType="slide">
          <View style={s.modalOverlay}>
            <View style={[s.modalContent, { maxHeight: "80%" }]}>
              <Text style={s.modalTitle}>Select Country</Text>

              <View style={s.searchWrap}>
                <IconSymbol name="magnifyingglass" size={18} color={N.textTer} />
                <TextInput
                  style={s.searchInput}
                  placeholder="Search countries..."
                  placeholderTextColor={N.textTer}
                  value={countrySearch}
                  onChangeText={setCountrySearch}
                  autoFocus
                />
              </View>

              <FlatList
                data={filteredCountries}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[s.countryRow, country === item && s.countryRowActive]}
                    onPress={() => {
                      setCountry(item);
                      setShowCountryPicker(false);
                      setCountrySearch("");
                      setErrors((e) => ({ ...e, country: "" }));
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[s.countryText, country === item && s.countryTextActive]}>
                      {item}
                    </Text>
                    {country === item && <IconSymbol name="checkmark" size={18} color={N.accent} />}
                  </TouchableOpacity>
                )}
                style={{ flex: 1 }}
              />

              <TouchableOpacity
                style={s.modalCancel}
                onPress={() => { setShowCountryPicker(false); setCountrySearch(""); }}
                activeOpacity={0.7}
              >
                <Text style={s.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },
  safe: { flex: 1 },

  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: N.border,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 17, fontWeight: "700", color: N.white },
  stepLabel: { fontSize: 14, fontWeight: "600", color: N.textSec },

  scroll: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 },

  title: { fontSize: 28, fontWeight: "800", color: N.white, letterSpacing: -0.5, marginBottom: 28 },

  // Avatar
  avatarSection: { alignItems: "center", marginBottom: 28 },
  avatarCircle: {
    width: 100, height: 100, borderRadius: 50,
    borderWidth: 2, borderColor: N.border, borderStyle: "dashed",
    alignItems: "center", justifyContent: "center", marginBottom: 12,
  },
  avatarLabel: { fontSize: 14, fontWeight: "500", color: N.accent, marginBottom: 16 },
  avatarGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  avatarItem: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    alignItems: "center", justifyContent: "center",
  },
  avatarItemActive: { borderColor: N.accent, borderWidth: 2 },
  avatarIcon: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },

  // Fields
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: "600", color: N.textSec, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  inputWrap: {
    flexDirection: "row", alignItems: "center", gap: 12,
    height: 56, borderRadius: 14,
    backgroundColor: N.surface, borderWidth: 1, borderColor: N.border,
    paddingHorizontal: 16,
  },
  inputError: { borderColor: N.error },
  input: { flex: 1, color: N.white, fontSize: 16, fontWeight: "500" },
  inputText: { flex: 1, color: N.white, fontSize: 16, fontWeight: "500" },
  inputPlaceholder: { color: N.textTer },
  errorText: { color: N.error, fontSize: 12, fontWeight: "500", marginTop: 4 },

  // Continue
  continueBtn: {
    height: 56, borderRadius: 28, backgroundColor: N.accent,
    justifyContent: "center", alignItems: "center", marginTop: 24,
  },
  continueBtnDisabled: { backgroundColor: N.disabled },
  continueText: { color: N.white, fontSize: 16, fontWeight: "700" },
  continueTextDim: { color: N.textTer },

  // Modals
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: N.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, maxHeight: "60%",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: N.white, marginBottom: 4, textAlign: "center" },
  modalSubtitle: { fontSize: 14, color: N.textSec, textAlign: "center", marginBottom: 24 },

  // DOB
  dobRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  dobField: { flex: 1 },
  dobLabel: { fontSize: 12, fontWeight: "600", color: N.textSec, marginBottom: 6, textTransform: "uppercase" },
  dobInput: {
    height: 52, borderRadius: 12, backgroundColor: N.bg,
    borderWidth: 1, borderColor: N.border, textAlign: "center",
    color: N.white, fontSize: 18, fontWeight: "600",
  },

  modalActions: { flexDirection: "row", gap: 12 },
  modalCancel: {
    flex: 1, height: 48, borderRadius: 24,
    backgroundColor: N.bg, borderWidth: 1, borderColor: N.border,
    justifyContent: "center", alignItems: "center",
  },
  modalCancelText: { color: N.textSec, fontSize: 15, fontWeight: "600" },
  modalConfirm: {
    flex: 1, height: 48, borderRadius: 24, backgroundColor: N.accent,
    justifyContent: "center", alignItems: "center",
  },
  modalConfirmText: { color: N.white, fontSize: 15, fontWeight: "700" },

  // Country picker
  searchWrap: {
    flexDirection: "row", alignItems: "center", gap: 10,
    height: 44, borderRadius: 12, backgroundColor: N.bg,
    borderWidth: 1, borderColor: N.border, paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchInput: { flex: 1, color: N.white, fontSize: 15 },
  countryRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    height: 48, paddingHorizontal: 16, borderRadius: 12,
  },
  countryRowActive: { backgroundColor: "rgba(0,122,255,0.1)" },
  countryText: { color: N.white, fontSize: 16 },
  countryTextActive: { color: N.accent, fontWeight: "600" },
});
