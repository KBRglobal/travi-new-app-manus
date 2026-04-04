import { Stack } from "expo-router";

export default function LiveLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="itinerary" />
      <Stack.Screen name="map" />
      <Stack.Screen name="split" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="split-payment" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="expenses" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="schedule" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="trip-summary" options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="expense-tracker" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="trip-review" options={{ animation: "slide_from_bottom" }} />
    </Stack>
  );
}
