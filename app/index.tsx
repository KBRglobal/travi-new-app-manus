import { useEffect } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useStore } from "@/lib/store";
import { useAuth } from "@/hooks/use-auth";

export default function Index() {
  const { state } = useStore();
  const { isAuthenticated: oauthAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Wait for OAuth session check before routing
    if (authLoading) return;

    const timer = setTimeout(() => {
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
  }, [oauthAuthenticated, authLoading, state.isAuthenticated, state.isGuest, state.onboardingCompleted]);

  return (
    <View style={{ flex: 1, backgroundColor: "#1A0533", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="#F94498" size="large" />
    </View>
  );
}
