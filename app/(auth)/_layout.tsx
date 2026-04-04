import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="welcome-travi" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="deep-onboarding" />
    </Stack>
  );
}
