import { useEffect } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useStore } from "@/lib/store";
import { useAuth } from "@/hooks/use-auth";

export default function Index() {
  const { state, dispatch } = useStore();
  const { isAuthenticated: oauthAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Wait for OAuth session check before routing
    if (authLoading) return;

    const timer = setTimeout(() => {
      // Check if guest session has expired (25-hour timer)
      const guestExpired = state.isGuest && state.guestExpiresAt
        ? new Date(state.guestExpiresAt).getTime() < Date.now()
        : false;

      if (guestExpired) {
        // Guest session expired — clear state and send to sign-up
        dispatch({ type: "LOGOUT" });
        router.replace("/(auth)/sign-up" as never);
        return;
      }

      // Real OAuth session takes priority over local store auth
      if (oauthAuthenticated) {
        router.replace("/(tabs)" as never);
      } else if (state.isAuthenticated || state.isGuest) {
        if (!state.onboardingCompleted) {
          router.replace("/(auth)/welcome" as never);
        } else {
          router.replace("/(tabs)" as never);
        }
      } else {
        router.replace("/(auth)/splash" as never);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [oauthAuthenticated, authLoading, state.isAuthenticated, state.isGuest, state.onboardingCompleted, state.guestExpiresAt, dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: "#1A0533", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="#F94498" size="large" />
    </View>
  );
}
