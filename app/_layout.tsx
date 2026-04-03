import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Platform } from "react-native";
import "@/lib/_core/nativewind-pressable";
import { ThemeProvider } from "@/lib/theme-provider";
import {
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import type { EdgeInsets, Metrics, Rect } from "react-native-safe-area-context";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { trpc, createTRPCClient } from "@/lib/trpc";
import { initManusRuntime, subscribeSafeAreaInsets } from "@/lib/_core/manus-runtime";
import { TraviStoreProvider } from "@/lib/store";
import { registerForPushNotificationsAsync, addNotificationListeners } from "@/lib/notifications";

SplashScreen.preventAutoHideAsync();

const DEFAULT_WEB_INSETS: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 };
const DEFAULT_WEB_FRAME: Rect = { x: 0, y: 0, width: 0, height: 0 };

export const unstable_settings = {
  anchor: "(tabs)",
};

/**
 * Registers push token with the server and listens for incoming notifications.
 * Must be rendered inside trpc.Provider so tRPC hooks are available.
 */
function PushNotificationHandler() {
  const router = useRouter();
  const registerToken = trpc.pushTokens.register.useMutation();
  const registered = useRef(false);

  // Register push token on mount (once)
  useEffect(() => {
    if (Platform.OS === "web" || registered.current) return;
    registered.current = true;

    registerForPushNotificationsAsync().then((token) => {
      if (!token) return;
      const platform = Platform.OS === "ios" ? "ios" : "android";
      registerToken.mutate(
        { token, platform },
        {
          onError: (err) =>
            console.warn("[PushNotifications] Failed to register token:", err.message),
        },
      );
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for foreground notifications and tap responses
  useEffect(() => {
    if (Platform.OS === "web") return;

    const cleanup = addNotificationListeners(
      // Notification received while app is in foreground
      (notification) => {
        console.log("[PushNotifications] Received:", notification.request.content.title);
      },
      // User tapped on a notification
      (response) => {
        const data = response.notification.request.content.data as Record<string, unknown> | undefined;
        if (!data) return;

        // Navigate based on notification payload
        if (data.tripId) {
          router.push(`/(trip)/${data.tripId}` as never);
        } else if (data.screen && typeof data.screen === "string") {
          router.push(data.screen as never);
        }
      },
    );

    return cleanup;
  }, [router]);

  return null;
}

export default function RootLayout() {
  const initialInsets = initialWindowMetrics?.insets ?? DEFAULT_WEB_INSETS;
  const initialFrame = initialWindowMetrics?.frame ?? DEFAULT_WEB_FRAME;

  const [insets, setInsets] = useState<EdgeInsets>(initialInsets);
  const [frame, setFrame] = useState<Rect>(initialFrame);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom brand fonts
  useEffect(() => {
    Font.loadAsync({
      "Chillax-Regular": require("@/assets/fonts/Chillax-Regular.ttf"),
      "Chillax-Semibold": require("@/assets/fonts/Chillax-Semibold.ttf"),
      "Chillax-Bold": require("@/assets/fonts/Chillax-Bold.ttf"),
      "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.ttf"),
      "Satoshi-Medium": require("@/assets/fonts/Satoshi-Medium.ttf"),
      "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.ttf"),
    })
      .then(() => setFontsLoaded(true))
      .catch(() => setFontsLoaded(true)) // fallback to system fonts on error
      .finally(() => SplashScreen.hideAsync());
  }, []);

  // Initialize Manus runtime for cookie injection from parent container
  useEffect(() => {
    initManusRuntime();
  }, []);

  const handleSafeAreaUpdate = useCallback((metrics: Metrics) => {
    setInsets(metrics.insets);
    setFrame(metrics.frame);
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const unsubscribe = subscribeSafeAreaInsets(handleSafeAreaUpdate);
    return () => unsubscribe();
  }, [handleSafeAreaUpdate]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );
  const [trpcClient] = useState(() => createTRPCClient());

  const providerInitialMetrics = useMemo(() => {
    const metrics = initialWindowMetrics ?? { insets: initialInsets, frame: initialFrame };
    return {
      ...metrics,
      insets: {
        ...metrics.insets,
        top: Math.max(metrics.insets.top, 16),
        bottom: Math.max(metrics.insets.bottom, 12),
      },
    };
  }, [initialInsets, initialFrame]);

  const content = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TraviStoreProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(trip)" />
            <Stack.Screen name="(live)" />
            <Stack.Screen name="(dna)" />
            <Stack.Screen name="(settings)" />
            <Stack.Screen name="(social)" />
            <Stack.Screen name="(agent)" />
            <Stack.Screen name="oauth/callback" />
          </Stack>
          <StatusBar style="light" backgroundColor="#24103E" />
          <PushNotificationHandler />
        </QueryClientProvider>
      </trpc.Provider>
      </TraviStoreProvider>
    </GestureHandlerRootView>
  );

  const shouldOverrideSafeArea = Platform.OS === "web";

  if (shouldOverrideSafeArea) {
    return (
      <ThemeProvider>
        <SafeAreaProvider initialMetrics={providerInitialMetrics}>
          <SafeAreaFrameContext.Provider value={frame}>
            <SafeAreaInsetsContext.Provider value={insets}>
              {content}
            </SafeAreaInsetsContext.Provider>
          </SafeAreaFrameContext.Provider>
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider initialMetrics={providerInitialMetrics}>{content}</SafeAreaProvider>
    </ThemeProvider>
  );
}
