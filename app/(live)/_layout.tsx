import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

// Live Mode: Stack, hides tab bar, shows FAB
export default function LiveLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="[tripId]/index" />
      <Stack.Screen name="[tripId]/timeline" />
      <Stack.Screen name="[tripId]/map" />
      <Stack.Screen name="[tripId]/activity/[actId]" />
      <Stack.Screen name="[tripId]/expenses" />
      <Stack.Screen name="[tripId]/memories" />
      <Stack.Screen name="[tripId]/emergency" />
      <Stack.Screen name="[tripId]/settings" />
      <Stack.Screen name="[tripId]/tax/index" />
      <Stack.Screen name="[tripId]/tax/add" />
      <Stack.Screen name="[tripId]/tax/review" />
      <Stack.Screen name="[tripId]/tax/rules" />
      <Stack.Screen name="[tripId]/tax/vat" />
      <Stack.Screen name="[tripId]/tax/checklist" />
      <Stack.Screen name="[tripId]/tax/form" />
    </Stack>
  );
}
