import '../global.css';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import { colors } from '../constants/theme';

const queryClient = new QueryClient();

// Auth guard — redirects based on auth state
function useProtectedRoute() {
  const { isAuthenticated, isLoading, onboardingComplete } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/welcome');
    } else if (isAuthenticated && !onboardingComplete && !inAuthGroup) {
      router.replace('/(auth)/quick-dna');
    } else if (isAuthenticated && onboardingComplete && inAuthGroup) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated, isLoading, onboardingComplete, segments]);
}

// Root Layout: GestureHandler + QueryClient + SafeArea + Auth guard
export default function RootLayout() {
  // Disable auth guard for now (prototype mode — free navigation)
  // useProtectedRoute();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.bg.primary },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" options={{ animation: 'fade' }} />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(trip)" />
            <Stack.Screen name="(live)" />
            <Stack.Screen name="(social)" />
            <Stack.Screen name="(drawer)" />
            <Stack.Screen
              name="_modals"
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
