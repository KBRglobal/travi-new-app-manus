import { Stack } from "expo-router";
import { useColors } from "@/hooks/use-colors";

export default function SocialLayout() {
  const colors = useColors();
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="discover" />
      <Stack.Screen name="compatibility" />
      <Stack.Screen name="messages" />
      <Stack.Screen name="message-chat" />
      <Stack.Screen name="community" />
    </Stack>
  );
}
