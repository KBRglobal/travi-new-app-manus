import { Stack } from "expo-router";
import { useColors } from "@/hooks/use-colors";

export default function PointsLayout() {
  const colors = useColors();
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="redeem" />
      <Stack.Screen name="airline-miles" />
      <Stack.Screen name="partner-detail" />
      <Stack.Screen name="gift-cards" />
      <Stack.Screen name="earn-guide" />
      <Stack.Screen name="transactions" />
      <Stack.Screen name="perks" />
      <Stack.Screen name="referrals" />
      <Stack.Screen name="redeem-confirm" />
    </Stack>
  );
}
