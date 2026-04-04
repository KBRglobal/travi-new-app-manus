import { Stack } from 'expo-router';

// Modals: Stack, presentation:modal
export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="ai-chat" />
      <Stack.Screen name="payment-method" />
      <Stack.Screen name="connect-flow" />
      <Stack.Screen name="quick-rating" />
      <Stack.Screen name="purchase-detail" />
      <Stack.Screen name="dna-celebration" />
      <Stack.Screen name="first-booking" />
      <Stack.Screen name="country-picker" />
      <Stack.Screen name="category-picker" />
      <Stack.Screen name="session-expired" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
