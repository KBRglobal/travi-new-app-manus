import { Stack } from 'expo-router';

// Auth Flow: Stack, headerShown:false
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0514' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verify-email" />
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="welcome-travi" />
      <Stack.Screen name="quick-dna/index" />
      <Stack.Screen name="quick-dna/swipe" />
      <Stack.Screen name="quick-dna/schedule" />
      <Stack.Screen name="quick-dna/summary" />
    </Stack>
  );
}
