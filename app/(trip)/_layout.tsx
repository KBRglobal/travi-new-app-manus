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
    </Stack>
  );
}
