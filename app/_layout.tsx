import '../global.css';
import { useEffect, useState, useCallback } from 'react';
import { Stack, useRouter, useSegments, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { useAuthStore } from '../stores/authStore';
import { colors } from '../constants/theme';
import { ToastProvider } from '../components/ui/Toast';
import { ConfirmDialogProvider } from '../components/ui/ConfirmDialog';
import { BannerProvider } from '../components/ui/Banner';
import { OfflineBadge } from '../components/ui/OfflineBadge';
import { globalErrorState } from '../lib/errorHandling';

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

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

// Offline detection hook
function useOfflineDetection() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = globalErrorState.subscribeOverlay((overlay) => {
      setIsOffline(overlay === 'NoInternetOverlay');
    });
    return unsubscribe;
  }, []);

  return isOffline;
}

// Root Layout: GestureHandler + QueryClient + SafeArea + Auth guard + Error UI
export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    'Chillax-Bold': require('../assets/fonts/Chillax-Bold.otf'),
    'Chillax-Medium': require('../assets/fonts/Chillax-Medium.otf'),
    'Chillax-Semibold': require('../assets/fonts/Chillax-Semibold.otf'),
    'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Medium': require('../assets/fonts/Satoshi-Medium.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Disable auth guard for now (prototype mode — free navigation)
  // useProtectedRoute();
  const isOffline = useOfflineDetection();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style="light" translucent backgroundColor="transparent" />

          {/* Offline badge at the top */}
          {isOffline && <OfflineBadge />}

          {/* Banner for location/permission messages */}
          <BannerProvider />

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

          {/* Global Toast overlay */}
          <ToastProvider />

          {/* Global Confirm Dialog */}
          <ConfirmDialogProvider />
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
