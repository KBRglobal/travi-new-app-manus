// Screen 54 — Profile Edit — STATIC 
// Header 60px (back + Save), Avatar 120px + Change Photo, Personal Info + Location + Travel Prefs + Emergency + About + Privacy + Delete
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const PERSONAL = [
  { label: "First Name", value: "Amit" },
  { label: "Last Name", value: "Cohen" },
  { label: "Email", value: "amit@example.com" },
  { label: "Phone", value: "+972 50 123 4567" },
  { label: "Date of Birth", value: "Jan 15, 1990" },
];

const LOCATION = [
  { label: "Country", value: "Israel" },
  { label: "City", value: "Tel Aviv" },
  { label: "Timezone", value: "GMT+3" },
];

const TRAVEL_PREFS = [
  { label: "Preferred Currency", value: "EUR (E)" },
  { label: "Seat Preference", value: "Window" },
  { label: "Meal Preference", value: "No preference" },
  { label: "Hotel Room Type", value: "King bed" },
];

export default function ProfileEditScreen() {
  return (
    <View style={s.root}>
      {/* Header — 60px */}
      <View style={s.header}>
        <Pressable style={s.backBtn}><Text style={s.backText}>{"<"}</Text></Pressable>
        <Text style={s.headerTitle}>Edit Profile</Text>
        <Pressable><Text style={s.saveText}>Save</Text></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Avatar — 120px */}
        <View style={s.avatarSection}>
          <View style={s.avatar}><Text style={s.avatarText}>AC</Text></View>
          <Pressable style={s.changePhotoBtn}><Text style={s.changePhotoText}>Change Photo</Text></Pressable>
        </View>

        {/* Personal Info */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Personal Information</Text>
          {PERSONAL.map((f) => (
            <View key={f.label} style={s.fieldRow}>
              <Text style={s.fieldLabel}>{f.label}</Text>
              <Text style={s.fieldValue}>{f.value}</Text>
            </View>
          ))}
        </View>

        {/* Location */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Location</Text>
          {LOCATION.map((f) => (
            <View key={f.label} style={s.fieldRow}>
              <Text style={s.fieldLabel}>{f.label}</Text>
              <Text style={s.fieldValue}>{f.value}</Text>
            </View>
          ))}
        </View>

        {/* Travel Preferences */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Travel Preferences</Text>
          {TRAVEL_PREFS.map((f) => (
            <Pressable key={f.label} style={s.fieldRow}>
              <Text style={s.fieldLabel}>{f.label}</Text>
              <View style={s.fieldValueRow}><Text style={s.fieldValue}>{f.value}</Text><Text style={s.fieldArrow}>{">"}</Text></View>
            </Pressable>
          ))}
        </View>

        {/* Emergency Contact */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Emergency Contact</Text>
          <View style={s.fieldRow}><Text style={s.fieldLabel}>Name</Text><Text style={s.fieldValue}>Sarah Cohen</Text></View>
          <View style={s.fieldRow}><Text style={s.fieldLabel}>Phone</Text><Text style={s.fieldValue}>+972 50 987 6543</Text></View>
          <View style={s.fieldRow}><Text style={s.fieldLabel}>Relation</Text><Text style={s.fieldValue}>Spouse</Text></View>
        </View>

        {/* About */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>About Me</Text>
          <View style={s.textArea}><Text style={s.textPlaceholder}>Tell other travelers about yourself...</Text></View>
        </View>

        {/* Privacy */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Privacy</Text>
          <View style={s.toggleRow}><Text style={s.toggleLabel}>Show profile to other travelers</Text><View style={s.toggle}><View style={s.toggleKnob} /></View></View>
          <View style={s.toggleRow}><Text style={s.toggleLabel}>Share travel stats</Text><View style={[s.toggle, s.toggleOff]}><View style={[s.toggleKnob, s.toggleKnobOff]} /></View></View>
        </View>

        {/* Delete Account */}
        <Pressable style={s.deleteBtn}><Text style={s.deleteText}>Delete Account</Text></Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12, marginTop: 48, borderBottomWidth: 1, borderBottomColor: "#222" },
  backBtn: { width: 32, height: 32, justifyContent: "center", alignItems: "center" },
  backText: { color: "#FFF", fontSize: 24 },
  headerTitle: { flex: 1, color: "#FFF", fontSize: 18, fontWeight: "600", textAlign: "center" },
  saveText: { color: "#888", fontSize: 14, fontWeight: "600" },
  avatarSection: { alignItems: "center", paddingVertical: 24 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#222", borderWidth: 2, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#888", fontSize: 32, fontWeight: "700" },
  changePhotoBtn: { marginTop: 10, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: "#333" },
  changePhotoText: { color: "#888", fontSize: 13 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  fieldRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 48, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  fieldLabel: { color: "#888", fontSize: 14 },
  fieldValue: { color: "#FFF", fontSize: 14 },
  fieldValueRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  fieldArrow: { color: "#555", fontSize: 14 },
  textArea: { height: 80, borderRadius: 12, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 12 },
  textPlaceholder: { color: "#555", fontSize: 14 },
  toggleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 48, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  toggleLabel: { color: "#FFF", fontSize: 14, flex: 1 },
  toggle: { width: 48, height: 28, borderRadius: 14, backgroundColor: "#555", justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 2 },
  toggleOff: { backgroundColor: "#333" },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#FFF" },
  toggleKnobOff: { backgroundColor: "#666", alignSelf: "flex-start" },
  deleteBtn: { alignSelf: "center", marginTop: 28, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: "#F8717140" },
  deleteText: { color: "#F87171", fontSize: 14, fontWeight: "600" },
});
