import { Stack } from "expo-router";

export default function DnaLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="profile" />
      <Stack.Screen name="categories" />
      <Stack.Screen name="quick-swipe" />
      <Stack.Screen name="schedule" />
      <Stack.Screen name="summary" />
      <Stack.Screen name="first-class-dna" />
    </Stack>
  );
}
