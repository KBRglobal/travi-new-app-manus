import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="privacy-security" />
      <Stack.Screen name="language-selector" />
      <Stack.Screen name="currency-selector" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="emergency" />
      <Stack.Screen name="health-activity" />
    </Stack>
  );
}
