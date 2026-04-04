// ROOT INDEX — SCREEN NAVIGATOR HUB
// Lets user browse all 77 wireframe screens from one place
import { View, Text, StyleSheet, Pressable, ScrollView, SectionList } from "react-native";
import { router } from "expo-router";

const SECTIONS = [
  {
    title: "A — Auth & Onboarding",
    data: [
      { label: "1. Splash", route: "/(auth)/splash" },
      { label: "2. Welcome", route: "/(auth)/welcome" },
      { label: "3. Sign Up", route: "/(auth)/sign-up" },
      { label: "4. Verify Email", route: "/(auth)/verify" },
      { label: "5. Profile Setup", route: "/(auth)/profile-setup" },
      { label: "6. Welcome to TRAVI", route: "/(auth)/welcome-travi" },
      { label: "7. DNA Categories", route: "/(dna)/categories" },
      { label: "8. DNA Swipe", route: "/(dna)/quick-swipe" },
      { label: "9. DNA Schedule", route: "/(dna)/schedule" },
      { label: "10. DNA Summary", route: "/(dna)/summary" },
    ],
  },
  {
    title: "B — Discovery Mode",
    data: [
      { label: "11. Home Dashboard", route: "/(tabs)" },
      { label: "12. Explore Feed", route: "/(tabs)/explore" },
      { label: "13. Search Modal", route: "/(tabs)/search" },
      { label: "14. Destination Detail", route: "/(trip)/destination-detail" },
      { label: "15. Profile & Settings", route: "/(tabs)/profile" },
      { label: "16. DNA Management", route: "/(tabs)/dna-management" },
      { label: "17. Wishlist", route: "/(tabs)/wishlist" },
      { label: "18. Notifications", route: "/(tabs)/notifications" },
      { label: "19. Plan Trip Entry", route: "/(tabs)/plan-trip" },
    ],
  },
  {
    title: "C — Planning Mode",
    data: [
      { label: "20. Destination Select", route: "/(trip)/destination-select" },
      { label: "21. Dates & Travelers", route: "/(trip)/dates-travelers" },
      { label: "22. Flight Select", route: "/(trip)/flight-select" },
      { label: "23. Hotel Select", route: "/(trip)/hotel-select" },
      { label: "24. Hotel Detail", route: "/(trip)/hotel-detail" },
      { label: "25. Activity Select", route: "/(trip)/activity-select" },
      { label: "26. Itinerary Builder", route: "/(trip)/itinerary-builder" },
      { label: "27. Cart / Trip Review", route: "/(trip)/cart" },
      { label: "28. Checkout Phase 1", route: "/(trip)/checkout" },
      { label: "29. Payment Modal", route: "/(trip)/payment-modal" },
      { label: "30. Checkout Phase 2", route: "/(trip)/checkout-payment" },
      { label: "31. Booking Confirmation", route: "/(trip)/confirmation" },
    ],
  },
  {
    title: "D — Pre-Trip Mode",
    data: [
      { label: "32. Pre-Trip Dashboard", route: "/(trip)/pre-trip-dashboard" },
      { label: "33. Pre-Trip Checklist", route: "/(trip)/pre-trip-checklist" },
      { label: "34. Pre-Trip Documents", route: "/(trip)/pre-trip-documents" },
    ],
  },
  {
    title: "E — Live Mode",
    data: [
      { label: "35. Live Dashboard", route: "/(trip)/live-dashboard" },
      { label: "36. Live Timeline", route: "/(trip)/live-timeline" },
      { label: "37. Live Map", route: "/(trip)/live-map" },
      { label: "38. Activity Detail Live", route: "/(trip)/activity-detail-live" },
      { label: "39. Expenses Tracker", route: "/(trip)/expenses" },
      { label: "40. Memories Gallery", route: "/(trip)/memories" },
      { label: "41. AI Chat", route: "/(trip)/ai-chat" },
      { label: "42. Emergency Contacts", route: "/(trip)/emergency" },
      { label: "43. Trip Settings", route: "/(trip)/trip-settings" },
    ],
  },
  {
    title: "F — Post-Trip Mode",
    data: [
      { label: "44. Post-Trip Celebration", route: "/(trip)/post-trip-celebration" },
      { label: "45. Trip Summary", route: "/(trip)/trip-summary" },
      { label: "46. Rate & Review", route: "/(trip)/rate-review" },
      { label: "47. Photo Gallery", route: "/(trip)/post-trip-gallery" },
    ],
  },
  {
    title: "G — Universal Screens",
    data: [
      { label: "48. Wallet", route: "/(tabs)/wallet" },
      { label: "49. Add Funds", route: "/(tabs)/add-funds" },
      { label: "50. Transaction History", route: "/(tabs)/transaction-history" },
      { label: "51. Split Payment", route: "/(tabs)/split-payment" },
      { label: "52. KYC Verification", route: "/(tabs)/kyc" },
      { label: "53. Membership", route: "/(tabs)/membership" },
      { label: "54. Profile Edit", route: "/(tabs)/profile-edit" },
      { label: "55. Settings", route: "/(tabs)/settings" },
      { label: "57. My Trips", route: "/(tabs)/trips" },
      { label: "66. Help & Support", route: "/(tabs)/help" },
    ],
  },
  {
    title: "H — Error & Empty States",
    data: [
      { label: "60. No Internet", route: "/(error)/no-internet" },
      { label: "61. API Error", route: "/(error)/api-error" },
      { label: "62. Payment Failed", route: "/(error)/payment-failed" },
      { label: "63. Session Expired", route: "/(error)/session-expired" },
      { label: "64. GPS Denied", route: "/(error)/gps-denied" },
      { label: "65. Camera Denied", route: "/(error)/camera-denied" },
      { label: "67. Empty No Trips", route: "/(error)/empty-trips" },
      { label: "68. Empty No Search", route: "/(error)/empty-search" },
    ],
  },
  {
    title: "I — Loading & Special",
    data: [
      { label: "69. Loading Initial", route: "/(special)/loading-initial" },
      { label: "70. Loading Matching", route: "/(special)/loading-matching" },
      { label: "71. Loading Payment", route: "/(special)/loading-payment" },
      { label: "72. First Swipe Tutorial", route: "/(special)/first-swipe-tutorial" },
      { label: "73. Welcome Tour", route: "/(special)/welcome-tour" },
      { label: "74. DNA Celebration", route: "/(special)/dna-celebration" },
      { label: "75. First Booking Success", route: "/(special)/first-booking-success" },
      { label: "76. Change Email/Password", route: "/(special)/change-credentials" },
      { label: "77. Delete Account", route: "/(special)/delete-account" },
    ],
  },
  {
    title: "J — Social Layer",
    data: [
      { label: "78. Community Feed", route: "/(social)/community" },
      { label: "79. Discover Travelers", route: "/(social)/discover" },
      { label: "80. Compatibility Score", route: "/(social)/compatibility" },
      { label: "81. Traveler Card Swipe", route: "/(social)/swipe-travelers" },
      { label: "82. Traveler Profile", route: "/(social)/traveler-profile" },
      { label: "83. Connect Flow", route: "/(social)/connect-flow" },
      { label: "84. Messages List", route: "/(social)/messages" },
      { label: "85. Chat Screen", route: "/(social)/message-chat" },
      { label: "86. Travel Buddies", route: "/(social)/buddies" },
    ],
  },
  {
    title: "K — TRAVI Points",
    data: [
      { label: "91. Points Dashboard", route: "/(points)/dashboard" },
      { label: "92. Redeem Hub", route: "/(points)/redeem" },
      { label: "93. Airline Miles", route: "/(points)/airline-miles" },
      { label: "94. Partner Detail", route: "/(points)/partner-detail" },
      { label: "95. Gift Cards", route: "/(points)/gift-cards" },
      { label: "96. Earn Guide", route: "/(points)/earn-guide" },
      { label: "97. Points Transactions", route: "/(points)/transactions" },
      { label: "98. Membership Perks", route: "/(points)/perks" },
      { label: "99. Referrals", route: "/(points)/referrals" },
      { label: "100. Redeem Confirmation", route: "/(points)/redeem-confirm" },
    ],
  },
];

export default function ScreenNavigator() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Text style={s.headerTitle}>TRAVI Wireframes</Text>
        <Text style={s.headerSub}>96 Screens — Tap to preview</Text>
      </View>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.route}
        renderSectionHeader={({ section }) => (
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [s.row, pressed && { opacity: 0.6 }]}
            onPress={() => router.push(item.route as never)}
          >
            <Text style={s.rowLabel}>{item.label}</Text>
            <Text style={s.rowArrow}>{">"}</Text>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 60 }}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111" },
  header: { paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#222" },
  headerTitle: { color: "#FFF", fontSize: 28, fontWeight: "900", letterSpacing: 1 },
  headerSub: { color: "#888", fontSize: 14, marginTop: 4 },
  sectionHeader: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8, backgroundColor: "#111" },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#1A1A1A" },
  rowLabel: { color: "#CCC", fontSize: 15 },
  rowArrow: { color: "#555", fontSize: 14 },
});
