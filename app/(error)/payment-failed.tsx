// Screen 62 — Payment Failed — STATIC WIREFRAME
// Modal 400px, error icon, error-specific copy, Try Again + Change Method + Cancel
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function PaymentFailedScreen() {
  return (
    <View style={s.root}>
      <View style={s.overlay} />
      <View style={s.modal}>
        <View style={s.iconWrap}><Text style={s.icon}>✕</Text></View>
        <Text style={s.title}>Payment Failed</Text>
        <Text style={s.body}>Your card was declined. Please check your card details or try a different payment method.</Text>
        <View style={s.errorDetail}>
          <Text style={s.errorLabel}>Error Code</Text>
          <Text style={s.errorValue}>CARD_DECLINED_INSUFFICIENT_FUNDS</Text>
        </View>
        <Pressable style={s.primaryBtn}><Text style={s.primaryText}>Try Again</Text></Pressable>
        <Pressable style={s.secondaryBtn}><Text style={s.secondaryText}>Change Payment Method</Text></Pressable>
        <Pressable style={s.cancelBtn}><Text style={s.cancelText}>Cancel</Text></Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "#000", opacity: 0.7 },
  modal: { width: "100%", maxHeight: 400, borderRadius: 20, backgroundColor: "#1A1A1A", borderWidth: 1, borderColor: "#333", padding: 24, alignItems: "center" },
  iconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#F8717120", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  icon: { color: "#F87171", fontSize: 28, fontWeight: "800" },
  title: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  body: { color: "#888", fontSize: 14, textAlign: "center", lineHeight: 22, marginTop: 8 },
  errorDetail: { marginTop: 12, padding: 10, borderRadius: 8, backgroundColor: "#111", width: "100%", alignItems: "center" },
  errorLabel: { color: "#666", fontSize: 11 },
  errorValue: { color: "#F87171", fontSize: 11, fontFamily: "monospace", marginTop: 2 },
  primaryBtn: { marginTop: 16, width: "100%", height: 48, borderRadius: 24, backgroundColor: "#333", borderWidth: 1, borderColor: "#555", justifyContent: "center", alignItems: "center" },
  primaryText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  secondaryBtn: { marginTop: 10, width: "100%", height: 44, borderRadius: 22, borderWidth: 1, borderColor: "#333", justifyContent: "center", alignItems: "center" },
  secondaryText: { color: "#BBB", fontSize: 14 },
  cancelBtn: { marginTop: 8 },
  cancelText: { color: "#888", fontSize: 13 },
});
