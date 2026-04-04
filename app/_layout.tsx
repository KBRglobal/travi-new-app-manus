import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Root Layout: SafeArea + Auth guard
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0514' },
          animation: 'fade',
        }}
      >
        {/* S1 — Splash (entry point) */}
        <Stack.Screen name="index" />

        {/* Auth Flow */}
        <Stack.Screen name="(auth)" />

        {/* Main App — Tabs */}
        <Stack.Screen name="(tabs)" />

        {/* Trip Group — hides tab bar */}
        <Stack.Screen name="(trip)" />

        {/* Live Mode — hides tab bar */}
        <Stack.Screen name="(live)" />

        {/* Social */}
        <Stack.Screen name="(social)" />

        {/* Drawer — tablet+ */}
        <Stack.Screen name="(drawer)" />

        {/* Global Modals */}
        <Stack.Screen
          name="_modals"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </>
  );
}
