import { Stack } from 'expo-router';

// Social: Stack navigation
export default function SocialLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0514' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="discover/index" />
      <Stack.Screen name="discover/swipe" />
      <Stack.Screen name="profile/[userId]" />
      <Stack.Screen name="compatibility/[userId]" />
      <Stack.Screen name="messages/index" />
      <Stack.Screen name="messages/[convId]" />
      <Stack.Screen name="buddies" />
    </Stack>
  );
}
