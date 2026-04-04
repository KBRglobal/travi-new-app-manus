import { Stack } from "expo-router";
export default function TripLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="plan" />
      <Stack.Screen name="destination-select" />
      <Stack.Screen name="dates-travelers" />
      <Stack.Screen name="flights" />
      <Stack.Screen name="flight-select" />
      <Stack.Screen name="hotels" />
      <Stack.Screen name="hotel-select" />
      <Stack.Screen name="hotel-detail" />
      <Stack.Screen name="swipe" />
      <Stack.Screen name="itinerary-builder" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="checkout-payment" />
      <Stack.Screen name="confirmation" />
      <Stack.Screen name="pre-trip-dashboard" />
      <Stack.Screen name="pre-trip-checklist" />
      <Stack.Screen name="pre-trip-documents" />
      <Stack.Screen name="post-trip-celebration" options={{ animation: "fade" }} />
      <Stack.Screen name="trip-summary" />
      <Stack.Screen name="rate-review" />
      <Stack.Screen name="post-trip-gallery" />
      <Stack.Screen name="destination-detail" />
      <Stack.Screen name="memories" />
      <Stack.Screen name="emergency" />
      <Stack.Screen name="trip-settings" />
      <Stack.Screen name="trip-chat" />
      <Stack.Screen name="trip-companions" />
      <Stack.Screen name="trip-share" />
      <Stack.Screen name="activity-detail-live" />
      <Stack.Screen name="activity-select" />
      <Stack.Screen name="ai-chat" />
      <Stack.Screen name="book" />
      <Stack.Screen name="completion" />
      <Stack.Screen name="cultural-guide" />
      <Stack.Screen name="currency-converter" />
      <Stack.Screen name="destination-map" />
      <Stack.Screen name="destination-pick" />
      <Stack.Screen name="dna-update" />
      <Stack.Screen name="expenses" />
      <Stack.Screen name="flight-detail" />
      <Stack.Screen name="food-preferences" />
      <Stack.Screen name="interests" />
      <Stack.Screen name="itinerary" />
      <Stack.Screen name="landmarks" />
      <Stack.Screen name="live-dashboard" />
      <Stack.Screen name="live-map" />
      <Stack.Screen name="live-timeline" />
      <Stack.Screen name="packing-list" />
      <Stack.Screen name="payment-modal" />
      <Stack.Screen name="post-booking" />
      <Stack.Screen name="restaurant-detail" />
      <Stack.Screen name="summary" />
      <Stack.Screen name="surprise" />
      <Stack.Screen name="trip-prep" />
      <Stack.Screen name="visa-info" />
    </Stack>
  );
}
