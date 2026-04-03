import { Stack } from "expo-router";

export default function TripLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="plan" />
      <Stack.Screen name="interests" />
      <Stack.Screen name="landmarks" />
      <Stack.Screen name="flights" />
      <Stack.Screen name="hotels" />
      <Stack.Screen name="summary" />
      <Stack.Screen name="completion" />
      <Stack.Screen name="swipe" />
      <Stack.Screen name="itinerary" />
      <Stack.Screen name="destination-pick" />
      <Stack.Screen name="dna-update" />
      <Stack.Screen name="book" />
      <Stack.Screen name="surprise" />
      <Stack.Screen name="food-preferences" />
      <Stack.Screen name="destination-detail" />
      <Stack.Screen name="trip-hub" />
      <Stack.Screen name="trip-chat" />
      <Stack.Screen name="cultural-guide" />
      <Stack.Screen name="trip-prep" />
      <Stack.Screen name="flight-detail" />
      <Stack.Screen name="hotel-detail" />
      <Stack.Screen name="restaurant-detail" />
    </Stack>
  );
}
